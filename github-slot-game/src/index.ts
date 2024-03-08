import {SlotDataBody} from "./core/data/Data";
import {timeout} from "./util/util";
import Game from "./core/Game";
import GameSignalsCollection from "./core/logic/GameSignalsCollection";
import DataParser from "./core/data/DataParser";

export const GAME_SIGNALS: GameSignalsCollection = new GameSignalsCollection();
export const GAME_PARSER: DataParser = new DataParser();
export const GAME: Game = new Game(GAME_SIGNALS, GAME_PARSER);
// todo game config

export const receiveDataListenersCallbackArray: Function[] = [];

function initGame(spinListenerFucntion: Function, receiveDataListenerArray: Function[]) {
    GAME.setDataReceivedListener(receiveDataListenerArray);
    GAME.setSendSpinDataListenerFucntion(spinListenerFucntion);
}

async function sendSpinRequest(data: any) {
    console.log("SEND SPIN REQUEST", data);

    await timeout(1500);
    const dataPayload: SlotDataBody = {
        slotFace: [
            [1,1,2,1,1],
            [1,1,2,1,1],
            [1,1,2,1,1],
        ],
        balance: 1100,
        wins: [{
            symbolId: '2',
            winAmount: 10,
            paylineId: '0',
            winningSymbols: [1,1,1],
        }],
        ...data.responseDataPayload,
    }
    receiveData(dataPayload);
}

function receiveData(data: SlotDataBody): void {
    receiveDataListenersCallbackArray.forEach((receiveDataFunc: Function) => {
        receiveDataFunc(data);
    });
}

initGame(sendSpinRequest, receiveDataListenersCallbackArray);
