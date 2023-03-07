import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";

export default class Radar extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    shouldUpdate(oldModel, newModel) {
        return (
            oldModel.AI.gameboard.ships.length !==
                newModel.AI.gameboard.ships.length ||
            oldModel.player.gameboard.ships.length !==
                newModel.player.gameboard.ships.length
        );
    }

    render(model) {
        return this.buildRadar(model);
    }

    buildRadar(model) {
        const radar = elem({
            prop: "ul",
            className: "radar",
            children: [
                elem({
                    prop: "li",
                    className: "radarLine",
                }),
                elem({
                    prop: "li",
                    className: "radarLine",
                }),
                elem({
                    prop: "li",
                    className: "radarLine",
                }),
                elem({
                    prop: "li",
                    className: "radarLine",
                }),
                elem({
                    prop: "li",
                    className: "radarLine",
                }),
                elem({
                    prop: "li",
                    className: "radarLine",
                }),
                elem({
                    prop: "li",
                    className: "radarLine",
                }),
            ],
        });

        const enemies = model.AI.gameboard.ships;
        enemies.forEach((ship, index) => {
            radar.appendChild(
                elem({ prop: "li", className: `enemyPing${index}` })
            );
        });

        const friendly = model.player.gameboard.ships;
        friendly.forEach((ship, index) => {
            radar.appendChild(
                elem({ prop: "li", className: `friendlyPing${index}` })
            );
        });

        return radar;
    }
}
