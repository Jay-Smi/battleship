import elem from "./elem.js";
import "../../CSS/mappage.css";
import redPinSrc from "../../assets/images/red-pin.png";
import stickyNoteSrc from "../../assets/images/sticky-note.svg";

export default class MapPage {
    constructor(PubSub, container, newState) {
        this.PubSub = PubSub;

        //save state to grab player name
        this.state = newState;

        //save player name
        this.nameRef = newState.player.name;

        this.container = container;

        this.element = this.buildMap(newState);
    }

    updateView(changed) {
        // if changing to the map page
        if (changed.currentPage) {
            this.removeHomepage();
            this.container.appendChild(this.element);
        }
        // if pin hovered
        if (changed.stateMessage) {
            this.loadNote(changed);
        }
    }

    // clear the container, add timeout for transition
    removeHomepage() {
        const oldPage = document.querySelector(".homepageContainer");
        oldPage.classList.add("hide");
        setTimeout(() => oldPage.remove(), 750);
    }

    buildMap() {
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
                this.PubSub.publish("event", [
                    { type: "difficultySubmit", data: pin.id },
                    { type: "pageChange", data: "game" },
                ]);
            });
            pin.addEventListener("mouseenter", () => {
                this.PubSub.publish("event", [
                    { type: "changeMessage", data: pin.id },
                ]);
            });
        });

        const map = elem({
            prop: "div",
            className: "map",
            children: redPins,
        });

        return map;
    }

    removeMap() {
        const map = document.querySelector(".map");
        map.classList.add("hide");
        setTimeout(() => map.remove(), 750);
    }

    loadNote(data) {
        const oldNote = document.querySelector(".noteContainer") || null;

        if (oldNote) oldNote.remove();

        const container = document.querySelector(".map");
        const note = this.buildNote(data);
        container.appendChild(note);
    }

    buildNote(data) {
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
        switch (data.stateMessage) {
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
            id: data.stateMessage,
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
                            textContent: `Admiral ${this.nameRef},`,
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
