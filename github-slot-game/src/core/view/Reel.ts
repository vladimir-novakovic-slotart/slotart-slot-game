import * as PIXI from 'pixi.js';
import {timeout} from "../../util/util";

export default class Reel {
    public static REEL_WIDTH = 230;
    public static REEL_OFFSET_BETWEEN = 10;
    public static NUMBER_OF_ROWS = 3;

    public readonly container: PIXI.Container;
    public readonly maskContainer: PIXI.Container;
    public readonly textures: Array<PIXI.Texture>;
    public sprites: Array<PIXI.Sprite> = [];
    private readonly appHeight: number;
    private readonly ticker: PIXI.Ticker;

    private isStopped = false;
    private isSpinFinished = false;

    // todo add stopping and stopped signals
    constructor(app: PIXI.Application, position: number) {
        this.ticker = app.ticker;
        this.container = new PIXI.Container();
        this.container.name = "REEL_CONTAINER_" + position;
        this.textures = [
            app.loader.resources.atlas!.textures!['SYM1.png'],
            app.loader.resources.atlas!.textures!['SYM2.png'],
            app.loader.resources.atlas!.textures!['SYM3.png'],
            app.loader.resources.atlas!.textures!['SYM4.png'],
            app.loader.resources.atlas!.textures!['SYM5.png'],
            app.loader.resources.atlas!.textures!['SYM6.png'],
        ];
        this.generate(position);


        // todo maybe move mask to individual reel
        let backgorund = new PIXI.Graphics();
        backgorund.beginFill(0xfffaaa, 0.2);
        backgorund.drawRect(0, 0, 295, 580);
        backgorund.endFill();

        this.maskContainer = new PIXI.Container();
        this.maskContainer.addChild(backgorund);
        this.container.addChild(this.maskContainer);
        this.container.mask = this.maskContainer;
        // this.container.addChild(this.maskContainer);

    }

    private generate(position: number) {
        // this.container.x = position * Reel.REEL_WIDTH;

        for (let i = 0; i < Reel.NUMBER_OF_ROWS + 1; i++) {
            const symbolId = Math.floor(Math.random() * this.textures.length);
            const symbol = this.drawSymbol(symbolId, position, i);
            this.sprites.push(symbol);
            this.container.addChild(symbol);
        }
    }

    private drawSymbol(symbolId: number, position: number, index: number) {
        const symbol = new PIXI.Sprite(this.textures[symbolId]);
        symbol.scale.set(0.8);
        const widthDiff = Reel.REEL_WIDTH - symbol.width;
        symbol.x = position * Reel.REEL_OFFSET_BETWEEN + widthDiff / 2;
        const yOffset = (600 - symbol.height * 3) / 3;
        const cellHeight = symbol.height + yOffset;
        const paddingTop = yOffset / 2;
        symbol.y = (index - 1) * cellHeight + paddingTop;
        // console.log({yOffset, paddingTop});

        return symbol;
    }

    public async spin(): Promise<void> {
        this.isStopped = false;
        this.isSpinFinished = false;

        for await (let value of this.infiniteSpinning()) {
            // const shiftingWaitTime = (this.reels.length - reelsToSpin.length + 1) * shiftingDelay;

            // if (Date.now() >= start + shiftingWaitTime) {
            // reelsToSpin.shift();
            // }

            if (this.isStopped) break;
        }
    }

    public async stop(outputSymbols: number[]) {
        this.isStopped = true;
        // this.setSymbol(2);
        let currentSymbolIndex = 0;

        // await timeout(2000);
        while (!this.isSpinFinished) {
            await timeout(20);
        }

        for await (let value of this.stoppingGenerator(outputSymbols)) {
            // console.log({currentSymbolIndex});
            if(outputSymbols.length === currentSymbolIndex) break;

            currentSymbolIndex++;
        }
    }

    private async* stoppingGenerator(outputSymbols: number[]) {
        for (const symbolId of outputSymbols) {
            // console.log({symbolId});
            await this.spinOneTime();
            this.setSymbol(symbolId);
            // await Promise.all(spinningPromises);
            yield;
        }
    }

    async spinOneTime() {
        let speed = 35;
        let doneRunning = false;
        const reelHeight = 600;
        let yOffset = (reelHeight - this.sprites[0].height * 3) / 3 / 2;

        return new Promise<void>(resolve => {
            const tick = () => {
                for (let i = this.sprites.length - 1; i >= 0; i--) {
                    const symbol = this.sprites[i];

                    if (symbol.y + speed > reelHeight + yOffset) {
                        doneRunning = true;
                        speed = reelHeight - symbol.y + yOffset;
                        symbol.y = -(symbol.height + yOffset);
                    } else {
                        symbol.y += speed;
                    }

                    if (i === 0 && doneRunning) {
                        let lastSprite = this.sprites.pop();
                        if (lastSprite) this.sprites.unshift(lastSprite);
                        this.ticker.remove(tick);
                        if (this.isStopped) {
                            this.isSpinFinished = true;
                        }
                        resolve();
                    }
                }
            }

            this.ticker.add(tick);
        });
    }

    public async* infiniteSpinning() {
        // console.log("INFINITE SPINNING");
        while (true) {
            await this.spinOneTime();
            // await Promise.all(spinningPromises);
            this.blessRNG();
            yield;
        }
    }

    public getDisplay(): PIXI.Container {
        return this.container;
    }

    // create random symbols for next spin
    private blessRNG() {
        this.sprites[0].texture = this.textures[Math.floor(Math.random() * this.textures.length)];
    }

    private setSymbol(symbolId: number) {
        this.sprites[0].texture = this.textures[symbolId];
    }
}
