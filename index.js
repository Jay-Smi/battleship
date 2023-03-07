import Game from "./src/scripts/components/Game.js";
import ViewModel from "./src/scripts/ViewModel";
import App from "./src/scripts/DOM/App.js";

const model = new Game();
const vm = new ViewModel(model);
new App(vm, document.querySelector("#container"));
