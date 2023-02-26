import elem from "./elem";

function buildBoard(viewModel) {
    const gameboardContainer = elem({
        prop: "div",
        className: "p1GameboardContainer",
    });
    const board = elem({ prop: "div", className: "board" });
    const boardListeners = [];
    for (let y = 0; y < 10; y++) {
        for (let x = 9; x >= 0; x--) {
            let tile = elem({
                prop: "div",
                id: `${x}${y}`,
                className: "tile",
            });
            tile.classList.add(`x${x}`);
            tile.classList.add(`y${y}`);
            board.prepend(tile);

            // boardListeners.push({
            //     targetElem: tile,
            //     event: "click",
            //     type: "boardUpdate",
            //     newState: "gamePage",
            // });
            // boardListeners.push({
            //     targetElem: tile,
            //     event: "mouseenter",
            //     type: "boardUpdate",
            //     newState: "gamePage",
            // });
        }
    }
    gameboardContainer.appendChild(board);

    return {
        element: gameboardContainer,
        listeners: boardListeners,
    };
}

export default buildBoard;
