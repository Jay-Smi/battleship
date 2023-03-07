import PubSubInterface from "../PubSubInterface.js";

import HomePage from "./homePage/HomePage.js";
import MapPage from "./mapPage/MapPage.js";
import GamePage from "./gamePage/GamePage.js";
import elem from "./elem.js";

export default class App extends PubSubInterface {
    constructor(viewModel, element) {
        // pass paramenter's to PubSubInterface's constructor
        super(viewModel, element);
    }

    // only updates if the model's currentPage has changed
    shouldUpdate(oldModel, newModel) {
        return oldModel.currentPage !== newModel.currentPage;
    }

    render({ currentPage }) {
        const appElement = elem({ prop: "div", id: "app" });

        if (currentPage === "homePage") {
            // create the page component, pass it the viewModel and it's container
            new HomePage(this.viewModel, appElement);
        } else if (currentPage === "mapPage") {
            new MapPage(this.viewModel, appElement);
        } else if (currentPage === "gamePage") {
            new GamePage(this.viewModel, appElement);
        }

        // return the new view component
        return appElement;
    }
}
