import {SpinRequestData} from "../../data/Data";
import {GAME} from "../../../index";
import {GameActions} from "./GameActions";

export class GameActionsDispatcher {
    private actionDispatcherFunction: Function;

    constructor(actionDispatcher: Function) {
        console.log("GAME EVENT LISTENER");
        this.actionDispatcherFunction = actionDispatcher;
    }

    public requestSpin(spinData: SpinRequestData) {
        this.actionDispatcherFunction(GameActions.REQUEST_SPIN, spinData);
    }
    public spinStarted() {
        this.actionDispatcherFunction(GameActions.SPIN_STARTED);
    }
    public spinStopped() {
        this.actionDispatcherFunction(GameActions.SPIN_STOPPED);
    }
}