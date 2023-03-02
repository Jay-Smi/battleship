export default class PubSub {
    constructor() {
        //subs stored in array per event
        //gamedata listens for "event"
        //view listens for modelChanged
        this.subscribers = {};
    }

    //adds a class' callback to the event array
    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }

        this.subscribers[event].push(callback);
    }

    //removes callback from event array
    unsubscribe(event, callback) {
        if (this.subscribers[event]) {
            const index = this.subscribers[event].indexOf(callback);
            if (index !== -1) {
                this.subscribers[event].splice(index, 1);
            }
        }
    }

    //announces to every callback that's subscribed to the event
    //passes callback data
    publish(event, data) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach((callback) => {
                callback(data);
            });
        }
    }
}
//pageChange: [],
//formSubmit: [],
//difficultySubmit: [],
//dataRequest: [],
//dataResponse: [],
//shipPlaced: [],
//gameStart: [],
//gameOver: [],
//playerTurn: [],
//playerShot: [],
//shipSunk: [],
