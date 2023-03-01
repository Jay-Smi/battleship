import "../../CSS/stagingscreen.css";
import elem from "./elem.js";
import wavesSrc from "../../assets/videos/ocean.mp4";

export default class Gamepage {
    constructor(PubSub) {
        this.PubSub = PubSub;
        this.PubSub.subscribe("pageChange", this.handlePageChange.bind(this));
    }
    handlePageChange(data) {
        if (data === "gamepage") this.loadGamePage();
    }
    loadGamePage() {
        const container = document.querySelector("#container");
        const element = this.buildGamepage();
        container.appendChild(element);
        this.PubSub.publish("pageChange", "gamestaging");
    }

    buildGamepage() {
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
                                elem({
                                    prop: "div",
                                    className: "shipContainer",
                                    children: [
                                        elem({
                                            prop: "div",
                                            className: "shipQueue",
                                            draggable: false,
                                        }),
                                        elem({
                                            prop: "div",
                                            className: "nextShipContainer",
                                            draggable: false,
                                        }),
                                    ],
                                }),
                                elem({
                                    prop: "div",
                                    className: "shipFooter",
                                    children: [
                                        elem({
                                            prop: "p",
                                            className: "stagePara",
                                            textContent: `Enemies approach. Deploy the fleet.`,
                                        }),
                                    ],
                                }),
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
