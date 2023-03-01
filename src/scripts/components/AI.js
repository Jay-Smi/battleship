import Player from "./player.js";

class AI extends Player {
    constructor(difficulty) {
        super("AI");
        this.difficulty = null;
    }

    AIMove(player1) {
        switch (this.difficulty) {
            case "easy":
                this.AIMoveEasy(player1);
                break;
            case "medium":
                this.AIMoveEasy(player1);
                break;
            case "hard":
                this.AIMoveEasy(player1);
                break;
        }
    }

    AIMoveEasy(player1) {
        const randX = _randomIndex();
        const randY = _randomIndex();
        if (!player1.gameboard.checkTileGuessed(randX, randY)) {
            this.makeAttack(randX, randY, player1.gameboard);
            return [randX, randY];
        } else {
            this.AIMoveEasy(player1);
        }
    }
}

function _randomIndex() {
    return Math.floor(Math.random() * 9);
}

export default AI;
