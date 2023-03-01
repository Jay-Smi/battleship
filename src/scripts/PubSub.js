export default class PubSub {
    constructor() {
        this.subscribers = {
            pageChange: [],
            formSubmit: [],
            difficultySubmit: [],
            dataRequest: [],
            dataResponse: [],
            shipPlaced: [],
            gameStart: [],
            gameOver: [],
            playerTurn: [],
            playerShot: [],
            shipSunk: [],
        };
    }

    subscribe(eventType, callback) {
        this.subscribers[eventType].push(callback);
    }

    unsubscribe(eventType, callback) {
        this.subscribers[eventType] = this.subscribers[eventType].filter(
            (subscriber) => subscriber !== callback
        );
    }

    publish(eventType, data) {
        this.subscribers[eventType].forEach((subscriber) => subscriber(data));
    }
}
