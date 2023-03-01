import elem from "./elem.js";
import "../../CSS/homepage.css";

export default class Homepage {
    constructor(PubSub) {
        this.PubSub = PubSub;
        this.PubSub.subscribe("pageChange", this.handlePageChange.bind(this));
    }

    handlePageChange(data) {
        if (data === "loadHomepage") this.loadHomepage(data);
        if (data === "loadNamepage") this.removeNewGameBtn();
        // this.PubSub.unsubscribe("pageChange", this.handlePageChange);
    }

    loadHomepage() {
        const element = this.homePage();
        const container = document.querySelector("#container");
        this.clearContainer(container);
        container.appendChild(element);
    }

    removeNewGameBtn() {
        const oldElement = document.querySelector(".newGame");
        oldElement.remove();
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
            this.PubSub.publish("pageChange", "loadNamepage");
        });

        return homepageContainer;
    }
}
