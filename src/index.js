import PubSub from "./scripts/PubSub.js";
import Game from "./scripts/components/_game.js";
import View from "./scripts/DOM/viewDOM";

const PS = new PubSub();
new View(PS);
new Game(PS);
