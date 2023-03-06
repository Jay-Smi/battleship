import PubSubInterface from "../PubSubInterface.js";
import elem from "./elem.js";
import "../../CSS/homepage.css";
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
                    elem({ prop: "span", textContent: "Created by Gluttz, " }),
                    elem({
                        prop: "a",
                        textContent: "Image by upklyak on Freepik",
                        href: "https://www.freepik.com/free-vector/sunken-cruise-ship-sea-harbor-morning_21584915.htm#query=battleship%20background&position=32&from_view=search&track=ais",
                    }),
                ],
            })
        );

        return homepageContainer;
    }
}
