import AI from "../AI.js";
import Player from "../player.js";

const bot = new AI("easy");
const player1 = new Player("jay");
bot.gameboard.placeShip(4, 4, bot.battleship);
player1.gameboard.placeShip(4, 4, player1.battleship);

test("AI creates a new Player", () => {
    expect(bot.difficulty).toBe("easy");
    expect(bot.name).toBe("AI");
});

test("Easy AI makes a random move", () => {
    bot.turn = true;
    let [x, y] = bot.AIMoveEasy(player1);
    expect(player1.gameboard.board[x][y].shot).toBeTruthy();
});
