import PubSubInterface from "../../PubSubInterface.js";
import elem from "../elem.js";
import "../../../CSS/homepage.css";
import HomePageInput from "./HomePageInput.js";

export default class HomePage extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    render(model) {
        const homepageContainer = elem({
            prop: "div",
            className: "homepageContainer",
        });

        homepageContainer.appendChild(
            elem({
                prop: "header",
                textContent: "BATTLESHIP",
                className: "homeHeader",
            })
        );

        const newGame = elem({
            prop: "main",
            className: "newGameContainer",
        });

        new HomePageInput(this.viewModel, newGame);

        homepageContainer.appendChild(newGame);
        homepageContainer.appendChild(
            elem({
                prop: "ul",
                className: "smokeContainer",
                children: [
                    elem({ prop: "li", className: "smoke" }),
                    elem({ prop: "li", className: "smoke" }),
                    elem({ prop: "li", className: "smoke" }),
                    elem({ prop: "li", className: "smoke" }),
                    elem({ prop: "li", className: "smoke" }),
                    elem({ prop: "li", className: "smoke" }),
                    elem({ prop: "li", className: "smoke" }),
                    elem({ prop: "li", className: "smoke" }),
                    elem({ prop: "li", className: "smoke" }),
                ],
            })
        );
        homepageContainer.appendChild(
            elem({
                prop: "footer",
                className: "footer",
                children: [
                    elem({ prop: "span", textContent: "Created by Gluttz" }),
                ],
            })
        );

        return homepageContainer;
    }
}
