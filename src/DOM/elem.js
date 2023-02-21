const elem = function (content, version = 1) {
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

export default elem;
