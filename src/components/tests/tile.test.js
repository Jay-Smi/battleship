import Tile from "../tile.js";

test("Tile is created", () => {
    const tile = new Tile(2, 3);
    expect(tile).toEqual({ x: 2, y: 3, ship: null, shot: null });
});
