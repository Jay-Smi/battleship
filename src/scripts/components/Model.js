import Player from "./Player";
import AI from "./AI";

export default class Model {
    constructor() {
        this.player = new Player();
        this.AI = new AI();
        this.currentTurn = "player";
        this.currentPage = "homePage";
        this.namePageIsOpen = false;
        this.stateMessage = "";
        this.gameState = null;
    }
}

// maybe add game state?
// would be null until gamePage activated
// potential values:
// -pre-game / ship placement
// -in-game
// -post-game
