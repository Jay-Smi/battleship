import "../CSS/stagingscreen.css";
import elem from "./elem.js";
import wavesSrc from "../assets/videos/ocean.mp4";

function loadStagingScreen(options) {
    const map = document.querySelector(".map");
    map.classList.add("hide");
    setTimeout(() => {
        map.remove();
    }, 750);
    const body = document.querySelector("body");
    const gameContainer = buildUI(options);
    body.prepend(gameContainer);
}

function gamePage(viewModel) {
    const leftButton = elem({
        prop: "button",
        id: "activate",
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
    const buttons = [leftButton, middleButton, rightButton];
    const buttonListeners = [];

    buttons.forEach((btn) => {
        buttonListeners.push({
            targetElem: btn,
            event: "click",
            type: "stateChange",
            newState: "gamePage",
        });
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
                            elem({ prop: "div", className: "flakCoverTop" }),
                        ],
                    }),
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
                        children: [
                            elem({ prop: "div", className: "shipContainer" }),
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
                                        textContent: "Begin",
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

    return {
        element: gameContainer,
        listeners: buttonListeners,
    };
}

export default gamePage;
