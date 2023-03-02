import elem from "./elem";
import HomePage from "./homePageDOM";
import NamePage from "./namePageDOM";
import MapPage from "./mapPageDOM";
import GameView from "./gamePageDOM";

export default class View {
    constructor(PubSub) {
        this.PubSub = PubSub;

        // listen for any change to the game's data
        this.PubSub.subscribe("modelChanged", (data) => {
            const bound = this.updateView.bind(this);
            bound(data);
        });

        this.container = document.querySelector("#container");

        // saves current state of page for comparrison
        this.currentState = {};
    }

    updateView(newState) {
        // Compare the new model to the
        // currently displayed model
        // determine what has changed
        // save what has changed in changed
        const changed = {};
        for (const [key, value] of Object.entries(newState)) {
            if (!this.isEqual(value, this.currentState[key])) {
                changed[key] = value;
            }
        }

        switch (newState.currentPage) {
            case "homePage":
                // if page changed to homepage create homepage
                if (changed.currentPage) {
                    this.currentPageView = new HomePage(
                        this.PubSub,
                        this.container
                    );
                }
                // if current page is homePage, run homePage's updateView method
                this.currentPageView.updateView(changed);
                break;

            case "namePage":
                if (changed.currentPage) {
                    this.currentPageView = new NamePage(this.PubSub);
                }
                this.currentPageView.updateView(changed);
                break;

            case "mapPage":
                if (changed.currentPage) {
                    this.currentPageView = new MapPage(
                        this.PubSub,
                        this.container,
                        newState
                    );
                }
                this.currentPageView.updateView(changed);

                break;

            case "game":
                //if changed to game screen load the game screen
                if (changed.currentPage) {
                    this.currentPageView = new GameView(
                        this.PubSub,
                        this.container,
                        newState
                    );
                }
                // if turn changed
                if (newState.currentTurn !== this.currentTurn) {
                    this.currentTurn = newState.currentTurn;
                    // update turn display on screen
                }

                // if player gameboard changed
                if (
                    newState.player.gameboard !==
                    this.currentState.player.gameboard
                ) {
                    this.currentState.player.gameboard =
                        newState.player.gameboard;
                    // update player gameboard on screen
                }

                // if AI gameboard changed
                if (newState.AI.gameboard !== this.currentState.AI.gameboard) {
                    this.currentState.AI.gameboard = newState.AI.gameboard;
                    // update AI info on screen
                }

                // if any other player info changed
                if (newState.player !== this.currentState.player) {
                    this.currentState.player = newState.player;
                    // update player info on screen
                }

                //if any other AI info changed
                if (newState.AI !== this.currentState.AI) {
                    this.currentState.AI = newState.AI;
                    // update AI info on screen
                }

                // update the display with the new info
                this.currentPageView.updateView(changed);

                break;
            default:
                // do nothing
                console.warn(
                    `Unrecognized currentPage 404 : ${newState.currentPage}`
                );
                break;
        }

        // save the new model as currentState
        this.currentState = newState;
    }

    isEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (typeof a === "object" && typeof b === "object") {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) {
                return false;
            }
            for (const key of keysA) {
                if (!this.isEqual(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
