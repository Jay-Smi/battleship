import Ship from "../ship.js";

const bShip = new Ship(4);

test("ship is created", () => {
    expect(bShip).toEqual({
        length: 4,
        hits: 0,
        sunk: false,
        name: "default",
    });
});
