// import Board from "./boardView.js";
import PubSubInterface from "../../PubSubInterface.js";
import wavesAlt from "../../../assets/images/wavesAlt.jpg";
import "../../../CSS/gamepage.css";
import elem from "../elem.js";
import GameMessage from "./GameMessage.js";
import ShipQueue from "./ShipQueue.js";
import playerBoardElem from "./playerBoardElem.js";
import Radar from "./Radar.js";
import Button from "./Button.js";
import OptionsMenu from "./OptionsMenu.js";
import ScoreContainer from "./ScoreContainer.js";
import AIBoardElem from "./AIBoardElem.js";

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
                return this.buildPlaceShipsStage(model);
                break;
            case "inGame":
                return this.buildInGameStage(model);
                break;
        }
    }

    buildPlaceShipsStage(model) {
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

        new playerBoardElem(this.viewModel, game, () => {
            return [
                this.clickedIndex,
                model.player.shipQueue[this.draggedShipIndex],
            ];
        });

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

        let waves = elem({
            prop: "img",
            src: wavesAlt,
            className: "wavesAlt",
        });

        if (model.videoPlaying) {
            waves.classList.add("animate");
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

    buildInGameStage(model) {
        const playerBoardContainer = elem({
            prop: "div",
            className: "playerBoardContainer",
        });
        const AIBoardContainer = elem({
            prop: "div",
            className: "AIBoardContainer",
        });
        const game = elem({
            prop: "div",
            className: "game",
            children: [playerBoardContainer, AIBoardContainer],
        });
        new playerBoardElem(this.viewModel, playerBoardContainer, () => {
            return [
                this.clickedIndex,
                model.player.shipQueue[this.draggedShipIndex],
            ];
        });

        new AIBoardElem(this.viewModel, AIBoardContainer, () => {
            return [
                this.clickedIndex,
                model.player.shipQueue[this.draggedShipIndex],
            ];
        });

        let waves = elem({
            prop: "img",
            src: wavesAlt,
            className: "wavesAlt",
        });

        if (model.videoPlaying) {
            waves.classList.add("animate");
        }

        const playerScoreContainer = elem({
            prop: "div",
            className: "playerScoreContainer",
        });

        new ScoreContainer(this.viewModel, playerScoreContainer, "player");

        const messageContainer = elem({
            prop: "div",
            className: "shipFooter",
        });

        new GameMessage(this.viewModel, messageContainer);

        const radarContainer = elem({
            prop: "div",
            className: "radarContainer",
        });

        new Radar(this.viewModel, radarContainer);

        const AIScoreContainer = elem({
            prop: "div",
            className: "AIScoreContainer",
        });

        new ScoreContainer(this.viewModel, AIScoreContainer, "AI");

        const optionsContainer = elem({
            prop: "div",
            className: "optionsContainer",
        });

        optionsContainer.classList.add("inGame");

        new OptionsMenu(this.viewModel, optionsContainer);

        const playerStage = elem({
            prop: "div",
            className: "playerStage",
            children: [playerScoreContainer, messageContainer],
        });

        const AIStage = elem({
            prop: "div",
            className: "AIStage",
            children: [AIScoreContainer, optionsContainer],
        });

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
                    ],
                }),
                elem({
                    prop: "div",
                    className: "p1OptionsContainer",
                    children: [playerStage, radarContainer, AIStage],
                }),
            ],
        });
        return gameContainer;
    }
}
