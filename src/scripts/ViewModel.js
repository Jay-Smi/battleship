export default class ViewModel {
    constructor(model) {
        this.pubsubs = [];
        this.model = model;
    }

    // each view component will individually listen for updates
    register(pubsub) {
        // add the component to the list of listeners
        this.pubsubs.push(pubsub);

        // get the listener's containing element
        const element = pubsub.getElement();

        // replace containing element's children with fresh component
        element.replaceChildren(pubsub.render(this.model));
    }

    // accepts a callback function from the updating view component
    updateModel(modelUpdateFunc) {
        // create a deep copy of the current model
        const oldModel = JSON.parse(JSON.stringify(this.model));

        // pass the model copy into updating component's callback
        // view will then decide what should be modified based on the user's input
        const newModel = modelUpdateFunc(oldModel);

        // update the model with the new values returned from the callback
        for (let key in newModel) {
            this.model[key] = newModel[key];
        }

        // go through the list of listening view components
        for (let pubsub of this.pubsubs) {
            // ask them if they want to update based on the old model and new
            if (pubsub.shouldUpdate(oldModel, newModel)) {
                // get the container of the view componenet
                const element = pubsub.getElement();

                // replace the component with the new version
                // renders return the new component
                element.replaceChildren(pubsub.render(this.model));
            }
        }
    }
}
