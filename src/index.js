import PubSub from "./scripts/PubSub.js";
import Game from "./scripts/components/_game.js";
import ViewModel from "./scripts/DOM/viewModelDOM";

const PS = new PubSub();
new ViewModel(PS);
new Game(PS);
