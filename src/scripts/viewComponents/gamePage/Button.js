import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";
import {
    placeShipRandomly,
    checkAllShipsPlaced,
    resetBoard,
    resetShips,
} from "../../gameComponents/Game.js";

export default class Button extends PubSubInterface {
    constructor(viewModel, element, type) {
        super(viewModel, element);
        this.type = type;
    }

    shouldUpdate(oldModel, newModel) {
        return newModel.gameState === "placeShips";
    }

    render(model) {
        switch (this.type) {
            case "rotate":
                if (model.allShipsPlaced) {
                    return this.buildStartButton(model);
                    break;
                }
                return this.buildRotateButton(model);
                break;
            case "autoPlace":
                return this.buildAutoPlaceButton(model);
                break;
            case "undo":
                return this.buildUndoButton(model);
                break;
            // case "start":
            //     return this.buildStartButton(model);
            //     break;
        }
    }

    buildRotateButton(model) {
        const rotateButton = elem({
            prop: "button",
            id: "activate",
            className: "rotateButton",
            children: [elem({ prop: "span" })],
        });

        rotateButton.addEventListener("click", () => {
            this.viewModel.updateModel((oldModel) => {
                const newModel = { ...oldModel };
                newModel.player.shipQueue[0].isHorizontal =
                    !newModel.player.shipQueue[0].isHorizontal;
                return newModel;
            });
        });

        const buttonHousing = elem({
            prop: "div",
            className: "leftButton",
            children: [
                elem({
                    prop: "div",
                    className: "base",
                    children: [rotateButton],
                }),
                elem({
                    prop: "div",
                    className: "buttonText",
                    textContent: "Rotate",
                }),
            ],
        });

        return buttonHousing;
    }

    buildAutoPlaceButton(model) {
        const autoPlaceButton = elem({
            prop: "button",
            id: "activate",
            children: [elem({ prop: "span" })],
        });

        autoPlaceButton.addEventListener("click", () => {
            this.viewModel.updateModel((oldModel) => {
                const newModel = JSON.parse(JSON.stringify(oldModel));
                newModel.dropQueue.push(JSON.parse(JSON.stringify(oldModel)));
                if (newModel.player.shipQueue.length === 0) {
                    resetBoard(newModel.player.gameboard);
                    resetShips(newModel.player);
                }

                while (newModel.player.shipQueue.length > 0) {
                    const ship = newModel.player.shipQueue.shift();

                    const { newGameboard, newShip } = placeShipRandomly(
                        ship,
                        newModel.player.gameboard
                    );
                    newModel.player.gameboard = newGameboard;
                    newModel.player.gameboard.ships.push(newShip);
                }

                const allPlaced = checkAllShipsPlaced(newModel.player);

                if (allPlaced) {
                    newModel.allShipsPlaced = true;
                    newModel.stateMessage = `Good luck Admiral ${newModel.player.name}`;
                }

                return newModel;
            });
        });

        const autoPlaceHousing = elem({
            prop: "div",
            className: "middleButton",
            children: [
                elem({
                    prop: "div",
                    className: "base",
                    children: [autoPlaceButton],
                }),
                elem({
                    prop: "div",
                    className: "buttonText",
                    textContent: "Auto-place",
                }),
            ],
        });

        return autoPlaceHousing;
    }

    buildUndoButton(model) {
        const undoButton = elem({
            prop: "button",
            id: "activate",
            children: [elem({ prop: "span" })],
        });

        undoButton.addEventListener("click", () => {
            if (model.dropQueue.length > 0) {
                this.viewModel.updateModel((oldModel) => {
                    const newModel = oldModel.dropQueue.pop();

                    return newModel;
                });
            }
        });

        const undoButtonHousing = elem({
            prop: "div",
            className: "rightButton",
            children: [
                elem({
                    prop: "div",
                    className: "base",
                    children: [undoButton],
                }),
                elem({
                    prop: "div",
                    className: "buttonText",
                    textContent: "Undo",
                }),
            ],
        });

        return undoButtonHousing;
    }

    buildStartButton(model) {
        const startButton = elem({
            prop: "button",
            id: "activate",
            children: [elem({ prop: "span" })],
        });

        startButton.addEventListener("click", (e) => {
            this.viewModel.updateModel((oldModel) => {
                const newModel = JSON.parse(JSON.stringify(oldModel));
                newModel.dropQueue.push(JSON.parse(JSON.stringify(oldModel)));
                newModel.gameState = "inGame";
                return newModel;
            });
        });

        const startButtonHousing = elem({
            prop: "div",
            className: "leftButton",
            children: [
                elem({
                    prop: "div",
                    className: "base",
                    children: [startButton],
                }),
                elem({
                    prop: "div",
                    className: "buttonText",
                    textContent: "Begin",
                }),
            ],
        });

        return startButtonHousing;
    }
}
