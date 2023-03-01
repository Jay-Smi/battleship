import Player from "../player.js";
import Ship from "../ship.js";

const player1 = new Player("jay");
const AI = new Player("AI");
const aiShip = new Ship(4, "BattleShip");
const playerShip = new Ship(4, "BattleShip");
AI.gameboard.placeShip(4, 4, aiShip);
player1.gameboard.placeShip(4, 4, playerShip);

test("Player test", () => {
    expect(player1.name).toBe("jay");
});

test("Player makeAttack miss works", () => {
    player1.turn = true;
    player1.makeAttack(1, 1, AI.gameboard);
    expect(AI.gameboard.board[1][1].shot).toBe("miss");
});

test("Player makeAttack hit works", () => {
    player1.makeAttack(4, 4, AI.gameboard);
    expect(AI.gameboard.board[4][4].ship).toBe(aiShip);
    expect(AI.gameboard.board[4][4].shot).toBe("hit");
});
