import elem from "./elem.js";
import "../../CSS/mappage.css";
import redPinSrc from "../../assets/images/red-pin.png";
import stickyNoteSrc from "../../assets/images/sticky-note.svg";
import PubSubInterface from "../PubSubInterface.js";

export default class MapPage extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    render({ stateMessage, player }) {
        const redPins = [
            elem({
                prop: "img",
                src: redPinSrc,
                className: "redPin1",
                id: "easy",
            }),
            elem({
                prop: "img",
                src: redPinSrc,
                className: "redPin2",
                id: "medium",
            }),
            elem({
                prop: "img",
                src: redPinSrc,
                className: "redPin3",
                id: "hard",
            }),
        ];

        redPins.forEach((pin) => {
            pin.addEventListener("click", () => {
                this.viewModel.updateModel((oldModel) => {
                    const newModel = { ...oldModel };
                    newModel.currentPage = "gamePage";
                    newModel.gameState = "placeShips";
                    newModel.stateMessage = "";
                    newModel.AI.difficulty = pin.id;
                    return newModel;
                });
            });
            if (stateMessage !== pin.id) {
                pin.addEventListener("mouseenter", () => {
                    this.viewModel.updateModel((oldModel) => {
                        return { stateMessage: pin.id };
                    });
                });
            }
        });

        const map = elem({
            prop: "div",
            className: "map",
            children: redPins,
        });

        if (stateMessage) {
            const note = this.buildNote(stateMessage, player);
            map.appendChild(note);
        }

        return map;
    }

    buildNote(stateMessage, player) {
        const noteOptions = {
            note1: {
                location: "Somalian Coast",
                difficulty: "Easy",
                para: "I regret to inform you that a group of Somalian pirates have successfully commandeered an Indian carrier group in the Arabian Sea. ",
            },
            note2: {
                location: "Black Sea",
                difficulty: "Medium",
                para: "I am writing to inform you about a group of Russian pirates who have commandeered a Russian carrier group. This group is a significant threat to the safety and security of the area.",
            },
            note3: {
                location: "South China Sea",
                difficulty: "Hard",
                para: "A group of Chinese pirates has managed to seize control of a Chinese carrier group, and it poses a significant threat to regional security.",
            },
        };
        let selectedOptions = {};
        switch (stateMessage) {
            case "easy":
                selectedOptions = noteOptions.note1;
                break;
            case "medium":
                selectedOptions = noteOptions.note2;
                break;
            case "hard":
                selectedOptions = noteOptions.note3;
                break;
        }
        const note = elem({
            prop: "article",
            className: "noteContainer",
            id: stateMessage,
            children: [
                elem({
                    prop: "img",
                    src: stickyNoteSrc,
                    className: "stickyNote",
                }),
                elem({
                    prop: "div",
                    className: "paraContainer",
                    children: [
                        elem({
                            prop: "p",
                            textContent: `Location: ${selectedOptions.location}`,
                        }),
                        elem({
                            prop: "p",
                            textContent: `Difficulty: ${selectedOptions.difficulty}`,
                        }),
                        elem({
                            prop: "p",
                            textContent: `Admiral ${player.name},`,
                        }),
                        elem({
                            prop: "p",
                            textContent: `${selectedOptions.para}`,
                        }),
                    ],
                }),
            ],
        });

        return note;
    }
}
