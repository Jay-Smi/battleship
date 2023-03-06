// import Board from "./boardView.js";
import ShipQueue from "./gameElements/ShipQueue.js";
import PubSubInterface from "../PubSubInterface.js";
import wavesSrc from "../../assets/videos/ocean.mp4";
import GameMessage from "./gameElements/GameMessage.js";
import "../../CSS/stagingscreen.css";
import elem from "./elem.js";
import BoardElem from "./gameElements/BoardElem.js";

export default class GamePage extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    shouldUpdate(oldModel, newModel) {
        return (
            oldModel.gameState === "placeShips" &&
            newModel.gameState !== "placeShips" &&
            oldModel.currentPage === "gamePage"
        );
    }

    render(model) {
        return this.buildGamepage(model);
    }

    buildGamepage(model) {
        const leftButton = elem({
            prop: "button",
            id: "activate",
            className: "rotateButton",
            children: [elem({ prop: "span" })],
        });
        const middleButton = elem({
            prop: "button",
            id: "activate",
            children: [elem({ prop: "span" })],
        });
        const rightButton = elem({
            prop: "button",
            id: "activate",
            children: [elem({ prop: "span" })],
        });

        if (model.gameState === "placeShips") {
            leftButton.addEventListener("click", () => {
                this.viewModel.updateModel((oldModel) => {
                    const newModel = { ...oldModel };
                    newModel.player.shipQueue[0].isHorizontal =
                        !newModel.player.shipQueue[0].isHorizontal;
                    return newModel;
                });
            });
        }

        const shipContainer = elem({
            prop: "div",
            className: "shipContainer",
        });

        new ShipQueue(this.viewModel, shipContainer);

        const messageContainer = elem({
            prop: "div",
            className: "shipFooter",
        });

        new GameMessage(this.viewModel, messageContainer);

        const game = elem({ prop: "div", className: "game" });

        if (model.gameState === "placeShips") {
            new BoardElem(this.viewModel, game);
        }

        const gameContainer = elem({
            prop: "div",
            className: "gameContainer",
            children: [
                elem({
                    prop: "div",
                    className: "p1GridContainer",
                    children: [
                        elem({
                            prop: "video",
                            className: "waves",
                            src: wavesSrc,
                            autoplay: true,
                            loop: true,
                        }),

                        elem({
                            prop: "div",
                            className: "shipBow",
                            children: [
                                elem({ prop: "div", className: "shipBowWood" }),
                                elem({ prop: "div", className: "flakBarrel1" }),
                                elem({ prop: "div", className: "flakBarrel2" }),
                                elem({ prop: "div", className: "flakBarrel3" }),
                                elem({ prop: "div", className: "flakBarrel4" }),
                                elem({ prop: "div", className: "flakBarrel5" }),
                                elem({ prop: "div", className: "flakBarrel6" }),
                                elem({ prop: "div", className: "flakCover" }),
                                elem({
                                    prop: "div",
                                    className: "flakCoverTop",
                                }),
                            ],
                        }),
                        game,
                    ],
                }),
                elem({
                    prop: "div",
                    className: "p1OptionsContainer",
                    children: [
                        elem({
                            prop: "div",
                            className: "radarContainer",
                            children: [
                                elem({
                                    prop: "ul",
                                    className: "radar",
                                    children: [
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                        elem({
                                            prop: "li",
                                            className: "radarLine",
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        elem({
                            prop: "div",
                            className: "p1ShipStage",
                            draggable: false,
                            children: [shipContainer, messageContainer],
                        }),
                        elem({
                            prop: "div",
                            className: "buttonContainer",
                            children: [
                                elem({
                                    prop: "div",
                                    className: "leftButton",
                                    children: [
                                        elem({
                                            prop: "div",
                                            className: "base",
                                            children: [leftButton],
                                        }),
                                        elem({
                                            prop: "div",
                                            className: "buttonText",
                                            textContent: "Rotate",
                                        }),
                                    ],
                                }),
                                elem({
                                    prop: "div",
                                    className: "middleButton",
                                    children: [
                                        elem({
                                            prop: "div",
                                            className: "base",
                                            children: [middleButton],
                                        }),
                                        elem({
                                            prop: "div",
                                            className: "buttonText",
                                            textContent: "Auto-place",
                                        }),
                                    ],
                                }),
                                elem({
                                    prop: "div",
                                    className: "rightButton",
                                    children: [
                                        elem({
                                            prop: "div",
                                            className: "base",
                                            children: [rightButton],
                                        }),
                                        elem({
                                            prop: "div",
                                            className: "buttonText",
                                            textContent: "Reset",
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        });
        return gameContainer;
    }
}
