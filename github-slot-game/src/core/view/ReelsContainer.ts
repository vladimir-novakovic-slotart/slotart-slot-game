import * as PIXI from 'pixi.js';
import Reel from './Reel';
import {timeout} from '../../util/util';
import {GAME} from "../../index";
import GameSignalsCollection from "../logic/GameSignalsCollection";

export default class ReelsContainer {
    public readonly reels: Array<Reel> = [];
    public readonly container: PIXI.Container;
    public readonly maskContainer: PIXI.Container;
    public readonly SIGNALS: GameSignalsCollection;
    public isStopped = false;
    public reelsToSpin: Reel[];

    constructor(app: PIXI.Application, signals: GameSignalsCollection) {
        this.SIGNALS = signals;
        const REEL_OFFSET_LEFT = 70;
        const NUMBER_OF_REELS = 3;
        this.container = new PIXI.Container();
        this.container.name = "REELS_CONTAINER";
        this.maskContainer = new PIXI.Container();

        this.reelsToSpin = []

        // todo maybe move mask to individual reel
        let backgorund = new PIXI.Graphics();
        backgorund.beginFill(0xfffaaa, 0.2);
        backgorund.drawRect(0, 0, 720, 580);
        backgorund.endFill();
        this.maskContainer.addChild(backgorund);
        // this.container.mask = this.maskContainer;
        this.container.addChild(this.maskContainer);

        for (let i = 0; i < NUMBER_OF_REELS; i++) {
            const reel = new Reel(app, i);
            const reelContainer = reel.getDisplay();
            this.reels.push(reel);

            this.container.addChild(reelContainer);
            reelContainer.x = i * Reel.REEL_WIDTH;
            // reelContainer.y = 100;
        }

        this.container.x = REEL_OFFSET_LEFT;
        // this.container.y = 100;

        this.SIGNALS.SPIN_START_REQUESTED.addListener(() => {
            // console.log("spinStartRequested");
            this.spin();
        })
        this.SIGNALS.SPIN_STOP_REQUESTED.addListener((outcomeSymbols: number[][]) => {
            console.log("spinStopRequested", outcomeSymbols);
            this.stop(outcomeSymbols);
        })
    }

    async stop(outcomeSymbols: number[][]) {
        console.log('stop');
        this.isStopped = true;

        this.reelsToSpin.forEach((reel: Reel, index: number) => {
            setTimeout(() => {
                reel.stop(outcomeSymbols[index]);
            }, 500 * index);
        });
    }

    async spin() {
        console.log('spin');
        this.isStopped = false;
        // Overall time of spinning = shiftingDelay * this.reels.length
        // const shiftingDelay = 500;
        // const start = Date.now();
        this.reelsToSpin = [...this.reels];

        this.reelsToSpin.forEach((reel: Reel, index: number) => {
            reel.spin();
        });
        await timeout(6000);

        GAME.SIGNALS.SPIN_STOPPED.dispatchSignal();
        // return this.checkForWin(this.reels.map(reel => reel.sprites[2]));
    }

    public getDisplay(): PIXI.Container {
        return this.container;
    }

    private checkForWin(symbols: Array<PIXI.Sprite>): boolean {
        // Set of strings: 'SYM1', 'SYM2', ...
        //
        const combination: Set<string> = new Set();
        symbols.forEach(symbol => combination.add(symbol.texture.textureCacheIds[0].split('.')[0]));
        if (combination.size === 1 && !combination.has('SYM1')) return true;
        return combination.size === 2 && combination.has('SYM1');
    }
}
