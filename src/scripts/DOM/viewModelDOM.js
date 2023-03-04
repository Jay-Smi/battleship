import elem from "./elem";
import HomePage from "./homePageView";
import NamePage from "./namePageView";
import MapPage from "./mapPageView";
import GameView from "./gameView/gameView.js";

export default class ViewModel {
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
        console.log("currentState", this.currentState);
        console.log("newState", newState);
        console.log("changed", changed);

        // currently changed will contain the entire player
        // obj even if only 1 ship's orientation has been rotated
        // resulting in the need for direct comparison for certain things
        // tried for too long trying to make viewModel universal
        // sorry for the following spaghetti

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
                if (changed.stateMessage) {
                }
                if (changed.currentTurn) {
                    this.currentTurn = newState.currentTurn;
                    // update turn display on screen
                }
                if (changed.player) {
                    // if player shipQueue's active ship is the same
                    // and the orientation is different
                    if (
                        newState.player.shipQueue[0].name ===
                            this.currentState.player.shipQueue[0].name &&
                        newState.player.shipQueue[0].isHorizontal !==
                            this.currentState.player.shipQueue[0].isHorizontal
                    ) {
                        this.currentPageView.shipQueue.rotateActiveShip();
                        this.currentState = newState;
                        return;
                    }

                    // shipQueue size changed, ship placed
                    if (
                        newState.player.shipQueue.length !==
                        this.currentState.player.length
                    ) {
                        this.currentPageView.placeShip(newState);
                    }

                    // if player gameboard changed
                    if (
                        JSON.stringify(newState.player.gameboard) !==
                        JSON.stringify(this.currentState.player.gameboard)
                    ) {
                        // console.log("gameboardChanged");
                        this.currentState.player.gameboard =
                            newState.player.gameboard;
                        // update player gameboard on screen
                    }
                }
                if (changed.AI) {
                    // if AI gameboard changed
                    if (
                        newState.AI.gameboard !== this.currentState.AI.gameboard
                    ) {
                        this.currentState.AI.gameboard = newState.AI.gameboard;
                        // update AI info on screen
                    }
                }
                // update the display with the new info
                // this.currentPageView.updateView(changed);

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
        // If a and b are identical objects, return true
        if (a === b) return true;

        // Check if a and b are arrays
        if (Array.isArray(a) && Array.isArray(b)) {
            // Check if the length of the arrays are the same
            if (a.length !== b.length) return false;

            // Check each element of the arrays
            for (let i = 0; i < a.length; i++) {
                if (!this.isEqual(a[i], b[i])) return false;
            }

            // If all elements are equal, return true
            return true;
        }

        // Check if a and b are objects
        if (typeof a === "object" && typeof b === "object") {
            // check for a specific flaw in my design D:
            if (a && b === null) return false;

            // Check if the number of keys are the same
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);

            if (keysA.length !== keysB.length) return false;

            // Check each key and value
            for (let key of keysA) {
                if (!this.isEqual(a[key], b[key])) return false;
            }

            // If all keys and values are equal, return true
            return true;
        }

        // If a and b are not arrays or objects, compare them directly
        return a === b;
    }
}
