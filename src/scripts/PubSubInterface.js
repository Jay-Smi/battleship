export default class PubSubInterface {
    constructor(viewModel) {
        this.viewModel = viewModel;
    }

    onInit() {
        this.viewModel.register(this);
    }

    shouldUpdate(oldModel, newModel) {
        return true;
    }
}
