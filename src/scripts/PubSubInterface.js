export default class PubSubInterface {
    constructor(viewModel, element) {
        // all view components will extend this
        this.viewModel = viewModel;

        // save view component's container for later
        this.element = element;

        // register the view component to the viewModel's pubsub
        this.onInit();
    }

    onInit() {
        this.viewModel.register(this);
    }

    shouldUpdate(oldModel, newModel) {
        // default components return true
        // this method can be overridden individually
        return true;
    }

    getElement() {
        return this.element;
    }
}
