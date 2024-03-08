export type SlotDataBody = {
    slotFace: number[][];
    balance: number;
    wins: SlotWinData[]
}

export type SlotWinData = {
    symbolId: string;
    winAmount: number;
    paylineId: string;
    winningSymbols: number[];
}

export type SpinRequestData = {
    bet: number;
    timestamp: number;
}