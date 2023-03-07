import Game from "./scripts/gameComponents/Game.js";
import ViewModel from "./scripts/ViewModel";
import App from "./scripts/viewComponents/App.js";

const model = new Game();

const viewModel = new ViewModel(model);

const view = new App(viewModel, document.querySelector("#container"));
