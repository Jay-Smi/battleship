import PubSubInterface from "../PubSubInterface.js";

import HomePage from "./HomePage.js";
import NamePage from "./NamePage.js";
import MapPage from "./MapPage.js";
import GamePage from "./GamePage.js";
import elem from "./elem.js";

export default class App extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    render({currentPage}) {
        const appElement = elem({prop: 'div', id: 'app'});

        if(currentPage === 'homePage') {
            new HomePage(this.viewModel, appElement);
        } else if(currentPage === 'mapPage') {
            new MapPage(this.viewModel, appElement);
        } else if(currentPage === 'gamePage') {
            new GamePage(this.viewModel, appElement);
        }
        return appElement;
    }

}
