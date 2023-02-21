import Player from "./player.js";
import AI from "./AI.js";

class Gameloop {
    constructor(player1Name, player2Name = "AI", difficulty = "easy") {
        this.player1 = new Player(player1Name);
        if (player2Name === "AI") {
            this.player2 = new AI(difficulty);
        } else {
            this.player2 = new Player(player2Name);
        }
    }
}

export default Gameloop;
