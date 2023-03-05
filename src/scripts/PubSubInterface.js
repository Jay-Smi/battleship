export default class PubSubInterface {
    constructor(viewModel, element) {
        this.viewModel = viewModel;
        this.element = element;
        this.onInit();
    }

    onInit() {
        this.viewModel.register(this);
    }

    shouldUpdate(oldModel, newModel) {
        return true;
    }

    getElement() {
        return this.element;
    }
}
