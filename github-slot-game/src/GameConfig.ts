export default class GameConfig {
    public static REELS_POSITION_X: number;
    public static REELS_POSITION_Y: number;
    public static REELS_NUMBER: number;
    public static REELS_SYMBOLS_NUMBER: number;

    constructor(posX: number, posY: number, reelsNumber = 3, reelsSymbolsNumber = 3) {
        GameConfig.REELS_NUMBER = reelsNumber;
        GameConfig.REELS_SYMBOLS_NUMBER = reelsSymbolsNumber;
        GameConfig.REELS_POSITION_X = posX;
        GameConfig.REELS_POSITION_Y = posY;
    }
}
