export default class Signal<T extends unknown[]> {
    public listenersList: Function[];

    constructor() {
        this.listenersList = [];
    }

    public addListener(listenerFunction: Function): any {
        this.listenersList.push(listenerFunction);
    }

    public dispatchSignal(signalValue?: any): void {
        this.listenersList.forEach((listener: Function) => {
            listener(signalValue);
        });
    }
}