import Signal from "../signals/Signal";
import SignalsFactory from "../signals/SignalsFactory";

export default class GameSignalsCollection {
    public SPIN_START_REQUESTED: Signal<[void]>;
    public SPIN_STARTED: Signal<[void]>;
    public SPIN_DATA_RECEIVED: Signal<[void]>;
    public SPIN_STOP_REQUESTED: Signal<[number[][]]>;
    public REEL_STOPPED: Signal<[void]>;
    public SPIN_STOPPED: Signal<[void]>;
    public UPDATE_BALANCE: Signal<[void]>;

    constructor() {
        this.createSignals();
    }

    createSignals() {
        this.SPIN_START_REQUESTED = SignalsFactory.createSignal();
        this.SPIN_STARTED = SignalsFactory.createSignal();
        this.SPIN_DATA_RECEIVED = SignalsFactory.createSignal();
        this.SPIN_STOP_REQUESTED = SignalsFactory.createSignal();
        this.REEL_STOPPED = SignalsFactory.createSignal();
        this.SPIN_STOPPED = SignalsFactory.createSignal();
        this.UPDATE_BALANCE = SignalsFactory.createSignal();
    }
}