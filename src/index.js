import Model from "./scripts/components/Model.js";

import ViewModel from "./scripts/ViewModel";

import HomePage from "./scripts/DOM/HomePage.js";
import NamePage from "./scripts/DOM/NamePage.js";
import MapPage from "./scripts/DOM/MapPage.js";
import GamePage from "./scripts/DOM/GamePage.js";

const model = new Model();

const vm = new ViewModel(model);

new HomePage(vm);
new NamePage(vm);
new MapPage(vm);
new GamePage(vm);
