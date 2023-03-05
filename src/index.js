import Model from "./scripts/components/Model.js";

import ViewModel from "./scripts/ViewModel";

import App from "./scripts/DOM/App.js";

const model = new Model();
const vm = new ViewModel(model);
new App(vm, document.querySelector('#container'));
