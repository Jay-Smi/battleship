import elem from "./elem.js";
import "../../CSS/homepage.css";

export default class HomePage {
    constructor(pubsub, container) {
        this.PubSub = pubsub;

        this.container = container;

        this.element = this.homePage();
    }

    // empty the container, the load the homepage
    updateView() {
        this.clearContainer(this.container);

        this.container.appendChild(this.element);
    }

    clearContainer(container) {
        while (container.firstChild) {
            container.firstChild.remove();
        }
    }

    homePage() {
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
            children: [
                elem({
                    prop: "div",
                    textContent: "New Game",
                    className: "newGame",
                }),
            ],
        });

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

        newGame.firstChild.addEventListener("click", () => {
            this.PubSub.publish("event", [
                {
                    type: "pageChange",
                    data: "namePage",
                },
            ]);
        });

        return homepageContainer;
    }
}
