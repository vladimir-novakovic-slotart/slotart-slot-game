import {GameEvents} from "./GameEvents";

export class GameEventsListener {
    constructor() {
        // todo add function that will be controlled from outside and that will fire catchEvent
        console.log("GAME EVENT LISTENER");
    }

    catchEvent(eventName: string, attr: any): void {
        switch(eventName) {
            case GameEvents.SPIN: {
                console.log(GameEvents.SPIN, attr);
                break;
            }
            case GameEvents.DATA_RECEIVED: {
                console.log(GameEvents.DATA_RECEIVED, attr);
                break;
            }
            case GameEvents.STOP_SPIN_REQUEST: {
                console.log(GameEvents.STOP_SPIN_REQUEST, attr);
                break;
            }
            case GameEvents.CHANGE_BET: {
                console.log(GameEvents.CHANGE_BET, attr);
                break;
            }
        }
    }
}