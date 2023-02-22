/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM/elem.js":
/*!*************************!*\
  !*** ./src/DOM/elem.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const elem = function (content) {
  let version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  let el = document.createElement(content["prop"]);
  let text = content["textContent"];
  if (text) {
    el.textContent = text;
  }
  let id = content["id"];
  if (id) {
    el.id = id;
  }
  let className = content["className"];
  if (className) {
    el.className = className;
  }
  let HTML = content["innerHTML"];
  if (HTML) {
    el.innerHTML = HTML;
  }
  let src = content["src"];
  if (src) {
    el.src = src;
  }
  let forI = content["for"];
  if (forI) {
    el.for = forI;
  }
  let type = content["type"];
  if (type) {
    el.type = type;
  }
  let name = content["name"];
  if (name) {
    el.name = name;
  }
  let value = content["value"];
  if (value) {
    el.value = value;
  }
  let placeholder = content["placeholder"];
  if (placeholder) {
    el.placeholder = placeholder;
  }
  let spellcheck = content["spellcheck"];
  if (spellcheck) {
    el.spellcheck = spellcheck;
  }
  let required = content["required"];
  if (required) {
    el.required = true;
  }
  let checked = content["checked"];
  if (checked) {
    el.checked = true;
  }
  let href = content["href"];
  if (href) {
    el.href = href;
  }
  let autoplay = content["autoplay"];
  if (autoplay) {
    el.autoplay = true;
  }
  let muted = content["muted"];
  if (muted) {
    el.muted = true;
  }
  let children = content["children"];
  if (children) {
    for (let child of children) {
      if (version === 2) {
        el.appendChild(elem(child, 2));
      } else {
        el.appendChild(child);
      }
    }
  }
  return el;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elem);

/***/ }),

/***/ "./src/DOM/loadHomescreen.js":
/*!***********************************!*\
  !*** ./src/DOM/loadHomescreen.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderContainer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderContainer.js */ "./src/DOM/renderContainer.js");
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elem.js */ "./src/DOM/elem.js");
/* harmony import */ var _loadNameScreen_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loadNameScreen.js */ "./src/DOM/loadNameScreen.js");
/* harmony import */ var _assets_images_homescreen_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/images/homescreen.jpg */ "./src/assets/images/homescreen.jpg");
/* harmony import */ var _CSS_homescreen_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CSS/homescreen.css */ "./src/CSS/homescreen.css");





function loadHomescreen() {
  (0,_renderContainer_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const container = document.querySelector("#container");
  container.style.backgroundImage = _assets_images_homescreen_jpg__WEBPACK_IMPORTED_MODULE_3__;
  container.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    prop: "header",
    textContent: "BATTLESHIP",
    className: "homeHeader"
  }));
  const newGame = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    prop: "main",
    className: "newGameContainer",
    children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      textContent: "New Game",
      className: "newGame"
    })]
  });
  newGame.firstChild.addEventListener("click", () => {
    (0,_loadNameScreen_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  });
  container.appendChild(newGame);
  container.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    prop: "ul",
    children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "li"
    })]
  }));
  container.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    prop: "footer",
    className: "footer",
    children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "span",
      textContent: "Created by Jayson S, "
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "a",
      textContent: "Image by upklyak on Freepik",
      href: "https://www.freepik.com/free-vector/sunken-cruise-ship-sea-harbor-morning_21584915.htm#query=battleship%20background&position=32&from_view=search&track=ais"
    })]
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadHomescreen);

/***/ }),

/***/ "./src/DOM/loadMapScreen.js":
/*!**********************************!*\
  !*** ./src/DOM/loadMapScreen.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elem.js */ "./src/DOM/elem.js");
/* harmony import */ var _CSS_mapscreen_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CSS/mapscreen.css */ "./src/CSS/mapscreen.css");
/* harmony import */ var kampos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! kampos */ "./node_modules/kampos/index.js");
/* harmony import */ var _assets_images_green_pin_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/images/green-pin.png */ "./src/assets/images/green-pin.png");
/* harmony import */ var _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/images/red-pin.png */ "./src/assets/images/red-pin.png");


// import * as kampos from "../../node_modules/kampos";




//add map under everything
//transition everything away
function loadMapScreen(options) {
  console.log(Kampos);
  const body = document.querySelector("body");
  const redPin1 = new Image();
  redPin1.src = _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_4__;
  redPin1.classList.add("redPin1");
  const redPin2 = new Image();
  redPin2.src = _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_4__;
  redPin2.classList.add("redPin2");
  const redPin3 = new Image();
  redPin3.src = _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_4__;
  redPin3.classList.add("redPin3");
  const greenPin = new Image();
  greenPin.src = _assets_images_green_pin_png__WEBPACK_IMPORTED_MODULE_3__;
  greenPin.classList.add("greenPin");
  const map = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    prop: "div",
    className: "map"
  });
  map.appendChild(redPin1);
  map.appendChild(redPin2);
  map.appendChild(redPin3);
  map.appendChild(greenPin);
  body.prepend(map);
  const container = document.querySelector("#container");
  container.classList.add("hide");
  setTimeout(renderContainer, 2000);
}
function renderContainer() {
  const container = document.querySelector("#container");
  container.remove();
}

// function loadImage(src) {
//     return new Promise((resolve) => {
//         const img = new Image();
//         img.crossOrigin = "anonymous";

//         img.onload = function () {
//             resolve(this);
//         };

//         img.src = src;
//     });
// }
// // get the image URLs
// const imageFromSrc = document.querySelector("#source-from").src;
// const imageToSrc = document.querySelector("#source-to").dataset.src;
// // load images
// const promisedImages = [loadImage(imageFromSrc), loadImage(imageToSrc)];

// const turbulence = kampos.effects.turbulence({
//     noise: kampos.noise.perlinNoise,
// });

// const WIDTH = 854;
// const HEIGHT = 480;
// const CELL_FACTOR = 4;
// const AMPLITUDE = CELL_FACTOR / WIDTH;

// turbulence.frequency = { x: AMPLITUDE, y: AMPLITUDE };
// turbulence.octaves = 8;
// turbulence.isFractal = true;

// const mapTarget = document.createElement("canvas");
// mapTarget.width = WIDTH;
// mapTarget.height = HEIGHT;

// const dissolveMap = new kampos.Kampos({
//     target: mapTarget,
//     effects: [turbulence],
//     noSource: true,
// });

// dissolveMap.draw();

// const dissolve = kampos.transitions.dissolve();

// dissolve.map = mapTarget;
// dissolve.high = 0.3; // for liquid-like effect

// const target = document.querySelector("#target");
// const hippo = new kampos.Kampos({ target, effects: [dissolve] });

// Promise.all(promisedImages)
//     .then(([fromImage, toImage]) => {
//         hippo.setSource({ media: fromImage, width: WIDTH, height: HEIGHT });

//         dissolve.to = toImage;
//         dissolve.textures[1].update = true;
//     })
//     .then(function () {
//         hippo.play((time) => {
//             turbulence.time = time * 2;
//             dissolveMap.draw();
//             dissolve.progress = Math.abs(Math.sin(time * 2e-4)); // multiply time by a factor to slow it down a bit
//         });
//     });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadMapScreen);

/***/ }),

/***/ "./src/DOM/loadNameScreen.js":
/*!***********************************!*\
  !*** ./src/DOM/loadNameScreen.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _loadMapScreen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadMapScreen.js */ "./src/DOM/loadMapScreen.js");
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elem.js */ "./src/DOM/elem.js");
/* harmony import */ var _CSS_namescreen_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CSS/namescreen.css */ "./src/CSS/namescreen.css");



function loadNameScreen() {
  const newGameContainer = document.querySelector(".newGameContainer");
  renderNewGame();
  const greeting = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    prop: "p",
    textContent: "Hello Admiral..."
  });
  const inputField = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    prop: "input",
    type: "text",
    placeholder: "Name"
  });
  const button = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    prop: "button",
    type: "button",
    textContent: "Start"
  });
  const nameField = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    prop: "form",
    className: "nameForm",
    children: [inputField, button]
  });
  button.addEventListener("click", () => {
    (0,_loadMapScreen_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      playerName: inputField.value
    });
  });
  newGameContainer.appendChild(greeting);
  newGameContainer.appendChild(nameField);
}
function renderNewGame() {
  const newGameContainer = document.querySelector(".newGameContainer");
  while (newGameContainer.firstChild) {
    newGameContainer.firstChild.remove();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadNameScreen);

/***/ }),

/***/ "./src/DOM/renderContainer.js":
/*!************************************!*\
  !*** ./src/DOM/renderContainer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function renderContainer() {
  const container = document.querySelector("#container");
  while (container.firstChild) {
    container.firstChild.remove();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderContainer);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/homescreen.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/homescreen.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/BlackOpsOne.ttf */ "./src/assets/fonts/BlackOpsOne.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/PressStart.ttf */ "./src/assets/fonts/PressStart.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/homescreen.jpg */ "./src/assets/images/homescreen.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: BlackOps1;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n@font-face {\n    font-family: PressStart;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n* {\n    /* border: 1px solid red; */\n    padding: 0;\n    margin: 0;\n}\n\nbody {\n    font-size: 16px;\n}\n\n#container {\n    height: 100vh;\n    width: 100vw;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n    background-size: cover;\n    background-position: center;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: grey;\n}\n\n.homeHeader {\n    margin: 4rem 0;\n    font-family: BlackOps1;\n    font-size: 7rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 1px 5px 1px #a8a8a8, 1px 6px 1px #a8a8a8,\n        1px 7px 1px #a8a8a8, 1px 8px 1px #a8a8a8;\n}\n\n.newGameContainer {\n    margin-bottom: auto;\n}\n\n.newGame {\n    font-family: PressStart;\n    font-size: 2rem;\n    overflow: hidden;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.4rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n    cursor: pointer;\n    text-shadow: 0 0 10px rgba(0, 0, 0, 0.185);\n}\n\n.newGame:hover {\n    color: darkgray;\n}\n\n@keyframes typing {\n    from {\n        width: 0;\n    }\n    to {\n        width: 100%;\n    }\n}\n\n@keyframes blink-caret {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: grey;\n    }\n}\n\nul {\n    position: fixed;\n    bottom: 40%;\n    left: 65%;\n    transform: translateX(-50%);\n    margin: 0;\n    padding: 0;\n}\n\n@media (max-width: 1200px) {\n    ul {\n        left: 75%;\n    }\n}\n\n@media (max-width: 900px) {\n    ul {\n        left: 80%;\n    }\n\n    .homeHeader {\n        font-size: 5rem;\n        margin-bottom: 5rem;\n    }\n}\n\n@media (max-width: 600px) {\n    .homeHeader {\n        font-size: 4rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.5rem;\n    }\n}\n\n@media (max-width: 500px) {\n    .homeHeader {\n        font-size: 3rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.2rem;\n    }\n}\n\nli {\n    position: absolute;\n    list-style: none;\n    width: 80px;\n    height: 80px;\n    background: #262626;\n    border-radius: 50%;\n    filter: blur(15px);\n}\n\nli:nth-child(even) {\n    animation: animateEven 3.5s linear infinite;\n}\nli:nth-child(odd) {\n    animation: animateOdd 3.5s linear infinite;\n}\n\nli:nth-child(9) {\n    animation: none;\n    filter: blur(15px);\n}\n\n@keyframes animateEven {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n@keyframes animateOdd {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(-100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\nli:nth-child(1) {\n    animation-delay: 0s;\n}\nli:nth-child(2) {\n    animation-delay: 0.4s;\n}\nli:nth-child(3) {\n    animation-delay: 0.8s;\n}\nli:nth-child(4) {\n    animation-delay: 1.2s;\n}\nli:nth-child(5) {\n    animation-delay: 1.6s;\n}\nli:nth-child(6) {\n    animation-delay: 2s;\n}\nli:nth-child(7) {\n    animation-delay: 2.4s;\n}\nli:nth-child(8) {\n    animation-delay: 2.8s;\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/homescreen.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;IACtB,4CAA2C;AAC/C;AACA;IACI,uBAAuB;IACvB,4CAA0C;AAC9C;;AAEA;IACI,2BAA2B;IAC3B,UAAU;IACV,SAAS;AACb;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,yDAAwD;IACxD,sBAAsB;IACtB,2BAA2B;IAC3B,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,WAAW;AACf;;AAEA;IACI,cAAc;IACd,sBAAsB;IACtB,eAAe;IACf,kBAAkB;IAClB;;gDAE4C;AAChD;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,uBAAuB;IACvB,eAAe;IACf,gBAAgB;IAChB,kBAAkB;IAClB,6BAA6B;IAC7B,mBAAmB;IACnB,wBAAwB;IACxB,sBAAsB;IACtB,wEAAwE;IACxE,eAAe;IACf,0CAA0C;AAC9C;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI;QACI,QAAQ;IACZ;IACA;QACI,WAAW;IACf;AACJ;;AAEA;IACI;;QAEI,yBAAyB;IAC7B;IACA;QACI,kBAAkB;IACtB;AACJ;;AAEA;IACI,eAAe;IACf,WAAW;IACX,SAAS;IACT,2BAA2B;IAC3B,SAAS;IACT,UAAU;AACd;;AAEA;IACI;QACI,SAAS;IACb;AACJ;;AAEA;IACI;QACI,SAAS;IACb;;IAEA;QACI,eAAe;QACf,mBAAmB;IACvB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,mBAAmB;IACvB;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,mBAAmB;IACvB;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,2CAA2C;AAC/C;AACA;IACI,0CAA0C;AAC9C;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI;QACI,mCAAmC;QACnC,UAAU;QACV,kBAAkB;IACtB;IACA;QACI,4CAA4C;QAC5C,UAAU;QACV,kBAAkB;IACtB;AACJ;;AAEA;IACI;QACI,mCAAmC;QACnC,UAAU;QACV,kBAAkB;IACtB;IACA;QACI,6CAA6C;QAC7C,UAAU;QACV,kBAAkB;IACtB;AACJ;;AAEA;IACI,mBAAmB;AACvB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,mBAAmB;AACvB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB","sourcesContent":["@font-face {\n    font-family: BlackOps1;\n    src: url(\"../assets/fonts/BlackOpsOne.ttf\");\n}\n@font-face {\n    font-family: PressStart;\n    src: url(\"../assets/fonts/PressStart.ttf\");\n}\n\n* {\n    /* border: 1px solid red; */\n    padding: 0;\n    margin: 0;\n}\n\nbody {\n    font-size: 16px;\n}\n\n#container {\n    height: 100vh;\n    width: 100vw;\n    background-image: url(\"../assets/images/homescreen.jpg\");\n    background-size: cover;\n    background-position: center;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: grey;\n}\n\n.homeHeader {\n    margin: 4rem 0;\n    font-family: BlackOps1;\n    font-size: 7rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 1px 5px 1px #a8a8a8, 1px 6px 1px #a8a8a8,\n        1px 7px 1px #a8a8a8, 1px 8px 1px #a8a8a8;\n}\n\n.newGameContainer {\n    margin-bottom: auto;\n}\n\n.newGame {\n    font-family: PressStart;\n    font-size: 2rem;\n    overflow: hidden;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.4rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n    cursor: pointer;\n    text-shadow: 0 0 10px rgba(0, 0, 0, 0.185);\n}\n\n.newGame:hover {\n    color: darkgray;\n}\n\n@keyframes typing {\n    from {\n        width: 0;\n    }\n    to {\n        width: 100%;\n    }\n}\n\n@keyframes blink-caret {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: grey;\n    }\n}\n\nul {\n    position: fixed;\n    bottom: 40%;\n    left: 65%;\n    transform: translateX(-50%);\n    margin: 0;\n    padding: 0;\n}\n\n@media (max-width: 1200px) {\n    ul {\n        left: 75%;\n    }\n}\n\n@media (max-width: 900px) {\n    ul {\n        left: 80%;\n    }\n\n    .homeHeader {\n        font-size: 5rem;\n        margin-bottom: 5rem;\n    }\n}\n\n@media (max-width: 600px) {\n    .homeHeader {\n        font-size: 4rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.5rem;\n    }\n}\n\n@media (max-width: 500px) {\n    .homeHeader {\n        font-size: 3rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.2rem;\n    }\n}\n\nli {\n    position: absolute;\n    list-style: none;\n    width: 80px;\n    height: 80px;\n    background: #262626;\n    border-radius: 50%;\n    filter: blur(15px);\n}\n\nli:nth-child(even) {\n    animation: animateEven 3.5s linear infinite;\n}\nli:nth-child(odd) {\n    animation: animateOdd 3.5s linear infinite;\n}\n\nli:nth-child(9) {\n    animation: none;\n    filter: blur(15px);\n}\n\n@keyframes animateEven {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n@keyframes animateOdd {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(-100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\nli:nth-child(1) {\n    animation-delay: 0s;\n}\nli:nth-child(2) {\n    animation-delay: 0.4s;\n}\nli:nth-child(3) {\n    animation-delay: 0.8s;\n}\nli:nth-child(4) {\n    animation-delay: 1.2s;\n}\nli:nth-child(5) {\n    animation-delay: 1.6s;\n}\nli:nth-child(6) {\n    animation-delay: 2s;\n}\nli:nth-child(7) {\n    animation-delay: 2.4s;\n}\nli:nth-child(8) {\n    animation-delay: 2.8s;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/mapscreen.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/mapscreen.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/map.jpg */ "./src/assets/images/map.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".map {\n    width: 100vw;\n    height: 100vh;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-size: cover;\n    background-position: center;\n    animation: unblur 1.5s linear;\n    filter: blur(10px);\n    animation-fill-mode: forwards;\n}\nvideo {\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n@keyframes unblur {\n    0% {\n    }\n    100% {\n        filter: blur(0);\n    }\n}\n.redPin1 {\n    position: fixed;\n    top: 40%;\n    left: 63%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin2 {\n    position: fixed;\n    top: 24%;\n    left: 56%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin3 {\n    position: fixed;\n    top: 40%;\n    left: 80%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.greenPin {\n    position: fixed;\n    top: 30%;\n    left: 20%;\n    cursor: pointer;\n}\n.redPin1:hover {\n    opacity: 1;\n}\n.redPin2:hover {\n    opacity: 1;\n}\n.redPin3:hover {\n    opacity: 1;\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/mapscreen.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,MAAM;IACN,SAAS;IACT,OAAO;IACP,QAAQ;IACR,yDAAiD;IACjD,sBAAsB;IACtB,2BAA2B;IAC3B,6BAA6B;IAC7B,kBAAkB;IAClB,6BAA6B;AACjC;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,2BAA2B;AAC/B;;AAEA;IACI;IACA;IACA;QACI,eAAe;IACnB;AACJ;AACA;IACI,eAAe;IACf,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;AACA;IACI,eAAe;IACf,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;AACA;IACI,eAAe;IACf,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;AACA;IACI,eAAe;IACf,QAAQ;IACR,SAAS;IACT,eAAe;AACnB;AACA;IACI,UAAU;AACd;AACA;IACI,UAAU;AACd;AACA;IACI,UAAU;AACd","sourcesContent":[".map {\n    width: 100vw;\n    height: 100vh;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-image: url(\"../assets/images/map.jpg\");\n    background-size: cover;\n    background-position: center;\n    animation: unblur 1.5s linear;\n    filter: blur(10px);\n    animation-fill-mode: forwards;\n}\nvideo {\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n@keyframes unblur {\n    0% {\n    }\n    100% {\n        filter: blur(0);\n    }\n}\n.redPin1 {\n    position: fixed;\n    top: 40%;\n    left: 63%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin2 {\n    position: fixed;\n    top: 24%;\n    left: 56%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin3 {\n    position: fixed;\n    top: 40%;\n    left: 80%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.greenPin {\n    position: fixed;\n    top: 30%;\n    left: 20%;\n    cursor: pointer;\n}\n.redPin1:hover {\n    opacity: 1;\n}\n.redPin2:hover {\n    opacity: 1;\n}\n.redPin3:hover {\n    opacity: 1;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/namescreen.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/namescreen.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".newGameContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 2rem;\n}\n\n.newGameContainer p {\n    font-family: PressStart;\n    overflow: hidden;\n    font-size: 1.2rem;\n    font-weight: 700;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.2rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n}\n\n.nameForm {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    justify-content: center;\n    align-items: center;\n}\n\n.nameForm input {\n    background-color: grey;\n    font-family: PressStart;\n    font-size: 1rem;\n    padding: 1rem 1rem;\n    border: none;\n    outline: none;\n    color: white;\n    caret-color: black;\n    box-shadow: 3px 3px 5px #a8a8a8;\n    letter-spacing: 3px;\n    opacity: 0.8;\n}\n\n.nameForm input:focus {\n    opacity: 1;\n}\n\n.nameForm input::placeholder {\n    color: white;\n}\n\n.nameForm button {\n    font-family: BlackOps1;\n    font-size: 2rem;\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    color: rgb(71, 71, 71);\n    opacity: 0.8;\n}\n\n.nameForm button:hover {\n    opacity: 1;\n}\n\n#container.hide {\n    animation: burn 1.5s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes burn {\n    0% {\n    }\n    100% {\n        transform: translateX(100%);\n    }\n}\n\n@media (max-width: 500px) {\n    .nameForm input {\n        width: 80%;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/namescreen.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,uBAAuB;IACvB,gBAAgB;IAChB,iBAAiB;IACjB,gBAAgB;IAChB,kBAAkB;IAClB,6BAA6B;IAC7B,mBAAmB;IACnB,wBAAwB;IACxB,sBAAsB;IACtB,wEAAwE;AAC5E;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,sBAAsB;IACtB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,+BAA+B;IAC/B,mBAAmB;IACnB,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,sBAAsB;IACtB,eAAe;IACf,eAAe;IACf,YAAY;IACZ,6BAA6B;IAC7B,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,2BAA2B;IAC3B,6BAA6B;AACjC;;AAEA;IACI;IACA;IACA;QACI,2BAA2B;IAC/B;AACJ;;AAEA;IACI;QACI,UAAU;IACd;AACJ","sourcesContent":[".newGameContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 2rem;\n}\n\n.newGameContainer p {\n    font-family: PressStart;\n    overflow: hidden;\n    font-size: 1.2rem;\n    font-weight: 700;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.2rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n}\n\n.nameForm {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    justify-content: center;\n    align-items: center;\n}\n\n.nameForm input {\n    background-color: grey;\n    font-family: PressStart;\n    font-size: 1rem;\n    padding: 1rem 1rem;\n    border: none;\n    outline: none;\n    color: white;\n    caret-color: black;\n    box-shadow: 3px 3px 5px #a8a8a8;\n    letter-spacing: 3px;\n    opacity: 0.8;\n}\n\n.nameForm input:focus {\n    opacity: 1;\n}\n\n.nameForm input::placeholder {\n    color: white;\n}\n\n.nameForm button {\n    font-family: BlackOps1;\n    font-size: 2rem;\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    color: rgb(71, 71, 71);\n    opacity: 0.8;\n}\n\n.nameForm button:hover {\n    opacity: 1;\n}\n\n#container.hide {\n    animation: burn 1.5s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes burn {\n    0% {\n    }\n    100% {\n        transform: translateX(100%);\n    }\n}\n\n@media (max-width: 500px) {\n    .nameForm input {\n        width: 80%;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/CSS/homescreen.css":
/*!********************************!*\
  !*** ./src/CSS/homescreen.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_homescreen_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./homescreen.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/homescreen.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_homescreen_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_homescreen_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_homescreen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_homescreen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/CSS/mapscreen.css":
/*!*******************************!*\
  !*** ./src/CSS/mapscreen.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_mapscreen_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./mapscreen.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/mapscreen.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_mapscreen_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_mapscreen_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_mapscreen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_mapscreen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/CSS/namescreen.css":
/*!********************************!*\
  !*** ./src/CSS/namescreen.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_namescreen_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./namescreen.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/namescreen.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_namescreen_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_namescreen_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_namescreen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_namescreen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/BlackOpsOne.ttf":
/*!******************************************!*\
  !*** ./src/assets/fonts/BlackOpsOne.ttf ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b8437be32fe8faca71ed.ttf";

/***/ }),

/***/ "./src/assets/fonts/PressStart.ttf":
/*!*****************************************!*\
  !*** ./src/assets/fonts/PressStart.ttf ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "21503c6a5385ab41dde9.ttf";

/***/ }),

/***/ "./src/assets/images/green-pin.png":
/*!*****************************************!*\
  !*** ./src/assets/images/green-pin.png ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d2e1112fba6a5fa3d878.png";

/***/ }),

/***/ "./src/assets/images/homescreen.jpg":
/*!******************************************!*\
  !*** ./src/assets/images/homescreen.jpg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "06fa2c96e56f6a0aa95b.jpg";

/***/ }),

/***/ "./src/assets/images/map.jpg":
/*!***********************************!*\
  !*** ./src/assets/images/map.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "81a072d6fe494f6f4678.jpg";

/***/ }),

/***/ "./src/assets/images/red-pin.png":
/*!***************************************!*\
  !*** ./src/assets/images/red-pin.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "675115d5549ddfb36399.png";

/***/ }),

/***/ "./node_modules/kampos/index.js":
/*!**************************************!*\
  !*** ./node_modules/kampos/index.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.kampos = factory());
}(undefined, (function () { 'use strict';

    /**
     * @function alphaMask
     * @param {Object} [params]
     * @param {boolean} [params.isLuminance=false] whether to use luminance when reading mask values
     * @returns {alphaMaskEffect}
     *
     * @example alphaMask()
     */
    function alphaMask ({
      isLuminance = false
    } = {}) {
      /**
       * @typedef {Object} alphaMaskEffect
       * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} mask
       * @property {boolean} disabled
       * @property {boolean} isLuminance
       *
       * @description Multiplies `alpha` value with values read from `mask` media source.
       *
       *  @example
       * const img = new Image();
       * img.src = 'picture.png';
       * effect.mask = img;
       * effect.disabled = true;
       */
      return {
        vertex: {
          attribute: {
            a_alphaMaskTexCoord: 'vec2'
          },
          main: `
    v_alphaMaskTexCoord = a_alphaMaskTexCoord;`
        },
        fragment: {
          uniform: {
            u_alphaMaskEnabled: 'bool',
            u_alphaMaskIsLuminance: 'bool',
            u_mask: 'sampler2D'
          },
          main: `
    if (u_alphaMaskEnabled) {
        vec4 alphaMaskPixel = texture2D(u_mask, v_alphaMaskTexCoord);

        if (u_alphaMaskIsLuminance) {
            alpha *= dot(lumcoeff, alphaMaskPixel.rgb) * alphaMaskPixel.a;
        }
        else {
            alpha *= alphaMaskPixel.a;
        }
    }`
        },

        get disabled() {
          return !this.uniforms[0].data[0];
        },

        set disabled(b) {
          this.uniforms[0].data[0] = +!b;
        },

        get mask() {
          return this.textures[0].data;
        },

        set mask(img) {
          this.textures[0].data = img;
        },

        get isLuminance() {
          return !!this.uniforms[2].data[0];
        },

        set isLuminance(toggle) {
          this.uniforms[2].data[0] = +toggle;
          this.textures[0].format = toggle ? 'RGBA' : 'ALPHA';
        },

        varying: {
          v_alphaMaskTexCoord: 'vec2'
        },
        uniforms: [{
          name: 'u_alphaMaskEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_mask',
          type: 'i',
          data: [1]
        }, {
          name: 'u_alphaMaskIsLuminance',
          type: 'i',
          data: [+!!isLuminance]
        }],
        attributes: [{
          name: 'a_alphaMaskTexCoord',
          extends: 'a_texCoord'
        }],
        textures: [{
          format: isLuminance ? 'RGBA' : 'ALPHA'
        }]
      };
    }

    const MODES_AUX = {
      blend_luminosity: `float blend_luminosity (vec3 c) {
    return dot(c, blendLum);
}`,
      blend_saturation: `float blend_saturation (vec3 c) {
    return max(max(c.r, c.g), c.b) - min(min(c.r, c.g), c.b);
}`,
      blend_set_luminosity: `vec3 blend_clip_color (vec3 c) {
    float l = blend_luminosity(c);
    float cMin = min(min(c.r, c.g), c.b);
    float cMax = max(max(c.r, c.g), c.b);

    if (cMin < 0.0)
        return l + (((c - l) * l) / (l - cMin));
    if (cMax > 1.0)
        return l + (((c - l) * (1.0 - l)) / (cMax - l));

    return c;
}

vec3 blend_set_luminosity (vec3 c, float l) {
    vec3 delta = vec3(l - blend_luminosity(c));

    return blend_clip_color(vec3(c.rgb + delta.rgb));
}`,
      blend_set_saturation: `
float getBlendMid (vec3 c) {
    float bigger = max(c.r, c.g);

    if (bigger < c.b) {
        return bigger;
    }

    float smaller = min(c.r, c.g);

    if (c.b < smaller) {
        return smaller;
    }

    return c.b;
}

vec3 blend_set_saturation (vec3 c, float s) {
    if (s == 0.0) return vec3(0.0);

    float cMax = max(max(c.r, c.g), c.b);
    float cMid = getBlendMid(c);
    float cMin = min(min(c.r, c.g), c.b);
    float r, g, b;

    cMid = (((cMid - cMin) * s) / (cMax - cMin));
    cMax = s;
    cMin = 0.0;

    if (c.r > c.g) {
        // r > g
        if (c.b > c.r) {
            // g < r < b
            g = cMin;
            r = cMid;
            b = cMax;
        }
        else if (c.g > c.b) {
            // b < g < r
            b = cMin;
            g = cMid;
            r = cMax;
        }
        else {
            // g < b < r
            g = cMin;
            b = cMid;
            r = cMax;
        }
    }
    // g > r
    else if (c.g > c.b) {
        // g > b
        if (c.b > c.r) {
            // r < b < g
            r = cMin;
            b = cMid;
            g = cMax;
        }
        else {
            // b < r < g
            b = cMin;
            r = cMid;
            g = cMax;
        }
    }
    else {
        // r < g < b
        r = cMin;
        g = cMid;
        b = cMax;
    }

    return vec3(r, g, b);
}`
    };
    const MODES_CONSTANT = {
      normal: '',
      multiply: '',
      screen: '',
      overlay: `float blend_overlay (float b, float c) {
    if (b <= 0.5)
        return 2.0 * b * c;
    else
        return 1.0 - 2.0 * ((1.0 - b) * (1.0 - c));
}`,
      darken: '',
      lighten: '',
      colorDodge: `float blend_colorDodge (float b, float c) {
    if (b == 0.0)
        return 0.0;
    else if (c == 1.0)
        return 1.0;
    else
        return min(1.0, b / (1.0 - c));
}`,
      colorBurn: `float blend_colorBurn (float b, float c) {
    if (b == 1.0) {
        return 1.0;
    }
    else if (c == 0.0) {
        return 0.0;
    }
    else {
        return 1.0 - min(1.0, (1.0 - b) / c);
    }
}`,
      hardLight: `float blend_hardLight (float b, float c) {
    if (c <= 0.5) {
        return 2.0 * b * c;
    }
    else {
        return 1.0 - 2.0 * ((1.0 - b) * (1.0 - c));
    }
}`,
      softLight: `float blend_softLight (float b, float c) {
    if (c <= 0.5) {
        return b - (1.0 - 2.0 * c) * b * (1.0 - b);
    }
    else {
        float d;

        if (b <= 0.25) {
            d = ((16.0 * b - 12.0) * b + 4.0) * b;
        }
        else {
            d = sqrt(b);
        }

        return b + (2.0 * c - 1.0) * (d - b);
    }
}`,
      difference: `float blend_difference (float b, float c) {
    return abs(b - c);
}`,
      exclusion: `float blend_exclusion (float b, float c) {
    return b + c - 2.0 * b * c;
}`,
      hue: `${MODES_AUX.blend_luminosity}
${MODES_AUX.blend_saturation}
${MODES_AUX.blend_set_saturation}
${MODES_AUX.blend_set_luminosity}`,
      saturation: `${MODES_AUX.blend_luminosity}
${MODES_AUX.blend_saturation}
${MODES_AUX.blend_set_saturation}
${MODES_AUX.blend_set_luminosity}`,
      color: `${MODES_AUX.blend_luminosity}
${MODES_AUX.blend_set_luminosity}`,
      luminosity: `${MODES_AUX.blend_luminosity}
${MODES_AUX.blend_set_luminosity}`
    };

    function generateBlendVector(name) {
      return `vec3(${name}(backdrop.r, source.r), ${name}(backdrop.g, source.g), ${name}(backdrop.b, source.b))`;
    }

    const MODES_MAIN = {
      normal: 'source',
      multiply: 'source * backdrop',
      screen: 'backdrop + source - backdrop * source',
      overlay: generateBlendVector('blend_overlay'),
      darken: generateBlendVector('min'),
      lighten: generateBlendVector('max'),
      colorDodge: generateBlendVector('blend_colorDodge'),
      colorBurn: generateBlendVector('blend_colorBurn'),
      hardLight: generateBlendVector('blend_hardLight'),
      softLight: generateBlendVector('blend_softLight'),
      difference: generateBlendVector('blend_difference'),
      exclusion: generateBlendVector('blend_exclusion'),
      hue: 'blend_set_luminosity(blend_set_saturation(source, blend_saturation(backdrop)), blend_luminosity(backdrop))',
      saturation: 'blend_set_luminosity(blend_set_saturation(backdrop, blend_saturation(source)), blend_luminosity(backdrop))',
      color: 'blend_set_luminosity(source, blend_luminosity(backdrop))',
      luminosity: 'blend_set_luminosity(backdrop, blend_luminosity(source))'
    };
    /**
     * @function blend
     * @param {Object} [params]
     * @param {'normal'|'multiply'|'screen'|'overlay'|'darken'|'lighten'|'color-dodge'|'color-burn'|'hard-light'|'soft-light'|'difference'|'exclusion'|'hue'|'saturation'|'color'|'luminosity'} [params.mode='normal'] blend mode to use
     * @param {number[]} [params.color=[0, 0, 0, 1]] Initial color to use when blending to a solid color
     * @returns {blendEffect}
     * @example blend('colorBurn')
     */

    function blend ({
      mode = 'normal',
      color = [0.0, 0.0, 0.0, 1.0]
    } = {}) {
      /**
       * @typedef {Object} blendEffect
       * @property {number[]} color backdrop solid color as Array of 4 numbers, normalized (0.0 - 1.0)
       * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} image to use as backdrop
       * @property {boolean} disabled
       *
       * @example
       * const img = new Image();
       * img.src = 'picture.png';
       * effect.color = [0.3, 0.55, 0.8, 1.0];
       * effect.image = img;
       */
      return {
        vertex: {
          attribute: {
            a_blendImageTexCoord: 'vec2'
          },
          main: `
    v_blendImageTexCoord = a_blendImageTexCoord;`
        },
        fragment: {
          uniform: {
            u_blendEnabled: 'bool',
            u_blendColorEnabled: 'bool',
            u_blendImageEnabled: 'bool',
            u_blendColor: 'vec4',
            u_blendImage: 'sampler2D'
          },
          constant: `const vec3 blendLum = vec3(0.3, 0.59, 0.11);
${MODES_CONSTANT[mode]}`,
          main: `
    if (u_blendEnabled) {
        vec3 backdrop = vec3(0.0);
        float backdropAlpha = 1.0;

        if (u_blendColorEnabled) {
            backdrop = u_blendColor.rgb;
            backdropAlpha = u_blendColor.a;
        }
        if (u_blendImageEnabled) {
            vec4 blendBackdropPixel = texture2D(u_blendImage, v_blendImageTexCoord);
            if (u_blendColorEnabled) {
                vec3 source = blendBackdropPixel.rgb;
                float sourceAlpha = blendBackdropPixel.a;
                backdrop = (1.0 - backdropAlpha) * source + backdropAlpha * clamp(${MODES_MAIN[mode]}, 0.0, 1.0);
                backdropAlpha = sourceAlpha + backdropAlpha * (1.0 - sourceAlpha);
            }
            else {
                backdrop = blendBackdropPixel.rgb;
                backdropAlpha = blendBackdropPixel.a;
            }
        }
        vec3 source = vec3(color.rgb);
        color = (1.0 - backdropAlpha) * source + backdropAlpha * clamp(${MODES_MAIN[mode]}, 0.0, 1.0);
        alpha = alpha + backdropAlpha * (1.0 - alpha);
    }`
        },

        get color() {
          return this.uniforms[1].data.slice(0);
        },

        set color(l) {
          if (!l || !l.length) {
            this.uniforms[2].data[0] = 0;
          } else {
            this.uniforms[2].data[0] = 1;
            l.forEach((c, i) => {
              if (!Number.isNaN(c)) {
                this.uniforms[1].data[i] = c;
              }
            });
          }
        },

        get image() {
          return this.textures[0].data;
        },

        set image(img) {
          if (img) {
            this.uniforms[4].data[0] = 1;
            this.textures[0].data = img;
          } else {
            this.uniforms[4].data[0] = 0;
          }
        },

        get disabled() {
          return !this.uniforms[0].data[0];
        },

        set disabled(b) {
          this.uniforms[0].data[0] = +!b;
        },

        varying: {
          v_blendImageTexCoord: 'vec2'
        },
        uniforms: [{
          name: 'u_blendEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_blendColor',
          type: 'f',
          data: color
        }, {
          name: 'u_blendColorEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_blendImage',
          type: 'i',
          data: [1]
        }, {
          name: 'u_blendImageEnabled',
          type: 'i',
          data: [0]
        }],
        attributes: [{
          name: 'a_blendImageTexCoord',
          extends: 'a_texCoord'
        }],
        textures: [{
          format: 'RGBA'
        }]
      };
    }

    /**
     * @function brightnessContrast
     * @property {number} brightness
     * @property {number} contrast
     * @param {Object} [params]
     * @param {number} [params.brightness=1.0] initial brightness to use.
     * @param {number} [params.contrast=1.0] initial contrast to use.
     * @returns {brightnessContrastEffect}
     *
     * @example brightnessContrast({brightness: 1.5, contrast: 0.8})
     */
    function brightnessContrast ({
      brightness = 1.0,
      contrast = 1.0
    } = {}) {
      /**
       * @typedef {Object} brightnessContrastEffect
       * @property {number} brightness
       * @property {number} contrast
       * @property {boolean} brightnessDisabled
       * @property {boolean} contrastDisabled
       *
       * @example
       * effect.brightness = 1.5;
       * effect.contrast = 0.9;
       * effect.contrastDisabled = true;
       */
      return {
        fragment: {
          uniform: {
            u_brEnabled: 'bool',
            u_ctEnabled: 'bool',
            u_contrast: 'float',
            u_brightness: 'float'
          },
          constant: 'const vec3 half3 = vec3(0.5);',
          main: `
    if (u_brEnabled) {
        color *= u_brightness;
    }

    if (u_ctEnabled) {
        color = (color - half3) * u_contrast + half3;
    }

    color = clamp(color, 0.0, 1.0);`
        },

        get brightness() {
          return this.uniforms[2].data[0];
        },

        set brightness(value) {
          this.uniforms[2].data[0] = parseFloat(Math.max(0, value));
        },

        get contrast() {
          return this.uniforms[3].data[0];
        },

        set contrast(value) {
          this.uniforms[3].data[0] = parseFloat(Math.max(0, value));
        },

        get brightnessDisabled() {
          return !this.uniforms[0].data[0];
        },

        set brightnessDisabled(toggle) {
          this.uniforms[0].data[0] = +!toggle;
        },

        get contrastDisabled() {
          return !this.uniforms[1].data[0];
        },

        set contrastDisabled(toggle) {
          this.uniforms[1].data[0] = +!toggle;
        },

        uniforms: [{
          name: 'u_brEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_ctEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_brightness',
          type: 'f',
          data: [brightness]
        }, {
          name: 'u_contrast',
          type: 'f',
          data: [contrast]
        }]
      };
    }

    /**
     * @function hueSaturation
     * @property {number} hue rotation in degrees
     * @property {number} saturation
     * @param {Object} [params]
     * @param {number} [params.hue=0.0] initial hue value
     * @param {number} [params.saturation=1.0] initial saturation value
     * @returns {hueSaturationEffect}
     * @example hueSaturation({hue: 45, saturation: 1.3})
     */
    function hueSaturation ({
      hue = 0.0,
      saturation = 1.0
    } = {}) {
      /**
       * @typedef {Object} hueSaturationEffect
       * @property {number} hue
       * @property {number} saturation
       * @property {boolean} hueDisabled
       * @property {boolean} saturationDisabled
       *
       * @example
       * effect.hue = 45;
       * effect.saturation = 0.8;
       */
      return {
        vertex: {
          uniform: {
            u_hue: 'float',
            u_saturation: 'float'
          },
          // for implementation see: https://www.w3.org/TR/SVG11/filters.html#feColorMatrixElement
          constant: `
const mat3 lummat = mat3(
    lumcoeff,
    lumcoeff,
    lumcoeff
);
const mat3 cosmat = mat3(
    vec3(0.787, -0.715, -0.072),
    vec3(-0.213, 0.285, -0.072),
    vec3(-0.213, -0.715, 0.928)
);
const mat3 sinmat = mat3(
    vec3(-0.213, -0.715, 0.928),
    vec3(0.143, 0.140, -0.283),
    vec3(-0.787, 0.715, 0.072)
);
const mat3 satmat = mat3(
    vec3(0.787, -0.715, -0.072),
    vec3(-0.213, 0.285, -0.072),
    vec3(-0.213, -0.715, 0.928)
);`,
          main: `
    float angle = (u_hue / 180.0) * 3.14159265358979323846264;
    v_hueRotation = lummat + cos(angle) * cosmat + sin(angle) * sinmat;
    v_saturation = lummat + satmat * u_saturation;`
        },
        fragment: {
          uniform: {
            u_hueEnabled: 'bool',
            u_satEnabled: 'bool',
            u_hue: 'float',
            u_saturation: 'float'
          },
          main: `
    if (u_hueEnabled) {
        color = vec3(
            dot(color, v_hueRotation[0]),
            dot(color, v_hueRotation[1]),
            dot(color, v_hueRotation[2])
        );
    }

    if (u_satEnabled) {
        color = vec3(
            dot(color, v_saturation[0]),
            dot(color, v_saturation[1]),
            dot(color, v_saturation[2])
        );
    }

    color = clamp(color, 0.0, 1.0);`
        },
        varying: {
          v_hueRotation: 'mat3',
          v_saturation: 'mat3'
        },

        get hue() {
          return this.uniforms[2].data[0];
        },

        set hue(h) {
          this.uniforms[2].data[0] = parseFloat(h);
        },

        get saturation() {
          return this.uniforms[3].data[0];
        },

        set saturation(s) {
          this.uniforms[3].data[0] = parseFloat(Math.max(0, s));
        },

        get hueDisabled() {
          return !this.uniforms[0].data[0];
        },

        set hueDisabled(b) {
          this.uniforms[0].data[0] = +!b;
        },

        get saturationDisabled() {
          return !this.uniforms[1].data[0];
        },

        set saturationDisabled(b) {
          this.uniforms[1].data[0] = +!b;
        },

        uniforms: [{
          name: 'u_hueEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_satEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_hue',
          type: 'f',
          data: [hue]
        }, {
          name: 'u_saturation',
          type: 'f',
          data: [saturation]
        }]
      };
    }

    /**
     * @function duotone
     * @param {Object} [params]
     * @param {number[]} [params.dark=[0.741, 0.0431, 0.568, 1]] initial dark color to use.
     * @param {number[]} [params.light=[0.988, 0.733, 0.051, 1]] initial light color to use.
     * @returns {duotoneEffect}
     *
     * @example duotone({dark: [0.2, 0.11, 0.33, 1], light: [0.88, 0.78, 0.43, 1]})
     */
    function duotone ({
      dark = [0.7411764706, 0.0431372549, 0.568627451, 1],
      light = [0.9882352941, 0.7333333333, 0.05098039216, 1]
    } = {}) {
      /**
       * @typedef {Object} duotoneEffect
       * @property {number[]} light Array of 4 numbers, normalized (0.0 - 1.0)
       * @property {number[]} dark Array of 4 numbers, normalized (0.0 - 1.0)
       * @property {boolean} disabled
       *
       * @example
       * effect.light = [1.0, 1.0, 0.8];
       * effect.dark = [0.2, 0.6, 0.33];
       */
      return {
        fragment: {
          uniform: {
            u_duotoneEnabled: 'bool',
            u_light: 'vec4',
            u_dark: 'vec4'
          },
          main: `
    if (u_duotoneEnabled) {
        vec3 gray = vec3(dot(lumcoeff, color));
        color = mix(u_dark.rgb, u_light.rgb, gray);
    }`
        },

        get light() {
          return this.uniforms[1].data.slice(0);
        },

        set light(l) {
          l.forEach((c, i) => {
            if (!Number.isNaN(c)) {
              this.uniforms[1].data[i] = c;
            }
          });
        },

        get dark() {
          return this.uniforms[2].data.slice(0);
        },

        set dark(d) {
          d.forEach((c, i) => {
            if (!Number.isNaN(c)) {
              this.uniforms[2].data[i] = c;
            }
          });
        },

        get disabled() {
          return !this.uniforms[0].data[0];
        },

        set disabled(b) {
          this.uniforms[0].data[0] = +!b;
        },

        uniforms: [{
          name: 'u_duotoneEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_light',
          type: 'f',
          data: light
        }, {
          name: 'u_dark',
          type: 'f',
          data: dark
        }]
      };
    }

    /**
     * @function displacement
     * @property {string} CLAMP stretch the last value to the edge. This is the default behavior.
     * @property {string} DISCARD discard values beyond the edge of the media - leaving a transparent pixel.
     * @property {string} WRAP continue rendering values from opposite direction when reaching the edge.
     * @param {Object} [params]
     * @param {string} [params.wrap] wrapping method to use. Defaults to `displacement.CLAMP`.
     * @param {{x: number, y: number}} [params.scale] initial scale to use for x and y displacement. Defaults to `{x: 0.0, y: 0.0}` which means no displacement.
     * @returns {displacementEffect}
     *
     * @example displacement({wrap: displacement.DISCARD, scale: {x: 0.5, y: -0.5}})
     */
    function displacement({
      wrap = WRAP_METHODS.CLAMP,
      scale
    } = {}) {
      const {
        x: sx,
        y: sy
      } = scale || {
        x: 0.0,
        y: 0.0
      };
      /**
       * @typedef {Object} displacementEffect
       * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} map
       * @property {{x: number?, y: number?}} scale
       * @property {boolean} disabled
       *
       * @example
       * const img = new Image();
       * img.src = 'disp.jpg';
       * effect.map = img;
       * effect.scale = {x: 0.4};
       */

      return {
        vertex: {
          attribute: {
            a_displacementMapTexCoord: 'vec2'
          },
          main: `
    v_displacementMapTexCoord = a_displacementMapTexCoord;`
        },
        fragment: {
          uniform: {
            u_displacementEnabled: 'bool',
            u_dispMap: 'sampler2D',
            u_dispScale: 'vec2'
          },
          source: `
    if (u_displacementEnabled) {
        vec3 dispMap = texture2D(u_dispMap, v_displacementMapTexCoord).rgb - 0.5;
        vec2 dispVec = vec2(sourceCoord.x + u_dispScale.x * dispMap.r, sourceCoord.y + u_dispScale.y * dispMap.g);
        ${wrap}
        sourceCoord = dispVec;
    }`
        },

        get disabled() {
          return !this.uniforms[0].data[0];
        },

        set disabled(b) {
          this.uniforms[0].data[0] = +!b;
        },

        get scale() {
          const [x, y] = this.uniforms[2].data;
          return {
            x,
            y
          };
        },

        set scale({
          x,
          y
        }) {
          if (typeof x !== 'undefined') this.uniforms[2].data[0] = x;
          if (typeof y !== 'undefined') this.uniforms[2].data[1] = y;
        },

        get map() {
          return this.textures[0].data;
        },

        set map(img) {
          this.textures[0].data = img;
        },

        varying: {
          v_displacementMapTexCoord: 'vec2'
        },
        uniforms: [{
          name: 'u_displacementEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_dispMap',
          type: 'i',
          data: [1]
        }, {
          name: 'u_dispScale',
          type: 'f',
          data: [sx, sy]
        }],
        attributes: [{
          name: 'a_displacementMapTexCoord',
          extends: 'a_texCoord'
        }],
        textures: [{
          format: 'RGB'
        }]
      };
    }

    const WRAP_METHODS = {
      CLAMP: `dispVec = clamp(dispVec, 0.0, 1.0);`,
      DISCARD: `if (dispVec.x < 0.0 || dispVec.x > 1.0 || dispVec.y > 1.0 || dispVec.y < 0.0) { discard; }`,
      WRAP: `dispVec = mod(dispVec, 1.0);`
    };
    displacement.CLAMP = WRAP_METHODS.CLAMP;
    displacement.DISCARD = WRAP_METHODS.DISCARD;
    displacement.WRAP = WRAP_METHODS.WRAP;

    /*!
     * GLSL textureless classic 3D noise "cnoise",
     * with an RSL-style periodic variant "pnoise".
     * Author:  Stefan Gustavson (stefan.gustavson@liu.se)
     * Version: 2011-10-11
     *
     * Many thanks to Ian McEwan of Ashima Arts for the
     * ideas for permutation and gradient selection.
     *
     * Copyright (c) 2011 Stefan Gustavson. All rights reserved.
     * Distributed under the MIT license. See LICENSE file.
     * https://github.com/ashima/webgl-noise
     */

    /**
     * Implementation of a 3D classic Perlin noise. Exposes a `noise(vec3 P)` function for use inside fragment shaders.
     */
    var perlinNoise = `
vec3 mod289 (vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289 (vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute (vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt (vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade (vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float noise (vec3 P) {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}`;

    /*!
     * Cellular noise ("Worley noise") in 3D in GLSL.
     * Author:  Stefan Gustavson (stefan.gustavson@liu.se)
     * Version: Stefan Gustavson 2011-04-19
     *
     * Many thanks to Ian McEwan of Ashima Arts for the
     * ideas for permutation and gradient selection.
     *
     * Copyright (c) 2011 Stefan Gustavson. All rights reserved.
     * Distributed under the MIT license. See LICENSE file.
     * https://github.com/ashima/webgl-noise
     */

    /**
     * Cellular noise ("Worley noise") in 3D in GLSL. Exposes a `noise(vec3 P)` function for use inside fragment shaders.
     */
    var cellular = `
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  // Modulo 7 without a division
  vec3 mod7(vec3 x) {
    return x - floor(x * (1.0 / 7.0)) * 7.0;
  }

  // Permutation polynomial: (34x^2 + x) mod 289
  vec3 permute(vec3 x) {
    return mod289((34.0 * x + 1.0) * x);
  }

  float noise(vec3 P) {
    #define K 0.142857142857 // 1/7
    #define Ko 0.428571428571 // 1/2-K/2
    #define K2 0.020408163265306 // 1/(7*7)
    #define Kz 0.166666666667 // 1/6
    #define Kzo 0.416666666667 // 1/2-1/6*2
    #define jitter 1.0 // smaller jitter gives more regular pattern

    vec3 Pi = mod289(floor(P));
    vec3 Pf = fract(P) - 0.5;

    vec3 Pfx = Pf.x + vec3(1.0, 0.0, -1.0);
    vec3 Pfy = Pf.y + vec3(1.0, 0.0, -1.0);
    vec3 Pfz = Pf.z + vec3(1.0, 0.0, -1.0);

    vec3 p = permute(Pi.x + vec3(-1.0, 0.0, 1.0));
    vec3 p1 = permute(p + Pi.y - 1.0);
    vec3 p2 = permute(p + Pi.y);
    vec3 p3 = permute(p + Pi.y + 1.0);

    vec3 p11 = permute(p1 + Pi.z - 1.0);
    vec3 p12 = permute(p1 + Pi.z);
    vec3 p13 = permute(p1 + Pi.z + 1.0);

    vec3 p21 = permute(p2 + Pi.z - 1.0);
    vec3 p22 = permute(p2 + Pi.z);
    vec3 p23 = permute(p2 + Pi.z + 1.0);

    vec3 p31 = permute(p3 + Pi.z - 1.0);
    vec3 p32 = permute(p3 + Pi.z);
    vec3 p33 = permute(p3 + Pi.z + 1.0);

    vec3 ox11 = fract(p11*K) - Ko;
    vec3 oy11 = mod7(floor(p11*K))*K - Ko;
    vec3 oz11 = floor(p11*K2)*Kz - Kzo; // p11 < 289 guaranteed

    vec3 ox12 = fract(p12*K) - Ko;
    vec3 oy12 = mod7(floor(p12*K))*K - Ko;
    vec3 oz12 = floor(p12*K2)*Kz - Kzo;

    vec3 ox13 = fract(p13*K) - Ko;
    vec3 oy13 = mod7(floor(p13*K))*K - Ko;
    vec3 oz13 = floor(p13*K2)*Kz - Kzo;

    vec3 ox21 = fract(p21*K) - Ko;
    vec3 oy21 = mod7(floor(p21*K))*K - Ko;
    vec3 oz21 = floor(p21*K2)*Kz - Kzo;

    vec3 ox22 = fract(p22*K) - Ko;
    vec3 oy22 = mod7(floor(p22*K))*K - Ko;
    vec3 oz22 = floor(p22*K2)*Kz - Kzo;

    vec3 ox23 = fract(p23*K) - Ko;
    vec3 oy23 = mod7(floor(p23*K))*K - Ko;
    vec3 oz23 = floor(p23*K2)*Kz - Kzo;

    vec3 ox31 = fract(p31*K) - Ko;
    vec3 oy31 = mod7(floor(p31*K))*K - Ko;
    vec3 oz31 = floor(p31*K2)*Kz - Kzo;

    vec3 ox32 = fract(p32*K) - Ko;
    vec3 oy32 = mod7(floor(p32*K))*K - Ko;
    vec3 oz32 = floor(p32*K2)*Kz - Kzo;

    vec3 ox33 = fract(p33*K) - Ko;
    vec3 oy33 = mod7(floor(p33*K))*K - Ko;
    vec3 oz33 = floor(p33*K2)*Kz - Kzo;

    vec3 dx11 = Pfx + jitter*ox11;
    vec3 dy11 = Pfy.x + jitter*oy11;
    vec3 dz11 = Pfz.x + jitter*oz11;

    vec3 dx12 = Pfx + jitter*ox12;
    vec3 dy12 = Pfy.x + jitter*oy12;
    vec3 dz12 = Pfz.y + jitter*oz12;

    vec3 dx13 = Pfx + jitter*ox13;
    vec3 dy13 = Pfy.x + jitter*oy13;
    vec3 dz13 = Pfz.z + jitter*oz13;

    vec3 dx21 = Pfx + jitter*ox21;
    vec3 dy21 = Pfy.y + jitter*oy21;
    vec3 dz21 = Pfz.x + jitter*oz21;

    vec3 dx22 = Pfx + jitter*ox22;
    vec3 dy22 = Pfy.y + jitter*oy22;
    vec3 dz22 = Pfz.y + jitter*oz22;

    vec3 dx23 = Pfx + jitter*ox23;
    vec3 dy23 = Pfy.y + jitter*oy23;
    vec3 dz23 = Pfz.z + jitter*oz23;

    vec3 dx31 = Pfx + jitter*ox31;
    vec3 dy31 = Pfy.z + jitter*oy31;
    vec3 dz31 = Pfz.x + jitter*oz31;

    vec3 dx32 = Pfx + jitter*ox32;
    vec3 dy32 = Pfy.z + jitter*oy32;
    vec3 dz32 = Pfz.y + jitter*oz32;

    vec3 dx33 = Pfx + jitter*ox33;
    vec3 dy33 = Pfy.z + jitter*oy33;
    vec3 dz33 = Pfz.z + jitter*oz33;

    vec3 d11 = dx11 * dx11 + dy11 * dy11 + dz11 * dz11;
    vec3 d12 = dx12 * dx12 + dy12 * dy12 + dz12 * dz12;
    vec3 d13 = dx13 * dx13 + dy13 * dy13 + dz13 * dz13;
    vec3 d21 = dx21 * dx21 + dy21 * dy21 + dz21 * dz21;
    vec3 d22 = dx22 * dx22 + dy22 * dy22 + dz22 * dz22;
    vec3 d23 = dx23 * dx23 + dy23 * dy23 + dz23 * dz23;
    vec3 d31 = dx31 * dx31 + dy31 * dy31 + dz31 * dz31;
    vec3 d32 = dx32 * dx32 + dy32 * dy32 + dz32 * dz32;
    vec3 d33 = dx33 * dx33 + dy33 * dy33 + dz33 * dz33;

    vec3 d1 = min(min(d11,d12), d13);
    vec3 d2 = min(min(d21,d22), d23);
    vec3 d3 = min(min(d31,d32), d33);
    vec3 d = min(min(d1,d2), d3);
    d.x = min(min(d.x,d.y),d.z);

    return sqrt(d.x);
  }
`;

    /*!
     * Description : Array and textureless GLSL 2D/3D/4D simplex
     *               noise functions.
     *      Author : Ian McEwan, Ashima Arts.
     *  Maintainer : stegu
     *     Lastmod : 20110822 (ijm)
     *     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
     *               Distributed under the MIT License. See LICENSE file.
     *               https://github.com/ashima/webgl-noise
     *               https://github.com/stegu/webgl-noise
     */

    /**
     * Implementation of a 3D Simplex noise. Exposes a `noise(vec3 v)` function for use inside fragment shaders.
     */
    var simplex = `
vec3 mod289 (vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289 (vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute (vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt (vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float noise (vec3 v) { 
    const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
}`;

    /**
     * @function turbulence
     * @property {string} COLOR
     * @property {string} ALPHA
     * @param {object} params
     * @param {string} params.noise 3D noise implementation to use.
     * @param {string} [params.output] how to output the `turbulenceValue` variable. Use `turbulence.COLOR` or `turbulence.ALPHA` for outputting to color or alpha correspondingly. Defaults to `turbulence.COLOR`.
     * @param {{x: number, y: number}} [params.frequency={x: 0.0, y: 0.0}] initial frequencies to use for x and y axes.
     * @param {number} [params.octaves=1] initial number of octaves to use for turbulence noise generation.
     * @param {boolean} [params.isFractal=false] initial number of octaves to use for turbulence noise generation.
     * @param {number} [params.time=0] initial time for controlling initial noise value.
     * @returns {turbulenceEffect}
     *
     * @example turbulence({noise: kampos.noise.simplex, output: turbulence.COLOR, octaves: 4, isFractal: true})
     */
    function turbulence({
      noise,
      output = OUTPUT_TYPES.COLOR,
      frequency,
      octaves = 1,
      isFractal = false,
      time = 0.0
    }) {
      const {
        x: fx,
        y: fy
      } = frequency || {
        x: 0.0,
        y: 0.0
      };
      /**
       * @typedef {Object} turbulenceEffect
       * @property {{x: number?, y: number?}} frequency
       * @property {number} octaves
       * @property {boolean} isFractal
       *
       * @description Generates a turbulence/fractal noise value stored into `turbulenceValue`.
       * Depends on a `noise(vec3 P)` function to be declared and injected via the `noise` param, for example, simply supplying the {@link perlinNoiseEffect}.
       *
       * @example
       * effect.frequency = {x: 0.0065};
       * effect.octaves = 4;
       * effect.isFractal = true;
       */

      return {
        fragment: {
          uniform: {
            u_turbulenceEnabled: 'bool',
            u_turbulenceFrequency: 'vec2',
            u_turbulenceOctaves: 'int',
            u_isFractal: 'bool',
            u_time: 'float'
          },
          constant: `
${noise}

const int MAX_OCTAVES = 9;

float turbulence (vec3 seed, vec2 frequency, int numOctaves, bool isFractal) {
    float sum = 0.0;
    vec3 position = vec3(0.0);
    position.x = seed.x * frequency.x;
    position.y = seed.y * frequency.y;
    position.z = seed.z;
    float ratio = 1.0;

    for (int octave = 0; octave <= MAX_OCTAVES; octave++) {
        if (octave > numOctaves) {
            break;
        }

        if (isFractal) {
            sum += noise(position) / ratio;
        }
        else {
            sum += abs(noise(position)) / ratio;
        }
        position.x *= 2.0;
        position.y *= 2.0;
        ratio *= 2.0;
    }

    if (isFractal) {
        sum = (sum + 1.0) / 2.0;
    }

    return clamp(sum, 0.0, 1.0);
}`,
          main: `
    vec3 turbulenceSeed = vec3(gl_FragCoord.xy, u_time * 0.0001);
    float turbulenceValue = turbulence(turbulenceSeed, u_turbulenceFrequency, u_turbulenceOctaves, u_isFractal);
    ${output || ''}`
        },

        get frequency() {
          const [x, y] = this.uniforms[0].data;
          return {
            x,
            y
          };
        },

        set frequency({
          x,
          y
        }) {
          if (typeof x !== 'undefined') this.uniforms[0].data[0] = x;
          if (typeof y !== 'undefined') this.uniforms[0].data[1] = y;
        },

        get octaves() {
          return this.uniforms[1].data[0];
        },

        set octaves(value) {
          this.uniforms[1].data[0] = Math.max(0, parseInt(value));
        },

        get isFractal() {
          return !!this.uniforms[2].data[0];
        },

        set isFractal(toggle) {
          this.uniforms[2].data[0] = +toggle;
        },

        get time() {
          return this.uniforms[3].data[0];
        },

        set time(value) {
          this.uniforms[3].data[0] = Math.max(0, parseFloat(value));
        },

        uniforms: [{
          name: 'u_turbulenceFrequency',
          type: 'f',
          data: [fx, fy]
        }, {
          name: 'u_turbulenceOctaves',
          type: 'i',
          data: [octaves]
        }, {
          name: 'u_isFractal',
          type: 'i',
          data: [+!!isFractal]
        }, {
          name: 'u_time',
          type: 'f',
          data: [time]
        }]
      };
    }

    const OUTPUT_TYPES = {
      COLOR: 'color = vec3(turbulenceValue);',
      ALPHA: 'alpha = turbulenceValue;'
    };
    turbulence.COLOR = OUTPUT_TYPES.COLOR;
    turbulence.ALPHA = OUTPUT_TYPES.ALPHA;

    /**
     * @function fadeTransition
     * @returns {fadeTransitionEffect}
     * @example fadeTransition()
     */
    function fade () {
      /**
       * @typedef {Object} fadeTransitionEffect
       * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} to media source to transition into
       * @property {number} progress number between 0.0 and 1.0
       * @property {boolean} disabled
       *
       * @example
       * effect.to = document.querySelector('#video-to');
       * effect.progress = 0.5;
       */
      return {
        vertex: {
          attribute: {
            a_transitionToTexCoord: 'vec2'
          },
          main: `
    v_transitionToTexCoord = a_transitionToTexCoord;`
        },
        fragment: {
          uniform: {
            u_transitionEnabled: 'bool',
            u_transitionProgress: 'float',
            u_transitionTo: 'sampler2D'
          },
          main: `
    if (u_transitionEnabled) {
        vec4 targetPixel = texture2D(u_transitionTo, v_transitionToTexCoord);
        color = mix(color, targetPixel.rgb, u_transitionProgress);
        alpha = mix(alpha, targetPixel.a, u_transitionProgress);
    }`
        },

        get disabled() {
          return !this.uniforms[0].data[0];
        },

        set disabled(b) {
          this.uniforms[0].data[0] = +!b;
        },

        get progress() {
          return this.uniforms[2].data[0];
        },

        set progress(p) {
          this.uniforms[2].data[0] = p;
        },

        get to() {
          return this.textures[0].data;
        },

        set to(media) {
          this.textures[0].data = media;
        },

        varying: {
          v_transitionToTexCoord: 'vec2'
        },
        uniforms: [{
          name: 'u_transitionEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_transitionTo',
          type: 'i',
          data: [1]
        }, {
          name: 'u_transitionProgress',
          type: 'f',
          data: [0]
        }],
        attributes: [{
          name: 'a_transitionToTexCoord',
          extends: 'a_texCoord'
        }],
        textures: [{
          format: 'RGBA',
          update: true
        }]
      };
    }

    /**
     * @function displacementTransition
     * @param {Object} [params]
     * @param {{x: number=0.0, y: number=0.0}} [params.sourceScale] initial displacement scale values of source media
     * @param {{x: number=0.0, y: number=0.0}} [params.toScale] initial displacement scale values of target media
     * @returns {displacementTransitionEffect}
     * @example displacementTransition()
     */
    function displacementTransition ({
      sourceScale,
      toScale
    } = {}) {
      const {
        x: sSx,
        y: sSy
      } = sourceScale || {
        x: 0.0,
        y: 0.0
      };
      const {
        x: tSx,
        y: tSy
      } = toScale || {
        x: 0.0,
        y: 0.0
      };
      /**
       * @typedef {Object} displacementTransitionEffect
       * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} to media source to transition into
       * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} map displacement map to use
       * @property {number} progress number between 0.0 and 1.0
       * @property {{x: number?, y: number?}} sourceScale displacement scale values of source media
       * @property {{x: number?, y: number?}} toScale displacement scale values of target media
       * @property {boolean} disabled
       *
       * @example
       * const img = new Image();
       * img.src = 'disp.jpg';
       * effect.map = img;
       * effect.to = document.querySelector('#video-to');
       * effect.sourceScale = {x: 0.4};
       * effect.toScale = {x: 0.8};
       */

      return {
        vertex: {
          attribute: {
            a_transitionToTexCoord: 'vec2',
            a_transitionDispMapTexCoord: 'vec2'
          },
          main: `
    v_transitionToTexCoord = a_transitionToTexCoord;
    v_transitionDispMapTexCoord = a_transitionDispMapTexCoord;`
        },
        fragment: {
          uniform: {
            u_transitionEnabled: 'bool',
            u_transitionTo: 'sampler2D',
            u_transitionDispMap: 'sampler2D',
            u_transitionProgress: 'float',
            u_sourceDispScale: 'vec2',
            u_toDispScale: 'vec2'
          },
          source: `
    vec3 transDispMap = vec3(1.0);
    vec2 transDispVec = vec2(0.0);

    if (u_transitionEnabled) {
        // read the displacement texture once and create the displacement map
        transDispMap = texture2D(u_transitionDispMap, v_transitionDispMapTexCoord).rgb - 0.5;

        // prepare the source coordinates for sampling
        transDispVec = vec2(u_sourceDispScale.x * transDispMap.r, u_sourceDispScale.y * transDispMap.g);
        sourceCoord = clamp(sourceCoord + transDispVec * u_transitionProgress, 0.0, 1.0);
    }`,
          main: `
    if (u_transitionEnabled) {
        // prepare the target coordinates for sampling
        transDispVec = vec2(u_toDispScale.x * transDispMap.r, u_toDispScale.y * transDispMap.g);
        vec2 targetCoord = clamp(v_transitionToTexCoord + transDispVec * (1.0 - u_transitionProgress), 0.0, 1.0);

        // sample the target
        vec4 targetPixel = texture2D(u_transitionTo, targetCoord);

        // mix the results of source and target
        color = mix(color, targetPixel.rgb, u_transitionProgress);
        alpha = mix(alpha, targetPixel.a, u_transitionProgress);
    }`
        },

        get disabled() {
          return !this.uniforms[0].data[0];
        },

        set disabled(b) {
          this.uniforms[0].data[0] = +!b;
        },

        get progress() {
          return this.uniforms[3].data[0];
        },

        set progress(p) {
          this.uniforms[3].data[0] = p;
        },

        get sourceScale() {
          const [x, y] = this.uniforms[4].data;
          return {
            x,
            y
          };
        },

        set sourceScale({
          x,
          y
        }) {
          if (typeof x !== 'undefined') this.uniforms[4].data[0] = x;
          if (typeof y !== 'undefined') this.uniforms[4].data[1] = y;
        },

        get toScale() {
          const [x, y] = this.uniforms[5].data;
          return {
            x,
            y
          };
        },

        set toScale({
          x,
          y
        }) {
          if (typeof x !== 'undefined') this.uniforms[5].data[0] = x;
          if (typeof y !== 'undefined') this.uniforms[5].data[1] = y;
        },

        get to() {
          return this.textures[0].data;
        },

        set to(media) {
          this.textures[0].data = media;
        },

        get map() {
          return this.textures[1].data;
        },

        set map(img) {
          this.textures[1].data = img;
        },

        varying: {
          v_transitionToTexCoord: 'vec2',
          v_transitionDispMapTexCoord: 'vec2'
        },
        uniforms: [{
          name: 'u_transitionEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_transitionTo',
          type: 'i',
          data: [1]
        }, {
          name: 'u_transitionDispMap',
          type: 'i',
          data: [2]
        }, {
          name: 'u_transitionProgress',
          type: 'f',
          data: [0]
        }, {
          name: 'u_sourceDispScale',
          type: 'f',
          data: [sSx, sSy]
        }, {
          name: 'u_toDispScale',
          type: 'f',
          data: [tSx, tSy]
        }],
        attributes: [{
          name: 'a_transitionToTexCoord',
          extends: 'a_texCoord'
        }, {
          name: 'a_transitionDispMapTexCoord',
          extends: 'a_texCoord'
        }],
        textures: [{
          format: 'RGBA',
          update: true
        }, {
          format: 'RGB'
        }]
      };
    }

    /**
     * @function dissolveTransition
     * @param {Object} [params]
     * @param {number} [params.low=0.0] initial lower edge of intersection step
     * @param {number} [params.high=0.01] initial higher edge of intersection step
     * @param {number[]} [params.color=[0, 0, 0, 0]] color to transition to if not transitioning to media
     * @param {boolean} [params.textureEnabled=true] whether to enable transition to texture instead of color
     * @returns {dissolveTransitionEffect}
     * @example dissolveTransition()
     */
    function dissolve ({
      low = 0.0,
      high = 0.01,
      color = [0.0, 0.0, 0.0, 0.0],
      textureEnabled = true
    } = {}) {
      /**
       * @typedef {Object} dissolveTransitionEffect
       * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} to media source to transition into
       * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} map dissolve map to use
       * @property {number[]} color a solid color to transition to with alpha channel, Array of 4 number in range [0.0, 1.0]
       * @property {number} low lower edge of intersection step, in range [0.0, 1.0]
       * @property {number} high higher edge of intersection step, in range [0.0, 1.0]
       * @property {number} progress number in range [0.0, 1.0]
       * @property {boolean} textureEnabled whether to enable transitioning to texture instead of color
       * @property {boolean} disabled
       *
       * @example
       * const img = new Image();
       * img.src = 'dissolve.jpg';
       * effect.map = img;
       * effect.to = document.querySelector('#video-to');
       * effect.progress = 0.5;
       */
      return {
        vertex: {
          attribute: {
            a_transitionToTexCoord: 'vec2',
            a_transitionDissolveMapTexCoord: 'vec2'
          },
          main: `
    v_transitionToTexCoord = a_transitionToTexCoord;
    v_transitionDissolveMapTexCoord = a_transitionDissolveMapTexCoord;`
        },
        fragment: {
          uniform: {
            u_transitionEnabled: 'bool',
            u_dissolveToTextureEnabled: 'bool',
            u_transitionProgress: 'float',
            u_dissolveLowEdge: 'float',
            u_dissolveHighEdge: 'float',
            u_transitionColorTo: 'vec4',
            u_transitionTo: 'sampler2D',
            u_transitionDissolveMap: 'sampler2D'
          },
          main: `
    if (u_transitionEnabled) {
        vec4 targetPixel = u_transitionColorTo;

        if (u_dissolveToTextureEnabled) {
            targetPixel = texture2D(u_transitionTo, v_transitionToTexCoord);
        }

        vec3 transDissolveMapColor = texture2D(u_transitionDissolveMap, v_transitionDissolveMapTexCoord).rgb;
        float transDissolveMapAlpha = dot(transDissolveMapColor, lumcoeff);
        vec4 transDissolveMap = vec4(transDissolveMapColor, transDissolveMapAlpha);

        float edgeDelta = u_dissolveHighEdge - u_dissolveLowEdge;
        float dissolveProgress = u_transitionProgress * (1.0 + edgeDelta);
        vec4 dissolveVector = smoothstep(u_dissolveLowEdge, u_dissolveHighEdge, clamp(transDissolveMap - 1.0 + dissolveProgress , 0.0, 1.0));

        // color = dissolveVector.rgb; // debug
        color = mix(color, targetPixel.rgb, dissolveVector.rgb);
        alpha = mix(alpha, targetPixel.a, dissolveVector.a);
    }`
        },

        get disabled() {
          return !this.uniforms[0].data[0];
        },

        set disabled(b) {
          this.uniforms[0].data[0] = +!b;
        },

        get textureEnabled() {
          return !this.uniforms[7].data[0];
        },

        set textureEnabled(b) {
          this.uniforms[7].data[0] = +!!b;
        },

        get progress() {
          return this.uniforms[3].data[0];
        },

        set progress(p) {
          this.uniforms[3].data[0] = Math.min(Math.max(p, 0.0), 1.0);
        },

        get color() {
          return this.uniforms[6].data.slice();
        },

        set color(colorTo) {
          colorTo.forEach((c, i) => {
            if (!Number.isNaN(c)) {
              this.uniforms[6].data[i] = c;
            }
          });
        },

        get to() {
          return this.textures[0].data;
        },

        set to(media) {
          this.textures[0].data = media;
        },

        get map() {
          return this.textures[1].data;
        },

        set map(img) {
          this.textures[1].data = img;
        },

        get low() {
          return this.uniforms[4].data[0];
        },

        set low(low) {
          this.uniforms[4].data[0] = Math.min(Math.max(low, 0.0), this.high);
        },

        get high() {
          return this.uniforms[5].data[0];
        },

        set high(high) {
          this.uniforms[5].data[0] = Math.min(Math.max(high, this.low), 1.0);
        },

        varying: {
          v_transitionToTexCoord: 'vec2',
          v_transitionDissolveMapTexCoord: 'vec2'
        },
        uniforms: [{
          name: 'u_transitionEnabled',
          type: 'i',
          data: [1]
        }, {
          name: 'u_transitionTo',
          type: 'i',
          data: [1]
        }, {
          name: 'u_transitionDissolveMap',
          type: 'i',
          data: [2]
        }, {
          name: 'u_transitionProgress',
          type: 'f',
          data: [0]
        }, {
          name: 'u_dissolveLowEdge',
          type: 'f',
          data: [low]
        }, {
          name: 'u_dissolveHighEdge',
          type: 'f',
          data: [high]
        }, {
          name: 'u_transitionColorTo',
          type: 'f',
          data: color
        }, {
          name: 'u_dissolveToTextureEnabled',
          type: 'i',
          data: [+!!textureEnabled]
        }],
        attributes: [{
          name: 'a_transitionToTexCoord',
          extends: 'a_texCoord'
        }, {
          name: 'a_transitionDissolveMapTexCoord',
          extends: 'a_texCoord'
        }],
        textures: [{
          format: 'RGBA',
          update: true
        }, {
          format: 'RGB',
          update: false
        }]
      };
    }

    var core = {
      init,
      draw,
      destroy,
      resize,
      getWebGLContext,
      createTexture
    };

    const vertexSimpleTemplate = ({
      uniform = '',
      attribute = '',
      varying = '',
      constant = '',
      main = ''
    }) => `
precision highp float;
${uniform}
${attribute}
attribute vec2 a_position;
${varying}

const vec3 lumcoeff = vec3(0.2125, 0.7154, 0.0721);
${constant}
void main() {
    ${main}
    gl_Position = vec4(a_position.xy, 0.0, 1.0);
}`;

    const vertexMediaTemplate = ({
      uniform = '',
      attribute = '',
      varying = '',
      constant = '',
      main = ''
    }) => `
precision highp float;
${uniform}
${attribute}
attribute vec2 a_texCoord;
attribute vec2 a_position;
${varying}
varying vec2 v_texCoord;

const vec3 lumcoeff = vec3(0.2125, 0.7154, 0.0721);
${constant}
void main() {
    v_texCoord = a_texCoord;
    ${main}
    gl_Position = vec4(a_position.xy, 0.0, 1.0);
}`;

    const fragmentSimpleTemplate = ({
      uniform = '',
      varying = '',
      constant = '',
      main = '',
      source = ''
    }) => `
precision highp float;
${varying}
${uniform}

const vec3 lumcoeff = vec3(0.2125, 0.7154, 0.0721);
${constant}
void main() {
    ${source}
    vec3 color = vec3(0.0);
    float alpha = 1.0;
    ${main}
    gl_FragColor = vec4(color, 1.0) * alpha;
}`;

    const fragmentMediaTemplate = ({
      uniform = '',
      varying = '',
      constant = '',
      main = '',
      source = ''
    }) => `
precision highp float;
${varying}
varying vec2 v_texCoord;
${uniform}
uniform sampler2D u_source;

const vec3 lumcoeff = vec3(0.2125, 0.7154, 0.0721);
${constant}
void main() {
    vec2 sourceCoord = v_texCoord;
    ${source}
    vec4 pixel = texture2D(u_source, sourceCoord);
    vec3 color = pixel.rgb;
    float alpha = pixel.a;
    ${main}
    gl_FragColor = vec4(color, 1.0) * alpha;
}`;

    const TEXTURE_WRAP = {
      stretch: 'CLAMP_TO_EDGE',
      repeat: 'REPEAT',
      mirror: 'MIRRORED_REPEAT'
    };
    const SHADER_ERROR_TYPES = {
      vertex: 'VERTEX',
      fragment: 'FRAGMENT'
    };
    /**
     * Initialize a compiled WebGLProgram for the given canvas and effects.
     *
     * @private
     * @param {Object} config
     * @param {WebGLRenderingContext} config.gl
     * @param {Object} config.plane
     * @param {Object[]} config.effects
     * @param {{width: number, heignt: number}} [config.dimensions]
     * @param {boolean} [config.noSource]
     * @return {{gl: WebGLRenderingContext, data: kamposSceneData, [dimensions]: {width: number, height: number}}}
     */

    function init({
      gl,
      plane,
      effects,
      dimensions,
      noSource
    }) {
      const programData = _initProgram(gl, plane, effects, noSource);

      return {
        gl,
        data: programData,
        dimensions: dimensions || {}
      };
    }

    let WEBGL_CONTEXT_SUPPORTED = false;
    /**
     * Get a webgl context for the given canvas element.
     *
     * Will return `null` if can not get a context.
     *
     * @private
     * @param {HTMLCanvasElement} canvas
     * @return {WebGLRenderingContext|null}
     */

    function getWebGLContext(canvas) {
      let context;
      const config = {
        preserveDrawingBuffer: false,
        // should improve performance - https://stackoverflow.com/questions/27746091/preservedrawingbuffer-false-is-it-worth-the-effort
        antialias: false,
        // should improve performance
        depth: false,
        // turn off for explicitness - and in some cases perf boost
        stencil: false // turn off for explicitness - and in some cases perf boost

      };
      context = canvas.getContext('webgl', config);

      if (context) {
        WEBGL_CONTEXT_SUPPORTED = true;
      } else if (!WEBGL_CONTEXT_SUPPORTED) {
        context = canvas.getContext('experimental-webgl', config);
      } else {
        return null;
      }

      return context;
    }
    /**
     * Resize the target canvas.
     *
     * @private
     * @param {WebGLRenderingContext} gl
     * @param {{width: number, height: number}} [dimensions]
     * @return {boolean}
     */


    function resize(gl, dimensions) {
      const canvas = gl.canvas;
      const realToCSSPixels = 1; //window.devicePixelRatio;

      const {
        width,
        height
      } = dimensions || {};
      let displayWidth, displayHeight;

      if (width && height) {
        displayWidth = width;
        displayHeight = height;
      } else {
        // Lookup the size the browser is displaying the canvas.
        displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
        displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
      } // Check if the canvas is not the same size.


      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    /**
     * Draw a given scene
     *
     * @private
     * @param {WebGLRenderingContext} gl
     * @param {planeConfig} plane
     * @param {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} media
     * @param {kamposSceneData} data
     * @param {{width: number, height: number}} dimensions
     */


    function draw(gl, plane = {}, media, data, dimensions) {
      const {
        program,
        source,
        attributes,
        uniforms,
        textures,
        extensions,
        vao
      } = data;
      const {
        xSegments = 1,
        ySegments = 1
      } = plane;

      if (media && source && source.texture) {
        // bind the source texture
        gl.bindTexture(gl.TEXTURE_2D, source.texture); // read source data into texture

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, media);
      } // Tell it to use our program (pair of shaders)


      gl.useProgram(program);

      if (vao) {
        extensions.vao.bindVertexArrayOES(vao);
      } else {
        // set attribute buffers with data
        _enableVertexAttributes(gl, attributes);
      } // set uniforms with data


      _setUniforms(gl, uniforms);

      let startTex = gl.TEXTURE0;

      if (source) {
        gl.activeTexture(startTex);
        gl.bindTexture(gl.TEXTURE_2D, source.texture);
        startTex = gl.TEXTURE1;
      }

      if (textures) {
        for (let i = 0; i < textures.length; i++) {
          gl.activeTexture(startTex + i);
          const tex = textures[i];
          gl.bindTexture(gl.TEXTURE_2D, tex.texture);

          if (tex.update) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl[tex.format], gl[tex.format], gl.UNSIGNED_BYTE, tex.data);
          }
        }
      } // Draw the rectangles


      gl.drawArrays(gl.TRIANGLES, 0, 6 * xSegments * ySegments);
    }
    /**
     * Free all resources attached to a specific webgl context.
     *
     * @private
     * @param {WebGLRenderingContext} gl
     * @param {kamposSceneData} data
     */


    function destroy(gl, data) {
      const {
        program,
        vertexShader,
        fragmentShader,
        source,
        attributes,
        extensions,
        vao
      } = data; // delete buffers

      (attributes || []).forEach(attr => gl.deleteBuffer(attr.buffer));
      if (vao) extensions.vao.deleteVertexArrayOES(vao); // delete texture

      if (source && source.texture) gl.deleteTexture(source.texture); // delete program

      gl.deleteProgram(program); // delete shaders

      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    }

    function _initProgram(gl, plane, effects, noSource = false) {
      const source = noSource ? null : {
        texture: createTexture(gl).texture,
        buffer: null
      };

      if (source) {
        // flip Y axis for source texture
        gl.bindTexture(gl.TEXTURE_2D, source.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      }

      const data = _mergeEffectsData(plane, effects, noSource);

      const vertexSrc = _stringifyShaderSrc(data.vertex, noSource ? vertexSimpleTemplate : vertexMediaTemplate);

      const fragmentSrc = _stringifyShaderSrc(data.fragment, noSource ? fragmentSimpleTemplate : fragmentMediaTemplate); // compile the GLSL program


      const {
        program,
        vertexShader,
        fragmentShader,
        error,
        type
      } = _getWebGLProgram(gl, vertexSrc, fragmentSrc);

      if (error) {
        throw new Error(`${type} error:: ${error}\n${type === SHADER_ERROR_TYPES.fragment ? fragmentSrc : vertexSrc}`);
      }

      let vaoExt, vao;

      try {
        vaoExt = gl.getExtension('OES_vertex_array_object');
        vao = vaoExt.createVertexArrayOES();
        vaoExt.bindVertexArrayOES(vao);
      } catch (e) {// ignore
      } // setup the vertex data


      const attributes = _initVertexAttributes(gl, program, data.attributes);

      if (vao) {
        _enableVertexAttributes(gl, attributes);

        vaoExt.bindVertexArrayOES(null);
      } // setup uniforms


      const uniforms = _initUniforms(gl, program, data.uniforms);

      return {
        extensions: {
          vao: vaoExt
        },
        program,
        vertexShader,
        fragmentShader,
        source,
        attributes,
        uniforms,
        textures: data.textures,
        vao
      };
    }

    function _mergeEffectsData(plane, effects, noSource = false) {
      return effects.reduce((result, config) => {
        const {
          attributes = [],
          uniforms = [],
          textures = [],
          varying = {}
        } = config;

        const merge = shader => Object.keys(config[shader] || {}).forEach(key => {
          if (key === 'constant' || key === 'main' || key === 'source') {
            result[shader][key] += config[shader][key] + '\n';
          } else {
            result[shader][key] = { ...result[shader][key],
              ...config[shader][key]
            };
          }
        });

        merge('vertex');
        merge('fragment');
        attributes.forEach(attribute => {
          const found = result.attributes.some(attr => {
            if (attr.name === attribute.name) {
              Object.assign(attr, attribute);
              return true;
            }
          });

          if (!found) {
            result.attributes.push(attribute);
          }
        });
        result.attributes.forEach(attr => {
          if (attr.extends) {
            const found = result.attributes.some(attrToExtend => {
              if (attrToExtend.name === attr.extends) {
                Object.assign(attr, attrToExtend, {
                  name: attr.name
                });
                return true;
              }
            });

            if (!found) {
              throw new Error(`Could not find attribute ${attr.extends} to extend`);
            }
          }
        });
        result.uniforms.push(...uniforms);
        result.textures.push(...textures);
        Object.assign(result.vertex.varying, varying);
        Object.assign(result.fragment.varying, varying);
        return result;
      }, getEffectDefaults(plane, noSource));
    }

    function _getPlaneCoords({
      xEnd,
      yEnd,
      factor
    }, plane = {}) {
      const {
        xSegments = 1,
        ySegments = 1
      } = plane;
      const result = [];

      for (let i = 0; i < xSegments; i++) {
        for (let j = 0; j < ySegments; j++) {
          /* A */
          result.push(xEnd * i / xSegments - factor, yEnd * j / ySegments - factor);
          /* B */

          result.push(xEnd * i / xSegments - factor, yEnd * (j + 1) / ySegments - factor);
          /* C */

          result.push(xEnd * (i + 1) / xSegments - factor, yEnd * j / ySegments - factor);
          /* D */

          result.push(xEnd * (i + 1) / xSegments - factor, yEnd * j / ySegments - factor);
          /* E */

          result.push(xEnd * i / xSegments - factor, yEnd * (j + 1) / ySegments - factor);
          /* F */

          result.push(xEnd * (i + 1) / xSegments - factor, yEnd * (j + 1) / ySegments - factor);
        }
      }

      return result;
    }

    function getEffectDefaults(plane, noSource) {
      /*
       * Default uniforms
       */
      const uniforms = noSource ? [] : [{
        name: 'u_source',
        type: 'i',
        data: [0]
      }];
      /*
       * Default attributes
       */

      const attributes = [{
        name: 'a_position',
        data: new Float32Array(_getPlaneCoords({
          xEnd: 2,
          yEnd: 2,
          factor: 1
        }, plane)),
        size: 2,
        type: 'FLOAT'
      }];

      if (!noSource) {
        attributes.push({
          name: 'a_texCoord',
          data: new Float32Array(_getPlaneCoords({
            xEnd: 1,
            yEnd: 1,
            factor: 0
          }, plane)),
          size: 2,
          type: 'FLOAT'
        });
      }

      return {
        vertex: {
          uniform: {},
          attribute: {},
          varying: {},
          constant: '',
          main: ''
        },
        fragment: {
          uniform: {},
          varying: {},
          constant: '',
          main: '',
          source: ''
        },
        attributes,
        uniforms,

        /*
         * Default textures
         */
        textures: []
      };
    }

    function _stringifyShaderSrc(data, template) {
      const templateData = Object.entries(data).reduce((result, [key, value]) => {
        if (['uniform', 'attribute', 'varying'].includes(key)) {
          result[key] = Object.entries(value).reduce((str, [name, type]) => str + `${key} ${type} ${name};\n`, '');
        } else {
          result[key] = value;
        }

        return result;
      }, {});
      return template(templateData);
    }

    function _getWebGLProgram(gl, vertexSrc, fragmentSrc) {
      const vertexShader = _createShader(gl, gl.VERTEX_SHADER, vertexSrc);

      const fragmentShader = _createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

      if (vertexShader.error) {
        return vertexShader;
      }

      if (fragmentShader.error) {
        return fragmentShader;
      }

      return _createProgram(gl, vertexShader, fragmentShader);
    }

    function _createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      const success = gl.getProgramParameter(program, gl.LINK_STATUS);

      if (success) {
        return {
          program,
          vertexShader,
          fragmentShader
        };
      }

      const exception = {
        error: gl.getProgramInfoLog(program),
        type: 'program'
      };
      gl.deleteProgram(program);
      return exception;
    }

    function _createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

      if (success) {
        return shader;
      }

      const exception = {
        error: gl.getShaderInfoLog(shader),
        type: type === gl.VERTEX_SHADER ? SHADER_ERROR_TYPES.vertex : SHADER_ERROR_TYPES.fragment
      };
      gl.deleteShader(shader);
      return exception;
    }
    /**
     * Create a WebGLTexture object.
     *
     * @private
     * @param {WebGLRenderingContext} gl
     * @param {Object} [config]
     * @param {number} config.width
     * @param {number} config.height
     * @param {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} config.data
     * @param {string} config.format
     * @param {Object} config.wrap
     * @return {{texture: WebGLTexture, width: number, height: number}}
     */


    function createTexture(gl, {
      width = 1,
      height = 1,
      data = null,
      format = 'RGBA',
      wrap = 'stretch'
    } = {}) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture); // Set the parameters so we can render any size image

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[_getTextureWrap(wrap.x || wrap)]);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[_getTextureWrap(wrap.y || wrap)]);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      if (data) {
        // Upload the image into the texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl[format], gl[format], gl.UNSIGNED_BYTE, data);
      } else {
        // Create empty texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl[format], width, height, 0, gl[format], gl.UNSIGNED_BYTE, null);
      }

      return {
        texture,
        width,
        height,
        format
      };
    }

    function _createBuffer(gl, program, name, data) {
      const location = gl.getAttribLocation(program, name);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return {
        location,
        buffer
      };
    }

    function _initVertexAttributes(gl, program, data) {
      return (data || []).map(attr => {
        const {
          location,
          buffer
        } = _createBuffer(gl, program, attr.name, attr.data);

        return {
          name: attr.name,
          location,
          buffer,
          type: attr.type,
          size: attr.size
        };
      });
    }

    function _initUniforms(gl, program, uniforms) {
      return (uniforms || []).map(uniform => {
        const location = gl.getUniformLocation(program, uniform.name);
        return {
          location,
          size: uniform.size || uniform.data.length,
          type: uniform.type,
          data: uniform.data
        };
      });
    }

    function _setUniforms(gl, uniformData) {
      (uniformData || []).forEach(uniform => {
        let {
          size,
          type,
          location,
          data
        } = uniform;

        if (type === 'i') {
          data = new Int32Array(data);
        }

        gl[`uniform${size}${type}v`](location, data);
      });
    }

    function _enableVertexAttributes(gl, attributes) {
      (attributes || []).forEach(attrib => {
        const {
          location,
          buffer,
          size,
          type
        } = attrib;
        gl.enableVertexAttribArray(location);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(location, size, gl[type], false, 0, 0);
      });
    }

    function _getTextureWrap(key) {
      return TEXTURE_WRAP[key] || TEXTURE_WRAP['stretch'];
    }
    /**
     * @private
     * @typedef {Object} kamposSceneData
     * @property {WebGLProgram} program
     * @property {{vao: OES_vertex_array_object?}} extensions
     * @property {WebGLShader} vertexShader
     * @property {WebGLShader} fragmentShader
     * @property {kamposTarget} source
     * @property {kamposAttribute[]} attributes
     * @property {WebGLVertexArrayObjectOES} [vao]
     *
     * @typedef {Object} kamposTarget
     * @property {WebGLTexture} texture
     * @property {WebGLFramebuffer|null} buffer
     * @property {number} [width]
     * @property {number} [height]
     *
     * @typedef {Object} kamposAttribute
     * @property {string} name
     * @property {GLint} location
     * @property {WebGLBuffer} buffer
     * @property {string} type
       @property {number} size
     */

    /**
     * Initialize a WebGL target with effects.
     *
     * @class Kampos
     * @param {kamposConfig} config
     * @example
     * import { Kampos, effects} from 'kampos';
     *
     * const target = document.querySelector('#canvas');
     * const hueSat = effects.hueSaturation();
     * const kampos = new Kampos({target, effects: [hueSat]});
     */

    class Kampos {
      /**
       * @constructor
       */
      constructor(config) {
        if (!config || !config.target) {
          throw new Error('A target canvas was not provided');
        }

        if (Kampos.preventContextCreation) throw new Error('Context creation is prevented');

        this._contextCreationError = function () {
          Kampos.preventContextCreation = true;

          if (config && config.onContextCreationError) {
            config.onContextCreationError.call(this, config);
          }
        };

        config.target.addEventListener('webglcontextcreationerror', this._contextCreationError, false);
        const success = this.init(config);
        if (!success) throw new Error('Could not create context');

        this._restoreContext = e => {
          e && e.preventDefault();
          this.config.target.removeEventListener('webglcontextrestored', this._restoreContext, true);
          const success = this.init();
          if (!success) return false;

          if (this._source) {
            this.setSource(this._source);
          }

          delete this._source;

          if (config && config.onContextRestored) {
            config.onContextRestored.call(this, config);
          }

          return true;
        };

        this._loseContext = e => {
          e.preventDefault();

          if (this.gl && this.gl.isContextLost()) {
            this.lostContext = true;
            this.config.target.addEventListener('webglcontextrestored', this._restoreContext, true);
            this.destroy(true);

            if (config && config.onContextLost) {
              config.onContextLost.call(this, config);
            }
          }
        };

        this.config.target.addEventListener('webglcontextlost', this._loseContext, true);
      }
      /**
       * Initializes a Kampos instance.
       * This is called inside the constructor,
       * but can be called again after effects have changed
       * or after {@link Kampos#destroy}.
       *
       * @param {kamposConfig} [config] defaults to `this.config`
       * @return {boolean} success whether initializing of the context and program were successful
       */


      init(config) {
        config = config || this.config;
        let {
          target,
          plane,
          effects,
          ticker,
          noSource
        } = config;
        if (Kampos.preventContextCreation) return false;
        this.lostContext = false;
        let gl = core.getWebGLContext(target);
        if (!gl) return false;

        if (gl.isContextLost()) {
          const success = this.restoreContext();
          if (!success) return false; // get new context from the fresh clone

          gl = core.getWebGLContext(this.config.target);
          if (!gl) return false;
        }

        const {
          x: xSegments = 1,
          y: ySegments = 1
        } = plane && plane.segments ? typeof plane.segments === 'object' ? plane.segments : {
          x: plane.segments,
          y: plane.segments
        } : {};
        this.plane = {
          xSegments,
          ySegments
        };
        const {
          data
        } = core.init({
          gl,
          plane: this.plane,
          effects,
          dimensions: this.dimensions,
          noSource
        });
        this.gl = gl;
        this.data = data; // cache for restoring context

        this.config = config;

        if (ticker) {
          this.ticker = ticker;
          ticker.add(this);
        }

        return true;
      }
      /**
       * Set the source config.
       *
       * @param {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap|kamposSource} source
       * @example
       * const media = document.querySelector('#video');
       * kampos.setSource(media);
       */


      setSource(source) {
        if (!source) return;

        if (this.lostContext) {
          const success = this.restoreContext();
          if (!success) return;
        }

        let media, width, height;

        if (Object.prototype.toString.call(source) === '[object Object]') {
          ({
            media,
            width,
            height
          } = source);
        } else {
          media = source;
        }

        if (width && height) {
          this.dimensions = {
            width,
            height
          };
        } // resize the target canvas if needed


        core.resize(this.gl, this.dimensions);

        this._createTextures();

        this.media = media;
      }
      /**
       * Draw current scene.
       *
       * @param {number} time
       */


      draw(time) {
        if (this.lostContext) {
          const success = this.restoreContext();
          if (!success) return;
        }

        const cb = this.config.beforeDraw;
        if (cb && cb(time) === false) return;
        core.draw(this.gl, this.plane, this.media, this.data, this.dimensions);
      }
      /**
       * Starts the animation loop.
       *
       * If a {@link Ticker} is used, this instance will be added to that {@link Ticker}.
       *
       * @param {function} beforeDraw function to run before each draw call
       */


      play(beforeDraw) {
        this.config.beforeDraw = beforeDraw;

        if (this.ticker) {
          if (this.animationFrameId) {
            this.stop();
          }

          if (!this.playing) {
            this.playing = true;
            this.ticker.add(this);
          }
        } else if (!this.animationFrameId) {
          const loop = time => {
            this.animationFrameId = window.requestAnimationFrame(loop);
            this.draw(time);
          };

          this.animationFrameId = window.requestAnimationFrame(loop);
        }
      }
      /**
       * Stops the animation loop.
       *
       * If a {@link Ticker} is used, this instance will be removed from that {@link Ticker}.
       */


      stop() {
        if (this.animationFrameId) {
          window.cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }

        if (this.playing) {
          this.playing = false;
          this.ticker.remove(this);
        }
      }
      /**
       * Stops the animation loop and frees all resources.
       *
       * @param {boolean} keepState for internal use.
       */


      destroy(keepState) {
        this.stop();

        if (this.gl && this.data) {
          core.destroy(this.gl, this.data);
        }

        if (keepState) {
          const dims = this.dimensions || {};
          this._source = this._source || {
            media: this.media,
            width: dims.width,
            height: dims.height
          };
        } else {
          if (this.config) {
            this.config.target.removeEventListener('webglcontextlost', this._loseContext, true);
            this.config.target.removeEventListener('webglcontextcreationerror', this._contextCreationError, false);
          }

          this.config = null;
          this.dimensions = null;
        }

        this.gl = null;
        this.data = null;
        this.media = null;
      }
      /**
       * Restore a lost WebGL context fot the given target.
       * This will replace canvas DOM element with a fresh clone.
       *
       * @return {boolean} success whether forcing a context restore was successful
       */


      restoreContext() {
        if (Kampos.preventContextCreation) return false;
        const canvas = this.config.target;
        const clone = this.config.target.cloneNode(true);
        const parent = canvas.parentNode;

        if (parent) {
          parent.replaceChild(clone, canvas);
        }

        this.config.target = clone;
        canvas.removeEventListener('webglcontextlost', this._loseContext, true);
        canvas.removeEventListener('webglcontextrestored', this._restoreContext, true);
        canvas.removeEventListener('webglcontextcreationerror', this._contextCreationError, false);
        clone.addEventListener('webglcontextlost', this._loseContext, true);
        clone.addEventListener('webglcontextcreationerror', this._contextCreationError, false);

        if (this.lostContext) {
          return this._restoreContext();
        }

        return true;
      }

      _createTextures() {
        this.data && this.data.textures.forEach((texture, i) => {
          const data = this.data.textures[i];
          data.texture = core.createTexture(this.gl, {
            width: this.dimensions.width,
            height: this.dimensions.height,
            format: texture.format,
            data: texture.data,
            wrap: texture.wrap
          }).texture;
          data.format = texture.format;
          data.update = texture.update;
        });
      }

    }
    /**
     * @typedef {Object} kamposConfig
     * @property {HTMLCanvasElement} target
     * @property {effectConfig[]} effects
     * @property {planeConfig} plane
     * @property {Ticker} [ticker]
     * @property {boolean} [noSource]
     * @property {function} [beforeDraw] function to run before each draw call. If it returns `false` {@link kampos#draw} will not be called.
     * @property {function} [onContextLost]
     * @property {function} [onContextRestored]
     * @property {function} [onContextCreationError]
     */

    /**
     * @typedef {Object} kamposSource
     * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} media
     * @property {number} width
     * @property {number} height
     */

    /**
     * @typedef {Object} effectConfig
     * @property {shaderConfig} vertex
     * @property {shaderConfig} fragment
     * @property {Attribute[]} attributes
     * @property {Uniform[]} uniforms
     * @property {Object} varying
     * @property {textureConfig[]} textures
     */

    /**
     * @typedef {Object} planeConfig
     * @property {number|{x: number: y: number}} segments
     */

    /**
     * @typedef {Object} shaderConfig
     * @property {string} [main]
     * @property {string} [source]
     * @property {string} [constant]
     * @property {Object} [uniform] mapping variable name to type
     * @property {Object} [attribute] mapping variable name to type
     */

    /**
     * @typedef {Object} textureConfig
     * @property {string} format
     * @property {ArrayBufferView|ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement|ImageBitmap} [data]
     * @property {boolean} [update] defaults to `false`
     * @property {string|{x: string, y: string}} [wrap] with values `'stretch'|'repeat'|'mirror'`, defaults to `'stretch'`
     */

    /**
     * @typedef {Object} Attribute
     * @property {string} extends name of another attribute to extend
     * @property {string} name name of attribute to use inside the shader
     * @property {number} size attribute size - number of elements to read on each iteration
     * @property {string} type
     * @property {ArrayBufferView} data
     */

    /**
     * @typedef {Object} Uniform
     * @property {string} name name of the uniform to be used in the shader
     * @property {number} [size] defaults to `data.length`
     * @property {string} type
     * @property {Array} data
     */

    /**
     * Initialize a ticker instance for batching animation of multiple {@link Kampos} instances.
     *
     * @class Ticker
     */
    class Ticker {
      constructor() {
        this.pool = [];
      }
      /**
       * Starts the animation loop.
       */


      start() {
        if (!this.animationFrameId) {
          const loop = time => {
            this.animationFrameId = window.requestAnimationFrame(loop);
            this.draw(time);
          };

          this.animationFrameId = window.requestAnimationFrame(loop);
        }
      }
      /**
       * Stops the animation loop.
       */


      stop() {
        window.cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      /**
       * Invoke `.draw()` on all instances in the pool.
       *
       * @param {number} time
       */


      draw(time) {
        this.pool.forEach(instance => instance.draw(time));
      }
      /**
       * Add an instance to the pool.
       *
       * @param {Kampos} instance
       */


      add(instance) {
        const index = this.pool.indexOf(instance);

        if (!~index) {
          this.pool.push(instance);
          instance.playing = true;
        }
      }
      /**
       * Remove an instance form the pool.
       *
       * @param {Kampos} instance
       */


      remove(instance) {
        const index = this.pool.indexOf(instance);

        if (~index) {
          this.pool.splice(index, 1);
          instance.playing = false;
        }
      }

    }

    var index = {
      effects: {
        alphaMask,
        blend,
        brightnessContrast,
        hueSaturation,
        duotone,
        displacement,
        turbulence
      },
      transitions: {
        fade,
        displacement: displacementTransition,
        dissolve
      },
      noise: {
        perlinNoise,
        simplex,
        cellular
      },
      Kampos,
      Ticker
    };

    return index;

})));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOM_loadHomescreen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM/loadHomescreen.js */ "./src/DOM/loadHomescreen.js");

(0,_DOM_loadHomescreen_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCxjQUFj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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3Qzs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtB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QTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsVUFBVTtBQUN6QixlQUFlLFNBQVM7QUFDeEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUFJO0FBQ1Y7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQixvQkFBb0IsMkZBQTJGO0FBQy9HLG9CQUFvQiwyRkFBMkY7QUFDL0csb0JBQW9CLFVBQVU7QUFDOUIsb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFFBQVE7QUFDNUIsb0JBQW9CLFNBQVM7QUFDN0Isb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsS0FBSztBQUNMLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEVBQUU7QUFDRixFQUFFO0FBQ0Y7QUFDQSxFQUFFOztBQUVGO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxFQUFFO0FBQ0YsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRUFBRTtBQUNGLEVBQUU7O0FBRUY7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxNQUFNO0FB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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7O0FDQXFEO0FBRXJERyxrRUFBYyxFQUFFLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS9lbGVtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NL2xvYWRIb21lc2NyZWVuLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NL2xvYWRNYXBTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00vbG9hZE5hbWVTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00vcmVuZGVyQ29udGFpbmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL2hvbWVzY3JlZW4uY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL21hcHNjcmVlbi5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvbmFtZXNjcmVlbi5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL2hvbWVzY3JlZW4uY3NzPzUwNWEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvbWFwc2NyZWVuLmNzcz8yNjM5Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL25hbWVzY3JlZW4uY3NzPzZhOTMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2thbXBvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZWxlbSA9IGZ1bmN0aW9uIChjb250ZW50LCB2ZXJzaW9uID0gMSkge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY29udGVudFtcInByb3BcIl0pO1xuICAgIGxldCB0ZXh0ID0gY29udGVudFtcInRleHRDb250ZW50XCJdO1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICB9XG4gICAgbGV0IGlkID0gY29udGVudFtcImlkXCJdO1xuICAgIGlmIChpZCkge1xuICAgICAgICBlbC5pZCA9IGlkO1xuICAgIH1cbiAgICBsZXQgY2xhc3NOYW1lID0gY29udGVudFtcImNsYXNzTmFtZVwiXTtcbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICB9XG4gICAgbGV0IEhUTUwgPSBjb250ZW50W1wiaW5uZXJIVE1MXCJdO1xuICAgIGlmIChIVE1MKSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IEhUTUw7XG4gICAgfVxuICAgIGxldCBzcmMgPSBjb250ZW50W1wic3JjXCJdO1xuICAgIGlmIChzcmMpIHtcbiAgICAgICAgZWwuc3JjID0gc3JjO1xuICAgIH1cbiAgICBsZXQgZm9ySSA9IGNvbnRlbnRbXCJmb3JcIl07XG4gICAgaWYgKGZvckkpIHtcbiAgICAgICAgZWwuZm9yID0gZm9ySTtcbiAgICB9XG4gICAgbGV0IHR5cGUgPSBjb250ZW50W1widHlwZVwiXTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgICBlbC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgbGV0IG5hbWUgPSBjb250ZW50W1wibmFtZVwiXTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgICBlbC5uYW1lID0gbmFtZTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gY29udGVudFtcInZhbHVlXCJdO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBsZXQgcGxhY2Vob2xkZXIgPSBjb250ZW50W1wicGxhY2Vob2xkZXJcIl07XG4gICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGVsLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGxldCBzcGVsbGNoZWNrID0gY29udGVudFtcInNwZWxsY2hlY2tcIl07XG4gICAgaWYgKHNwZWxsY2hlY2spIHtcbiAgICAgICAgZWwuc3BlbGxjaGVjayA9IHNwZWxsY2hlY2s7XG4gICAgfVxuICAgIGxldCByZXF1aXJlZCA9IGNvbnRlbnRbXCJyZXF1aXJlZFwiXTtcbiAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgZWwucmVxdWlyZWQgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgY2hlY2tlZCA9IGNvbnRlbnRbXCJjaGVja2VkXCJdO1xuICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgaHJlZiA9IGNvbnRlbnRbXCJocmVmXCJdO1xuICAgIGlmIChocmVmKSB7XG4gICAgICAgIGVsLmhyZWYgPSBocmVmO1xuICAgIH1cbiAgICBsZXQgYXV0b3BsYXkgPSBjb250ZW50W1wiYXV0b3BsYXlcIl07XG4gICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIGVsLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IG11dGVkID0gY29udGVudFtcIm11dGVkXCJdO1xuICAgIGlmIChtdXRlZCkge1xuICAgICAgICBlbC5tdXRlZCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBjaGlsZHJlbiA9IGNvbnRlbnRbXCJjaGlsZHJlblwiXTtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICh2ZXJzaW9uID09PSAyKSB7XG4gICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZWxlbShjaGlsZCwgMikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZWxlbTtcbiIsImltcG9ydCByZW5kZXJDb250YWluZXIgZnJvbSBcIi4vcmVuZGVyQ29udGFpbmVyLmpzXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi9lbGVtLmpzXCI7XG5pbXBvcnQgbG9hZE5hbWVTY3JlZW4gZnJvbSBcIi4vbG9hZE5hbWVTY3JlZW4uanNcIjtcbmltcG9ydCBiYWNrZ3JvdW5kIGZyb20gXCIuLi9hc3NldHMvaW1hZ2VzL2hvbWVzY3JlZW4uanBnXCI7XG5pbXBvcnQgXCIuLi9DU1MvaG9tZXNjcmVlbi5jc3NcIjtcblxuZnVuY3Rpb24gbG9hZEhvbWVzY3JlZW4oKSB7XG4gICAgcmVuZGVyQ29udGFpbmVyKCk7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIik7XG4gICAgY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmQ7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogXCJCQVRUTEVTSElQXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiaG9tZUhlYWRlclwiLFxuICAgICAgICB9KVxuICAgICk7XG4gICAgY29uc3QgbmV3R2FtZSA9IGVsZW0oe1xuICAgICAgICBwcm9wOiBcIm1haW5cIixcbiAgICAgICAgY2xhc3NOYW1lOiBcIm5ld0dhbWVDb250YWluZXJcIixcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiTmV3IEdhbWVcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwibmV3R2FtZVwiLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgfSk7XG4gICAgbmV3R2FtZS5maXJzdENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvYWROYW1lU2NyZWVuKCk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmV3R2FtZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwidWxcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KVxuICAgICk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZm9vdGVyXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9vdGVyXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcInNwYW5cIiwgdGV4dENvbnRlbnQ6IFwiQ3JlYXRlZCBieSBKYXlzb24gUywgXCIgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJJbWFnZSBieSB1cGtseWFrIG9uIEZyZWVwaWtcIixcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogXCJodHRwczovL3d3dy5mcmVlcGlrLmNvbS9mcmVlLXZlY3Rvci9zdW5rZW4tY3J1aXNlLXNoaXAtc2VhLWhhcmJvci1tb3JuaW5nXzIxNTg0OTE1Lmh0bSNxdWVyeT1iYXR0bGVzaGlwJTIwYmFja2dyb3VuZCZwb3NpdGlvbj0zMiZmcm9tX3ZpZXc9c2VhcmNoJnRyYWNrPWFpc1wiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSlcbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb2FkSG9tZXNjcmVlbjtcbiIsImltcG9ydCBlbGVtIGZyb20gXCIuL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uL0NTUy9tYXBzY3JlZW4uY3NzXCI7XG4vLyBpbXBvcnQgKiBhcyBrYW1wb3MgZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9rYW1wb3NcIjtcbmltcG9ydCBrYW1wb3MgZnJvbSBcImthbXBvc1wiO1xuaW1wb3J0IGdyZWVuUGluU3JjIGZyb20gXCIuLi9hc3NldHMvaW1hZ2VzL2dyZWVuLXBpbi5wbmdcIjtcbmltcG9ydCByZW5QaW5TcmMgZnJvbSBcIi4uL2Fzc2V0cy9pbWFnZXMvcmVkLXBpbi5wbmdcIjtcblxuLy9hZGQgbWFwIHVuZGVyIGV2ZXJ5dGhpbmdcbi8vdHJhbnNpdGlvbiBldmVyeXRoaW5nIGF3YXlcbmZ1bmN0aW9uIGxvYWRNYXBTY3JlZW4ob3B0aW9ucykge1xuICAgIGNvbnNvbGUubG9nKEthbXBvcyk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICAgIGNvbnN0IHJlZFBpbjEgPSBuZXcgSW1hZ2UoKTtcbiAgICByZWRQaW4xLnNyYyA9IHJlblBpblNyYztcbiAgICByZWRQaW4xLmNsYXNzTGlzdC5hZGQoXCJyZWRQaW4xXCIpO1xuICAgIGNvbnN0IHJlZFBpbjIgPSBuZXcgSW1hZ2UoKTtcbiAgICByZWRQaW4yLnNyYyA9IHJlblBpblNyYztcbiAgICByZWRQaW4yLmNsYXNzTGlzdC5hZGQoXCJyZWRQaW4yXCIpO1xuICAgIGNvbnN0IHJlZFBpbjMgPSBuZXcgSW1hZ2UoKTtcbiAgICByZWRQaW4zLnNyYyA9IHJlblBpblNyYztcbiAgICByZWRQaW4zLmNsYXNzTGlzdC5hZGQoXCJyZWRQaW4zXCIpO1xuICAgIGNvbnN0IGdyZWVuUGluID0gbmV3IEltYWdlKCk7XG4gICAgZ3JlZW5QaW4uc3JjID0gZ3JlZW5QaW5TcmM7XG4gICAgZ3JlZW5QaW4uY2xhc3NMaXN0LmFkZChcImdyZWVuUGluXCIpO1xuICAgIGNvbnN0IG1hcCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwibWFwXCIgfSk7XG4gICAgbWFwLmFwcGVuZENoaWxkKHJlZFBpbjEpO1xuICAgIG1hcC5hcHBlbmRDaGlsZChyZWRQaW4yKTtcbiAgICBtYXAuYXBwZW5kQ2hpbGQocmVkUGluMyk7XG4gICAgbWFwLmFwcGVuZENoaWxkKGdyZWVuUGluKTtcbiAgICBib2R5LnByZXBlbmQobWFwKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhaW5lclwiKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KHJlbmRlckNvbnRhaW5lciwgMjAwMCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbnRhaW5lcigpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhaW5lclwiKTtcblxuICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcbn1cblxuLy8gZnVuY3Rpb24gbG9hZEltYWdlKHNyYykge1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbi8vICAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJhbm9ueW1vdXNcIjtcblxuLy8gICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICBpbWcuc3JjID0gc3JjO1xuLy8gICAgIH0pO1xuLy8gfVxuLy8gLy8gZ2V0IHRoZSBpbWFnZSBVUkxzXG4vLyBjb25zdCBpbWFnZUZyb21TcmMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NvdXJjZS1mcm9tXCIpLnNyYztcbi8vIGNvbnN0IGltYWdlVG9TcmMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NvdXJjZS10b1wiKS5kYXRhc2V0LnNyYztcbi8vIC8vIGxvYWQgaW1hZ2VzXG4vLyBjb25zdCBwcm9taXNlZEltYWdlcyA9IFtsb2FkSW1hZ2UoaW1hZ2VGcm9tU3JjKSwgbG9hZEltYWdlKGltYWdlVG9TcmMpXTtcblxuLy8gY29uc3QgdHVyYnVsZW5jZSA9IGthbXBvcy5lZmZlY3RzLnR1cmJ1bGVuY2Uoe1xuLy8gICAgIG5vaXNlOiBrYW1wb3Mubm9pc2UucGVybGluTm9pc2UsXG4vLyB9KTtcblxuLy8gY29uc3QgV0lEVEggPSA4NTQ7XG4vLyBjb25zdCBIRUlHSFQgPSA0ODA7XG4vLyBjb25zdCBDRUxMX0ZBQ1RPUiA9IDQ7XG4vLyBjb25zdCBBTVBMSVRVREUgPSBDRUxMX0ZBQ1RPUiAvIFdJRFRIO1xuXG4vLyB0dXJidWxlbmNlLmZyZXF1ZW5jeSA9IHsgeDogQU1QTElUVURFLCB5OiBBTVBMSVRVREUgfTtcbi8vIHR1cmJ1bGVuY2Uub2N0YXZlcyA9IDg7XG4vLyB0dXJidWxlbmNlLmlzRnJhY3RhbCA9IHRydWU7XG5cbi8vIGNvbnN0IG1hcFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4vLyBtYXBUYXJnZXQud2lkdGggPSBXSURUSDtcbi8vIG1hcFRhcmdldC5oZWlnaHQgPSBIRUlHSFQ7XG5cbi8vIGNvbnN0IGRpc3NvbHZlTWFwID0gbmV3IGthbXBvcy5LYW1wb3Moe1xuLy8gICAgIHRhcmdldDogbWFwVGFyZ2V0LFxuLy8gICAgIGVmZmVjdHM6IFt0dXJidWxlbmNlXSxcbi8vICAgICBub1NvdXJjZTogdHJ1ZSxcbi8vIH0pO1xuXG4vLyBkaXNzb2x2ZU1hcC5kcmF3KCk7XG5cbi8vIGNvbnN0IGRpc3NvbHZlID0ga2FtcG9zLnRyYW5zaXRpb25zLmRpc3NvbHZlKCk7XG5cbi8vIGRpc3NvbHZlLm1hcCA9IG1hcFRhcmdldDtcbi8vIGRpc3NvbHZlLmhpZ2ggPSAwLjM7IC8vIGZvciBsaXF1aWQtbGlrZSBlZmZlY3RcblxuLy8gY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXJnZXRcIik7XG4vLyBjb25zdCBoaXBwbyA9IG5ldyBrYW1wb3MuS2FtcG9zKHsgdGFyZ2V0LCBlZmZlY3RzOiBbZGlzc29sdmVdIH0pO1xuXG4vLyBQcm9taXNlLmFsbChwcm9taXNlZEltYWdlcylcbi8vICAgICAudGhlbigoW2Zyb21JbWFnZSwgdG9JbWFnZV0pID0+IHtcbi8vICAgICAgICAgaGlwcG8uc2V0U291cmNlKHsgbWVkaWE6IGZyb21JbWFnZSwgd2lkdGg6IFdJRFRILCBoZWlnaHQ6IEhFSUdIVCB9KTtcblxuLy8gICAgICAgICBkaXNzb2x2ZS50byA9IHRvSW1hZ2U7XG4vLyAgICAgICAgIGRpc3NvbHZlLnRleHR1cmVzWzFdLnVwZGF0ZSA9IHRydWU7XG4vLyAgICAgfSlcbi8vICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGhpcHBvLnBsYXkoKHRpbWUpID0+IHtcbi8vICAgICAgICAgICAgIHR1cmJ1bGVuY2UudGltZSA9IHRpbWUgKiAyO1xuLy8gICAgICAgICAgICAgZGlzc29sdmVNYXAuZHJhdygpO1xuLy8gICAgICAgICAgICAgZGlzc29sdmUucHJvZ3Jlc3MgPSBNYXRoLmFicyhNYXRoLnNpbih0aW1lICogMmUtNCkpOyAvLyBtdWx0aXBseSB0aW1lIGJ5IGEgZmFjdG9yIHRvIHNsb3cgaXQgZG93biBhIGJpdFxuLy8gICAgICAgICB9KTtcbi8vICAgICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZE1hcFNjcmVlbjtcbiIsImltcG9ydCBsb2FkTWFwU2NyZWVuIGZyb20gXCIuL2xvYWRNYXBTY3JlZW4uanNcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uL0NTUy9uYW1lc2NyZWVuLmNzc1wiO1xuXG5mdW5jdGlvbiBsb2FkTmFtZVNjcmVlbigpIHtcbiAgICBjb25zdCBuZXdHYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXdHYW1lQ29udGFpbmVyXCIpO1xuICAgIHJlbmRlck5ld0dhbWUoKTtcbiAgICBjb25zdCBncmVldGluZyA9IGVsZW0oeyBwcm9wOiBcInBcIiwgdGV4dENvbnRlbnQ6IFwiSGVsbG8gQWRtaXJhbC4uLlwiIH0pO1xuICAgIGNvbnN0IGlucHV0RmllbGQgPSBlbGVtKHtcbiAgICAgICAgcHJvcDogXCJpbnB1dFwiLFxuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwiTmFtZVwiLFxuICAgIH0pO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGVsZW0oe1xuICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICB0ZXh0Q29udGVudDogXCJTdGFydFwiLFxuICAgIH0pO1xuICAgIGNvbnN0IG5hbWVGaWVsZCA9IGVsZW0oe1xuICAgICAgICBwcm9wOiBcImZvcm1cIixcbiAgICAgICAgY2xhc3NOYW1lOiBcIm5hbWVGb3JtXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbaW5wdXRGaWVsZCwgYnV0dG9uXSxcbiAgICB9KTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbG9hZE1hcFNjcmVlbih7IHBsYXllck5hbWU6IGlucHV0RmllbGQudmFsdWUgfSk7XG4gICAgfSk7XG4gICAgbmV3R2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChncmVldGluZyk7XG4gICAgbmV3R2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lRmllbGQpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJOZXdHYW1lKCkge1xuICAgIGNvbnN0IG5ld0dhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ld0dhbWVDb250YWluZXJcIik7XG4gICAgd2hpbGUgKG5ld0dhbWVDb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICBuZXdHYW1lQ29udGFpbmVyLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBsb2FkTmFtZVNjcmVlbjtcbiIsImZ1bmN0aW9uIHJlbmRlckNvbnRhaW5lcigpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhaW5lclwiKTtcbiAgICB3aGlsZSAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgY29udGFpbmVyLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJDb250YWluZXI7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ZvbnRzL0JsYWNrT3BzT25lLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9QcmVzc1N0YXJ0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvaG9tZXNjcmVlbi5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbn1cXG5cXG4qIHtcXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sb3I6IGdyZXk7XFxufVxcblxcbi5ob21lSGVhZGVyIHtcXG4gICAgbWFyZ2luOiA0cmVtIDA7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogN3JlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggI2E4YThhOCwgMXB4IDJweCAxcHggI2E4YThhOCwgMXB4IDNweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA0cHggMXB4ICNhOGE4YTgsIDFweCA1cHggMXB4ICNhOGE4YTgsIDFweCA2cHggMXB4ICNhOGE4YTgsXFxuICAgICAgICAxcHggN3B4IDFweCAjYThhOGE4LCAxcHggOHB4IDFweCAjYThhOGE4O1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxufVxcblxcbi5uZXdHYW1lIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgZ3JleTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgbWFyZ2luOiAwIGF1dG8gYXV0byBhdXRvO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC40cmVtO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAycyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQgMC43NXMgc3RlcC1lbmQgaW5maW5pdGU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xODUpO1xcbn1cXG5cXG4ubmV3R2FtZTpob3ZlciB7XFxuICAgIGNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuQGtleWZyYW1lcyB0eXBpbmcge1xcbiAgICBmcm9tIHtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgYmxpbmstY2FyZXQge1xcbiAgICBmcm9tLFxcbiAgICB0byB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3JkZXItY29sb3I6IGdyZXk7XFxuICAgIH1cXG59XFxuXFxudWwge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogNDAlO1xcbiAgICBsZWZ0OiA2NSU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIHVsIHtcXG4gICAgICAgIGxlZnQ6IDc1JTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcXG4gICAgdWwge1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxuXFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogM3JlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIH1cXG59XFxuXFxubGkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHdpZHRoOiA4MHB4O1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMyNjI2MjY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG5saTpudGgtY2hpbGQoZXZlbikge1xcbiAgICBhbmltYXRpb246IGFuaW1hdGVFdmVuIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5saTpudGgtY2hpbGQob2RkKSB7XFxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZU9kZCAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxubGk6bnRoLWNoaWxkKDkpIHtcXG4gICAgYW5pbWF0aW9uOiBub25lO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZUV2ZW4ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlT2RkIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG5saTpudGgtY2hpbGQoMSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xcbn1cXG5saTpudGgtY2hpbGQoMikge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XFxufVxcbmxpOm50aC1jaGlsZCgzKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC44cztcXG59XFxubGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAxLjJzO1xcbn1cXG5saTpudGgtY2hpbGQoNSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuNnM7XFxufVxcbmxpOm50aC1jaGlsZCg2KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XFxufVxcbmxpOm50aC1jaGlsZCg3KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMi40cztcXG59XFxubGk6bnRoLWNoaWxkKDgpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyLjhzO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL2hvbWVzY3JlZW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0JBQXNCO0lBQ3RCLDRDQUEyQztBQUMvQztBQUNBO0lBQ0ksdUJBQXVCO0lBQ3ZCLDRDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQixVQUFVO0lBQ1YsU0FBUztBQUNiOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1oseURBQXdEO0lBQ3hELHNCQUFzQjtJQUN0QiwyQkFBMkI7SUFDM0IsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsV0FBVztBQUNmOztBQUVBO0lBQ0ksY0FBYztJQUNkLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCOztnREFFNEM7QUFDaEQ7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsc0JBQXNCO0lBQ3RCLHdFQUF3RTtJQUN4RSxlQUFlO0lBQ2YsMENBQTBDO0FBQzlDOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJO1FBQ0ksUUFBUTtJQUNaO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7QUFDSjs7QUFFQTtJQUNJOztRQUVJLHlCQUF5QjtJQUM3QjtJQUNBO1FBQ0ksa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLFNBQVM7SUFDVCwyQkFBMkI7SUFDM0IsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJO1FBQ0ksU0FBUztJQUNiO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFNBQVM7SUFDYjs7SUFFQTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksZUFBZTtRQUNmLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksaUJBQWlCO0lBQ3JCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLGlCQUFpQjtJQUNyQjtBQUNKOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksMkNBQTJDO0FBQy9DO0FBQ0E7SUFDSSwwQ0FBMEM7QUFDOUM7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0k7UUFDSSxtQ0FBbUM7UUFDbkMsVUFBVTtRQUNWLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0ksNENBQTRDO1FBQzVDLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksbUNBQW1DO1FBQ25DLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7SUFDQTtRQUNJLDZDQUE2QztRQUM3QyxVQUFVO1FBQ1Ysa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0ksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9CbGFja09wc09uZS50dGZcXFwiKTtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBzcmM6IHVybChcXFwiLi4vYXNzZXRzL2ZvbnRzL1ByZXNzU3RhcnQudHRmXFxcIik7XFxufVxcblxcbioge1xcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuI2NvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9hc3NldHMvaW1hZ2VzL2hvbWVzY3JlZW4uanBnXFxcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sb3I6IGdyZXk7XFxufVxcblxcbi5ob21lSGVhZGVyIHtcXG4gICAgbWFyZ2luOiA0cmVtIDA7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogN3JlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggI2E4YThhOCwgMXB4IDJweCAxcHggI2E4YThhOCwgMXB4IDNweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA0cHggMXB4ICNhOGE4YTgsIDFweCA1cHggMXB4ICNhOGE4YTgsIDFweCA2cHggMXB4ICNhOGE4YTgsXFxuICAgICAgICAxcHggN3B4IDFweCAjYThhOGE4LCAxcHggOHB4IDFweCAjYThhOGE4O1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxufVxcblxcbi5uZXdHYW1lIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgZ3JleTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgbWFyZ2luOiAwIGF1dG8gYXV0byBhdXRvO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC40cmVtO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAycyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQgMC43NXMgc3RlcC1lbmQgaW5maW5pdGU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xODUpO1xcbn1cXG5cXG4ubmV3R2FtZTpob3ZlciB7XFxuICAgIGNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuQGtleWZyYW1lcyB0eXBpbmcge1xcbiAgICBmcm9tIHtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgYmxpbmstY2FyZXQge1xcbiAgICBmcm9tLFxcbiAgICB0byB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3JkZXItY29sb3I6IGdyZXk7XFxuICAgIH1cXG59XFxuXFxudWwge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogNDAlO1xcbiAgICBsZWZ0OiA2NSU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIHVsIHtcXG4gICAgICAgIGxlZnQ6IDc1JTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcXG4gICAgdWwge1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxuXFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogM3JlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIH1cXG59XFxuXFxubGkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHdpZHRoOiA4MHB4O1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMyNjI2MjY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG5saTpudGgtY2hpbGQoZXZlbikge1xcbiAgICBhbmltYXRpb246IGFuaW1hdGVFdmVuIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5saTpudGgtY2hpbGQob2RkKSB7XFxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZU9kZCAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxubGk6bnRoLWNoaWxkKDkpIHtcXG4gICAgYW5pbWF0aW9uOiBub25lO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZUV2ZW4ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlT2RkIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG5saTpudGgtY2hpbGQoMSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xcbn1cXG5saTpudGgtY2hpbGQoMikge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XFxufVxcbmxpOm50aC1jaGlsZCgzKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC44cztcXG59XFxubGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAxLjJzO1xcbn1cXG5saTpudGgtY2hpbGQoNSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuNnM7XFxufVxcbmxpOm50aC1jaGlsZCg2KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XFxufVxcbmxpOm50aC1jaGlsZCg3KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMi40cztcXG59XFxubGk6bnRoLWNoaWxkKDgpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyLjhzO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvbWFwLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5tYXAge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGFuaW1hdGlvbjogdW5ibHVyIDEuNXMgbGluZWFyO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbn1cXG52aWRlbyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG59XFxuXFxuQGtleWZyYW1lcyB1bmJsdXIge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMCk7XFxuICAgIH1cXG59XFxuLnJlZFBpbjEge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiA2MyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMiB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAyNCU7XFxuICAgIGxlZnQ6IDU2JTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcbi5yZWRQaW4zIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODAlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuLmdyZWVuUGluIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDMwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5yZWRQaW4xOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuLnJlZFBpbjI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMzpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvbWFwc2NyZWVuLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixTQUFTO0lBQ1QsT0FBTztJQUNQLFFBQVE7SUFDUix5REFBaUQ7SUFDakQsc0JBQXNCO0lBQ3RCLDJCQUEyQjtJQUMzQiw2QkFBNkI7SUFDN0Isa0JBQWtCO0lBQ2xCLDZCQUE2QjtBQUNqQztBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUiwyQkFBMkI7QUFDL0I7O0FBRUE7SUFDSTtJQUNBO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0FBQ0o7QUFDQTtJQUNJLGVBQWU7SUFDZixRQUFRO0lBQ1IsU0FBUztJQUNULGVBQWU7SUFDZixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsUUFBUTtJQUNSLFNBQVM7SUFDVCxlQUFlO0lBQ2YsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksZUFBZTtJQUNmLFFBQVE7SUFDUixTQUFTO0lBQ1QsZUFBZTtJQUNmLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGVBQWU7SUFDZixRQUFRO0lBQ1IsU0FBUztJQUNULGVBQWU7QUFDbkI7QUFDQTtJQUNJLFVBQVU7QUFDZDtBQUNBO0lBQ0ksVUFBVTtBQUNkO0FBQ0E7SUFDSSxVQUFVO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm1hcCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vYXNzZXRzL2ltYWdlcy9tYXAuanBnXFxcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgYW5pbWF0aW9uOiB1bmJsdXIgMS41cyBsaW5lYXI7XFxuICAgIGZpbHRlcjogYmx1cigxMHB4KTtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxufVxcbnZpZGVvIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHVuYmx1ciB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIGZpbHRlcjogYmx1cigwKTtcXG4gICAgfVxcbn1cXG4ucmVkUGluMSB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDYzJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcbi5yZWRQaW4yIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDI0JTtcXG4gICAgbGVmdDogNTYlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuLnJlZFBpbjMge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4uZ3JlZW5QaW4ge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogMzAlO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLnJlZFBpbjE6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcbi5yZWRQaW4zOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLm5ld0dhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDJyZW07XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHAge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcmVtIHNvbGlkIGdyZXk7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG1hcmdpbjogMCBhdXRvIGF1dG8gYXV0bztcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMnMgc3RlcHMoNDAsIGVuZCksIGJsaW5rLWNhcmV0IDAuNzVzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG4ubmFtZUZvcm0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxcmVtIDFyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBjYXJldC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IDNweCAzcHggNXB4ICNhOGE4YTg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAzcHg7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OmZvY3VzIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OjpwbGFjZWhvbGRlciB7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIGJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBjb2xvcjogcmdiKDcxLCA3MSwgNzEpO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b246aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4jY29udGFpbmVyLmhpZGUge1xcbiAgICBhbmltYXRpb246IGJ1cm4gMS41cyBsaW5lYXI7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJ1cm4ge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5uYW1lRm9ybSBpbnB1dCB7XFxuICAgICAgICB3aWR0aDogODAlO1xcbiAgICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvbmFtZXNjcmVlbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixTQUFTO0FBQ2I7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHNCQUFzQjtJQUN0Qix3RUFBd0U7QUFDNUU7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCx1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixhQUFhO0lBQ2IsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQiwrQkFBK0I7SUFDL0IsbUJBQW1CO0lBQ25CLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGVBQWU7SUFDZixlQUFlO0lBQ2YsWUFBWTtJQUNaLDZCQUE2QjtJQUM3QixzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSTtJQUNBO0lBQ0E7UUFDSSwyQkFBMkI7SUFDL0I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksVUFBVTtJQUNkO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm5ld0dhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDJyZW07XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHAge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcmVtIHNvbGlkIGdyZXk7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG1hcmdpbjogMCBhdXRvIGF1dG8gYXV0bztcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMnMgc3RlcHMoNDAsIGVuZCksIGJsaW5rLWNhcmV0IDAuNzVzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG4ubmFtZUZvcm0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxcmVtIDFyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBjYXJldC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IDNweCAzcHggNXB4ICNhOGE4YTg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAzcHg7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OmZvY3VzIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OjpwbGFjZWhvbGRlciB7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIGJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBjb2xvcjogcmdiKDcxLCA3MSwgNzEpO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b246aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4jY29udGFpbmVyLmhpZGUge1xcbiAgICBhbmltYXRpb246IGJ1cm4gMS41cyBsaW5lYXI7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJ1cm4ge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5uYW1lRm9ybSBpbnB1dCB7XFxuICAgICAgICB3aWR0aDogODAlO1xcbiAgICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob21lc2NyZWVuLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZXNjcmVlbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFwc2NyZWVuLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFwc2NyZWVuLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9uYW1lc2NyZWVuLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbmFtZXNjcmVlbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwua2FtcG9zID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGFscGhhTWFza1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3BhcmFtcy5pc0x1bWluYW5jZT1mYWxzZV0gd2hldGhlciB0byB1c2UgbHVtaW5hbmNlIHdoZW4gcmVhZGluZyBtYXNrIHZhbHVlc1xuICAgICAqIEByZXR1cm5zIHthbHBoYU1hc2tFZmZlY3R9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBhbHBoYU1hc2soKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFscGhhTWFzayAoe1xuICAgICAgaXNMdW1pbmFuY2UgPSBmYWxzZVxuICAgIH0gPSB7fSkge1xuICAgICAgLyoqXG4gICAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBhbHBoYU1hc2tFZmZlY3RcbiAgICAgICAqIEBwcm9wZXJ0eSB7QXJyYXlCdWZmZXJWaWV3fEltYWdlRGF0YXxIVE1MSW1hZ2VFbGVtZW50fEhUTUxDYW52YXNFbGVtZW50fEhUTUxWaWRlb0VsZW1lbnR8SW1hZ2VCaXRtYXB9IG1hc2tcbiAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGlzYWJsZWRcbiAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNMdW1pbmFuY2VcbiAgICAgICAqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gTXVsdGlwbGllcyBgYWxwaGFgIHZhbHVlIHdpdGggdmFsdWVzIHJlYWQgZnJvbSBgbWFza2AgbWVkaWEgc291cmNlLlxuICAgICAgICpcbiAgICAgICAqICBAZXhhbXBsZVxuICAgICAgICogY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgKiBpbWcuc3JjID0gJ3BpY3R1cmUucG5nJztcbiAgICAgICAqIGVmZmVjdC5tYXNrID0gaW1nO1xuICAgICAgICogZWZmZWN0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmVydGV4OiB7XG4gICAgICAgICAgYXR0cmlidXRlOiB7XG4gICAgICAgICAgICBhX2FscGhhTWFza1RleENvb3JkOiAndmVjMidcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1haW46IGBcbiAgICB2X2FscGhhTWFza1RleENvb3JkID0gYV9hbHBoYU1hc2tUZXhDb29yZDtgXG4gICAgICAgIH0sXG4gICAgICAgIGZyYWdtZW50OiB7XG4gICAgICAgICAgdW5pZm9ybToge1xuICAgICAgICAgICAgdV9hbHBoYU1hc2tFbmFibGVkOiAnYm9vbCcsXG4gICAgICAgICAgICB1X2FscGhhTWFza0lzTHVtaW5hbmNlOiAnYm9vbCcsXG4gICAgICAgICAgICB1X21hc2s6ICdzYW1wbGVyMkQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtYWluOiBgXG4gICAgaWYgKHVfYWxwaGFNYXNrRW5hYmxlZCkge1xuICAgICAgICB2ZWM0IGFscGhhTWFza1BpeGVsID0gdGV4dHVyZTJEKHVfbWFzaywgdl9hbHBoYU1hc2tUZXhDb29yZCk7XG5cbiAgICAgICAgaWYgKHVfYWxwaGFNYXNrSXNMdW1pbmFuY2UpIHtcbiAgICAgICAgICAgIGFscGhhICo9IGRvdChsdW1jb2VmZiwgYWxwaGFNYXNrUGl4ZWwucmdiKSAqIGFscGhhTWFza1BpeGVsLmE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbHBoYSAqPSBhbHBoYU1hc2tQaXhlbC5hO1xuICAgICAgICB9XG4gICAgfWBcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgICAgcmV0dXJuICF0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGRpc2FibGVkKGIpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMF0gPSArIWI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IG1hc2soKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZXNbMF0uZGF0YTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgbWFzayhpbWcpIHtcbiAgICAgICAgICB0aGlzLnRleHR1cmVzWzBdLmRhdGEgPSBpbWc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGlzTHVtaW5hbmNlKCkge1xuICAgICAgICAgIHJldHVybiAhIXRoaXMudW5pZm9ybXNbMl0uZGF0YVswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgaXNMdW1pbmFuY2UodG9nZ2xlKSB7XG4gICAgICAgICAgdGhpcy51bmlmb3Jtc1syXS5kYXRhWzBdID0gK3RvZ2dsZTtcbiAgICAgICAgICB0aGlzLnRleHR1cmVzWzBdLmZvcm1hdCA9IHRvZ2dsZSA/ICdSR0JBJyA6ICdBTFBIQSc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFyeWluZzoge1xuICAgICAgICAgIHZfYWxwaGFNYXNrVGV4Q29vcmQ6ICd2ZWMyJ1xuICAgICAgICB9LFxuICAgICAgICB1bmlmb3JtczogW3tcbiAgICAgICAgICBuYW1lOiAndV9hbHBoYU1hc2tFbmFibGVkJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9tYXNrJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9hbHBoYU1hc2tJc0x1bWluYW5jZScsXG4gICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgIGRhdGE6IFsrISFpc0x1bWluYW5jZV1cbiAgICAgICAgfV0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IFt7XG4gICAgICAgICAgbmFtZTogJ2FfYWxwaGFNYXNrVGV4Q29vcmQnLFxuICAgICAgICAgIGV4dGVuZHM6ICdhX3RleENvb3JkJ1xuICAgICAgICB9XSxcbiAgICAgICAgdGV4dHVyZXM6IFt7XG4gICAgICAgICAgZm9ybWF0OiBpc0x1bWluYW5jZSA/ICdSR0JBJyA6ICdBTFBIQSdcbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgTU9ERVNfQVVYID0ge1xuICAgICAgYmxlbmRfbHVtaW5vc2l0eTogYGZsb2F0IGJsZW5kX2x1bWlub3NpdHkgKHZlYzMgYykge1xuICAgIHJldHVybiBkb3QoYywgYmxlbmRMdW0pO1xufWAsXG4gICAgICBibGVuZF9zYXR1cmF0aW9uOiBgZmxvYXQgYmxlbmRfc2F0dXJhdGlvbiAodmVjMyBjKSB7XG4gICAgcmV0dXJuIG1heChtYXgoYy5yLCBjLmcpLCBjLmIpIC0gbWluKG1pbihjLnIsIGMuZyksIGMuYik7XG59YCxcbiAgICAgIGJsZW5kX3NldF9sdW1pbm9zaXR5OiBgdmVjMyBibGVuZF9jbGlwX2NvbG9yICh2ZWMzIGMpIHtcbiAgICBmbG9hdCBsID0gYmxlbmRfbHVtaW5vc2l0eShjKTtcbiAgICBmbG9hdCBjTWluID0gbWluKG1pbihjLnIsIGMuZyksIGMuYik7XG4gICAgZmxvYXQgY01heCA9IG1heChtYXgoYy5yLCBjLmcpLCBjLmIpO1xuXG4gICAgaWYgKGNNaW4gPCAwLjApXG4gICAgICAgIHJldHVybiBsICsgKCgoYyAtIGwpICogbCkgLyAobCAtIGNNaW4pKTtcbiAgICBpZiAoY01heCA+IDEuMClcbiAgICAgICAgcmV0dXJuIGwgKyAoKChjIC0gbCkgKiAoMS4wIC0gbCkpIC8gKGNNYXggLSBsKSk7XG5cbiAgICByZXR1cm4gYztcbn1cblxudmVjMyBibGVuZF9zZXRfbHVtaW5vc2l0eSAodmVjMyBjLCBmbG9hdCBsKSB7XG4gICAgdmVjMyBkZWx0YSA9IHZlYzMobCAtIGJsZW5kX2x1bWlub3NpdHkoYykpO1xuXG4gICAgcmV0dXJuIGJsZW5kX2NsaXBfY29sb3IodmVjMyhjLnJnYiArIGRlbHRhLnJnYikpO1xufWAsXG4gICAgICBibGVuZF9zZXRfc2F0dXJhdGlvbjogYFxuZmxvYXQgZ2V0QmxlbmRNaWQgKHZlYzMgYykge1xuICAgIGZsb2F0IGJpZ2dlciA9IG1heChjLnIsIGMuZyk7XG5cbiAgICBpZiAoYmlnZ2VyIDwgYy5iKSB7XG4gICAgICAgIHJldHVybiBiaWdnZXI7XG4gICAgfVxuXG4gICAgZmxvYXQgc21hbGxlciA9IG1pbihjLnIsIGMuZyk7XG5cbiAgICBpZiAoYy5iIDwgc21hbGxlcikge1xuICAgICAgICByZXR1cm4gc21hbGxlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gYy5iO1xufVxuXG52ZWMzIGJsZW5kX3NldF9zYXR1cmF0aW9uICh2ZWMzIGMsIGZsb2F0IHMpIHtcbiAgICBpZiAocyA9PSAwLjApIHJldHVybiB2ZWMzKDAuMCk7XG5cbiAgICBmbG9hdCBjTWF4ID0gbWF4KG1heChjLnIsIGMuZyksIGMuYik7XG4gICAgZmxvYXQgY01pZCA9IGdldEJsZW5kTWlkKGMpO1xuICAgIGZsb2F0IGNNaW4gPSBtaW4obWluKGMuciwgYy5nKSwgYy5iKTtcbiAgICBmbG9hdCByLCBnLCBiO1xuXG4gICAgY01pZCA9ICgoKGNNaWQgLSBjTWluKSAqIHMpIC8gKGNNYXggLSBjTWluKSk7XG4gICAgY01heCA9IHM7XG4gICAgY01pbiA9IDAuMDtcblxuICAgIGlmIChjLnIgPiBjLmcpIHtcbiAgICAgICAgLy8gciA+IGdcbiAgICAgICAgaWYgKGMuYiA+IGMucikge1xuICAgICAgICAgICAgLy8gZyA8IHIgPCBiXG4gICAgICAgICAgICBnID0gY01pbjtcbiAgICAgICAgICAgIHIgPSBjTWlkO1xuICAgICAgICAgICAgYiA9IGNNYXg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYy5nID4gYy5iKSB7XG4gICAgICAgICAgICAvLyBiIDwgZyA8IHJcbiAgICAgICAgICAgIGIgPSBjTWluO1xuICAgICAgICAgICAgZyA9IGNNaWQ7XG4gICAgICAgICAgICByID0gY01heDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGcgPCBiIDwgclxuICAgICAgICAgICAgZyA9IGNNaW47XG4gICAgICAgICAgICBiID0gY01pZDtcbiAgICAgICAgICAgIHIgPSBjTWF4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGcgPiByXG4gICAgZWxzZSBpZiAoYy5nID4gYy5iKSB7XG4gICAgICAgIC8vIGcgPiBiXG4gICAgICAgIGlmIChjLmIgPiBjLnIpIHtcbiAgICAgICAgICAgIC8vIHIgPCBiIDwgZ1xuICAgICAgICAgICAgciA9IGNNaW47XG4gICAgICAgICAgICBiID0gY01pZDtcbiAgICAgICAgICAgIGcgPSBjTWF4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gYiA8IHIgPCBnXG4gICAgICAgICAgICBiID0gY01pbjtcbiAgICAgICAgICAgIHIgPSBjTWlkO1xuICAgICAgICAgICAgZyA9IGNNYXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHIgPCBnIDwgYlxuICAgICAgICByID0gY01pbjtcbiAgICAgICAgZyA9IGNNaWQ7XG4gICAgICAgIGIgPSBjTWF4O1xuICAgIH1cblxuICAgIHJldHVybiB2ZWMzKHIsIGcsIGIpO1xufWBcbiAgICB9O1xuICAgIGNvbnN0IE1PREVTX0NPTlNUQU5UID0ge1xuICAgICAgbm9ybWFsOiAnJyxcbiAgICAgIG11bHRpcGx5OiAnJyxcbiAgICAgIHNjcmVlbjogJycsXG4gICAgICBvdmVybGF5OiBgZmxvYXQgYmxlbmRfb3ZlcmxheSAoZmxvYXQgYiwgZmxvYXQgYykge1xuICAgIGlmIChiIDw9IDAuNSlcbiAgICAgICAgcmV0dXJuIDIuMCAqIGIgKiBjO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIDEuMCAtIDIuMCAqICgoMS4wIC0gYikgKiAoMS4wIC0gYykpO1xufWAsXG4gICAgICBkYXJrZW46ICcnLFxuICAgICAgbGlnaHRlbjogJycsXG4gICAgICBjb2xvckRvZGdlOiBgZmxvYXQgYmxlbmRfY29sb3JEb2RnZSAoZmxvYXQgYiwgZmxvYXQgYykge1xuICAgIGlmIChiID09IDAuMClcbiAgICAgICAgcmV0dXJuIDAuMDtcbiAgICBlbHNlIGlmIChjID09IDEuMClcbiAgICAgICAgcmV0dXJuIDEuMDtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBtaW4oMS4wLCBiIC8gKDEuMCAtIGMpKTtcbn1gLFxuICAgICAgY29sb3JCdXJuOiBgZmxvYXQgYmxlbmRfY29sb3JCdXJuIChmbG9hdCBiLCBmbG9hdCBjKSB7XG4gICAgaWYgKGIgPT0gMS4wKSB7XG4gICAgICAgIHJldHVybiAxLjA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGMgPT0gMC4wKSB7XG4gICAgICAgIHJldHVybiAwLjA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gMS4wIC0gbWluKDEuMCwgKDEuMCAtIGIpIC8gYyk7XG4gICAgfVxufWAsXG4gICAgICBoYXJkTGlnaHQ6IGBmbG9hdCBibGVuZF9oYXJkTGlnaHQgKGZsb2F0IGIsIGZsb2F0IGMpIHtcbiAgICBpZiAoYyA8PSAwLjUpIHtcbiAgICAgICAgcmV0dXJuIDIuMCAqIGIgKiBjO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDEuMCAtIDIuMCAqICgoMS4wIC0gYikgKiAoMS4wIC0gYykpO1xuICAgIH1cbn1gLFxuICAgICAgc29mdExpZ2h0OiBgZmxvYXQgYmxlbmRfc29mdExpZ2h0IChmbG9hdCBiLCBmbG9hdCBjKSB7XG4gICAgaWYgKGMgPD0gMC41KSB7XG4gICAgICAgIHJldHVybiBiIC0gKDEuMCAtIDIuMCAqIGMpICogYiAqICgxLjAgLSBiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZsb2F0IGQ7XG5cbiAgICAgICAgaWYgKGIgPD0gMC4yNSkge1xuICAgICAgICAgICAgZCA9ICgoMTYuMCAqIGIgLSAxMi4wKSAqIGIgKyA0LjApICogYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGQgPSBzcXJ0KGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGIgKyAoMi4wICogYyAtIDEuMCkgKiAoZCAtIGIpO1xuICAgIH1cbn1gLFxuICAgICAgZGlmZmVyZW5jZTogYGZsb2F0IGJsZW5kX2RpZmZlcmVuY2UgKGZsb2F0IGIsIGZsb2F0IGMpIHtcbiAgICByZXR1cm4gYWJzKGIgLSBjKTtcbn1gLFxuICAgICAgZXhjbHVzaW9uOiBgZmxvYXQgYmxlbmRfZXhjbHVzaW9uIChmbG9hdCBiLCBmbG9hdCBjKSB7XG4gICAgcmV0dXJuIGIgKyBjIC0gMi4wICogYiAqIGM7XG59YCxcbiAgICAgIGh1ZTogYCR7TU9ERVNfQVVYLmJsZW5kX2x1bWlub3NpdHl9XG4ke01PREVTX0FVWC5ibGVuZF9zYXR1cmF0aW9ufVxuJHtNT0RFU19BVVguYmxlbmRfc2V0X3NhdHVyYXRpb259XG4ke01PREVTX0FVWC5ibGVuZF9zZXRfbHVtaW5vc2l0eX1gLFxuICAgICAgc2F0dXJhdGlvbjogYCR7TU9ERVNfQVVYLmJsZW5kX2x1bWlub3NpdHl9XG4ke01PREVTX0FVWC5ibGVuZF9zYXR1cmF0aW9ufVxuJHtNT0RFU19BVVguYmxlbmRfc2V0X3NhdHVyYXRpb259XG4ke01PREVTX0FVWC5ibGVuZF9zZXRfbHVtaW5vc2l0eX1gLFxuICAgICAgY29sb3I6IGAke01PREVTX0FVWC5ibGVuZF9sdW1pbm9zaXR5fVxuJHtNT0RFU19BVVguYmxlbmRfc2V0X2x1bWlub3NpdHl9YCxcbiAgICAgIGx1bWlub3NpdHk6IGAke01PREVTX0FVWC5ibGVuZF9sdW1pbm9zaXR5fVxuJHtNT0RFU19BVVguYmxlbmRfc2V0X2x1bWlub3NpdHl9YFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUJsZW5kVmVjdG9yKG5hbWUpIHtcbiAgICAgIHJldHVybiBgdmVjMygke25hbWV9KGJhY2tkcm9wLnIsIHNvdXJjZS5yKSwgJHtuYW1lfShiYWNrZHJvcC5nLCBzb3VyY2UuZyksICR7bmFtZX0oYmFja2Ryb3AuYiwgc291cmNlLmIpKWA7XG4gICAgfVxuXG4gICAgY29uc3QgTU9ERVNfTUFJTiA9IHtcbiAgICAgIG5vcm1hbDogJ3NvdXJjZScsXG4gICAgICBtdWx0aXBseTogJ3NvdXJjZSAqIGJhY2tkcm9wJyxcbiAgICAgIHNjcmVlbjogJ2JhY2tkcm9wICsgc291cmNlIC0gYmFja2Ryb3AgKiBzb3VyY2UnLFxuICAgICAgb3ZlcmxheTogZ2VuZXJhdGVCbGVuZFZlY3RvcignYmxlbmRfb3ZlcmxheScpLFxuICAgICAgZGFya2VuOiBnZW5lcmF0ZUJsZW5kVmVjdG9yKCdtaW4nKSxcbiAgICAgIGxpZ2h0ZW46IGdlbmVyYXRlQmxlbmRWZWN0b3IoJ21heCcpLFxuICAgICAgY29sb3JEb2RnZTogZ2VuZXJhdGVCbGVuZFZlY3RvcignYmxlbmRfY29sb3JEb2RnZScpLFxuICAgICAgY29sb3JCdXJuOiBnZW5lcmF0ZUJsZW5kVmVjdG9yKCdibGVuZF9jb2xvckJ1cm4nKSxcbiAgICAgIGhhcmRMaWdodDogZ2VuZXJhdGVCbGVuZFZlY3RvcignYmxlbmRfaGFyZExpZ2h0JyksXG4gICAgICBzb2Z0TGlnaHQ6IGdlbmVyYXRlQmxlbmRWZWN0b3IoJ2JsZW5kX3NvZnRMaWdodCcpLFxuICAgICAgZGlmZmVyZW5jZTogZ2VuZXJhdGVCbGVuZFZlY3RvcignYmxlbmRfZGlmZmVyZW5jZScpLFxuICAgICAgZXhjbHVzaW9uOiBnZW5lcmF0ZUJsZW5kVmVjdG9yKCdibGVuZF9leGNsdXNpb24nKSxcbiAgICAgIGh1ZTogJ2JsZW5kX3NldF9sdW1pbm9zaXR5KGJsZW5kX3NldF9zYXR1cmF0aW9uKHNvdXJjZSwgYmxlbmRfc2F0dXJhdGlvbihiYWNrZHJvcCkpLCBibGVuZF9sdW1pbm9zaXR5KGJhY2tkcm9wKSknLFxuICAgICAgc2F0dXJhdGlvbjogJ2JsZW5kX3NldF9sdW1pbm9zaXR5KGJsZW5kX3NldF9zYXR1cmF0aW9uKGJhY2tkcm9wLCBibGVuZF9zYXR1cmF0aW9uKHNvdXJjZSkpLCBibGVuZF9sdW1pbm9zaXR5KGJhY2tkcm9wKSknLFxuICAgICAgY29sb3I6ICdibGVuZF9zZXRfbHVtaW5vc2l0eShzb3VyY2UsIGJsZW5kX2x1bWlub3NpdHkoYmFja2Ryb3ApKScsXG4gICAgICBsdW1pbm9zaXR5OiAnYmxlbmRfc2V0X2x1bWlub3NpdHkoYmFja2Ryb3AsIGJsZW5kX2x1bWlub3NpdHkoc291cmNlKSknXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gYmxlbmRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAgICAgKiBAcGFyYW0geydub3JtYWwnfCdtdWx0aXBseSd8J3NjcmVlbid8J292ZXJsYXknfCdkYXJrZW4nfCdsaWdodGVuJ3wnY29sb3ItZG9kZ2UnfCdjb2xvci1idXJuJ3wnaGFyZC1saWdodCd8J3NvZnQtbGlnaHQnfCdkaWZmZXJlbmNlJ3wnZXhjbHVzaW9uJ3wnaHVlJ3wnc2F0dXJhdGlvbid8J2NvbG9yJ3wnbHVtaW5vc2l0eSd9IFtwYXJhbXMubW9kZT0nbm9ybWFsJ10gYmxlbmQgbW9kZSB0byB1c2VcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBbcGFyYW1zLmNvbG9yPVswLCAwLCAwLCAxXV0gSW5pdGlhbCBjb2xvciB0byB1c2Ugd2hlbiBibGVuZGluZyB0byBhIHNvbGlkIGNvbG9yXG4gICAgICogQHJldHVybnMge2JsZW5kRWZmZWN0fVxuICAgICAqIEBleGFtcGxlIGJsZW5kKCdjb2xvckJ1cm4nKVxuICAgICAqL1xuXG4gICAgZnVuY3Rpb24gYmxlbmQgKHtcbiAgICAgIG1vZGUgPSAnbm9ybWFsJyxcbiAgICAgIGNvbG9yID0gWzAuMCwgMC4wLCAwLjAsIDEuMF1cbiAgICB9ID0ge30pIHtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGVkZWYge09iamVjdH0gYmxlbmRFZmZlY3RcbiAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyW119IGNvbG9yIGJhY2tkcm9wIHNvbGlkIGNvbG9yIGFzIEFycmF5IG9mIDQgbnVtYmVycywgbm9ybWFsaXplZCAoMC4wIC0gMS4wKVxuICAgICAgICogQHByb3BlcnR5IHtBcnJheUJ1ZmZlclZpZXd8SW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SFRNTENhbnZhc0VsZW1lbnR8SFRNTFZpZGVvRWxlbWVudHxJbWFnZUJpdG1hcH0gaW1hZ2UgdG8gdXNlIGFzIGJhY2tkcm9wXG4gICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRpc2FibGVkXG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICogaW1nLnNyYyA9ICdwaWN0dXJlLnBuZyc7XG4gICAgICAgKiBlZmZlY3QuY29sb3IgPSBbMC4zLCAwLjU1LCAwLjgsIDEuMF07XG4gICAgICAgKiBlZmZlY3QuaW1hZ2UgPSBpbWc7XG4gICAgICAgKi9cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZlcnRleDoge1xuICAgICAgICAgIGF0dHJpYnV0ZToge1xuICAgICAgICAgICAgYV9ibGVuZEltYWdlVGV4Q29vcmQ6ICd2ZWMyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFpbjogYFxuICAgIHZfYmxlbmRJbWFnZVRleENvb3JkID0gYV9ibGVuZEltYWdlVGV4Q29vcmQ7YFxuICAgICAgICB9LFxuICAgICAgICBmcmFnbWVudDoge1xuICAgICAgICAgIHVuaWZvcm06IHtcbiAgICAgICAgICAgIHVfYmxlbmRFbmFibGVkOiAnYm9vbCcsXG4gICAgICAgICAgICB1X2JsZW5kQ29sb3JFbmFibGVkOiAnYm9vbCcsXG4gICAgICAgICAgICB1X2JsZW5kSW1hZ2VFbmFibGVkOiAnYm9vbCcsXG4gICAgICAgICAgICB1X2JsZW5kQ29sb3I6ICd2ZWM0JyxcbiAgICAgICAgICAgIHVfYmxlbmRJbWFnZTogJ3NhbXBsZXIyRCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnN0YW50OiBgY29uc3QgdmVjMyBibGVuZEx1bSA9IHZlYzMoMC4zLCAwLjU5LCAwLjExKTtcbiR7TU9ERVNfQ09OU1RBTlRbbW9kZV19YCxcbiAgICAgICAgICBtYWluOiBgXG4gICAgaWYgKHVfYmxlbmRFbmFibGVkKSB7XG4gICAgICAgIHZlYzMgYmFja2Ryb3AgPSB2ZWMzKDAuMCk7XG4gICAgICAgIGZsb2F0IGJhY2tkcm9wQWxwaGEgPSAxLjA7XG5cbiAgICAgICAgaWYgKHVfYmxlbmRDb2xvckVuYWJsZWQpIHtcbiAgICAgICAgICAgIGJhY2tkcm9wID0gdV9ibGVuZENvbG9yLnJnYjtcbiAgICAgICAgICAgIGJhY2tkcm9wQWxwaGEgPSB1X2JsZW5kQ29sb3IuYTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodV9ibGVuZEltYWdlRW5hYmxlZCkge1xuICAgICAgICAgICAgdmVjNCBibGVuZEJhY2tkcm9wUGl4ZWwgPSB0ZXh0dXJlMkQodV9ibGVuZEltYWdlLCB2X2JsZW5kSW1hZ2VUZXhDb29yZCk7XG4gICAgICAgICAgICBpZiAodV9ibGVuZENvbG9yRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHZlYzMgc291cmNlID0gYmxlbmRCYWNrZHJvcFBpeGVsLnJnYjtcbiAgICAgICAgICAgICAgICBmbG9hdCBzb3VyY2VBbHBoYSA9IGJsZW5kQmFja2Ryb3BQaXhlbC5hO1xuICAgICAgICAgICAgICAgIGJhY2tkcm9wID0gKDEuMCAtIGJhY2tkcm9wQWxwaGEpICogc291cmNlICsgYmFja2Ryb3BBbHBoYSAqIGNsYW1wKCR7TU9ERVNfTUFJTlttb2RlXX0sIDAuMCwgMS4wKTtcbiAgICAgICAgICAgICAgICBiYWNrZHJvcEFscGhhID0gc291cmNlQWxwaGEgKyBiYWNrZHJvcEFscGhhICogKDEuMCAtIHNvdXJjZUFscGhhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhY2tkcm9wID0gYmxlbmRCYWNrZHJvcFBpeGVsLnJnYjtcbiAgICAgICAgICAgICAgICBiYWNrZHJvcEFscGhhID0gYmxlbmRCYWNrZHJvcFBpeGVsLmE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmVjMyBzb3VyY2UgPSB2ZWMzKGNvbG9yLnJnYik7XG4gICAgICAgIGNvbG9yID0gKDEuMCAtIGJhY2tkcm9wQWxwaGEpICogc291cmNlICsgYmFja2Ryb3BBbHBoYSAqIGNsYW1wKCR7TU9ERVNfTUFJTlttb2RlXX0sIDAuMCwgMS4wKTtcbiAgICAgICAgYWxwaGEgPSBhbHBoYSArIGJhY2tkcm9wQWxwaGEgKiAoMS4wIC0gYWxwaGEpO1xuICAgIH1gXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGNvbG9yKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zWzFdLmRhdGEuc2xpY2UoMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGNvbG9yKGwpIHtcbiAgICAgICAgICBpZiAoIWwgfHwgIWwubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zWzJdLmRhdGFbMF0gPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zWzJdLmRhdGFbMF0gPSAxO1xuICAgICAgICAgICAgbC5mb3JFYWNoKChjLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghTnVtYmVyLmlzTmFOKGMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmlmb3Jtc1sxXS5kYXRhW2ldID0gYztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBpbWFnZSgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlc1swXS5kYXRhO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBpbWFnZShpbWcpIHtcbiAgICAgICAgICBpZiAoaW1nKSB7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zWzRdLmRhdGFbMF0gPSAxO1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlc1swXS5kYXRhID0gaW1nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zWzRdLmRhdGFbMF0gPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgICAgcmV0dXJuICF0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGRpc2FibGVkKGIpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMF0gPSArIWI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFyeWluZzoge1xuICAgICAgICAgIHZfYmxlbmRJbWFnZVRleENvb3JkOiAndmVjMidcbiAgICAgICAgfSxcbiAgICAgICAgdW5pZm9ybXM6IFt7XG4gICAgICAgICAgbmFtZTogJ3VfYmxlbmRFbmFibGVkJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9ibGVuZENvbG9yJyxcbiAgICAgICAgICB0eXBlOiAnZicsXG4gICAgICAgICAgZGF0YTogY29sb3JcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICd1X2JsZW5kQ29sb3JFbmFibGVkJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9ibGVuZEltYWdlJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9ibGVuZEltYWdlRW5hYmxlZCcsXG4gICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgIGRhdGE6IFswXVxuICAgICAgICB9XSxcbiAgICAgICAgYXR0cmlidXRlczogW3tcbiAgICAgICAgICBuYW1lOiAnYV9ibGVuZEltYWdlVGV4Q29vcmQnLFxuICAgICAgICAgIGV4dGVuZHM6ICdhX3RleENvb3JkJ1xuICAgICAgICB9XSxcbiAgICAgICAgdGV4dHVyZXM6IFt7XG4gICAgICAgICAgZm9ybWF0OiAnUkdCQSdcbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGJyaWdodG5lc3NDb250cmFzdFxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBicmlnaHRuZXNzXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbnRyYXN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuYnJpZ2h0bmVzcz0xLjBdIGluaXRpYWwgYnJpZ2h0bmVzcyB0byB1c2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMuY29udHJhc3Q9MS4wXSBpbml0aWFsIGNvbnRyYXN0IHRvIHVzZS5cbiAgICAgKiBAcmV0dXJucyB7YnJpZ2h0bmVzc0NvbnRyYXN0RWZmZWN0fVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYnJpZ2h0bmVzc0NvbnRyYXN0KHticmlnaHRuZXNzOiAxLjUsIGNvbnRyYXN0OiAwLjh9KVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGJyaWdodG5lc3NDb250cmFzdCAoe1xuICAgICAgYnJpZ2h0bmVzcyA9IDEuMCxcbiAgICAgIGNvbnRyYXN0ID0gMS4wXG4gICAgfSA9IHt9KSB7XG4gICAgICAvKipcbiAgICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IGJyaWdodG5lc3NDb250cmFzdEVmZmVjdFxuICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJyaWdodG5lc3NcbiAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb250cmFzdFxuICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBicmlnaHRuZXNzRGlzYWJsZWRcbiAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gY29udHJhc3REaXNhYmxlZFxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiBlZmZlY3QuYnJpZ2h0bmVzcyA9IDEuNTtcbiAgICAgICAqIGVmZmVjdC5jb250cmFzdCA9IDAuOTtcbiAgICAgICAqIGVmZmVjdC5jb250cmFzdERpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZnJhZ21lbnQ6IHtcbiAgICAgICAgICB1bmlmb3JtOiB7XG4gICAgICAgICAgICB1X2JyRW5hYmxlZDogJ2Jvb2wnLFxuICAgICAgICAgICAgdV9jdEVuYWJsZWQ6ICdib29sJyxcbiAgICAgICAgICAgIHVfY29udHJhc3Q6ICdmbG9hdCcsXG4gICAgICAgICAgICB1X2JyaWdodG5lc3M6ICdmbG9hdCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnN0YW50OiAnY29uc3QgdmVjMyBoYWxmMyA9IHZlYzMoMC41KTsnLFxuICAgICAgICAgIG1haW46IGBcbiAgICBpZiAodV9ickVuYWJsZWQpIHtcbiAgICAgICAgY29sb3IgKj0gdV9icmlnaHRuZXNzO1xuICAgIH1cblxuICAgIGlmICh1X2N0RW5hYmxlZCkge1xuICAgICAgICBjb2xvciA9IChjb2xvciAtIGhhbGYzKSAqIHVfY29udHJhc3QgKyBoYWxmMztcbiAgICB9XG5cbiAgICBjb2xvciA9IGNsYW1wKGNvbG9yLCAwLjAsIDEuMCk7YFxuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBicmlnaHRuZXNzKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zWzJdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGJyaWdodG5lc3ModmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzJdLmRhdGFbMF0gPSBwYXJzZUZsb2F0KE1hdGgubWF4KDAsIHZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGNvbnRyYXN0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zWzNdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGNvbnRyYXN0KHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51bmlmb3Jtc1szXS5kYXRhWzBdID0gcGFyc2VGbG9hdChNYXRoLm1heCgwLCB2YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBicmlnaHRuZXNzRGlzYWJsZWQoKSB7XG4gICAgICAgICAgcmV0dXJuICF0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGJyaWdodG5lc3NEaXNhYmxlZCh0b2dnbGUpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMF0gPSArIXRvZ2dsZTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgY29udHJhc3REaXNhYmxlZCgpIHtcbiAgICAgICAgICByZXR1cm4gIXRoaXMudW5pZm9ybXNbMV0uZGF0YVswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgY29udHJhc3REaXNhYmxlZCh0b2dnbGUpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzFdLmRhdGFbMF0gPSArIXRvZ2dsZTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bmlmb3JtczogW3tcbiAgICAgICAgICBuYW1lOiAndV9ickVuYWJsZWQnLFxuICAgICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgICBkYXRhOiBbMV1cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICd1X2N0RW5hYmxlZCcsXG4gICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgIGRhdGE6IFsxXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3VfYnJpZ2h0bmVzcycsXG4gICAgICAgICAgdHlwZTogJ2YnLFxuICAgICAgICAgIGRhdGE6IFticmlnaHRuZXNzXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3VfY29udHJhc3QnLFxuICAgICAgICAgIHR5cGU6ICdmJyxcbiAgICAgICAgICBkYXRhOiBbY29udHJhc3RdXG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvbiBodWVTYXR1cmF0aW9uXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGh1ZSByb3RhdGlvbiBpbiBkZWdyZWVzXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNhdHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3BhcmFtcy5odWU9MC4wXSBpbml0aWFsIGh1ZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLnNhdHVyYXRpb249MS4wXSBpbml0aWFsIHNhdHVyYXRpb24gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7aHVlU2F0dXJhdGlvbkVmZmVjdH1cbiAgICAgKiBAZXhhbXBsZSBodWVTYXR1cmF0aW9uKHtodWU6IDQ1LCBzYXR1cmF0aW9uOiAxLjN9KVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGh1ZVNhdHVyYXRpb24gKHtcbiAgICAgIGh1ZSA9IDAuMCxcbiAgICAgIHNhdHVyYXRpb24gPSAxLjBcbiAgICB9ID0ge30pIHtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGVkZWYge09iamVjdH0gaHVlU2F0dXJhdGlvbkVmZmVjdFxuICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGh1ZVxuICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNhdHVyYXRpb25cbiAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaHVlRGlzYWJsZWRcbiAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2F0dXJhdGlvbkRpc2FibGVkXG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIGVmZmVjdC5odWUgPSA0NTtcbiAgICAgICAqIGVmZmVjdC5zYXR1cmF0aW9uID0gMC44O1xuICAgICAgICovXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2ZXJ0ZXg6IHtcbiAgICAgICAgICB1bmlmb3JtOiB7XG4gICAgICAgICAgICB1X2h1ZTogJ2Zsb2F0JyxcbiAgICAgICAgICAgIHVfc2F0dXJhdGlvbjogJ2Zsb2F0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gZm9yIGltcGxlbWVudGF0aW9uIHNlZTogaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZpbHRlcnMuaHRtbCNmZUNvbG9yTWF0cml4RWxlbWVudFxuICAgICAgICAgIGNvbnN0YW50OiBgXG5jb25zdCBtYXQzIGx1bW1hdCA9IG1hdDMoXG4gICAgbHVtY29lZmYsXG4gICAgbHVtY29lZmYsXG4gICAgbHVtY29lZmZcbik7XG5jb25zdCBtYXQzIGNvc21hdCA9IG1hdDMoXG4gICAgdmVjMygwLjc4NywgLTAuNzE1LCAtMC4wNzIpLFxuICAgIHZlYzMoLTAuMjEzLCAwLjI4NSwgLTAuMDcyKSxcbiAgICB2ZWMzKC0wLjIxMywgLTAuNzE1LCAwLjkyOClcbik7XG5jb25zdCBtYXQzIHNpbm1hdCA9IG1hdDMoXG4gICAgdmVjMygtMC4yMTMsIC0wLjcxNSwgMC45MjgpLFxuICAgIHZlYzMoMC4xNDMsIDAuMTQwLCAtMC4yODMpLFxuICAgIHZlYzMoLTAuNzg3LCAwLjcxNSwgMC4wNzIpXG4pO1xuY29uc3QgbWF0MyBzYXRtYXQgPSBtYXQzKFxuICAgIHZlYzMoMC43ODcsIC0wLjcxNSwgLTAuMDcyKSxcbiAgICB2ZWMzKC0wLjIxMywgMC4yODUsIC0wLjA3MiksXG4gICAgdmVjMygtMC4yMTMsIC0wLjcxNSwgMC45MjgpXG4pO2AsXG4gICAgICAgICAgbWFpbjogYFxuICAgIGZsb2F0IGFuZ2xlID0gKHVfaHVlIC8gMTgwLjApICogMy4xNDE1OTI2NTM1ODk3OTMyMzg0NjI2NDtcbiAgICB2X2h1ZVJvdGF0aW9uID0gbHVtbWF0ICsgY29zKGFuZ2xlKSAqIGNvc21hdCArIHNpbihhbmdsZSkgKiBzaW5tYXQ7XG4gICAgdl9zYXR1cmF0aW9uID0gbHVtbWF0ICsgc2F0bWF0ICogdV9zYXR1cmF0aW9uO2BcbiAgICAgICAgfSxcbiAgICAgICAgZnJhZ21lbnQ6IHtcbiAgICAgICAgICB1bmlmb3JtOiB7XG4gICAgICAgICAgICB1X2h1ZUVuYWJsZWQ6ICdib29sJyxcbiAgICAgICAgICAgIHVfc2F0RW5hYmxlZDogJ2Jvb2wnLFxuICAgICAgICAgICAgdV9odWU6ICdmbG9hdCcsXG4gICAgICAgICAgICB1X3NhdHVyYXRpb246ICdmbG9hdCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1haW46IGBcbiAgICBpZiAodV9odWVFbmFibGVkKSB7XG4gICAgICAgIGNvbG9yID0gdmVjMyhcbiAgICAgICAgICAgIGRvdChjb2xvciwgdl9odWVSb3RhdGlvblswXSksXG4gICAgICAgICAgICBkb3QoY29sb3IsIHZfaHVlUm90YXRpb25bMV0pLFxuICAgICAgICAgICAgZG90KGNvbG9yLCB2X2h1ZVJvdGF0aW9uWzJdKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGlmICh1X3NhdEVuYWJsZWQpIHtcbiAgICAgICAgY29sb3IgPSB2ZWMzKFxuICAgICAgICAgICAgZG90KGNvbG9yLCB2X3NhdHVyYXRpb25bMF0pLFxuICAgICAgICAgICAgZG90KGNvbG9yLCB2X3NhdHVyYXRpb25bMV0pLFxuICAgICAgICAgICAgZG90KGNvbG9yLCB2X3NhdHVyYXRpb25bMl0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29sb3IgPSBjbGFtcChjb2xvciwgMC4wLCAxLjApO2BcbiAgICAgICAgfSxcbiAgICAgICAgdmFyeWluZzoge1xuICAgICAgICAgIHZfaHVlUm90YXRpb246ICdtYXQzJyxcbiAgICAgICAgICB2X3NhdHVyYXRpb246ICdtYXQzJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBodWUoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudW5pZm9ybXNbMl0uZGF0YVswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgaHVlKGgpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzJdLmRhdGFbMF0gPSBwYXJzZUZsb2F0KGgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBzYXR1cmF0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zWzNdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IHNhdHVyYXRpb24ocykge1xuICAgICAgICAgIHRoaXMudW5pZm9ybXNbM10uZGF0YVswXSA9IHBhcnNlRmxvYXQoTWF0aC5tYXgoMCwgcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBodWVEaXNhYmxlZCgpIHtcbiAgICAgICAgICByZXR1cm4gIXRoaXMudW5pZm9ybXNbMF0uZGF0YVswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgaHVlRGlzYWJsZWQoYikge1xuICAgICAgICAgIHRoaXMudW5pZm9ybXNbMF0uZGF0YVswXSA9ICshYjtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgc2F0dXJhdGlvbkRpc2FibGVkKCkge1xuICAgICAgICAgIHJldHVybiAhdGhpcy51bmlmb3Jtc1sxXS5kYXRhWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBzYXR1cmF0aW9uRGlzYWJsZWQoYikge1xuICAgICAgICAgIHRoaXMudW5pZm9ybXNbMV0uZGF0YVswXSA9ICshYjtcbiAgICAgICAgfSxcblxuICAgICAgICB1bmlmb3JtczogW3tcbiAgICAgICAgICBuYW1lOiAndV9odWVFbmFibGVkJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9zYXRFbmFibGVkJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9odWUnLFxuICAgICAgICAgIHR5cGU6ICdmJyxcbiAgICAgICAgICBkYXRhOiBbaHVlXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3Vfc2F0dXJhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ2YnLFxuICAgICAgICAgIGRhdGE6IFtzYXR1cmF0aW9uXVxuICAgICAgICB9XVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gZHVvdG9uZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IFtwYXJhbXMuZGFyaz1bMC43NDEsIDAuMDQzMSwgMC41NjgsIDFdXSBpbml0aWFsIGRhcmsgY29sb3IgdG8gdXNlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IFtwYXJhbXMubGlnaHQ9WzAuOTg4LCAwLjczMywgMC4wNTEsIDFdXSBpbml0aWFsIGxpZ2h0IGNvbG9yIHRvIHVzZS5cbiAgICAgKiBAcmV0dXJucyB7ZHVvdG9uZUVmZmVjdH1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGR1b3RvbmUoe2Rhcms6IFswLjIsIDAuMTEsIDAuMzMsIDFdLCBsaWdodDogWzAuODgsIDAuNzgsIDAuNDMsIDFdfSlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkdW90b25lICh7XG4gICAgICBkYXJrID0gWzAuNzQxMTc2NDcwNiwgMC4wNDMxMzcyNTQ5LCAwLjU2ODYyNzQ1MSwgMV0sXG4gICAgICBsaWdodCA9IFswLjk4ODIzNTI5NDEsIDAuNzMzMzMzMzMzMywgMC4wNTA5ODAzOTIxNiwgMV1cbiAgICB9ID0ge30pIHtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGVkZWYge09iamVjdH0gZHVvdG9uZUVmZmVjdFxuICAgICAgICogQHByb3BlcnR5IHtudW1iZXJbXX0gbGlnaHQgQXJyYXkgb2YgNCBudW1iZXJzLCBub3JtYWxpemVkICgwLjAgLSAxLjApXG4gICAgICAgKiBAcHJvcGVydHkge251bWJlcltdfSBkYXJrIEFycmF5IG9mIDQgbnVtYmVycywgbm9ybWFsaXplZCAoMC4wIC0gMS4wKVxuICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBkaXNhYmxlZFxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiBlZmZlY3QubGlnaHQgPSBbMS4wLCAxLjAsIDAuOF07XG4gICAgICAgKiBlZmZlY3QuZGFyayA9IFswLjIsIDAuNiwgMC4zM107XG4gICAgICAgKi9cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZyYWdtZW50OiB7XG4gICAgICAgICAgdW5pZm9ybToge1xuICAgICAgICAgICAgdV9kdW90b25lRW5hYmxlZDogJ2Jvb2wnLFxuICAgICAgICAgICAgdV9saWdodDogJ3ZlYzQnLFxuICAgICAgICAgICAgdV9kYXJrOiAndmVjNCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1haW46IGBcbiAgICBpZiAodV9kdW90b25lRW5hYmxlZCkge1xuICAgICAgICB2ZWMzIGdyYXkgPSB2ZWMzKGRvdChsdW1jb2VmZiwgY29sb3IpKTtcbiAgICAgICAgY29sb3IgPSBtaXgodV9kYXJrLnJnYiwgdV9saWdodC5yZ2IsIGdyYXkpO1xuICAgIH1gXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGxpZ2h0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zWzFdLmRhdGEuc2xpY2UoMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGxpZ2h0KGwpIHtcbiAgICAgICAgICBsLmZvckVhY2goKGMsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzTmFOKGMpKSB7XG4gICAgICAgICAgICAgIHRoaXMudW5pZm9ybXNbMV0uZGF0YVtpXSA9IGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGRhcmsoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudW5pZm9ybXNbMl0uZGF0YS5zbGljZSgwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgZGFyayhkKSB7XG4gICAgICAgICAgZC5mb3JFYWNoKChjLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc05hTihjKSkge1xuICAgICAgICAgICAgICB0aGlzLnVuaWZvcm1zWzJdLmRhdGFbaV0gPSBjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgICByZXR1cm4gIXRoaXMudW5pZm9ybXNbMF0uZGF0YVswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgZGlzYWJsZWQoYikge1xuICAgICAgICAgIHRoaXMudW5pZm9ybXNbMF0uZGF0YVswXSA9ICshYjtcbiAgICAgICAgfSxcblxuICAgICAgICB1bmlmb3JtczogW3tcbiAgICAgICAgICBuYW1lOiAndV9kdW90b25lRW5hYmxlZCcsXG4gICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgIGRhdGE6IFsxXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3VfbGlnaHQnLFxuICAgICAgICAgIHR5cGU6ICdmJyxcbiAgICAgICAgICBkYXRhOiBsaWdodFxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3VfZGFyaycsXG4gICAgICAgICAgdHlwZTogJ2YnLFxuICAgICAgICAgIGRhdGE6IGRhcmtcbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGRpc3BsYWNlbWVudFxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDTEFNUCBzdHJldGNoIHRoZSBsYXN0IHZhbHVlIHRvIHRoZSBlZGdlLiBUaGlzIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yLlxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBESVNDQVJEIGRpc2NhcmQgdmFsdWVzIGJleW9uZCB0aGUgZWRnZSBvZiB0aGUgbWVkaWEgLSBsZWF2aW5nIGEgdHJhbnNwYXJlbnQgcGl4ZWwuXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFdSQVAgY29udGludWUgcmVuZGVyaW5nIHZhbHVlcyBmcm9tIG9wcG9zaXRlIGRpcmVjdGlvbiB3aGVuIHJlYWNoaW5nIHRoZSBlZGdlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcGFyYW1zLndyYXBdIHdyYXBwaW5nIG1ldGhvZCB0byB1c2UuIERlZmF1bHRzIHRvIGBkaXNwbGFjZW1lbnQuQ0xBTVBgLlxuICAgICAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gW3BhcmFtcy5zY2FsZV0gaW5pdGlhbCBzY2FsZSB0byB1c2UgZm9yIHggYW5kIHkgZGlzcGxhY2VtZW50LiBEZWZhdWx0cyB0byBge3g6IDAuMCwgeTogMC4wfWAgd2hpY2ggbWVhbnMgbm8gZGlzcGxhY2VtZW50LlxuICAgICAqIEByZXR1cm5zIHtkaXNwbGFjZW1lbnRFZmZlY3R9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBkaXNwbGFjZW1lbnQoe3dyYXA6IGRpc3BsYWNlbWVudC5ESVNDQVJELCBzY2FsZToge3g6IDAuNSwgeTogLTAuNX19KVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRpc3BsYWNlbWVudCh7XG4gICAgICB3cmFwID0gV1JBUF9NRVRIT0RTLkNMQU1QLFxuICAgICAgc2NhbGVcbiAgICB9ID0ge30pIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgeDogc3gsXG4gICAgICAgIHk6IHN5XG4gICAgICB9ID0gc2NhbGUgfHwge1xuICAgICAgICB4OiAwLjAsXG4gICAgICAgIHk6IDAuMFxuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGVkZWYge09iamVjdH0gZGlzcGxhY2VtZW50RWZmZWN0XG4gICAgICAgKiBAcHJvcGVydHkge0FycmF5QnVmZmVyVmlld3xJbWFnZURhdGF8SFRNTEltYWdlRWxlbWVudHxIVE1MQ2FudmFzRWxlbWVudHxIVE1MVmlkZW9FbGVtZW50fEltYWdlQml0bWFwfSBtYXBcbiAgICAgICAqIEBwcm9wZXJ0eSB7e3g6IG51bWJlcj8sIHk6IG51bWJlcj99fSBzY2FsZVxuICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBkaXNhYmxlZFxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAqIGltZy5zcmMgPSAnZGlzcC5qcGcnO1xuICAgICAgICogZWZmZWN0Lm1hcCA9IGltZztcbiAgICAgICAqIGVmZmVjdC5zY2FsZSA9IHt4OiAwLjR9O1xuICAgICAgICovXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZlcnRleDoge1xuICAgICAgICAgIGF0dHJpYnV0ZToge1xuICAgICAgICAgICAgYV9kaXNwbGFjZW1lbnRNYXBUZXhDb29yZDogJ3ZlYzInXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtYWluOiBgXG4gICAgdl9kaXNwbGFjZW1lbnRNYXBUZXhDb29yZCA9IGFfZGlzcGxhY2VtZW50TWFwVGV4Q29vcmQ7YFxuICAgICAgICB9LFxuICAgICAgICBmcmFnbWVudDoge1xuICAgICAgICAgIHVuaWZvcm06IHtcbiAgICAgICAgICAgIHVfZGlzcGxhY2VtZW50RW5hYmxlZDogJ2Jvb2wnLFxuICAgICAgICAgICAgdV9kaXNwTWFwOiAnc2FtcGxlcjJEJyxcbiAgICAgICAgICAgIHVfZGlzcFNjYWxlOiAndmVjMidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNvdXJjZTogYFxuICAgIGlmICh1X2Rpc3BsYWNlbWVudEVuYWJsZWQpIHtcbiAgICAgICAgdmVjMyBkaXNwTWFwID0gdGV4dHVyZTJEKHVfZGlzcE1hcCwgdl9kaXNwbGFjZW1lbnRNYXBUZXhDb29yZCkucmdiIC0gMC41O1xuICAgICAgICB2ZWMyIGRpc3BWZWMgPSB2ZWMyKHNvdXJjZUNvb3JkLnggKyB1X2Rpc3BTY2FsZS54ICogZGlzcE1hcC5yLCBzb3VyY2VDb29yZC55ICsgdV9kaXNwU2NhbGUueSAqIGRpc3BNYXAuZyk7XG4gICAgICAgICR7d3JhcH1cbiAgICAgICAgc291cmNlQ29vcmQgPSBkaXNwVmVjO1xuICAgIH1gXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICAgIHJldHVybiAhdGhpcy51bmlmb3Jtc1swXS5kYXRhWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBkaXNhYmxlZChiKSB7XG4gICAgICAgICAgdGhpcy51bmlmb3Jtc1swXS5kYXRhWzBdID0gKyFiO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBzY2FsZSgpIHtcbiAgICAgICAgICBjb25zdCBbeCwgeV0gPSB0aGlzLnVuaWZvcm1zWzJdLmRhdGE7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgc2NhbGUoe1xuICAgICAgICAgIHgsXG4gICAgICAgICAgeVxuICAgICAgICB9KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJykgdGhpcy51bmlmb3Jtc1syXS5kYXRhWzBdID0geDtcbiAgICAgICAgICBpZiAodHlwZW9mIHkgIT09ICd1bmRlZmluZWQnKSB0aGlzLnVuaWZvcm1zWzJdLmRhdGFbMV0gPSB5O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBtYXAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZXNbMF0uZGF0YTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgbWFwKGltZykge1xuICAgICAgICAgIHRoaXMudGV4dHVyZXNbMF0uZGF0YSA9IGltZztcbiAgICAgICAgfSxcblxuICAgICAgICB2YXJ5aW5nOiB7XG4gICAgICAgICAgdl9kaXNwbGFjZW1lbnRNYXBUZXhDb29yZDogJ3ZlYzInXG4gICAgICAgIH0sXG4gICAgICAgIHVuaWZvcm1zOiBbe1xuICAgICAgICAgIG5hbWU6ICd1X2Rpc3BsYWNlbWVudEVuYWJsZWQnLFxuICAgICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgICBkYXRhOiBbMV1cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICd1X2Rpc3BNYXAnLFxuICAgICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgICBkYXRhOiBbMV1cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICd1X2Rpc3BTY2FsZScsXG4gICAgICAgICAgdHlwZTogJ2YnLFxuICAgICAgICAgIGRhdGE6IFtzeCwgc3ldXG4gICAgICAgIH1dLFxuICAgICAgICBhdHRyaWJ1dGVzOiBbe1xuICAgICAgICAgIG5hbWU6ICdhX2Rpc3BsYWNlbWVudE1hcFRleENvb3JkJyxcbiAgICAgICAgICBleHRlbmRzOiAnYV90ZXhDb29yZCdcbiAgICAgICAgfV0sXG4gICAgICAgIHRleHR1cmVzOiBbe1xuICAgICAgICAgIGZvcm1hdDogJ1JHQidcbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgV1JBUF9NRVRIT0RTID0ge1xuICAgICAgQ0xBTVA6IGBkaXNwVmVjID0gY2xhbXAoZGlzcFZlYywgMC4wLCAxLjApO2AsXG4gICAgICBESVNDQVJEOiBgaWYgKGRpc3BWZWMueCA8IDAuMCB8fCBkaXNwVmVjLnggPiAxLjAgfHwgZGlzcFZlYy55ID4gMS4wIHx8IGRpc3BWZWMueSA8IDAuMCkgeyBkaXNjYXJkOyB9YCxcbiAgICAgIFdSQVA6IGBkaXNwVmVjID0gbW9kKGRpc3BWZWMsIDEuMCk7YFxuICAgIH07XG4gICAgZGlzcGxhY2VtZW50LkNMQU1QID0gV1JBUF9NRVRIT0RTLkNMQU1QO1xuICAgIGRpc3BsYWNlbWVudC5ESVNDQVJEID0gV1JBUF9NRVRIT0RTLkRJU0NBUkQ7XG4gICAgZGlzcGxhY2VtZW50LldSQVAgPSBXUkFQX01FVEhPRFMuV1JBUDtcblxuICAgIC8qIVxuICAgICAqIEdMU0wgdGV4dHVyZWxlc3MgY2xhc3NpYyAzRCBub2lzZSBcImNub2lzZVwiLFxuICAgICAqIHdpdGggYW4gUlNMLXN0eWxlIHBlcmlvZGljIHZhcmlhbnQgXCJwbm9pc2VcIi5cbiAgICAgKiBBdXRob3I6ICBTdGVmYW4gR3VzdGF2c29uIChzdGVmYW4uZ3VzdGF2c29uQGxpdS5zZSlcbiAgICAgKiBWZXJzaW9uOiAyMDExLTEwLTExXG4gICAgICpcbiAgICAgKiBNYW55IHRoYW5rcyB0byBJYW4gTWNFd2FuIG9mIEFzaGltYSBBcnRzIGZvciB0aGVcbiAgICAgKiBpZGVhcyBmb3IgcGVybXV0YXRpb24gYW5kIGdyYWRpZW50IHNlbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIENvcHlyaWdodCAoYykgMjAxMSBTdGVmYW4gR3VzdGF2c29uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICAgICAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZS5cbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vYXNoaW1hL3dlYmdsLW5vaXNlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBvZiBhIDNEIGNsYXNzaWMgUGVybGluIG5vaXNlLiBFeHBvc2VzIGEgYG5vaXNlKHZlYzMgUClgIGZ1bmN0aW9uIGZvciB1c2UgaW5zaWRlIGZyYWdtZW50IHNoYWRlcnMuXG4gICAgICovXG4gICAgdmFyIHBlcmxpbk5vaXNlID0gYFxudmVjMyBtb2QyODkgKHZlYzMgeCkge1xuICAgIHJldHVybiB4IC0gZmxvb3IoeCAqICgxLjAgLyAyODkuMCkpICogMjg5LjA7XG59XG5cbnZlYzQgbW9kMjg5ICh2ZWM0IHgpIHtcbiAgICByZXR1cm4geCAtIGZsb29yKHggKiAoMS4wIC8gMjg5LjApKSAqIDI4OS4wO1xufVxuXG52ZWM0IHBlcm11dGUgKHZlYzQgeCkge1xuICAgIHJldHVybiBtb2QyODkoKCh4KjM0LjApKzEuMCkqeCk7XG59XG5cbnZlYzQgdGF5bG9ySW52U3FydCAodmVjNCByKSB7XG4gICAgcmV0dXJuIDEuNzkyODQyOTE0MDAxNTkgLSAwLjg1MzczNDcyMDk1MzE0ICogcjtcbn1cblxudmVjMyBmYWRlICh2ZWMzIHQpIHtcbiAgICByZXR1cm4gdCp0KnQqKHQqKHQqNi4wLTE1LjApKzEwLjApO1xufVxuXG4vLyBDbGFzc2ljIFBlcmxpbiBub2lzZVxuZmxvYXQgbm9pc2UgKHZlYzMgUCkge1xuICAgIHZlYzMgUGkwID0gZmxvb3IoUCk7IC8vIEludGVnZXIgcGFydCBmb3IgaW5kZXhpbmdcbiAgICB2ZWMzIFBpMSA9IFBpMCArIHZlYzMoMS4wKTsgLy8gSW50ZWdlciBwYXJ0ICsgMVxuICAgIFBpMCA9IG1vZDI4OShQaTApO1xuICAgIFBpMSA9IG1vZDI4OShQaTEpO1xuICAgIHZlYzMgUGYwID0gZnJhY3QoUCk7IC8vIEZyYWN0aW9uYWwgcGFydCBmb3IgaW50ZXJwb2xhdGlvblxuICAgIHZlYzMgUGYxID0gUGYwIC0gdmVjMygxLjApOyAvLyBGcmFjdGlvbmFsIHBhcnQgLSAxLjBcbiAgICB2ZWM0IGl4ID0gdmVjNChQaTAueCwgUGkxLngsIFBpMC54LCBQaTEueCk7XG4gICAgdmVjNCBpeSA9IHZlYzQoUGkwLnl5LCBQaTEueXkpO1xuICAgIHZlYzQgaXowID0gUGkwLnp6eno7XG4gICAgdmVjNCBpejEgPSBQaTEuenp6ejtcblxuICAgIHZlYzQgaXh5ID0gcGVybXV0ZShwZXJtdXRlKGl4KSArIGl5KTtcbiAgICB2ZWM0IGl4eTAgPSBwZXJtdXRlKGl4eSArIGl6MCk7XG4gICAgdmVjNCBpeHkxID0gcGVybXV0ZShpeHkgKyBpejEpO1xuXG4gICAgdmVjNCBneDAgPSBpeHkwICogKDEuMCAvIDcuMCk7XG4gICAgdmVjNCBneTAgPSBmcmFjdChmbG9vcihneDApICogKDEuMCAvIDcuMCkpIC0gMC41O1xuICAgIGd4MCA9IGZyYWN0KGd4MCk7XG4gICAgdmVjNCBnejAgPSB2ZWM0KDAuNSkgLSBhYnMoZ3gwKSAtIGFicyhneTApO1xuICAgIHZlYzQgc3owID0gc3RlcChnejAsIHZlYzQoMC4wKSk7XG4gICAgZ3gwIC09IHN6MCAqIChzdGVwKDAuMCwgZ3gwKSAtIDAuNSk7XG4gICAgZ3kwIC09IHN6MCAqIChzdGVwKDAuMCwgZ3kwKSAtIDAuNSk7XG5cbiAgICB2ZWM0IGd4MSA9IGl4eTEgKiAoMS4wIC8gNy4wKTtcbiAgICB2ZWM0IGd5MSA9IGZyYWN0KGZsb29yKGd4MSkgKiAoMS4wIC8gNy4wKSkgLSAwLjU7XG4gICAgZ3gxID0gZnJhY3QoZ3gxKTtcbiAgICB2ZWM0IGd6MSA9IHZlYzQoMC41KSAtIGFicyhneDEpIC0gYWJzKGd5MSk7XG4gICAgdmVjNCBzejEgPSBzdGVwKGd6MSwgdmVjNCgwLjApKTtcbiAgICBneDEgLT0gc3oxICogKHN0ZXAoMC4wLCBneDEpIC0gMC41KTtcbiAgICBneTEgLT0gc3oxICogKHN0ZXAoMC4wLCBneTEpIC0gMC41KTtcblxuICAgIHZlYzMgZzAwMCA9IHZlYzMoZ3gwLngsZ3kwLngsZ3owLngpO1xuICAgIHZlYzMgZzEwMCA9IHZlYzMoZ3gwLnksZ3kwLnksZ3owLnkpO1xuICAgIHZlYzMgZzAxMCA9IHZlYzMoZ3gwLnosZ3kwLnosZ3owLnopO1xuICAgIHZlYzMgZzExMCA9IHZlYzMoZ3gwLncsZ3kwLncsZ3owLncpO1xuICAgIHZlYzMgZzAwMSA9IHZlYzMoZ3gxLngsZ3kxLngsZ3oxLngpO1xuICAgIHZlYzMgZzEwMSA9IHZlYzMoZ3gxLnksZ3kxLnksZ3oxLnkpO1xuICAgIHZlYzMgZzAxMSA9IHZlYzMoZ3gxLnosZ3kxLnosZ3oxLnopO1xuICAgIHZlYzMgZzExMSA9IHZlYzMoZ3gxLncsZ3kxLncsZ3oxLncpO1xuXG4gICAgdmVjNCBub3JtMCA9IHRheWxvckludlNxcnQodmVjNChkb3QoZzAwMCwgZzAwMCksIGRvdChnMDEwLCBnMDEwKSwgZG90KGcxMDAsIGcxMDApLCBkb3QoZzExMCwgZzExMCkpKTtcbiAgICBnMDAwICo9IG5vcm0wLng7XG4gICAgZzAxMCAqPSBub3JtMC55O1xuICAgIGcxMDAgKj0gbm9ybTAuejtcbiAgICBnMTEwICo9IG5vcm0wLnc7XG4gICAgdmVjNCBub3JtMSA9IHRheWxvckludlNxcnQodmVjNChkb3QoZzAwMSwgZzAwMSksIGRvdChnMDExLCBnMDExKSwgZG90KGcxMDEsIGcxMDEpLCBkb3QoZzExMSwgZzExMSkpKTtcbiAgICBnMDAxICo9IG5vcm0xLng7XG4gICAgZzAxMSAqPSBub3JtMS55O1xuICAgIGcxMDEgKj0gbm9ybTEuejtcbiAgICBnMTExICo9IG5vcm0xLnc7XG5cbiAgICBmbG9hdCBuMDAwID0gZG90KGcwMDAsIFBmMCk7XG4gICAgZmxvYXQgbjEwMCA9IGRvdChnMTAwLCB2ZWMzKFBmMS54LCBQZjAueXopKTtcbiAgICBmbG9hdCBuMDEwID0gZG90KGcwMTAsIHZlYzMoUGYwLngsIFBmMS55LCBQZjAueikpO1xuICAgIGZsb2F0IG4xMTAgPSBkb3QoZzExMCwgdmVjMyhQZjEueHksIFBmMC56KSk7XG4gICAgZmxvYXQgbjAwMSA9IGRvdChnMDAxLCB2ZWMzKFBmMC54eSwgUGYxLnopKTtcbiAgICBmbG9hdCBuMTAxID0gZG90KGcxMDEsIHZlYzMoUGYxLngsIFBmMC55LCBQZjEueikpO1xuICAgIGZsb2F0IG4wMTEgPSBkb3QoZzAxMSwgdmVjMyhQZjAueCwgUGYxLnl6KSk7XG4gICAgZmxvYXQgbjExMSA9IGRvdChnMTExLCBQZjEpO1xuXG4gICAgdmVjMyBmYWRlX3h5eiA9IGZhZGUoUGYwKTtcbiAgICB2ZWM0IG5feiA9IG1peCh2ZWM0KG4wMDAsIG4xMDAsIG4wMTAsIG4xMTApLCB2ZWM0KG4wMDEsIG4xMDEsIG4wMTEsIG4xMTEpLCBmYWRlX3h5ei56KTtcbiAgICB2ZWMyIG5feXogPSBtaXgobl96Lnh5LCBuX3ouencsIGZhZGVfeHl6LnkpO1xuICAgIGZsb2F0IG5feHl6ID0gbWl4KG5feXoueCwgbl95ei55LCBmYWRlX3h5ei54KTsgXG4gICAgcmV0dXJuIDIuMiAqIG5feHl6O1xufWA7XG5cbiAgICAvKiFcbiAgICAgKiBDZWxsdWxhciBub2lzZSAoXCJXb3JsZXkgbm9pc2VcIikgaW4gM0QgaW4gR0xTTC5cbiAgICAgKiBBdXRob3I6ICBTdGVmYW4gR3VzdGF2c29uIChzdGVmYW4uZ3VzdGF2c29uQGxpdS5zZSlcbiAgICAgKiBWZXJzaW9uOiBTdGVmYW4gR3VzdGF2c29uIDIwMTEtMDQtMTlcbiAgICAgKlxuICAgICAqIE1hbnkgdGhhbmtzIHRvIElhbiBNY0V3YW4gb2YgQXNoaW1hIEFydHMgZm9yIHRoZVxuICAgICAqIGlkZWFzIGZvciBwZXJtdXRhdGlvbiBhbmQgZ3JhZGllbnQgc2VsZWN0aW9uLlxuICAgICAqXG4gICAgICogQ29weXJpZ2h0IChjKSAyMDExIFN0ZWZhbiBHdXN0YXZzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gICAgICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlLlxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hc2hpbWEvd2ViZ2wtbm9pc2VcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENlbGx1bGFyIG5vaXNlIChcIldvcmxleSBub2lzZVwiKSBpbiAzRCBpbiBHTFNMLiBFeHBvc2VzIGEgYG5vaXNlKHZlYzMgUClgIGZ1bmN0aW9uIGZvciB1c2UgaW5zaWRlIGZyYWdtZW50IHNoYWRlcnMuXG4gICAgICovXG4gICAgdmFyIGNlbGx1bGFyID0gYFxuICB2ZWMzIG1vZDI4OSh2ZWMzIHgpIHtcbiAgICByZXR1cm4geCAtIGZsb29yKHggKiAoMS4wIC8gMjg5LjApKSAqIDI4OS4wO1xuICB9XG5cbiAgLy8gTW9kdWxvIDcgd2l0aG91dCBhIGRpdmlzaW9uXG4gIHZlYzMgbW9kNyh2ZWMzIHgpIHtcbiAgICByZXR1cm4geCAtIGZsb29yKHggKiAoMS4wIC8gNy4wKSkgKiA3LjA7XG4gIH1cblxuICAvLyBQZXJtdXRhdGlvbiBwb2x5bm9taWFsOiAoMzR4XjIgKyB4KSBtb2QgMjg5XG4gIHZlYzMgcGVybXV0ZSh2ZWMzIHgpIHtcbiAgICByZXR1cm4gbW9kMjg5KCgzNC4wICogeCArIDEuMCkgKiB4KTtcbiAgfVxuXG4gIGZsb2F0IG5vaXNlKHZlYzMgUCkge1xuICAgICNkZWZpbmUgSyAwLjE0Mjg1NzE0Mjg1NyAvLyAxLzdcbiAgICAjZGVmaW5lIEtvIDAuNDI4NTcxNDI4NTcxIC8vIDEvMi1LLzJcbiAgICAjZGVmaW5lIEsyIDAuMDIwNDA4MTYzMjY1MzA2IC8vIDEvKDcqNylcbiAgICAjZGVmaW5lIEt6IDAuMTY2NjY2NjY2NjY3IC8vIDEvNlxuICAgICNkZWZpbmUgS3pvIDAuNDE2NjY2NjY2NjY3IC8vIDEvMi0xLzYqMlxuICAgICNkZWZpbmUgaml0dGVyIDEuMCAvLyBzbWFsbGVyIGppdHRlciBnaXZlcyBtb3JlIHJlZ3VsYXIgcGF0dGVyblxuXG4gICAgdmVjMyBQaSA9IG1vZDI4OShmbG9vcihQKSk7XG4gICAgdmVjMyBQZiA9IGZyYWN0KFApIC0gMC41O1xuXG4gICAgdmVjMyBQZnggPSBQZi54ICsgdmVjMygxLjAsIDAuMCwgLTEuMCk7XG4gICAgdmVjMyBQZnkgPSBQZi55ICsgdmVjMygxLjAsIDAuMCwgLTEuMCk7XG4gICAgdmVjMyBQZnogPSBQZi56ICsgdmVjMygxLjAsIDAuMCwgLTEuMCk7XG5cbiAgICB2ZWMzIHAgPSBwZXJtdXRlKFBpLnggKyB2ZWMzKC0xLjAsIDAuMCwgMS4wKSk7XG4gICAgdmVjMyBwMSA9IHBlcm11dGUocCArIFBpLnkgLSAxLjApO1xuICAgIHZlYzMgcDIgPSBwZXJtdXRlKHAgKyBQaS55KTtcbiAgICB2ZWMzIHAzID0gcGVybXV0ZShwICsgUGkueSArIDEuMCk7XG5cbiAgICB2ZWMzIHAxMSA9IHBlcm11dGUocDEgKyBQaS56IC0gMS4wKTtcbiAgICB2ZWMzIHAxMiA9IHBlcm11dGUocDEgKyBQaS56KTtcbiAgICB2ZWMzIHAxMyA9IHBlcm11dGUocDEgKyBQaS56ICsgMS4wKTtcblxuICAgIHZlYzMgcDIxID0gcGVybXV0ZShwMiArIFBpLnogLSAxLjApO1xuICAgIHZlYzMgcDIyID0gcGVybXV0ZShwMiArIFBpLnopO1xuICAgIHZlYzMgcDIzID0gcGVybXV0ZShwMiArIFBpLnogKyAxLjApO1xuXG4gICAgdmVjMyBwMzEgPSBwZXJtdXRlKHAzICsgUGkueiAtIDEuMCk7XG4gICAgdmVjMyBwMzIgPSBwZXJtdXRlKHAzICsgUGkueik7XG4gICAgdmVjMyBwMzMgPSBwZXJtdXRlKHAzICsgUGkueiArIDEuMCk7XG5cbiAgICB2ZWMzIG94MTEgPSBmcmFjdChwMTEqSykgLSBLbztcbiAgICB2ZWMzIG95MTEgPSBtb2Q3KGZsb29yKHAxMSpLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3oxMSA9IGZsb29yKHAxMSpLMikqS3ogLSBLem87IC8vIHAxMSA8IDI4OSBndWFyYW50ZWVkXG5cbiAgICB2ZWMzIG94MTIgPSBmcmFjdChwMTIqSykgLSBLbztcbiAgICB2ZWMzIG95MTIgPSBtb2Q3KGZsb29yKHAxMipLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3oxMiA9IGZsb29yKHAxMipLMikqS3ogLSBLem87XG5cbiAgICB2ZWMzIG94MTMgPSBmcmFjdChwMTMqSykgLSBLbztcbiAgICB2ZWMzIG95MTMgPSBtb2Q3KGZsb29yKHAxMypLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3oxMyA9IGZsb29yKHAxMypLMikqS3ogLSBLem87XG5cbiAgICB2ZWMzIG94MjEgPSBmcmFjdChwMjEqSykgLSBLbztcbiAgICB2ZWMzIG95MjEgPSBtb2Q3KGZsb29yKHAyMSpLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3oyMSA9IGZsb29yKHAyMSpLMikqS3ogLSBLem87XG5cbiAgICB2ZWMzIG94MjIgPSBmcmFjdChwMjIqSykgLSBLbztcbiAgICB2ZWMzIG95MjIgPSBtb2Q3KGZsb29yKHAyMipLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3oyMiA9IGZsb29yKHAyMipLMikqS3ogLSBLem87XG5cbiAgICB2ZWMzIG94MjMgPSBmcmFjdChwMjMqSykgLSBLbztcbiAgICB2ZWMzIG95MjMgPSBtb2Q3KGZsb29yKHAyMypLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3oyMyA9IGZsb29yKHAyMypLMikqS3ogLSBLem87XG5cbiAgICB2ZWMzIG94MzEgPSBmcmFjdChwMzEqSykgLSBLbztcbiAgICB2ZWMzIG95MzEgPSBtb2Q3KGZsb29yKHAzMSpLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3ozMSA9IGZsb29yKHAzMSpLMikqS3ogLSBLem87XG5cbiAgICB2ZWMzIG94MzIgPSBmcmFjdChwMzIqSykgLSBLbztcbiAgICB2ZWMzIG95MzIgPSBtb2Q3KGZsb29yKHAzMipLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3ozMiA9IGZsb29yKHAzMipLMikqS3ogLSBLem87XG5cbiAgICB2ZWMzIG94MzMgPSBmcmFjdChwMzMqSykgLSBLbztcbiAgICB2ZWMzIG95MzMgPSBtb2Q3KGZsb29yKHAzMypLKSkqSyAtIEtvO1xuICAgIHZlYzMgb3ozMyA9IGZsb29yKHAzMypLMikqS3ogLSBLem87XG5cbiAgICB2ZWMzIGR4MTEgPSBQZnggKyBqaXR0ZXIqb3gxMTtcbiAgICB2ZWMzIGR5MTEgPSBQZnkueCArIGppdHRlcipveTExO1xuICAgIHZlYzMgZHoxMSA9IFBmei54ICsgaml0dGVyKm96MTE7XG5cbiAgICB2ZWMzIGR4MTIgPSBQZnggKyBqaXR0ZXIqb3gxMjtcbiAgICB2ZWMzIGR5MTIgPSBQZnkueCArIGppdHRlcipveTEyO1xuICAgIHZlYzMgZHoxMiA9IFBmei55ICsgaml0dGVyKm96MTI7XG5cbiAgICB2ZWMzIGR4MTMgPSBQZnggKyBqaXR0ZXIqb3gxMztcbiAgICB2ZWMzIGR5MTMgPSBQZnkueCArIGppdHRlcipveTEzO1xuICAgIHZlYzMgZHoxMyA9IFBmei56ICsgaml0dGVyKm96MTM7XG5cbiAgICB2ZWMzIGR4MjEgPSBQZnggKyBqaXR0ZXIqb3gyMTtcbiAgICB2ZWMzIGR5MjEgPSBQZnkueSArIGppdHRlcipveTIxO1xuICAgIHZlYzMgZHoyMSA9IFBmei54ICsgaml0dGVyKm96MjE7XG5cbiAgICB2ZWMzIGR4MjIgPSBQZnggKyBqaXR0ZXIqb3gyMjtcbiAgICB2ZWMzIGR5MjIgPSBQZnkueSArIGppdHRlcipveTIyO1xuICAgIHZlYzMgZHoyMiA9IFBmei55ICsgaml0dGVyKm96MjI7XG5cbiAgICB2ZWMzIGR4MjMgPSBQZnggKyBqaXR0ZXIqb3gyMztcbiAgICB2ZWMzIGR5MjMgPSBQZnkueSArIGppdHRlcipveTIzO1xuICAgIHZlYzMgZHoyMyA9IFBmei56ICsgaml0dGVyKm96MjM7XG5cbiAgICB2ZWMzIGR4MzEgPSBQZnggKyBqaXR0ZXIqb3gzMTtcbiAgICB2ZWMzIGR5MzEgPSBQZnkueiArIGppdHRlcipveTMxO1xuICAgIHZlYzMgZHozMSA9IFBmei54ICsgaml0dGVyKm96MzE7XG5cbiAgICB2ZWMzIGR4MzIgPSBQZnggKyBqaXR0ZXIqb3gzMjtcbiAgICB2ZWMzIGR5MzIgPSBQZnkueiArIGppdHRlcipveTMyO1xuICAgIHZlYzMgZHozMiA9IFBmei55ICsgaml0dGVyKm96MzI7XG5cbiAgICB2ZWMzIGR4MzMgPSBQZnggKyBqaXR0ZXIqb3gzMztcbiAgICB2ZWMzIGR5MzMgPSBQZnkueiArIGppdHRlcipveTMzO1xuICAgIHZlYzMgZHozMyA9IFBmei56ICsgaml0dGVyKm96MzM7XG5cbiAgICB2ZWMzIGQxMSA9IGR4MTEgKiBkeDExICsgZHkxMSAqIGR5MTEgKyBkejExICogZHoxMTtcbiAgICB2ZWMzIGQxMiA9IGR4MTIgKiBkeDEyICsgZHkxMiAqIGR5MTIgKyBkejEyICogZHoxMjtcbiAgICB2ZWMzIGQxMyA9IGR4MTMgKiBkeDEzICsgZHkxMyAqIGR5MTMgKyBkejEzICogZHoxMztcbiAgICB2ZWMzIGQyMSA9IGR4MjEgKiBkeDIxICsgZHkyMSAqIGR5MjEgKyBkejIxICogZHoyMTtcbiAgICB2ZWMzIGQyMiA9IGR4MjIgKiBkeDIyICsgZHkyMiAqIGR5MjIgKyBkejIyICogZHoyMjtcbiAgICB2ZWMzIGQyMyA9IGR4MjMgKiBkeDIzICsgZHkyMyAqIGR5MjMgKyBkejIzICogZHoyMztcbiAgICB2ZWMzIGQzMSA9IGR4MzEgKiBkeDMxICsgZHkzMSAqIGR5MzEgKyBkejMxICogZHozMTtcbiAgICB2ZWMzIGQzMiA9IGR4MzIgKiBkeDMyICsgZHkzMiAqIGR5MzIgKyBkejMyICogZHozMjtcbiAgICB2ZWMzIGQzMyA9IGR4MzMgKiBkeDMzICsgZHkzMyAqIGR5MzMgKyBkejMzICogZHozMztcblxuICAgIHZlYzMgZDEgPSBtaW4obWluKGQxMSxkMTIpLCBkMTMpO1xuICAgIHZlYzMgZDIgPSBtaW4obWluKGQyMSxkMjIpLCBkMjMpO1xuICAgIHZlYzMgZDMgPSBtaW4obWluKGQzMSxkMzIpLCBkMzMpO1xuICAgIHZlYzMgZCA9IG1pbihtaW4oZDEsZDIpLCBkMyk7XG4gICAgZC54ID0gbWluKG1pbihkLngsZC55KSxkLnopO1xuXG4gICAgcmV0dXJuIHNxcnQoZC54KTtcbiAgfVxuYDtcblxuICAgIC8qIVxuICAgICAqIERlc2NyaXB0aW9uIDogQXJyYXkgYW5kIHRleHR1cmVsZXNzIEdMU0wgMkQvM0QvNEQgc2ltcGxleFxuICAgICAqICAgICAgICAgICAgICAgbm9pc2UgZnVuY3Rpb25zLlxuICAgICAqICAgICAgQXV0aG9yIDogSWFuIE1jRXdhbiwgQXNoaW1hIEFydHMuXG4gICAgICogIE1haW50YWluZXIgOiBzdGVndVxuICAgICAqICAgICBMYXN0bW9kIDogMjAxMTA4MjIgKGlqbSlcbiAgICAgKiAgICAgTGljZW5zZSA6IENvcHlyaWdodCAoQykgMjAxMSBBc2hpbWEgQXJ0cy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAgICAgKiAgICAgICAgICAgICAgIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZS5cbiAgICAgKiAgICAgICAgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9hc2hpbWEvd2ViZ2wtbm9pc2VcbiAgICAgKiAgICAgICAgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9zdGVndS93ZWJnbC1ub2lzZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50YXRpb24gb2YgYSAzRCBTaW1wbGV4IG5vaXNlLiBFeHBvc2VzIGEgYG5vaXNlKHZlYzMgdilgIGZ1bmN0aW9uIGZvciB1c2UgaW5zaWRlIGZyYWdtZW50IHNoYWRlcnMuXG4gICAgICovXG4gICAgdmFyIHNpbXBsZXggPSBgXG52ZWMzIG1vZDI4OSAodmVjMyB4KSB7XG4gICAgcmV0dXJuIHggLSBmbG9vcih4ICogKDEuMCAvIDI4OS4wKSkgKiAyODkuMDtcbn1cblxudmVjNCBtb2QyODkgKHZlYzQgeCkge1xuICAgIHJldHVybiB4IC0gZmxvb3IoeCAqICgxLjAgLyAyODkuMCkpICogMjg5LjA7XG59XG5cbnZlYzQgcGVybXV0ZSAodmVjNCB4KSB7XG4gICAgcmV0dXJuIG1vZDI4OSgoKHgqMzQuMCkrMS4wKSp4KTtcbn1cblxudmVjNCB0YXlsb3JJbnZTcXJ0ICh2ZWM0IHIpIHtcbiAgICByZXR1cm4gMS43OTI4NDI5MTQwMDE1OSAtIDAuODUzNzM0NzIwOTUzMTQgKiByO1xufVxuXG5mbG9hdCBub2lzZSAodmVjMyB2KSB7IFxuICAgIGNvbnN0IHZlYzIgQyA9IHZlYzIoMS4wLzYuMCwgMS4wLzMuMCkgO1xuICAgIGNvbnN0IHZlYzQgRCA9IHZlYzQoMC4wLCAwLjUsIDEuMCwgMi4wKTtcblxuICAgIC8vIEZpcnN0IGNvcm5lclxuICAgIHZlYzMgaSAgPSBmbG9vcih2ICsgZG90KHYsIEMueXl5KSApO1xuICAgIHZlYzMgeDAgPSAgIHYgLSBpICsgZG90KGksIEMueHh4KSA7XG5cbiAgICAvLyBPdGhlciBjb3JuZXJzXG4gICAgdmVjMyBnID0gc3RlcCh4MC55engsIHgwLnh5eik7XG4gICAgdmVjMyBsID0gMS4wIC0gZztcbiAgICB2ZWMzIGkxID0gbWluKCBnLnh5eiwgbC56eHkgKTtcbiAgICB2ZWMzIGkyID0gbWF4KCBnLnh5eiwgbC56eHkgKTtcblxuICAgIC8vICAgeDAgPSB4MCAtIDAuMCArIDAuMCAqIEMueHh4O1xuICAgIC8vICAgeDEgPSB4MCAtIGkxICArIDEuMCAqIEMueHh4O1xuICAgIC8vICAgeDIgPSB4MCAtIGkyICArIDIuMCAqIEMueHh4O1xuICAgIC8vICAgeDMgPSB4MCAtIDEuMCArIDMuMCAqIEMueHh4O1xuICAgIHZlYzMgeDEgPSB4MCAtIGkxICsgQy54eHg7XG4gICAgdmVjMyB4MiA9IHgwIC0gaTIgKyBDLnl5eTsgLy8gMi4wKkMueCA9IDEvMyA9IEMueVxuICAgIHZlYzMgeDMgPSB4MCAtIEQueXl5OyAgICAgIC8vIC0xLjArMy4wKkMueCA9IC0wLjUgPSAtRC55XG5cbiAgICAvLyBQZXJtdXRhdGlvbnNcbiAgICBpID0gbW9kMjg5KGkpOyBcbiAgICB2ZWM0IHAgPSBwZXJtdXRlKCBwZXJtdXRlKCBwZXJtdXRlKCBcbiAgICAgICAgICAgICAgICAgaS56ICsgdmVjNCgwLjAsIGkxLnosIGkyLnosIDEuMCApKVxuICAgICAgICAgICAgICAgKyBpLnkgKyB2ZWM0KDAuMCwgaTEueSwgaTIueSwgMS4wICkpIFxuICAgICAgICAgICAgICAgKyBpLnggKyB2ZWM0KDAuMCwgaTEueCwgaTIueCwgMS4wICkpO1xuXG4gICAgLy8gR3JhZGllbnRzOiA3eDcgcG9pbnRzIG92ZXIgYSBzcXVhcmUsIG1hcHBlZCBvbnRvIGFuIG9jdGFoZWRyb24uXG4gICAgLy8gVGhlIHJpbmcgc2l6ZSAxNyoxNyA9IDI4OSBpcyBjbG9zZSB0byBhIG11bHRpcGxlIG9mIDQ5ICg0OSo2ID0gMjk0KVxuICAgIGZsb2F0IG5fID0gMC4xNDI4NTcxNDI4NTc7IC8vIDEuMC83LjBcbiAgICB2ZWMzICBucyA9IG5fICogRC53eXogLSBELnh6eDtcblxuICAgIHZlYzQgaiA9IHAgLSA0OS4wICogZmxvb3IocCAqIG5zLnogKiBucy56KTsgIC8vICBtb2QocCw3KjcpXG5cbiAgICB2ZWM0IHhfID0gZmxvb3IoaiAqIG5zLnopO1xuICAgIHZlYzQgeV8gPSBmbG9vcihqIC0gNy4wICogeF8gKTsgICAgLy8gbW9kKGosTilcblxuICAgIHZlYzQgeCA9IHhfICpucy54ICsgbnMueXl5eTtcbiAgICB2ZWM0IHkgPSB5XyAqbnMueCArIG5zLnl5eXk7XG4gICAgdmVjNCBoID0gMS4wIC0gYWJzKHgpIC0gYWJzKHkpO1xuXG4gICAgdmVjNCBiMCA9IHZlYzQoIHgueHksIHkueHkgKTtcbiAgICB2ZWM0IGIxID0gdmVjNCggeC56dywgeS56dyApO1xuXG4gICAgLy92ZWM0IHMwID0gdmVjNChsZXNzVGhhbihiMCwwLjApKSoyLjAgLSAxLjA7XG4gICAgLy92ZWM0IHMxID0gdmVjNChsZXNzVGhhbihiMSwwLjApKSoyLjAgLSAxLjA7XG4gICAgdmVjNCBzMCA9IGZsb29yKGIwKSoyLjAgKyAxLjA7XG4gICAgdmVjNCBzMSA9IGZsb29yKGIxKSoyLjAgKyAxLjA7XG4gICAgdmVjNCBzaCA9IC1zdGVwKGgsIHZlYzQoMC4wKSk7XG5cbiAgICB2ZWM0IGEwID0gYjAueHp5dyArIHMwLnh6eXcqc2gueHh5eSA7XG4gICAgdmVjNCBhMSA9IGIxLnh6eXcgKyBzMS54enl3KnNoLnp6d3cgO1xuXG4gICAgdmVjMyBwMCA9IHZlYzMoYTAueHksaC54KTtcbiAgICB2ZWMzIHAxID0gdmVjMyhhMC56dyxoLnkpO1xuICAgIHZlYzMgcDIgPSB2ZWMzKGExLnh5LGgueik7XG4gICAgdmVjMyBwMyA9IHZlYzMoYTEuencsaC53KTtcblxuICAgIC8vTm9ybWFsaXNlIGdyYWRpZW50c1xuICAgIHZlYzQgbm9ybSA9IHRheWxvckludlNxcnQodmVjNChkb3QocDAscDApLCBkb3QocDEscDEpLCBkb3QocDIsIHAyKSwgZG90KHAzLHAzKSkpO1xuICAgIHAwICo9IG5vcm0ueDtcbiAgICBwMSAqPSBub3JtLnk7XG4gICAgcDIgKj0gbm9ybS56O1xuICAgIHAzICo9IG5vcm0udztcblxuICAgIC8vIE1peCBmaW5hbCBub2lzZSB2YWx1ZVxuICAgIHZlYzQgbSA9IG1heCgwLjYgLSB2ZWM0KGRvdCh4MCx4MCksIGRvdCh4MSx4MSksIGRvdCh4Mix4MiksIGRvdCh4Myx4MykpLCAwLjApO1xuICAgIG0gPSBtICogbTtcbiAgICByZXR1cm4gNDIuMCAqIGRvdCggbSptLCB2ZWM0KCBkb3QocDAseDApLCBkb3QocDEseDEpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdChwMix4MiksIGRvdChwMyx4MykgKSApO1xufWA7XG5cbiAgICAvKipcbiAgICAgKiBAZnVuY3Rpb24gdHVyYnVsZW5jZVxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBDT0xPUlxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBBTFBIQVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLm5vaXNlIDNEIG5vaXNlIGltcGxlbWVudGF0aW9uIHRvIHVzZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhcmFtcy5vdXRwdXRdIGhvdyB0byBvdXRwdXQgdGhlIGB0dXJidWxlbmNlVmFsdWVgIHZhcmlhYmxlLiBVc2UgYHR1cmJ1bGVuY2UuQ09MT1JgIG9yIGB0dXJidWxlbmNlLkFMUEhBYCBmb3Igb3V0cHV0dGluZyB0byBjb2xvciBvciBhbHBoYSBjb3JyZXNwb25kaW5nbHkuIERlZmF1bHRzIHRvIGB0dXJidWxlbmNlLkNPTE9SYC5cbiAgICAgKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IFtwYXJhbXMuZnJlcXVlbmN5PXt4OiAwLjAsIHk6IDAuMH1dIGluaXRpYWwgZnJlcXVlbmNpZXMgdG8gdXNlIGZvciB4IGFuZCB5IGF4ZXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMub2N0YXZlcz0xXSBpbml0aWFsIG51bWJlciBvZiBvY3RhdmVzIHRvIHVzZSBmb3IgdHVyYnVsZW5jZSBub2lzZSBnZW5lcmF0aW9uLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3BhcmFtcy5pc0ZyYWN0YWw9ZmFsc2VdIGluaXRpYWwgbnVtYmVyIG9mIG9jdGF2ZXMgdG8gdXNlIGZvciB0dXJidWxlbmNlIG5vaXNlIGdlbmVyYXRpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXJhbXMudGltZT0wXSBpbml0aWFsIHRpbWUgZm9yIGNvbnRyb2xsaW5nIGluaXRpYWwgbm9pc2UgdmFsdWUuXG4gICAgICogQHJldHVybnMge3R1cmJ1bGVuY2VFZmZlY3R9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0dXJidWxlbmNlKHtub2lzZToga2FtcG9zLm5vaXNlLnNpbXBsZXgsIG91dHB1dDogdHVyYnVsZW5jZS5DT0xPUiwgb2N0YXZlczogNCwgaXNGcmFjdGFsOiB0cnVlfSlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0dXJidWxlbmNlKHtcbiAgICAgIG5vaXNlLFxuICAgICAgb3V0cHV0ID0gT1VUUFVUX1RZUEVTLkNPTE9SLFxuICAgICAgZnJlcXVlbmN5LFxuICAgICAgb2N0YXZlcyA9IDEsXG4gICAgICBpc0ZyYWN0YWwgPSBmYWxzZSxcbiAgICAgIHRpbWUgPSAwLjBcbiAgICB9KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHg6IGZ4LFxuICAgICAgICB5OiBmeVxuICAgICAgfSA9IGZyZXF1ZW5jeSB8fCB7XG4gICAgICAgIHg6IDAuMCxcbiAgICAgICAgeTogMC4wXG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSB0dXJidWxlbmNlRWZmZWN0XG4gICAgICAgKiBAcHJvcGVydHkge3t4OiBudW1iZXI/LCB5OiBudW1iZXI/fX0gZnJlcXVlbmN5XG4gICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gb2N0YXZlc1xuICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBpc0ZyYWN0YWxcbiAgICAgICAqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gR2VuZXJhdGVzIGEgdHVyYnVsZW5jZS9mcmFjdGFsIG5vaXNlIHZhbHVlIHN0b3JlZCBpbnRvIGB0dXJidWxlbmNlVmFsdWVgLlxuICAgICAgICogRGVwZW5kcyBvbiBhIGBub2lzZSh2ZWMzIFApYCBmdW5jdGlvbiB0byBiZSBkZWNsYXJlZCBhbmQgaW5qZWN0ZWQgdmlhIHRoZSBgbm9pc2VgIHBhcmFtLCBmb3IgZXhhbXBsZSwgc2ltcGx5IHN1cHBseWluZyB0aGUge0BsaW5rIHBlcmxpbk5vaXNlRWZmZWN0fS5cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogZWZmZWN0LmZyZXF1ZW5jeSA9IHt4OiAwLjAwNjV9O1xuICAgICAgICogZWZmZWN0Lm9jdGF2ZXMgPSA0O1xuICAgICAgICogZWZmZWN0LmlzRnJhY3RhbCA9IHRydWU7XG4gICAgICAgKi9cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZnJhZ21lbnQ6IHtcbiAgICAgICAgICB1bmlmb3JtOiB7XG4gICAgICAgICAgICB1X3R1cmJ1bGVuY2VFbmFibGVkOiAnYm9vbCcsXG4gICAgICAgICAgICB1X3R1cmJ1bGVuY2VGcmVxdWVuY3k6ICd2ZWMyJyxcbiAgICAgICAgICAgIHVfdHVyYnVsZW5jZU9jdGF2ZXM6ICdpbnQnLFxuICAgICAgICAgICAgdV9pc0ZyYWN0YWw6ICdib29sJyxcbiAgICAgICAgICAgIHVfdGltZTogJ2Zsb2F0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29uc3RhbnQ6IGBcbiR7bm9pc2V9XG5cbmNvbnN0IGludCBNQVhfT0NUQVZFUyA9IDk7XG5cbmZsb2F0IHR1cmJ1bGVuY2UgKHZlYzMgc2VlZCwgdmVjMiBmcmVxdWVuY3ksIGludCBudW1PY3RhdmVzLCBib29sIGlzRnJhY3RhbCkge1xuICAgIGZsb2F0IHN1bSA9IDAuMDtcbiAgICB2ZWMzIHBvc2l0aW9uID0gdmVjMygwLjApO1xuICAgIHBvc2l0aW9uLnggPSBzZWVkLnggKiBmcmVxdWVuY3kueDtcbiAgICBwb3NpdGlvbi55ID0gc2VlZC55ICogZnJlcXVlbmN5Lnk7XG4gICAgcG9zaXRpb24ueiA9IHNlZWQuejtcbiAgICBmbG9hdCByYXRpbyA9IDEuMDtcblxuICAgIGZvciAoaW50IG9jdGF2ZSA9IDA7IG9jdGF2ZSA8PSBNQVhfT0NUQVZFUzsgb2N0YXZlKyspIHtcbiAgICAgICAgaWYgKG9jdGF2ZSA+IG51bU9jdGF2ZXMpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRnJhY3RhbCkge1xuICAgICAgICAgICAgc3VtICs9IG5vaXNlKHBvc2l0aW9uKSAvIHJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3VtICs9IGFicyhub2lzZShwb3NpdGlvbikpIC8gcmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgcG9zaXRpb24ueCAqPSAyLjA7XG4gICAgICAgIHBvc2l0aW9uLnkgKj0gMi4wO1xuICAgICAgICByYXRpbyAqPSAyLjA7XG4gICAgfVxuXG4gICAgaWYgKGlzRnJhY3RhbCkge1xuICAgICAgICBzdW0gPSAoc3VtICsgMS4wKSAvIDIuMDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhbXAoc3VtLCAwLjAsIDEuMCk7XG59YCxcbiAgICAgICAgICBtYWluOiBgXG4gICAgdmVjMyB0dXJidWxlbmNlU2VlZCA9IHZlYzMoZ2xfRnJhZ0Nvb3JkLnh5LCB1X3RpbWUgKiAwLjAwMDEpO1xuICAgIGZsb2F0IHR1cmJ1bGVuY2VWYWx1ZSA9IHR1cmJ1bGVuY2UodHVyYnVsZW5jZVNlZWQsIHVfdHVyYnVsZW5jZUZyZXF1ZW5jeSwgdV90dXJidWxlbmNlT2N0YXZlcywgdV9pc0ZyYWN0YWwpO1xuICAgICR7b3V0cHV0IHx8ICcnfWBcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZnJlcXVlbmN5KCkge1xuICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IHRoaXMudW5pZm9ybXNbMF0uZGF0YTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHlcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBmcmVxdWVuY3koe1xuICAgICAgICAgIHgsXG4gICAgICAgICAgeVxuICAgICAgICB9KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJykgdGhpcy51bmlmb3Jtc1swXS5kYXRhWzBdID0geDtcbiAgICAgICAgICBpZiAodHlwZW9mIHkgIT09ICd1bmRlZmluZWQnKSB0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMV0gPSB5O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBvY3RhdmVzKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zWzFdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IG9jdGF2ZXModmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzFdLmRhdGFbMF0gPSBNYXRoLm1heCgwLCBwYXJzZUludCh2YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBpc0ZyYWN0YWwoKSB7XG4gICAgICAgICAgcmV0dXJuICEhdGhpcy51bmlmb3Jtc1syXS5kYXRhWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBpc0ZyYWN0YWwodG9nZ2xlKSB7XG4gICAgICAgICAgdGhpcy51bmlmb3Jtc1syXS5kYXRhWzBdID0gK3RvZ2dsZTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgdGltZSgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51bmlmb3Jtc1szXS5kYXRhWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCB0aW1lKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy51bmlmb3Jtc1szXS5kYXRhWzBdID0gTWF0aC5tYXgoMCwgcGFyc2VGbG9hdCh2YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVuaWZvcm1zOiBbe1xuICAgICAgICAgIG5hbWU6ICd1X3R1cmJ1bGVuY2VGcmVxdWVuY3knLFxuICAgICAgICAgIHR5cGU6ICdmJyxcbiAgICAgICAgICBkYXRhOiBbZngsIGZ5XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3VfdHVyYnVsZW5jZU9jdGF2ZXMnLFxuICAgICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgICBkYXRhOiBbb2N0YXZlc11cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICd1X2lzRnJhY3RhbCcsXG4gICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgIGRhdGE6IFsrISFpc0ZyYWN0YWxdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV90aW1lJyxcbiAgICAgICAgICB0eXBlOiAnZicsXG4gICAgICAgICAgZGF0YTogW3RpbWVdXG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IE9VVFBVVF9UWVBFUyA9IHtcbiAgICAgIENPTE9SOiAnY29sb3IgPSB2ZWMzKHR1cmJ1bGVuY2VWYWx1ZSk7JyxcbiAgICAgIEFMUEhBOiAnYWxwaGEgPSB0dXJidWxlbmNlVmFsdWU7J1xuICAgIH07XG4gICAgdHVyYnVsZW5jZS5DT0xPUiA9IE9VVFBVVF9UWVBFUy5DT0xPUjtcbiAgICB0dXJidWxlbmNlLkFMUEhBID0gT1VUUFVUX1RZUEVTLkFMUEhBO1xuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGZhZGVUcmFuc2l0aW9uXG4gICAgICogQHJldHVybnMge2ZhZGVUcmFuc2l0aW9uRWZmZWN0fVxuICAgICAqIEBleGFtcGxlIGZhZGVUcmFuc2l0aW9uKClcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmYWRlICgpIHtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGVkZWYge09iamVjdH0gZmFkZVRyYW5zaXRpb25FZmZlY3RcbiAgICAgICAqIEBwcm9wZXJ0eSB7QXJyYXlCdWZmZXJWaWV3fEltYWdlRGF0YXxIVE1MSW1hZ2VFbGVtZW50fEhUTUxDYW52YXNFbGVtZW50fEhUTUxWaWRlb0VsZW1lbnR8SW1hZ2VCaXRtYXB9IHRvIG1lZGlhIHNvdXJjZSB0byB0cmFuc2l0aW9uIGludG9cbiAgICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9ncmVzcyBudW1iZXIgYmV0d2VlbiAwLjAgYW5kIDEuMFxuICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBkaXNhYmxlZFxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiBlZmZlY3QudG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlkZW8tdG8nKTtcbiAgICAgICAqIGVmZmVjdC5wcm9ncmVzcyA9IDAuNTtcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmVydGV4OiB7XG4gICAgICAgICAgYXR0cmlidXRlOiB7XG4gICAgICAgICAgICBhX3RyYW5zaXRpb25Ub1RleENvb3JkOiAndmVjMidcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1haW46IGBcbiAgICB2X3RyYW5zaXRpb25Ub1RleENvb3JkID0gYV90cmFuc2l0aW9uVG9UZXhDb29yZDtgXG4gICAgICAgIH0sXG4gICAgICAgIGZyYWdtZW50OiB7XG4gICAgICAgICAgdW5pZm9ybToge1xuICAgICAgICAgICAgdV90cmFuc2l0aW9uRW5hYmxlZDogJ2Jvb2wnLFxuICAgICAgICAgICAgdV90cmFuc2l0aW9uUHJvZ3Jlc3M6ICdmbG9hdCcsXG4gICAgICAgICAgICB1X3RyYW5zaXRpb25UbzogJ3NhbXBsZXIyRCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1haW46IGBcbiAgICBpZiAodV90cmFuc2l0aW9uRW5hYmxlZCkge1xuICAgICAgICB2ZWM0IHRhcmdldFBpeGVsID0gdGV4dHVyZTJEKHVfdHJhbnNpdGlvblRvLCB2X3RyYW5zaXRpb25Ub1RleENvb3JkKTtcbiAgICAgICAgY29sb3IgPSBtaXgoY29sb3IsIHRhcmdldFBpeGVsLnJnYiwgdV90cmFuc2l0aW9uUHJvZ3Jlc3MpO1xuICAgICAgICBhbHBoYSA9IG1peChhbHBoYSwgdGFyZ2V0UGl4ZWwuYSwgdV90cmFuc2l0aW9uUHJvZ3Jlc3MpO1xuICAgIH1gXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICAgIHJldHVybiAhdGhpcy51bmlmb3Jtc1swXS5kYXRhWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBkaXNhYmxlZChiKSB7XG4gICAgICAgICAgdGhpcy51bmlmb3Jtc1swXS5kYXRhWzBdID0gKyFiO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBwcm9ncmVzcygpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51bmlmb3Jtc1syXS5kYXRhWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBwcm9ncmVzcyhwKSB7XG4gICAgICAgICAgdGhpcy51bmlmb3Jtc1syXS5kYXRhWzBdID0gcDtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgdG8oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZXNbMF0uZGF0YTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgdG8obWVkaWEpIHtcbiAgICAgICAgICB0aGlzLnRleHR1cmVzWzBdLmRhdGEgPSBtZWRpYTtcbiAgICAgICAgfSxcblxuICAgICAgICB2YXJ5aW5nOiB7XG4gICAgICAgICAgdl90cmFuc2l0aW9uVG9UZXhDb29yZDogJ3ZlYzInXG4gICAgICAgIH0sXG4gICAgICAgIHVuaWZvcm1zOiBbe1xuICAgICAgICAgIG5hbWU6ICd1X3RyYW5zaXRpb25FbmFibGVkJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV90cmFuc2l0aW9uVG8nLFxuICAgICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgICBkYXRhOiBbMV1cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICd1X3RyYW5zaXRpb25Qcm9ncmVzcycsXG4gICAgICAgICAgdHlwZTogJ2YnLFxuICAgICAgICAgIGRhdGE6IFswXVxuICAgICAgICB9XSxcbiAgICAgICAgYXR0cmlidXRlczogW3tcbiAgICAgICAgICBuYW1lOiAnYV90cmFuc2l0aW9uVG9UZXhDb29yZCcsXG4gICAgICAgICAgZXh0ZW5kczogJ2FfdGV4Q29vcmQnXG4gICAgICAgIH1dLFxuICAgICAgICB0ZXh0dXJlczogW3tcbiAgICAgICAgICBmb3JtYXQ6ICdSR0JBJyxcbiAgICAgICAgICB1cGRhdGU6IHRydWVcbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGRpc3BsYWNlbWVudFRyYW5zaXRpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAgICAgKiBAcGFyYW0ge3t4OiBudW1iZXI9MC4wLCB5OiBudW1iZXI9MC4wfX0gW3BhcmFtcy5zb3VyY2VTY2FsZV0gaW5pdGlhbCBkaXNwbGFjZW1lbnQgc2NhbGUgdmFsdWVzIG9mIHNvdXJjZSBtZWRpYVxuICAgICAqIEBwYXJhbSB7e3g6IG51bWJlcj0wLjAsIHk6IG51bWJlcj0wLjB9fSBbcGFyYW1zLnRvU2NhbGVdIGluaXRpYWwgZGlzcGxhY2VtZW50IHNjYWxlIHZhbHVlcyBvZiB0YXJnZXQgbWVkaWFcbiAgICAgKiBAcmV0dXJucyB7ZGlzcGxhY2VtZW50VHJhbnNpdGlvbkVmZmVjdH1cbiAgICAgKiBAZXhhbXBsZSBkaXNwbGFjZW1lbnRUcmFuc2l0aW9uKClcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkaXNwbGFjZW1lbnRUcmFuc2l0aW9uICh7XG4gICAgICBzb3VyY2VTY2FsZSxcbiAgICAgIHRvU2NhbGVcbiAgICB9ID0ge30pIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgeDogc1N4LFxuICAgICAgICB5OiBzU3lcbiAgICAgIH0gPSBzb3VyY2VTY2FsZSB8fCB7XG4gICAgICAgIHg6IDAuMCxcbiAgICAgICAgeTogMC4wXG4gICAgICB9O1xuICAgICAgY29uc3Qge1xuICAgICAgICB4OiB0U3gsXG4gICAgICAgIHk6IHRTeVxuICAgICAgfSA9IHRvU2NhbGUgfHwge1xuICAgICAgICB4OiAwLjAsXG4gICAgICAgIHk6IDAuMFxuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGVkZWYge09iamVjdH0gZGlzcGxhY2VtZW50VHJhbnNpdGlvbkVmZmVjdFxuICAgICAgICogQHByb3BlcnR5IHtBcnJheUJ1ZmZlclZpZXd8SW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SFRNTENhbnZhc0VsZW1lbnR8SFRNTFZpZGVvRWxlbWVudHxJbWFnZUJpdG1hcH0gdG8gbWVkaWEgc291cmNlIHRvIHRyYW5zaXRpb24gaW50b1xuICAgICAgICogQHByb3BlcnR5IHtBcnJheUJ1ZmZlclZpZXd8SW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SFRNTENhbnZhc0VsZW1lbnR8SFRNTFZpZGVvRWxlbWVudHxJbWFnZUJpdG1hcH0gbWFwIGRpc3BsYWNlbWVudCBtYXAgdG8gdXNlXG4gICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gcHJvZ3Jlc3MgbnVtYmVyIGJldHdlZW4gMC4wIGFuZCAxLjBcbiAgICAgICAqIEBwcm9wZXJ0eSB7e3g6IG51bWJlcj8sIHk6IG51bWJlcj99fSBzb3VyY2VTY2FsZSBkaXNwbGFjZW1lbnQgc2NhbGUgdmFsdWVzIG9mIHNvdXJjZSBtZWRpYVxuICAgICAgICogQHByb3BlcnR5IHt7eDogbnVtYmVyPywgeTogbnVtYmVyP319IHRvU2NhbGUgZGlzcGxhY2VtZW50IHNjYWxlIHZhbHVlcyBvZiB0YXJnZXQgbWVkaWFcbiAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGlzYWJsZWRcbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgKiBpbWcuc3JjID0gJ2Rpc3AuanBnJztcbiAgICAgICAqIGVmZmVjdC5tYXAgPSBpbWc7XG4gICAgICAgKiBlZmZlY3QudG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlkZW8tdG8nKTtcbiAgICAgICAqIGVmZmVjdC5zb3VyY2VTY2FsZSA9IHt4OiAwLjR9O1xuICAgICAgICogZWZmZWN0LnRvU2NhbGUgPSB7eDogMC44fTtcbiAgICAgICAqL1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2ZXJ0ZXg6IHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IHtcbiAgICAgICAgICAgIGFfdHJhbnNpdGlvblRvVGV4Q29vcmQ6ICd2ZWMyJyxcbiAgICAgICAgICAgIGFfdHJhbnNpdGlvbkRpc3BNYXBUZXhDb29yZDogJ3ZlYzInXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtYWluOiBgXG4gICAgdl90cmFuc2l0aW9uVG9UZXhDb29yZCA9IGFfdHJhbnNpdGlvblRvVGV4Q29vcmQ7XG4gICAgdl90cmFuc2l0aW9uRGlzcE1hcFRleENvb3JkID0gYV90cmFuc2l0aW9uRGlzcE1hcFRleENvb3JkO2BcbiAgICAgICAgfSxcbiAgICAgICAgZnJhZ21lbnQ6IHtcbiAgICAgICAgICB1bmlmb3JtOiB7XG4gICAgICAgICAgICB1X3RyYW5zaXRpb25FbmFibGVkOiAnYm9vbCcsXG4gICAgICAgICAgICB1X3RyYW5zaXRpb25UbzogJ3NhbXBsZXIyRCcsXG4gICAgICAgICAgICB1X3RyYW5zaXRpb25EaXNwTWFwOiAnc2FtcGxlcjJEJyxcbiAgICAgICAgICAgIHVfdHJhbnNpdGlvblByb2dyZXNzOiAnZmxvYXQnLFxuICAgICAgICAgICAgdV9zb3VyY2VEaXNwU2NhbGU6ICd2ZWMyJyxcbiAgICAgICAgICAgIHVfdG9EaXNwU2NhbGU6ICd2ZWMyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc291cmNlOiBgXG4gICAgdmVjMyB0cmFuc0Rpc3BNYXAgPSB2ZWMzKDEuMCk7XG4gICAgdmVjMiB0cmFuc0Rpc3BWZWMgPSB2ZWMyKDAuMCk7XG5cbiAgICBpZiAodV90cmFuc2l0aW9uRW5hYmxlZCkge1xuICAgICAgICAvLyByZWFkIHRoZSBkaXNwbGFjZW1lbnQgdGV4dHVyZSBvbmNlIGFuZCBjcmVhdGUgdGhlIGRpc3BsYWNlbWVudCBtYXBcbiAgICAgICAgdHJhbnNEaXNwTWFwID0gdGV4dHVyZTJEKHVfdHJhbnNpdGlvbkRpc3BNYXAsIHZfdHJhbnNpdGlvbkRpc3BNYXBUZXhDb29yZCkucmdiIC0gMC41O1xuXG4gICAgICAgIC8vIHByZXBhcmUgdGhlIHNvdXJjZSBjb29yZGluYXRlcyBmb3Igc2FtcGxpbmdcbiAgICAgICAgdHJhbnNEaXNwVmVjID0gdmVjMih1X3NvdXJjZURpc3BTY2FsZS54ICogdHJhbnNEaXNwTWFwLnIsIHVfc291cmNlRGlzcFNjYWxlLnkgKiB0cmFuc0Rpc3BNYXAuZyk7XG4gICAgICAgIHNvdXJjZUNvb3JkID0gY2xhbXAoc291cmNlQ29vcmQgKyB0cmFuc0Rpc3BWZWMgKiB1X3RyYW5zaXRpb25Qcm9ncmVzcywgMC4wLCAxLjApO1xuICAgIH1gLFxuICAgICAgICAgIG1haW46IGBcbiAgICBpZiAodV90cmFuc2l0aW9uRW5hYmxlZCkge1xuICAgICAgICAvLyBwcmVwYXJlIHRoZSB0YXJnZXQgY29vcmRpbmF0ZXMgZm9yIHNhbXBsaW5nXG4gICAgICAgIHRyYW5zRGlzcFZlYyA9IHZlYzIodV90b0Rpc3BTY2FsZS54ICogdHJhbnNEaXNwTWFwLnIsIHVfdG9EaXNwU2NhbGUueSAqIHRyYW5zRGlzcE1hcC5nKTtcbiAgICAgICAgdmVjMiB0YXJnZXRDb29yZCA9IGNsYW1wKHZfdHJhbnNpdGlvblRvVGV4Q29vcmQgKyB0cmFuc0Rpc3BWZWMgKiAoMS4wIC0gdV90cmFuc2l0aW9uUHJvZ3Jlc3MpLCAwLjAsIDEuMCk7XG5cbiAgICAgICAgLy8gc2FtcGxlIHRoZSB0YXJnZXRcbiAgICAgICAgdmVjNCB0YXJnZXRQaXhlbCA9IHRleHR1cmUyRCh1X3RyYW5zaXRpb25UbywgdGFyZ2V0Q29vcmQpO1xuXG4gICAgICAgIC8vIG1peCB0aGUgcmVzdWx0cyBvZiBzb3VyY2UgYW5kIHRhcmdldFxuICAgICAgICBjb2xvciA9IG1peChjb2xvciwgdGFyZ2V0UGl4ZWwucmdiLCB1X3RyYW5zaXRpb25Qcm9ncmVzcyk7XG4gICAgICAgIGFscGhhID0gbWl4KGFscGhhLCB0YXJnZXRQaXhlbC5hLCB1X3RyYW5zaXRpb25Qcm9ncmVzcyk7XG4gICAgfWBcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgICAgcmV0dXJuICF0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGRpc2FibGVkKGIpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzBdLmRhdGFbMF0gPSArIWI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IHByb2dyZXNzKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zWzNdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IHByb2dyZXNzKHApIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzNdLmRhdGFbMF0gPSBwO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBzb3VyY2VTY2FsZSgpIHtcbiAgICAgICAgICBjb25zdCBbeCwgeV0gPSB0aGlzLnVuaWZvcm1zWzRdLmRhdGE7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgc291cmNlU2NhbGUoe1xuICAgICAgICAgIHgsXG4gICAgICAgICAgeVxuICAgICAgICB9KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJykgdGhpcy51bmlmb3Jtc1s0XS5kYXRhWzBdID0geDtcbiAgICAgICAgICBpZiAodHlwZW9mIHkgIT09ICd1bmRlZmluZWQnKSB0aGlzLnVuaWZvcm1zWzRdLmRhdGFbMV0gPSB5O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCB0b1NjYWxlKCkge1xuICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IHRoaXMudW5pZm9ybXNbNV0uZGF0YTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHlcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCB0b1NjYWxlKHtcbiAgICAgICAgICB4LFxuICAgICAgICAgIHlcbiAgICAgICAgfSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcpIHRoaXMudW5pZm9ybXNbNV0uZGF0YVswXSA9IHg7XG4gICAgICAgICAgaWYgKHR5cGVvZiB5ICE9PSAndW5kZWZpbmVkJykgdGhpcy51bmlmb3Jtc1s1XS5kYXRhWzFdID0geTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgdG8oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGV4dHVyZXNbMF0uZGF0YTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgdG8obWVkaWEpIHtcbiAgICAgICAgICB0aGlzLnRleHR1cmVzWzBdLmRhdGEgPSBtZWRpYTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgbWFwKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRleHR1cmVzWzFdLmRhdGE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IG1hcChpbWcpIHtcbiAgICAgICAgICB0aGlzLnRleHR1cmVzWzFdLmRhdGEgPSBpbWc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFyeWluZzoge1xuICAgICAgICAgIHZfdHJhbnNpdGlvblRvVGV4Q29vcmQ6ICd2ZWMyJyxcbiAgICAgICAgICB2X3RyYW5zaXRpb25EaXNwTWFwVGV4Q29vcmQ6ICd2ZWMyJ1xuICAgICAgICB9LFxuICAgICAgICB1bmlmb3JtczogW3tcbiAgICAgICAgICBuYW1lOiAndV90cmFuc2l0aW9uRW5hYmxlZCcsXG4gICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgIGRhdGE6IFsxXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3VfdHJhbnNpdGlvblRvJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzFdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV90cmFuc2l0aW9uRGlzcE1hcCcsXG4gICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgIGRhdGE6IFsyXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3VfdHJhbnNpdGlvblByb2dyZXNzJyxcbiAgICAgICAgICB0eXBlOiAnZicsXG4gICAgICAgICAgZGF0YTogWzBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9zb3VyY2VEaXNwU2NhbGUnLFxuICAgICAgICAgIHR5cGU6ICdmJyxcbiAgICAgICAgICBkYXRhOiBbc1N4LCBzU3ldXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV90b0Rpc3BTY2FsZScsXG4gICAgICAgICAgdHlwZTogJ2YnLFxuICAgICAgICAgIGRhdGE6IFt0U3gsIHRTeV1cbiAgICAgICAgfV0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IFt7XG4gICAgICAgICAgbmFtZTogJ2FfdHJhbnNpdGlvblRvVGV4Q29vcmQnLFxuICAgICAgICAgIGV4dGVuZHM6ICdhX3RleENvb3JkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ2FfdHJhbnNpdGlvbkRpc3BNYXBUZXhDb29yZCcsXG4gICAgICAgICAgZXh0ZW5kczogJ2FfdGV4Q29vcmQnXG4gICAgICAgIH1dLFxuICAgICAgICB0ZXh0dXJlczogW3tcbiAgICAgICAgICBmb3JtYXQ6ICdSR0JBJyxcbiAgICAgICAgICB1cGRhdGU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgIGZvcm1hdDogJ1JHQidcbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZ1bmN0aW9uIGRpc3NvbHZlVHJhbnNpdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmxvdz0wLjBdIGluaXRpYWwgbG93ZXIgZWRnZSBvZiBpbnRlcnNlY3Rpb24gc3RlcFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFyYW1zLmhpZ2g9MC4wMV0gaW5pdGlhbCBoaWdoZXIgZWRnZSBvZiBpbnRlcnNlY3Rpb24gc3RlcFxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IFtwYXJhbXMuY29sb3I9WzAsIDAsIDAsIDBdXSBjb2xvciB0byB0cmFuc2l0aW9uIHRvIGlmIG5vdCB0cmFuc2l0aW9uaW5nIHRvIG1lZGlhXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcGFyYW1zLnRleHR1cmVFbmFibGVkPXRydWVdIHdoZXRoZXIgdG8gZW5hYmxlIHRyYW5zaXRpb24gdG8gdGV4dHVyZSBpbnN0ZWFkIG9mIGNvbG9yXG4gICAgICogQHJldHVybnMge2Rpc3NvbHZlVHJhbnNpdGlvbkVmZmVjdH1cbiAgICAgKiBAZXhhbXBsZSBkaXNzb2x2ZVRyYW5zaXRpb24oKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRpc3NvbHZlICh7XG4gICAgICBsb3cgPSAwLjAsXG4gICAgICBoaWdoID0gMC4wMSxcbiAgICAgIGNvbG9yID0gWzAuMCwgMC4wLCAwLjAsIDAuMF0sXG4gICAgICB0ZXh0dXJlRW5hYmxlZCA9IHRydWVcbiAgICB9ID0ge30pIHtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGVkZWYge09iamVjdH0gZGlzc29sdmVUcmFuc2l0aW9uRWZmZWN0XG4gICAgICAgKiBAcHJvcGVydHkge0FycmF5QnVmZmVyVmlld3xJbWFnZURhdGF8SFRNTEltYWdlRWxlbWVudHxIVE1MQ2FudmFzRWxlbWVudHxIVE1MVmlkZW9FbGVtZW50fEltYWdlQml0bWFwfSB0byBtZWRpYSBzb3VyY2UgdG8gdHJhbnNpdGlvbiBpbnRvXG4gICAgICAgKiBAcHJvcGVydHkge0FycmF5QnVmZmVyVmlld3xJbWFnZURhdGF8SFRNTEltYWdlRWxlbWVudHxIVE1MQ2FudmFzRWxlbWVudHxIVE1MVmlkZW9FbGVtZW50fEltYWdlQml0bWFwfSBtYXAgZGlzc29sdmUgbWFwIHRvIHVzZVxuICAgICAgICogQHByb3BlcnR5IHtudW1iZXJbXX0gY29sb3IgYSBzb2xpZCBjb2xvciB0byB0cmFuc2l0aW9uIHRvIHdpdGggYWxwaGEgY2hhbm5lbCwgQXJyYXkgb2YgNCBudW1iZXIgaW4gcmFuZ2UgWzAuMCwgMS4wXVxuICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGxvdyBsb3dlciBlZGdlIG9mIGludGVyc2VjdGlvbiBzdGVwLCBpbiByYW5nZSBbMC4wLCAxLjBdXG4gICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gaGlnaCBoaWdoZXIgZWRnZSBvZiBpbnRlcnNlY3Rpb24gc3RlcCwgaW4gcmFuZ2UgWzAuMCwgMS4wXVxuICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHByb2dyZXNzIG51bWJlciBpbiByYW5nZSBbMC4wLCAxLjBdXG4gICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHRleHR1cmVFbmFibGVkIHdoZXRoZXIgdG8gZW5hYmxlIHRyYW5zaXRpb25pbmcgdG8gdGV4dHVyZSBpbnN0ZWFkIG9mIGNvbG9yXG4gICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRpc2FibGVkXG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICogaW1nLnNyYyA9ICdkaXNzb2x2ZS5qcGcnO1xuICAgICAgICogZWZmZWN0Lm1hcCA9IGltZztcbiAgICAgICAqIGVmZmVjdC50byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWRlby10bycpO1xuICAgICAgICogZWZmZWN0LnByb2dyZXNzID0gMC41O1xuICAgICAgICovXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2ZXJ0ZXg6IHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IHtcbiAgICAgICAgICAgIGFfdHJhbnNpdGlvblRvVGV4Q29vcmQ6ICd2ZWMyJyxcbiAgICAgICAgICAgIGFfdHJhbnNpdGlvbkRpc3NvbHZlTWFwVGV4Q29vcmQ6ICd2ZWMyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFpbjogYFxuICAgIHZfdHJhbnNpdGlvblRvVGV4Q29vcmQgPSBhX3RyYW5zaXRpb25Ub1RleENvb3JkO1xuICAgIHZfdHJhbnNpdGlvbkRpc3NvbHZlTWFwVGV4Q29vcmQgPSBhX3RyYW5zaXRpb25EaXNzb2x2ZU1hcFRleENvb3JkO2BcbiAgICAgICAgfSxcbiAgICAgICAgZnJhZ21lbnQ6IHtcbiAgICAgICAgICB1bmlmb3JtOiB7XG4gICAgICAgICAgICB1X3RyYW5zaXRpb25FbmFibGVkOiAnYm9vbCcsXG4gICAgICAgICAgICB1X2Rpc3NvbHZlVG9UZXh0dXJlRW5hYmxlZDogJ2Jvb2wnLFxuICAgICAgICAgICAgdV90cmFuc2l0aW9uUHJvZ3Jlc3M6ICdmbG9hdCcsXG4gICAgICAgICAgICB1X2Rpc3NvbHZlTG93RWRnZTogJ2Zsb2F0JyxcbiAgICAgICAgICAgIHVfZGlzc29sdmVIaWdoRWRnZTogJ2Zsb2F0JyxcbiAgICAgICAgICAgIHVfdHJhbnNpdGlvbkNvbG9yVG86ICd2ZWM0JyxcbiAgICAgICAgICAgIHVfdHJhbnNpdGlvblRvOiAnc2FtcGxlcjJEJyxcbiAgICAgICAgICAgIHVfdHJhbnNpdGlvbkRpc3NvbHZlTWFwOiAnc2FtcGxlcjJEJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFpbjogYFxuICAgIGlmICh1X3RyYW5zaXRpb25FbmFibGVkKSB7XG4gICAgICAgIHZlYzQgdGFyZ2V0UGl4ZWwgPSB1X3RyYW5zaXRpb25Db2xvclRvO1xuXG4gICAgICAgIGlmICh1X2Rpc3NvbHZlVG9UZXh0dXJlRW5hYmxlZCkge1xuICAgICAgICAgICAgdGFyZ2V0UGl4ZWwgPSB0ZXh0dXJlMkQodV90cmFuc2l0aW9uVG8sIHZfdHJhbnNpdGlvblRvVGV4Q29vcmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmVjMyB0cmFuc0Rpc3NvbHZlTWFwQ29sb3IgPSB0ZXh0dXJlMkQodV90cmFuc2l0aW9uRGlzc29sdmVNYXAsIHZfdHJhbnNpdGlvbkRpc3NvbHZlTWFwVGV4Q29vcmQpLnJnYjtcbiAgICAgICAgZmxvYXQgdHJhbnNEaXNzb2x2ZU1hcEFscGhhID0gZG90KHRyYW5zRGlzc29sdmVNYXBDb2xvciwgbHVtY29lZmYpO1xuICAgICAgICB2ZWM0IHRyYW5zRGlzc29sdmVNYXAgPSB2ZWM0KHRyYW5zRGlzc29sdmVNYXBDb2xvciwgdHJhbnNEaXNzb2x2ZU1hcEFscGhhKTtcblxuICAgICAgICBmbG9hdCBlZGdlRGVsdGEgPSB1X2Rpc3NvbHZlSGlnaEVkZ2UgLSB1X2Rpc3NvbHZlTG93RWRnZTtcbiAgICAgICAgZmxvYXQgZGlzc29sdmVQcm9ncmVzcyA9IHVfdHJhbnNpdGlvblByb2dyZXNzICogKDEuMCArIGVkZ2VEZWx0YSk7XG4gICAgICAgIHZlYzQgZGlzc29sdmVWZWN0b3IgPSBzbW9vdGhzdGVwKHVfZGlzc29sdmVMb3dFZGdlLCB1X2Rpc3NvbHZlSGlnaEVkZ2UsIGNsYW1wKHRyYW5zRGlzc29sdmVNYXAgLSAxLjAgKyBkaXNzb2x2ZVByb2dyZXNzICwgMC4wLCAxLjApKTtcblxuICAgICAgICAvLyBjb2xvciA9IGRpc3NvbHZlVmVjdG9yLnJnYjsgLy8gZGVidWdcbiAgICAgICAgY29sb3IgPSBtaXgoY29sb3IsIHRhcmdldFBpeGVsLnJnYiwgZGlzc29sdmVWZWN0b3IucmdiKTtcbiAgICAgICAgYWxwaGEgPSBtaXgoYWxwaGEsIHRhcmdldFBpeGVsLmEsIGRpc3NvbHZlVmVjdG9yLmEpO1xuICAgIH1gXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICAgIHJldHVybiAhdGhpcy51bmlmb3Jtc1swXS5kYXRhWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBkaXNhYmxlZChiKSB7XG4gICAgICAgICAgdGhpcy51bmlmb3Jtc1swXS5kYXRhWzBdID0gKyFiO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCB0ZXh0dXJlRW5hYmxlZCgpIHtcbiAgICAgICAgICByZXR1cm4gIXRoaXMudW5pZm9ybXNbN10uZGF0YVswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgdGV4dHVyZUVuYWJsZWQoYikge1xuICAgICAgICAgIHRoaXMudW5pZm9ybXNbN10uZGF0YVswXSA9ICshIWI7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IHByb2dyZXNzKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVuaWZvcm1zWzNdLmRhdGFbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IHByb2dyZXNzKHApIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzNdLmRhdGFbMF0gPSBNYXRoLm1pbihNYXRoLm1heChwLCAwLjApLCAxLjApO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBjb2xvcigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51bmlmb3Jtc1s2XS5kYXRhLnNsaWNlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IGNvbG9yKGNvbG9yVG8pIHtcbiAgICAgICAgICBjb2xvclRvLmZvckVhY2goKGMsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzTmFOKGMpKSB7XG4gICAgICAgICAgICAgIHRoaXMudW5pZm9ybXNbNl0uZGF0YVtpXSA9IGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IHRvKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRleHR1cmVzWzBdLmRhdGE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IHRvKG1lZGlhKSB7XG4gICAgICAgICAgdGhpcy50ZXh0dXJlc1swXS5kYXRhID0gbWVkaWE7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IG1hcCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlc1sxXS5kYXRhO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBtYXAoaW1nKSB7XG4gICAgICAgICAgdGhpcy50ZXh0dXJlc1sxXS5kYXRhID0gaW1nO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCBsb3coKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudW5pZm9ybXNbNF0uZGF0YVswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgbG93KGxvdykge1xuICAgICAgICAgIHRoaXMudW5pZm9ybXNbNF0uZGF0YVswXSA9IE1hdGgubWluKE1hdGgubWF4KGxvdywgMC4wKSwgdGhpcy5oaWdoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXQgaGlnaCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51bmlmb3Jtc1s1XS5kYXRhWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCBoaWdoKGhpZ2gpIHtcbiAgICAgICAgICB0aGlzLnVuaWZvcm1zWzVdLmRhdGFbMF0gPSBNYXRoLm1pbihNYXRoLm1heChoaWdoLCB0aGlzLmxvdyksIDEuMCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFyeWluZzoge1xuICAgICAgICAgIHZfdHJhbnNpdGlvblRvVGV4Q29vcmQ6ICd2ZWMyJyxcbiAgICAgICAgICB2X3RyYW5zaXRpb25EaXNzb2x2ZU1hcFRleENvb3JkOiAndmVjMidcbiAgICAgICAgfSxcbiAgICAgICAgdW5pZm9ybXM6IFt7XG4gICAgICAgICAgbmFtZTogJ3VfdHJhbnNpdGlvbkVuYWJsZWQnLFxuICAgICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgICBkYXRhOiBbMV1cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICd1X3RyYW5zaXRpb25UbycsXG4gICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgIGRhdGE6IFsxXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ3VfdHJhbnNpdGlvbkRpc3NvbHZlTWFwJyxcbiAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgZGF0YTogWzJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV90cmFuc2l0aW9uUHJvZ3Jlc3MnLFxuICAgICAgICAgIHR5cGU6ICdmJyxcbiAgICAgICAgICBkYXRhOiBbMF1cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICd1X2Rpc3NvbHZlTG93RWRnZScsXG4gICAgICAgICAgdHlwZTogJ2YnLFxuICAgICAgICAgIGRhdGE6IFtsb3ddXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9kaXNzb2x2ZUhpZ2hFZGdlJyxcbiAgICAgICAgICB0eXBlOiAnZicsXG4gICAgICAgICAgZGF0YTogW2hpZ2hdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV90cmFuc2l0aW9uQ29sb3JUbycsXG4gICAgICAgICAgdHlwZTogJ2YnLFxuICAgICAgICAgIGRhdGE6IGNvbG9yXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAndV9kaXNzb2x2ZVRvVGV4dHVyZUVuYWJsZWQnLFxuICAgICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgICBkYXRhOiBbKyEhdGV4dHVyZUVuYWJsZWRdXG4gICAgICAgIH1dLFxuICAgICAgICBhdHRyaWJ1dGVzOiBbe1xuICAgICAgICAgIG5hbWU6ICdhX3RyYW5zaXRpb25Ub1RleENvb3JkJyxcbiAgICAgICAgICBleHRlbmRzOiAnYV90ZXhDb29yZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICdhX3RyYW5zaXRpb25EaXNzb2x2ZU1hcFRleENvb3JkJyxcbiAgICAgICAgICBleHRlbmRzOiAnYV90ZXhDb29yZCdcbiAgICAgICAgfV0sXG4gICAgICAgIHRleHR1cmVzOiBbe1xuICAgICAgICAgIGZvcm1hdDogJ1JHQkEnLFxuICAgICAgICAgIHVwZGF0ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgZm9ybWF0OiAnUkdCJyxcbiAgICAgICAgICB1cGRhdGU6IGZhbHNlXG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBjb3JlID0ge1xuICAgICAgaW5pdCxcbiAgICAgIGRyYXcsXG4gICAgICBkZXN0cm95LFxuICAgICAgcmVzaXplLFxuICAgICAgZ2V0V2ViR0xDb250ZXh0LFxuICAgICAgY3JlYXRlVGV4dHVyZVxuICAgIH07XG5cbiAgICBjb25zdCB2ZXJ0ZXhTaW1wbGVUZW1wbGF0ZSA9ICh7XG4gICAgICB1bmlmb3JtID0gJycsXG4gICAgICBhdHRyaWJ1dGUgPSAnJyxcbiAgICAgIHZhcnlpbmcgPSAnJyxcbiAgICAgIGNvbnN0YW50ID0gJycsXG4gICAgICBtYWluID0gJydcbiAgICB9KSA9PiBgXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4ke3VuaWZvcm19XG4ke2F0dHJpYnV0ZX1cbmF0dHJpYnV0ZSB2ZWMyIGFfcG9zaXRpb247XG4ke3Zhcnlpbmd9XG5cbmNvbnN0IHZlYzMgbHVtY29lZmYgPSB2ZWMzKDAuMjEyNSwgMC43MTU0LCAwLjA3MjEpO1xuJHtjb25zdGFudH1cbnZvaWQgbWFpbigpIHtcbiAgICAke21haW59XG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KGFfcG9zaXRpb24ueHksIDAuMCwgMS4wKTtcbn1gO1xuXG4gICAgY29uc3QgdmVydGV4TWVkaWFUZW1wbGF0ZSA9ICh7XG4gICAgICB1bmlmb3JtID0gJycsXG4gICAgICBhdHRyaWJ1dGUgPSAnJyxcbiAgICAgIHZhcnlpbmcgPSAnJyxcbiAgICAgIGNvbnN0YW50ID0gJycsXG4gICAgICBtYWluID0gJydcbiAgICB9KSA9PiBgXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4ke3VuaWZvcm19XG4ke2F0dHJpYnV0ZX1cbmF0dHJpYnV0ZSB2ZWMyIGFfdGV4Q29vcmQ7XG5hdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uO1xuJHt2YXJ5aW5nfVxudmFyeWluZyB2ZWMyIHZfdGV4Q29vcmQ7XG5cbmNvbnN0IHZlYzMgbHVtY29lZmYgPSB2ZWMzKDAuMjEyNSwgMC43MTU0LCAwLjA3MjEpO1xuJHtjb25zdGFudH1cbnZvaWQgbWFpbigpIHtcbiAgICB2X3RleENvb3JkID0gYV90ZXhDb29yZDtcbiAgICAke21haW59XG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KGFfcG9zaXRpb24ueHksIDAuMCwgMS4wKTtcbn1gO1xuXG4gICAgY29uc3QgZnJhZ21lbnRTaW1wbGVUZW1wbGF0ZSA9ICh7XG4gICAgICB1bmlmb3JtID0gJycsXG4gICAgICB2YXJ5aW5nID0gJycsXG4gICAgICBjb25zdGFudCA9ICcnLFxuICAgICAgbWFpbiA9ICcnLFxuICAgICAgc291cmNlID0gJydcbiAgICB9KSA9PiBgXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4ke3Zhcnlpbmd9XG4ke3VuaWZvcm19XG5cbmNvbnN0IHZlYzMgbHVtY29lZmYgPSB2ZWMzKDAuMjEyNSwgMC43MTU0LCAwLjA3MjEpO1xuJHtjb25zdGFudH1cbnZvaWQgbWFpbigpIHtcbiAgICAke3NvdXJjZX1cbiAgICB2ZWMzIGNvbG9yID0gdmVjMygwLjApO1xuICAgIGZsb2F0IGFscGhhID0gMS4wO1xuICAgICR7bWFpbn1cbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApICogYWxwaGE7XG59YDtcblxuICAgIGNvbnN0IGZyYWdtZW50TWVkaWFUZW1wbGF0ZSA9ICh7XG4gICAgICB1bmlmb3JtID0gJycsXG4gICAgICB2YXJ5aW5nID0gJycsXG4gICAgICBjb25zdGFudCA9ICcnLFxuICAgICAgbWFpbiA9ICcnLFxuICAgICAgc291cmNlID0gJydcbiAgICB9KSA9PiBgXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4ke3Zhcnlpbmd9XG52YXJ5aW5nIHZlYzIgdl90ZXhDb29yZDtcbiR7dW5pZm9ybX1cbnVuaWZvcm0gc2FtcGxlcjJEIHVfc291cmNlO1xuXG5jb25zdCB2ZWMzIGx1bWNvZWZmID0gdmVjMygwLjIxMjUsIDAuNzE1NCwgMC4wNzIxKTtcbiR7Y29uc3RhbnR9XG52b2lkIG1haW4oKSB7XG4gICAgdmVjMiBzb3VyY2VDb29yZCA9IHZfdGV4Q29vcmQ7XG4gICAgJHtzb3VyY2V9XG4gICAgdmVjNCBwaXhlbCA9IHRleHR1cmUyRCh1X3NvdXJjZSwgc291cmNlQ29vcmQpO1xuICAgIHZlYzMgY29sb3IgPSBwaXhlbC5yZ2I7XG4gICAgZmxvYXQgYWxwaGEgPSBwaXhlbC5hO1xuICAgICR7bWFpbn1cbiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbG9yLCAxLjApICogYWxwaGE7XG59YDtcblxuICAgIGNvbnN0IFRFWFRVUkVfV1JBUCA9IHtcbiAgICAgIHN0cmV0Y2g6ICdDTEFNUF9UT19FREdFJyxcbiAgICAgIHJlcGVhdDogJ1JFUEVBVCcsXG4gICAgICBtaXJyb3I6ICdNSVJST1JFRF9SRVBFQVQnXG4gICAgfTtcbiAgICBjb25zdCBTSEFERVJfRVJST1JfVFlQRVMgPSB7XG4gICAgICB2ZXJ0ZXg6ICdWRVJURVgnLFxuICAgICAgZnJhZ21lbnQ6ICdGUkFHTUVOVCdcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgYSBjb21waWxlZCBXZWJHTFByb2dyYW0gZm9yIHRoZSBnaXZlbiBjYW52YXMgYW5kIGVmZmVjdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gY29uZmlnLmdsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZy5wbGFuZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGNvbmZpZy5lZmZlY3RzXG4gICAgICogQHBhcmFtIHt7d2lkdGg6IG51bWJlciwgaGVpZ250OiBudW1iZXJ9fSBbY29uZmlnLmRpbWVuc2lvbnNdXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbY29uZmlnLm5vU291cmNlXVxuICAgICAqIEByZXR1cm4ge3tnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBkYXRhOiBrYW1wb3NTY2VuZURhdGEsIFtkaW1lbnNpb25zXToge3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfX19XG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBpbml0KHtcbiAgICAgIGdsLFxuICAgICAgcGxhbmUsXG4gICAgICBlZmZlY3RzLFxuICAgICAgZGltZW5zaW9ucyxcbiAgICAgIG5vU291cmNlXG4gICAgfSkge1xuICAgICAgY29uc3QgcHJvZ3JhbURhdGEgPSBfaW5pdFByb2dyYW0oZ2wsIHBsYW5lLCBlZmZlY3RzLCBub1NvdXJjZSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdsLFxuICAgICAgICBkYXRhOiBwcm9ncmFtRGF0YSxcbiAgICAgICAgZGltZW5zaW9uczogZGltZW5zaW9ucyB8fCB7fVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgV0VCR0xfQ09OVEVYVF9TVVBQT1JURUQgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBHZXQgYSB3ZWJnbCBjb250ZXh0IGZvciB0aGUgZ2l2ZW4gY2FudmFzIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBXaWxsIHJldHVybiBgbnVsbGAgaWYgY2FuIG5vdCBnZXQgYSBjb250ZXh0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXNcbiAgICAgKiBAcmV0dXJuIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR8bnVsbH1cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGdldFdlYkdMQ29udGV4dChjYW52YXMpIHtcbiAgICAgIGxldCBjb250ZXh0O1xuICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IGZhbHNlLFxuICAgICAgICAvLyBzaG91bGQgaW1wcm92ZSBwZXJmb3JtYW5jZSAtIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI3NzQ2MDkxL3ByZXNlcnZlZHJhd2luZ2J1ZmZlci1mYWxzZS1pcy1pdC13b3J0aC10aGUtZWZmb3J0XG4gICAgICAgIGFudGlhbGlhczogZmFsc2UsXG4gICAgICAgIC8vIHNob3VsZCBpbXByb3ZlIHBlcmZvcm1hbmNlXG4gICAgICAgIGRlcHRoOiBmYWxzZSxcbiAgICAgICAgLy8gdHVybiBvZmYgZm9yIGV4cGxpY2l0bmVzcyAtIGFuZCBpbiBzb21lIGNhc2VzIHBlcmYgYm9vc3RcbiAgICAgICAgc3RlbmNpbDogZmFsc2UgLy8gdHVybiBvZmYgZm9yIGV4cGxpY2l0bmVzcyAtIGFuZCBpbiBzb21lIGNhc2VzIHBlcmYgYm9vc3RcblxuICAgICAgfTtcbiAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnLCBjb25maWcpO1xuXG4gICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICBXRUJHTF9DT05URVhUX1NVUFBPUlRFRCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKCFXRUJHTF9DT05URVhUX1NVUFBPUlRFRCkge1xuICAgICAgICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcsIGNvbmZpZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSB0aGUgdGFyZ2V0IGNhbnZhcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICogQHBhcmFtIHt7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9fSBbZGltZW5zaW9uc11cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBmdW5jdGlvbiByZXNpemUoZ2wsIGRpbWVuc2lvbnMpIHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGdsLmNhbnZhcztcbiAgICAgIGNvbnN0IHJlYWxUb0NTU1BpeGVscyA9IDE7IC8vd2luZG93LmRldmljZVBpeGVsUmF0aW87XG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodFxuICAgICAgfSA9IGRpbWVuc2lvbnMgfHwge307XG4gICAgICBsZXQgZGlzcGxheVdpZHRoLCBkaXNwbGF5SGVpZ2h0O1xuXG4gICAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XG4gICAgICAgIGRpc3BsYXlXaWR0aCA9IHdpZHRoO1xuICAgICAgICBkaXNwbGF5SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTG9va3VwIHRoZSBzaXplIHRoZSBicm93c2VyIGlzIGRpc3BsYXlpbmcgdGhlIGNhbnZhcy5cbiAgICAgICAgZGlzcGxheVdpZHRoID0gTWF0aC5mbG9vcihjYW52YXMuY2xpZW50V2lkdGggKiByZWFsVG9DU1NQaXhlbHMpO1xuICAgICAgICBkaXNwbGF5SGVpZ2h0ID0gTWF0aC5mbG9vcihjYW52YXMuY2xpZW50SGVpZ2h0ICogcmVhbFRvQ1NTUGl4ZWxzKTtcbiAgICAgIH0gLy8gQ2hlY2sgaWYgdGhlIGNhbnZhcyBpcyBub3QgdGhlIHNhbWUgc2l6ZS5cblxuXG4gICAgICBpZiAoY2FudmFzLndpZHRoICE9PSBkaXNwbGF5V2lkdGggfHwgY2FudmFzLmhlaWdodCAhPT0gZGlzcGxheUhlaWdodCkge1xuICAgICAgICAvLyBNYWtlIHRoZSBjYW52YXMgdGhlIHNhbWUgc2l6ZVxuICAgICAgICBjYW52YXMud2lkdGggPSBkaXNwbGF5V2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5SGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBnbC52aWV3cG9ydCgwLCAwLCBnbC5kcmF3aW5nQnVmZmVyV2lkdGgsIGdsLmRyYXdpbmdCdWZmZXJIZWlnaHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEcmF3IGEgZ2l2ZW4gc2NlbmVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICogQHBhcmFtIHtwbGFuZUNvbmZpZ30gcGxhbmVcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyVmlld3xJbWFnZURhdGF8SFRNTEltYWdlRWxlbWVudHxIVE1MQ2FudmFzRWxlbWVudHxIVE1MVmlkZW9FbGVtZW50fEltYWdlQml0bWFwfSBtZWRpYVxuICAgICAqIEBwYXJhbSB7a2FtcG9zU2NlbmVEYXRhfSBkYXRhXG4gICAgICogQHBhcmFtIHt7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9fSBkaW1lbnNpb25zXG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGRyYXcoZ2wsIHBsYW5lID0ge30sIG1lZGlhLCBkYXRhLCBkaW1lbnNpb25zKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHByb2dyYW0sXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgYXR0cmlidXRlcyxcbiAgICAgICAgdW5pZm9ybXMsXG4gICAgICAgIHRleHR1cmVzLFxuICAgICAgICBleHRlbnNpb25zLFxuICAgICAgICB2YW9cbiAgICAgIH0gPSBkYXRhO1xuICAgICAgY29uc3Qge1xuICAgICAgICB4U2VnbWVudHMgPSAxLFxuICAgICAgICB5U2VnbWVudHMgPSAxXG4gICAgICB9ID0gcGxhbmU7XG5cbiAgICAgIGlmIChtZWRpYSAmJiBzb3VyY2UgJiYgc291cmNlLnRleHR1cmUpIHtcbiAgICAgICAgLy8gYmluZCB0aGUgc291cmNlIHRleHR1cmVcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgc291cmNlLnRleHR1cmUpOyAvLyByZWFkIHNvdXJjZSBkYXRhIGludG8gdGV4dHVyZVxuXG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgbWVkaWEpO1xuICAgICAgfSAvLyBUZWxsIGl0IHRvIHVzZSBvdXIgcHJvZ3JhbSAocGFpciBvZiBzaGFkZXJzKVxuXG5cbiAgICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICAgIGlmICh2YW8pIHtcbiAgICAgICAgZXh0ZW5zaW9ucy52YW8uYmluZFZlcnRleEFycmF5T0VTKHZhbyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzZXQgYXR0cmlidXRlIGJ1ZmZlcnMgd2l0aCBkYXRhXG4gICAgICAgIF9lbmFibGVWZXJ0ZXhBdHRyaWJ1dGVzKGdsLCBhdHRyaWJ1dGVzKTtcbiAgICAgIH0gLy8gc2V0IHVuaWZvcm1zIHdpdGggZGF0YVxuXG5cbiAgICAgIF9zZXRVbmlmb3JtcyhnbCwgdW5pZm9ybXMpO1xuXG4gICAgICBsZXQgc3RhcnRUZXggPSBnbC5URVhUVVJFMDtcblxuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBnbC5hY3RpdmVUZXh0dXJlKHN0YXJ0VGV4KTtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgc291cmNlLnRleHR1cmUpO1xuICAgICAgICBzdGFydFRleCA9IGdsLlRFWFRVUkUxO1xuICAgICAgfVxuXG4gICAgICBpZiAodGV4dHVyZXMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0dXJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoc3RhcnRUZXggKyBpKTtcbiAgICAgICAgICBjb25zdCB0ZXggPSB0ZXh0dXJlc1tpXTtcbiAgICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXgudGV4dHVyZSk7XG5cbiAgICAgICAgICBpZiAodGV4LnVwZGF0ZSkge1xuICAgICAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbFt0ZXguZm9ybWF0XSwgZ2xbdGV4LmZvcm1hdF0sIGdsLlVOU0lHTkVEX0JZVEUsIHRleC5kYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gLy8gRHJhdyB0aGUgcmVjdGFuZ2xlc1xuXG5cbiAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2ICogeFNlZ21lbnRzICogeVNlZ21lbnRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRnJlZSBhbGwgcmVzb3VyY2VzIGF0dGFjaGVkIHRvIGEgc3BlY2lmaWMgd2ViZ2wgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICogQHBhcmFtIHtrYW1wb3NTY2VuZURhdGF9IGRhdGFcbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gZGVzdHJveShnbCwgZGF0YSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwcm9ncmFtLFxuICAgICAgICB2ZXJ0ZXhTaGFkZXIsXG4gICAgICAgIGZyYWdtZW50U2hhZGVyLFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICAgIGV4dGVuc2lvbnMsXG4gICAgICAgIHZhb1xuICAgICAgfSA9IGRhdGE7IC8vIGRlbGV0ZSBidWZmZXJzXG5cbiAgICAgIChhdHRyaWJ1dGVzIHx8IFtdKS5mb3JFYWNoKGF0dHIgPT4gZ2wuZGVsZXRlQnVmZmVyKGF0dHIuYnVmZmVyKSk7XG4gICAgICBpZiAodmFvKSBleHRlbnNpb25zLnZhby5kZWxldGVWZXJ0ZXhBcnJheU9FUyh2YW8pOyAvLyBkZWxldGUgdGV4dHVyZVxuXG4gICAgICBpZiAoc291cmNlICYmIHNvdXJjZS50ZXh0dXJlKSBnbC5kZWxldGVUZXh0dXJlKHNvdXJjZS50ZXh0dXJlKTsgLy8gZGVsZXRlIHByb2dyYW1cblxuICAgICAgZ2wuZGVsZXRlUHJvZ3JhbShwcm9ncmFtKTsgLy8gZGVsZXRlIHNoYWRlcnNcblxuICAgICAgZ2wuZGVsZXRlU2hhZGVyKHZlcnRleFNoYWRlcik7XG4gICAgICBnbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pbml0UHJvZ3JhbShnbCwgcGxhbmUsIGVmZmVjdHMsIG5vU291cmNlID0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IG5vU291cmNlID8gbnVsbCA6IHtcbiAgICAgICAgdGV4dHVyZTogY3JlYXRlVGV4dHVyZShnbCkudGV4dHVyZSxcbiAgICAgICAgYnVmZmVyOiBudWxsXG4gICAgICB9O1xuXG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIC8vIGZsaXAgWSBheGlzIGZvciBzb3VyY2UgdGV4dHVyZVxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBzb3VyY2UudGV4dHVyZSk7XG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0gX21lcmdlRWZmZWN0c0RhdGEocGxhbmUsIGVmZmVjdHMsIG5vU291cmNlKTtcblxuICAgICAgY29uc3QgdmVydGV4U3JjID0gX3N0cmluZ2lmeVNoYWRlclNyYyhkYXRhLnZlcnRleCwgbm9Tb3VyY2UgPyB2ZXJ0ZXhTaW1wbGVUZW1wbGF0ZSA6IHZlcnRleE1lZGlhVGVtcGxhdGUpO1xuXG4gICAgICBjb25zdCBmcmFnbWVudFNyYyA9IF9zdHJpbmdpZnlTaGFkZXJTcmMoZGF0YS5mcmFnbWVudCwgbm9Tb3VyY2UgPyBmcmFnbWVudFNpbXBsZVRlbXBsYXRlIDogZnJhZ21lbnRNZWRpYVRlbXBsYXRlKTsgLy8gY29tcGlsZSB0aGUgR0xTTCBwcm9ncmFtXG5cblxuICAgICAgY29uc3Qge1xuICAgICAgICBwcm9ncmFtLFxuICAgICAgICB2ZXJ0ZXhTaGFkZXIsXG4gICAgICAgIGZyYWdtZW50U2hhZGVyLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgdHlwZVxuICAgICAgfSA9IF9nZXRXZWJHTFByb2dyYW0oZ2wsIHZlcnRleFNyYywgZnJhZ21lbnRTcmMpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3R5cGV9IGVycm9yOjogJHtlcnJvcn1cXG4ke3R5cGUgPT09IFNIQURFUl9FUlJPUl9UWVBFUy5mcmFnbWVudCA/IGZyYWdtZW50U3JjIDogdmVydGV4U3JjfWApO1xuICAgICAgfVxuXG4gICAgICBsZXQgdmFvRXh0LCB2YW87XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhb0V4dCA9IGdsLmdldEV4dGVuc2lvbignT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnKTtcbiAgICAgICAgdmFvID0gdmFvRXh0LmNyZWF0ZVZlcnRleEFycmF5T0VTKCk7XG4gICAgICAgIHZhb0V4dC5iaW5kVmVydGV4QXJyYXlPRVModmFvKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsvLyBpZ25vcmVcbiAgICAgIH0gLy8gc2V0dXAgdGhlIHZlcnRleCBkYXRhXG5cblxuICAgICAgY29uc3QgYXR0cmlidXRlcyA9IF9pbml0VmVydGV4QXR0cmlidXRlcyhnbCwgcHJvZ3JhbSwgZGF0YS5hdHRyaWJ1dGVzKTtcblxuICAgICAgaWYgKHZhbykge1xuICAgICAgICBfZW5hYmxlVmVydGV4QXR0cmlidXRlcyhnbCwgYXR0cmlidXRlcyk7XG5cbiAgICAgICAgdmFvRXh0LmJpbmRWZXJ0ZXhBcnJheU9FUyhudWxsKTtcbiAgICAgIH0gLy8gc2V0dXAgdW5pZm9ybXNcblxuXG4gICAgICBjb25zdCB1bmlmb3JtcyA9IF9pbml0VW5pZm9ybXMoZ2wsIHByb2dyYW0sIGRhdGEudW5pZm9ybXMpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBleHRlbnNpb25zOiB7XG4gICAgICAgICAgdmFvOiB2YW9FeHRcbiAgICAgICAgfSxcbiAgICAgICAgcHJvZ3JhbSxcbiAgICAgICAgdmVydGV4U2hhZGVyLFxuICAgICAgICBmcmFnbWVudFNoYWRlcixcbiAgICAgICAgc291cmNlLFxuICAgICAgICBhdHRyaWJ1dGVzLFxuICAgICAgICB1bmlmb3JtcyxcbiAgICAgICAgdGV4dHVyZXM6IGRhdGEudGV4dHVyZXMsXG4gICAgICAgIHZhb1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfbWVyZ2VFZmZlY3RzRGF0YShwbGFuZSwgZWZmZWN0cywgbm9Tb3VyY2UgPSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGVmZmVjdHMucmVkdWNlKChyZXN1bHQsIGNvbmZpZykgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgYXR0cmlidXRlcyA9IFtdLFxuICAgICAgICAgIHVuaWZvcm1zID0gW10sXG4gICAgICAgICAgdGV4dHVyZXMgPSBbXSxcbiAgICAgICAgICB2YXJ5aW5nID0ge31cbiAgICAgICAgfSA9IGNvbmZpZztcblxuICAgICAgICBjb25zdCBtZXJnZSA9IHNoYWRlciA9PiBPYmplY3Qua2V5cyhjb25maWdbc2hhZGVyXSB8fCB7fSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIGlmIChrZXkgPT09ICdjb25zdGFudCcgfHwga2V5ID09PSAnbWFpbicgfHwga2V5ID09PSAnc291cmNlJykge1xuICAgICAgICAgICAgcmVzdWx0W3NoYWRlcl1ba2V5XSArPSBjb25maWdbc2hhZGVyXVtrZXldICsgJ1xcbic7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtzaGFkZXJdW2tleV0gPSB7IC4uLnJlc3VsdFtzaGFkZXJdW2tleV0sXG4gICAgICAgICAgICAgIC4uLmNvbmZpZ1tzaGFkZXJdW2tleV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZXJnZSgndmVydGV4Jyk7XG4gICAgICAgIG1lcmdlKCdmcmFnbWVudCcpO1xuICAgICAgICBhdHRyaWJ1dGVzLmZvckVhY2goYXR0cmlidXRlID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IHJlc3VsdC5hdHRyaWJ1dGVzLnNvbWUoYXR0ciA9PiB7XG4gICAgICAgICAgICBpZiAoYXR0ci5uYW1lID09PSBhdHRyaWJ1dGUubmFtZSkge1xuICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGF0dHIsIGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgcmVzdWx0LmF0dHJpYnV0ZXMucHVzaChhdHRyaWJ1dGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdC5hdHRyaWJ1dGVzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAgICAgaWYgKGF0dHIuZXh0ZW5kcykge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSByZXN1bHQuYXR0cmlidXRlcy5zb21lKGF0dHJUb0V4dGVuZCA9PiB7XG4gICAgICAgICAgICAgIGlmIChhdHRyVG9FeHRlbmQubmFtZSA9PT0gYXR0ci5leHRlbmRzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihhdHRyLCBhdHRyVG9FeHRlbmQsIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IGF0dHIubmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGF0dHJpYnV0ZSAke2F0dHIuZXh0ZW5kc30gdG8gZXh0ZW5kYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0LnVuaWZvcm1zLnB1c2goLi4udW5pZm9ybXMpO1xuICAgICAgICByZXN1bHQudGV4dHVyZXMucHVzaCguLi50ZXh0dXJlcyk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LnZlcnRleC52YXJ5aW5nLCB2YXJ5aW5nKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQuZnJhZ21lbnQudmFyeWluZywgdmFyeWluZyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCBnZXRFZmZlY3REZWZhdWx0cyhwbGFuZSwgbm9Tb3VyY2UpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0UGxhbmVDb29yZHMoe1xuICAgICAgeEVuZCxcbiAgICAgIHlFbmQsXG4gICAgICBmYWN0b3JcbiAgICB9LCBwbGFuZSA9IHt9KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHhTZWdtZW50cyA9IDEsXG4gICAgICAgIHlTZWdtZW50cyA9IDFcbiAgICAgIH0gPSBwbGFuZTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHhTZWdtZW50czsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgeVNlZ21lbnRzOyBqKyspIHtcbiAgICAgICAgICAvKiBBICovXG4gICAgICAgICAgcmVzdWx0LnB1c2goeEVuZCAqIGkgLyB4U2VnbWVudHMgLSBmYWN0b3IsIHlFbmQgKiBqIC8geVNlZ21lbnRzIC0gZmFjdG9yKTtcbiAgICAgICAgICAvKiBCICovXG5cbiAgICAgICAgICByZXN1bHQucHVzaCh4RW5kICogaSAvIHhTZWdtZW50cyAtIGZhY3RvciwgeUVuZCAqIChqICsgMSkgLyB5U2VnbWVudHMgLSBmYWN0b3IpO1xuICAgICAgICAgIC8qIEMgKi9cblxuICAgICAgICAgIHJlc3VsdC5wdXNoKHhFbmQgKiAoaSArIDEpIC8geFNlZ21lbnRzIC0gZmFjdG9yLCB5RW5kICogaiAvIHlTZWdtZW50cyAtIGZhY3Rvcik7XG4gICAgICAgICAgLyogRCAqL1xuXG4gICAgICAgICAgcmVzdWx0LnB1c2goeEVuZCAqIChpICsgMSkgLyB4U2VnbWVudHMgLSBmYWN0b3IsIHlFbmQgKiBqIC8geVNlZ21lbnRzIC0gZmFjdG9yKTtcbiAgICAgICAgICAvKiBFICovXG5cbiAgICAgICAgICByZXN1bHQucHVzaCh4RW5kICogaSAvIHhTZWdtZW50cyAtIGZhY3RvciwgeUVuZCAqIChqICsgMSkgLyB5U2VnbWVudHMgLSBmYWN0b3IpO1xuICAgICAgICAgIC8qIEYgKi9cblxuICAgICAgICAgIHJlc3VsdC5wdXNoKHhFbmQgKiAoaSArIDEpIC8geFNlZ21lbnRzIC0gZmFjdG9yLCB5RW5kICogKGogKyAxKSAvIHlTZWdtZW50cyAtIGZhY3Rvcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFZmZlY3REZWZhdWx0cyhwbGFuZSwgbm9Tb3VyY2UpIHtcbiAgICAgIC8qXG4gICAgICAgKiBEZWZhdWx0IHVuaWZvcm1zXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHVuaWZvcm1zID0gbm9Tb3VyY2UgPyBbXSA6IFt7XG4gICAgICAgIG5hbWU6ICd1X3NvdXJjZScsXG4gICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgZGF0YTogWzBdXG4gICAgICB9XTtcbiAgICAgIC8qXG4gICAgICAgKiBEZWZhdWx0IGF0dHJpYnV0ZXNcbiAgICAgICAqL1xuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzID0gW3tcbiAgICAgICAgbmFtZTogJ2FfcG9zaXRpb24nLFxuICAgICAgICBkYXRhOiBuZXcgRmxvYXQzMkFycmF5KF9nZXRQbGFuZUNvb3Jkcyh7XG4gICAgICAgICAgeEVuZDogMixcbiAgICAgICAgICB5RW5kOiAyLFxuICAgICAgICAgIGZhY3RvcjogMVxuICAgICAgICB9LCBwbGFuZSkpLFxuICAgICAgICBzaXplOiAyLFxuICAgICAgICB0eXBlOiAnRkxPQVQnXG4gICAgICB9XTtcblxuICAgICAgaWYgKCFub1NvdXJjZSkge1xuICAgICAgICBhdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6ICdhX3RleENvb3JkJyxcbiAgICAgICAgICBkYXRhOiBuZXcgRmxvYXQzMkFycmF5KF9nZXRQbGFuZUNvb3Jkcyh7XG4gICAgICAgICAgICB4RW5kOiAxLFxuICAgICAgICAgICAgeUVuZDogMSxcbiAgICAgICAgICAgIGZhY3RvcjogMFxuICAgICAgICAgIH0sIHBsYW5lKSksXG4gICAgICAgICAgc2l6ZTogMixcbiAgICAgICAgICB0eXBlOiAnRkxPQVQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2ZXJ0ZXg6IHtcbiAgICAgICAgICB1bmlmb3JtOiB7fSxcbiAgICAgICAgICBhdHRyaWJ1dGU6IHt9LFxuICAgICAgICAgIHZhcnlpbmc6IHt9LFxuICAgICAgICAgIGNvbnN0YW50OiAnJyxcbiAgICAgICAgICBtYWluOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBmcmFnbWVudDoge1xuICAgICAgICAgIHVuaWZvcm06IHt9LFxuICAgICAgICAgIHZhcnlpbmc6IHt9LFxuICAgICAgICAgIGNvbnN0YW50OiAnJyxcbiAgICAgICAgICBtYWluOiAnJyxcbiAgICAgICAgICBzb3VyY2U6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICAgIHVuaWZvcm1zLFxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIERlZmF1bHQgdGV4dHVyZXNcbiAgICAgICAgICovXG4gICAgICAgIHRleHR1cmVzOiBbXVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc3RyaW5naWZ5U2hhZGVyU3JjKGRhdGEsIHRlbXBsYXRlKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZURhdGEgPSBPYmplY3QuZW50cmllcyhkYXRhKS5yZWR1Y2UoKHJlc3VsdCwgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGlmIChbJ3VuaWZvcm0nLCAnYXR0cmlidXRlJywgJ3ZhcnlpbmcnXS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBPYmplY3QuZW50cmllcyh2YWx1ZSkucmVkdWNlKChzdHIsIFtuYW1lLCB0eXBlXSkgPT4gc3RyICsgYCR7a2V5fSAke3R5cGV9ICR7bmFtZX07XFxuYCwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwge30pO1xuICAgICAgcmV0dXJuIHRlbXBsYXRlKHRlbXBsYXRlRGF0YSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldFdlYkdMUHJvZ3JhbShnbCwgdmVydGV4U3JjLCBmcmFnbWVudFNyYykge1xuICAgICAgY29uc3QgdmVydGV4U2hhZGVyID0gX2NyZWF0ZVNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdmVydGV4U3JjKTtcblxuICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBfY3JlYXRlU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZyYWdtZW50U3JjKTtcblxuICAgICAgaWYgKHZlcnRleFNoYWRlci5lcnJvcikge1xuICAgICAgICByZXR1cm4gdmVydGV4U2hhZGVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoZnJhZ21lbnRTaGFkZXIuZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50U2hhZGVyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX2NyZWF0ZVByb2dyYW0oZ2wsIHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKSB7XG4gICAgICBjb25zdCBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgICBjb25zdCBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG5cbiAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJvZ3JhbSxcbiAgICAgICAgICB2ZXJ0ZXhTaGFkZXIsXG4gICAgICAgICAgZnJhZ21lbnRTaGFkZXJcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhjZXB0aW9uID0ge1xuICAgICAgICBlcnJvcjogZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSksXG4gICAgICAgIHR5cGU6ICdwcm9ncmFtJ1xuICAgICAgfTtcbiAgICAgIGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICByZXR1cm4gZXhjZXB0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVTaGFkZXIoZ2wsIHR5cGUsIHNvdXJjZSkge1xuICAgICAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG5cbiAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiBzaGFkZXI7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4Y2VwdGlvbiA9IHtcbiAgICAgICAgZXJyb3I6IGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSxcbiAgICAgICAgdHlwZTogdHlwZSA9PT0gZ2wuVkVSVEVYX1NIQURFUiA/IFNIQURFUl9FUlJPUl9UWVBFUy52ZXJ0ZXggOiBTSEFERVJfRVJST1JfVFlQRVMuZnJhZ21lbnRcbiAgICAgIH07XG4gICAgICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbiAgICAgIHJldHVybiBleGNlcHRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFdlYkdMVGV4dHVyZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb25maWcud2lkdGhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29uZmlnLmhlaWdodFxuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJWaWV3fEltYWdlRGF0YXxIVE1MSW1hZ2VFbGVtZW50fEhUTUxDYW52YXNFbGVtZW50fEhUTUxWaWRlb0VsZW1lbnR8SW1hZ2VCaXRtYXB9IGNvbmZpZy5kYXRhXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpZy5mb3JtYXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnLndyYXBcbiAgICAgKiBAcmV0dXJuIHt7dGV4dHVyZTogV2ViR0xUZXh0dXJlLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHR1cmUoZ2wsIHtcbiAgICAgIHdpZHRoID0gMSxcbiAgICAgIGhlaWdodCA9IDEsXG4gICAgICBkYXRhID0gbnVsbCxcbiAgICAgIGZvcm1hdCA9ICdSR0JBJyxcbiAgICAgIHdyYXAgPSAnc3RyZXRjaCdcbiAgICB9ID0ge30pIHtcbiAgICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTsgLy8gU2V0IHRoZSBwYXJhbWV0ZXJzIHNvIHdlIGNhbiByZW5kZXIgYW55IHNpemUgaW1hZ2VcblxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2xbX2dldFRleHR1cmVXcmFwKHdyYXAueCB8fCB3cmFwKV0pO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2xbX2dldFRleHR1cmVXcmFwKHdyYXAueSB8fCB3cmFwKV0pO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuXG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICAvLyBVcGxvYWQgdGhlIGltYWdlIGludG8gdGhlIHRleHR1cmVcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbFtmb3JtYXRdLCBnbFtmb3JtYXRdLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENyZWF0ZSBlbXB0eSB0ZXh0dXJlXG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2xbZm9ybWF0XSwgd2lkdGgsIGhlaWdodCwgMCwgZ2xbZm9ybWF0XSwgZ2wuVU5TSUdORURfQllURSwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHR1cmUsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIGZvcm1hdFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlQnVmZmVyKGdsLCBwcm9ncmFtLCBuYW1lLCBkYXRhKSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIG5hbWUpO1xuICAgICAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBkYXRhLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgYnVmZmVyXG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pbml0VmVydGV4QXR0cmlidXRlcyhnbCwgcHJvZ3JhbSwgZGF0YSkge1xuICAgICAgcmV0dXJuIChkYXRhIHx8IFtdKS5tYXAoYXR0ciA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICBidWZmZXJcbiAgICAgICAgfSA9IF9jcmVhdGVCdWZmZXIoZ2wsIHByb2dyYW0sIGF0dHIubmFtZSwgYXR0ci5kYXRhKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGF0dHIubmFtZSxcbiAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgdHlwZTogYXR0ci50eXBlLFxuICAgICAgICAgIHNpemU6IGF0dHIuc2l6ZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2luaXRVbmlmb3JtcyhnbCwgcHJvZ3JhbSwgdW5pZm9ybXMpIHtcbiAgICAgIHJldHVybiAodW5pZm9ybXMgfHwgW10pLm1hcCh1bmlmb3JtID0+IHtcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgdW5pZm9ybS5uYW1lKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICBzaXplOiB1bmlmb3JtLnNpemUgfHwgdW5pZm9ybS5kYXRhLmxlbmd0aCxcbiAgICAgICAgICB0eXBlOiB1bmlmb3JtLnR5cGUsXG4gICAgICAgICAgZGF0YTogdW5pZm9ybS5kYXRhXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfc2V0VW5pZm9ybXMoZ2wsIHVuaWZvcm1EYXRhKSB7XG4gICAgICAodW5pZm9ybURhdGEgfHwgW10pLmZvckVhY2godW5pZm9ybSA9PiB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgc2l6ZSxcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGxvY2F0aW9uLFxuICAgICAgICAgIGRhdGFcbiAgICAgICAgfSA9IHVuaWZvcm07XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdpJykge1xuICAgICAgICAgIGRhdGEgPSBuZXcgSW50MzJBcnJheShkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdsW2B1bmlmb3JtJHtzaXplfSR7dHlwZX12YF0obG9jYXRpb24sIGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2VuYWJsZVZlcnRleEF0dHJpYnV0ZXMoZ2wsIGF0dHJpYnV0ZXMpIHtcbiAgICAgIChhdHRyaWJ1dGVzIHx8IFtdKS5mb3JFYWNoKGF0dHJpYiA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgc2l6ZSxcbiAgICAgICAgICB0eXBlXG4gICAgICAgIH0gPSBhdHRyaWI7XG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24sIHNpemUsIGdsW3R5cGVdLCBmYWxzZSwgMCwgMCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0VGV4dHVyZVdyYXAoa2V5KSB7XG4gICAgICByZXR1cm4gVEVYVFVSRV9XUkFQW2tleV0gfHwgVEVYVFVSRV9XUkFQWydzdHJldGNoJ107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGVkZWYge09iamVjdH0ga2FtcG9zU2NlbmVEYXRhXG4gICAgICogQHByb3BlcnR5IHtXZWJHTFByb2dyYW19IHByb2dyYW1cbiAgICAgKiBAcHJvcGVydHkge3t2YW86IE9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0P319IGV4dGVuc2lvbnNcbiAgICAgKiBAcHJvcGVydHkge1dlYkdMU2hhZGVyfSB2ZXJ0ZXhTaGFkZXJcbiAgICAgKiBAcHJvcGVydHkge1dlYkdMU2hhZGVyfSBmcmFnbWVudFNoYWRlclxuICAgICAqIEBwcm9wZXJ0eSB7a2FtcG9zVGFyZ2V0fSBzb3VyY2VcbiAgICAgKiBAcHJvcGVydHkge2thbXBvc0F0dHJpYnV0ZVtdfSBhdHRyaWJ1dGVzXG4gICAgICogQHByb3BlcnR5IHtXZWJHTFZlcnRleEFycmF5T2JqZWN0T0VTfSBbdmFvXVxuICAgICAqXG4gICAgICogQHR5cGVkZWYge09iamVjdH0ga2FtcG9zVGFyZ2V0XG4gICAgICogQHByb3BlcnR5IHtXZWJHTFRleHR1cmV9IHRleHR1cmVcbiAgICAgKiBAcHJvcGVydHkge1dlYkdMRnJhbWVidWZmZXJ8bnVsbH0gYnVmZmVyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IFt3aWR0aF1cbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gW2hlaWdodF1cbiAgICAgKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IGthbXBvc0F0dHJpYnV0ZVxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHByb3BlcnR5IHtHTGludH0gbG9jYXRpb25cbiAgICAgKiBAcHJvcGVydHkge1dlYkdMQnVmZmVyfSBidWZmZXJcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gdHlwZVxuICAgICAgIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaXplXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGEgV2ViR0wgdGFyZ2V0IHdpdGggZWZmZWN0cy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBLYW1wb3NcbiAgICAgKiBAcGFyYW0ge2thbXBvc0NvbmZpZ30gY29uZmlnXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpbXBvcnQgeyBLYW1wb3MsIGVmZmVjdHN9IGZyb20gJ2thbXBvcyc7XG4gICAgICpcbiAgICAgKiBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FudmFzJyk7XG4gICAgICogY29uc3QgaHVlU2F0ID0gZWZmZWN0cy5odWVTYXR1cmF0aW9uKCk7XG4gICAgICogY29uc3Qga2FtcG9zID0gbmV3IEthbXBvcyh7dGFyZ2V0LCBlZmZlY3RzOiBbaHVlU2F0XX0pO1xuICAgICAqL1xuXG4gICAgY2xhc3MgS2FtcG9zIHtcbiAgICAgIC8qKlxuICAgICAgICogQGNvbnN0cnVjdG9yXG4gICAgICAgKi9cbiAgICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBpZiAoIWNvbmZpZyB8fCAhY29uZmlnLnRhcmdldCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSB0YXJnZXQgY2FudmFzIHdhcyBub3QgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChLYW1wb3MucHJldmVudENvbnRleHRDcmVhdGlvbikgdGhyb3cgbmV3IEVycm9yKCdDb250ZXh0IGNyZWF0aW9uIGlzIHByZXZlbnRlZCcpO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHRDcmVhdGlvbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIEthbXBvcy5wcmV2ZW50Q29udGV4dENyZWF0aW9uID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLm9uQ29udGV4dENyZWF0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbmZpZy5vbkNvbnRleHRDcmVhdGlvbkVycm9yLmNhbGwodGhpcywgY29uZmlnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uZmlnLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd3ZWJnbGNvbnRleHRjcmVhdGlvbmVycm9yJywgdGhpcy5fY29udGV4dENyZWF0aW9uRXJyb3IsIGZhbHNlKTtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuaW5pdChjb25maWcpO1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGNyZWF0ZSBjb250ZXh0Jyk7XG5cbiAgICAgICAgdGhpcy5fcmVzdG9yZUNvbnRleHQgPSBlID0+IHtcbiAgICAgICAgICBlICYmIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmNvbmZpZy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2ViZ2xjb250ZXh0cmVzdG9yZWQnLCB0aGlzLl9yZXN0b3JlQ29udGV4dCwgdHJ1ZSk7XG4gICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuaW5pdCgpO1xuICAgICAgICAgIGlmICghc3VjY2VzcykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX3NvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTb3VyY2UodGhpcy5fc291cmNlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWxldGUgdGhpcy5fc291cmNlO1xuXG4gICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcub25Db250ZXh0UmVzdG9yZWQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5vbkNvbnRleHRSZXN0b3JlZC5jYWxsKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fbG9zZUNvbnRleHQgPSBlID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5nbCAmJiB0aGlzLmdsLmlzQ29udGV4dExvc3QoKSkge1xuICAgICAgICAgICAgdGhpcy5sb3N0Q29udGV4dCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignd2ViZ2xjb250ZXh0cmVzdG9yZWQnLCB0aGlzLl9yZXN0b3JlQ29udGV4dCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3kodHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLm9uQ29udGV4dExvc3QpIHtcbiAgICAgICAgICAgICAgY29uZmlnLm9uQ29udGV4dExvc3QuY2FsbCh0aGlzLCBjb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNvbmZpZy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignd2ViZ2xjb250ZXh0bG9zdCcsIHRoaXMuX2xvc2VDb250ZXh0LCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogSW5pdGlhbGl6ZXMgYSBLYW1wb3MgaW5zdGFuY2UuXG4gICAgICAgKiBUaGlzIGlzIGNhbGxlZCBpbnNpZGUgdGhlIGNvbnN0cnVjdG9yLFxuICAgICAgICogYnV0IGNhbiBiZSBjYWxsZWQgYWdhaW4gYWZ0ZXIgZWZmZWN0cyBoYXZlIGNoYW5nZWRcbiAgICAgICAqIG9yIGFmdGVyIHtAbGluayBLYW1wb3MjZGVzdHJveX0uXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtrYW1wb3NDb25maWd9IFtjb25maWddIGRlZmF1bHRzIHRvIGB0aGlzLmNvbmZpZ2BcbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHN1Y2Nlc3Mgd2hldGhlciBpbml0aWFsaXppbmcgb2YgdGhlIGNvbnRleHQgYW5kIHByb2dyYW0gd2VyZSBzdWNjZXNzZnVsXG4gICAgICAgKi9cblxuXG4gICAgICBpbml0KGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwgdGhpcy5jb25maWc7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgIHBsYW5lLFxuICAgICAgICAgIGVmZmVjdHMsXG4gICAgICAgICAgdGlja2VyLFxuICAgICAgICAgIG5vU291cmNlXG4gICAgICAgIH0gPSBjb25maWc7XG4gICAgICAgIGlmIChLYW1wb3MucHJldmVudENvbnRleHRDcmVhdGlvbikgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLmxvc3RDb250ZXh0ID0gZmFsc2U7XG4gICAgICAgIGxldCBnbCA9IGNvcmUuZ2V0V2ViR0xDb250ZXh0KHRhcmdldCk7XG4gICAgICAgIGlmICghZ2wpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoZ2wuaXNDb250ZXh0TG9zdCgpKSB7XG4gICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMucmVzdG9yZUNvbnRleHQoKTtcbiAgICAgICAgICBpZiAoIXN1Y2Nlc3MpIHJldHVybiBmYWxzZTsgLy8gZ2V0IG5ldyBjb250ZXh0IGZyb20gdGhlIGZyZXNoIGNsb25lXG5cbiAgICAgICAgICBnbCA9IGNvcmUuZ2V0V2ViR0xDb250ZXh0KHRoaXMuY29uZmlnLnRhcmdldCk7XG4gICAgICAgICAgaWYgKCFnbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHg6IHhTZWdtZW50cyA9IDEsXG4gICAgICAgICAgeTogeVNlZ21lbnRzID0gMVxuICAgICAgICB9ID0gcGxhbmUgJiYgcGxhbmUuc2VnbWVudHMgPyB0eXBlb2YgcGxhbmUuc2VnbWVudHMgPT09ICdvYmplY3QnID8gcGxhbmUuc2VnbWVudHMgOiB7XG4gICAgICAgICAgeDogcGxhbmUuc2VnbWVudHMsXG4gICAgICAgICAgeTogcGxhbmUuc2VnbWVudHNcbiAgICAgICAgfSA6IHt9O1xuICAgICAgICB0aGlzLnBsYW5lID0ge1xuICAgICAgICAgIHhTZWdtZW50cyxcbiAgICAgICAgICB5U2VnbWVudHNcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGRhdGFcbiAgICAgICAgfSA9IGNvcmUuaW5pdCh7XG4gICAgICAgICAgZ2wsXG4gICAgICAgICAgcGxhbmU6IHRoaXMucGxhbmUsXG4gICAgICAgICAgZWZmZWN0cyxcbiAgICAgICAgICBkaW1lbnNpb25zOiB0aGlzLmRpbWVuc2lvbnMsXG4gICAgICAgICAgbm9Tb3VyY2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTsgLy8gY2FjaGUgZm9yIHJlc3RvcmluZyBjb250ZXh0XG5cbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgaWYgKHRpY2tlcikge1xuICAgICAgICAgIHRoaXMudGlja2VyID0gdGlja2VyO1xuICAgICAgICAgIHRpY2tlci5hZGQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogU2V0IHRoZSBzb3VyY2UgY29uZmlnLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJWaWV3fEltYWdlRGF0YXxIVE1MSW1hZ2VFbGVtZW50fEhUTUxDYW52YXNFbGVtZW50fEhUTUxWaWRlb0VsZW1lbnR8SW1hZ2VCaXRtYXB8a2FtcG9zU291cmNlfSBzb3VyY2VcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiBjb25zdCBtZWRpYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWRlbycpO1xuICAgICAgICoga2FtcG9zLnNldFNvdXJjZShtZWRpYSk7XG4gICAgICAgKi9cblxuXG4gICAgICBzZXRTb3VyY2Uoc291cmNlKSB7XG4gICAgICAgIGlmICghc291cmNlKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMubG9zdENvbnRleHQpIHtcbiAgICAgICAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5yZXN0b3JlQ29udGV4dCgpO1xuICAgICAgICAgIGlmICghc3VjY2VzcykgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1lZGlhLCB3aWR0aCwgaGVpZ2h0O1xuXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc291cmNlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAoe1xuICAgICAgICAgICAgbWVkaWEsXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodFxuICAgICAgICAgIH0gPSBzb3VyY2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lZGlhID0gc291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgICAgIHRoaXMuZGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0XG4gICAgICAgICAgfTtcbiAgICAgICAgfSAvLyByZXNpemUgdGhlIHRhcmdldCBjYW52YXMgaWYgbmVlZGVkXG5cblxuICAgICAgICBjb3JlLnJlc2l6ZSh0aGlzLmdsLCB0aGlzLmRpbWVuc2lvbnMpO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRleHR1cmVzKCk7XG5cbiAgICAgICAgdGhpcy5tZWRpYSA9IG1lZGlhO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBEcmF3IGN1cnJlbnQgc2NlbmUuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVcbiAgICAgICAqL1xuXG5cbiAgICAgIGRyYXcodGltZSkge1xuICAgICAgICBpZiAodGhpcy5sb3N0Q29udGV4dCkge1xuICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnJlc3RvcmVDb250ZXh0KCk7XG4gICAgICAgICAgaWYgKCFzdWNjZXNzKSByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjYiA9IHRoaXMuY29uZmlnLmJlZm9yZURyYXc7XG4gICAgICAgIGlmIChjYiAmJiBjYih0aW1lKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgY29yZS5kcmF3KHRoaXMuZ2wsIHRoaXMucGxhbmUsIHRoaXMubWVkaWEsIHRoaXMuZGF0YSwgdGhpcy5kaW1lbnNpb25zKTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogU3RhcnRzIHRoZSBhbmltYXRpb24gbG9vcC5cbiAgICAgICAqXG4gICAgICAgKiBJZiBhIHtAbGluayBUaWNrZXJ9IGlzIHVzZWQsIHRoaXMgaW5zdGFuY2Ugd2lsbCBiZSBhZGRlZCB0byB0aGF0IHtAbGluayBUaWNrZXJ9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGJlZm9yZURyYXcgZnVuY3Rpb24gdG8gcnVuIGJlZm9yZSBlYWNoIGRyYXcgY2FsbFxuICAgICAgICovXG5cblxuICAgICAgcGxheShiZWZvcmVEcmF3KSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmJlZm9yZURyYXcgPSBiZWZvcmVEcmF3O1xuXG4gICAgICAgIGlmICh0aGlzLnRpY2tlcikge1xuICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbkZyYW1lSWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpcy5wbGF5aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50aWNrZXIuYWRkKHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5hbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgICAgY29uc3QgbG9vcCA9IHRpbWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgICAgIHRoaXMuZHJhdyh0aW1lKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBTdG9wcyB0aGUgYW5pbWF0aW9uIGxvb3AuXG4gICAgICAgKlxuICAgICAgICogSWYgYSB7QGxpbmsgVGlja2VyfSBpcyB1c2VkLCB0aGlzIGluc3RhbmNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoYXQge0BsaW5rIFRpY2tlcn0uXG4gICAgICAgKi9cblxuXG4gICAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUlkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBsYXlpbmcpIHtcbiAgICAgICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnRpY2tlci5yZW1vdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogU3RvcHMgdGhlIGFuaW1hdGlvbiBsb29wIGFuZCBmcmVlcyBhbGwgcmVzb3VyY2VzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0ga2VlcFN0YXRlIGZvciBpbnRlcm5hbCB1c2UuXG4gICAgICAgKi9cblxuXG4gICAgICBkZXN0cm95KGtlZXBTdGF0ZSkge1xuICAgICAgICB0aGlzLnN0b3AoKTtcblxuICAgICAgICBpZiAodGhpcy5nbCAmJiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICBjb3JlLmRlc3Ryb3kodGhpcy5nbCwgdGhpcy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZWVwU3RhdGUpIHtcbiAgICAgICAgICBjb25zdCBkaW1zID0gdGhpcy5kaW1lbnNpb25zIHx8IHt9O1xuICAgICAgICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuX3NvdXJjZSB8fCB7XG4gICAgICAgICAgICBtZWRpYTogdGhpcy5tZWRpYSxcbiAgICAgICAgICAgIHdpZHRoOiBkaW1zLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBkaW1zLmhlaWdodFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2ViZ2xjb250ZXh0bG9zdCcsIHRoaXMuX2xvc2VDb250ZXh0LCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJnbGNvbnRleHRjcmVhdGlvbmVycm9yJywgdGhpcy5fY29udGV4dENyZWF0aW9uRXJyb3IsIGZhbHNlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNvbmZpZyA9IG51bGw7XG4gICAgICAgICAgdGhpcy5kaW1lbnNpb25zID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2wgPSBudWxsO1xuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLm1lZGlhID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmVzdG9yZSBhIGxvc3QgV2ViR0wgY29udGV4dCBmb3QgdGhlIGdpdmVuIHRhcmdldC5cbiAgICAgICAqIFRoaXMgd2lsbCByZXBsYWNlIGNhbnZhcyBET00gZWxlbWVudCB3aXRoIGEgZnJlc2ggY2xvbmUuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gc3VjY2VzcyB3aGV0aGVyIGZvcmNpbmcgYSBjb250ZXh0IHJlc3RvcmUgd2FzIHN1Y2Nlc3NmdWxcbiAgICAgICAqL1xuXG5cbiAgICAgIHJlc3RvcmVDb250ZXh0KCkge1xuICAgICAgICBpZiAoS2FtcG9zLnByZXZlbnRDb250ZXh0Q3JlYXRpb24pIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5jb25maWcudGFyZ2V0O1xuICAgICAgICBjb25zdCBjbG9uZSA9IHRoaXMuY29uZmlnLnRhcmdldC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGNhbnZhcy5wYXJlbnROb2RlO1xuXG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGNsb25lLCBjYW52YXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcudGFyZ2V0ID0gY2xvbmU7XG4gICAgICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJnbGNvbnRleHRsb3N0JywgdGhpcy5fbG9zZUNvbnRleHQsIHRydWUpO1xuICAgICAgICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2ViZ2xjb250ZXh0cmVzdG9yZWQnLCB0aGlzLl9yZXN0b3JlQ29udGV4dCwgdHJ1ZSk7XG4gICAgICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJnbGNvbnRleHRjcmVhdGlvbmVycm9yJywgdGhpcy5fY29udGV4dENyZWF0aW9uRXJyb3IsIGZhbHNlKTtcbiAgICAgICAgY2xvbmUuYWRkRXZlbnRMaXN0ZW5lcignd2ViZ2xjb250ZXh0bG9zdCcsIHRoaXMuX2xvc2VDb250ZXh0LCB0cnVlKTtcbiAgICAgICAgY2xvbmUuYWRkRXZlbnRMaXN0ZW5lcignd2ViZ2xjb250ZXh0Y3JlYXRpb25lcnJvcicsIHRoaXMuX2NvbnRleHRDcmVhdGlvbkVycm9yLCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubG9zdENvbnRleHQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdG9yZUNvbnRleHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBfY3JlYXRlVGV4dHVyZXMoKSB7XG4gICAgICAgIHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEudGV4dHVyZXMuZm9yRWFjaCgodGV4dHVyZSwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGEudGV4dHVyZXNbaV07XG4gICAgICAgICAgZGF0YS50ZXh0dXJlID0gY29yZS5jcmVhdGVUZXh0dXJlKHRoaXMuZ2wsIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmRpbWVuc2lvbnMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZGltZW5zaW9ucy5oZWlnaHQsXG4gICAgICAgICAgICBmb3JtYXQ6IHRleHR1cmUuZm9ybWF0LFxuICAgICAgICAgICAgZGF0YTogdGV4dHVyZS5kYXRhLFxuICAgICAgICAgICAgd3JhcDogdGV4dHVyZS53cmFwXG4gICAgICAgICAgfSkudGV4dHVyZTtcbiAgICAgICAgICBkYXRhLmZvcm1hdCA9IHRleHR1cmUuZm9ybWF0O1xuICAgICAgICAgIGRhdGEudXBkYXRlID0gdGV4dHVyZS51cGRhdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IGthbXBvc0NvbmZpZ1xuICAgICAqIEBwcm9wZXJ0eSB7SFRNTENhbnZhc0VsZW1lbnR9IHRhcmdldFxuICAgICAqIEBwcm9wZXJ0eSB7ZWZmZWN0Q29uZmlnW119IGVmZmVjdHNcbiAgICAgKiBAcHJvcGVydHkge3BsYW5lQ29uZmlnfSBwbGFuZVxuICAgICAqIEBwcm9wZXJ0eSB7VGlja2VyfSBbdGlja2VyXVxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW25vU291cmNlXVxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IFtiZWZvcmVEcmF3XSBmdW5jdGlvbiB0byBydW4gYmVmb3JlIGVhY2ggZHJhdyBjYWxsLiBJZiBpdCByZXR1cm5zIGBmYWxzZWAge0BsaW5rIGthbXBvcyNkcmF3fSB3aWxsIG5vdCBiZSBjYWxsZWQuXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW29uQ29udGV4dExvc3RdXG4gICAgICogQHByb3BlcnR5IHtmdW5jdGlvbn0gW29uQ29udGV4dFJlc3RvcmVkXVxuICAgICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IFtvbkNvbnRleHRDcmVhdGlvbkVycm9yXVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYge09iamVjdH0ga2FtcG9zU291cmNlXG4gICAgICogQHByb3BlcnR5IHtBcnJheUJ1ZmZlclZpZXd8SW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SFRNTENhbnZhc0VsZW1lbnR8SFRNTFZpZGVvRWxlbWVudHxJbWFnZUJpdG1hcH0gbWVkaWFcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGhcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBlZmZlY3RDb25maWdcbiAgICAgKiBAcHJvcGVydHkge3NoYWRlckNvbmZpZ30gdmVydGV4XG4gICAgICogQHByb3BlcnR5IHtzaGFkZXJDb25maWd9IGZyYWdtZW50XG4gICAgICogQHByb3BlcnR5IHtBdHRyaWJ1dGVbXX0gYXR0cmlidXRlc1xuICAgICAqIEBwcm9wZXJ0eSB7VW5pZm9ybVtdfSB1bmlmb3Jtc1xuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB2YXJ5aW5nXG4gICAgICogQHByb3BlcnR5IHt0ZXh0dXJlQ29uZmlnW119IHRleHR1cmVzXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBwbGFuZUNvbmZpZ1xuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfHt4OiBudW1iZXI6IHk6IG51bWJlcn19IHNlZ21lbnRzXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBzaGFkZXJDb25maWdcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gW21haW5dXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFtzb3VyY2VdXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IFtjb25zdGFudF1cbiAgICAgKiBAcHJvcGVydHkge09iamVjdH0gW3VuaWZvcm1dIG1hcHBpbmcgdmFyaWFibGUgbmFtZSB0byB0eXBlXG4gICAgICogQHByb3BlcnR5IHtPYmplY3R9IFthdHRyaWJ1dGVdIG1hcHBpbmcgdmFyaWFibGUgbmFtZSB0byB0eXBlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZWRlZiB7T2JqZWN0fSB0ZXh0dXJlQ29uZmlnXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IGZvcm1hdFxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXlCdWZmZXJWaWV3fEltYWdlRGF0YXxIVE1MSW1hZ2VFbGVtZW50fEhUTUxDYW52YXNFbGVtZW50fEhUTUxWaWRlb0VsZW1lbnR8SW1hZ2VCaXRtYXB9IFtkYXRhXVxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VwZGF0ZV0gZGVmYXVsdHMgdG8gYGZhbHNlYFxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfHt4OiBzdHJpbmcsIHk6IHN0cmluZ319IFt3cmFwXSB3aXRoIHZhbHVlcyBgJ3N0cmV0Y2gnfCdyZXBlYXQnfCdtaXJyb3InYCwgZGVmYXVsdHMgdG8gYCdzdHJldGNoJ2BcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IEF0dHJpYnV0ZVxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBleHRlbmRzIG5hbWUgb2YgYW5vdGhlciBhdHRyaWJ1dGUgdG8gZXh0ZW5kXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWUgbmFtZSBvZiBhdHRyaWJ1dGUgdG8gdXNlIGluc2lkZSB0aGUgc2hhZGVyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpemUgYXR0cmlidXRlIHNpemUgLSBudW1iZXIgb2YgZWxlbWVudHMgdG8gcmVhZCBvbiBlYWNoIGl0ZXJhdGlvblxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHByb3BlcnR5IHtBcnJheUJ1ZmZlclZpZXd9IGRhdGFcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IFVuaWZvcm1cbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSB1bmlmb3JtIHRvIGJlIHVzZWQgaW4gdGhlIHNoYWRlclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2l6ZV0gZGVmYXVsdHMgdG8gYGRhdGEubGVuZ3RoYFxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHByb3BlcnR5IHtBcnJheX0gZGF0YVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBhIHRpY2tlciBpbnN0YW5jZSBmb3IgYmF0Y2hpbmcgYW5pbWF0aW9uIG9mIG11bHRpcGxlIHtAbGluayBLYW1wb3N9IGluc3RhbmNlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBUaWNrZXJcbiAgICAgKi9cbiAgICBjbGFzcyBUaWNrZXIge1xuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucG9vbCA9IFtdO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBTdGFydHMgdGhlIGFuaW1hdGlvbiBsb29wLlxuICAgICAgICovXG5cblxuICAgICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgICAgY29uc3QgbG9vcCA9IHRpbWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgICAgIHRoaXMuZHJhdyh0aW1lKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBTdG9wcyB0aGUgYW5pbWF0aW9uIGxvb3AuXG4gICAgICAgKi9cblxuXG4gICAgICBzdG9wKCkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25GcmFtZUlkKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUlkID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogSW52b2tlIGAuZHJhdygpYCBvbiBhbGwgaW5zdGFuY2VzIGluIHRoZSBwb29sLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gICAgICAgKi9cblxuXG4gICAgICBkcmF3KHRpbWUpIHtcbiAgICAgICAgdGhpcy5wb29sLmZvckVhY2goaW5zdGFuY2UgPT4gaW5zdGFuY2UuZHJhdyh0aW1lKSk7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEFkZCBhbiBpbnN0YW5jZSB0byB0aGUgcG9vbC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0thbXBvc30gaW5zdGFuY2VcbiAgICAgICAqL1xuXG5cbiAgICAgIGFkZChpbnN0YW5jZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucG9vbC5pbmRleE9mKGluc3RhbmNlKTtcblxuICAgICAgICBpZiAoIX5pbmRleCkge1xuICAgICAgICAgIHRoaXMucG9vbC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICBpbnN0YW5jZS5wbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBSZW1vdmUgYW4gaW5zdGFuY2UgZm9ybSB0aGUgcG9vbC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0thbXBvc30gaW5zdGFuY2VcbiAgICAgICAqL1xuXG5cbiAgICAgIHJlbW92ZShpbnN0YW5jZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucG9vbC5pbmRleE9mKGluc3RhbmNlKTtcblxuICAgICAgICBpZiAofmluZGV4KSB7XG4gICAgICAgICAgdGhpcy5wb29sLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgaW5zdGFuY2UucGxheWluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSB7XG4gICAgICBlZmZlY3RzOiB7XG4gICAgICAgIGFscGhhTWFzayxcbiAgICAgICAgYmxlbmQsXG4gICAgICAgIGJyaWdodG5lc3NDb250cmFzdCxcbiAgICAgICAgaHVlU2F0dXJhdGlvbixcbiAgICAgICAgZHVvdG9uZSxcbiAgICAgICAgZGlzcGxhY2VtZW50LFxuICAgICAgICB0dXJidWxlbmNlXG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvbnM6IHtcbiAgICAgICAgZmFkZSxcbiAgICAgICAgZGlzcGxhY2VtZW50OiBkaXNwbGFjZW1lbnRUcmFuc2l0aW9uLFxuICAgICAgICBkaXNzb2x2ZVxuICAgICAgfSxcbiAgICAgIG5vaXNlOiB7XG4gICAgICAgIHBlcmxpbk5vaXNlLFxuICAgICAgICBzaW1wbGV4LFxuICAgICAgICBjZWxsdWxhclxuICAgICAgfSxcbiAgICAgIEthbXBvcyxcbiAgICAgIFRpY2tlclxuICAgIH07XG5cbiAgICByZXR1cm4gaW5kZXg7XG5cbn0pKSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IGxvYWRIb21lc2NyZWVuIGZyb20gXCIuL0RPTS9sb2FkSG9tZXNjcmVlbi5qc1wiO1xuXG5sb2FkSG9tZXNjcmVlbigpO1xuIl0sIm5hbWVzIjpbImVsZW0iLCJjb250ZW50IiwidmVyc2lvbiIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGV4dCIsInRleHRDb250ZW50IiwiaWQiLCJjbGFzc05hbWUiLCJIVE1MIiwiaW5uZXJIVE1MIiwic3JjIiwiZm9ySSIsImZvciIsInR5cGUiLCJuYW1lIiwidmFsdWUiLCJwbGFjZWhvbGRlciIsInNwZWxsY2hlY2siLCJyZXF1aXJlZCIsImNoZWNrZWQiLCJocmVmIiwiYXV0b3BsYXkiLCJtdXRlZCIsImNoaWxkcmVuIiwiY2hpbGQiLCJhcHBlbmRDaGlsZCIsInJlbmRlckNvbnRhaW5lciIsImxvYWROYW1lU2NyZWVuIiwiYmFja2dyb3VuZCIsImxvYWRIb21lc2NyZWVuIiwiY29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwicHJvcCIsIm5ld0dhbWUiLCJmaXJzdENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImthbXBvcyIsImdyZWVuUGluU3JjIiwicmVuUGluU3JjIiwibG9hZE1hcFNjcmVlbiIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwiS2FtcG9zIiwiYm9keSIsInJlZFBpbjEiLCJJbWFnZSIsImNsYXNzTGlzdCIsImFkZCIsInJlZFBpbjIiLCJyZWRQaW4zIiwiZ3JlZW5QaW4iLCJtYXAiLCJwcmVwZW5kIiwic2V0VGltZW91dCIsInJlbW92ZSIsIm5ld0dhbWVDb250YWluZXIiLCJyZW5kZXJOZXdHYW1lIiwiZ3JlZXRpbmciLCJpbnB1dEZpZWxkIiwiYnV0dG9uIiwibmFtZUZpZWxkIiwicGxheWVyTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=