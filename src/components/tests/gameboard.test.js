import Gameboard from "../gameboard.js";
import Ship from "../ship.js";

const board = new Gameboard("player");

test("gameboard is created", () => {
    expect(board).toBeTruthy;
});

test("gameboard is populated with tiles", () => {
    expect(board.board[1][1]).toEqual({
        x: 1,
        y: 1,
        ship: null,
        shot: null,
    });
});

test("1) isValidPlacement working", () => {
    expect(board.isValidPlacement(6, 6, 4)).toBe(true);
});

test("2) isValidPlacement working", () => {
    expect(board.isValidPlacement(10, 6, 4)).toBeFalsy();
});

test("3) isValidPlacement working", () => {
    board.orientation = false;
    expect(board.isValidPlacement(1, 2, 4)).toBe(true);
});

const ship = new Ship(4);

test("1) placeShip places ship", () => {
    board.placeShip(1, 1, ship);
    expect(board.board[1][1].ship).toBeTruthy();
    expect(board.board[2][1].ship).toBeTruthy();
    expect(board.board[3][1].ship).toBeTruthy();
    expect(board.board[4][1].ship).toBeTruthy();
    expect(board.board[5][1].ship).toBe(null);
});

const ship2 = new Ship(4);
test("3) placeShip places ships in proximity", () => {
    board.orientation = true;
    board.placeShip(2, 5, ship2);
    expect(board.board[2][5].ship).toBeTruthy();
    expect(board.board[2][4].ship).toBeTruthy();
    expect(board.board[2][3].ship).toBeTruthy();
    expect(board.board[2][2].ship).toBeTruthy();
    expect(board.board[0][0].ship).toBeFalsy();
});

test("1) receiveAttack tracks a hit", () => {
    board.receiveAttack(2, 3);
    expect(board.board[2][3].ship.hits).toBe(1);
});

test("2) receiveAttack alerts if ship sunk", () => {
    board.receiveAttack(2, 2);
    board.receiveAttack(2, 4);
    board.receiveAttack(2, 5);
    expect(board.board[2][2].ship.isSunk()).toBeTruthy();
});

test("1) checkAllShipsSunk returns false if ships alive", () => {
    expect(board.checkAllShipsSunk()).toBe(false);
});

test("2) checkAllShipsSunk returns true if all ships sunk", () => {
    board.receiveAttack(1, 1);
    board.receiveAttack(2, 1);
    board.receiveAttack(3, 1);
    board.receiveAttack(4, 1);

    expect(board.checkAllShipsSunk()).toBe(true);
});

test("1) checkTileGuessed works", () => {
    expect(board.checkTileGuessed(5, 2)).toBe(false);
    expect(board.checkTileGuessed(4, 1)).toBe(true);
});

test("1) checkEmpty works", () => {
    expect(board.checkEmpty(5, 2)).toBe(true);
    expect(board.checkEmpty(4, 1)).toBe(false);
});
