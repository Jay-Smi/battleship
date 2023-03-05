export default class ViewModel {
    constructor(model) {
        this.pubsubs = [];
        this.model = model;
    }

    register(pubsub) {
        this.pubsubs.push(pubsub);
        const element = pubsub.getElement();
        // TODO: check if any other pubsubs are tied to this element ^.  If they are, remove them from the pubsub list
        element.replaceChildren(pubsub.render(this.model));
    }

    updateModel(modelUpdateFunc) {
        const oldModel = JSON.parse(JSON.stringify(this.model));
        const newModel = modelUpdateFunc(oldModel);

        for (let key in newModel) {
            this.model[key] = newModel[key];
        }
        for (let pubsub of this.pubsubs) {
            if (pubsub.shouldUpdate(oldModel, newModel)) {
                const element = pubsub.getElement();
                element.replaceChildren(pubsub.render(this.model));
            }
        }
    }
}
