import elem from "./elem.js";
import "../../CSS/mappage.css";
import redPinSrc from "../../assets/images/red-pin.png";
import stickyNoteSrc from "../../assets/images/sticky-note.svg";

export default class Mappage {
    constructor(PubSub) {
        this.PubSub = PubSub;
        this.PubSub.subscribe("pageChange", this.handlePageChange.bind(this));
        this.PubSub.subscribe(
            "dataResponse",
            this.handleDataResponse.bind(this)
        );
        this.dataResponse = null;
    }
    handlePageChange(data) {
        if (data === "mappage") this.loadMap();
        if (data.hasOwnProperty("difficulty")) this.loadNote(data);
        if (data === "gamepage") this.removeMap();
    }

    handleDataResponse(data) {
        this.dataResponse = data;
    }

    loadMap() {
        const container = document.querySelector("#container");
        const element = this.buildMap();
        container.appendChild(element);
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
                this.PubSub.publish("pageChange", "gamepage");
                this.PubSub.publish("difficultySubmit", pin.id);
            });
            pin.addEventListener("mouseenter", () => {
                this.PubSub.publish("pageChange", { difficulty: pin.id });
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

        if (oldNote && oldNote.id === data.difficulty) return;
        if (oldNote) oldNote.remove();

        this.PubSub.publish("dataRequest", { type: "playerName" });
        const newData = Object.assign(data, this.dataResponse);
        const container = document.querySelector(".map");
        const note = this.buildNote(newData);
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
        switch (data.difficulty) {
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
            id: data.difficulty,
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
                            textContent: `Admiral ${data.name},`,
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
