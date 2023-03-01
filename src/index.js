import PubSub from "./scripts/PubSub.js";
import Homepage from "./scripts/DOM/Homepage.js";
import Namepage from "./scripts/DOM/Namepage.js";
import Mappage from "./scripts/DOM/Mappage.js";
import Gamepage from "./scripts/DOM/Gamepage.js";
import Game from "./scripts/components/Game.js";
import GameStaging from "./scripts/DOM/Gamesta.js";

const PS = new PubSub();

const homepage = new Homepage(PS);
const namepage = new Namepage(PS);
const mappage = new Mappage(PS);
const gamepage = new Gamepage(PS);
const gamestaging = new GameStaging(PS);

const game = new Game(PS);

document.addEventListener("DOMContentLoaded", () => {
    PS.publish("pageChange", "loadHomepage");
});
