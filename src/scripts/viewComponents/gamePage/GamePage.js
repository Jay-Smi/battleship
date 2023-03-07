// import Board from "./boardView.js";
import PubSubInterface from "../../PubSubInterface.js";
import wavesSrc from "../../../assets/videos/ocean.mp4";
import wavesAlt from "../../../assets/images/wavesAlt.jpg";
import "../../../CSS/gamepage.css";
import elem from "../elem.js";
import GameMessage from "./GameMessage.js";
import ShipQueue from "./ShipQueue.js";
import BoardElem from "./BoardElem.js";
import Radar from "./Radar.js";
import Button from "./Button.js";
import OptionsMenu from "./OptionsMenu.js";

export default class GamePage extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    shouldUpdate(oldModel, newModel) {
        return (
            (oldModel.gameState !== newModel.gameState &&
                newModel.currentPage === "gamePage") ||
            oldModel.videoPlaying !== newModel.videoPlaying
        );
    }

    render(model) {
        switch (model.gameState) {
            case "placeShips":
                return this.buildPlaceShipsPage(model);
                break;
        }
    }

    buildPlaceShipsPage(model) {
        const shipContainer = elem({
            prop: "div",
            className: "shipContainer",
        });

        new ShipQueue(
            this.viewModel,
            shipContainer,
            (shipIndex, clickedIndex) => {
                this.clickedIndex = clickedIndex;
                this.draggedShipIndex = shipIndex;
            }
        );

        const messageContainer = elem({
            prop: "div",
            className: "shipFooter",
        });

        new GameMessage(this.viewModel, messageContainer);

        const game = elem({ prop: "div", className: "game" });

        if (model.gameState === "placeShips") {
            new BoardElem(this.viewModel, game, () => {
                return [
                    this.clickedIndex,
                    model.player.shipQueue[this.draggedShipIndex],
                ];
            });
        }

        const radarContainer = elem({
            prop: "div",
            className: "radarContainer",
        });

        new Radar(this.viewModel, radarContainer);

        const leftButtonContainer = elem({
            prop: "div",
            className: "leftButtonContainer",
        });
        const middleButtonContainer = elem({
            prop: "div",
            className: "leftButtonContainer",
        });
        const rightButtonContainer = elem({
            prop: "div",
            className: "leftButtonContainer",
        });
        const buttonContainer = elem({
            prop: "div",
            className: "buttonContainer",
            children: [
                leftButtonContainer,
                middleButtonContainer,
                rightButtonContainer,
            ],
        });

        new Button(this.viewModel, leftButtonContainer, "rotate");
        new Button(this.viewModel, middleButtonContainer, "autoPlace");
        new Button(this.viewModel, rightButtonContainer, "undo");

        const optionsContainer = elem({
            prop: "div",
            className: "optionsContainer",
        });

        new OptionsMenu(this.viewModel, optionsContainer);

        let waves = null;

        if (model.videoPlaying) {
            waves = elem({
                prop: "video",
                className: "waves",
                src: wavesSrc,
                autoplay: true,
                loop: true,
            });
        } else {
            waves = elem({
                prop: "img",
                src: wavesAlt,
                className: "wavesAlt",
            });
        }

        const gameContainer = elem({
            prop: "div",
            className: "gameContainer",
            children: [
                elem({
                    prop: "div",
                    className: "p1GridContainer",
                    children: [
                        waves,
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
                        optionsContainer,
                    ],
                }),
                elem({
                    prop: "div",
                    className: "p1OptionsContainer",
                    children: [
                        radarContainer,
                        elem({
                            prop: "div",
                            className: "p1ShipStage",
                            draggable: false,
                            children: [shipContainer, messageContainer],
                        }),
                        buttonContainer,
                    ],
                }),
            ],
        });
        return gameContainer;
    }
}
