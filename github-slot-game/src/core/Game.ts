import GameController from "./logic/GameController";
import GameSignalsCollection from "./logic/GameSignalsCollection";
import DataParser from "./data/DataParser";
import {SlotDataBody} from "./data/Data";
import {attachDebugFnToWindow, timeout} from "../util/util";
import GameView from "./GameView";
import {GAME_PARSER, GAME_SIGNALS} from "../index";

export default class Game{
    // todo maybe move data parser and signals to index.ts
    public DATA_PARSER: DataParser;
    public SIGNALS: GameSignalsCollection;
    public VIEW: GameView;
    public CONTROLLER: GameController;

    private sendSpinRequestListener: Function;

    constructor(signals: GameSignalsCollection, parser: DataParser) {
        this.DATA_PARSER = parser;
        this.SIGNALS = signals;
        this.VIEW = new GameView(this.SIGNALS);
        this.CONTROLLER = new GameController(this.SIGNALS);

        this.SIGNALS.SPIN_START_REQUESTED.addListener((attr: any) => {
            // todo remove fake payload so that it can only come from one space
            const responseDataPayload = {
                slotFace: [
                    [1, 1, 2, 1, 1],
                    [1, 1, 2, 1, 1],
                    [1, 1, 2, 1, 1],
                ],
                balance: 1100,
                wins: [{
                    symbolId: 2,
                    winAmount: 10,
                    paylineId: 0,
                    winningSymbols: [1, 1, 1],
                }],
                ...attr,
            }
            console.log(responseDataPayload);

            // TODO response data is only for testing
            this.sendSpinRequest({spin: true, bet: 5, responseDataPayload});
        });

        const sendSpinRequestListener = this.sendSpinRequestListener;
        // functions to test the game
        // todo remove fake payload so that it can only come from one space
        attachDebugFnToWindow("spinGame", (attr) => {
            const responseDataPayload = {
                slotFace: [
                    [1, 1, 2, 1, 1],
                    [1, 1, 2, 1, 1],
                    [1, 1, 2, 1, 1],
                ],
                balance: 1100,
                wins: [{
                    symbolId: 2,
                    winAmount: 10,
                    paylineId: 0,
                    winningSymbols: [1, 1, 1],
                }],
                ...attr,
            }

            console.log({responseDataPayload});
            // TODO response data is only for testing
            // sendSpinRequest({spin: true, bet: 5, responseDataPayload});
            this.sendSpinRequestListener(responseDataPayload);
            this.SIGNALS.SPIN_START_REQUESTED.dispatchSignal(responseDataPayload);
        });
    }

    public receiveData(data: SlotDataBody): void {
        GAME_PARSER.parse(data);

        GAME_SIGNALS.SPIN_DATA_RECEIVED.dispatchSignal();
    }

    public async sendSpinRequest(data: any) {
        // TODO remove mock data (atm)
        console.log("SEND SPIN REQUEST", data);
        if (this.sendSpinRequestListener) {
            this.sendSpinRequestListener(data);
        }
    }

    public setSendSpinDataListenerFucntion(sendSpinRequestListener: Function) {
        this.sendSpinRequestListener = sendSpinRequestListener;
    }
    public setDataReceivedListener(dataReceivedListenerArray: Function[]) {
        dataReceivedListenerArray.push(this.receiveData);
    }
}
