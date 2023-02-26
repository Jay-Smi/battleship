import Player from "./player.js";
import AI from "./AI.js";
import elem from "../DOM/elem.js";

//Model -
class BattleshipGame {
    constructor(viewModel) {
        this.viewModel = viewModel;
        this.difficulty = viewModel.difficulty;
        this.player = new Player(viewModel.playerName);
        this.AI = new AI(this.difficulty);
    }

    updateViewModel(viewModel) {
        for (let key in viewModel) {
            this.viewModel[key] = viewModel[key];
        }
    }

    generateBoard() {}

    // initAIDOM() {
    //     this.buildGameboard(this.AI);
    // }
}

export default BattleshipGame;
