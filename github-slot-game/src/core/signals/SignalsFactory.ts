import Signal from "./Signal";

export default class SignalsFactory {
    public static createSignal<T extends unknown[]>(): Signal<T> {
        return new Signal();
    }
}