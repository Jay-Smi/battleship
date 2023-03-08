import elem from "../elem";
import PubSubInterface from "../../PubSubInterface";
import carrierSrc from "../../../assets/images/Carrier.svg";
import battleshipSrc from "../../../assets/images/Battleship2.svg";
import destroyerSrc from "../../../assets/images/Destroyer.svg";
import submarineSrc from "../../../assets/images/Submarine.svg";
import patrolBoatSrc from "../../../assets/images/Patrol-Boat.svg";

export default class ScoreContainer extends PubSubInterface {
    constructor(viewModel, element, version) {
        super(viewModel, element);
        this.version = version;
    }

    shouldUpdate(oldModel, newModel) {
        return true;
    }

    render(model) {
        const player = this.version === "player" ? model.player : model.AI;
        return this.buildScoreContainer(player);
    }

    buildScoreContainer(player) {
        const scoreContainer = elem({
            prop: "div",
            className: "scoreContainer",
        });
        player.name === "AI"
            ? scoreContainer.classList.add(`AIScore`)
            : scoreContainer.classList.add(`playerScore`);

        const shipList = player.gameboard.ships;

        shipList.forEach((ship, index) => {
            const top = elem({ prop: "div", className: "topSection" });
            const mid = elem({ prop: "div", className: "midSection" });
            const bot = elem({ prop: "div", className: "botSection" });

            const shipIcon = elem({
                prop: "img",
                className: "scoreboardShipOverlay",
            });

            switch (ship.name) {
                case "Carrier":
                    shipIcon.src = carrierSrc;
                    break;
                case "Battleship":
                    shipIcon.src = battleshipSrc;
                    break;
                case "Destroyer":
                    shipIcon.src = destroyerSrc;
                    break;
                case "Submarine":
                    shipIcon.src = submarineSrc;
                    break;
                case "Patrol-Boat":
                    shipIcon.src = patrolBoatSrc;
            }
            const score = elem({
                prop: "div",
                className: "shipScore",
                textContent: `${ship.size - ship.hits} / ${ship.size}`,
            });

            mid.appendChild(score);

            if (!ship.sunk) {
                shipIcon.classList.add("alive");
                top.appendChild(shipIcon);
            } else {
                shipIcon.classList.add("sunk");
                bot.appendChild(shipIcon);
            }

            const shipCol = elem({
                prop: "div",
                className: "shipCol",
                children: [top, mid, bot],
            });

            scoreContainer.appendChild(shipCol);
        });
        return scoreContainer;
    }
}
