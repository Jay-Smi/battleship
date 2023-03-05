import "../../../CSS/stagingscreen.css";
import elem from "../elem";
import wavesSrc from "../../../assets/videos/ocean.mp4";
import PubSubInterface from "../../PubSubInterface.js";

export default class GameUI extends PubSubInterface {
    constructor(viewModel) {
        super(viewModel);

        this.container = document.querySelector("#container");
        this.gameContainer = null;

        this.shipContainer = null;

        this.messageContainer = null;

        this.leftButton = null;
        this.middleButton = null;
        this.rightButton = null;

        this.onInit();
    }

    onInit() {
        super.onInit();
    }

    shouldUpdate(oldModel, newModel) {
        return (
            // changed to game page
            (newModel.currentPage === "gamePage" &&
                oldModel.currentPage !== "gamePage") ||
            // changed off game page
            (oldModel.currentPage === "gamePage" &&
                newModel.currentPage !== "gamePage") ||
            // note changed
            (oldModel.stateMessage !== newModel.stateMessage &&
                newModel.currentPage === "gamePage" &&
                oldModel.currentPage === "gamePage")
        );
    }

    render(model) {
        if (
            model.currentPage === "gamePage" &&
            model.gameState === "placeShips"
        ) {
            if (this.gameContainer) this.gameContainer.remove();
            this.gameContainer = this.buildGamepage();
            this.container.appendChild(this.gameContainer);
        }
    }

    clearContainer(container) {
        while (container.firstChild) {
            container.firstChild.remove();
        }
    }

    buildGamepage() {
        this.leftButton = elem({
            prop: "button",
            id: "activate",
            className: "rotateButton",
            children: [elem({ prop: "span" })],
        });
        this.middleButton = elem({
            prop: "button",
            id: "activate",
            children: [elem({ prop: "span" })],
        });
        this.rightButton = elem({
            prop: "button",
            id: "activate",
            children: [elem({ prop: "span" })],
        });

        this.shipContainer = elem({
            prop: "div",
            className: "shipContainer",
        });

        this.messageContainer = elem({
            prop: "div",
            className: "shipFooter",
        });

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
                        elem({ prop: "div", className: "game" }),
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
                            children: [
                                this.shipContainer,
                                this.messageContainer,
                            ],
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
                                            children: [this.leftButton],
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
                                            children: [this.middleButton],
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
                                            children: [this.rightButton],
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
