import * as PIXI from 'pixi.js';
import {GAME} from "../../index";

export default class PlayButton {
    public readonly sprite: PIXI.Sprite;
    private readonly onClick: (isSpinning: boolean) => void;
    private readonly activeTexture: PIXI.Texture;
    private readonly disabledTexture: PIXI.Texture;

    private isSpinning = false;

    constructor(app: PIXI.Application, onClick: (isSpinning: boolean) => void) {
        this.onClick = onClick;
        this.activeTexture = app.loader.resources!.atlas.textures!['BTN_Spin.png'];
        this.disabledTexture = app.loader.resources!.atlas.textures!['BTN_Spin_d.png'];
        this.sprite = new PIXI.Sprite(this.activeTexture);
        this.init(app.screen.width, app.screen.height);
    }

    setEnabled() {
        this.sprite.texture = this.activeTexture;
        this.isSpinning = false;
        // this.sprite.interactive = true;
    }

    setDisabled() {
        this.sprite.texture = this.disabledTexture;
        this.isSpinning = true;
        // this.sprite.interactive = false;
    }

    private init(appWidth: number, appHeight: number) {
        this.sprite.x = appWidth - (this.sprite.width + 37.25);
        this.sprite.y = (appHeight - this.sprite.height) / 2;
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.addListener('pointerdown', () => {
            // this.onClick(this.isSpinning);
            GAME.SIGNALS.SPIN_START_REQUESTED.dispatchSignal();
        });
    }
}
