import * as PIXI from 'pixi.js';
import Loader from './view/Loader';
import PlayButton from './view/PlayButton';
import Background from './view/Background';
import ReelsContainer from './view/ReelsContainer';
import Scoreboard from './view/Scoreboard';
import VictoryScreen from './view/VictoryScreen';
import GameConfig from "../GameConfig";
import GameSignalsCollection from "./logic/GameSignalsCollection";
import {GAME} from "../index";

export default class GameView {
    public static GAME_CONFIG: GameConfig;
    public SIGNALS: GameSignalsCollection;
    public app: PIXI.Application;
    private playBtn: PlayButton;
    private reelsContainer: ReelsContainer;
    private maskContainer: PIXI.Container;
    private scoreboard: Scoreboard;
    private victoryScreen: VictoryScreen;

    constructor(signals: GameSignalsCollection) {
        this.SIGNALS = signals;
        // todo add symbol size data
        GameView.GAME_CONFIG = new GameConfig(70, 100, 3, 3);
        this.app = new PIXI.Application({ width: 1280, height: 768 });
        // @ts-ignore
        globalThis.__PIXI_APP__ = this.app;
        window.document.body.appendChild(this.app.view);
        new Loader(this.app, this.init.bind(this));



        this.maskContainer = new PIXI.Container();
        let mask = new PIXI.Graphics();
        mask.beginFill(0xfffaaa, 1);
        mask.drawRect(100, 100, 400, 200);
        mask.endFill();

        // this.container.mask = mask;
        this.maskContainer.addChild(mask);

        this.SIGNALS.SPIN_STOPPED.addListener(() => {
            this.processSpinResult(true);
        })
    }

    private init() {
        this.createScene();
        this.createPlayButton();
        this.createReels();
        this.createScoreboard();
        this.createVictoryScreen();
    }

    private createScene() {
        const bg = new Background(this.app.loader);
        this.app.stage.addChild(bg.sprite);
    }

    private createPlayButton() {
        this.playBtn = new PlayButton(this.app, this.handleStart.bind(this));
        this.app.stage.addChild(this.playBtn.sprite);
    }

    private createReels() {
        this.reelsContainer = new ReelsContainer(this.app, this.SIGNALS);
        this.app.stage.addChild(this.reelsContainer.container);
        this.reelsContainer.getDisplay().y = 120;

        // this.reelsContainer.container.mask = this.maskContainer;
    }

    private createScoreboard() {
        this.scoreboard = new Scoreboard(this.app);
        this.app.stage.addChild(this.scoreboard.container);
    }

    private createVictoryScreen() {
        this.victoryScreen = new VictoryScreen(this.app);
        this.app.stage.addChild(this.victoryScreen.container);
    }

    handleStart(isSpinning: boolean) {
        if (!isSpinning) {
            this.scoreboard.decrement();
            this.playBtn.setDisabled();
            // this.reelsContainer.spin();
            // this.reelsContainer.spin()
                // .then(this.processSpinResult.bind(this));
        // } else {
        //     this.reelsContainer.stop();
        }
    }

    handleStop() {
        this.scoreboard.decrement();
        // this.playBtn.setDisabled();
        // this.reelsContainer.spin();
        // this.reelsContainer.spin()
        //     .then(this.processSpinResult.bind(this));
    }

    private processSpinResult(isWin: boolean) {
        if (isWin) {
            this.scoreboard.increment();
            this.victoryScreen.show();
        }

        if (!this.scoreboard.outOfMoney) this.playBtn.setEnabled();
    }
}
