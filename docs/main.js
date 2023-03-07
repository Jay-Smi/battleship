/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/DOM/App.js":
/*!********************************!*\
  !*** ./src/scripts/DOM/App.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _HomePage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HomePage.js */ "./src/scripts/DOM/HomePage.js");
/* harmony import */ var _MapPage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MapPage.js */ "./src/scripts/DOM/MapPage.js");
/* harmony import */ var _GamePage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GamePage.js */ "./src/scripts/DOM/GamePage.js");
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elem.js */ "./src/scripts/DOM/elem.js");





class App extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  shouldUpdate(oldModel, newModel) {
    return oldModel.currentPage !== newModel.currentPage;
  }
  render(_ref) {
    let {
      currentPage
    } = _ref;
    const appElement = (0,_elem_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
      prop: "div",
      id: "app"
    });
    if (currentPage === "homePage") {
      new _HomePage_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.viewModel, appElement);
    } else if (currentPage === "mapPage") {
      new _MapPage_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.viewModel, appElement);
    } else if (currentPage === "gamePage") {
      new _GamePage_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.viewModel, appElement);
    }
    return appElement;
  }
}

/***/ }),

/***/ "./src/scripts/DOM/GamePage.js":
/*!*************************************!*\
  !*** ./src/scripts/DOM/GamePage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GamePage)
/* harmony export */ });
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _assets_videos_ocean_mp4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/videos/ocean.mp4 */ "./src/assets/videos/ocean.mp4");
/* harmony import */ var _CSS_stagingscreen_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../CSS/stagingscreen.css */ "./src/CSS/stagingscreen.css");
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elem.js */ "./src/scripts/DOM/elem.js");
/* harmony import */ var _gameElements_GameMessage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameElements/GameMessage.js */ "./src/scripts/DOM/gameElements/GameMessage.js");
/* harmony import */ var _gameElements_ShipQueue_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gameElements/ShipQueue.js */ "./src/scripts/DOM/gameElements/ShipQueue.js");
/* harmony import */ var _gameElements_BoardElem_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gameElements/BoardElem.js */ "./src/scripts/DOM/gameElements/BoardElem.js");
/* harmony import */ var _components_Game_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Game.js */ "./src/scripts/components/Game.js");
// import Board from "./boardView.js";








class GamePage extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  shouldUpdate(oldModel, newModel) {
    return oldModel.gameState === "placeShips" && newModel.gameState !== "placeShips" && oldModel.currentPage === "gamePage";
  }
  render(model) {
    return this.buildGamepage(model);
  }
  buildGamepage(model) {
    const leftButton = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "button",
      id: "activate",
      className: "rotateButton",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "span"
      })]
    });
    const middleButton = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "button",
      id: "activate",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "span"
      })]
    });
    const rightButton = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "button",
      id: "activate",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "span"
      })]
    });
    if (model.gameState === "placeShips") {
      leftButton.addEventListener("click", () => {
        this.viewModel.updateModel(oldModel => {
          const newModel = {
            ...oldModel
          };
          newModel.player.shipQueue[0].isHorizontal = !newModel.player.shipQueue[0].isHorizontal;
          return newModel;
        });
      });
      middleButton.addEventListener("click", () => {
        this.viewModel.updateModel(oldModel => {
          const newModel = {
            ...oldModel
          };
          newModel.dropQueue.push(JSON.parse(JSON.stringify(oldModel)));
          while (newModel.player.shipQueue.length > 0) {
            const ship = newModel.player.shipQueue.shift();
            const {
              newGameboard,
              newShip
            } = (0,_components_Game_js__WEBPACK_IMPORTED_MODULE_7__.placeShipRandomly)(ship, newModel.player.gameboard);
            newModel.player.gameboard = newGameboard;
            newModel.player.gameboard.ships.push(newShip);
          }
          return newModel;
        });
      });
      rightButton.addEventListener("click", () => {
        if (model.dropQueue.length > 0) {
          this.viewModel.updateModel(oldModel => {
            const newModel = oldModel.dropQueue.pop();
            return newModel;
          });
        }
      });
    }
    const shipContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "shipContainer"
    });
    new _gameElements_ShipQueue_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.viewModel, shipContainer, (shipIndex, clickedIndex) => {
      this.clickedIndex = clickedIndex;
      this.draggedShipIndex = shipIndex;
    });
    const messageContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "shipFooter"
    });
    new _gameElements_GameMessage_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.viewModel, messageContainer);
    const game = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "game"
    });
    if (model.gameState === "placeShips") {
      new _gameElements_BoardElem_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.viewModel, game, () => {
        return [this.clickedIndex, model.player.shipQueue[this.draggedShipIndex]];
      });
    }
    const gameContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
      prop: "div",
      className: "gameContainer",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "p1GridContainer",
        children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          prop: "video",
          className: "waves",
          src: _assets_videos_ocean_mp4__WEBPACK_IMPORTED_MODULE_1__,
          autoplay: true,
          loop: true
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          prop: "div",
          className: "shipBow",
          children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "shipBowWood"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel1"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel2"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel3"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel4"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel5"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakBarrel6"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakCover"
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "flakCoverTop"
          })]
        }), game]
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
        prop: "div",
        className: "p1OptionsContainer",
        children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          prop: "div",
          className: "radarContainer",
          children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "ul",
            className: "radar",
            children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "li",
              className: "radarLine"
            })]
          })]
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          prop: "div",
          className: "p1ShipStage",
          draggable: false,
          children: [shipContainer, messageContainer]
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
          prop: "div",
          className: "buttonContainer",
          children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "leftButton",
            children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "div",
              className: "base",
              children: [leftButton]
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "div",
              className: "buttonText",
              textContent: "Rotate"
            })]
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "middleButton",
            children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "div",
              className: "base",
              children: [middleButton]
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "div",
              className: "buttonText",
              textContent: "Auto-place"
            })]
          }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
            prop: "div",
            className: "rightButton",
            children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "div",
              className: "base",
              children: [rightButton]
            }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
              prop: "div",
              className: "buttonText",
              textContent: "Undo"
            })]
          })]
        })]
      })]
    });
    return gameContainer;
  }
}

/***/ }),

/***/ "./src/scripts/DOM/HomePage.js":
/*!*************************************!*\
  !*** ./src/scripts/DOM/HomePage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elem.js */ "./src/scripts/DOM/elem.js");
/* harmony import */ var _CSS_homepage_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../CSS/homepage.css */ "./src/CSS/homepage.css");
/* harmony import */ var _HomePageInput_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HomePageInput.js */ "./src/scripts/DOM/HomePageInput.js");




class HomePage extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  render(model) {
    const homepageContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "homepageContainer"
    });
    homepageContainer.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "header",
      textContent: "BATTLESHIP",
      className: "homeHeader"
    }));
    const newGame = (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "main",
      className: "newGameContainer"
    });
    new _HomePageInput_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.viewModel, newGame);
    homepageContainer.appendChild(newGame);
    homepageContainer.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "ul",
      className: "smokeContainer",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "li",
        className: "smoke"
      })]
    }));
    homepageContainer.appendChild((0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "footer",
      className: "footer",
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "span",
        textContent: "Created by Gluttz, "
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
        prop: "a",
        textContent: "Image by upklyak on Freepik",
        href: "https://www.freepik.com/free-vector/sunken-cruise-ship-sea-harbor-morning_21584915.htm#query=battleship%20background&position=32&from_view=search&track=ais"
      })]
    }));
    return homepageContainer;
  }
}

/***/ }),

/***/ "./src/scripts/DOM/HomePageInput.js":
/*!******************************************!*\
  !*** ./src/scripts/DOM/HomePageInput.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePageInput)
/* harmony export */ });
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elem.js */ "./src/scripts/DOM/elem.js");
/* harmony import */ var _CSS_namepage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../CSS/namepage.css */ "./src/CSS/namepage.css");
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");



class HomePageInput extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  render(_ref) {
    let {
      namePageIsOpen
    } = _ref;
    const newGameBtn = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      textContent: "New Game",
      className: "newGame"
    });
    newGameBtn.addEventListener("click", () => {
      this.viewModel.updateModel(oldModel => {
        return {
          namePageIsOpen: true
        };
      });
    });
    return namePageIsOpen ? this.buildForm() : newGameBtn;
  }
  buildForm() {
    const greeting = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "p",
      textContent: "Hello Admiral..."
    });
    const inputField = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "input",
      type: "text",
      placeholder: "Name"
    });
    const button = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "button",
      type: "button",
      textContent: "Continue"
    });
    const nameField = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "form",
      className: "nameForm",
      children: [inputField, button]
    });
    button.addEventListener("click", () => {
      this.viewModel.updateModel(oldModel => {
        const newModel = {
          ...oldModel
        };
        newModel.currentPage = "mapPage";
        newModel.player.name = inputField.value;
        return newModel;
      });
    });
    const formContainer = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "formContainer",
      children: [greeting, nameField]
    });
    return formContainer;
  }
}

/***/ }),

/***/ "./src/scripts/DOM/MapPage.js":
/*!************************************!*\
  !*** ./src/scripts/DOM/MapPage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MapPage)
/* harmony export */ });
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elem.js */ "./src/scripts/DOM/elem.js");
/* harmony import */ var _CSS_mappage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../CSS/mappage.css */ "./src/CSS/mappage.css");
/* harmony import */ var _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/images/red-pin.png */ "./src/assets/images/red-pin.png");
/* harmony import */ var _assets_images_sticky_note_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/images/sticky-note.svg */ "./src/assets/images/sticky-note.svg");
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");





class MapPage extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  render(_ref) {
    let {
      stateMessage,
      player
    } = _ref;
    const redPins = [(0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "img",
      src: _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_2__,
      className: "redPin1",
      id: "easy"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "img",
      src: _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_2__,
      className: "redPin2",
      id: "medium"
    }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "img",
      src: _assets_images_red_pin_png__WEBPACK_IMPORTED_MODULE_2__,
      className: "redPin3",
      id: "hard"
    })];
    redPins.forEach(pin => {
      pin.addEventListener("click", () => {
        this.viewModel.updateModel(oldModel => {
          const newModel = {
            ...oldModel
          };
          newModel.currentPage = "gamePage";
          newModel.gameState = "placeShips";
          newModel.stateMessage = "Enemies approach. Deploy the fleet.";
          newModel.AI.difficulty = pin.id;
          return newModel;
        });
      });
      if (stateMessage !== pin.id) {
        pin.addEventListener("mouseenter", () => {
          this.viewModel.updateModel(oldModel => {
            return {
              stateMessage: pin.id
            };
          });
        });
      }
    });
    const map = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "map",
      children: redPins
    });
    if (stateMessage) {
      const note = this.buildNote(stateMessage, player);
      map.appendChild(note);
    }
    return map;
  }
  buildNote(stateMessage, player) {
    const noteOptions = {
      note1: {
        location: "Somalian Coast",
        difficulty: "Easy",
        para: "I regret to inform you that a group of Somalian pirates have successfully commandeered an Indian carrier group in the Arabian Sea. "
      },
      note2: {
        location: "Black Sea",
        difficulty: "Medium",
        para: "I am writing to inform you about a group of Russian pirates who have commandeered a Russian carrier group. This group is a significant threat to the safety and security of the area."
      },
      note3: {
        location: "South China Sea",
        difficulty: "Hard",
        para: "A group of Chinese pirates has managed to seize control of a Chinese carrier group, and it poses a significant threat to regional security."
      }
    };
    let selectedOptions = {};
    switch (stateMessage) {
      case "easy":
        selectedOptions = noteOptions.note1;
        break;
      case "medium":
        selectedOptions = noteOptions.note2;
        break;
      case "hard":
        selectedOptions = noteOptions.note3;
        break;
    }
    const note = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "article",
      className: "noteContainer",
      id: stateMessage,
      children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "img",
        src: _assets_images_sticky_note_svg__WEBPACK_IMPORTED_MODULE_3__,
        className: "stickyNote"
      }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prop: "div",
        className: "paraContainer",
        children: [(0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `Location: ${selectedOptions.location}`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `Difficulty: ${selectedOptions.difficulty}`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `Admiral ${player.name},`
        }), (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          prop: "p",
          textContent: `${selectedOptions.para}`
        })]
      })]
    });
    return note;
  }
}

/***/ }),

/***/ "./src/scripts/DOM/elem.js":
/*!*********************************!*\
  !*** ./src/scripts/DOM/elem.js ***!
  \*********************************/
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
  let loop = content["loop"];
  if (loop) {
    el.loop = true;
  }
  let draggable = content["draggable"];
  if (draggable) {
    el.draggable = true;
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

// function elem(content) {
//     const el = document.createElement(content["prop"]);

//     for (let key in content) {
//         if (content[key] === "prop") {
//             continue;
//         } else if (key === "classList") {
//             for (let className of content[classList]) {
//                 el.classList.add(content[classList][className]);
//             }
//         } else if (key === "children") {
//             console.log(content[key]);
//             for (let child of content[key]) {
//                 el.appendChild(elem(content[key][child]));
//             }
//         } else {
//             el[key] = content[key];
//         }
//     }

//     return el;
// }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elem);

/***/ }),

/***/ "./src/scripts/DOM/gameElements/BoardElem.js":
/*!***************************************************!*\
  !*** ./src/scripts/DOM/gameElements/BoardElem.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BoardElem)
/* harmony export */ });
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem */ "./src/scripts/DOM/elem.js");
/* harmony import */ var _ShipElem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShipElem */ "./src/scripts/DOM/gameElements/ShipElem.js");
/* harmony import */ var _components_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Game */ "./src/scripts/components/Game.js");




class BoardElem extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element, dragEnter) {
    super(viewModel, element);
    this.dragEnter = dragEnter;
    this.boardSize = null;
  }
  render(model) {
    if (model.gameState === "placeShips") {
      return this.buildBoard(model);
    }
  }
  buildBoard(model) {
    const shadowGrid = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "shadowGrid"
    });
    const board = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "div",
      className: "board",
      children: [shadowGrid]
    });
    this.boardSize = model.player.gameboard.size;
    const cells = [];
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
          prop: "div",
          className: "cell"
        });
        const tileRef = model.player.gameboard.board[row][col];
        // sets data values for coordinates
        cell.dataset.row = row;
        cell.dataset.col = col;

        // adds the dragenter and drop listener
        cell.addEventListener("dragenter", e => {
          const bound = this.handleDragEnter.bind(this);
          bound(e, row, col, model);
        });
        cell.addEventListener("drop", e => {
          const bound = this.handleDrop.bind(this);
          bound(e, row, col, model);
        });
        cell.addEventListener("dragover", e => {
          const bound = this.handleDragOver.bind(this);
          bound(e, row, col);
        });
        if (tileRef.ship) {
          // display ship effect
          cell.classList.add;
        }
        switch (tileRef.tileStatus) {
          case "H":
            // display hit marker
            break;
          case "M":
            // display miss marker
            break;
          case null:
            // do nothing
            break;
        }

        // appends the cell to the board container
        // adds a reference to the DOM cell to the cells array
        board.appendChild(cell);
        cells.push(cell);
      }
    }
    this.cells = cells;
    model.player.gameboard.ships.forEach(ship => {
      const shipElem = new _ShipElem__WEBPACK_IMPORTED_MODULE_2__["default"](ship, clickedIndex => {
        // this.clickedEvent(index, clickedIndex);
      });
      const baseTile = ship.tiles[0];
      const endTile = ship.tiles[ship.size - 1];
      shipElem.element.style.gridArea = `${baseTile.row + 1} / ${baseTile.col + 1} / ${endTile.row + 2} / ${endTile.col + 2}`;
      shipElem.element.classList.add("boardShip");
      shipElem.tiles.forEach(tile => {
        tile.classList.add("onBoard");
      });
      shadowGrid.appendChild(shipElem.element);
    });
    return board;
  }
  handleDragOver(e) {
    e.preventDefault();
  }
  handleDragLeave(e) {
    e.preventDefault();
  }
  handleDragEnter(e, row, col, model) {
    e.preventDefault();
    const [clickedIndex, ship] = this.dragEnter();
    this.draggedShip = ship;
    this.clickedIndex = clickedIndex;
    // get all tiles with prior hover effects
    const tiles = Array.from(document.querySelectorAll(".hover", ".valid", ".invalid"));
    // clear their hover effects
    tiles.forEach(tile => {
      tile.classList.remove("hover", "invalid", "valid");
    });
    const isHorizontal = ship.isHorizontal;
    const length = ship.size;
    // calculate the base tile for the dragged ship
    // based on the ship index that was clicked and tile current hovered
    // (left most for horizontal, top most for vertical)
    const baseCoords = this.getBaseTile(ship, row, col, clickedIndex);
    const baseRow = baseCoords.row;
    const baseCol = baseCoords.col;

    // check if hovered tiles are all on the board and dont overlap a ship
    let isValid = (0,_components_Game__WEBPACK_IMPORTED_MODULE_3__.isValidPlacement)(ship, baseRow, baseCol, model.player.gameboard);
    let rowOffset = baseRow;
    let colOffset = baseCol;

    // aquire the div for every cell
    // and style according to validity
    for (let i = 0; i < length; i++) {
      if (rowOffset >= this.boardSize || colOffset >= this.boardSize) {
        isValid = false;
        break;
      }
      if (this.cells[Number(`${rowOffset}` + `${colOffset}`)] === null) {
        isValid = false;
        break;
      }
      if (isHorizontal) {
        colOffset++;
      } else {
        rowOffset++;
      }
    }
    if (isValid) {
      rowOffset = baseRow;
      colOffset = baseCol;
      for (let i = 0; i < length; i++) {
        const cell = this.getCell(rowOffset, colOffset);
        if (cell) {
          cell.classList.add("valid");
          cell.classList.add("hover");
        }
        rowOffset = isHorizontal ? rowOffset : rowOffset + 1;
        colOffset = isHorizontal ? colOffset + 1 : colOffset;
      }
    } else {
      rowOffset = baseRow;
      colOffset = baseCol;
      for (let i = 0; i < length; i++) {
        const cell = this.getCell(rowOffset, colOffset);
        if (cell) {
          cell.classList.add("invalid");
          cell.classList.add("hover");
        }
        rowOffset = isHorizontal ? rowOffset : rowOffset + 1;
        colOffset = isHorizontal ? colOffset + 1 : colOffset;
      }
    }
  }
  handleDrop(e, row, col, model) {
    e.preventDefault();
    let baseCoords = this.getBaseTile(this.draggedShip, row, col, this.clickedIndex);
    let baseRow = baseCoords.row;
    let baseCol = baseCoords.col;
    let isValid = (0,_components_Game__WEBPACK_IMPORTED_MODULE_3__.isValidPlacement)(this.draggedShip, baseRow, baseCol, model.player.gameboard);
    if (isValid) {
      this.viewModel.updateModel(oldModel => {
        const newModel = {
          ...oldModel
        };
        newModel.dropQueue.push(JSON.parse(JSON.stringify(oldModel)));
        const {
          newGameboard,
          newShip
        } = (0,_components_Game__WEBPACK_IMPORTED_MODULE_3__.placeShip)(this.draggedShip, baseRow, baseCol, oldModel.player.gameboard);
        // console.log(newGameboard, newShip);
        // if (oldModel.player.shipQueue.length === 1) {
        //     newModel.gameState = "inGame";
        // }
        newModel.player.gameboard = newGameboard;
        newModel.player.shipQueue.shift();
        if (newModel.player.shipQueue.length > 0) {
          newModel.stateMessage = `Place your ${newModel.player.shipQueue[0].name}`;
        }
        newModel.player.gameboard.ships.push(newShip);
        return newModel;
      });
    } else {
      // TODO: handle invalid placement drop
    }
  }

  /**  calculates the left most or top most tile */
  getBaseTile(ship, row, col, clickedIndex) {
    // gets the index that the ship was picked up by
    const index = clickedIndex;
    let offsetRow = 0;
    let offsetCol = 0;

    // offsets the hovered tile according to the grabbed index
    if (ship.isHorizontal === true) {
      offsetCol = index;
    } else {
      offsetRow = index;
    }
    const baseRow = row - offsetRow;
    const baseCol = col - offsetCol;
    return {
      row: baseRow,
      col: baseCol
    };
  }

  /**  returns the DOM element for a given coordinate */
  getCell(row, col) {
    if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
      return null;
    }
    return this.cells[row * this.boardSize + col];
  }
}

/***/ }),

/***/ "./src/scripts/DOM/gameElements/GameMessage.js":
/*!*****************************************************!*\
  !*** ./src/scripts/DOM/gameElements/GameMessage.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameMessage)
/* harmony export */ });
/* harmony import */ var _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSubInterface */ "./src/scripts/PubSubInterface.js");
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elem */ "./src/scripts/DOM/elem.js");


class GameMessage extends _PubSubInterface__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(viewModel, element) {
    super(viewModel, element);
  }
  shouldUpdate(oldModel, newModel) {
    return oldModel.stateMessage !== newModel.stateMessage;
  }
  render(_ref) {
    let {
      stateMessage
    } = _ref;
    return (0,_elem__WEBPACK_IMPORTED_MODULE_1__["default"])({
      prop: "p",
      className: "stagePara",
      textContent: stateMessage
    });
  }
}

/***/ }),

/***/ "./src/scripts/DOM/gameElements/ShipElem.js":
/*!**************************************************!*\
  !*** ./src/scripts/DOM/gameElements/ShipElem.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _elem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elem */ "./src/scripts/DOM/elem.js");
/* harmony import */ var _assets_images_Carrier_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assets/images/Carrier.svg */ "./src/assets/images/Carrier.svg");
/* harmony import */ var _assets_images_Battleship_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/images/Battleship.svg */ "./src/assets/images/Battleship.svg");
/* harmony import */ var _assets_images_Destroyer_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assets/images/Destroyer.svg */ "./src/assets/images/Destroyer.svg");
/* harmony import */ var _assets_images_Submarine_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../assets/images/Submarine.svg */ "./src/assets/images/Submarine.svg");
/* harmony import */ var _assets_images_Patrol_Boat_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../assets/images/Patrol-Boat.svg */ "./src/assets/images/Patrol-Boat.svg");






class Ship {
  constructor(ship, clickedEvent) {
    this.shipModel = ship;
    this.tiles = [];
    this.clickedIndex = null;
    this.element = this.create();
    this.clickedEvent = clickedEvent;
  }
  create() {
    //ships container
    const ship = document.createElement("div");
    ship.id = this.shipModel.name;
    ship.classList.add("ship");
    ship.draggable = true;
    let shipSrc = null;
    let shipClass = this.shipModel.isHorizontal ? "horizontal" : "vertical";
    ship.classList.add(shipClass);

    // matches name of ship to the image source file
    switch (this.shipModel.name) {
      case "Carrier":
        shipSrc = _assets_images_Carrier_svg__WEBPACK_IMPORTED_MODULE_1__;
        break;
      case "Battleship":
        shipSrc = _assets_images_Battleship_svg__WEBPACK_IMPORTED_MODULE_2__;
        break;
      case "Destroyer":
        shipSrc = _assets_images_Destroyer_svg__WEBPACK_IMPORTED_MODULE_3__;
        break;
      case "Submarine":
        shipSrc = _assets_images_Submarine_svg__WEBPACK_IMPORTED_MODULE_4__;
        break;
      case "Patrol-Boat":
        shipSrc = _assets_images_Patrol_Boat_svg__WEBPACK_IMPORTED_MODULE_5__;
    }

    // creates the inner divs for each ship
    // based on the size
    for (let i = 0; i < this.shipModel.size; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.boat = this.shipModel.name;
      tile.dataset.tile = i;
      tile.draggable = false;

      //add head class to front for styling
      if (i === 0) tile.classList.add("head");
      //add tail class to tail for styling
      if (i == this.shipModel.size - 1) tile.classList.add("tail");

      // adds click listener to set clicked index
      tile.addEventListener("mousedown", e => {
        this.clickedEvent(i);
      });

      // add tiles to the ship
      this.tiles.push(tile);
      ship.appendChild(tile);
    }

    // spice up the ship display
    const shipOverlay = (0,_elem__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "img",
      className: `shipOverlay`,
      id: `${this.shipModel.name}Overlay`
    });
    this.overlay = shipOverlay;
    shipOverlay.src = shipSrc;
    let overlayClass = this.shipModel.isHorizontal ? "horizontal" : "vertical";
    shipOverlay.classList.add(overlayClass);
    shipOverlay.draggable = false;
    ship.appendChild(shipOverlay);
    ship.addEventListener("dragstart", e => {
      const bound = this.handleDragStart.bind(this);
      bound(e);
    });
    return ship;
  }
  handleDragStart(e) {
    this.tiles.forEach(tile => {
      tile.style.width = "40px";
      tile.style.height = "40px";
      setTimeout(() => {
        tile.style.width = "30px";
        tile.style.height = "30px";
      }, 0);
    });
  }
}

/***/ }),

/***/ "./src/scripts/DOM/gameElements/ShipQueue.js":
/*!***************************************************!*\
  !*** ./src/scripts/DOM/gameElements/ShipQueue.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShipQueue)
/* harmony export */ });
/* harmony import */ var _elem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elem.js */ "./src/scripts/DOM/elem.js");
/* harmony import */ var _ShipElem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShipElem.js */ "./src/scripts/DOM/gameElements/ShipElem.js");
/* harmony import */ var _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../PubSubInterface.js */ "./src/scripts/PubSubInterface.js");



class ShipQueue extends _PubSubInterface_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(viewModel, element, clickedEvent) {
    super(viewModel, element);
    this.clickedEvent = clickedEvent;
  }
  shouldUpdate(oldModel, newModel) {
    return newModel.gameState === "placeShips";
  }
  render(model) {
    if (model.player.shipQueue.length < 1) {
      console.log("all ships placed");
    }
    return this.buildQueue(model);
  }
  buildQueue(model) {
    const stage = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "shipQueue",
      draggable: false
    });
    const next = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "nextShipContainer",
      draggable: false
    });
    const queue = (0,_elem_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prop: "div",
      className: "queueContainer",
      children: [stage, next]
    });
    model.player.shipQueue.forEach((ship, index) => {
      const shipElem = new _ShipElem_js__WEBPACK_IMPORTED_MODULE_1__["default"](ship, clickedIndex => {
        this.clickedEvent(index, clickedIndex);
      });
      if (model.stateMessage.includes("Enemies")) {
        shipElem.element.addEventListener("mouseenter", e => {
          this.viewModel.updateModel(oldModel => {
            const newModel = {
              ...oldModel
            };
            newModel.stateMessage = `Place your ${newModel.player.shipQueue[0].name}`;
            return newModel;
          });
        });
      }
      if (index === 0) {
        next.appendChild(shipElem.element);
      } else {
        stage.prepend(shipElem.element);
      }
    });
    return queue;
  }
}

/***/ }),

/***/ "./src/scripts/PubSubInterface.js":
/*!****************************************!*\
  !*** ./src/scripts/PubSubInterface.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PubSubInterface)
/* harmony export */ });
class PubSubInterface {
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

/***/ }),

/***/ "./src/scripts/ViewModel.js":
/*!**********************************!*\
  !*** ./src/scripts/ViewModel.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ViewModel)
/* harmony export */ });
class ViewModel {
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

/***/ }),

/***/ "./src/scripts/components/AI.js":
/*!**************************************!*\
  !*** ./src/scripts/components/AI.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AI)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/scripts/components/Player.js");

class AI extends _Player__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    super.name = "AI";
    this.difficulty = null;
  }
}

/***/ }),

/***/ "./src/scripts/components/Game.js":
/*!****************************************!*\
  !*** ./src/scripts/components/Game.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game),
/* harmony export */   "isValidPlacement": () => (/* binding */ isValidPlacement),
/* harmony export */   "placeShip": () => (/* binding */ placeShip),
/* harmony export */   "placeShipRandomly": () => (/* binding */ placeShipRandomly)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/scripts/components/Player.js");
/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AI */ "./src/scripts/components/AI.js");



// model
class Game {
  constructor() {
    this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.AI = new _AI__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.currentTurn = "player";
    this.currentPage = "homePage";
    this.namePageIsOpen = false;
    this.stateMessage = "";
    this.gameState = null;
    this.dropQueue = [];
  }
}

// assumes row / col are the base tile of the ship
function isValidPlacement(ship, row, col, gameboard) {
  // checks if all hovered tiles are on the board

  if (ship.isHorizontal === true && col + ship.size > gameboard.size) {
    return false;
  }
  if (ship.isHorizontal === false && row + ship.size > gameboard.size) {
    return false;
  }
  // iterates over every tile
  // and checks if the gameboard contains a ship
  for (let i = 0; i < ship.size; i++) {
    if (gameboard.board[row]) {
      if (gameboard.board[row][col]) {
        if (gameboard.board[row][col].ship) {
          return false;
        }
        if (ship.isHorizontal === true) {
          col++;
        } else {
          row++;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}
function placeShip(ship, row, col, gameboard) {
  let newGameboard = {
    ...gameboard
  };
  let newShip = {
    ...ship
  };
  for (let i = 0; i < ship.size; i++) {
    if (gameboard.board[row]) {
      if (gameboard.board[row][col]) {
        if (gameboard.board[row][col].ship === null) {
          newGameboard.board[row][col].ship = true;
          newShip.tiles.push(newGameboard.board[row][col]);
          if (ship.isHorizontal === true) {
            col++;
          } else {
            row++;
          }
        } else {
          console.warn("this shouldn't happen");
          return false;
        }
      } else {
        console.warn("this shouldn't happen");
        return false;
      }
    } else {
      console.warn("this shouldn't happen");
      return false;
    }
  }
  return {
    newGameboard,
    newShip
  };
}
function placeShipRandomly(ship, gameboard) {
  ship.isHorizontal = Math.random() > 0.5;
  const randRow = Math.floor(Math.random() * 10);
  const randCol = Math.floor(Math.random() * 10);
  const isValid = isValidPlacement(ship, randRow, randCol, gameboard);
  if (isValid) {
    return placeShip(ship, randRow, randCol, gameboard);
  } else {
    return placeShipRandomly(ship, gameboard);
  }
}


/***/ }),

/***/ "./src/scripts/components/Gameboard.js":
/*!*********************************************!*\
  !*** ./src/scripts/components/Gameboard.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile.js */ "./src/scripts/components/Tile.js");

class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = [];
    // this.orientation = true; //true vertical, false horizontal
    this.ships = [];
    for (let row = 0; row < this.size; row++) {
      this.board[row] = [];
      for (let col = 0; col < this.size; col++) {
        this.board[row][col] = new _Tile_js__WEBPACK_IMPORTED_MODULE_0__["default"](row, col);
      }
    }
  }
}

/***/ }),

/***/ "./src/scripts/components/Player.js":
/*!******************************************!*\
  !*** ./src/scripts/components/Player.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ "./src/scripts/components/Gameboard.js");
/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship.js */ "./src/scripts/components/Ship.js");


class Player {
  constructor() {
    this.name = null;
    this.gameboard = new _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"](10);
    this.shipQueue = [new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](5, "Carrier"), new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](4, "Battleship"), new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](3, "Destroyer"), new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](3, "Submarine"), new _Ship_js__WEBPACK_IMPORTED_MODULE_1__["default"](2, "Patrol-Boat")];
  }
}

/***/ }),

/***/ "./src/scripts/components/Ship.js":
/*!****************************************!*\
  !*** ./src/scripts/components/Ship.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(size, name) {
    this.name = name;
    this.size = size;
    this.hits = 0;
    this.sunk = false;
    this.isHorizontal = false;
    this.tiles = [];
  }
}

/***/ }),

/***/ "./src/scripts/components/Tile.js":
/*!****************************************!*\
  !*** ./src/scripts/components/Tile.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tile)
/* harmony export */ });
class Tile {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.ship = null;
    this.tileStatus = null;
    // null H M
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/homepage.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/homepage.css ***!
  \********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: BlackOps1;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n@font-face {\n    font-family: PressStart;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n* {\n    /* border: 1px solid red; */\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-size: 16px;\n}\n\n#container {\n    height: 100vh;\n    width: 100vw;\n    background-color: transparent;\n}\n\n.homepageContainer {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: grey;\n    background-color: transparent;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n    background-size: cover;\n    background-position: center;\n}\n\n.homeHeader {\n    margin: 4rem 0;\n    font-family: BlackOps1;\n    font-size: 7rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 1px 5px 1px #a8a8a8, 1px 6px 1px #a8a8a8,\n        1px 7px 1px #a8a8a8, 1px 8px 1px #a8a8a8;\n}\n\n.newGameContainer {\n    margin-bottom: auto;\n}\n\n.newGame {\n    font-family: PressStart;\n    font-size: 2rem;\n    overflow: hidden;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.4rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n    cursor: pointer;\n    text-shadow: 0 0 10px rgba(0, 0, 0, 0.185);\n}\n\n.newGame:hover {\n    color: darkgray;\n}\n\n@keyframes typing {\n    from {\n        width: 0;\n    }\n    to {\n        width: 100%;\n    }\n}\n\n@keyframes blink-caret {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: grey;\n    }\n}\n\n.smokeContainer {\n    position: fixed;\n    bottom: 40%;\n    left: 65%;\n    transform: translateX(-50%);\n    margin: 0;\n    padding: 0;\n}\n\n@media (max-width: 1200px) {\n    .smoke {\n        left: 75%;\n    }\n}\n\n@media (max-width: 900px) {\n    .smokeContainer {\n        left: 80%;\n    }\n\n    .homeHeader {\n        font-size: 5rem;\n        margin-bottom: 5rem;\n    }\n}\n\n@media (max-width: 600px) {\n    .homeHeader {\n        font-size: 4rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.5rem;\n    }\n}\n\n@media (max-width: 500px) {\n    .homeHeader {\n        font-size: 3rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.2rem;\n    }\n}\n\n.smoke {\n    position: absolute;\n    list-style: none;\n    width: 80px;\n    height: 80px;\n    background: #262626;\n    border-radius: 50%;\n    filter: blur(15px);\n}\n\n.smoke:nth-child(even) {\n    animation: animateEven 3.5s linear infinite;\n}\n.smoke:nth-child(odd) {\n    animation: animateOdd 3.5s linear infinite;\n}\n\n.smoke:nth-child(9) {\n    animation: none;\n    filter: blur(15px);\n}\n\n@keyframes animateEven {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n@keyframes animateOdd {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(-100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n.smoke:nth-child(1) {\n    animation-delay: 0s;\n}\n.smoke:nth-child(2) {\n    animation-delay: 0.4s;\n}\n.smoke:nth-child(3) {\n    animation-delay: 0.8s;\n}\n.smoke:nth-child(4) {\n    animation-delay: 1.2s;\n}\n.smoke:nth-child(5) {\n    animation-delay: 1.6s;\n}\n.smoke:nth-child(6) {\n    animation-delay: 2s;\n}\n.smoke:nth-child(7) {\n    animation-delay: 2.4s;\n}\n.smoke:nth-child(8) {\n    animation-delay: 2.8s;\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/homepage.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;IACtB,4CAA2C;AAC/C;AACA;IACI,uBAAuB;IACvB,4CAA0C;AAC9C;;AAEA;IACI,2BAA2B;IAC3B,UAAU;IACV,SAAS;IACT,sBAAsB;AAC1B;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,6BAA6B;AACjC;;AAEA;IACI,aAAa;IACb,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,WAAW;IACX,6BAA6B;IAC7B,yDAAwD;IACxD,sBAAsB;IACtB,2BAA2B;AAC/B;;AAEA;IACI,cAAc;IACd,sBAAsB;IACtB,eAAe;IACf,kBAAkB;IAClB;;gDAE4C;AAChD;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,uBAAuB;IACvB,eAAe;IACf,gBAAgB;IAChB,kBAAkB;IAClB,6BAA6B;IAC7B,mBAAmB;IACnB,wBAAwB;IACxB,sBAAsB;IACtB,wEAAwE;IACxE,eAAe;IACf,0CAA0C;AAC9C;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI;QACI,QAAQ;IACZ;IACA;QACI,WAAW;IACf;AACJ;;AAEA;IACI;;QAEI,yBAAyB;IAC7B;IACA;QACI,kBAAkB;IACtB;AACJ;;AAEA;IACI,eAAe;IACf,WAAW;IACX,SAAS;IACT,2BAA2B;IAC3B,SAAS;IACT,UAAU;AACd;;AAEA;IACI;QACI,SAAS;IACb;AACJ;;AAEA;IACI;QACI,SAAS;IACb;;IAEA;QACI,eAAe;QACf,mBAAmB;IACvB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,mBAAmB;IACvB;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,mBAAmB;IACvB;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,2CAA2C;AAC/C;AACA;IACI,0CAA0C;AAC9C;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI;QACI,mCAAmC;QACnC,UAAU;QACV,kBAAkB;IACtB;IACA;QACI,4CAA4C;QAC5C,UAAU;QACV,kBAAkB;IACtB;AACJ;;AAEA;IACI;QACI,mCAAmC;QACnC,UAAU;QACV,kBAAkB;IACtB;IACA;QACI,6CAA6C;QAC7C,UAAU;QACV,kBAAkB;IACtB;AACJ;;AAEA;IACI,mBAAmB;AACvB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,mBAAmB;AACvB;AACA;IACI,qBAAqB;AACzB;AACA;IACI,qBAAqB;AACzB","sourcesContent":["@font-face {\n    font-family: BlackOps1;\n    src: url(\"../assets/fonts/BlackOpsOne.ttf\");\n}\n@font-face {\n    font-family: PressStart;\n    src: url(\"../assets/fonts/PressStart.ttf\");\n}\n\n* {\n    /* border: 1px solid red; */\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-size: 16px;\n}\n\n#container {\n    height: 100vh;\n    width: 100vw;\n    background-color: transparent;\n}\n\n.homepageContainer {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    color: grey;\n    background-color: transparent;\n    background-image: url(\"../assets/images/homescreen.jpg\");\n    background-size: cover;\n    background-position: center;\n}\n\n.homeHeader {\n    margin: 4rem 0;\n    font-family: BlackOps1;\n    font-size: 7rem;\n    text-align: center;\n    text-shadow: 1px 1px 1px #a8a8a8, 1px 2px 1px #a8a8a8, 1px 3px 1px #a8a8a8,\n        1px 4px 1px #a8a8a8, 1px 5px 1px #a8a8a8, 1px 6px 1px #a8a8a8,\n        1px 7px 1px #a8a8a8, 1px 8px 1px #a8a8a8;\n}\n\n.newGameContainer {\n    margin-bottom: auto;\n}\n\n.newGame {\n    font-family: PressStart;\n    font-size: 2rem;\n    overflow: hidden;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.4rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n    cursor: pointer;\n    text-shadow: 0 0 10px rgba(0, 0, 0, 0.185);\n}\n\n.newGame:hover {\n    color: darkgray;\n}\n\n@keyframes typing {\n    from {\n        width: 0;\n    }\n    to {\n        width: 100%;\n    }\n}\n\n@keyframes blink-caret {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: grey;\n    }\n}\n\n.smokeContainer {\n    position: fixed;\n    bottom: 40%;\n    left: 65%;\n    transform: translateX(-50%);\n    margin: 0;\n    padding: 0;\n}\n\n@media (max-width: 1200px) {\n    .smoke {\n        left: 75%;\n    }\n}\n\n@media (max-width: 900px) {\n    .smokeContainer {\n        left: 80%;\n    }\n\n    .homeHeader {\n        font-size: 5rem;\n        margin-bottom: 5rem;\n    }\n}\n\n@media (max-width: 600px) {\n    .homeHeader {\n        font-size: 4rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.5rem;\n    }\n}\n\n@media (max-width: 500px) {\n    .homeHeader {\n        font-size: 3rem;\n        margin-bottom: 5rem;\n    }\n    .newGame {\n        font-size: 1.2rem;\n    }\n}\n\n.smoke {\n    position: absolute;\n    list-style: none;\n    width: 80px;\n    height: 80px;\n    background: #262626;\n    border-radius: 50%;\n    filter: blur(15px);\n}\n\n.smoke:nth-child(even) {\n    animation: animateEven 3.5s linear infinite;\n}\n.smoke:nth-child(odd) {\n    animation: animateOdd 3.5s linear infinite;\n}\n\n.smoke:nth-child(9) {\n    animation: none;\n    filter: blur(15px);\n}\n\n@keyframes animateEven {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n@keyframes animateOdd {\n    0% {\n        transform: translate(0, 0) scale(1);\n        opacity: 1;\n        filter: blur(10px);\n    }\n    100% {\n        transform: translate(-100px, -500px) scale(3);\n        opacity: 0;\n        filter: blur(15px);\n    }\n}\n\n.smoke:nth-child(1) {\n    animation-delay: 0s;\n}\n.smoke:nth-child(2) {\n    animation-delay: 0.4s;\n}\n.smoke:nth-child(3) {\n    animation-delay: 0.8s;\n}\n.smoke:nth-child(4) {\n    animation-delay: 1.2s;\n}\n.smoke:nth-child(5) {\n    animation-delay: 1.6s;\n}\n.smoke:nth-child(6) {\n    animation-delay: 2s;\n}\n.smoke:nth-child(7) {\n    animation-delay: 2.4s;\n}\n.smoke:nth-child(8) {\n    animation-delay: 2.8s;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/mappage.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/mappage.css ***!
  \*******************************************************************/
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



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/Kalam-Regular.ttf */ "./src/assets/fonts/Kalam-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/map.jpg */ "./src/assets/images/map.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n    font-family: Kalam;\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n.map {\n    width: 100vw;\n    height: 100vh;\n    position: relative;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: cover;\n    background-position: center;\n    animation: unblur 0.5s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes unblur {\n    0% {\n    }\n    100% {\n        filter: blur(0);\n    }\n}\n.redPin1 {\n    position: absolute;\n    top: 41%;\n    left: 63%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin2 {\n    position: absolute;\n    top: 19%;\n    left: 57%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin3 {\n    position: absolute;\n    top: 40%;\n    left: 81%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n\n.redPin1:hover {\n    opacity: 1;\n}\n.redPin2:hover {\n    opacity: 1;\n}\n.redPin3:hover {\n    opacity: 1;\n}\n\n.noteContainer {\n    width: 250px;\n    height: 250px;\n    position: fixed;\n    top: 60%;\n    left: 30%;\n    transform: rotate(-1deg);\n    animation: fly 0.1s linear;\n}\n.paraContainer {\n    position: absolute;\n    top: 10px;\n    font-family: Kalam;\n    transform: skew(-2deg, -2deg);\n}\n\n.stickyNote {\n    position: absolute;\n    top: -80px;\n    left: -70px;\n    width: 400px;\n    height: 400px;\n}\n\n@keyframes fly {\n    0% {\n        transform: translateY(200%);\n    }\n    100% {\n    }\n}\n\n@media (max-width: 1700px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 21%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n\n@media (max-width: 1600px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 22%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1500px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 23%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1400px) {\n    .redPin1 {\n        top: 40%;\n        left: 62%;\n    }\n    .redPin2 {\n        top: 24%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1300px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 81%;\n    }\n}\n@media (max-width: 1200px) {\n    .redPin1 {\n        top: 40%;\n        left: 64%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 84%;\n    }\n}\n@media (max-width: 1100px) {\n    .redPin1 {\n        top: 40%;\n        left: 65%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 57%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 87%;\n    }\n}\n@media (max-width: 1000px) {\n    .redPin1 {\n        top: 40%;\n        left: 67%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 58%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 90%;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/mappage.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,4CAA6C;AACjD;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,yDAAiD;IACjD,sBAAsB;IACtB,2BAA2B;IAC3B,6BAA6B;IAC7B,6BAA6B;AACjC;;AAEA;IACI;IACA;IACA;QACI,eAAe;IACnB;AACJ;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;AACA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;AACA;IACI,UAAU;AACd;AACA;IACI,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,QAAQ;IACR,SAAS;IACT,wBAAwB;IACxB,0BAA0B;AAC9B;AACA;IACI,kBAAkB;IAClB,SAAS;IACT,kBAAkB;IAClB,6BAA6B;AACjC;;AAEA;IACI,kBAAkB;IAClB,UAAU;IACV,WAAW;IACX,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI;QACI,2BAA2B;IAC/B;IACA;IACA;AACJ;;AAEA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;;AAEA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ;AACA;IACI;QACI,QAAQ;QACR,SAAS;IACb;IACA;QACI,UAAU;QACV,SAAS;IACb;IACA;QACI,QAAQ;QACR,SAAS;IACb;AACJ","sourcesContent":["@font-face {\n    font-family: Kalam;\n    src: url(\"../assets/fonts/Kalam-Regular.ttf\");\n}\n\n.map {\n    width: 100vw;\n    height: 100vh;\n    position: relative;\n    background-image: url(\"../assets/images/map.jpg\");\n    background-size: cover;\n    background-position: center;\n    animation: unblur 0.5s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes unblur {\n    0% {\n    }\n    100% {\n        filter: blur(0);\n    }\n}\n.redPin1 {\n    position: absolute;\n    top: 41%;\n    left: 63%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin2 {\n    position: absolute;\n    top: 19%;\n    left: 57%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n.redPin3 {\n    position: absolute;\n    top: 40%;\n    left: 81%;\n    cursor: pointer;\n    opacity: 0.9;\n}\n\n.redPin1:hover {\n    opacity: 1;\n}\n.redPin2:hover {\n    opacity: 1;\n}\n.redPin3:hover {\n    opacity: 1;\n}\n\n.noteContainer {\n    width: 250px;\n    height: 250px;\n    position: fixed;\n    top: 60%;\n    left: 30%;\n    transform: rotate(-1deg);\n    animation: fly 0.1s linear;\n}\n.paraContainer {\n    position: absolute;\n    top: 10px;\n    font-family: Kalam;\n    transform: skew(-2deg, -2deg);\n}\n\n.stickyNote {\n    position: absolute;\n    top: -80px;\n    left: -70px;\n    width: 400px;\n    height: 400px;\n}\n\n@keyframes fly {\n    0% {\n        transform: translateY(200%);\n    }\n    100% {\n    }\n}\n\n@media (max-width: 1700px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 21%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n\n@media (max-width: 1600px) {\n    .redPin1 {\n        top: 41%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 22%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1500px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 23%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1400px) {\n    .redPin1 {\n        top: 40%;\n        left: 62%;\n    }\n    .redPin2 {\n        top: 24%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 80%;\n    }\n}\n@media (max-width: 1300px) {\n    .redPin1 {\n        top: 40%;\n        left: 63%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 81%;\n    }\n}\n@media (max-width: 1200px) {\n    .redPin1 {\n        top: 40%;\n        left: 64%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 56%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 84%;\n    }\n}\n@media (max-width: 1100px) {\n    .redPin1 {\n        top: 40%;\n        left: 65%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 57%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 87%;\n    }\n}\n@media (max-width: 1000px) {\n    .redPin1 {\n        top: 40%;\n        left: 67%;\n    }\n    .redPin2 {\n        top: 24.5%;\n        left: 58%;\n    }\n    .redPin3 {\n        top: 40%;\n        left: 90%;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/namepage.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/namepage.css ***!
  \********************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".newGameContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 2rem;\n}\n\n.newGameContainer p {\n    font-family: PressStart;\n    overflow: hidden;\n    font-size: 1.2rem;\n    font-weight: 700;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.2rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n}\n\n.nameForm {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    justify-content: center;\n    align-items: center;\n}\n\n.nameForm input {\n    background-color: grey;\n    font-family: PressStart;\n    font-size: 1rem;\n    padding: 1rem 1rem;\n    border: none;\n    outline: none;\n    color: white;\n    caret-color: black;\n    box-shadow: 3px 3px 5px #a8a8a8;\n    letter-spacing: 3px;\n    opacity: 0.8;\n}\n\n.nameForm input:focus {\n    opacity: 1;\n}\n\n.nameForm input::placeholder {\n    color: white;\n}\n\n.nameForm button {\n    font-family: BlackOps1;\n    font-size: 2rem;\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    color: rgb(71, 71, 71);\n    opacity: 0.8;\n}\n\n.nameForm button:hover {\n    opacity: 1;\n}\n\n.hide {\n    animation: burn 1s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes burn {\n    0% {\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n@media (max-width: 500px) {\n    .nameForm input {\n        width: 80%;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/namepage.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,uBAAuB;IACvB,gBAAgB;IAChB,iBAAiB;IACjB,gBAAgB;IAChB,kBAAkB;IAClB,6BAA6B;IAC7B,mBAAmB;IACnB,wBAAwB;IACxB,sBAAsB;IACtB,wEAAwE;AAC5E;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,sBAAsB;IACtB,uBAAuB;IACvB,eAAe;IACf,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,+BAA+B;IAC/B,mBAAmB;IACnB,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,sBAAsB;IACtB,eAAe;IACf,eAAe;IACf,YAAY;IACZ,6BAA6B;IAC7B,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,yBAAyB;IACzB,6BAA6B;AACjC;;AAEA;IACI;IACA;IACA;QACI,UAAU;IACd;AACJ;;AAEA;IACI;QACI,UAAU;IACd;AACJ","sourcesContent":[".newGameContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 2rem;\n}\n\n.newGameContainer p {\n    font-family: PressStart;\n    overflow: hidden;\n    font-size: 1.2rem;\n    font-weight: 700;\n    text-align: center;\n    border-right: 1rem solid grey;\n    white-space: nowrap;\n    margin: 0 auto auto auto;\n    letter-spacing: 0.2rem;\n    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;\n}\n\n.nameForm {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    justify-content: center;\n    align-items: center;\n}\n\n.nameForm input {\n    background-color: grey;\n    font-family: PressStart;\n    font-size: 1rem;\n    padding: 1rem 1rem;\n    border: none;\n    outline: none;\n    color: white;\n    caret-color: black;\n    box-shadow: 3px 3px 5px #a8a8a8;\n    letter-spacing: 3px;\n    opacity: 0.8;\n}\n\n.nameForm input:focus {\n    opacity: 1;\n}\n\n.nameForm input::placeholder {\n    color: white;\n}\n\n.nameForm button {\n    font-family: BlackOps1;\n    font-size: 2rem;\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    color: rgb(71, 71, 71);\n    opacity: 0.8;\n}\n\n.nameForm button:hover {\n    opacity: 1;\n}\n\n.hide {\n    animation: burn 1s linear;\n    animation-fill-mode: forwards;\n}\n\n@keyframes burn {\n    0% {\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n@media (max-width: 500px) {\n    .nameForm input {\n        width: 80%;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/stagingscreen.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/stagingscreen.css ***!
  \*************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    flex: 2;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px rgba(0, 255, 0, 0.5),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: rgb(49, 158, 49);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid rgba(0, 255, 0, 1);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, #00ff00 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.radar li:nth-child(8) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(9) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(10) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(11) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(12) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin #777, 0 4vmin 0.15vmin 0vmin #777,\n        0 2vmin 0.15vmin 0vmin #777, -20px 20px 50px black;\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 50px rgba(0, 255, 0, 0.5);\n    display: flex;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5),\n        inset 0 0 10px rgba(0, 255, 0, 0.5);\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8),\n        inset 0 0 10px rgba(0, 255, 0, 0.8);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n.CarrierContainer:hover,\n.BattleshipContainer:hover,\n.DestroyerContainer:hover,\n.SubmarineContainer:hover,\n.Patrol-BoatContainer:hover {\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n}\n\n.board {\n    margin-top: auto;\n    position: relative;\n\n    border-bottom: 10px solid rgb(155, 155, 155);\n    border-right: 30px solid rgb(182, 182, 182);\n    border-top: 30px solid rgb(71, 71, 71);\n    border-left: 30px solid rgb(94, 94, 94);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px rgba(0, 255, 0, 0.5);\n    border-top-left-radius: 5%;\n    border-top-right-radius: 5%;\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.6);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.cell {\n    height: 100%;\n    width: 100%;\n    border: 1px solid #009c00;\n}\n.tile.x0 {\n    border-left: none;\n}\n.tile.x9 {\n    border-right: none;\n}\n.tile.y9 {\n    border-top: none;\n}\n.tile.y0 {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.5);\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: #00ff00;\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: #00ff00;\n    }\n}\n.waves {\n    position: absolute;\n    width: 100vw;\n\n    top: -50px;\n    animation: wave 10s linear infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/stagingscreen.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,SAAS;IACT,aAAa;IACb,8BAA8B;IAC9B;;;;;;;;KAQC;IACD,iBAAiB;AACrB;AACA;IACI,OAAO;;IAEP,6BAA6B;IAC7B,aAAa;IACb,uBAAuB;IACvB,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,OAAO;IACP,kCAAkC;IAClC,iCAAiC;IACjC,wCAAwC;IACxC,yCAAyC;AAC7C;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,gCAAgC;IAChC,SAAS;IACT,UAAU;IACV,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,0BAA0B;IAC1B,uBAAuB;IACvB;4BACwB;IACxB,gBAAgB;AACpB;;AAEA;;;;IAII,gBAAgB;IAChB,kBAAkB;IAClB,QAAQ;IACR,WAAW;IACX,WAAW;IACX,4BAA4B;IAC5B,kBAAkB;AACtB;AACA;IACI,wBAAwB;AAC5B;AACA;IACI,wBAAwB;AAC5B;AACA;IACI,yBAAyB;AAC7B;;AAEA;;IAEI,gBAAgB;IAChB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,gCAAgC;IAChC,oCAAoC;IACpC,uBAAuB;IACvB,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,WAAW;IACX,YAAY;IACZ,+DAA+D;IAC/D,mCAAmC;IACnC,0BAA0B;AAC9B;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,kCAAkC;AACtC;AACA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,kCAAkC;AACtC;AACA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,kCAAkC;AACtC;AACA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,kCAAkC;AACtC;AACA;IACI,gBAAgB;IAChB,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,kCAAkC;AACtC;;AAEA;IACI;QACI,uBAAuB;IAC3B;IACA;QACI,yBAAyB;IAC7B;AACJ;;AAEA;IACI;QACI,UAAU;IACd;IACA;QACI,UAAU;IACd;IACA;QACI,UAAU;IACd;AACJ;;AAEA;IACI,aAAa;IACb,kCAAkC;IAClC,iCAAiC;IACjC,wCAAwC;IACxC,yCAAyC;AAC7C;;AAEA;IACI,mBAAmB;IACnB,WAAW;IACX,qBAAqB;IACrB;0DACsD;IACtD,gCAAgC;IAChC,sCAAsC;IACtC,oBAAoB;IACpB,WAAW;AACf;;AAEA;IACI,mBAAmB;IACnB,SAAS;IACT,aAAa;IACb,cAAc;IACd,mBAAmB;IACnB,kBAAkB;IAClB,eAAe;IACf,aAAa;IACb,0EAA0E;IAC1E,aAAa;IACb,+BAA+B;IAC/B,6BAA6B;AACjC;;AAEA;IACI,0EAA0E;IAC1E,aAAa;IACb,4BAA4B;AAChC;AACA;;IAEI,0EAA0E;IAC1E,YAAY;IACZ,6BAA6B;AACjC;AACA;IACI,yDAAyD;IACzD,mBAAmB;IACnB,kCAAkC;AACtC;;AAEA;IACI,UAAU;AACd;AACA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,kCAAkC;IAClC,iCAAiC;IACjC,wCAAwC;IACxC,yCAAyC;AAC7C;AACA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,kCAAkC;IAClC,iCAAiC;IACjC,wCAAwC;IACxC,yCAAyC;AAC7C;AACA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,kCAAkC;IAClC,iCAAiC;IACjC,wCAAwC;IACxC,yCAAyC;AAC7C;;AAEA;IACI,yBAAyB;IACzB,kBAAkB;IAClB,sBAAsB;IACtB,iBAAiB;IACjB,kBAAkB;IAClB,0BAA0B;IAC1B,kBAAkB;IAClB,YAAY;IACZ,sBAAsB;IACtB,gCAAgC;AACpC;AACA;IACI,WAAW;IACX,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,yBAAyB;IACzB,kBAAkB;IAClB,SAAS;IACT,SAAS;IACT,yBAAyB;AAC7B;AACA;IACI,WAAW;IACX,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,yBAAyB;IACzB,kBAAkB;IAClB,SAAS;IACT,UAAU;IACV,yBAAyB;AAC7B;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,OAAO;IACP,kCAAkC;IAClC,iCAAiC;IACjC,wCAAwC;IACxC,yCAAyC;IACzC,aAAa;IACb,sBAAsB;IACtB,8BAA8B;AAClC;;AAEA;IACI,OAAO;;IAEP,kCAAkC;IAClC,iCAAiC;IACjC,wCAAwC;IACxC,yCAAyC;IACzC,uBAAuB;IACvB,+CAA+C;IAC/C,aAAa;AACjB;;AAEA;IACI,aAAa;IACb,OAAO;IACP,aAAa;IACb,QAAQ;IACR,yBAAyB;IACzB,mBAAmB;IACnB,iBAAiB;AACrB;AACA;IACI,YAAY;IACZ,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB;2CACuC;AAC3C;;AAEA;IACI;2CACuC;AAC3C;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,eAAe;AACnB;;AAEA;;;;;IAKI,aAAa;IACb,sBAAsB;AAC1B;;AAEA;;;;;AAKA;;AAEA;;;;;IAKI,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,SAAS;IACT,YAAY;IACZ,WAAW;IACX,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,qBAAqB;IACrB,oBAAoB;IACpB,uBAAuB;AAC3B;;AAEA;IACI,iCAAiC;IACjC,SAAS;IACT,QAAQ;IACR,WAAW;IACX,YAAY;IACZ,wCAAwC;AAC5C;;AAEA;;;;;;;;;;;;;;;;;;;;GAoBG;;AAEH;IACI,iCAAiC;AACrC;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,sBAAsB;AAC1B;AACA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;;IAElB,4CAA4C;IAC5C,2CAA2C;IAC3C,sCAAsC;IACtC,uCAAuC;IACvC,oCAAoC;IACpC,gDAAgD;IAChD,0BAA0B;IAC1B,2BAA2B;IAC3B,aAAa;IACb,oCAAoC;IACpC,uCAAuC;AAC3C;;AAEA;IACI,aAAa;IACb,oCAAoC;IACpC,uCAAuC;IACvC,kBAAkB;IAClB,MAAM;IACN,SAAS;IACT,OAAO;IACP,QAAQ;IACR,oBAAoB;AACxB;;AAEA;;;;;IAKI,mBAAmB;AACvB;;AAEA;;;;;IAKI,mBAAmB;IACnB,+CAA+C;AACnD;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,yBAAyB;AAC7B;AACA;IACI,iBAAiB;AACrB;AACA;IACI,kBAAkB;AACtB;AACA;IACI,gBAAgB;AACpB;AACA;IACI,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,SAAS;IACT,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,qBAAqB;IACrB,oBAAoB;IACpB,uBAAuB;AAC3B;;AAEA;IACI,SAAS;AACb;;AAEA;IACI,iCAAiC;IACjC,SAAS;IACT,QAAQ;AACZ;;AAEA;IACI,UAAU;AACd;;AAEA;AACA;;AAEA;IACI,oCAAoC;IACpC,SAAS;IACT,QAAQ;AACZ;;AAEA;IACI,sCAAsC;IACtC,SAAS;IACT,QAAQ;AACZ;;AAEA;IACI,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,oCAAoC;IACpC,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,wBAAwB;IACxB,OAAO;IACP,SAAS;AACb;AACA;IACI,wBAAwB;IACxB,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,0BAA0B;IAC1B,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,wBAAwB;IACxB,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,QAAQ;AACZ;AACA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,kCAAkC;IAClC,iCAAiC;IACjC,wCAAwC;IACxC,yCAAyC;IACzC,uBAAuB;IACvB,+CAA+C;AACnD;;AAEA;IACI,uBAAuB;IACvB,YAAY;IACZ,eAAe;IACf,cAAc;IACd,gBAAgB;IAChB,mBAAmB;IACnB,oCAAoC;IACpC,gBAAgB;IAChB,wEAAwE;AAC5E;;AAEA;IACI;;QAEI,yBAAyB;IAC7B;IACA;QACI,qBAAqB;IACzB;AACJ;AACA;IACI,kBAAkB;IAClB,YAAY;;IAEZ,UAAU;IACV,mCAAmC;AACvC;AACA;IACI,kBAAkB;IAClB,UAAU;IACV,cAAc;IACd,2BAA2B;IAC3B;;;;;KAKC;IACD,WAAW;;IAEX,gCAAgC;IAChC,iCAAiC;IACjC,kCAAkC;IAClC,mCAAmC;IACnC,yBAAyB;AAC7B;AACA;IACI,kBAAkB;IAClB,UAAU;IACV,cAAc;IACd,2BAA2B;IAC3B;;;;;KAKC;;IAED,WAAW;IACX,WAAW;;IAEX,gCAAgC;IAChC,iCAAiC;IACjC,kCAAkC;IAClC,mCAAmC;IACnC,yBAAyB;AAC7B;;AAEA;;;;;;IAMI,kBAAkB;IAClB,WAAW;IACX,aAAa;IACb,gCAAgC;IAChC,iCAAiC;IACjC,2BAA2B;IAC3B;;;;;KAKC;IACD,wBAAwB;AAC5B;;AAEA;IACI,WAAW;IACX,WAAW;AACf;AACA;IACI,WAAW;IACX,WAAW;AACf;AACA;IACI,WAAW;IACX,WAAW;AACf;AACA;IACI,UAAU;IACV,WAAW;AACf;AACA;IACI,UAAU;IACV,WAAW;AACf;AACA;IACI,UAAU;IACV,WAAW;AACf;;AAEA;IACI,2BAA2B;IAC3B;;;;;KAKC;IACD,UAAU;IACV,WAAW;IACX,kBAAkB;IAClB,YAAY;IACZ,aAAa;AACjB;AACA;IACI,2BAA2B;IAC3B,8BAA8B;IAC9B;;;;;KAKC;;IAED,UAAU;IACV,WAAW;IACX,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,kBAAkB;AACtB;;AAEA;IACI;IACA;IACA;QACI,2BAA2B;IAC/B;IACA;IACA;AACJ;;AAEA;IACI;;;;;;;;QAQI,kCAAkC;IACtC;IACA;;;;;;QAMI,yCAAyC;IAC7C;IACA;QACI,WAAW;IACf;AACJ;;AAEA;IACI;;;;;;;;QAQI,gCAAgC;IACpC;IACA;;;;;;QAMI,8CAA8C;IAClD;AACJ;;AAEA;IACI;;;;;;;;QAQI,gCAAgC;IACpC;IACA;;;;;;QAMI,8CAA8C;IAClD;AACJ;;AAEA;IACI;QACI,eAAe;QACf,UAAU;QACV,WAAW;QACX,aAAa;QACb,YAAY;QACZ,6BAA6B;QAC7B,qBAAqB;QACrB,YAAY;IAChB;IACA;QACI,SAAS;QACT,qBAAqB;IACzB;AACJ;;AAEA;IACI;QACI,eAAe;QACf,sBAAsB;QACtB,QAAQ;QACR,MAAM;QACN,sBAAsB;QACtB,qBAAqB;IACzB;;IAEA;;;;;;QAMI,+CAA+C;IACnD;IACA;;QAEI,4BAA4B;IAChC;IACA;QACI,WAAW;IACf;IACA;QACI,SAAS;QACT,mBAAmB;IACvB;AACJ;;AAEA;IACI;QACI,qBAAqB;QACrB,UAAU;QACV,WAAW;IACf;;IAEA;QACI,gBAAgB;QAChB,mBAAmB;QACnB,WAAW;IACf;IACA;QACI,sBAAsB;;QAEtB,gBAAgB;QAChB,YAAY;IAChB;;IAEA;QACI,aAAa;QACb,OAAO;QACP,UAAU;QACV,SAAS;IACb;;IAEA;QACI,gBAAgB;QAChB,oCAAoC;QACpC,uCAAuC;IAC3C;IACA;QACI,WAAW;QACX,YAAY;IAChB;IACA;QACI,SAAS;QACT,UAAU;QACV,aAAa;QACb,aAAa;QACb,UAAU;IACd;AACJ;;AAEA;IACI;QACI,aAAa;IACjB;AACJ","sourcesContent":[".gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    flex: 2;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px rgba(0, 255, 0, 0.5),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: rgb(49, 158, 49);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid rgba(0, 255, 0, 1);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, #00ff00 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.radar li:nth-child(8) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(9) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(10) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(11) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(12) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin #777, 0 4vmin 0.15vmin 0vmin #777,\n        0 2vmin 0.15vmin 0vmin #777, -20px 20px 50px black;\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 50px rgba(0, 255, 0, 0.5);\n    display: flex;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5),\n        inset 0 0 10px rgba(0, 255, 0, 0.5);\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8),\n        inset 0 0 10px rgba(0, 255, 0, 0.8);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n.CarrierContainer:hover,\n.BattleshipContainer:hover,\n.DestroyerContainer:hover,\n.SubmarineContainer:hover,\n.Patrol-BoatContainer:hover {\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n}\n\n.board {\n    margin-top: auto;\n    position: relative;\n\n    border-bottom: 10px solid rgb(155, 155, 155);\n    border-right: 30px solid rgb(182, 182, 182);\n    border-top: 30px solid rgb(71, 71, 71);\n    border-left: 30px solid rgb(94, 94, 94);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px rgba(0, 255, 0, 0.5);\n    border-top-left-radius: 5%;\n    border-top-right-radius: 5%;\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.6);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.cell {\n    height: 100%;\n    width: 100%;\n    border: 1px solid #009c00;\n}\n.tile.x0 {\n    border-left: none;\n}\n.tile.x9 {\n    border-right: none;\n}\n.tile.y9 {\n    border-top: none;\n}\n.tile.y0 {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.5);\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: #00ff00;\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: #00ff00;\n    }\n}\n.waves {\n    position: absolute;\n    width: 100vw;\n\n    top: -50px;\n    animation: wave 10s linear infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/CSS/homepage.css":
/*!******************************!*\
  !*** ./src/CSS/homepage.css ***!
  \******************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./homepage.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/homepage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_homepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/CSS/mappage.css":
/*!*****************************!*\
  !*** ./src/CSS/mappage.css ***!
  \*****************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./mappage.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/mappage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_mappage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/CSS/namepage.css":
/*!******************************!*\
  !*** ./src/CSS/namepage.css ***!
  \******************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./namepage.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/namepage.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_namepage_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/CSS/stagingscreen.css":
/*!***********************************!*\
  !*** ./src/CSS/stagingscreen.css ***!
  \***********************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_stagingscreen_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./stagingscreen.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/stagingscreen.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_stagingscreen_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_stagingscreen_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_stagingscreen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_stagingscreen_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./src/assets/fonts/Kalam-Regular.ttf":
/*!********************************************!*\
  !*** ./src/assets/fonts/Kalam-Regular.ttf ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "831aaad03890ba2d7417.ttf";

/***/ }),

/***/ "./src/assets/fonts/PressStart.ttf":
/*!*****************************************!*\
  !*** ./src/assets/fonts/PressStart.ttf ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "21503c6a5385ab41dde9.ttf";

/***/ }),

/***/ "./src/assets/images/Battleship.svg":
/*!******************************************!*\
  !*** ./src/assets/images/Battleship.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b296a2ae0b89c01127bb.svg";

/***/ }),

/***/ "./src/assets/images/Carrier.svg":
/*!***************************************!*\
  !*** ./src/assets/images/Carrier.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "dddc4e230515f4d9eb8b.svg";

/***/ }),

/***/ "./src/assets/images/Destroyer.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/Destroyer.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "95609390a6c749baa86b.svg";

/***/ }),

/***/ "./src/assets/images/Patrol-Boat.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/Patrol-Boat.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b9f119f450d6103b387f.svg";

/***/ }),

/***/ "./src/assets/images/Submarine.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/Submarine.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "592d5198af2685f821a5.svg";

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

/***/ "./src/assets/images/sticky-note.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/sticky-note.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d9429b1297ae21d9dbae.svg";

/***/ }),

/***/ "./src/assets/videos/ocean.mp4":
/*!*************************************!*\
  !*** ./src/assets/videos/ocean.mp4 ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3d12a96c634910c49338.mp4";

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
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_scripts_components_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/scripts/components/Game.js */ "./src/scripts/components/Game.js");
/* harmony import */ var _src_scripts_ViewModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/scripts/ViewModel */ "./src/scripts/ViewModel.js");
/* harmony import */ var _src_scripts_DOM_App_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/scripts/DOM/App.js */ "./src/scripts/DOM/App.js");



const model = new _src_scripts_components_Game_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const vm = new _src_scripts_ViewModel__WEBPACK_IMPORTED_MODULE_1__["default"](model);
new _src_scripts_DOM_App_js__WEBPACK_IMPORTED_MODULE_2__["default"](vm, document.querySelector("#container"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLE1BQU0sS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxNQUFNLE9BQU8sYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sTUFBTSxZQUFZLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsTUFBTSxPQUFPLE9BQU8sS0FBSyxLQUFLLE9BQU8sT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxTQUFTLFVBQVUsWUFBWSxPQUFPLFNBQVMsTUFBTSxTQUFTLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyx3QkFBd0IsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLGNBQWMsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLFNBQVMsWUFBWSxPQUFPLFNBQVMsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLEtBQUssS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssTUFBTSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFlBQVksWUFBWSxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksVUFBVSxLQUFLLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFVBQVUsTUFBTSxVQUFVLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxVQUFVLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxVQUFVLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsVUFBVSxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8s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anMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9HYW1lUGFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL0hvbWVQYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ET00vSG9tZVBhZ2VJbnB1dC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL01hcFBhZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9lbGVtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ET00vZ2FtZUVsZW1lbnRzL0JvYXJkRWxlbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL2dhbWVFbGVtZW50cy9HYW1lTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL2dhbWVFbGVtZW50cy9TaGlwRWxlbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL2dhbWVFbGVtZW50cy9TaGlwUXVldWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL1B1YlN1YkludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvVmlld01vZGVsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1RpbGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvaG9tZXBhZ2UuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL21hcHBhZ2UuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL25hbWVwYWdlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9zdGFnaW5nc2NyZWVuLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvaG9tZXBhZ2UuY3NzPzE0Y2YiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvbWFwcGFnZS5jc3M/NzFlYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9uYW1lcGFnZS5jc3M/N2FkYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9zdGFnaW5nc2NyZWVuLmNzcz82M2U3Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5cbmltcG9ydCBIb21lUGFnZSBmcm9tIFwiLi9Ib21lUGFnZS5qc1wiO1xuaW1wb3J0IE1hcFBhZ2UgZnJvbSBcIi4vTWFwUGFnZS5qc1wiO1xuaW1wb3J0IEdhbWVQYWdlIGZyb20gXCIuL0dhbWVQYWdlLmpzXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi9lbGVtLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gb2xkTW9kZWwuY3VycmVudFBhZ2UgIT09IG5ld01vZGVsLmN1cnJlbnRQYWdlO1xuICAgIH1cblxuICAgIHJlbmRlcih7IGN1cnJlbnRQYWdlIH0pIHtcbiAgICAgICAgY29uc3QgYXBwRWxlbWVudCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBpZDogXCJhcHBcIiB9KTtcblxuICAgICAgICBpZiAoY3VycmVudFBhZ2UgPT09IFwiaG9tZVBhZ2VcIikge1xuICAgICAgICAgICAgbmV3IEhvbWVQYWdlKHRoaXMudmlld01vZGVsLCBhcHBFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PT0gXCJtYXBQYWdlXCIpIHtcbiAgICAgICAgICAgIG5ldyBNYXBQYWdlKHRoaXMudmlld01vZGVsLCBhcHBFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PT0gXCJnYW1lUGFnZVwiKSB7XG4gICAgICAgICAgICBuZXcgR2FtZVBhZ2UodGhpcy52aWV3TW9kZWwsIGFwcEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcHBFbGVtZW50O1xuICAgIH1cbn1cbiIsIi8vIGltcG9ydCBCb2FyZCBmcm9tIFwiLi9ib2FyZFZpZXcuanNcIjtcbmltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuaW1wb3J0IHdhdmVzU3JjIGZyb20gXCIuLi8uLi9hc3NldHMvdmlkZW9zL29jZWFuLm1wNFwiO1xuaW1wb3J0IFwiLi4vLi4vQ1NTL3N0YWdpbmdzY3JlZW4uY3NzXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi9lbGVtLmpzXCI7XG5pbXBvcnQgR2FtZU1lc3NhZ2UgZnJvbSBcIi4vZ2FtZUVsZW1lbnRzL0dhbWVNZXNzYWdlLmpzXCI7XG5pbXBvcnQgU2hpcFF1ZXVlIGZyb20gXCIuL2dhbWVFbGVtZW50cy9TaGlwUXVldWUuanNcIjtcbmltcG9ydCBCb2FyZEVsZW0gZnJvbSBcIi4vZ2FtZUVsZW1lbnRzL0JvYXJkRWxlbS5qc1wiO1xuaW1wb3J0IHsgcGxhY2VTaGlwUmFuZG9tbHkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9HYW1lLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVQYWdlIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBvbGRNb2RlbC5nYW1lU3RhdGUgPT09IFwicGxhY2VTaGlwc1wiICYmXG4gICAgICAgICAgICBuZXdNb2RlbC5nYW1lU3RhdGUgIT09IFwicGxhY2VTaGlwc1wiICYmXG4gICAgICAgICAgICBvbGRNb2RlbC5jdXJyZW50UGFnZSA9PT0gXCJnYW1lUGFnZVwiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkR2FtZXBhZ2UobW9kZWwpO1xuICAgIH1cblxuICAgIGJ1aWxkR2FtZXBhZ2UobW9kZWwpIHtcbiAgICAgICAgY29uc3QgbGVmdEJ1dHRvbiA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJidXR0b25cIixcbiAgICAgICAgICAgIGlkOiBcImFjdGl2YXRlXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicm90YXRlQnV0dG9uXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2VsZW0oeyBwcm9wOiBcInNwYW5cIiB9KV0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBtaWRkbGVCdXR0b24gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBpZDogXCJhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtlbGVtKHsgcHJvcDogXCJzcGFuXCIgfSldLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmlnaHRCdXR0b24gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBpZDogXCJhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtlbGVtKHsgcHJvcDogXCJzcGFuXCIgfSldLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobW9kZWwuZ2FtZVN0YXRlID09PSBcInBsYWNlU2hpcHNcIikge1xuICAgICAgICAgICAgbGVmdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IHsgLi4ub2xkTW9kZWwgfTtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5pc0hvcml6b250YWwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgIW5ld01vZGVsLnBsYXllci5zaGlwUXVldWVbMF0uaXNIb3Jpem9udGFsO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWlkZGxlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5kcm9wUXVldWUucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwpKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlwID0gbmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZS5zaGlmdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG5ld0dhbWVib2FyZCwgbmV3U2hpcCB9ID0gcGxhY2VTaGlwUmFuZG9tbHkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLmdhbWVib2FyZCA9IG5ld0dhbWVib2FyZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByaWdodEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC5kcm9wUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0gb2xkTW9kZWwuZHJvcFF1ZXVlLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoaXBDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcENvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2hpcFF1ZXVlKFxuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwsXG4gICAgICAgICAgICBzaGlwQ29udGFpbmVyLFxuICAgICAgICAgICAgKHNoaXBJbmRleCwgY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkSW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcEluZGV4ID0gc2hpcEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcEZvb3RlclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgR2FtZU1lc3NhZ2UodGhpcy52aWV3TW9kZWwsIG1lc3NhZ2VDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IGdhbWUgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImdhbWVcIiB9KTtcblxuICAgICAgICBpZiAobW9kZWwuZ2FtZVN0YXRlID09PSBcInBsYWNlU2hpcHNcIikge1xuICAgICAgICAgICAgbmV3IEJvYXJkRWxlbSh0aGlzLnZpZXdNb2RlbCwgZ2FtZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlW3RoaXMuZHJhZ2dlZFNoaXBJbmRleF0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJnYW1lQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicDFHcmlkQ29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcInZpZGVvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIndhdmVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiB3YXZlc1NyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNoaXBCb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcInNoaXBCb3dXb29kXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDFcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsMlwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWwzXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDRcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsNVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWw2XCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0NvdmVyXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmbGFrQ292ZXJUb3BcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInAxT3B0aW9uc0NvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwidWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInAxU2hpcFN0YWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3NoaXBDb250YWluZXIsIG1lc3NhZ2VDb250YWluZXJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25Db250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwibGVmdEJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJhc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtsZWZ0QnV0dG9uXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ1dHRvblRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiUm90YXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm1pZGRsZUJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJhc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFttaWRkbGVCdXR0b25dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnV0dG9uVGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJBdXRvLXBsYWNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJpZ2h0QnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYmFzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3JpZ2h0QnV0dG9uXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ1dHRvblRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiVW5kb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBnYW1lQ29udGFpbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4vZWxlbS5qc1wiO1xuaW1wb3J0IFwiLi4vLi4vQ1NTL2hvbWVwYWdlLmNzc1wiO1xuaW1wb3J0IEhvbWVQYWdlSW5wdXQgZnJvbSBcIi4vSG9tZVBhZ2VJbnB1dC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lUGFnZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IGhvbWVwYWdlQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImhvbWVwYWdlQ29udGFpbmVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhvbWVwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJCQVRUTEVTSElQXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImhvbWVIZWFkZXJcIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgbmV3R2FtZSA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJtYWluXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibmV3R2FtZUNvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgSG9tZVBhZ2VJbnB1dCh0aGlzLnZpZXdNb2RlbCwgbmV3R2FtZSk7XG5cbiAgICAgICAgaG9tZXBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQobmV3R2FtZSk7XG4gICAgICAgIGhvbWVwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJ1bFwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzbW9rZUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGhvbWVwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJmb290ZXJcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9vdGVyXCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwic3BhblwiLCB0ZXh0Q29udGVudDogXCJDcmVhdGVkIGJ5IEdsdXR0eiwgXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJJbWFnZSBieSB1cGtseWFrIG9uIEZyZWVwaWtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly93d3cuZnJlZXBpay5jb20vZnJlZS12ZWN0b3Ivc3Vua2VuLWNydWlzZS1zaGlwLXNlYS1oYXJib3ItbW9ybmluZ18yMTU4NDkxNS5odG0jcXVlcnk9YmF0dGxlc2hpcCUyMGJhY2tncm91bmQmcG9zaXRpb249MzImZnJvbV92aWV3PXNlYXJjaCZ0cmFjaz1haXNcIixcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGhvbWVwYWdlQ29udGFpbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uLy4uL0NTUy9uYW1lcGFnZS5jc3NcIjtcbmltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lUGFnZUlucHV0IGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZW5kZXIoeyBuYW1lUGFnZUlzT3BlbiB9KSB7XG4gICAgICAgIGNvbnN0IG5ld0dhbWVCdG4gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogXCJOZXcgR2FtZVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5ld0dhbWVcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZVBhZ2VJc09wZW46IHRydWUgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmFtZVBhZ2VJc09wZW4gPyB0aGlzLmJ1aWxkRm9ybSgpIDogbmV3R2FtZUJ0bjtcbiAgICB9XG5cbiAgICBidWlsZEZvcm0oKSB7XG4gICAgICAgIGNvbnN0IGdyZWV0aW5nID0gZWxlbSh7IHByb3A6IFwicFwiLCB0ZXh0Q29udGVudDogXCJIZWxsbyBBZG1pcmFsLi4uXCIgfSk7XG4gICAgICAgIGNvbnN0IGlucHV0RmllbGQgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiaW5wdXRcIixcbiAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTmFtZVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBcIkNvbnRpbnVlXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuYW1lRmllbGQgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZm9ybVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5hbWVGb3JtXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2lucHV0RmllbGQsIGJ1dHRvbl0sXG4gICAgICAgIH0pO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLmN1cnJlbnRQYWdlID0gXCJtYXBQYWdlXCI7XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLm5hbWUgPSBpbnB1dEZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb3JtQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2dyZWV0aW5nLCBuYW1lRmllbGRdLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybUNvbnRhaW5lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgZWxlbSBmcm9tIFwiLi9lbGVtLmpzXCI7XG5pbXBvcnQgXCIuLi8uLi9DU1MvbWFwcGFnZS5jc3NcIjtcbmltcG9ydCByZWRQaW5TcmMgZnJvbSBcIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcmVkLXBpbi5wbmdcIjtcbmltcG9ydCBzdGlja3lOb3RlU3JjIGZyb20gXCIuLi8uLi9hc3NldHMvaW1hZ2VzL3N0aWNreS1ub3RlLnN2Z1wiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFBhZ2UgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbmRlcih7IHN0YXRlTWVzc2FnZSwgcGxheWVyIH0pIHtcbiAgICAgICAgY29uc3QgcmVkUGlucyA9IFtcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgc3JjOiByZWRQaW5TcmMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJlZFBpbjFcIixcbiAgICAgICAgICAgICAgICBpZDogXCJlYXN5XCIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgc3JjOiByZWRQaW5TcmMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJlZFBpbjJcIixcbiAgICAgICAgICAgICAgICBpZDogXCJtZWRpdW1cIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgICAgICBzcmM6IHJlZFBpblNyYyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmVkUGluM1wiLFxuICAgICAgICAgICAgICAgIGlkOiBcImhhcmRcIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdO1xuXG4gICAgICAgIHJlZFBpbnMuZm9yRWFjaCgocGluKSA9PiB7XG4gICAgICAgICAgICBwaW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLmN1cnJlbnRQYWdlID0gXCJnYW1lUGFnZVwiO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5nYW1lU3RhdGUgPSBcInBsYWNlU2hpcHNcIjtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRW5lbWllcyBhcHByb2FjaC4gRGVwbG95IHRoZSBmbGVldC5cIjtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuQUkuZGlmZmljdWx0eSA9IHBpbi5pZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc3RhdGVNZXNzYWdlICE9PSBwaW4uaWQpIHtcbiAgICAgICAgICAgICAgICBwaW4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXRlTWVzc2FnZTogcGluLmlkIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBtYXAgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibWFwXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogcmVkUGlucyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0YXRlTWVzc2FnZSkge1xuICAgICAgICAgICAgY29uc3Qgbm90ZSA9IHRoaXMuYnVpbGROb3RlKHN0YXRlTWVzc2FnZSwgcGxheWVyKTtcbiAgICAgICAgICAgIG1hcC5hcHBlbmRDaGlsZChub3RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgYnVpbGROb3RlKHN0YXRlTWVzc2FnZSwgcGxheWVyKSB7XG4gICAgICAgIGNvbnN0IG5vdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgbm90ZTE6IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogXCJTb21hbGlhbiBDb2FzdFwiLFxuICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IFwiRWFzeVwiLFxuICAgICAgICAgICAgICAgIHBhcmE6IFwiSSByZWdyZXQgdG8gaW5mb3JtIHlvdSB0aGF0IGEgZ3JvdXAgb2YgU29tYWxpYW4gcGlyYXRlcyBoYXZlIHN1Y2Nlc3NmdWxseSBjb21tYW5kZWVyZWQgYW4gSW5kaWFuIGNhcnJpZXIgZ3JvdXAgaW4gdGhlIEFyYWJpYW4gU2VhLiBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RlMjoge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBcIkJsYWNrIFNlYVwiLFxuICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IFwiTWVkaXVtXCIsXG4gICAgICAgICAgICAgICAgcGFyYTogXCJJIGFtIHdyaXRpbmcgdG8gaW5mb3JtIHlvdSBhYm91dCBhIGdyb3VwIG9mIFJ1c3NpYW4gcGlyYXRlcyB3aG8gaGF2ZSBjb21tYW5kZWVyZWQgYSBSdXNzaWFuIGNhcnJpZXIgZ3JvdXAuIFRoaXMgZ3JvdXAgaXMgYSBzaWduaWZpY2FudCB0aHJlYXQgdG8gdGhlIHNhZmV0eSBhbmQgc2VjdXJpdHkgb2YgdGhlIGFyZWEuXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90ZTM6IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogXCJTb3V0aCBDaGluYSBTZWFcIixcbiAgICAgICAgICAgICAgICBkaWZmaWN1bHR5OiBcIkhhcmRcIixcbiAgICAgICAgICAgICAgICBwYXJhOiBcIkEgZ3JvdXAgb2YgQ2hpbmVzZSBwaXJhdGVzIGhhcyBtYW5hZ2VkIHRvIHNlaXplIGNvbnRyb2wgb2YgYSBDaGluZXNlIGNhcnJpZXIgZ3JvdXAsIGFuZCBpdCBwb3NlcyBhIHNpZ25pZmljYW50IHRocmVhdCB0byByZWdpb25hbCBzZWN1cml0eS5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGxldCBzZWxlY3RlZE9wdGlvbnMgPSB7fTtcbiAgICAgICAgc3dpdGNoIChzdGF0ZU1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgXCJlYXN5XCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zID0gbm90ZU9wdGlvbnMubm90ZTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWVkaXVtXCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zID0gbm90ZU9wdGlvbnMubm90ZTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaGFyZFwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucyA9IG5vdGVPcHRpb25zLm5vdGUzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vdGUgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYXJ0aWNsZVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5vdGVDb250YWluZXJcIixcbiAgICAgICAgICAgIGlkOiBzdGF0ZU1lc3NhZ2UsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImltZ1wiLFxuICAgICAgICAgICAgICAgICAgICBzcmM6IHN0aWNreU5vdGVTcmMsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzdGlja3lOb3RlXCIsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwYXJhQ29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogYExvY2F0aW9uOiAke3NlbGVjdGVkT3B0aW9ucy5sb2NhdGlvbn1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogYERpZmZpY3VsdHk6ICR7c2VsZWN0ZWRPcHRpb25zLmRpZmZpY3VsdHl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGBBZG1pcmFsICR7cGxheWVyLm5hbWV9LGAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwicFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBgJHtzZWxlY3RlZE9wdGlvbnMucGFyYX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbm90ZTtcbiAgICB9XG59XG4iLCJjb25zdCBlbGVtID0gKGNvbnRlbnQsIHZlcnNpb24gPSAxKSA9PiB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb250ZW50W1wicHJvcFwiXSk7XG4gICAgbGV0IHRleHQgPSBjb250ZW50W1widGV4dENvbnRlbnRcIl07XG4gICAgaWYgKHRleHQpIHtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIH1cbiAgICBsZXQgaWQgPSBjb250ZW50W1wiaWRcIl07XG4gICAgaWYgKGlkKSB7XG4gICAgICAgIGVsLmlkID0gaWQ7XG4gICAgfVxuICAgIGxldCBjbGFzc05hbWUgPSBjb250ZW50W1wiY2xhc3NOYW1lXCJdO1xuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH1cbiAgICBsZXQgSFRNTCA9IGNvbnRlbnRbXCJpbm5lckhUTUxcIl07XG4gICAgaWYgKEhUTUwpIHtcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gSFRNTDtcbiAgICB9XG4gICAgbGV0IHNyYyA9IGNvbnRlbnRbXCJzcmNcIl07XG4gICAgaWYgKHNyYykge1xuICAgICAgICBlbC5zcmMgPSBzcmM7XG4gICAgfVxuICAgIGxldCBmb3JJID0gY29udGVudFtcImZvclwiXTtcbiAgICBpZiAoZm9ySSkge1xuICAgICAgICBlbC5mb3IgPSBmb3JJO1xuICAgIH1cbiAgICBsZXQgdHlwZSA9IGNvbnRlbnRbXCJ0eXBlXCJdO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICAgIGVsLnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBsZXQgbmFtZSA9IGNvbnRlbnRbXCJuYW1lXCJdO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICAgIGVsLm5hbWUgPSBuYW1lO1xuICAgIH1cbiAgICBsZXQgdmFsdWUgPSBjb250ZW50W1widmFsdWVcIl07XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGxldCBwbGFjZWhvbGRlciA9IGNvbnRlbnRbXCJwbGFjZWhvbGRlclwiXTtcbiAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgZWwucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgbGV0IHNwZWxsY2hlY2sgPSBjb250ZW50W1wic3BlbGxjaGVja1wiXTtcbiAgICBpZiAoc3BlbGxjaGVjaykge1xuICAgICAgICBlbC5zcGVsbGNoZWNrID0gc3BlbGxjaGVjaztcbiAgICB9XG4gICAgbGV0IHJlcXVpcmVkID0gY29udGVudFtcInJlcXVpcmVkXCJdO1xuICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICBlbC5yZXF1aXJlZCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBjaGVja2VkID0gY29udGVudFtcImNoZWNrZWRcIl07XG4gICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBocmVmID0gY29udGVudFtcImhyZWZcIl07XG4gICAgaWYgKGhyZWYpIHtcbiAgICAgICAgZWwuaHJlZiA9IGhyZWY7XG4gICAgfVxuICAgIGxldCBhdXRvcGxheSA9IGNvbnRlbnRbXCJhdXRvcGxheVwiXTtcbiAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgICAgZWwuYXV0b3BsYXkgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgbXV0ZWQgPSBjb250ZW50W1wibXV0ZWRcIl07XG4gICAgaWYgKG11dGVkKSB7XG4gICAgICAgIGVsLm11dGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGxvb3AgPSBjb250ZW50W1wibG9vcFwiXTtcbiAgICBpZiAobG9vcCkge1xuICAgICAgICBlbC5sb29wID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGRyYWdnYWJsZSA9IGNvbnRlbnRbXCJkcmFnZ2FibGVcIl07XG4gICAgaWYgKGRyYWdnYWJsZSkge1xuICAgICAgICBlbC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgY2hpbGRyZW4gPSBjb250ZW50W1wiY2hpbGRyZW5cIl07XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAodmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGVsZW0oY2hpbGQsIDIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbDtcbn07XG5cbi8vIGZ1bmN0aW9uIGVsZW0oY29udGVudCkge1xuLy8gICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb250ZW50W1wicHJvcFwiXSk7XG5cbi8vICAgICBmb3IgKGxldCBrZXkgaW4gY29udGVudCkge1xuLy8gICAgICAgICBpZiAoY29udGVudFtrZXldID09PSBcInByb3BcIikge1xuLy8gICAgICAgICAgICAgY29udGludWU7XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImNsYXNzTGlzdFwiKSB7XG4vLyAgICAgICAgICAgICBmb3IgKGxldCBjbGFzc05hbWUgb2YgY29udGVudFtjbGFzc0xpc3RdKSB7XG4vLyAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjb250ZW50W2NsYXNzTGlzdF1bY2xhc3NOYW1lXSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImNoaWxkcmVuXCIpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnRba2V5XSk7XG4vLyAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjb250ZW50W2tleV0pIHtcbi8vICAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChlbGVtKGNvbnRlbnRba2V5XVtjaGlsZF0pKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGVsW2tleV0gPSBjb250ZW50W2tleV07XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cbi8vICAgICByZXR1cm4gZWw7XG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IGVsZW07XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2VcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwRWxlbVwiO1xuaW1wb3J0IHsgaXNWYWxpZFBsYWNlbWVudCwgcGxhY2VTaGlwIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvR2FtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZEVsZW0gZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCwgZHJhZ0VudGVyKSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgICAgIHRoaXMuZHJhZ0VudGVyID0gZHJhZ0VudGVyO1xuICAgICAgICB0aGlzLmJvYXJkU2l6ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIGlmIChtb2RlbC5nYW1lU3RhdGUgPT09IFwicGxhY2VTaGlwc1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEJvYXJkKG1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkQm9hcmQobW9kZWwpIHtcbiAgICAgICAgY29uc3Qgc2hhZG93R3JpZCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwic2hhZG93R3JpZFwiIH0pO1xuICAgICAgICBjb25zdCBib2FyZCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJib2FyZFwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtzaGFkb3dHcmlkXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYm9hcmRTaXplID0gbW9kZWwucGxheWVyLmdhbWVib2FyZC5zaXplO1xuICAgICAgICBjb25zdCBjZWxscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLmJvYXJkU2l6ZTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuYm9hcmRTaXplOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImNlbGxcIiB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlUmVmID0gbW9kZWwucGxheWVyLmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF07XG4gICAgICAgICAgICAgICAgLy8gc2V0cyBkYXRhIHZhbHVlcyBmb3IgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5jb2wgPSBjb2w7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGRzIHRoZSBkcmFnZW50ZXIgYW5kIGRyb3AgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmhhbmRsZURyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBib3VuZChlLCByb3csIGNvbCwgbW9kZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmhhbmRsZURyb3AuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYm91bmQoZSwgcm93LCBjb2wsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3VuZCA9IHRoaXMuaGFuZGxlRHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYm91bmQoZSwgcm93LCBjb2wpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlUmVmLnNoaXApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGxheSBzaGlwIGVmZmVjdFxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aWxlUmVmLnRpbGVTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkhcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgaGl0IG1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJNXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IG1pc3MgbWFya2VyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kcyB0aGUgY2VsbCB0byB0aGUgYm9hcmQgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgLy8gYWRkcyBhIHJlZmVyZW5jZSB0byB0aGUgRE9NIGNlbGwgdG8gdGhlIGNlbGxzIGFycmF5XG4gICAgICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cbiAgICAgICAgICAgICAgICBjZWxscy5wdXNoKGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2VsbHMgPSBjZWxscztcblxuICAgICAgICBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBFbGVtID0gbmV3IFNoaXAoc2hpcCwgKGNsaWNrZWRJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuY2xpY2tlZEV2ZW50KGluZGV4LCBjbGlja2VkSW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBiYXNlVGlsZSA9IHNoaXAudGlsZXNbMF07XG4gICAgICAgICAgICBjb25zdCBlbmRUaWxlID0gc2hpcC50aWxlc1tzaGlwLnNpemUgLSAxXTtcbiAgICAgICAgICAgIHNoaXBFbGVtLmVsZW1lbnQuc3R5bGUuZ3JpZEFyZWEgPSBgJHtiYXNlVGlsZS5yb3cgKyAxfSAvICR7XG4gICAgICAgICAgICAgICAgYmFzZVRpbGUuY29sICsgMVxuICAgICAgICAgICAgfSAvICR7ZW5kVGlsZS5yb3cgKyAyfSAvICR7ZW5kVGlsZS5jb2wgKyAyfWA7XG4gICAgICAgICAgICBzaGlwRWxlbS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJib2FyZFNoaXBcIik7XG4gICAgICAgICAgICBzaGlwRWxlbS50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGlsZS5jbGFzc0xpc3QuYWRkKFwib25Cb2FyZFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2hhZG93R3JpZC5hcHBlbmRDaGlsZChzaGlwRWxlbS5lbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBib2FyZDtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnT3ZlcihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnTGVhdmUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0VudGVyKGUsIHJvdywgY29sLCBtb2RlbCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IFtjbGlja2VkSW5kZXgsIHNoaXBdID0gdGhpcy5kcmFnRW50ZXIoKTtcbiAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcCA9IHNoaXA7XG4gICAgICAgIHRoaXMuY2xpY2tlZEluZGV4ID0gY2xpY2tlZEluZGV4O1xuICAgICAgICAvLyBnZXQgYWxsIHRpbGVzIHdpdGggcHJpb3IgaG92ZXIgZWZmZWN0c1xuICAgICAgICBjb25zdCB0aWxlcyA9IEFycmF5LmZyb20oXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyXCIsIFwiLnZhbGlkXCIsIFwiLmludmFsaWRcIilcbiAgICAgICAgKTtcbiAgICAgICAgLy8gY2xlYXIgdGhlaXIgaG92ZXIgZWZmZWN0c1xuICAgICAgICB0aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICAgICAgICB0aWxlLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiLCBcImludmFsaWRcIiwgXCJ2YWxpZFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gc2hpcC5pc0hvcml6b250YWw7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHNoaXAuc2l6ZTtcbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBiYXNlIHRpbGUgZm9yIHRoZSBkcmFnZ2VkIHNoaXBcbiAgICAgICAgLy8gYmFzZWQgb24gdGhlIHNoaXAgaW5kZXggdGhhdCB3YXMgY2xpY2tlZCBhbmQgdGlsZSBjdXJyZW50IGhvdmVyZWRcbiAgICAgICAgLy8gKGxlZnQgbW9zdCBmb3IgaG9yaXpvbnRhbCwgdG9wIG1vc3QgZm9yIHZlcnRpY2FsKVxuICAgICAgICBjb25zdCBiYXNlQ29vcmRzID0gdGhpcy5nZXRCYXNlVGlsZShzaGlwLCByb3csIGNvbCwgY2xpY2tlZEluZGV4KTtcbiAgICAgICAgY29uc3QgYmFzZVJvdyA9IGJhc2VDb29yZHMucm93O1xuICAgICAgICBjb25zdCBiYXNlQ29sID0gYmFzZUNvb3Jkcy5jb2w7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgaG92ZXJlZCB0aWxlcyBhcmUgYWxsIG9uIHRoZSBib2FyZCBhbmQgZG9udCBvdmVybGFwIGEgc2hpcFxuICAgICAgICBsZXQgaXNWYWxpZCA9IGlzVmFsaWRQbGFjZW1lbnQoXG4gICAgICAgICAgICBzaGlwLFxuICAgICAgICAgICAgYmFzZVJvdyxcbiAgICAgICAgICAgIGJhc2VDb2wsXG4gICAgICAgICAgICBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkXG4gICAgICAgICk7XG4gICAgICAgIGxldCByb3dPZmZzZXQgPSBiYXNlUm93O1xuICAgICAgICBsZXQgY29sT2Zmc2V0ID0gYmFzZUNvbDtcblxuICAgICAgICAvLyBhcXVpcmUgdGhlIGRpdiBmb3IgZXZlcnkgY2VsbFxuICAgICAgICAvLyBhbmQgc3R5bGUgYWNjb3JkaW5nIHRvIHZhbGlkaXR5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChyb3dPZmZzZXQgPj0gdGhpcy5ib2FyZFNpemUgfHwgY29sT2Zmc2V0ID49IHRoaXMuYm9hcmRTaXplKSB7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY2VsbHNbTnVtYmVyKGAke3Jvd09mZnNldH1gICsgYCR7Y29sT2Zmc2V0fWApXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICBjb2xPZmZzZXQrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93T2Zmc2V0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgcm93T2Zmc2V0ID0gYmFzZVJvdztcbiAgICAgICAgICAgIGNvbE9mZnNldCA9IGJhc2VDb2w7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChyb3dPZmZzZXQsIGNvbE9mZnNldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvd09mZnNldCA9IGlzSG9yaXpvbnRhbCA/IHJvd09mZnNldCA6IHJvd09mZnNldCArIDE7XG4gICAgICAgICAgICAgICAgY29sT2Zmc2V0ID0gaXNIb3Jpem9udGFsID8gY29sT2Zmc2V0ICsgMSA6IGNvbE9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvd09mZnNldCA9IGJhc2VSb3c7XG4gICAgICAgICAgICBjb2xPZmZzZXQgPSBiYXNlQ29sO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGwocm93T2Zmc2V0LCBjb2xPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb3dPZmZzZXQgPSBpc0hvcml6b250YWwgPyByb3dPZmZzZXQgOiByb3dPZmZzZXQgKyAxO1xuICAgICAgICAgICAgICAgIGNvbE9mZnNldCA9IGlzSG9yaXpvbnRhbCA/IGNvbE9mZnNldCArIDEgOiBjb2xPZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcm9wKGUsIHJvdywgY29sLCBtb2RlbCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGJhc2VDb29yZHMgPSB0aGlzLmdldEJhc2VUaWxlKFxuICAgICAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcCxcbiAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4XG4gICAgICAgICk7XG4gICAgICAgIGxldCBiYXNlUm93ID0gYmFzZUNvb3Jkcy5yb3c7XG4gICAgICAgIGxldCBiYXNlQ29sID0gYmFzZUNvb3Jkcy5jb2w7XG5cbiAgICAgICAgbGV0IGlzVmFsaWQgPSBpc1ZhbGlkUGxhY2VtZW50KFxuICAgICAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcCxcbiAgICAgICAgICAgIGJhc2VSb3csXG4gICAgICAgICAgICBiYXNlQ29sLFxuICAgICAgICAgICAgbW9kZWwucGxheWVyLmdhbWVib2FyZFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IHsgLi4ub2xkTW9kZWwgfTtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5kcm9wUXVldWUucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9sZE1vZGVsKSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbmV3R2FtZWJvYXJkLCBuZXdTaGlwIH0gPSBwbGFjZVNoaXAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dlZFNoaXAsXG4gICAgICAgICAgICAgICAgICAgIGJhc2VSb3csXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb2wsXG4gICAgICAgICAgICAgICAgICAgIG9sZE1vZGVsLnBsYXllci5nYW1lYm9hcmRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0dhbWVib2FyZCwgbmV3U2hpcCk7XG4gICAgICAgICAgICAgICAgLy8gaWYgKG9sZE1vZGVsLnBsYXllci5zaGlwUXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIG5ld01vZGVsLmdhbWVTdGF0ZSA9IFwiaW5HYW1lXCI7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQgPSBuZXdHYW1lYm9hcmQ7XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID0gYFBsYWNlIHlvdXIgJHtuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlWzBdLm5hbWV9YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLnB1c2gobmV3U2hpcCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSBpbnZhbGlkIHBsYWNlbWVudCBkcm9wXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogIGNhbGN1bGF0ZXMgdGhlIGxlZnQgbW9zdCBvciB0b3AgbW9zdCB0aWxlICovXG4gICAgZ2V0QmFzZVRpbGUoc2hpcCwgcm93LCBjb2wsIGNsaWNrZWRJbmRleCkge1xuICAgICAgICAvLyBnZXRzIHRoZSBpbmRleCB0aGF0IHRoZSBzaGlwIHdhcyBwaWNrZWQgdXAgYnlcbiAgICAgICAgY29uc3QgaW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICAgIGxldCBvZmZzZXRSb3cgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0Q29sID0gMDtcblxuICAgICAgICAvLyBvZmZzZXRzIHRoZSBob3ZlcmVkIHRpbGUgYWNjb3JkaW5nIHRvIHRoZSBncmFiYmVkIGluZGV4XG4gICAgICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgb2Zmc2V0Q29sID0gaW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvZmZzZXRSb3cgPSBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJhc2VSb3cgPSByb3cgLSBvZmZzZXRSb3c7XG4gICAgICAgIGNvbnN0IGJhc2VDb2wgPSBjb2wgLSBvZmZzZXRDb2w7XG5cbiAgICAgICAgcmV0dXJuIHsgcm93OiBiYXNlUm93LCBjb2w6IGJhc2VDb2wgfTtcbiAgICB9XG5cbiAgICAvKiogIHJldHVybnMgdGhlIERPTSBlbGVtZW50IGZvciBhIGdpdmVuIGNvb3JkaW5hdGUgKi9cbiAgICBnZXRDZWxsKHJvdywgY29sKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHJvdyA8IDAgfHxcbiAgICAgICAgICAgIHJvdyA+PSB0aGlzLmJvYXJkU2l6ZSB8fFxuICAgICAgICAgICAgY29sIDwgMCB8fFxuICAgICAgICAgICAgY29sID49IHRoaXMuYm9hcmRTaXplXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jZWxsc1tyb3cgKiB0aGlzLmJvYXJkU2l6ZSArIGNvbF07XG4gICAgfVxufVxuIiwiaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWVzc2FnZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gb2xkTW9kZWwuc3RhdGVNZXNzYWdlICE9PSBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKHsgc3RhdGVNZXNzYWdlIH0pIHtcbiAgICAgICAgcmV0dXJuIGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic3RhZ2VQYXJhXCIsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogc3RhdGVNZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuaW1wb3J0IGNhcnJpZXJTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvQ2Fycmllci5zdmdcIjtcbmltcG9ydCBiYXR0bGVzaGlwU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL0JhdHRsZXNoaXAuc3ZnXCI7XG5pbXBvcnQgZGVzdHJveWVyU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL0Rlc3Ryb3llci5zdmdcIjtcbmltcG9ydCBzdWJtYXJpbmVTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvU3VibWFyaW5lLnN2Z1wiO1xuaW1wb3J0IHBhdHJvbEJvYXRTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUGF0cm9sLUJvYXQuc3ZnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHNoaXAsIGNsaWNrZWRFdmVudCkge1xuICAgICAgICB0aGlzLnNoaXBNb2RlbCA9IHNoaXA7XG5cbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuY2xpY2tlZEluZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50ID0gY2xpY2tlZEV2ZW50O1xuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgLy9zaGlwcyBjb250YWluZXJcbiAgICAgICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNoaXAuaWQgPSB0aGlzLnNoaXBNb2RlbC5uYW1lO1xuICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICBzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIGxldCBzaGlwU3JjID0gbnVsbDtcblxuICAgICAgICBsZXQgc2hpcENsYXNzID0gdGhpcy5zaGlwTW9kZWwuaXNIb3Jpem9udGFsID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChzaGlwQ2xhc3MpO1xuXG4gICAgICAgIC8vIG1hdGNoZXMgbmFtZSBvZiBzaGlwIHRvIHRoZSBpbWFnZSBzb3VyY2UgZmlsZVxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2hpcE1vZGVsLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJDYXJyaWVyXCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IGNhcnJpZXJTcmM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiQmF0dGxlc2hpcFwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBiYXR0bGVzaGlwU3JjO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkRlc3Ryb3llclwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBkZXN0cm95ZXJTcmM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiU3VibWFyaW5lXCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IHN1Ym1hcmluZVNyYztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQYXRyb2wtQm9hdFwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBwYXRyb2xCb2F0U3JjO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlcyB0aGUgaW5uZXIgZGl2cyBmb3IgZWFjaCBzaGlwXG4gICAgICAgIC8vIGJhc2VkIG9uIHRoZSBzaXplXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwTW9kZWwuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInRpbGVcIik7XG4gICAgICAgICAgICB0aWxlLmRhdGFzZXQuYm9hdCA9IHRoaXMuc2hpcE1vZGVsLm5hbWU7XG4gICAgICAgICAgICB0aWxlLmRhdGFzZXQudGlsZSA9IGk7XG4gICAgICAgICAgICB0aWxlLmRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvL2FkZCBoZWFkIGNsYXNzIHRvIGZyb250IGZvciBzdHlsaW5nXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgdGlsZS5jbGFzc0xpc3QuYWRkKFwiaGVhZFwiKTtcbiAgICAgICAgICAgIC8vYWRkIHRhaWwgY2xhc3MgdG8gdGFpbCBmb3Igc3R5bGluZ1xuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5zaGlwTW9kZWwuc2l6ZSAtIDEpIHRpbGUuY2xhc3NMaXN0LmFkZChcInRhaWxcIik7XG5cbiAgICAgICAgICAgIC8vIGFkZHMgY2xpY2sgbGlzdGVuZXIgdG8gc2V0IGNsaWNrZWQgaW5kZXhcbiAgICAgICAgICAgIHRpbGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50KGkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aWxlcyB0byB0aGUgc2hpcFxuICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgc2hpcC5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNwaWNlIHVwIHRoZSBzaGlwIGRpc3BsYXlcbiAgICAgICAgY29uc3Qgc2hpcE92ZXJsYXkgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IGBzaGlwT3ZlcmxheWAsXG4gICAgICAgICAgICBpZDogYCR7dGhpcy5zaGlwTW9kZWwubmFtZX1PdmVybGF5YCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHNoaXBPdmVybGF5O1xuICAgICAgICBzaGlwT3ZlcmxheS5zcmMgPSBzaGlwU3JjO1xuICAgICAgICBsZXQgb3ZlcmxheUNsYXNzID0gdGhpcy5zaGlwTW9kZWwuaXNIb3Jpem9udGFsXG4gICAgICAgICAgICA/IFwiaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICA6IFwidmVydGljYWxcIjtcbiAgICAgICAgc2hpcE92ZXJsYXkuY2xhc3NMaXN0LmFkZChvdmVybGF5Q2xhc3MpO1xuICAgICAgICBzaGlwT3ZlcmxheS5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgc2hpcC5hcHBlbmRDaGlsZChzaGlwT3ZlcmxheSk7XG5cbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBib3VuZCA9IHRoaXMuaGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBib3VuZChlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzaGlwO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdTdGFydChlKSB7XG4gICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICAgICAgdGlsZS5zdHlsZS53aWR0aCA9IFwiNDBweFwiO1xuICAgICAgICAgICAgdGlsZS5zdHlsZS5oZWlnaHQgPSBcIjQwcHhcIjtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRpbGUuc3R5bGUud2lkdGggPSBcIjMwcHhcIjtcbiAgICAgICAgICAgICAgICB0aWxlLnN0eWxlLmhlaWdodCA9IFwiMzBweFwiO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwRWxlbS5qc1wiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBRdWV1ZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50LCBjbGlja2VkRXZlbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICAgICAgdGhpcy5jbGlja2VkRXZlbnQgPSBjbGlja2VkRXZlbnQ7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gbmV3TW9kZWwuZ2FtZVN0YXRlID09PSBcInBsYWNlU2hpcHNcIjtcbiAgICB9XG5cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgaWYgKG1vZGVsLnBsYXllci5zaGlwUXVldWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgc2hpcHMgcGxhY2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUXVldWUobW9kZWwpO1xuICAgIH1cblxuICAgIGJ1aWxkUXVldWUobW9kZWwpIHtcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcFF1ZXVlXCIsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV4dCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJuZXh0U2hpcENvbnRhaW5lclwiLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcXVldWUgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicXVldWVDb250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbc3RhZ2UsIG5leHRdLFxuICAgICAgICB9KTtcblxuICAgICAgICBtb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwRWxlbSA9IG5ldyBTaGlwKHNoaXAsIChjbGlja2VkSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRFdmVudChpbmRleCwgY2xpY2tlZEluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1vZGVsLnN0YXRlTWVzc2FnZS5pbmNsdWRlcyhcIkVuZW1pZXNcIikpIHtcbiAgICAgICAgICAgICAgICBzaGlwRWxlbS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2UgPSBgUGxhY2UgeW91ciAke25ld01vZGVsLnBsYXllci5zaGlwUXVldWVbMF0ubmFtZX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dC5hcHBlbmRDaGlsZChzaGlwRWxlbS5lbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhZ2UucHJlcGVuZChzaGlwRWxlbS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHF1ZXVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHRoaXMudmlld01vZGVsID0gdmlld01vZGVsO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLm9uSW5pdCgpO1xuICAgIH1cblxuICAgIG9uSW5pdCgpIHtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwucmVnaXN0ZXIodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNb2RlbCB7XG4gICAgY29uc3RydWN0b3IobW9kZWwpIHtcbiAgICAgICAgdGhpcy5wdWJzdWJzID0gW107XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB9XG5cbiAgICByZWdpc3RlcihwdWJzdWIpIHtcbiAgICAgICAgdGhpcy5wdWJzdWJzLnB1c2gocHVic3ViKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHB1YnN1Yi5nZXRFbGVtZW50KCk7XG4gICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIGFueSBvdGhlciBwdWJzdWJzIGFyZSB0aWVkIHRvIHRoaXMgZWxlbWVudCBeLiAgSWYgdGhleSBhcmUsIHJlbW92ZSB0aGVtIGZyb20gdGhlIHB1YnN1YiBsaXN0XG4gICAgICAgIGVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKHB1YnN1Yi5yZW5kZXIodGhpcy5tb2RlbCkpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsVXBkYXRlRnVuYykge1xuICAgICAgICBjb25zdCBvbGRNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tb2RlbCkpO1xuICAgICAgICBjb25zdCBuZXdNb2RlbCA9IG1vZGVsVXBkYXRlRnVuYyhvbGRNb2RlbCk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5ld01vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsW2tleV0gPSBuZXdNb2RlbFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHB1YnN1YiBvZiB0aGlzLnB1YnN1YnMpIHtcbiAgICAgICAgICAgIGlmIChwdWJzdWIuc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcHVic3ViLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VDaGlsZHJlbihwdWJzdWIucmVuZGVyKHRoaXMubW9kZWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFJIGV4dGVuZHMgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc3VwZXIubmFtZSA9IFwiQUlcIjtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gbnVsbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IEFJIGZyb20gXCIuL0FJXCI7XG5cbi8vIG1vZGVsXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgICAgIHRoaXMuQUkgPSBuZXcgQUkoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VHVybiA9IFwicGxheWVyXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBcImhvbWVQYWdlXCI7XG4gICAgICAgIHRoaXMubmFtZVBhZ2VJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZU1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZHJvcFF1ZXVlID0gW107XG4gICAgfVxufVxuXG4vLyBhc3N1bWVzIHJvdyAvIGNvbCBhcmUgdGhlIGJhc2UgdGlsZSBvZiB0aGUgc2hpcFxuZnVuY3Rpb24gaXNWYWxpZFBsYWNlbWVudChzaGlwLCByb3csIGNvbCwgZ2FtZWJvYXJkKSB7XG4gICAgLy8gY2hlY2tzIGlmIGFsbCBob3ZlcmVkIHRpbGVzIGFyZSBvbiB0aGUgYm9hcmRcblxuICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBjb2wgKyBzaGlwLnNpemUgPiBnYW1lYm9hcmQuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gZmFsc2UgJiYgcm93ICsgc2hpcC5zaXplID4gZ2FtZWJvYXJkLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBpdGVyYXRlcyBvdmVyIGV2ZXJ5IHRpbGVcbiAgICAvLyBhbmQgY2hlY2tzIGlmIHRoZSBnYW1lYm9hcmQgY29udGFpbnMgYSBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkrKykge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd10pIHtcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uc2hpcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByb3crKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBnYW1lYm9hcmQpIHtcbiAgICBsZXQgbmV3R2FtZWJvYXJkID0geyAuLi5nYW1lYm9hcmQgfTtcbiAgICBsZXQgbmV3U2hpcCA9IHsgLi4uc2hpcCB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkrKykge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd10pIHtcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uc2hpcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdHYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdLnNoaXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBuZXdTaGlwLnRpbGVzLnB1c2gobmV3R2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXAuaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ0aGlzIHNob3VsZG4ndCBoYXBwZW5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG5ld0dhbWVib2FyZCwgbmV3U2hpcCB9O1xufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXBSYW5kb21seShzaGlwLCBnYW1lYm9hcmQpIHtcbiAgICBzaGlwLmlzSG9yaXpvbnRhbCA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG5cbiAgICBjb25zdCByYW5kUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHJhbmRDb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZFBsYWNlbWVudChzaGlwLCByYW5kUm93LCByYW5kQ29sLCBnYW1lYm9hcmQpO1xuXG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChzaGlwLCByYW5kUm93LCByYW5kQ29sLCBnYW1lYm9hcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwbGFjZVNoaXBSYW5kb21seShzaGlwLCBnYW1lYm9hcmQpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgaXNWYWxpZFBsYWNlbWVudCwgcGxhY2VTaGlwLCBwbGFjZVNoaXBSYW5kb21seSB9O1xuIiwiaW1wb3J0IFRpbGUgZnJvbSBcIi4vVGlsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgICAgICAvLyB0aGlzLm9yaWVudGF0aW9uID0gdHJ1ZTsgLy90cnVlIHZlcnRpY2FsLCBmYWxzZSBob3Jpem9udGFsXG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnNpemU7IHJvdysrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3Jvd10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuc2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IG5ldyBUaWxlKHJvdywgY29sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vR2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG4gICAgICAgIHRoaXMuc2hpcFF1ZXVlID0gW1xuICAgICAgICAgICAgbmV3IFNoaXAoNSwgXCJDYXJyaWVyXCIpLFxuICAgICAgICAgICAgbmV3IFNoaXAoNCwgXCJCYXR0bGVzaGlwXCIpLFxuICAgICAgICAgICAgbmV3IFNoaXAoMywgXCJEZXN0cm95ZXJcIiksXG4gICAgICAgICAgICBuZXcgU2hpcCgzLCBcIlN1Ym1hcmluZVwiKSxcbiAgICAgICAgICAgIG5ldyBTaGlwKDIsIFwiUGF0cm9sLUJvYXRcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0hvcml6b250YWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKHJvdywgY29sKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5zaGlwID0gbnVsbDtcbiAgICAgICAgdGhpcy50aWxlU3RhdHVzID0gbnVsbDtcbiAgICAgICAgLy8gbnVsbCBIIE1cbiAgICB9XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ZvbnRzL0JsYWNrT3BzT25lLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9QcmVzc1N0YXJ0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvaG9tZXNjcmVlbi5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbn1cXG5cXG4qIHtcXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uaG9tZXBhZ2VDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogZ3JleTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhvbWVIZWFkZXIge1xcbiAgICBtYXJnaW46IDRyZW0gMDtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiA3cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCAjYThhOGE4LCAxcHggMnB4IDFweCAjYThhOGE4LCAxcHggM3B4IDFweCAjYThhOGE4LFxcbiAgICAgICAgMXB4IDRweCAxcHggI2E4YThhOCwgMXB4IDVweCAxcHggI2E4YThhOCwgMXB4IDZweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA3cHggMXB4ICNhOGE4YTgsIDFweCA4cHggMXB4ICNhOGE4YTg7XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLm5ld0dhbWUge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjRyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjE4NSk7XFxufVxcblxcbi5uZXdHYW1lOmhvdmVyIHtcXG4gICAgY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHR5cGluZyB7XFxuICAgIGZyb20ge1xcbiAgICAgICAgd2lkdGg6IDA7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBibGluay1jYXJldCB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogZ3JleTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2VDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogNDAlO1xcbiAgICBsZWZ0OiA2NSU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5zbW9rZSB7XFxuICAgICAgICBsZWZ0OiA3NSU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XFxuICAgIC5zbW9rZUNvbnRhaW5lciB7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG5cXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA1cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2Uge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHdpZHRoOiA4MHB4O1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMyNjI2MjY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlRXZlbiAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnNtb2tlOm50aC1jaGlsZChvZGQpIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlT2RkIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDkpIHtcXG4gICAgYW5pbWF0aW9uOiBub25lO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZUV2ZW4ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlT2RkIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDEpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgyKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC40cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgzKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC44cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg0KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS4ycztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg1KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS42cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg2KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNykge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuNHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoOCkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuOHM7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvaG9tZXBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0JBQXNCO0lBQ3RCLDRDQUEyQztBQUMvQztBQUNBO0lBQ0ksdUJBQXVCO0lBQ3ZCLDRDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQixVQUFVO0lBQ1YsU0FBUztJQUNULHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsNkJBQTZCO0lBQzdCLHlEQUF3RDtJQUN4RCxzQkFBc0I7SUFDdEIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksY0FBYztJQUNkLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCOztnREFFNEM7QUFDaEQ7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsc0JBQXNCO0lBQ3RCLHdFQUF3RTtJQUN4RSxlQUFlO0lBQ2YsMENBQTBDO0FBQzlDOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJO1FBQ0ksUUFBUTtJQUNaO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7QUFDSjs7QUFFQTtJQUNJOztRQUVJLHlCQUF5QjtJQUM3QjtJQUNBO1FBQ0ksa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLFNBQVM7SUFDVCwyQkFBMkI7SUFDM0IsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJO1FBQ0ksU0FBUztJQUNiO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFNBQVM7SUFDYjs7SUFFQTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksZUFBZTtRQUNmLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksaUJBQWlCO0lBQ3JCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLGlCQUFpQjtJQUNyQjtBQUNKOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksMkNBQTJDO0FBQy9DO0FBQ0E7SUFDSSwwQ0FBMEM7QUFDOUM7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0k7UUFDSSxtQ0FBbUM7UUFDbkMsVUFBVTtRQUNWLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0ksNENBQTRDO1FBQzVDLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksbUNBQW1DO1FBQ25DLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7SUFDQTtRQUNJLDZDQUE2QztRQUM3QyxVQUFVO1FBQ1Ysa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0ksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9CbGFja09wc09uZS50dGZcXFwiKTtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBzcmM6IHVybChcXFwiLi4vYXNzZXRzL2ZvbnRzL1ByZXNzU3RhcnQudHRmXFxcIik7XFxufVxcblxcbioge1xcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuI2NvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5ob21lcGFnZUNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbG9yOiBncmV5O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9hc3NldHMvaW1hZ2VzL2hvbWVzY3JlZW4uanBnXFxcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhvbWVIZWFkZXIge1xcbiAgICBtYXJnaW46IDRyZW0gMDtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiA3cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCAjYThhOGE4LCAxcHggMnB4IDFweCAjYThhOGE4LCAxcHggM3B4IDFweCAjYThhOGE4LFxcbiAgICAgICAgMXB4IDRweCAxcHggI2E4YThhOCwgMXB4IDVweCAxcHggI2E4YThhOCwgMXB4IDZweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA3cHggMXB4ICNhOGE4YTgsIDFweCA4cHggMXB4ICNhOGE4YTg7XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLm5ld0dhbWUge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjRyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjE4NSk7XFxufVxcblxcbi5uZXdHYW1lOmhvdmVyIHtcXG4gICAgY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHR5cGluZyB7XFxuICAgIGZyb20ge1xcbiAgICAgICAgd2lkdGg6IDA7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBibGluay1jYXJldCB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogZ3JleTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2VDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogNDAlO1xcbiAgICBsZWZ0OiA2NSU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5zbW9rZSB7XFxuICAgICAgICBsZWZ0OiA3NSU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XFxuICAgIC5zbW9rZUNvbnRhaW5lciB7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG5cXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA1cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2Uge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHdpZHRoOiA4MHB4O1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMyNjI2MjY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlRXZlbiAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnNtb2tlOm50aC1jaGlsZChvZGQpIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlT2RkIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDkpIHtcXG4gICAgYW5pbWF0aW9uOiBub25lO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZUV2ZW4ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlT2RkIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDEpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgyKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC40cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgzKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC44cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg0KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS4ycztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg1KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS42cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg2KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNykge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuNHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoOCkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuOHM7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ZvbnRzL0thbGFtLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltYWdlcy9tYXAuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogS2FsYW07XFxuICAgIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG59XFxuXFxuLm1hcCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGFuaW1hdGlvbjogdW5ibHVyIDAuNXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyB1bmJsdXIge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMCk7XFxuICAgIH1cXG59XFxuLnJlZFBpbjEge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDElO1xcbiAgICBsZWZ0OiA2MyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxOSU7XFxuICAgIGxlZnQ6IDU3JTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcbi5yZWRQaW4zIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODElO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuXFxuLnJlZFBpbjE6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcbi5yZWRQaW4zOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5vdGVDb250YWluZXIge1xcbiAgICB3aWR0aDogMjUwcHg7XFxuICAgIGhlaWdodDogMjUwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiA2MCU7XFxuICAgIGxlZnQ6IDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTFkZWcpO1xcbiAgICBhbmltYXRpb246IGZseSAwLjFzIGxpbmVhcjtcXG59XFxuLnBhcmFDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTBweDtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcbiAgICB0cmFuc2Zvcm06IHNrZXcoLTJkZWcsIC0yZGVnKTtcXG59XFxuXFxuLnN0aWNreU5vdGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTgwcHg7XFxuICAgIGxlZnQ6IC03MHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGhlaWdodDogNDAwcHg7XFxufVxcblxcbkBrZXlmcmFtZXMgZmx5IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwMCUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE2MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQxJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIyJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjMlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNCU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEzMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODElO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NCU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDg0JTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjUlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NyU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY3JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTglO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogOTAlO1xcbiAgICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvbWFwcGFnZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxrQkFBa0I7SUFDbEIsNENBQTZDO0FBQ2pEOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIseURBQWlEO0lBQ2pELHNCQUFzQjtJQUN0QiwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBQzdCLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJO0lBQ0E7SUFDQTtRQUNJLGVBQWU7SUFDbkI7QUFDSjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsZUFBZTtJQUNmLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGVBQWU7SUFDZixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDtBQUNBO0lBQ0ksVUFBVTtBQUNkO0FBQ0E7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGVBQWU7SUFDZixRQUFRO0lBQ1IsU0FBUztJQUNULHdCQUF3QjtJQUN4QiwwQkFBMEI7QUFDOUI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsV0FBVztJQUNYLFlBQVk7SUFDWixhQUFhO0FBQ2pCOztBQUVBO0lBQ0k7UUFDSSwyQkFBMkI7SUFDL0I7SUFDQTtJQUNBO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksVUFBVTtRQUNWLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFVBQVU7UUFDVixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksVUFBVTtRQUNWLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogS2FsYW07XFxuICAgIHNyYzogdXJsKFxcXCIuLi9hc3NldHMvZm9udHMvS2FsYW0tUmVndWxhci50dGZcXFwiKTtcXG59XFxuXFxuLm1hcCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2Fzc2V0cy9pbWFnZXMvbWFwLmpwZ1xcXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGFuaW1hdGlvbjogdW5ibHVyIDAuNXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyB1bmJsdXIge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMCk7XFxuICAgIH1cXG59XFxuLnJlZFBpbjEge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDElO1xcbiAgICBsZWZ0OiA2MyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxOSU7XFxuICAgIGxlZnQ6IDU3JTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcbi5yZWRQaW4zIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODElO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuXFxuLnJlZFBpbjE6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcbi5yZWRQaW4zOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5vdGVDb250YWluZXIge1xcbiAgICB3aWR0aDogMjUwcHg7XFxuICAgIGhlaWdodDogMjUwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiA2MCU7XFxuICAgIGxlZnQ6IDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTFkZWcpO1xcbiAgICBhbmltYXRpb246IGZseSAwLjFzIGxpbmVhcjtcXG59XFxuLnBhcmFDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTBweDtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcbiAgICB0cmFuc2Zvcm06IHNrZXcoLTJkZWcsIC0yZGVnKTtcXG59XFxuXFxuLnN0aWNreU5vdGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTgwcHg7XFxuICAgIGxlZnQ6IC03MHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGhlaWdodDogNDAwcHg7XFxufVxcblxcbkBrZXlmcmFtZXMgZmx5IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwMCUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE2MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQxJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIyJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjMlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNCU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEzMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODElO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NCU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDg0JTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjUlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NyU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY3JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTglO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogOTAlO1xcbiAgICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAycmVtO1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciBwIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgcGFkZGluZzogMXJlbSAxcmVtO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgY2FyZXQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggM3B4IDVweCAjYThhOGE4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogM3B4O1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dDpmb2N1cyB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dDo6cGxhY2Vob2xkZXIge1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b24ge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgY29sb3I6IHJnYig3MSwgNzEsIDcxKTtcXG4gICAgb3BhY2l0eTogMC44O1xcbn1cXG5cXG4ubmFtZUZvcm0gYnV0dG9uOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmhpZGUge1xcbiAgICBhbmltYXRpb246IGJ1cm4gMXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyBidXJuIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLm5hbWVGb3JtIGlucHV0IHtcXG4gICAgICAgIHdpZHRoOiA4MCU7XFxuICAgIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL0NTUy9uYW1lcGFnZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixTQUFTO0FBQ2I7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHNCQUFzQjtJQUN0Qix3RUFBd0U7QUFDNUU7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCx1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixhQUFhO0lBQ2IsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQiwrQkFBK0I7SUFDL0IsbUJBQW1CO0lBQ25CLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGVBQWU7SUFDZixlQUFlO0lBQ2YsWUFBWTtJQUNaLDZCQUE2QjtJQUM3QixzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSTtJQUNBO0lBQ0E7UUFDSSxVQUFVO0lBQ2Q7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksVUFBVTtJQUNkO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm5ld0dhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDJyZW07XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHAge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcmVtIHNvbGlkIGdyZXk7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG1hcmdpbjogMCBhdXRvIGF1dG8gYXV0bztcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMnMgc3RlcHMoNDAsIGVuZCksIGJsaW5rLWNhcmV0IDAuNzVzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG4ubmFtZUZvcm0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxcmVtIDFyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBjYXJldC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IDNweCAzcHggNXB4ICNhOGE4YTg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAzcHg7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OmZvY3VzIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OjpwbGFjZWhvbGRlciB7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIGJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBjb2xvcjogcmdiKDcxLCA3MSwgNzEpO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b246aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uaGlkZSB7XFxuICAgIGFuaW1hdGlvbjogYnVybiAxcyBsaW5lYXI7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJ1cm4ge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAubmFtZUZvcm0gaW5wdXQge1xcbiAgICAgICAgd2lkdGg6IDgwJTtcXG4gICAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuZ2FtZUNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuLnF1ZXVlQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnAxT3B0aW9uc0NvbnRhaW5lciB7XFxuICAgIGZsZXg6IDEuMztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDE0NCwgMTQ0LCAxNDQpO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDE0NCwgMTQ0LCAxNDQsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNDAsIDE0MCwgMTQwLCAxKSAxMSUsXFxuICAgICAgICByZ2JhKDEzNiwgMTM2LCAxMzYsIDEpIDIxJSxcXG4gICAgICAgIHJnYmEoMTQ0LCAxNDQsIDE0NCwgMSkgNjklLFxcbiAgICAgICAgcmdiYSgxMzgsIDEzOCwgMTM4LCAxKSA4NyUsXFxuICAgICAgICByZ2JhKDE2OCwgMTY4LCAxNjgsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgbWluLWhlaWdodDogMjAwcHg7XFxufVxcbi5wMUdyaWRDb250YWluZXIge1xcbiAgICBmbGV4OiAzO1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgZmxleDogMjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuXFxuLnJhZGFyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICB3aWR0aDogMjYzcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBib3JkZXI6IDEwcHggc29saWQgIzZkNmQ2ZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IDNweCAxMHB4IDAgI2M1YzVjNSwgaW5zZXQgMCAwIDUwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSksXFxuICAgICAgICAtNXB4IC01cHggMjBweCBibGFjaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDIpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoMyksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg0KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGhlaWdodDogMXB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogcmdiKDQ5LCAxNTgsIDQ5KTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDIpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDMpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg1KSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDYpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAyNTUsIDAsIDEpO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDUpIHtcXG4gICAgd2lkdGg6IDc1cHg7XFxuICAgIGhlaWdodDogNzVweDtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg2KSB7XFxuICAgIHdpZHRoOiAxNzVweDtcXG4gICAgaGVpZ2h0OiAxNzVweDtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg3KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjMDBmZjAwIDAlLCB0cmFuc3BhcmVudCA1MCUpO1xcbiAgICBhbmltYXRpb246IHJhZGFyIDJzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoOCkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiA3NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDkpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogNzUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxMCkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICBsZWZ0OiA4NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDExKSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMTIpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuQGtleWZyYW1lcyByYWRhciB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGdsb3cge1xcbiAgICAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG4uYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuXFxuLmJhc2Uge1xcbiAgICBiYWNrZ3JvdW5kOiAjY2FjYWNhO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjd2bWluO1xcbiAgICBib3gtc2hhZG93OiAwIDZ2bWluIDAuMTV2bWluIDB2bWluICM3NzcsIDAgNHZtaW4gMC4xNXZtaW4gMHZtaW4gIzc3NyxcXG4gICAgICAgIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gIzc3NywgLTIwcHggMjBweCA1MHB4IGJsYWNrO1xcbiAgICBwYWRkaW5nOiAwdm1pbiAydm1pbiAydm1pbiAydm1pbjtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDBkZWcpIHJvdGF0ZVooMGRlZyk7XFxuICAgIG1hcmdpbi10b3A6IC00LjV2bWluO1xcbiAgICBoZWlnaHQ6IDkwJTtcXG59XFxuXFxuYnV0dG9uI2FjdGl2YXRlIHtcXG4gICAgYmFja2dyb3VuZDogI2Q2MDUwNTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICB3aWR0aDogMjB2bWluO1xcbiAgICBoZWlnaHQ6IDE5dm1pbjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGJveC1zaGFkb3c6IDAgNHZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAydm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IC0yLjV2bWluO1xcbiAgICBib3JkZXI6IDAuNXZtaW4gc29saWQgI2FmMDAwMGExO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZSAwcztcXG59XFxuXFxuYnV0dG9uI2FjdGl2YXRlOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAzdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwLCAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDA7XFxuICAgIHRvcDogLTEuNXZtaW47XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UgMHM7XFxufVxcbmJ1dHRvbiNhY3RpdmF0ZTphY3RpdmUsXFxuYnV0dG9uI2FjdGl2YXRlLnB1c2hlZCB7XFxuICAgIGJveC1zaGFkb3c6IDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IDAuNXZtaW47XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlIDBzO1xcbn1cXG5idXR0b24jYWN0aXZhdGUucHVzaGVkIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDIwcHggMTBweCAjZmYzYzNjLCAwIDAgMTAwcHggNTBweCAjZmYyODI4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmYwMDAwO1xcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzAwMDAwMDIwO1xcbn1cXG5cXG4uYmFzZSB7XFxuICAgIHNjYWxlOiAwLjM7XFxufVxcbi5yaWdodEJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcbi5taWRkbGVCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG4ubGVmdEJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5idXR0b25UZXh0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzZkNmQ2ZDtcXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBmb250LXNpemU6IDEuM3JlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogMTUlO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCBibGFjaztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjFyZW07XFxuICAgIHRleHQtc2hhZG93OiAtMXB4IC0xcHggMXB4IGJsYWNrO1xcbn1cXG4uYnV0dG9uVGV4dDo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDEwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJiMmIyYjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI1cHg7XFxuICAgIGxlZnQ6IDVweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDNweCBibGFjaztcXG59XFxuLmJ1dHRvblRleHQ6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDEwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJiMmIyYjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI1cHg7XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggYmxhY2s7XFxufVxcblxcbi5taWRkbGVCdXR0b24gLmJ1dHRvblRleHQge1xcbiAgICBwYWRkaW5nOiAxcmVtIDEuMXJlbTtcXG59XFxuXFxuLnAxU2hpcFN0YWdlIHtcXG4gICAgZmxleDogNTtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uc2hpcENvbnRhaW5lciB7XFxuICAgIGZsZXg6IDE7XFxuXFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNTBweCByZ2JhKDAsIDI1NSwgMCwgMC41KTtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnNoaXBRdWV1ZSB7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIGZsZXg6IDM7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMTglO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmaWx0ZXI6IGJsdXIoNXB4KTtcXG59XFxuLm5leHRTaGlwQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDkwJTtcXG4gICAgd2lkdGg6IDIyMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSksXFxuICAgICAgICBpbnNldCAwIDAgMTBweCByZ2JhKDAsIDI1NSwgMCwgMC41KTtcXG59XFxuXFxuLm5leHRTaGlwQ29udGFpbmVyOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuOCksXFxuICAgICAgICBpbnNldCAwIDAgMTBweCByZ2JhKDAsIDI1NSwgMCwgMC44KTtcXG59XFxuXFxuLm5leHRTaGlwOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbn1cXG5cXG4ubmV4dFNoaXAge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5DYXJyaWVyQ29udGFpbmVyLFxcbi5CYXR0bGVzaGlwQ29udGFpbmVyLFxcbi5EZXN0cm95ZXJDb250YWluZXIsXFxuLlN1Ym1hcmluZUNvbnRhaW5lcixcXG4uUGF0cm9sLUJvYXRDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uQ2FycmllckNvbnRhaW5lcjpob3ZlcixcXG4uQmF0dGxlc2hpcENvbnRhaW5lcjpob3ZlcixcXG4uRGVzdHJveWVyQ29udGFpbmVyOmhvdmVyLFxcbi5TdWJtYXJpbmVDb250YWluZXI6aG92ZXIsXFxuLlBhdHJvbC1Cb2F0Q29udGFpbmVyOmhvdmVyIHtcXG59XFxuXFxuI0NhcnJpZXIsXFxuI0JhdHRsZXNoaXAsXFxuI0Rlc3Ryb3llcixcXG4jU3VibWFyaW5lLFxcbiNQYXRyb2wtQm9hdCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnNoaXBPdmVybGF5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC0yMCU7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KTtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNSk7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdG9wOiA0MiU7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIC8qIGFuaW1hdGlvbjogcm90YXRlIDAuNHMgZWFzZS1pbi1vdXQ7ICovXFxufVxcblxcbi8qIC5zaGlwT3ZlcmxheS5ob3Jpem9udGFsIHtcXG4gICAgYW5pbWF0aW9uOiByb3RhdGUxIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg1LjUpIHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoNSkgcm90YXRlKDkwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZTEge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNikgcm90YXRlKDkwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KSByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG59ICovXFxuXFxuI1BhdHJvbC1Cb2F0T3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSgzKTtcXG59XFxuXFxuLnNoaXBUaWxlIHtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uc2hpcC5ob3Jpem9udGFsIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuLmdhbWUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAzMHB4IHNvbGlkIHJnYigxODIsIDE4MiwgMTgyKTtcXG4gICAgYm9yZGVyLXRvcDogMzBweCBzb2xpZCByZ2IoNzEsIDcxLCA3MSk7XFxuICAgIGJvcmRlci1sZWZ0OiAzMHB4IHNvbGlkIHJnYig5NCwgOTQsIDk0KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMTQwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNSU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDUwcHgpO1xcbn1cXG5cXG4uc2hhZG93R3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcsXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZyxcXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcsXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLFxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXAgaW1nIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwOmhvdmVyLFxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcDpob3ZlcixcXG4jRGVzdHJveWVyLmJvYXJkU2hpcDpob3ZlcixcXG4jU3VibWFyaW5lLmJvYXJkU2hpcDpob3ZlcixcXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwOmhvdmVyIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggcmdiYSgwLCAyNTUsIDAsIDAuNik7XFxufVxcblxcbi50aWxlIHtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDA5YzAwO1xcbn1cXG4udGlsZS54MCB7XFxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4udGlsZS54OSB7XFxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcXG59XFxuLnRpbGUueTkge1xcbiAgICBib3JkZXItdG9wOiBub25lO1xcbn1cXG4udGlsZS55MCB7XFxuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxufVxcblxcbi5zaGlwT3ZlcmxheSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAtMjAlO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCk7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuI1N1Ym1hcmluZSBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIGxlZnQ6IC01JTtcXG59XFxuXFxuLnNoaXBPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDUpO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRvcDogNDIlO1xcbn1cXG5cXG4uYm9hcmRTaGlwIHtcXG4gICAgei1pbmRleDogOTtcXG59XFxuXFxuLmJvYXJkU2hpcCBpbWcge1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDgsIDYpO1xcbiAgICBsZWZ0OiAzMyU7XFxuICAgIHRvcDogNDglO1xcbn1cXG5cXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDYuNSwgNSk7XFxuICAgIGxlZnQ6IDE4JTtcXG4gICAgdG9wOiA0NyU7XFxufVxcblxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRvcDogNDYlO1xcbiAgICBsZWZ0OiAyNCU7XFxufVxcblxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg2LCA4KTtcXG4gICAgdG9wOiA0MyU7XFxuICAgIGxlZnQ6IC0zJTtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjYsIDIpO1xcbiAgICB0b3A6IDglO1xcbiAgICBsZWZ0OiAzMiU7XFxufVxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi4yLCAyKTtcXG4gICAgdG9wOiAxNSU7XFxuICAgIGxlZnQ6IDI4JTtcXG59XFxuXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuMywgMi41KTtcXG4gICAgdG9wOiAxNSU7XFxuICAgIGxlZnQ6IDI4JTtcXG59XFxuXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIsIDIuNik7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiAxNyU7XFxufVxcblxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0b3A6IDE1JTtcXG59XFxuLnRpbGUub25Cb2FyZCB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgd2lkdGg6IDUwcHg7XFxufVxcblxcbi5kcmFnZ2VkT3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uaW52YWxpZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDA7XFxufVxcblxcbi52YWxpZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uc2hpcEZvb3RlciB7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCByZ2JhKDAsIDI1NSwgMCwgMC41KTtcXG59XFxuXFxuLnN0YWdlUGFyYSB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBtYXJnaW46IDFyZW07XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgY29sb3I6ICMwMGZmMDA7XFxuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMi41cyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQyIDFzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJsaW5rLWNhcmV0MiB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogIzAwZmYwMDtcXG4gICAgfVxcbn1cXG4ud2F2ZXMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMDB2dztcXG5cXG4gICAgdG9wOiAtNTBweDtcXG4gICAgYW5pbWF0aW9uOiB3YXZlIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5zaGlwQm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDMwMDBweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE5NCwgMTk0LCAxOTQsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0b3A6IC00MDBweDtcXG5cXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCg2MGRlZyk7XFxufVxcbi5zaGlwQm93V29vZCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzMDAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxMTksIDU3LCAwKTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxMTksIDU3LCAwLCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY0LCA3OSwgMCwgMSkgNDYlLFxcbiAgICAgICAgcmdiYSgxMTksIDU3LCAwLCAxKSAxMDAlXFxuICAgICk7XFxuXFxuICAgIHRvcDogLTY0MHB4O1xcbiAgICBsZWZ0OiAxNjBweDtcXG5cXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCg2MGRlZyk7XFxufVxcblxcbi5mbGFrQmFycmVsMSxcXG4uZmxha0JhcnJlbDIsXFxuLmZsYWtCYXJyZWwzLFxcbi5mbGFrQmFycmVsNCxcXG4uZmxha0JhcnJlbDUsXFxuLmZsYWtCYXJyZWw2IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzMCUgMTAwJTtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NiwgMTY2LCAxNjYsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyMGRlZyk7XFxufVxcblxcbi5mbGFrQmFycmVsMSB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA1NTVweDtcXG59XFxuLmZsYWtCYXJyZWwyIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDYwNXB4O1xcbn1cXG4uZmxha0JhcnJlbDMge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNjU1cHg7XFxufVxcbi5mbGFrQmFycmVsNCB7XFxuICAgIHRvcDogLTkwcHg7XFxuICAgIGxlZnQ6IDU1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDUge1xcbiAgICB0b3A6IC05NXB4O1xcbiAgICBsZWZ0OiA2MDVweDtcXG59XFxuLmZsYWtCYXJyZWw2IHtcXG4gICAgdG9wOiAtOTVweDtcXG4gICAgbGVmdDogNjU1cHg7XFxufVxcblxcbi5mbGFrQ292ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY2LCAxNjYsIDE2NiwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRvcDogMTUwcHg7XFxuICAgIGxlZnQ6IDQ1MHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiAyMDBweDtcXG59XFxuLmZsYWtDb3ZlclRvcCB7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogcmdiKDE1OCwgMTU4LCAxNTgpO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDE1OCwgMTU4LCAxNTgsIDEpIDElLFxcbiAgICAgICAgcmdiYSgxMTMsIDExMywgMTEzLCAxKSA0NyUsXFxuICAgICAgICByZ2JhKDExMiwgMTEyLCAxMTIsIDEpIDk5JVxcbiAgICApO1xcblxcbiAgICB0b3A6IDEwMHB4O1xcbiAgICBsZWZ0OiA0NTBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuQGtleWZyYW1lcyB3YXZlIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE1JSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDE4MDBweCkge1xcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2LFxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMHB4LCAtNTBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbiAgICAuc2hpcEJvd1dvb2Qge1xcbiAgICAgICAgbGVmdDogMTkwcHg7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1NTBweCkge1xcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2LFxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0yMHB4LCAwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTIwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTU1MHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwcHgsIDBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTAwcHgpIHtcXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgIHRvcDogLTIwcHg7XFxuICAgICAgICBsZWZ0OiAtNTBweDtcXG4gICAgICAgIGhlaWdodDogMzAwcHg7XFxuICAgICAgICB3aWR0aDogMzUwcHg7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC43KTtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgfVxcbiAgICAud2F2ZXMge1xcbiAgICAgICAgdG9wOiA1MHB4O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgcmlnaHQ6IDA7XFxuICAgICAgICB0b3A6IDA7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xcbiAgICB9XFxuXFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwcHgpO1xcbiAgICB9XFxuICAgIC5zaGlwQm93V29vZCB7XFxuICAgICAgICBsZWZ0OiAxMDBweDtcXG4gICAgfVxcbiAgICAud2F2ZXMge1xcbiAgICAgICAgdG9wOiA1MHB4O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgyKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogOTUwcHgpIHtcXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gICAgICAgIHRvcDogLTUwcHg7XFxuICAgICAgICBsZWZ0OiAtODBweDtcXG4gICAgfVxcblxcbiAgICAuYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG4gICAgLnAxT3B0aW9uc0NvbnRhaW5lciB7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIGhlaWdodDogNjB2aDtcXG4gICAgfVxcblxcbiAgICAucDFHcmlkQ29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBmbGV4OiAxO1xcbiAgICAgICAgcGFkZGluZzogMDtcXG4gICAgICAgIG1hcmdpbjogMDtcXG4gICAgfVxcblxcbiAgICAuYm9hcmQge1xcbiAgICAgICAgbWFyZ2luLXRvcDogbm9uZTtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gICAgfVxcbiAgICAuY2VsbCB7XFxuICAgICAgICB3aWR0aDogMzBweDtcXG4gICAgICAgIGhlaWdodDogMzBweDtcXG4gICAgfVxcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgdG9wOiBhdXRvO1xcbiAgICAgICAgbGVmdDogYXV0bztcXG4gICAgICAgIGJvdHRvbTogLTUwcHg7XFxuICAgICAgICByaWdodDogLTEwMHB4O1xcbiAgICAgICAgei1pbmRleDogNTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL0NTUy9zdGFnaW5nc2NyZWVuLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsYUFBYTtJQUNiLDhCQUE4QjtJQUM5Qjs7Ozs7Ozs7S0FRQztJQUNELGlCQUFpQjtBQUNyQjtBQUNBO0lBQ0ksT0FBTzs7SUFFUCw2QkFBNkI7SUFDN0IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksT0FBTztJQUNQLGtDQUFrQztJQUNsQyxpQ0FBaUM7SUFDakMsd0NBQXdDO0lBQ3hDLHlD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QjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxlQUFlO1FBQ2Ysc0JBQXNCO1FBQ3RCLFFBQVE7UUFDUixNQUFNO1FBQ04sc0JBQXNCO1FBQ3RCLHFCQUFxQjtJQUN6Qjs7SUFFQTs7Ozs7O1FBTUksK0NBQStDO0lBQ25EO0lBQ0E7O1FBRUksNEJBQTRCO0lBQ2hDO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7SUFDQTtRQUNJLFNBQVM7UUFDVCxtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJO1FBQ0kscUJBQXFCO1FBQ3JCLFVBQVU7UUFDVixXQUFXO0lBQ2Y7O0lBRUE7UUFDSSxnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLFdBQVc7SUFDZjtJQUNBO1FBQ0ksc0JBQXNCOztRQUV0QixnQkFBZ0I7UUFDaEIsWUFBWTtJQUNoQjs7SUFFQTtRQUNJLGFBQWE7UUFDYixPQUFPO1FBQ1AsVUFBVTtRQUNWLFNBQVM7SUFDYjs7SUFFQTtRQUNJLGdCQUFnQjtRQUNoQixvQ0FBb0M7UUFDcEMsdUNBQXVDO0lBQzNDO0lBQ0E7UUFDSSxXQUFXO1FBQ1gsWUFBWTtJQUNoQjtJQUNBO1FBQ0ksU0FBUztRQUNULFVBQVU7UUFDVixhQUFhO1FBQ2IsYUFBYTtRQUNiLFVBQVU7SUFDZDtBQUNKOztBQUVBO0lBQ0k7UUFDSSxhQUFhO0lBQ2pCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmdhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5xdWV1ZUNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wMU9wdGlvbnNDb250YWluZXIge1xcbiAgICBmbGV4OiAxLjM7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxNDQsIDE0NCwgMTQ0KTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxNDQsIDE0NCwgMTQ0LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTQwLCAxNDAsIDE0MCwgMSkgMTElLFxcbiAgICAgICAgcmdiYSgxMzYsIDEzNiwgMTM2LCAxKSAyMSUsXFxuICAgICAgICByZ2JhKDE0NCwgMTQ0LCAxNDQsIDEpIDY5JSxcXG4gICAgICAgIHJnYmEoMTM4LCAxMzgsIDEzOCwgMSkgODclLFxcbiAgICAgICAgcmdiYSgxNjgsIDE2OCwgMTY4LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xcbn1cXG4ucDFHcmlkQ29udGFpbmVyIHtcXG4gICAgZmxleDogMztcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5yYWRhckNvbnRhaW5lciB7XFxuICAgIGZsZXg6IDI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5yYWRhciB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgd2lkdGg6IDI2M3B4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYm9yZGVyOiAxMHB4IHNvbGlkICM2ZDZkNmQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggMTBweCAwICNjNWM1YzUsIGluc2V0IDAgMCA1MHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpLFxcbiAgICAgICAgLTVweCAtNXB4IDIwcHggYmxhY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoMSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDMpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoNCkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHJnYig0OSwgMTU4LCA0OSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgzKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCg0KSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg2KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMjU1LCAwLCAxKTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg1KSB7XFxuICAgIHdpZHRoOiA3NXB4O1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNikge1xcbiAgICB3aWR0aDogMTc1cHg7XFxuICAgIGhlaWdodDogMTc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNykge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwZmYwMCAwJSwgdHJhbnNwYXJlbnQgNTAlKTtcXG4gICAgYW5pbWF0aW9uOiByYWRhciAycyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBsZWZ0O1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDgpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogNzUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCg5KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIGxlZnQ6IDc1JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMTApIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogODUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxMSkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDEyKSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbkBrZXlmcmFtZXMgcmFkYXIge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBnbG93IHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG59XFxuXFxuLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5iYXNlIHtcXG4gICAgYmFja2dyb3VuZDogI2NhY2FjYTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI3dm1pbjtcXG4gICAgYm94LXNoYWRvdzogMCA2dm1pbiAwLjE1dm1pbiAwdm1pbiAjNzc3LCAwIDR2bWluIDAuMTV2bWluIDB2bWluICM3NzcsXFxuICAgICAgICAwIDJ2bWluIDAuMTV2bWluIDB2bWluICM3NzcsIC0yMHB4IDIwcHggNTBweCBibGFjaztcXG4gICAgcGFkZGluZzogMHZtaW4gMnZtaW4gMnZtaW4gMnZtaW47XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKSByb3RhdGVaKDBkZWcpO1xcbiAgICBtYXJnaW4tdG9wOiAtNC41dm1pbjtcXG4gICAgaGVpZ2h0OiA5MCU7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZSB7XFxuICAgIGJhY2tncm91bmQ6ICNkNjA1MDU7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgd2lkdGg6IDIwdm1pbjtcXG4gICAgaGVpZ2h0OiAxOXZtaW47XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwIDR2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAtMi41dm1pbjtcXG4gICAgYm9yZGVyOiAwLjV2bWluIHNvbGlkICNhZjAwMDBhMTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UgMHM7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZTpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgM3ZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IC0xLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlIDBzO1xcbn1cXG5idXR0b24jYWN0aXZhdGU6YWN0aXZlLFxcbmJ1dHRvbiNhY3RpdmF0ZS5wdXNoZWQge1xcbiAgICBib3gtc2hhZG93OiAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAwLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZSAwcztcXG59XFxuYnV0dG9uI2FjdGl2YXRlLnB1c2hlZCB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAyMHB4IDEwcHggI2ZmM2MzYywgMCAwIDEwMHB4IDUwcHggI2ZmMjgyODtcXG4gICAgYmFja2dyb3VuZDogI2ZmMDAwMDtcXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMwMDAwMDAyMDtcXG59XFxuXFxuLmJhc2Uge1xcbiAgICBzY2FsZTogMC4zO1xcbn1cXG4ucmlnaHRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG4ubWlkZGxlQnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuLmxlZnRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4uYnV0dG9uVGV4dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2ZDZkNmQ7XFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggYmxhY2s7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xcbiAgICB0ZXh0LXNoYWRvdzogLTFweCAtMXB4IDFweCBibGFjaztcXG59XFxuLmJ1dHRvblRleHQ6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICBsZWZ0OiA1cHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggYmxhY2s7XFxufVxcbi5idXR0b25UZXh0OjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IGJsYWNrO1xcbn1cXG5cXG4ubWlkZGxlQnV0dG9uIC5idXR0b25UZXh0IHtcXG4gICAgcGFkZGluZzogMXJlbSAxLjFyZW07XFxufVxcblxcbi5wMVNoaXBTdGFnZSB7XFxuICAgIGZsZXg6IDU7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnNoaXBDb250YWluZXIge1xcbiAgICBmbGV4OiAxO1xcblxcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDUwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5zaGlwUXVldWUge1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBmbGV4OiAzO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDE4JTtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmlsdGVyOiBibHVyKDVweCk7XFxufVxcbi5uZXh0U2hpcENvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpLFxcbiAgICAgICAgaW5zZXQgMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxufVxcblxcbi5uZXh0U2hpcENvbnRhaW5lcjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjgpLFxcbiAgICAgICAgaW5zZXQgMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuOCk7XFxufVxcblxcbi5uZXh0U2hpcDpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG59XFxuXFxuLm5leHRTaGlwIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uQ2FycmllckNvbnRhaW5lcixcXG4uQmF0dGxlc2hpcENvbnRhaW5lcixcXG4uRGVzdHJveWVyQ29udGFpbmVyLFxcbi5TdWJtYXJpbmVDb250YWluZXIsXFxuLlBhdHJvbC1Cb2F0Q29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLkNhcnJpZXJDb250YWluZXI6aG92ZXIsXFxuLkJhdHRsZXNoaXBDb250YWluZXI6aG92ZXIsXFxuLkRlc3Ryb3llckNvbnRhaW5lcjpob3ZlcixcXG4uU3VibWFyaW5lQ29udGFpbmVyOmhvdmVyLFxcbi5QYXRyb2wtQm9hdENvbnRhaW5lcjpob3ZlciB7XFxufVxcblxcbiNDYXJyaWVyLFxcbiNCYXR0bGVzaGlwLFxcbiNEZXN0cm95ZXIsXFxuI1N1Ym1hcmluZSxcXG4jUGF0cm9sLUJvYXQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5zaGlwT3ZlcmxheSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAtMjAlO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCk7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLnNoaXBPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDUpO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRvcDogNDIlO1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICAvKiBhbmltYXRpb246IHJvdGF0ZSAwLjRzIGVhc2UtaW4tb3V0OyAqL1xcbn1cXG5cXG4vKiAuc2hpcE92ZXJsYXkuaG9yaXpvbnRhbCB7XFxuICAgIGFuaW1hdGlvbjogcm90YXRlMSAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoNS41KSByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDUpIHJvdGF0ZSg5MGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGUxIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjYpIHJvdGF0ZSg5MGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCkgcm90YXRlKDBkZWcpO1xcbiAgICB9XFxufSAqL1xcblxcbiNQYXRyb2wtQm9hdE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoMyk7XFxufVxcblxcbi5zaGlwVGlsZSB7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5zaGlwIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLnNoaXAuaG9yaXpvbnRhbCB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5nYW1lIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCByZ2IoMTU1LCAxNTUsIDE1NSk7XFxuICAgIGJvcmRlci1yaWdodDogMzBweCBzb2xpZCByZ2IoMTgyLCAxODIsIDE4Mik7XFxuICAgIGJvcmRlci10b3A6IDMwcHggc29saWQgcmdiKDcxLCA3MSwgNzEpO1xcbiAgICBib3JkZXItbGVmdDogMzBweCBzb2xpZCByZ2IoOTQsIDk0LCA5NCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDE0MHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1JTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDUlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA1MHB4KTtcXG59XFxuXFxuLnNoYWRvd0dyaWQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLFxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcsXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLFxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZyxcXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwIGltZyB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcDpob3ZlcixcXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXA6aG92ZXIsXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXA6aG92ZXIsXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXA6aG92ZXIsXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcDpob3ZlciB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjYpO1xcbn1cXG5cXG4udGlsZSB7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgd2lkdGg6IDMwcHg7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwOWMwMDtcXG59XFxuLnRpbGUueDAge1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLnRpbGUueDkge1xcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XFxufVxcbi50aWxlLnk5IHtcXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcXG59XFxuLnRpbGUueTAge1xcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbiNTdWJtYXJpbmUgaW1nLmhvcml6b250YWwge1xcbiAgICBsZWZ0OiAtNSU7XFxufVxcblxcbi5zaGlwT3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg1KTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0b3A6IDQyJTtcXG59XFxuXFxuLmJvYXJkU2hpcCB7XFxuICAgIHotaW5kZXg6IDk7XFxufVxcblxcbi5ib2FyZFNoaXAgaW1nIHtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg4LCA2KTtcXG4gICAgbGVmdDogMzMlO1xcbiAgICB0b3A6IDQ4JTtcXG59XFxuXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg2LjUsIDUpO1xcbiAgICBsZWZ0OiAxOCU7XFxuICAgIHRvcDogNDclO1xcbn1cXG5cXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0b3A6IDQ2JTtcXG4gICAgbGVmdDogMjQlO1xcbn1cXG5cXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNiwgOCk7XFxuICAgIHRvcDogNDMlO1xcbiAgICBsZWZ0OiAtMyU7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi42LCAyKTtcXG4gICAgdG9wOiA4JTtcXG4gICAgbGVmdDogMzIlO1xcbn1cXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuMiwgMik7XFxuICAgIHRvcDogMTUlO1xcbiAgICBsZWZ0OiAyOCU7XFxufVxcblxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjMsIDIuNSk7XFxuICAgIHRvcDogMTUlO1xcbiAgICBsZWZ0OiAyOCU7XFxufVxcblxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLCAyLjYpO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogMTclO1xcbn1cXG5cXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdG9wOiAxNSU7XFxufVxcbi50aWxlLm9uQm9hcmQge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbn1cXG5cXG4uZHJhZ2dlZE92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLmludmFsaWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwO1xcbn1cXG5cXG4udmFsaWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLnNoaXBGb290ZXIge1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxufVxcblxcbi5zdGFnZVBhcmEge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGNvbG9yOiAjMDBmZjAwO1xcbiAgICBmb250LXdlaWdodDogMTAwO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDIuNXMgc3RlcHMoNDAsIGVuZCksIGJsaW5rLWNhcmV0MiAxcyBzdGVwLWVuZCBpbmZpbml0ZTtcXG59XFxuXFxuQGtleWZyYW1lcyBibGluay1jYXJldDIge1xcbiAgICBmcm9tLFxcbiAgICB0byB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3JkZXItY29sb3I6ICMwMGZmMDA7XFxuICAgIH1cXG59XFxuLndhdmVzIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuXFxuICAgIHRvcDogLTUwcHg7XFxuICAgIGFuaW1hdGlvbjogd2F2ZSAxMHMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uc2hpcEJvdyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzMDAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxOTQsIDE5NCwgMTk0LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdG9wOiAtNDAwcHg7XFxuXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNjBkZWcpO1xcbn1cXG4uc2hpcEJvd1dvb2Qge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIGhlaWdodDogMzAwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTE5LCA1NywgMCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTE5LCA1NywgMCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NCwgNzksIDAsIDEpIDQ2JSxcXG4gICAgICAgIHJnYmEoMTE5LCA1NywgMCwgMSkgMTAwJVxcbiAgICApO1xcblxcbiAgICB0b3A6IC02NDBweDtcXG4gICAgbGVmdDogMTYwcHg7XFxuXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNjBkZWcpO1xcbn1cXG5cXG4uZmxha0JhcnJlbDEsXFxuLmZsYWtCYXJyZWwyLFxcbi5mbGFrQmFycmVsMyxcXG4uZmxha0JhcnJlbDQsXFxuLmZsYWtCYXJyZWw1LFxcbi5mbGFrQmFycmVsNiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMzAwcHg7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDMwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMzAlIDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjYsIDE2NiwgMTY2LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMjBkZWcpO1xcbn1cXG5cXG4uZmxha0JhcnJlbDEge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNTU1cHg7XFxufVxcbi5mbGFrQmFycmVsMiB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA2MDVweDtcXG59XFxuLmZsYWtCYXJyZWwzIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDY1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDQge1xcbiAgICB0b3A6IC05MHB4O1xcbiAgICBsZWZ0OiA1NTVweDtcXG59XFxuLmZsYWtCYXJyZWw1IHtcXG4gICAgdG9wOiAtOTVweDtcXG4gICAgbGVmdDogNjA1cHg7XFxufVxcbi5mbGFrQmFycmVsNiB7XFxuICAgIHRvcDogLTk1cHg7XFxuICAgIGxlZnQ6IDY1NXB4O1xcbn1cXG5cXG4uZmxha0NvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NiwgMTY2LCAxNjYsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0b3A6IDE1MHB4O1xcbiAgICBsZWZ0OiA0NTBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogMjAwcHg7XFxufVxcbi5mbGFrQ292ZXJUb3Age1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMTU4KTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxNTgsIDE1OCwgMTU4LCAxKSAxJSxcXG4gICAgICAgIHJnYmEoMTEzLCAxMTMsIDExMywgMSkgNDclLFxcbiAgICAgICAgcmdiYSgxMTIsIDExMiwgMTEyLCAxKSA5OSVcXG4gICAgKTtcXG5cXG4gICAgdG9wOiAxMDBweDtcXG4gICAgbGVmdDogNDUwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDEwMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbkBrZXlmcmFtZXMgd2F2ZSB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNSUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAxODAwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG4gICAgLnNoaXBCb3dXb29kIHtcXG4gICAgICAgIGxlZnQ6IDE5MHB4O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTUwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0yMHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1NTBweCkge1xcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2LFxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MHB4LCAwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICB0b3A6IC0yMHB4O1xcbiAgICAgICAgbGVmdDogLTUwcHg7XFxuICAgICAgICBoZWlnaHQ6IDMwMHB4O1xcbiAgICAgICAgd2lkdGg6IDM1MHB4O1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgIH1cXG4gICAgLndhdmVzIHtcXG4gICAgICAgIHRvcDogNTBweDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5idXR0b25Db250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIHJpZ2h0OiAwO1xcbiAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcXG4gICAgfVxcblxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MHB4KTtcXG4gICAgfVxcbiAgICAuc2hpcEJvd1dvb2Qge1xcbiAgICAgICAgbGVmdDogMTAwcHg7XFxuICAgIH1cXG4gICAgLndhdmVzIHtcXG4gICAgICAgIHRvcDogNTBweDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMik7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDk1MHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgICAgICB0b3A6IC01MHB4O1xcbiAgICAgICAgbGVmdDogLTgwcHg7XFxuICAgIH1cXG5cXG4gICAgLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxuICAgIC5wMU9wdGlvbnNDb250YWluZXIge1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICBoZWlnaHQ6IDYwdmg7XFxuICAgIH1cXG5cXG4gICAgLnAxR3JpZENvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleDogMTtcXG4gICAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgICBtYXJnaW46IDA7XFxuICAgIH1cXG5cXG4gICAgLmJvYXJkIHtcXG4gICAgICAgIG1hcmdpbi10b3A6IG5vbmU7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgIH1cXG4gICAgLmNlbGwge1xcbiAgICAgICAgd2lkdGg6IDMwcHg7XFxuICAgICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIH1cXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHRvcDogYXV0bztcXG4gICAgICAgIGxlZnQ6IGF1dG87XFxuICAgICAgICBib3R0b206IC01MHB4O1xcbiAgICAgICAgcmlnaHQ6IC0xMDBweDtcXG4gICAgICAgIHotaW5kZXg6IDU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob21lcGFnZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWVwYWdlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYXBwYWdlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFwcGFnZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbmFtZXBhZ2UuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9uYW1lcGFnZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3RhZ2luZ3NjcmVlbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0YWdpbmdzY3JlZW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0dhbWUuanNcIjtcbmltcG9ydCBWaWV3TW9kZWwgZnJvbSBcIi4vc3JjL3NjcmlwdHMvVmlld01vZGVsXCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL3NyYy9zY3JpcHRzL0RPTS9BcHAuanNcIjtcblxuY29uc3QgbW9kZWwgPSBuZXcgR2FtZSgpO1xuY29uc3Qgdm0gPSBuZXcgVmlld01vZGVsKG1vZGVsKTtcbm5ldyBBcHAodm0sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFpbmVyXCIpKTtcbiJdLCJuYW1lcyI6WyJQdWJTdWJJbnRlcmZhY2UiLCJIb21lUGFnZSIsIk1hcFBhZ2UiLCJHYW1lUGFnZSIsImVsZW0iLCJBcHAiLCJjb25zdHJ1Y3RvciIsInZpZXdNb2RlbCIsImVsZW1lbnQiLCJzaG91bGRVcGRhdGUiLCJvbGRNb2RlbCIsIm5ld01vZGVsIiwiY3VycmVudFBhZ2UiLCJyZW5kZXIiLCJhcHBFbGVtZW50IiwicHJvcCIsImlkIiwid2F2ZXNTcmMiLCJHYW1lTWVzc2FnZSIsIlNoaXBRdWV1ZSIsIkJvYXJkRWxlbSIsInBsYWNlU2hpcFJhbmRvbWx5IiwiZ2FtZVN0YXRlIiwibW9kZWwiLCJidWlsZEdhbWVwYWdlIiwibGVmdEJ1dHRvbiIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwibWlkZGxlQnV0dG9uIiwicmlnaHRCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwidXBkYXRlTW9kZWwiLCJwbGF5ZXIiLCJzaGlwUXVldWUiLCJpc0hvcml6b250YWwiLCJkcm9wUXVldWUiLCJwdXNoIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwibGVuZ3RoIiwic2hpcCIsInNoaWZ0IiwibmV3R2FtZWJvYXJkIiwibmV3U2hpcCIsImdhbWVib2FyZCIsInNoaXBzIiwicG9wIiwic2hpcENvbnRhaW5lciIsInNoaXBJbmRleCIsImNsaWNrZWRJbmRleCIsImRyYWdnZWRTaGlwSW5kZXgiLCJtZXNzYWdlQ29udGFpbmVyIiwiZ2FtZSIsImdhbWVDb250YWluZXIiLCJzcmMiLCJhdXRvcGxheSIsImxvb3AiLCJkcmFnZ2FibGUiLCJ0ZXh0Q29udGVudCIsIkhvbWVQYWdlSW5wdXQiLCJob21lcGFnZUNvbnRhaW5lciIsImFwcGVuZENoaWxkIiwibmV3R2FtZSIsImhyZWYiLCJuYW1lUGFnZUlzT3BlbiIsIm5ld0dhbWVCdG4iLCJidWlsZEZvcm0iLCJncmVldGluZyIsImlucHV0RmllbGQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJidXR0b24iLCJuYW1lRmllbGQiLCJuYW1lIiwidmFsdWUiLCJmb3JtQ29udGFpbmVyIiwicmVkUGluU3JjIiwic3RpY2t5Tm90ZVNyYyIsInN0YXRlTWVzc2FnZSIsInJlZFBpbnMiLCJmb3JFYWNoIiwicGluIiwiQUkiLCJkaWZmaWN1bHR5IiwibWFwIiwibm90ZSIsImJ1aWxkTm90ZSIsIm5vdGVPcHRpb25zIiwibm90ZTEiLCJsb2NhdGlvbiIsInBhcmEiLCJub3RlMiIsIm5vdGUzIiwic2VsZWN0ZWRPcHRpb25zIiwiY29udGVudCIsInZlcnNpb24iLCJlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRleHQiLCJIVE1MIiwiaW5uZXJIVE1MIiwiZm9ySSIsImZvciIsInNwZWxsY2hlY2siLCJyZXF1aXJlZCIsImNoZWNrZWQiLCJtdXRlZCIsImNoaWxkIiwiU2hpcCIsImlzVmFsaWRQbGFjZW1lbnQiLCJwbGFjZVNoaXAiLCJkcmFnRW50ZXIiLCJib2FyZFNpemUiLCJidWlsZEJvYXJkIiwic2hhZG93R3JpZCIsImJvYXJkIiwic2l6ZSIsImNlbGxzIiwicm93IiwiY29sIiwiY2VsbCIsInRpbGVSZWYiLCJkYXRhc2V0IiwiZSIsImJvdW5kIiwiaGFuZGxlRHJhZ0VudGVyIiwiYmluZCIsImhhbmRsZURyb3AiLCJoYW5kbGVEcmFnT3ZlciIsImNsYXNzTGlzdCIsImFkZCIsInRpbGVTdGF0dXMiLCJzaGlwRWxlbSIsImJhc2VUaWxlIiwidGlsZXMiLCJlbmRUaWxlIiwic3R5bGUiLCJncmlkQXJlYSIsInRpbGUiLCJwcmV2ZW50RGVmYXVsdCIsImhhbmRsZURyYWdMZWF2ZSIsImRyYWdnZWRTaGlwIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsImJhc2VDb29yZHMiLCJnZXRCYXNlVGlsZSIsImJhc2VSb3ciLCJiYXNlQ29sIiwiaXNWYWxpZCIsInJvd09mZnNldCIsImNvbE9mZnNldCIsImkiLCJOdW1iZXIiLCJnZXRDZWxsIiwiaW5kZXgiLCJvZmZzZXRSb3ciLCJvZmZzZXRDb2wiLCJjYXJyaWVyU3JjIiwiYmF0dGxlc2hpcFNyYyIsImRlc3Ryb3llclNyYyIsInN1Ym1hcmluZVNyYyIsInBhdHJvbEJvYXRTcmMiLCJjbGlja2VkRXZlbnQiLCJzaGlwTW9kZWwiLCJjcmVhdGUiLCJzaGlwU3JjIiwic2hpcENsYXNzIiwiYm9hdCIsInNoaXBPdmVybGF5Iiwib3ZlcmxheSIsIm92ZXJsYXlDbGFzcyIsImhhbmRsZURyYWdTdGFydCIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0VGltZW91dCIsImNvbnNvbGUiLCJsb2ciLCJidWlsZFF1ZXVlIiwic3RhZ2UiLCJuZXh0IiwicXVldWUiLCJpbmNsdWRlcyIsInByZXBlbmQiLCJvbkluaXQiLCJyZWdpc3RlciIsImdldEVsZW1lbnQiLCJWaWV3TW9kZWwiLCJwdWJzdWJzIiwicHVic3ViIiwicmVwbGFjZUNoaWxkcmVuIiwibW9kZWxVcGRhdGVGdW5jIiwia2V5IiwiUGxheWVyIiwiR2FtZSIsImN1cnJlbnRUdXJuIiwid2FybiIsIk1hdGgiLCJyYW5kb20iLCJyYW5kUm93IiwiZmxvb3IiLCJyYW5kQ29sIiwiVGlsZSIsIkdhbWVib2FyZCIsImhpdHMiLCJzdW5rIiwidm0iLCJxdWVyeVNlbGVjdG9yIl0sInNvdXJjZVJvb3QiOiIifQ==