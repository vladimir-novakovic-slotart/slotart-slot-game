// import Signal from "../signals/Signal";
// import SignalsFactory from "../signals/SignalsFactory";
import GameSignalsCollection from "./GameSignalsCollection";
import {timeout} from '../../util/util';
import {SlotDataBody} from "../data/Data";
import {GAME} from "../../index";

// TODO this is link between the "game" and "game-frame" that would be in react
export default class GameController {
    public gameSignalsCollection: GameSignalsCollection;

    constructor(gameSignalsCollection: GameSignalsCollection) {
        this.gameSignalsCollection = gameSignalsCollection;

        this.gameSignalsCollection.SPIN_DATA_RECEIVED.addListener((payloadData: SlotDataBody) => {
            // GAME_DATA_PARSER.parse(payloadData);
            this.spinDataReceived();
        });
        this.gameSignalsCollection.SPIN_START_REQUESTED.addListener(() => {
            this.spinStartRequestedHandler();
        })
        this.gameSignalsCollection.SPIN_STARTED.addListener(() => {
            this.spinStartedHandler();
        })
        this.gameSignalsCollection.SPIN_STOP_REQUESTED.addListener(() => {
            // todo add outcome symbols
            this.spinStopRequestedHandler();
        })
        this.gameSignalsCollection.SPIN_STOPPED.addListener(() => {
            this.spinStoppedHandler();
        })
    }

    private async spinDataReceived() {
        console.log("SPIN DATA RECEIVED");

        await timeout(2000);
        this.gameSignalsCollection.SPIN_STOP_REQUESTED.dispatchSignal(GAME.DATA_PARSER.getSlotFace());
    }
    private async spinStartRequestedHandler() {
        console.log("SPIN START REQUESTED");
        this.gameSignalsCollection.SPIN_STARTED.dispatchSignal();
    }
    private spinStartedHandler(): void {
        console.log("SPIN STARTED");
    }
    private spinStopRequestedHandler(): void {
        console.log("SPIN STOP REQUEST");
    }
    private spinStoppedHandler(): void {
        console.log("SPIN STOPPED");
    }
}