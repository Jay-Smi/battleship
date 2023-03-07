const elem = (content, version = 1) => {
    let el = document.createElement(content["prop"]);
    let text = content["textContent"];
    if (text) {
        el.textContent = text;
    }
    let id = content["id"];
    if (id) {
        el.id = id;
    }
    let className = content["className"];
    if (className) {
        el.className = className;
    }
    let HTML = content["innerHTML"];
    if (HTML) {
        el.innerHTML = HTML;
    }
    let src = content["src"];
    if (src) {
        el.src = src;
    }
    let forI = content["for"];
    if (forI) {
        el.for = forI;
    }
    let type = content["type"];
    if (type) {
        el.type = type;
    }
    let name = content["name"];
    if (name) {
        el.name = name;
    }
    let value = content["value"];
    if (value) {
        el.value = value;
    }
    let placeholder = content["placeholder"];
    if (placeholder) {
        el.placeholder = placeholder;
    }
    let spellcheck = content["spellcheck"];
    if (spellcheck) {
        el.spellcheck = spellcheck;
    }
    let required = content["required"];
    if (required) {
        el.required = true;
    }
    let checked = content["checked"];
    if (checked) {
        el.checked = true;
    }
    let href = content["href"];
    if (href) {
        el.href = href;
    }
    let autoplay = content["autoplay"];
    if (autoplay) {
        el.autoplay = true;
    }
    let muted = content["muted"];
    if (muted) {
        el.muted = true;
    }
    let loop = content["loop"];
    if (loop) {
        el.loop = true;
    }
    let draggable = content["draggable"];
    if (draggable) {
        el.draggable = true;
    }
    let min = content["min"];
    if (min) {
        el.min = min;
    }
    let max = content["max"];
    if (max) {
        el.max = max;
    }
    let children = content["children"];
    if (children) {
        for (let child of children) {
            if (version === 2) {
                el.appendChild(elem(child, 2));
            } else {
                el.appendChild(child);
            }
        }
    }
    return el;
};

// function elem(content) {
//     const el = document.createElement(content["prop"]);

//     for (let key in content) {
//         if (content[key] === "prop") {
//             continue;
//         } else if (key === "classList") {
//             for (let className of content[classList]) {
//                 el.classList.add(content[classList][className]);
//             }
//         } else if (key === "children") {
//             console.log(content[key]);
//             for (let child of content[key]) {
//                 el.appendChild(elem(content[key][child]));
//             }
//         } else {
//             el[key] = content[key];
//         }
//     }

//     return el;
// }

export default elem;
