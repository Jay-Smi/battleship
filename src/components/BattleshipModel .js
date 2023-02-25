import Player from "./player.js";
import AI from "./AI.js";
import elem from "../DOM/elem.js";

//Model -
class BattleshipModel {
    constructor(player1Name, difficulty) {
        this.player1 = new Player(player1Name);
        this.AI = new AI(difficulty);
        // this.buildGameboard(this.player1);
    }

    generateBoard() {}

    // buildGameboard(player) {
    //     const p1GridContainer = document.querySelector(".p1GridContainer");
    //     const gameboardContainer = elem({
    //         prop: "div",
    //         className: "p1GameboardContainer",
    //     });
    //     const board = elem({ prop: "div", className: "board" });

    //     for (let y = 0; y < 10; y++) {
    //         for (let x = 9; x >= 0; x--) {
    //             let tile = elem({
    //                 prop: "div",
    //                 id: `${x}${y}`,
    //                 className: "tile",
    //             });
    //             tile.classList.add(`x${x}`);
    //             tile.classList.add(`y${y}`);
    //             board.prepend(tile);
    //             player.gameboard.board[x][y].element = tile;
    //         }
    //     }

    //     gameboardContainer.appendChild(board);
    //     p1GridContainer.appendChild(gameboardContainer);
    //     console.log(player);
    // }

    // initAIDOM() {
    //     this.buildGameboard(this.AI);
    // }
}

export default BattleshipModel;
