function renderContainer() {
    const container = document.querySelector("#container");
    while (container.firstChild) {
        container.firstChild.remove();
    }
}

export default renderContainer;
