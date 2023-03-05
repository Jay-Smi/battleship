export default class ViewModel {
    constructor(model) {
        this.pubsubs = [];
        this.model = model;
    }

    register(pubsub) {
        this.pubsubs.push(pubsub);
        if (pubsub.shouldUpdate({}, this.model)) {
            pubsub.render(this.model);
        }
    }

    updateModel(modelUpdateFunc) {
        const oldModel = JSON.parse(JSON.stringify(this.model));
        const newModel = modelUpdateFunc(oldModel);

        for (let key in newModel) {
            this.model[key] = newModel[key];
        }
        for (let pubsub of this.pubsubs) {
            if (pubsub.shouldUpdate(oldModel, newModel)) {
                pubsub.render(this.model);
            }
        }
    }
}
