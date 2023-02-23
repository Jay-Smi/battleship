import elem from "./elem.js";
import "../CSS/mapscreen.css";
import loadStagingScreen from "./loadStagingScreen.js";

import redPinSrc from "../assets/images/red-pin.png";
import stickyNoteSrc from "../assets/images/sticky-note.svg";

//add map under everything
//transition everything away
function loadMapScreen(options) {
    const body = document.querySelector("body");
    const map = buildMap(options);
    body.appendChild(map);
    const container = document.querySelector("#container");
    container.classList.add("hide");

    setTimeout(renderContainer, 750);
}

function renderContainer() {
    const container = document.querySelector("#container");

    container.remove();
}

function buildMap(options) {
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
        pin.addEventListener("mouseover", (e) => {
            buildNote(e.target.id, options);
        });
        pin.addEventListener("click", (e) => {
            options.difficulty = e.target.id;
            loadStagingScreen(options);
        });
    });

    const map = elem({
        prop: "div",
        className: "map",
        children: redPins,
    });

    return map;
}

function renderNote() {
    const note = document.querySelector(".noteContainer") || null;
    if (note) {
        note.remove();
    }
}

function buildNote(version, options) {
    const map = document.querySelector(".map");
    renderNote();
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
    switch (version) {
        case "easy":
            selectedOptions = noteOptions.note1;
            break;
        case "medium":
            selectedOptions = noteOptions.note2;
            break;
        case "hard":
            selectedOptions = noteOptions.note3;
    }
    const note = elem({
        prop: "article",
        className: "noteContainer",
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
                        textContent: `Admiral ${options.playerName},`,
                    }),
                    elem({
                        prop: "p",
                        textContent: `${selectedOptions.para}`,
                    }),
                ],
            }),
        ],
    });

    map.appendChild(note);
}

export default loadMapScreen;
