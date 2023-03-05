import Player from "./Player";

export default class AI extends Player {
    constructor() {
        super();
        super.name = "AI";
        this.difficulty = null;
    }
}
