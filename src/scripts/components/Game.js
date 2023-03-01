import PubSub from "../PubSub.js";
import Player from "./player.js";
import AI from "./AI.js";

export default class Game {
    constructor(PubSub) {
        this.PubSub = PubSub;
        this.player = null;
        this.AI = null;
        this.turn = "player";
        this.PubSub.subscribe("formSubmit", this.handleFormSubmit.bind(this));
        this.PubSub.subscribe(
            "difficultySubmit",
            this.handleDifficultySubmit.bind(this)
        );
        this.PubSub.subscribe("dataRequest", this.handleDataRequest.bind(this));
    }

    handleFormSubmit(data) {
        this.player = new Player(data);
    }

    handleDifficultySubmit(data) {
        this.AI = new AI(data);
    }

    handleDataRequest(dataRequest) {
        let data = null;
        if (dataRequest["type"] === "playerName") data = this.player.name;
        if (dataRequest["type"] === "game") data = this;

        this.PubSub.publish("dataResponse", data);
    }

    buildAIResponse() {}
}
