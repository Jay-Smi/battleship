import elem from "./elem";
import stickyNoteSrc from "../assets/images/sticky-note.svg";

function buildNote(viewModel) {
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
    switch (viewModel.note) {
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
                        textContent: `Admiral ${viewModel.playerName},`,
                    }),
                    elem({
                        prop: "p",
                        textContent: `${selectedOptions.para}`,
                    }),
                ],
            }),
        ],
    });

    return { element: note };
}

export default buildNote;
