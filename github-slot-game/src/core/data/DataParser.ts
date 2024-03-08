import {SlotDataBody, SlotWinData} from "./Data";

export default class DataParser {
    private slotFace: number[][];
    private balance: number;
    private wins: SlotWinData[];

    constructor() {}

    public parse(data: SlotDataBody) {
        this.slotFace = data.slotFace;
        this.balance = data.balance;
        this.wins = data.wins;

        console.log({parse: data});
    }

    public getSlotFace() {
        return this.slotFace;
    }
    public getBalance() {
        return this.balance;
    }
    public getWins() {
        return this.wins;
    }
}