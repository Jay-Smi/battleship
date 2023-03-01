import Gameloop from "../gameloop.js";
import Tile from "../tile.js";

const tile = new Tile(1, 1);
const gameloop = new Gameloop();

test("1) gameloop happy path", () => {
    expect(gameloop).toBeTruthy();
});

test("2) gameloop has players with gameboards that contain Tiles", () => {
    expect(gameloop.player1.gameboard.board[1][1]).toEqual(tile);
});
