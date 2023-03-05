import PubSubInterface from "../PubSubInterface.js";
import elem from "./elem.js";
import "../../CSS/homepage.css";

export default class HomePage extends PubSubInterface {
    constructor(viewModel) {
        super(viewModel);

        this.container = container;

        this.element = this.homePage();

        super.onInit();
        this.render(this.viewModel);
    }

    shouldUpdate(oldModel, newModel) {
        return (
            // if swapped to homePage from another page
            (newModel.currentPage === "homePage" &&
                oldModel.currentPage !== "homePage") ||
            // if changed off of homePage
            (oldModel.currentPage === "homePage" &&
                newModel.currentPage !== "homePage")
        );
    }

    render({ currentPage }) {
        // if swapped to homePage from another page
        if (currentPage === "homePage") {
            this.clearContainer(this.container);

            this.container.appendChild(this.element);
        }
        // if changed off of homePage
        if (currentPage === "namePage") {
            const oldElement = document.querySelector(".newGame");
            if (oldElement) oldElement.remove();
        }
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
            this.viewModel.updateModel((oldModel) => {
                const newModel = { ...oldModel };
                newModel.currentPage = "namePage";
                return newModel;
            });
        });

        return homepageContainer;
    }
}
