import Game from "./scripts/components/Game.js";
import ViewModel from "./scripts/ViewModel";
import App from "./scripts/DOM/App.js";

const model = new Game();
const vm = new ViewModel(model);
new App(vm, document.querySelector("#container"));
