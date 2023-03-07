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
___CSS_LOADER_EXPORT___.push([module.id, ".gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    flex: 2;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px rgba(0, 255, 0, 0.5),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: rgb(49, 158, 49);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid rgba(0, 255, 0, 1);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, #00ff00 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.radar li:nth-child(8) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(9) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(10) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(11) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(12) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin #777, 0 4vmin 0.15vmin 0vmin #777,\n        0 2vmin 0.15vmin 0vmin #777, -20px 20px 50px black;\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 50px rgba(0, 255, 0, 0.5);\n    display: flex;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5),\n        inset 0 0 10px rgba(0, 255, 0, 0.5);\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8),\n        inset 0 0 10px rgba(0, 255, 0, 0.8);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n.CarrierContainer:hover,\n.BattleshipContainer:hover,\n.DestroyerContainer:hover,\n.SubmarineContainer:hover,\n.Patrol-BoatContainer:hover {\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n}\n\n.board {\n    margin-top: auto;\n    position: relative;\n\n    border-bottom: 10px solid rgb(155, 155, 155);\n    border-right: 30px solid rgb(182, 182, 182);\n    border-top: 30px solid rgb(71, 71, 71);\n    border-left: 30px solid rgb(94, 94, 94);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px rgba(0, 255, 0, 0.5);\n    border-top-left-radius: 5%;\n    border-top-right-radius: 5%;\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.6);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.cell {\n    height: 100%;\n    width: 100%;\n    border: 1px solid #009c00;\n}\n.tile.x0 {\n    border-left: none;\n}\n.tile.x9 {\n    border-right: none;\n}\n.tile.y9 {\n    border-top: none;\n}\n.tile.y0 {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.5);\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: #00ff00;\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: #00ff00;\n    }\n}\n.waves {\n    position: absolute;\n    width: 100vw;\n\n    top: -50px;\n    animation: wave 10s linear infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/stagingscreen.css"],"names":[],"mappings":"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","sourcesContent":[".gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    flex: 2;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px rgba(0, 255, 0, 0.5),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: rgb(49, 158, 49);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid rgba(0, 255, 0, 1);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, #00ff00 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.radar li:nth-child(8) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(9) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(10) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(11) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(12) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin #777, 0 4vmin 0.15vmin 0vmin #777,\n        0 2vmin 0.15vmin 0vmin #777, -20px 20px 50px black;\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 50px rgba(0, 255, 0, 0.5);\n    display: flex;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5),\n        inset 0 0 10px rgba(0, 255, 0, 0.5);\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8),\n        inset 0 0 10px rgba(0, 255, 0, 0.8);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n.CarrierContainer:hover,\n.BattleshipContainer:hover,\n.DestroyerContainer:hover,\n.SubmarineContainer:hover,\n.Patrol-BoatContainer:hover {\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n}\n\n.board {\n    margin-top: auto;\n    position: relative;\n\n    border-bottom: 10px solid rgb(155, 155, 155);\n    border-right: 30px solid rgb(182, 182, 182);\n    border-top: 30px solid rgb(71, 71, 71);\n    border-left: 30px solid rgb(94, 94, 94);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px rgba(0, 255, 0, 0.5);\n    border-top-left-radius: 5%;\n    border-top-right-radius: 5%;\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.6);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.cell {\n    height: 100%;\n    width: 100%;\n    border: 1px solid #009c00;\n}\n.tile.x0 {\n    border-left: none;\n}\n.tile.x9 {\n    border-right: none;\n}\n.tile.y9 {\n    border-top: none;\n}\n.tile.y0 {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.5);\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: #00ff00;\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: #00ff00;\n    }\n}\n.waves {\n    position: absolute;\n    width: 100vw;\n\n    top: -50px;\n    animation: wave 10s linear infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "cac8fc3d176f35f09d68.svg";

/***/ }),

/***/ "./src/assets/images/Destroyer.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/Destroyer.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2096a8dcb5115ef77333.svg";

/***/ }),

/***/ "./src/assets/images/Patrol-Boat.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/Patrol-Boat.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3e9a3316ddb71c45c3c4.svg";

/***/ }),

/***/ "./src/assets/images/Submarine.svg":
/*!*****************************************!*\
  !*** ./src/assets/images/Submarine.svg ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0f6d97d45e660e1f0639.svg";

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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_components_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/components/Game.js */ "./src/scripts/components/Game.js");
/* harmony import */ var _scripts_ViewModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/ViewModel */ "./src/scripts/ViewModel.js");
/* harmony import */ var _scripts_DOM_App_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/DOM/App.js */ "./src/scripts/DOM/App.js");



const model = new _scripts_components_Game_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const vm = new _scripts_ViewModel__WEBPACK_IMPORTED_MODULE_1__["default"](model);
new _scripts_DOM_App_js__WEBPACK_IMPORTED_MODULE_2__["default"](vm, document.querySelector("#container"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLE1BQU0sS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxNQUFNLE9BQU8sYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sTUFBTSxZQUFZLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsTUFBTSxPQUFPLE9BQU8sS0FBSyxLQUFLLE9BQU8sT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxTQUFTLFVBQVUsWUFBWSxPQUFPLFNBQVMsTUFBTSxTQUFTLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyx3QkFBd0IsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLGNBQWMsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLFNBQVMsWUFBWSxPQUFPLFNBQVMsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLEtBQUssS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssTUFBTSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFlBQVksWUFBWSxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksVUFBVSxLQUFLLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFVBQVUsTUFBTSxVQUFVLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxVQUFVLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxVQUFVLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsVUFBVSxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8s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anMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9HYW1lUGFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL0hvbWVQYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ET00vSG9tZVBhZ2VJbnB1dC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL01hcFBhZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9lbGVtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ET00vZ2FtZUVsZW1lbnRzL0JvYXJkRWxlbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL2dhbWVFbGVtZW50cy9HYW1lTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL2dhbWVFbGVtZW50cy9TaGlwRWxlbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL2dhbWVFbGVtZW50cy9TaGlwUXVldWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL1B1YlN1YkludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvVmlld01vZGVsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0FJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1RpbGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvaG9tZXBhZ2UuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL21hcHBhZ2UuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL25hbWVwYWdlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9zdGFnaW5nc2NyZWVuLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvaG9tZXBhZ2UuY3NzPzE0Y2YiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvbWFwcGFnZS5jc3M/NzFlYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9uYW1lcGFnZS5jc3M/N2FkYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9zdGFnaW5nc2NyZWVuLmNzcz82M2U3Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuXG5pbXBvcnQgSG9tZVBhZ2UgZnJvbSBcIi4vSG9tZVBhZ2UuanNcIjtcbmltcG9ydCBNYXBQYWdlIGZyb20gXCIuL01hcFBhZ2UuanNcIjtcbmltcG9ydCBHYW1lUGFnZSBmcm9tIFwiLi9HYW1lUGFnZS5qc1wiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4vZWxlbS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG9sZE1vZGVsLmN1cnJlbnRQYWdlICE9PSBuZXdNb2RlbC5jdXJyZW50UGFnZTtcbiAgICB9XG5cbiAgICByZW5kZXIoeyBjdXJyZW50UGFnZSB9KSB7XG4gICAgICAgIGNvbnN0IGFwcEVsZW1lbnQgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgaWQ6IFwiYXBwXCIgfSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRQYWdlID09PSBcImhvbWVQYWdlXCIpIHtcbiAgICAgICAgICAgIG5ldyBIb21lUGFnZSh0aGlzLnZpZXdNb2RlbCwgYXBwRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT09IFwibWFwUGFnZVwiKSB7XG4gICAgICAgICAgICBuZXcgTWFwUGFnZSh0aGlzLnZpZXdNb2RlbCwgYXBwRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPT09IFwiZ2FtZVBhZ2VcIikge1xuICAgICAgICAgICAgbmV3IEdhbWVQYWdlKHRoaXMudmlld01vZGVsLCBhcHBFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXBwRWxlbWVudDtcbiAgICB9XG59XG4iLCIvLyBpbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRWaWV3LmpzXCI7XG5pbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi9QdWJTdWJJbnRlcmZhY2UuanNcIjtcbmltcG9ydCB3YXZlc1NyYyBmcm9tIFwiLi4vLi4vYXNzZXRzL3ZpZGVvcy9vY2Vhbi5tcDRcIjtcbmltcG9ydCBcIi4uLy4uL0NTUy9zdGFnaW5nc2NyZWVuLmNzc1wiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4vZWxlbS5qc1wiO1xuaW1wb3J0IEdhbWVNZXNzYWdlIGZyb20gXCIuL2dhbWVFbGVtZW50cy9HYW1lTWVzc2FnZS5qc1wiO1xuaW1wb3J0IFNoaXBRdWV1ZSBmcm9tIFwiLi9nYW1lRWxlbWVudHMvU2hpcFF1ZXVlLmpzXCI7XG5pbXBvcnQgQm9hcmRFbGVtIGZyb20gXCIuL2dhbWVFbGVtZW50cy9Cb2FyZEVsZW0uanNcIjtcbmltcG9ydCB7IHBsYWNlU2hpcFJhbmRvbWx5IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvR2FtZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lUGFnZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgb2xkTW9kZWwuZ2FtZVN0YXRlID09PSBcInBsYWNlU2hpcHNcIiAmJlxuICAgICAgICAgICAgbmV3TW9kZWwuZ2FtZVN0YXRlICE9PSBcInBsYWNlU2hpcHNcIiAmJlxuICAgICAgICAgICAgb2xkTW9kZWwuY3VycmVudFBhZ2UgPT09IFwiZ2FtZVBhZ2VcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZEdhbWVwYWdlKG1vZGVsKTtcbiAgICB9XG5cbiAgICBidWlsZEdhbWVwYWdlKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IGxlZnRCdXR0b24gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBpZDogXCJhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJvdGF0ZUJ1dHRvblwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtlbGVtKHsgcHJvcDogXCJzcGFuXCIgfSldLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbWlkZGxlQnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWQ6IFwiYWN0aXZhdGVcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZWxlbSh7IHByb3A6IFwic3BhblwiIH0pXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0QnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWQ6IFwiYWN0aXZhdGVcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZWxlbSh7IHByb3A6IFwic3BhblwiIH0pXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1vZGVsLmdhbWVTdGF0ZSA9PT0gXCJwbGFjZVNoaXBzXCIpIHtcbiAgICAgICAgICAgIGxlZnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5zaGlwUXVldWVbMF0uaXNIb3Jpem9udGFsID1cbiAgICAgICAgICAgICAgICAgICAgICAgICFuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlWzBdLmlzSG9yaXpvbnRhbDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1pZGRsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IHsgLi4ub2xkTW9kZWwgfTtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuZHJvcFF1ZXVlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9sZE1vZGVsKSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5ld01vZGVsLnBsYXllci5zaGlwUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpcCA9IG5ld01vZGVsLnBsYXllci5zaGlwUXVldWUuc2hpZnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBuZXdHYW1lYm9hcmQsIG5ld1NoaXAgfSA9IHBsYWNlU2hpcFJhbmRvbWx5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLmdhbWVib2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQgPSBuZXdHYW1lYm9hcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmlnaHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwuZHJvcFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IG9sZE1vZGVsLmRyb3BRdWV1ZS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGlwQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNoaXBDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IFNoaXBRdWV1ZShcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLFxuICAgICAgICAgICAgc2hpcENvbnRhaW5lcixcbiAgICAgICAgICAgIChzaGlwSW5kZXgsIGNsaWNrZWRJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEluZGV4ID0gY2xpY2tlZEluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dlZFNoaXBJbmRleCA9IHNoaXBJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBtZXNzYWdlQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNoaXBGb290ZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IEdhbWVNZXNzYWdlKHRoaXMudmlld01vZGVsLCBtZXNzYWdlQ29udGFpbmVyKTtcblxuICAgICAgICBjb25zdCBnYW1lID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJnYW1lXCIgfSk7XG5cbiAgICAgICAgaWYgKG1vZGVsLmdhbWVTdGF0ZSA9PT0gXCJwbGFjZVNoaXBzXCIpIHtcbiAgICAgICAgICAgIG5ldyBCb2FyZEVsZW0odGhpcy52aWV3TW9kZWwsIGdhbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwucGxheWVyLnNoaXBRdWV1ZVt0aGlzLmRyYWdnZWRTaGlwSW5kZXhdLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiZ2FtZUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInAxR3JpZENvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJ2aWRlb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ3YXZlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogd2F2ZXNTcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwQm93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJzaGlwQm93V29vZFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWwxXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDJcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsM1wiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWw0XCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDVcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsNlwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtDb3ZlclwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZmxha0NvdmVyVG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUsXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMU9wdGlvbnNDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyQ29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcInVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMVNoaXBTdGFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtzaGlwQ29udGFpbmVyLCBtZXNzYWdlQ29udGFpbmVyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnV0dG9uQ29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImxlZnRCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJiYXNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbbGVmdEJ1dHRvbl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25UZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcIlJvdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJtaWRkbGVCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJiYXNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbbWlkZGxlQnV0dG9uXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ1dHRvblRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiQXV0by1wbGFjZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyaWdodEJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJhc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtyaWdodEJ1dHRvbl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25UZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcIlVuZG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ2FtZUNvbnRhaW5lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi9QdWJTdWJJbnRlcmZhY2UuanNcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uLy4uL0NTUy9ob21lcGFnZS5jc3NcIjtcbmltcG9ydCBIb21lUGFnZUlucHV0IGZyb20gXCIuL0hvbWVQYWdlSW5wdXQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICBjb25zdCBob21lcGFnZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJob21lcGFnZUNvbnRhaW5lclwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiQkFUVExFU0hJUFwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJob21lSGVhZGVyXCIsXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG5ld0dhbWUgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwibWFpblwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm5ld0dhbWVDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IEhvbWVQYWdlSW5wdXQodGhpcy52aWV3TW9kZWwsIG5ld0dhbWUpO1xuXG4gICAgICAgIGhvbWVwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0dhbWUpO1xuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwidWxcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic21va2VDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiZm9vdGVyXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvb3RlclwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcInNwYW5cIiwgdGV4dENvbnRlbnQ6IFwiQ3JlYXRlZCBieSBHbHV0dHosIFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiSW1hZ2UgYnkgdXBrbHlhayBvbiBGcmVlcGlrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiBcImh0dHBzOi8vd3d3LmZyZWVwaWsuY29tL2ZyZWUtdmVjdG9yL3N1bmtlbi1jcnVpc2Utc2hpcC1zZWEtaGFyYm9yLW1vcm5pbmdfMjE1ODQ5MTUuaHRtI3F1ZXJ5PWJhdHRsZXNoaXAlMjBiYWNrZ3JvdW5kJnBvc2l0aW9uPTMyJmZyb21fdmlldz1zZWFyY2gmdHJhY2s9YWlzXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBob21lcGFnZUNvbnRhaW5lcjtcbiAgICB9XG59XG4iLCJpbXBvcnQgZWxlbSBmcm9tIFwiLi9lbGVtLmpzXCI7XG5pbXBvcnQgXCIuLi8uLi9DU1MvbmFtZXBhZ2UuY3NzXCI7XG5pbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi9QdWJTdWJJbnRlcmZhY2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVBhZ2VJbnB1dCBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKHsgbmFtZVBhZ2VJc09wZW4gfSkge1xuICAgICAgICBjb25zdCBuZXdHYW1lQnRuID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiTmV3IEdhbWVcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJuZXdHYW1lXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWVQYWdlSXNPcGVuOiB0cnVlIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5hbWVQYWdlSXNPcGVuID8gdGhpcy5idWlsZEZvcm0oKSA6IG5ld0dhbWVCdG47XG4gICAgfVxuXG4gICAgYnVpbGRGb3JtKCkge1xuICAgICAgICBjb25zdCBncmVldGluZyA9IGVsZW0oeyBwcm9wOiBcInBcIiwgdGV4dENvbnRlbnQ6IFwiSGVsbG8gQWRtaXJhbC4uLlwiIH0pO1xuICAgICAgICBjb25zdCBpbnB1dEZpZWxkID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImlucHV0XCIsXG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIk5hbWVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJidXR0b25cIixcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogXCJDb250aW51ZVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmFtZUZpZWxkID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImZvcm1cIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJuYW1lRm9ybVwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtpbnB1dEZpZWxkLCBidXR0b25dLFxuICAgICAgICB9KTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IHsgLi4ub2xkTW9kZWwgfTtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5jdXJyZW50UGFnZSA9IFwibWFwUGFnZVwiO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5uYW1lID0gaW5wdXRGaWVsZC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiZm9ybUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtncmVldGluZywgbmFtZUZpZWxkXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1Db250YWluZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IGVsZW0gZnJvbSBcIi4vZWxlbS5qc1wiO1xuaW1wb3J0IFwiLi4vLi4vQ1NTL21hcHBhZ2UuY3NzXCI7XG5pbXBvcnQgcmVkUGluU3JjIGZyb20gXCIuLi8uLi9hc3NldHMvaW1hZ2VzL3JlZC1waW4ucG5nXCI7XG5pbXBvcnQgc3RpY2t5Tm90ZVNyYyBmcm9tIFwiLi4vLi4vYXNzZXRzL2ltYWdlcy9zdGlja3ktbm90ZS5zdmdcIjtcbmltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBQYWdlIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZW5kZXIoeyBzdGF0ZU1lc3NhZ2UsIHBsYXllciB9KSB7XG4gICAgICAgIGNvbnN0IHJlZFBpbnMgPSBbXG4gICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImltZ1wiLFxuICAgICAgICAgICAgICAgIHNyYzogcmVkUGluU3JjLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyZWRQaW4xXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwiZWFzeVwiLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImltZ1wiLFxuICAgICAgICAgICAgICAgIHNyYzogcmVkUGluU3JjLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyZWRQaW4yXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwibWVkaXVtXCIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgc3JjOiByZWRQaW5TcmMsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJlZFBpbjNcIixcbiAgICAgICAgICAgICAgICBpZDogXCJoYXJkXCIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXTtcblxuICAgICAgICByZWRQaW5zLmZvckVhY2goKHBpbikgPT4ge1xuICAgICAgICAgICAgcGluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5jdXJyZW50UGFnZSA9IFwiZ2FtZVBhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuZ2FtZVN0YXRlID0gXCJwbGFjZVNoaXBzXCI7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVuZW1pZXMgYXBwcm9hY2guIERlcGxveSB0aGUgZmxlZXQuXCI7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLkFJLmRpZmZpY3VsdHkgPSBwaW4uaWQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHN0YXRlTWVzc2FnZSAhPT0gcGluLmlkKSB7XG4gICAgICAgICAgICAgICAgcGluLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0ZU1lc3NhZ2U6IHBpbi5pZCB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbWFwID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIm1hcFwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IHJlZFBpbnMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzdGF0ZU1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdGUgPSB0aGlzLmJ1aWxkTm90ZShzdGF0ZU1lc3NhZ2UsIHBsYXllcik7XG4gICAgICAgICAgICBtYXAuYXBwZW5kQ2hpbGQobm90ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIGJ1aWxkTm90ZShzdGF0ZU1lc3NhZ2UsIHBsYXllcikge1xuICAgICAgICBjb25zdCBub3RlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG5vdGUxOiB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IFwiU29tYWxpYW4gQ29hc3RcIixcbiAgICAgICAgICAgICAgICBkaWZmaWN1bHR5OiBcIkVhc3lcIixcbiAgICAgICAgICAgICAgICBwYXJhOiBcIkkgcmVncmV0IHRvIGluZm9ybSB5b3UgdGhhdCBhIGdyb3VwIG9mIFNvbWFsaWFuIHBpcmF0ZXMgaGF2ZSBzdWNjZXNzZnVsbHkgY29tbWFuZGVlcmVkIGFuIEluZGlhbiBjYXJyaWVyIGdyb3VwIGluIHRoZSBBcmFiaWFuIFNlYS4gXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90ZTI6IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogXCJCbGFjayBTZWFcIixcbiAgICAgICAgICAgICAgICBkaWZmaWN1bHR5OiBcIk1lZGl1bVwiLFxuICAgICAgICAgICAgICAgIHBhcmE6IFwiSSBhbSB3cml0aW5nIHRvIGluZm9ybSB5b3UgYWJvdXQgYSBncm91cCBvZiBSdXNzaWFuIHBpcmF0ZXMgd2hvIGhhdmUgY29tbWFuZGVlcmVkIGEgUnVzc2lhbiBjYXJyaWVyIGdyb3VwLiBUaGlzIGdyb3VwIGlzIGEgc2lnbmlmaWNhbnQgdGhyZWF0IHRvIHRoZSBzYWZldHkgYW5kIHNlY3VyaXR5IG9mIHRoZSBhcmVhLlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGUzOiB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IFwiU291dGggQ2hpbmEgU2VhXCIsXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eTogXCJIYXJkXCIsXG4gICAgICAgICAgICAgICAgcGFyYTogXCJBIGdyb3VwIG9mIENoaW5lc2UgcGlyYXRlcyBoYXMgbWFuYWdlZCB0byBzZWl6ZSBjb250cm9sIG9mIGEgQ2hpbmVzZSBjYXJyaWVyIGdyb3VwLCBhbmQgaXQgcG9zZXMgYSBzaWduaWZpY2FudCB0aHJlYXQgdG8gcmVnaW9uYWwgc2VjdXJpdHkuXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBsZXQgc2VsZWN0ZWRPcHRpb25zID0ge307XG4gICAgICAgIHN3aXRjaCAoc3RhdGVNZXNzYWdlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZWFzeVwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucyA9IG5vdGVPcHRpb25zLm5vdGUxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1lZGl1bVwiOlxuICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucyA9IG5vdGVPcHRpb25zLm5vdGUyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImhhcmRcIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnMgPSBub3RlT3B0aW9ucy5ub3RlMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3RlID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImFydGljbGVcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJub3RlQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBpZDogc3RhdGVNZXNzYWdlLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBzdGlja3lOb3RlU3JjLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic3RpY2t5Tm90ZVwiLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicGFyYUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGBMb2NhdGlvbjogJHtzZWxlY3RlZE9wdGlvbnMubG9jYXRpb259YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGBEaWZmaWN1bHR5OiAke3NlbGVjdGVkT3B0aW9ucy5kaWZmaWN1bHR5fWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwicFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBgQWRtaXJhbCAke3BsYXllci5uYW1lfSxgLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogYCR7c2VsZWN0ZWRPcHRpb25zLnBhcmF9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5vdGU7XG4gICAgfVxufVxuIiwiY29uc3QgZWxlbSA9IChjb250ZW50LCB2ZXJzaW9uID0gMSkgPT4ge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY29udGVudFtcInByb3BcIl0pO1xuICAgIGxldCB0ZXh0ID0gY29udGVudFtcInRleHRDb250ZW50XCJdO1xuICAgIGlmICh0ZXh0KSB7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICB9XG4gICAgbGV0IGlkID0gY29udGVudFtcImlkXCJdO1xuICAgIGlmIChpZCkge1xuICAgICAgICBlbC5pZCA9IGlkO1xuICAgIH1cbiAgICBsZXQgY2xhc3NOYW1lID0gY29udGVudFtcImNsYXNzTmFtZVwiXTtcbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICB9XG4gICAgbGV0IEhUTUwgPSBjb250ZW50W1wiaW5uZXJIVE1MXCJdO1xuICAgIGlmIChIVE1MKSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IEhUTUw7XG4gICAgfVxuICAgIGxldCBzcmMgPSBjb250ZW50W1wic3JjXCJdO1xuICAgIGlmIChzcmMpIHtcbiAgICAgICAgZWwuc3JjID0gc3JjO1xuICAgIH1cbiAgICBsZXQgZm9ySSA9IGNvbnRlbnRbXCJmb3JcIl07XG4gICAgaWYgKGZvckkpIHtcbiAgICAgICAgZWwuZm9yID0gZm9ySTtcbiAgICB9XG4gICAgbGV0IHR5cGUgPSBjb250ZW50W1widHlwZVwiXTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgICBlbC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgbGV0IG5hbWUgPSBjb250ZW50W1wibmFtZVwiXTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgICBlbC5uYW1lID0gbmFtZTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gY29udGVudFtcInZhbHVlXCJdO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBsZXQgcGxhY2Vob2xkZXIgPSBjb250ZW50W1wicGxhY2Vob2xkZXJcIl07XG4gICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGVsLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGxldCBzcGVsbGNoZWNrID0gY29udGVudFtcInNwZWxsY2hlY2tcIl07XG4gICAgaWYgKHNwZWxsY2hlY2spIHtcbiAgICAgICAgZWwuc3BlbGxjaGVjayA9IHNwZWxsY2hlY2s7XG4gICAgfVxuICAgIGxldCByZXF1aXJlZCA9IGNvbnRlbnRbXCJyZXF1aXJlZFwiXTtcbiAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgZWwucmVxdWlyZWQgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgY2hlY2tlZCA9IGNvbnRlbnRbXCJjaGVja2VkXCJdO1xuICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgaHJlZiA9IGNvbnRlbnRbXCJocmVmXCJdO1xuICAgIGlmIChocmVmKSB7XG4gICAgICAgIGVsLmhyZWYgPSBocmVmO1xuICAgIH1cbiAgICBsZXQgYXV0b3BsYXkgPSBjb250ZW50W1wiYXV0b3BsYXlcIl07XG4gICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIGVsLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IG11dGVkID0gY29udGVudFtcIm11dGVkXCJdO1xuICAgIGlmIChtdXRlZCkge1xuICAgICAgICBlbC5tdXRlZCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBsb29wID0gY29udGVudFtcImxvb3BcIl07XG4gICAgaWYgKGxvb3ApIHtcbiAgICAgICAgZWwubG9vcCA9IHRydWU7XG4gICAgfVxuICAgIGxldCBkcmFnZ2FibGUgPSBjb250ZW50W1wiZHJhZ2dhYmxlXCJdO1xuICAgIGlmIChkcmFnZ2FibGUpIHtcbiAgICAgICAgZWwuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGNoaWxkcmVuID0gY29udGVudFtcImNoaWxkcmVuXCJdO1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKHZlcnNpb24gPT09IDIpIHtcbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChlbGVtKGNoaWxkLCAyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWw7XG59O1xuXG4vLyBmdW5jdGlvbiBlbGVtKGNvbnRlbnQpIHtcbi8vICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY29udGVudFtcInByb3BcIl0pO1xuXG4vLyAgICAgZm9yIChsZXQga2V5IGluIGNvbnRlbnQpIHtcbi8vICAgICAgICAgaWYgKGNvbnRlbnRba2V5XSA9PT0gXCJwcm9wXCIpIHtcbi8vICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJjbGFzc0xpc3RcIikge1xuLy8gICAgICAgICAgICAgZm9yIChsZXQgY2xhc3NOYW1lIG9mIGNvbnRlbnRbY2xhc3NMaXN0XSkge1xuLy8gICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY29udGVudFtjbGFzc0xpc3RdW2NsYXNzTmFtZV0pO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJjaGlsZHJlblwiKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250ZW50W2tleV0pO1xuLy8gICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY29udGVudFtrZXldKSB7XG4vLyAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZWxlbShjb250ZW50W2tleV1bY2hpbGRdKSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBlbFtrZXldID0gY29udGVudFtrZXldO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIGVsO1xuLy8gfVxuXG5leHBvcnQgZGVmYXVsdCBlbGVtO1xuIiwiaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbVwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcEVsZW1cIjtcbmltcG9ydCB7IGlzVmFsaWRQbGFjZW1lbnQsIHBsYWNlU2hpcCB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0dhbWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmRFbGVtIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQsIGRyYWdFbnRlcikge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmRyYWdFbnRlciA9IGRyYWdFbnRlcjtcbiAgICAgICAgdGhpcy5ib2FyZFNpemUgPSBudWxsO1xuICAgIH1cblxuICAgIHJlbmRlcihtb2RlbCkge1xuICAgICAgICBpZiAobW9kZWwuZ2FtZVN0YXRlID09PSBcInBsYWNlU2hpcHNcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRCb2FyZChtb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZEJvYXJkKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHNoYWRvd0dyaWQgPSBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcInNoYWRvd0dyaWRcIiB9KTtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiYm9hcmRcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbc2hhZG93R3JpZF0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJvYXJkU2l6ZSA9IG1vZGVsLnBsYXllci5nYW1lYm9hcmQuc2l6ZTtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5ib2FyZFNpemU7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmJvYXJkU2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJjZWxsXCIgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZVJlZiA9IG1vZGVsLnBsYXllci5nYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xuICAgICAgICAgICAgICAgIC8vIHNldHMgZGF0YSB2YWx1ZXMgZm9yIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvdztcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sID0gY29sO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkcyB0aGUgZHJhZ2VudGVyIGFuZCBkcm9wIGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYm91bmQoZSwgcm93LCBjb2wsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcm9wLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kKGUsIHJvdywgY29sLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmhhbmRsZURyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kKGUsIHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGlsZVJlZi5zaGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgc2hpcCBlZmZlY3RcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGlsZVJlZi50aWxlU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJIXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IGhpdCBtYXJrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGxheSBtaXNzIG1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZHMgdGhlIGNlbGwgdG8gdGhlIGJvYXJkIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC8vIGFkZHMgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBjZWxsIHRvIHRoZSBjZWxscyBhcnJheVxuICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNlbGxzID0gY2VsbHM7XG5cbiAgICAgICAgbW9kZWwucGxheWVyLmdhbWVib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwRWxlbSA9IG5ldyBTaGlwKHNoaXAsIChjbGlja2VkSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmNsaWNrZWRFdmVudChpbmRleCwgY2xpY2tlZEluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgYmFzZVRpbGUgPSBzaGlwLnRpbGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgZW5kVGlsZSA9IHNoaXAudGlsZXNbc2hpcC5zaXplIC0gMV07XG4gICAgICAgICAgICBzaGlwRWxlbS5lbGVtZW50LnN0eWxlLmdyaWRBcmVhID0gYCR7YmFzZVRpbGUucm93ICsgMX0gLyAke1xuICAgICAgICAgICAgICAgIGJhc2VUaWxlLmNvbCArIDFcbiAgICAgICAgICAgIH0gLyAke2VuZFRpbGUucm93ICsgMn0gLyAke2VuZFRpbGUuY29sICsgMn1gO1xuICAgICAgICAgICAgc2hpcEVsZW0uZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRTaGlwXCIpO1xuICAgICAgICAgICAgc2hpcEVsZW0udGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcIm9uQm9hcmRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNoYWRvd0dyaWQuYXBwZW5kQ2hpbGQoc2hpcEVsZW0uZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYm9hcmQ7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ092ZXIoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRHJhZ0xlYXZlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdFbnRlcihlLCByb3csIGNvbCwgbW9kZWwpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBbY2xpY2tlZEluZGV4LCBzaGlwXSA9IHRoaXMuZHJhZ0VudGVyKCk7XG4gICAgICAgIHRoaXMuZHJhZ2dlZFNoaXAgPSBzaGlwO1xuICAgICAgICB0aGlzLmNsaWNrZWRJbmRleCA9IGNsaWNrZWRJbmRleDtcbiAgICAgICAgLy8gZ2V0IGFsbCB0aWxlcyB3aXRoIHByaW9yIGhvdmVyIGVmZmVjdHNcbiAgICAgICAgY29uc3QgdGlsZXMgPSBBcnJheS5mcm9tKFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3ZlclwiLCBcIi52YWxpZFwiLCBcIi5pbnZhbGlkXCIpXG4gICAgICAgICk7XG4gICAgICAgIC8vIGNsZWFyIHRoZWlyIGhvdmVyIGVmZmVjdHNcbiAgICAgICAgdGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICAgICAgdGlsZS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIiwgXCJpbnZhbGlkXCIsIFwidmFsaWRcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHNoaXAuaXNIb3Jpem9udGFsO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBzaGlwLnNpemU7XG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgYmFzZSB0aWxlIGZvciB0aGUgZHJhZ2dlZCBzaGlwXG4gICAgICAgIC8vIGJhc2VkIG9uIHRoZSBzaGlwIGluZGV4IHRoYXQgd2FzIGNsaWNrZWQgYW5kIHRpbGUgY3VycmVudCBob3ZlcmVkXG4gICAgICAgIC8vIChsZWZ0IG1vc3QgZm9yIGhvcml6b250YWwsIHRvcCBtb3N0IGZvciB2ZXJ0aWNhbClcbiAgICAgICAgY29uc3QgYmFzZUNvb3JkcyA9IHRoaXMuZ2V0QmFzZVRpbGUoc2hpcCwgcm93LCBjb2wsIGNsaWNrZWRJbmRleCk7XG4gICAgICAgIGNvbnN0IGJhc2VSb3cgPSBiYXNlQ29vcmRzLnJvdztcbiAgICAgICAgY29uc3QgYmFzZUNvbCA9IGJhc2VDb29yZHMuY29sO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGhvdmVyZWQgdGlsZXMgYXJlIGFsbCBvbiB0aGUgYm9hcmQgYW5kIGRvbnQgb3ZlcmxhcCBhIHNoaXBcbiAgICAgICAgbGV0IGlzVmFsaWQgPSBpc1ZhbGlkUGxhY2VtZW50KFxuICAgICAgICAgICAgc2hpcCxcbiAgICAgICAgICAgIGJhc2VSb3csXG4gICAgICAgICAgICBiYXNlQ29sLFxuICAgICAgICAgICAgbW9kZWwucGxheWVyLmdhbWVib2FyZFxuICAgICAgICApO1xuICAgICAgICBsZXQgcm93T2Zmc2V0ID0gYmFzZVJvdztcbiAgICAgICAgbGV0IGNvbE9mZnNldCA9IGJhc2VDb2w7XG5cbiAgICAgICAgLy8gYXF1aXJlIHRoZSBkaXYgZm9yIGV2ZXJ5IGNlbGxcbiAgICAgICAgLy8gYW5kIHN0eWxlIGFjY29yZGluZyB0byB2YWxpZGl0eVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocm93T2Zmc2V0ID49IHRoaXMuYm9hcmRTaXplIHx8IGNvbE9mZnNldCA+PSB0aGlzLmJvYXJkU2l6ZSkge1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNlbGxzW051bWJlcihgJHtyb3dPZmZzZXR9YCArIGAke2NvbE9mZnNldH1gKV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgY29sT2Zmc2V0Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvd09mZnNldCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgIHJvd09mZnNldCA9IGJhc2VSb3c7XG4gICAgICAgICAgICBjb2xPZmZzZXQgPSBiYXNlQ29sO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGwocm93T2Zmc2V0LCBjb2xPZmZzZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwidmFsaWRcIik7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb3dPZmZzZXQgPSBpc0hvcml6b250YWwgPyByb3dPZmZzZXQgOiByb3dPZmZzZXQgKyAxO1xuICAgICAgICAgICAgICAgIGNvbE9mZnNldCA9IGlzSG9yaXpvbnRhbCA/IGNvbE9mZnNldCArIDEgOiBjb2xPZmZzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3dPZmZzZXQgPSBiYXNlUm93O1xuICAgICAgICAgICAgY29sT2Zmc2V0ID0gYmFzZUNvbDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKHJvd09mZnNldCwgY29sT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm93T2Zmc2V0ID0gaXNIb3Jpem9udGFsID8gcm93T2Zmc2V0IDogcm93T2Zmc2V0ICsgMTtcbiAgICAgICAgICAgICAgICBjb2xPZmZzZXQgPSBpc0hvcml6b250YWwgPyBjb2xPZmZzZXQgKyAxIDogY29sT2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJvcChlLCByb3csIGNvbCwgbW9kZWwpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBiYXNlQ29vcmRzID0gdGhpcy5nZXRCYXNlVGlsZShcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZFNoaXAsXG4gICAgICAgICAgICByb3csXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICB0aGlzLmNsaWNrZWRJbmRleFxuICAgICAgICApO1xuICAgICAgICBsZXQgYmFzZVJvdyA9IGJhc2VDb29yZHMucm93O1xuICAgICAgICBsZXQgYmFzZUNvbCA9IGJhc2VDb29yZHMuY29sO1xuXG4gICAgICAgIGxldCBpc1ZhbGlkID0gaXNWYWxpZFBsYWNlbWVudChcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZFNoaXAsXG4gICAgICAgICAgICBiYXNlUm93LFxuICAgICAgICAgICAgYmFzZUNvbCxcbiAgICAgICAgICAgIG1vZGVsLnBsYXllci5nYW1lYm9hcmRcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuZHJvcFF1ZXVlLnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvbGRNb2RlbCkpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG5ld0dhbWVib2FyZCwgbmV3U2hpcCB9ID0gcGxhY2VTaGlwKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdnZWRTaGlwLFxuICAgICAgICAgICAgICAgICAgICBiYXNlUm93LFxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29sLFxuICAgICAgICAgICAgICAgICAgICBvbGRNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdHYW1lYm9hcmQsIG5ld1NoaXApO1xuICAgICAgICAgICAgICAgIC8vIGlmIChvbGRNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vICAgICBuZXdNb2RlbC5nYW1lU3RhdGUgPSBcImluR2FtZVwiO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkID0gbmV3R2FtZWJvYXJkO1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5zaGlwUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnN0YXRlTWVzc2FnZSA9IGBQbGFjZSB5b3VyICR7bmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5uYW1lfWA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLmdhbWVib2FyZC5zaGlwcy5wdXNoKG5ld1NoaXApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBoYW5kbGUgaW52YWxpZCBwbGFjZW1lbnQgZHJvcFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqICBjYWxjdWxhdGVzIHRoZSBsZWZ0IG1vc3Qgb3IgdG9wIG1vc3QgdGlsZSAqL1xuICAgIGdldEJhc2VUaWxlKHNoaXAsIHJvdywgY29sLCBjbGlja2VkSW5kZXgpIHtcbiAgICAgICAgLy8gZ2V0cyB0aGUgaW5kZXggdGhhdCB0aGUgc2hpcCB3YXMgcGlja2VkIHVwIGJ5XG4gICAgICAgIGNvbnN0IGluZGV4ID0gY2xpY2tlZEluZGV4O1xuICAgICAgICBsZXQgb2Zmc2V0Um93ID0gMDtcbiAgICAgICAgbGV0IG9mZnNldENvbCA9IDA7XG5cbiAgICAgICAgLy8gb2Zmc2V0cyB0aGUgaG92ZXJlZCB0aWxlIGFjY29yZGluZyB0byB0aGUgZ3JhYmJlZCBpbmRleFxuICAgICAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIG9mZnNldENvbCA9IGluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Zmc2V0Um93ID0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBiYXNlUm93ID0gcm93IC0gb2Zmc2V0Um93O1xuICAgICAgICBjb25zdCBiYXNlQ29sID0gY29sIC0gb2Zmc2V0Q29sO1xuXG4gICAgICAgIHJldHVybiB7IHJvdzogYmFzZVJvdywgY29sOiBiYXNlQ29sIH07XG4gICAgfVxuXG4gICAgLyoqICByZXR1cm5zIHRoZSBET00gZWxlbWVudCBmb3IgYSBnaXZlbiBjb29yZGluYXRlICovXG4gICAgZ2V0Q2VsbChyb3csIGNvbCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICByb3cgPCAwIHx8XG4gICAgICAgICAgICByb3cgPj0gdGhpcy5ib2FyZFNpemUgfHxcbiAgICAgICAgICAgIGNvbCA8IDAgfHxcbiAgICAgICAgICAgIGNvbCA+PSB0aGlzLmJvYXJkU2l6ZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHNbcm93ICogdGhpcy5ib2FyZFNpemUgKyBjb2xdO1xuICAgIH1cbn1cbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZVwiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1lc3NhZ2UgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG9sZE1vZGVsLnN0YXRlTWVzc2FnZSAhPT0gbmV3TW9kZWwuc3RhdGVNZXNzYWdlO1xuICAgIH1cblxuICAgIHJlbmRlcih7IHN0YXRlTWVzc2FnZSB9KSB7XG4gICAgICAgIHJldHVybiBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwicFwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInN0YWdlUGFyYVwiLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IHN0YXRlTWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW1cIjtcbmltcG9ydCBjYXJyaWVyU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL0NhcnJpZXIuc3ZnXCI7XG5pbXBvcnQgYmF0dGxlc2hpcFNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9CYXR0bGVzaGlwLnN2Z1wiO1xuaW1wb3J0IGRlc3Ryb3llclNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9EZXN0cm95ZXIuc3ZnXCI7XG5pbXBvcnQgc3VibWFyaW5lU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1N1Ym1hcmluZS5zdmdcIjtcbmltcG9ydCBwYXRyb2xCb2F0U3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1BhdHJvbC1Cb2F0LnN2Z1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihzaGlwLCBjbGlja2VkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zaGlwTW9kZWwgPSBzaGlwO1xuXG4gICAgICAgIHRoaXMudGlsZXMgPSBbXTtcblxuICAgICAgICB0aGlzLmNsaWNrZWRJbmRleCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5jcmVhdGUoKTtcblxuICAgICAgICB0aGlzLmNsaWNrZWRFdmVudCA9IGNsaWNrZWRFdmVudDtcbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIC8vc2hpcHMgY29udGFpbmVyXG4gICAgICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzaGlwLmlkID0gdGhpcy5zaGlwTW9kZWwubmFtZTtcbiAgICAgICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgc2hpcC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICBsZXQgc2hpcFNyYyA9IG51bGw7XG5cbiAgICAgICAgbGV0IHNoaXBDbGFzcyA9IHRoaXMuc2hpcE1vZGVsLmlzSG9yaXpvbnRhbCA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoc2hpcENsYXNzKTtcblxuICAgICAgICAvLyBtYXRjaGVzIG5hbWUgb2Ygc2hpcCB0byB0aGUgaW1hZ2Ugc291cmNlIGZpbGVcbiAgICAgICAgc3dpdGNoICh0aGlzLnNoaXBNb2RlbC5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiQ2FycmllclwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBjYXJyaWVyU3JjO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkJhdHRsZXNoaXBcIjpcbiAgICAgICAgICAgICAgICBzaGlwU3JjID0gYmF0dGxlc2hpcFNyYztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJEZXN0cm95ZXJcIjpcbiAgICAgICAgICAgICAgICBzaGlwU3JjID0gZGVzdHJveWVyU3JjO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlN1Ym1hcmluZVwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBzdWJtYXJpbmVTcmM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUGF0cm9sLUJvYXRcIjpcbiAgICAgICAgICAgICAgICBzaGlwU3JjID0gcGF0cm9sQm9hdFNyYztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZXMgdGhlIGlubmVyIGRpdnMgZm9yIGVhY2ggc2hpcFxuICAgICAgICAvLyBiYXNlZCBvbiB0aGUgc2l6ZVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcE1vZGVsLnNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB0aWxlLmNsYXNzTGlzdC5hZGQoXCJ0aWxlXCIpO1xuICAgICAgICAgICAgdGlsZS5kYXRhc2V0LmJvYXQgPSB0aGlzLnNoaXBNb2RlbC5uYW1lO1xuICAgICAgICAgICAgdGlsZS5kYXRhc2V0LnRpbGUgPSBpO1xuICAgICAgICAgICAgdGlsZS5kcmFnZ2FibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy9hZGQgaGVhZCBjbGFzcyB0byBmcm9udCBmb3Igc3R5bGluZ1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHRpbGUuY2xhc3NMaXN0LmFkZChcImhlYWRcIik7XG4gICAgICAgICAgICAvL2FkZCB0YWlsIGNsYXNzIHRvIHRhaWwgZm9yIHN0eWxpbmdcbiAgICAgICAgICAgIGlmIChpID09IHRoaXMuc2hpcE1vZGVsLnNpemUgLSAxKSB0aWxlLmNsYXNzTGlzdC5hZGQoXCJ0YWlsXCIpO1xuXG4gICAgICAgICAgICAvLyBhZGRzIGNsaWNrIGxpc3RlbmVyIHRvIHNldCBjbGlja2VkIGluZGV4XG4gICAgICAgICAgICB0aWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRFdmVudChpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGlsZXMgdG8gdGhlIHNoaXBcbiAgICAgICAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgICAgIHNoaXAuYXBwZW5kQ2hpbGQodGlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzcGljZSB1cCB0aGUgc2hpcCBkaXNwbGF5XG4gICAgICAgIGNvbnN0IHNoaXBPdmVybGF5ID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImltZ1wiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBgc2hpcE92ZXJsYXlgLFxuICAgICAgICAgICAgaWQ6IGAke3RoaXMuc2hpcE1vZGVsLm5hbWV9T3ZlcmxheWAsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBzaGlwT3ZlcmxheTtcbiAgICAgICAgc2hpcE92ZXJsYXkuc3JjID0gc2hpcFNyYztcbiAgICAgICAgbGV0IG92ZXJsYXlDbGFzcyA9IHRoaXMuc2hpcE1vZGVsLmlzSG9yaXpvbnRhbFxuICAgICAgICAgICAgPyBcImhvcml6b250YWxcIlxuICAgICAgICAgICAgOiBcInZlcnRpY2FsXCI7XG4gICAgICAgIHNoaXBPdmVybGF5LmNsYXNzTGlzdC5hZGQob3ZlcmxheUNsYXNzKTtcbiAgICAgICAgc2hpcE92ZXJsYXkuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIHNoaXAuYXBwZW5kQ2hpbGQoc2hpcE92ZXJsYXkpO1xuXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYm91bmQgPSB0aGlzLmhhbmRsZURyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgYm91bmQoZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2hpcDtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnU3RhcnQoZSkge1xuICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHRpbGUuc3R5bGUud2lkdGggPSBcIjQwcHhcIjtcbiAgICAgICAgICAgIHRpbGUuc3R5bGUuaGVpZ2h0ID0gXCI0MHB4XCI7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aWxlLnN0eWxlLndpZHRoID0gXCIzMHB4XCI7XG4gICAgICAgICAgICAgICAgdGlsZS5zdHlsZS5oZWlnaHQgPSBcIjMwcHhcIjtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgZWxlbSBmcm9tIFwiLi4vZWxlbS5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcEVsZW0uanNcIjtcbmltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwUXVldWUgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCwgY2xpY2tlZEV2ZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50ID0gY2xpY2tlZEV2ZW50O1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ld01vZGVsLmdhbWVTdGF0ZSA9PT0gXCJwbGFjZVNoaXBzXCI7XG4gICAgfVxuXG4gICAgcmVuZGVyKG1vZGVsKSB7XG4gICAgICAgIGlmIChtb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIHNoaXBzIHBsYWNlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5idWlsZFF1ZXVlKG1vZGVsKTtcbiAgICB9XG5cbiAgICBidWlsZFF1ZXVlKG1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHN0YWdlID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNoaXBRdWV1ZVwiLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG5leHQgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibmV4dFNoaXBDb250YWluZXJcIixcbiAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcInF1ZXVlQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3N0YWdlLCBuZXh0XSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbW9kZWwucGxheWVyLnNoaXBRdWV1ZS5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcEVsZW0gPSBuZXcgU2hpcChzaGlwLCAoY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkRXZlbnQoaW5kZXgsIGNsaWNrZWRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChtb2RlbC5zdGF0ZU1lc3NhZ2UuaW5jbHVkZXMoXCJFbmVtaWVzXCIpKSB7XG4gICAgICAgICAgICAgICAgc2hpcEVsZW0uZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuc3RhdGVNZXNzYWdlID0gYFBsYWNlIHlvdXIgJHtuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlWzBdLm5hbWV9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG5leHQuYXBwZW5kQ2hpbGQoc2hpcEVsZW0uZWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YWdlLnByZXBlbmQoc2hpcEVsZW0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBxdWV1ZTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICB0aGlzLnZpZXdNb2RlbCA9IHZpZXdNb2RlbDtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5vbkluaXQoKTtcbiAgICB9XG5cbiAgICBvbkluaXQoKSB7XG4gICAgICAgIHRoaXMudmlld01vZGVsLnJlZ2lzdGVyKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKG1vZGVsKSB7XG4gICAgICAgIHRoaXMucHVic3VicyA9IFtdO1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIocHVic3ViKSB7XG4gICAgICAgIHRoaXMucHVic3Vicy5wdXNoKHB1YnN1Yik7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwdWJzdWIuZ2V0RWxlbWVudCgpO1xuICAgICAgICAvLyBUT0RPOiBjaGVjayBpZiBhbnkgb3RoZXIgcHVic3VicyBhcmUgdGllZCB0byB0aGlzIGVsZW1lbnQgXi4gIElmIHRoZXkgYXJlLCByZW1vdmUgdGhlbSBmcm9tIHRoZSBwdWJzdWIgbGlzdFxuICAgICAgICBlbGVtZW50LnJlcGxhY2VDaGlsZHJlbihwdWJzdWIucmVuZGVyKHRoaXMubW9kZWwpKTtcbiAgICB9XG5cbiAgICB1cGRhdGVNb2RlbChtb2RlbFVwZGF0ZUZ1bmMpIHtcbiAgICAgICAgY29uc3Qgb2xkTW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubW9kZWwpKTtcbiAgICAgICAgY29uc3QgbmV3TW9kZWwgPSBtb2RlbFVwZGF0ZUZ1bmMob2xkTW9kZWwpO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbFtrZXldID0gbmV3TW9kZWxba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBwdWJzdWIgb2YgdGhpcy5wdWJzdWJzKSB7XG4gICAgICAgICAgICBpZiAocHVic3ViLnNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHB1YnN1Yi5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4ocHVic3ViLnJlbmRlcih0aGlzLm1vZGVsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBSSBleHRlbmRzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHN1cGVyLm5hbWUgPSBcIkFJXCI7XG4gICAgICAgIHRoaXMuZGlmZmljdWx0eSA9IG51bGw7XG4gICAgfVxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIjtcbmltcG9ydCBBSSBmcm9tIFwiLi9BSVwiO1xuXG4vLyBtb2RlbFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgICAgICB0aGlzLkFJID0gbmV3IEFJKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFR1cm4gPSBcInBsYXllclwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gXCJob21lUGFnZVwiO1xuICAgICAgICB0aGlzLm5hbWVQYWdlSXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLmRyb3BRdWV1ZSA9IFtdO1xuICAgIH1cbn1cblxuLy8gYXNzdW1lcyByb3cgLyBjb2wgYXJlIHRoZSBiYXNlIHRpbGUgb2YgdGhlIHNoaXBcbmZ1bmN0aW9uIGlzVmFsaWRQbGFjZW1lbnQoc2hpcCwgcm93LCBjb2wsIGdhbWVib2FyZCkge1xuICAgIC8vIGNoZWNrcyBpZiBhbGwgaG92ZXJlZCB0aWxlcyBhcmUgb24gdGhlIGJvYXJkXG5cbiAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IHRydWUgJiYgY29sICsgc2hpcC5zaXplID4gZ2FtZWJvYXJkLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IGZhbHNlICYmIHJvdyArIHNoaXAuc2l6ZSA+IGdhbWVib2FyZC5zaXplKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gaXRlcmF0ZXMgb3ZlciBldmVyeSB0aWxlXG4gICAgLy8gYW5kIGNoZWNrcyBpZiB0aGUgZ2FtZWJvYXJkIGNvbnRhaW5zIGEgc2hpcFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpKyspIHtcbiAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddKSB7XG4gICAgICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSkge1xuICAgICAgICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdLnNoaXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcm93Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgZ2FtZWJvYXJkKSB7XG4gICAgbGV0IG5ld0dhbWVib2FyZCA9IHsgLi4uZ2FtZWJvYXJkIH07XG4gICAgbGV0IG5ld1NoaXAgPSB7IC4uLnNoaXAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaXplOyBpKyspIHtcbiAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddKSB7XG4gICAgICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSkge1xuICAgICAgICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdLnNoaXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3R2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2hpcC50aWxlcy5wdXNoKG5ld0dhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sKys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3crKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcInRoaXMgc2hvdWxkbid0IGhhcHBlblwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcInRoaXMgc2hvdWxkbid0IGhhcHBlblwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBuZXdHYW1lYm9hcmQsIG5ld1NoaXAgfTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwUmFuZG9tbHkoc2hpcCwgZ2FtZWJvYXJkKSB7XG4gICAgc2hpcC5pc0hvcml6b250YWwgPSBNYXRoLnJhbmRvbSgpID4gMC41O1xuXG4gICAgY29uc3QgcmFuZFJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCByYW5kQ29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgY29uc3QgaXNWYWxpZCA9IGlzVmFsaWRQbGFjZW1lbnQoc2hpcCwgcmFuZFJvdywgcmFuZENvbCwgZ2FtZWJvYXJkKTtcblxuICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgIHJldHVybiBwbGFjZVNoaXAoc2hpcCwgcmFuZFJvdywgcmFuZENvbCwgZ2FtZWJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGxhY2VTaGlwUmFuZG9tbHkoc2hpcCwgZ2FtZWJvYXJkKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IGlzVmFsaWRQbGFjZW1lbnQsIHBsYWNlU2hpcCwgcGxhY2VTaGlwUmFuZG9tbHkgfTtcbiIsImltcG9ydCBUaWxlIGZyb20gXCIuL1RpbGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICAgICAgLy8gdGhpcy5vcmllbnRhdGlvbiA9IHRydWU7IC8vdHJ1ZSB2ZXJ0aWNhbCwgZmFsc2UgaG9yaXpvbnRhbFxuICAgICAgICB0aGlzLnNoaXBzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5zaXplOyByb3crKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtyb3ddID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLnNpemU7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSBuZXcgVGlsZShyb3csIGNvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL0dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xuICAgICAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoMTApO1xuICAgICAgICB0aGlzLnNoaXBRdWV1ZSA9IFtcbiAgICAgICAgICAgIG5ldyBTaGlwKDUsIFwiQ2FycmllclwiKSxcbiAgICAgICAgICAgIG5ldyBTaGlwKDQsIFwiQmF0dGxlc2hpcFwiKSxcbiAgICAgICAgICAgIG5ldyBTaGlwKDMsIFwiRGVzdHJveWVyXCIpLFxuICAgICAgICAgICAgbmV3IFNoaXAoMywgXCJTdWJtYXJpbmVcIiksXG4gICAgICAgICAgICBuZXcgU2hpcCgyLCBcIlBhdHJvbC1Cb2F0XCIpLFxuICAgICAgICBdO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHNpemUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5oaXRzID0gMDtcbiAgICAgICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNIb3Jpem9udGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGlsZXMgPSBbXTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3Rvcihyb3csIGNvbCkge1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5jb2wgPSBjb2w7XG4gICAgICAgIHRoaXMuc2hpcCA9IG51bGw7XG4gICAgICAgIHRoaXMudGlsZVN0YXR1cyA9IG51bGw7XG4gICAgICAgIC8vIG51bGwgSCBNXG4gICAgfVxufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9CbGFja09wc09uZS50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvZm9udHMvUHJlc3NTdGFydC50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1hZ2VzL2hvbWVzY3JlZW4uanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbn1cXG5AZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG59XFxuXFxuKiB7XFxuICAgIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbn1cXG5cXG4jY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLmhvbWVwYWdlQ29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgY29sb3I6IGdyZXk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5ob21lSGVhZGVyIHtcXG4gICAgbWFyZ2luOiA0cmVtIDA7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogN3JlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggI2E4YThhOCwgMXB4IDJweCAxcHggI2E4YThhOCwgMXB4IDNweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA0cHggMXB4ICNhOGE4YTgsIDFweCA1cHggMXB4ICNhOGE4YTgsIDFweCA2cHggMXB4ICNhOGE4YTgsXFxuICAgICAgICAxcHggN3B4IDFweCAjYThhOGE4LCAxcHggOHB4IDFweCAjYThhOGE4O1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxufVxcblxcbi5uZXdHYW1lIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgZ3JleTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgbWFyZ2luOiAwIGF1dG8gYXV0byBhdXRvO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC40cmVtO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAycyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQgMC43NXMgc3RlcC1lbmQgaW5maW5pdGU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xODUpO1xcbn1cXG5cXG4ubmV3R2FtZTpob3ZlciB7XFxuICAgIGNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuQGtleWZyYW1lcyB0eXBpbmcge1xcbiAgICBmcm9tIHtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgYmxpbmstY2FyZXQge1xcbiAgICBmcm9tLFxcbiAgICB0byB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3JkZXItY29sb3I6IGdyZXk7XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlQ29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDQwJTtcXG4gICAgbGVmdDogNjUlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuc21va2Uge1xcbiAgICAgICAgbGVmdDogNzUlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkge1xcbiAgICAuc21va2VDb250YWluZXIge1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxuXFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogM3JlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICB3aWR0aDogODBweDtcXG4gICAgaGVpZ2h0OiA4MHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMjYyNjI2O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZChldmVuKSB7XFxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZUV2ZW4gMy41cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQob2RkKSB7XFxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZU9kZCAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZCg5KSB7XFxuICAgIGFuaW1hdGlvbjogbm9uZTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGFuaW1hdGVFdmVuIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgsIC01MDBweCkgc2NhbGUoMyk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZU9kZCB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApIHNjYWxlKDEpO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxMHB4KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZCgxKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoMikge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoMykge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDAuOHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNCkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuMnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuNnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNikge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDJzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDcpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyLjRzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDgpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyLjhzO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL2hvbWVwYWdlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHNCQUFzQjtJQUN0Qiw0Q0FBMkM7QUFDL0M7QUFDQTtJQUNJLHVCQUF1QjtJQUN2Qiw0Q0FBMEM7QUFDOUM7O0FBRUE7SUFDSSwyQkFBMkI7SUFDM0IsVUFBVTtJQUNWLFNBQVM7SUFDVCxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7SUFDWiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLDZCQUE2QjtJQUM3Qix5REFBd0Q7SUFDeEQsc0JBQXNCO0lBQ3RCLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQjs7Z0RBRTRDO0FBQ2hEOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHNCQUFzQjtJQUN0Qix3RUFBd0U7SUFDeEUsZUFBZTtJQUNmLDBDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSTtRQUNJLFFBQVE7SUFDWjtJQUNBO1FBQ0ksV0FBVztJQUNmO0FBQ0o7O0FBRUE7SUFDSTs7UUFFSSx5QkFBeUI7SUFDN0I7SUFDQTtRQUNJLGtCQUFrQjtJQUN0QjtBQUNKOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7SUFDWCxTQUFTO0lBQ1QsMkJBQTJCO0lBQzNCLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSTtRQUNJLFNBQVM7SUFDYjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxTQUFTO0lBQ2I7O0lBRUE7UUFDSSxlQUFlO1FBQ2YsbUJBQW1CO0lBQ3ZCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLGlCQUFpQjtJQUNyQjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxlQUFlO1FBQ2YsbUJBQW1CO0lBQ3ZCO0lBQ0E7UUFDSSxpQkFBaUI7SUFDckI7QUFDSjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQztBQUNBO0lBQ0ksMENBQTBDO0FBQzlDOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJO1FBQ0ksbUNBQW1DO1FBQ25DLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7SUFDQTtRQUNJLDRDQUE0QztRQUM1QyxVQUFVO1FBQ1Ysa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLG1DQUFtQztRQUNuQyxVQUFVO1FBQ1Ysa0JBQWtCO0lBQ3RCO0lBQ0E7UUFDSSw2Q0FBNkM7UUFDN0MsVUFBVTtRQUNWLGtCQUFrQjtJQUN0QjtBQUNKOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIHNyYzogdXJsKFxcXCIuLi9hc3NldHMvZm9udHMvQmxhY2tPcHNPbmUudHRmXFxcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9QcmVzc1N0YXJ0LnR0ZlxcXCIpO1xcbn1cXG5cXG4qIHtcXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uaG9tZXBhZ2VDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogZ3JleTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiLi4vYXNzZXRzL2ltYWdlcy9ob21lc2NyZWVuLmpwZ1xcXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5ob21lSGVhZGVyIHtcXG4gICAgbWFyZ2luOiA0cmVtIDA7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogN3JlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggI2E4YThhOCwgMXB4IDJweCAxcHggI2E4YThhOCwgMXB4IDNweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA0cHggMXB4ICNhOGE4YTgsIDFweCA1cHggMXB4ICNhOGE4YTgsIDFweCA2cHggMXB4ICNhOGE4YTgsXFxuICAgICAgICAxcHggN3B4IDFweCAjYThhOGE4LCAxcHggOHB4IDFweCAjYThhOGE4O1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XFxufVxcblxcbi5uZXdHYW1lIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgZ3JleTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgbWFyZ2luOiAwIGF1dG8gYXV0byBhdXRvO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC40cmVtO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAycyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQgMC43NXMgc3RlcC1lbmQgaW5maW5pdGU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdGV4dC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xODUpO1xcbn1cXG5cXG4ubmV3R2FtZTpob3ZlciB7XFxuICAgIGNvbG9yOiBkYXJrZ3JheTtcXG59XFxuXFxuQGtleWZyYW1lcyB0eXBpbmcge1xcbiAgICBmcm9tIHtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICB9XFxuICAgIHRvIHtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgYmxpbmstY2FyZXQge1xcbiAgICBmcm9tLFxcbiAgICB0byB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3JkZXItY29sb3I6IGdyZXk7XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlQ29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBib3R0b206IDQwJTtcXG4gICAgbGVmdDogNjUlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuc21va2Uge1xcbiAgICAgICAgbGVmdDogNzUlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkge1xcbiAgICAuc21va2VDb250YWluZXIge1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxuXFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNXJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogNHJlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5ob21lSGVhZGVyIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogM3JlbTtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVyZW07XFxuICAgIH1cXG4gICAgLm5ld0dhbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICB3aWR0aDogODBweDtcXG4gICAgaGVpZ2h0OiA4MHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMjYyNjI2O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZChldmVuKSB7XFxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZUV2ZW4gMy41cyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQob2RkKSB7XFxuICAgIGFuaW1hdGlvbjogYW5pbWF0ZU9kZCAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZCg5KSB7XFxuICAgIGFuaW1hdGlvbjogbm9uZTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGFuaW1hdGVFdmVuIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgsIC01MDBweCkgc2NhbGUoMyk7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZU9kZCB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApIHNjYWxlKDEpO1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxMHB4KTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuLnNtb2tlOm50aC1jaGlsZCgxKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoMikge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoMykge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDAuOHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNCkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuMnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNSkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuNnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNikge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDJzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDcpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyLjRzO1xcbn1cXG4uc21va2U6bnRoLWNoaWxkKDgpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAyLjhzO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9LYWxhbS1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvbWFwLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcblxcbi5tYXAge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICBhbmltYXRpb246IHVuYmx1ciAwLjVzIGxpbmVhcjtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxufVxcblxcbkBrZXlmcmFtZXMgdW5ibHVyIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDApO1xcbiAgICB9XFxufVxcbi5yZWRQaW4xIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQxJTtcXG4gICAgbGVmdDogNjMlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuLnJlZFBpbjIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTklO1xcbiAgICBsZWZ0OiA1NyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgxJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcblxcbi5yZWRQaW4xOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuLnJlZFBpbjI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMzpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5ub3RlQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDI1MHB4O1xcbiAgICBoZWlnaHQ6IDI1MHB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNjAlO1xcbiAgICBsZWZ0OiAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBmbHkgMC4xcyBsaW5lYXI7XFxufVxcbi5wYXJhQ29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDEwcHg7XFxuICAgIGZvbnQtZmFtaWx5OiBLYWxhbTtcXG4gICAgdHJhbnNmb3JtOiBza2V3KC0yZGVnLCAtMmRlZyk7XFxufVxcblxcbi5zdGlja3lOb3RlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC04MHB4O1xcbiAgICBsZWZ0OiAtNzBweDtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZseSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMDAlKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTcwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDElO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjElO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMiU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIzJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTQwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjIlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgxJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjQlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY1JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTclO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODclO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU4JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDkwJTtcXG4gICAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL21hcHBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLDRDQUE2QztBQUNqRDs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLHlEQUFpRDtJQUNqRCxzQkFBc0I7SUFDdEIsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUM3Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSTtJQUNBO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0FBQ0o7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGVBQWU7SUFDZixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxlQUFlO0lBQ2YsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7QUFDQTtJQUNJLFVBQVU7QUFDZDtBQUNBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0lBQ2YsUUFBUTtJQUNSLFNBQVM7SUFDVCx3QkFBd0I7SUFDeEIsMEJBQTBCO0FBQzlCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULGtCQUFrQjtJQUNsQiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFdBQVc7SUFDWCxZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJO1FBQ0ksMkJBQTJCO0lBQy9CO0lBQ0E7SUFDQTtBQUNKOztBQUVBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFVBQVU7UUFDVixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksVUFBVTtRQUNWLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFVBQVU7UUFDVixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcbiAgICBzcmM6IHVybChcXFwiLi4vYXNzZXRzL2ZvbnRzL0thbGFtLVJlZ3VsYXIudHRmXFxcIik7XFxufVxcblxcbi5tYXAge1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9hc3NldHMvaW1hZ2VzL21hcC5qcGdcXFwiKTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICBhbmltYXRpb246IHVuYmx1ciAwLjVzIGxpbmVhcjtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxufVxcblxcbkBrZXlmcmFtZXMgdW5ibHVyIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDApO1xcbiAgICB9XFxufVxcbi5yZWRQaW4xIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQxJTtcXG4gICAgbGVmdDogNjMlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuLnJlZFBpbjIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTklO1xcbiAgICBsZWZ0OiA1NyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgxJTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcblxcbi5yZWRQaW4xOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuLnJlZFBpbjI6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMzpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5ub3RlQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDI1MHB4O1xcbiAgICBoZWlnaHQ6IDI1MHB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHRvcDogNjAlO1xcbiAgICBsZWZ0OiAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBmbHkgMC4xcyBsaW5lYXI7XFxufVxcbi5wYXJhQ29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDEwcHg7XFxuICAgIGZvbnQtZmFtaWx5OiBLYWxhbTtcXG4gICAgdHJhbnNmb3JtOiBza2V3KC0yZGVnLCAtMmRlZyk7XFxufVxcblxcbi5zdGlja3lOb3RlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC04MHB4O1xcbiAgICBsZWZ0OiAtNzBweDtcXG4gICAgd2lkdGg6IDQwMHB4O1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZseSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMDAlKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTcwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDElO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjElO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMiU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIzJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTQwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjIlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgxJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjQlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY1JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTclO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODclO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU4JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDkwJTtcXG4gICAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIubmV3R2FtZUNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMnJlbTtcXG59XFxuXFxuLm5ld0dhbWVDb250YWluZXIgcCB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgZ3JleTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgbWFyZ2luOiAwIGF1dG8gYXV0byBhdXRvO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4ycmVtO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAycyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQgMC43NXMgc3RlcC1lbmQgaW5maW5pdGU7XFxufVxcblxcbi5uYW1lRm9ybSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGdhcDogMTBweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIHBhZGRpbmc6IDFyZW0gMXJlbTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGNhcmV0LWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogM3B4IDNweCA1cHggI2E4YThhODtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXG4gICAgb3BhY2l0eTogMC44O1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQ6Zm9jdXMge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4ubmFtZUZvcm0gYnV0dG9uIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGNvbG9yOiByZ2IoNzEsIDcxLCA3MSk7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLm5hbWVGb3JtIGJ1dHRvbjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5oaWRlIHtcXG4gICAgYW5pbWF0aW9uOiBidXJuIDFzIGxpbmVhcjtcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxufVxcblxcbkBrZXlmcmFtZXMgYnVybiB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgIC5uYW1lRm9ybSBpbnB1dCB7XFxuICAgICAgICB3aWR0aDogODAlO1xcbiAgICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvbmFtZXBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQiw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixzQkFBc0I7SUFDdEIsd0VBQXdFO0FBQzVFOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1QsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osYUFBYTtJQUNiLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsK0JBQStCO0lBQy9CLG1CQUFtQjtJQUNuQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2YsZUFBZTtJQUNmLFlBQVk7SUFDWiw2QkFBNkI7SUFDN0Isc0JBQXNCO0lBQ3RCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0k7SUFDQTtJQUNBO1FBQ0ksVUFBVTtJQUNkO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFVBQVU7SUFDZDtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAycmVtO1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciBwIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgcGFkZGluZzogMXJlbSAxcmVtO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgY2FyZXQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggM3B4IDVweCAjYThhOGE4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogM3B4O1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dDpmb2N1cyB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dDo6cGxhY2Vob2xkZXIge1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b24ge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgY29sb3I6IHJnYig3MSwgNzEsIDcxKTtcXG4gICAgb3BhY2l0eTogMC44O1xcbn1cXG5cXG4ubmFtZUZvcm0gYnV0dG9uOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmhpZGUge1xcbiAgICBhbmltYXRpb246IGJ1cm4gMXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyBidXJuIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLm5hbWVGb3JtIGlucHV0IHtcXG4gICAgICAgIHdpZHRoOiA4MCU7XFxuICAgIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmdhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5xdWV1ZUNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wMU9wdGlvbnNDb250YWluZXIge1xcbiAgICBmbGV4OiAxLjM7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxNDQsIDE0NCwgMTQ0KTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxNDQsIDE0NCwgMTQ0LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTQwLCAxNDAsIDE0MCwgMSkgMTElLFxcbiAgICAgICAgcmdiYSgxMzYsIDEzNiwgMTM2LCAxKSAyMSUsXFxuICAgICAgICByZ2JhKDE0NCwgMTQ0LCAxNDQsIDEpIDY5JSxcXG4gICAgICAgIHJnYmEoMTM4LCAxMzgsIDEzOCwgMSkgODclLFxcbiAgICAgICAgcmdiYSgxNjgsIDE2OCwgMTY4LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xcbn1cXG4ucDFHcmlkQ29udGFpbmVyIHtcXG4gICAgZmxleDogMztcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5yYWRhckNvbnRhaW5lciB7XFxuICAgIGZsZXg6IDI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5yYWRhciB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgd2lkdGg6IDI2M3B4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYm9yZGVyOiAxMHB4IHNvbGlkICM2ZDZkNmQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggMTBweCAwICNjNWM1YzUsIGluc2V0IDAgMCA1MHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpLFxcbiAgICAgICAgLTVweCAtNXB4IDIwcHggYmxhY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoMSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDMpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoNCkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHJnYig0OSwgMTU4LCA0OSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgzKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCg0KSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg2KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMjU1LCAwLCAxKTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg1KSB7XFxuICAgIHdpZHRoOiA3NXB4O1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNikge1xcbiAgICB3aWR0aDogMTc1cHg7XFxuICAgIGhlaWdodDogMTc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNykge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwZmYwMCAwJSwgdHJhbnNwYXJlbnQgNTAlKTtcXG4gICAgYW5pbWF0aW9uOiByYWRhciAycyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBsZWZ0O1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDgpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogNzUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCg5KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIGxlZnQ6IDc1JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMTApIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogODUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxMSkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDEyKSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbkBrZXlmcmFtZXMgcmFkYXIge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBnbG93IHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG59XFxuXFxuLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5iYXNlIHtcXG4gICAgYmFja2dyb3VuZDogI2NhY2FjYTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI3dm1pbjtcXG4gICAgYm94LXNoYWRvdzogMCA2dm1pbiAwLjE1dm1pbiAwdm1pbiAjNzc3LCAwIDR2bWluIDAuMTV2bWluIDB2bWluICM3NzcsXFxuICAgICAgICAwIDJ2bWluIDAuMTV2bWluIDB2bWluICM3NzcsIC0yMHB4IDIwcHggNTBweCBibGFjaztcXG4gICAgcGFkZGluZzogMHZtaW4gMnZtaW4gMnZtaW4gMnZtaW47XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKSByb3RhdGVaKDBkZWcpO1xcbiAgICBtYXJnaW4tdG9wOiAtNC41dm1pbjtcXG4gICAgaGVpZ2h0OiA5MCU7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZSB7XFxuICAgIGJhY2tncm91bmQ6ICNkNjA1MDU7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgd2lkdGg6IDIwdm1pbjtcXG4gICAgaGVpZ2h0OiAxOXZtaW47XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwIDR2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAtMi41dm1pbjtcXG4gICAgYm9yZGVyOiAwLjV2bWluIHNvbGlkICNhZjAwMDBhMTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UgMHM7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZTpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgM3ZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IC0xLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlIDBzO1xcbn1cXG5idXR0b24jYWN0aXZhdGU6YWN0aXZlLFxcbmJ1dHRvbiNhY3RpdmF0ZS5wdXNoZWQge1xcbiAgICBib3gtc2hhZG93OiAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAwLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZSAwcztcXG59XFxuYnV0dG9uI2FjdGl2YXRlLnB1c2hlZCB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAyMHB4IDEwcHggI2ZmM2MzYywgMCAwIDEwMHB4IDUwcHggI2ZmMjgyODtcXG4gICAgYmFja2dyb3VuZDogI2ZmMDAwMDtcXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMwMDAwMDAyMDtcXG59XFxuXFxuLmJhc2Uge1xcbiAgICBzY2FsZTogMC4zO1xcbn1cXG4ucmlnaHRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG4ubWlkZGxlQnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuLmxlZnRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4uYnV0dG9uVGV4dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2ZDZkNmQ7XFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggYmxhY2s7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xcbiAgICB0ZXh0LXNoYWRvdzogLTFweCAtMXB4IDFweCBibGFjaztcXG59XFxuLmJ1dHRvblRleHQ6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICBsZWZ0OiA1cHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggYmxhY2s7XFxufVxcbi5idXR0b25UZXh0OjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IGJsYWNrO1xcbn1cXG5cXG4ubWlkZGxlQnV0dG9uIC5idXR0b25UZXh0IHtcXG4gICAgcGFkZGluZzogMXJlbSAxLjFyZW07XFxufVxcblxcbi5wMVNoaXBTdGFnZSB7XFxuICAgIGZsZXg6IDU7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnNoaXBDb250YWluZXIge1xcbiAgICBmbGV4OiAxO1xcblxcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDUwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5zaGlwUXVldWUge1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBmbGV4OiAzO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDE4JTtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmlsdGVyOiBibHVyKDVweCk7XFxufVxcbi5uZXh0U2hpcENvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpLFxcbiAgICAgICAgaW5zZXQgMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxufVxcblxcbi5uZXh0U2hpcENvbnRhaW5lcjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjgpLFxcbiAgICAgICAgaW5zZXQgMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuOCk7XFxufVxcblxcbi5uZXh0U2hpcDpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG59XFxuXFxuLm5leHRTaGlwIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uQ2FycmllckNvbnRhaW5lcixcXG4uQmF0dGxlc2hpcENvbnRhaW5lcixcXG4uRGVzdHJveWVyQ29udGFpbmVyLFxcbi5TdWJtYXJpbmVDb250YWluZXIsXFxuLlBhdHJvbC1Cb2F0Q29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLkNhcnJpZXJDb250YWluZXI6aG92ZXIsXFxuLkJhdHRsZXNoaXBDb250YWluZXI6aG92ZXIsXFxuLkRlc3Ryb3llckNvbnRhaW5lcjpob3ZlcixcXG4uU3VibWFyaW5lQ29udGFpbmVyOmhvdmVyLFxcbi5QYXRyb2wtQm9hdENvbnRhaW5lcjpob3ZlciB7XFxufVxcblxcbiNDYXJyaWVyLFxcbiNCYXR0bGVzaGlwLFxcbiNEZXN0cm95ZXIsXFxuI1N1Ym1hcmluZSxcXG4jUGF0cm9sLUJvYXQge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5zaGlwT3ZlcmxheSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAtMjAlO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCk7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuLnNoaXBPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDUpO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRvcDogNDIlO1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICAvKiBhbmltYXRpb246IHJvdGF0ZSAwLjRzIGVhc2UtaW4tb3V0OyAqL1xcbn1cXG5cXG4vKiAuc2hpcE92ZXJsYXkuaG9yaXpvbnRhbCB7XFxuICAgIGFuaW1hdGlvbjogcm90YXRlMSAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoNS41KSByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDUpIHJvdGF0ZSg5MGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGUxIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjYpIHJvdGF0ZSg5MGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCkgcm90YXRlKDBkZWcpO1xcbiAgICB9XFxufSAqL1xcblxcbiNQYXRyb2wtQm9hdE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoMyk7XFxufVxcblxcbi5zaGlwVGlsZSB7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5zaGlwIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLnNoaXAuaG9yaXpvbnRhbCB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5nYW1lIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5ib2FyZCB7XFxuICAgIG1hcmdpbi10b3A6IGF1dG87XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCByZ2IoMTU1LCAxNTUsIDE1NSk7XFxuICAgIGJvcmRlci1yaWdodDogMzBweCBzb2xpZCByZ2IoMTgyLCAxODIsIDE4Mik7XFxuICAgIGJvcmRlci10b3A6IDMwcHggc29saWQgcmdiKDcxLCA3MSwgNzEpO1xcbiAgICBib3JkZXItbGVmdDogMzBweCBzb2xpZCByZ2IoOTQsIDk0LCA5NCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDE0MHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1JTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDUlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA1MHB4KTtcXG59XFxuXFxuLnNoYWRvd0dyaWQge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLFxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcsXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLFxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZyxcXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwIGltZyB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcDpob3ZlcixcXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXA6aG92ZXIsXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXA6aG92ZXIsXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXA6aG92ZXIsXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcDpob3ZlciB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjYpO1xcbn1cXG5cXG4udGlsZSB7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgd2lkdGg6IDMwcHg7XFxufVxcblxcbi5jZWxsIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwOWMwMDtcXG59XFxuLnRpbGUueDAge1xcbiAgICBib3JkZXItbGVmdDogbm9uZTtcXG59XFxuLnRpbGUueDkge1xcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XFxufVxcbi50aWxlLnk5IHtcXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcXG59XFxuLnRpbGUueTAge1xcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbiNTdWJtYXJpbmUgaW1nLmhvcml6b250YWwge1xcbiAgICBsZWZ0OiAtNSU7XFxufVxcblxcbi5zaGlwT3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg1KTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0b3A6IDQyJTtcXG59XFxuXFxuLmJvYXJkU2hpcCB7XFxuICAgIHotaW5kZXg6IDk7XFxufVxcblxcbi5ib2FyZFNoaXAgaW1nIHtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg4LCA2KTtcXG4gICAgbGVmdDogMzMlO1xcbiAgICB0b3A6IDQ4JTtcXG59XFxuXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg2LjUsIDUpO1xcbiAgICBsZWZ0OiAxOCU7XFxuICAgIHRvcDogNDclO1xcbn1cXG5cXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0b3A6IDQ2JTtcXG4gICAgbGVmdDogMjQlO1xcbn1cXG5cXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNiwgOCk7XFxuICAgIHRvcDogNDMlO1xcbiAgICBsZWZ0OiAtMyU7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi42LCAyKTtcXG4gICAgdG9wOiA4JTtcXG4gICAgbGVmdDogMzIlO1xcbn1cXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuMiwgMik7XFxuICAgIHRvcDogMTUlO1xcbiAgICBsZWZ0OiAyOCU7XFxufVxcblxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjMsIDIuNSk7XFxuICAgIHRvcDogMTUlO1xcbiAgICBsZWZ0OiAyOCU7XFxufVxcblxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLCAyLjYpO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogMTclO1xcbn1cXG5cXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdG9wOiAxNSU7XFxufVxcbi50aWxlLm9uQm9hcmQge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiA1MHB4O1xcbn1cXG5cXG4uZHJhZ2dlZE92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLmludmFsaWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwO1xcbn1cXG5cXG4udmFsaWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLnNoaXBGb290ZXIge1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxufVxcblxcbi5zdGFnZVBhcmEge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgbWFyZ2luOiAxcmVtO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGNvbG9yOiAjMDBmZjAwO1xcbiAgICBmb250LXdlaWdodDogMTAwO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBib3JkZXItcmlnaHQ6IDFyZW0gc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDIuNXMgc3RlcHMoNDAsIGVuZCksIGJsaW5rLWNhcmV0MiAxcyBzdGVwLWVuZCBpbmZpbml0ZTtcXG59XFxuXFxuQGtleWZyYW1lcyBibGluay1jYXJldDIge1xcbiAgICBmcm9tLFxcbiAgICB0byB7XFxuICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBib3JkZXItY29sb3I6ICMwMGZmMDA7XFxuICAgIH1cXG59XFxuLndhdmVzIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuXFxuICAgIHRvcDogLTUwcHg7XFxuICAgIGFuaW1hdGlvbjogd2F2ZSAxMHMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4uc2hpcEJvdyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzMDAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxOTQsIDE5NCwgMTk0LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdG9wOiAtNDAwcHg7XFxuXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNjBkZWcpO1xcbn1cXG4uc2hpcEJvd1dvb2Qge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIGhlaWdodDogMzAwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTE5LCA1NywgMCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTE5LCA1NywgMCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NCwgNzksIDAsIDEpIDQ2JSxcXG4gICAgICAgIHJnYmEoMTE5LCA1NywgMCwgMSkgMTAwJVxcbiAgICApO1xcblxcbiAgICB0b3A6IC02NDBweDtcXG4gICAgbGVmdDogMTYwcHg7XFxuXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoNjBkZWcpO1xcbn1cXG5cXG4uZmxha0JhcnJlbDEsXFxuLmZsYWtCYXJyZWwyLFxcbi5mbGFrQmFycmVsMyxcXG4uZmxha0JhcnJlbDQsXFxuLmZsYWtCYXJyZWw1LFxcbi5mbGFrQmFycmVsNiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMzAwcHg7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDMwJSAxMDAlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMzAlIDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjYsIDE2NiwgMTY2LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMjBkZWcpO1xcbn1cXG5cXG4uZmxha0JhcnJlbDEge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNTU1cHg7XFxufVxcbi5mbGFrQmFycmVsMiB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA2MDVweDtcXG59XFxuLmZsYWtCYXJyZWwzIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDY1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDQge1xcbiAgICB0b3A6IC05MHB4O1xcbiAgICBsZWZ0OiA1NTVweDtcXG59XFxuLmZsYWtCYXJyZWw1IHtcXG4gICAgdG9wOiAtOTVweDtcXG4gICAgbGVmdDogNjA1cHg7XFxufVxcbi5mbGFrQmFycmVsNiB7XFxuICAgIHRvcDogLTk1cHg7XFxuICAgIGxlZnQ6IDY1NXB4O1xcbn1cXG5cXG4uZmxha0NvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NiwgMTY2LCAxNjYsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0b3A6IDE1MHB4O1xcbiAgICBsZWZ0OiA0NTBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogMjAwcHg7XFxufVxcbi5mbGFrQ292ZXJUb3Age1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMTU4KTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxNTgsIDE1OCwgMTU4LCAxKSAxJSxcXG4gICAgICAgIHJnYmEoMTEzLCAxMTMsIDExMywgMSkgNDclLFxcbiAgICAgICAgcmdiYSgxMTIsIDExMiwgMTEyLCAxKSA5OSVcXG4gICAgKTtcXG5cXG4gICAgdG9wOiAxMDBweDtcXG4gICAgbGVmdDogNDUwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDEwMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbkBrZXlmcmFtZXMgd2F2ZSB7XFxuICAgIDAlIHtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNSUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAxODAwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG4gICAgLnNoaXBCb3dXb29kIHtcXG4gICAgICAgIGxlZnQ6IDE5MHB4O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTUwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0yMHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1NTBweCkge1xcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2LFxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MHB4LCAwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICB0b3A6IC0yMHB4O1xcbiAgICAgICAgbGVmdDogLTUwcHg7XFxuICAgICAgICBoZWlnaHQ6IDMwMHB4O1xcbiAgICAgICAgd2lkdGg6IDM1MHB4O1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgIH1cXG4gICAgLndhdmVzIHtcXG4gICAgICAgIHRvcDogNTBweDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5idXR0b25Db250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgIHJpZ2h0OiAwO1xcbiAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcXG4gICAgfVxcblxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MHB4KTtcXG4gICAgfVxcbiAgICAuc2hpcEJvd1dvb2Qge1xcbiAgICAgICAgbGVmdDogMTAwcHg7XFxuICAgIH1cXG4gICAgLndhdmVzIHtcXG4gICAgICAgIHRvcDogNTBweDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMik7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDk1MHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgICAgICB0b3A6IC01MHB4O1xcbiAgICAgICAgbGVmdDogLTgwcHg7XFxuICAgIH1cXG5cXG4gICAgLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICB9XFxuICAgIC5wMU9wdGlvbnNDb250YWluZXIge1xcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICBoZWlnaHQ6IDYwdmg7XFxuICAgIH1cXG5cXG4gICAgLnAxR3JpZENvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgZmxleDogMTtcXG4gICAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgICBtYXJnaW46IDA7XFxuICAgIH1cXG5cXG4gICAgLmJvYXJkIHtcXG4gICAgICAgIG1hcmdpbi10b3A6IG5vbmU7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICAgIH1cXG4gICAgLmNlbGwge1xcbiAgICAgICAgd2lkdGg6IDMwcHg7XFxuICAgICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIH1cXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHRvcDogYXV0bztcXG4gICAgICAgIGxlZnQ6IGF1dG87XFxuICAgICAgICBib3R0b206IC01MHB4O1xcbiAgICAgICAgcmlnaHQ6IC0xMDBweDtcXG4gICAgICAgIHotaW5kZXg6IDU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1Mvc3RhZ2luZ3NjcmVlbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksU0FBUztJQUNULGFBQWE7SUFDYiw4QkFBOEI7SUFDOUI7Ozs7Ozs7O0tBUUM7SUFDRCxpQkFBaUI7QUFDckI7QUFDQTtJQUNJLE9BQU87O0lBRVAsNkJBQTZCO0lBQzdCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLE9BQU87SUFDUCxrQ0FBa0M7SUFDbEMsaUNBQWlDO0lBQ2pDLHdDQUF3QztJQUN4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SUFDekI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksZUFBZTtRQUNmLHNCQUFzQjtRQUN0QixRQUFRO1FBQ1IsTUFBTTtRQUNOLHNCQUFzQjtRQUN0QixxQkFBcUI7SUFDekI7O0lBRUE7Ozs7OztRQU1JLCtDQUErQztJQUNuRDtJQUNBOztRQUVJLDRCQUE0QjtJQUNoQztJQUNBO1FBQ0ksV0FBVztJQUNmO0lBQ0E7UUFDSSxTQUFTO1FBQ1QsbUJBQW1CO0lBQ3ZCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLHFCQUFxQjtRQUNyQixVQUFVO1FBQ1YsV0FBVztJQUNmOztJQUVBO1FBQ0ksZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixXQUFXO0lBQ2Y7SUFDQTtRQUNJLHNCQUFzQjs7UUFFdEIsZ0JBQWdCO1FBQ2hCLFlBQVk7SUFDaEI7O0lBRUE7UUFDSSxhQUFhO1FBQ2IsT0FBTztRQUNQLFVBQVU7UUFDVixTQUFTO0lBQ2I7O0lBRUE7UUFDSSxnQkFBZ0I7UUFDaEIsb0NBQW9DO1FBQ3BDLHVDQUF1QztJQUMzQztJQUNBO1FBQ0ksV0FBVztRQUNYLFlBQVk7SUFDaEI7SUFDQTtRQUNJLFNBQVM7UUFDVCxVQUFVO1FBQ1YsYUFBYTtRQUNiLGFBQWE7UUFDYixVQUFVO0lBQ2Q7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksYUFBYTtJQUNqQjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5nYW1lQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ucXVldWVDb250YWluZXIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4ucDFPcHRpb25zQ29udGFpbmVyIHtcXG4gICAgZmxleDogMS4zO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTQ0LCAxNDQsIDE0NCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTQ0LCAxNDQsIDE0NCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE0MCwgMTQwLCAxNDAsIDEpIDExJSxcXG4gICAgICAgIHJnYmEoMTM2LCAxMzYsIDEzNiwgMSkgMjElLFxcbiAgICAgICAgcmdiYSgxNDQsIDE0NCwgMTQ0LCAxKSA2OSUsXFxuICAgICAgICByZ2JhKDEzOCwgMTM4LCAxMzgsIDEpIDg3JSxcXG4gICAgICAgIHJnYmEoMTY4LCAxNjgsIDE2OCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICBtaW4taGVpZ2h0OiAyMDBweDtcXG59XFxuLnAxR3JpZENvbnRhaW5lciB7XFxuICAgIGZsZXg6IDM7XFxuXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4ucmFkYXJDb250YWluZXIge1xcbiAgICBmbGV4OiAyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4ucmFkYXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHdpZHRoOiAyNjNweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJvcmRlcjogMTBweCBzb2xpZCAjNmQ2ZDZkO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogM3B4IDEwcHggMCAjYzVjNWM1LCBpbnNldCAwIDAgNTBweCByZ2JhKDAsIDI1NSwgMCwgMC41KSxcXG4gICAgICAgIC01cHggLTVweCAyMHB4IGJsYWNrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDEpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoMiksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgzKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgaGVpZ2h0OiAxcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNDksIDE1OCwgNDkpO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMikge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMykge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoNCkge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDUpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoNikge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDI1NSwgMCwgMSk7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNSkge1xcbiAgICB3aWR0aDogNzVweDtcXG4gICAgaGVpZ2h0OiA3NXB4O1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDYpIHtcXG4gICAgd2lkdGg6IDE3NXB4O1xcbiAgICBoZWlnaHQ6IDE3NXB4O1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDcpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICMwMGZmMDAgMCUsIHRyYW5zcGFyZW50IDUwJSk7XFxuICAgIGFuaW1hdGlvbjogcmFkYXIgMnMgbGluZWFyIGluZmluaXRlO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg4KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDc1JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoOSkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICBsZWZ0OiA3NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDEwKSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIGxlZnQ6IDg1JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMTEpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogODAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxMikge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJhZGFyIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgZ2xvdyB7XFxuICAgIDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxufVxcblxcbi5idXR0b25Db250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4uYmFzZSB7XFxuICAgIGJhY2tncm91bmQ6ICNjYWNhY2E7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXItcmFkaXVzOiAyN3ZtaW47XFxuICAgIGJveC1zaGFkb3c6IDAgNnZtaW4gMC4xNXZtaW4gMHZtaW4gIzc3NywgMCA0dm1pbiAwLjE1dm1pbiAwdm1pbiAjNzc3LFxcbiAgICAgICAgMCAydm1pbiAwLjE1dm1pbiAwdm1pbiAjNzc3LCAtMjBweCAyMHB4IDUwcHggYmxhY2s7XFxuICAgIHBhZGRpbmc6IDB2bWluIDJ2bWluIDJ2bWluIDJ2bWluO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMGRlZykgcm90YXRlWigwZGVnKTtcXG4gICAgbWFyZ2luLXRvcDogLTQuNXZtaW47XFxuICAgIGhlaWdodDogOTAlO1xcbn1cXG5cXG5idXR0b24jYWN0aXZhdGUge1xcbiAgICBiYWNrZ3JvdW5kOiAjZDYwNTA1O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIHdpZHRoOiAyMHZtaW47XFxuICAgIGhlaWdodDogMTl2bWluO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgYm94LXNoYWRvdzogMCA0dm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwLCAwIDJ2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDA7XFxuICAgIHRvcDogLTIuNXZtaW47XFxuICAgIGJvcmRlcjogMC41dm1pbiBzb2xpZCAjYWYwMDAwYTE7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlIDBzO1xcbn1cXG5cXG5idXR0b24jYWN0aXZhdGU6aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAwIDN2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAtMS41dm1pbjtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZSAwcztcXG59XFxuYnV0dG9uI2FjdGl2YXRlOmFjdGl2ZSxcXG5idXR0b24jYWN0aXZhdGUucHVzaGVkIHtcXG4gICAgYm94LXNoYWRvdzogMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwLCAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDA7XFxuICAgIHRvcDogMC41dm1pbjtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UgMHM7XFxufVxcbmJ1dHRvbiNhY3RpdmF0ZS5wdXNoZWQge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMjBweCAxMHB4ICNmZjNjM2MsIDAgMCAxMDBweCA1MHB4ICNmZjI4Mjg7XFxuICAgIGJhY2tncm91bmQ6ICNmZjAwMDA7XFxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjMDAwMDAwMjA7XFxufVxcblxcbi5iYXNlIHtcXG4gICAgc2NhbGU6IDAuMztcXG59XFxuLnJpZ2h0QnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuLm1pZGRsZUJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcbi5sZWZ0QnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuXFxuLmJ1dHRvblRleHQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNmQ2ZDZkO1xcbiAgICBwYWRkaW5nOiAxcmVtIDJyZW07XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xcbiAgICBib3JkZXItcmFkaXVzOiAxNSU7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IGJsYWNrO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMXJlbTtcXG4gICAgdGV4dC1zaGFkb3c6IC0xcHggLTFweCAxcHggYmxhY2s7XFxufVxcbi5idXR0b25UZXh0OjpiZWZvcmUge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDEwcHg7XFxuICAgIGhlaWdodDogMTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmIyYjJiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjVweDtcXG4gICAgbGVmdDogNXB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IGJsYWNrO1xcbn1cXG4uYnV0dG9uVGV4dDo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgd2lkdGg6IDEwcHg7XFxuICAgIGhlaWdodDogMTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmIyYjJiO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjVweDtcXG4gICAgcmlnaHQ6IDVweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDNweCBibGFjaztcXG59XFxuXFxuLm1pZGRsZUJ1dHRvbiAuYnV0dG9uVGV4dCB7XFxuICAgIHBhZGRpbmc6IDFyZW0gMS4xcmVtO1xcbn1cXG5cXG4ucDFTaGlwU3RhZ2Uge1xcbiAgICBmbGV4OiA1O1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5zaGlwQ29udGFpbmVyIHtcXG4gICAgZmxleDogMTtcXG5cXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1MHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uc2hpcFF1ZXVlIHtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgZmxleDogMztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAxOCU7XFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZpbHRlcjogYmx1cig1cHgpO1xcbn1cXG4ubmV4dFNoaXBDb250YWluZXIge1xcbiAgICBtYXJnaW46IDEwcHg7XFxuICAgIGhlaWdodDogOTAlO1xcbiAgICB3aWR0aDogMjIwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDI1NSwgMCwgMC41KSxcXG4gICAgICAgIGluc2V0IDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpO1xcbn1cXG5cXG4ubmV4dFNoaXBDb250YWluZXI6aG92ZXIge1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsIDI1NSwgMCwgMC44KSxcXG4gICAgICAgIGluc2V0IDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjgpO1xcbn1cXG5cXG4ubmV4dFNoaXA6aG92ZXIge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxufVxcblxcbi5uZXh0U2hpcCB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLkNhcnJpZXJDb250YWluZXIsXFxuLkJhdHRsZXNoaXBDb250YWluZXIsXFxuLkRlc3Ryb3llckNvbnRhaW5lcixcXG4uU3VibWFyaW5lQ29udGFpbmVyLFxcbi5QYXRyb2wtQm9hdENvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5DYXJyaWVyQ29udGFpbmVyOmhvdmVyLFxcbi5CYXR0bGVzaGlwQ29udGFpbmVyOmhvdmVyLFxcbi5EZXN0cm95ZXJDb250YWluZXI6aG92ZXIsXFxuLlN1Ym1hcmluZUNvbnRhaW5lcjpob3ZlcixcXG4uUGF0cm9sLUJvYXRDb250YWluZXI6aG92ZXIge1xcbn1cXG5cXG4jQ2FycmllcixcXG4jQmF0dGxlc2hpcCxcXG4jRGVzdHJveWVyLFxcbiNTdWJtYXJpbmUsXFxuI1BhdHJvbC1Cb2F0IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5zaGlwT3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg1KTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0b3A6IDQyJTtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgLyogYW5pbWF0aW9uOiByb3RhdGUgMC40cyBlYXNlLWluLW91dDsgKi9cXG59XFxuXFxuLyogLnNoaXBPdmVybGF5Lmhvcml6b250YWwge1xcbiAgICBhbmltYXRpb246IHJvdGF0ZTEgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGUge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDUuNSkgcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg1KSByb3RhdGUoOTBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlMSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS42KSByb3RhdGUoOTBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpIHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbn0gKi9cXG5cXG4jUGF0cm9sLUJvYXRPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDMpO1xcbn1cXG5cXG4uc2hpcFRpbGUge1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbn1cXG5cXG4uc2hpcCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5zaGlwLmhvcml6b250YWwge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbn1cXG5cXG4uZ2FtZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBib3JkZXItcmlnaHQ6IDMwcHggc29saWQgcmdiKDE4MiwgMTgyLCAxODIpO1xcbiAgICBib3JkZXItdG9wOiAzMHB4IHNvbGlkIHJnYig3MSwgNzEsIDcxKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDMwcHggc29saWQgcmdiKDk0LCA5NCwgOTQpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAxNDBweCByZ2JhKDAsIDI1NSwgMCwgMC41KTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNSU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1JTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNTBweCk7XFxufVxcblxcbi5zaGFkb3dHcmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZyxcXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLFxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZyxcXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcsXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcCBpbWcge1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXA6aG92ZXIsXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwOmhvdmVyLFxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwOmhvdmVyLFxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwOmhvdmVyLFxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXA6aG92ZXIge1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCByZ2JhKDAsIDI1NSwgMCwgMC42KTtcXG59XFxuXFxuLnRpbGUge1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDljMDA7XFxufVxcbi50aWxlLngwIHtcXG4gICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi50aWxlLng5IHtcXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbn1cXG4udGlsZS55OSB7XFxuICAgIGJvcmRlci10b3A6IG5vbmU7XFxufVxcbi50aWxlLnkwIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG59XFxuXFxuLnNoaXBPdmVybGF5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC0yMCU7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KTtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jU3VibWFyaW5lIGltZy5ob3Jpem9udGFsIHtcXG4gICAgbGVmdDogLTUlO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNSk7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdG9wOiA0MiU7XFxufVxcblxcbi5ib2FyZFNoaXAge1xcbiAgICB6LWluZGV4OiA5O1xcbn1cXG5cXG4uYm9hcmRTaGlwIGltZyB7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoOCwgNik7XFxuICAgIGxlZnQ6IDMzJTtcXG4gICAgdG9wOiA0OCU7XFxufVxcblxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNi41LCA1KTtcXG4gICAgbGVmdDogMTglO1xcbiAgICB0b3A6IDQ3JTtcXG59XFxuXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdG9wOiA0NiU7XFxuICAgIGxlZnQ6IDI0JTtcXG59XFxuXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDYsIDgpO1xcbiAgICB0b3A6IDQzJTtcXG4gICAgbGVmdDogLTMlO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuNiwgMik7XFxuICAgIHRvcDogOCU7XFxuICAgIGxlZnQ6IDMyJTtcXG59XFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjIsIDIpO1xcbiAgICB0b3A6IDE1JTtcXG4gICAgbGVmdDogMjglO1xcbn1cXG5cXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi4zLCAyLjUpO1xcbiAgICB0b3A6IDE1JTtcXG4gICAgbGVmdDogMjglO1xcbn1cXG5cXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMiwgMi42KTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDE3JTtcXG59XFxuXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRvcDogMTUlO1xcbn1cXG4udGlsZS5vbkJvYXJkIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG59XFxuXFxuLmRyYWdnZWRPdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxufVxcblxcbi5pbnZhbGlkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDAwMDtcXG59XFxuXFxuLnZhbGlkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxufVxcblxcbi5zaGlwRm9vdGVyIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpO1xcbn1cXG5cXG4uc3RhZ2VQYXJhIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIG1hcmdpbjogMXJlbTtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBjb2xvcjogIzAwZmYwMDtcXG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcmVtIHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAyLjVzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldDIgMXMgc3RlcC1lbmQgaW5maW5pdGU7XFxufVxcblxcbkBrZXlmcmFtZXMgYmxpbmstY2FyZXQyIHtcXG4gICAgZnJvbSxcXG4gICAgdG8ge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDBmZjAwO1xcbiAgICB9XFxufVxcbi53YXZlcyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcblxcbiAgICB0b3A6IC01MHB4O1xcbiAgICBhbmltYXRpb246IHdhdmUgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnNoaXBCb3cge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIGhlaWdodDogMzAwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTk0LCAxOTQsIDE5NCwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRvcDogLTQwMHB4O1xcblxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDYwZGVnKTtcXG59XFxuLnNoaXBCb3dXb29kIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDMwMDBweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDExOSwgNTcsIDApO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDExOSwgNTcsIDAsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjQsIDc5LCAwLCAxKSA0NiUsXFxuICAgICAgICByZ2JhKDExOSwgNTcsIDAsIDEpIDEwMCVcXG4gICAgKTtcXG5cXG4gICAgdG9wOiAtNjQwcHg7XFxuICAgIGxlZnQ6IDE2MHB4O1xcblxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDYwZGVnKTtcXG59XFxuXFxuLmZsYWtCYXJyZWwxLFxcbi5mbGFrQmFycmVsMixcXG4uZmxha0JhcnJlbDMsXFxuLmZsYWtCYXJyZWw0LFxcbi5mbGFrQmFycmVsNSxcXG4uZmxha0JhcnJlbDYge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDMwMHB4O1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzMCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDMwJSAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY2LCAxNjYsIDE2NiwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDIwZGVnKTtcXG59XFxuXFxuLmZsYWtCYXJyZWwxIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDU1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDIge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNjA1cHg7XFxufVxcbi5mbGFrQmFycmVsMyB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA2NTVweDtcXG59XFxuLmZsYWtCYXJyZWw0IHtcXG4gICAgdG9wOiAtOTBweDtcXG4gICAgbGVmdDogNTU1cHg7XFxufVxcbi5mbGFrQmFycmVsNSB7XFxuICAgIHRvcDogLTk1cHg7XFxuICAgIGxlZnQ6IDYwNXB4O1xcbn1cXG4uZmxha0JhcnJlbDYge1xcbiAgICB0b3A6IC05NXB4O1xcbiAgICBsZWZ0OiA2NTVweDtcXG59XFxuXFxuLmZsYWtDb3ZlciB7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjYsIDE2NiwgMTY2LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdG9wOiAxNTBweDtcXG4gICAgbGVmdDogNDUwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDIwMHB4O1xcbn1cXG4uZmxha0NvdmVyVG9wIHtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTU4LCAxNTgsIDE1OCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTU4LCAxNTgsIDE1OCwgMSkgMSUsXFxuICAgICAgICByZ2JhKDExMywgMTEzLCAxMTMsIDEpIDQ3JSxcXG4gICAgICAgIHJnYmEoMTEyLCAxMTIsIDExMiwgMSkgOTklXFxuICAgICk7XFxuXFxuICAgIHRvcDogMTAwcHg7XFxuICAgIGxlZnQ6IDQ1MHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHdhdmUge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTUlKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTgwMHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgsIC01MHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxuICAgIC5zaGlwQm93V29vZCB7XFxuICAgICAgICBsZWZ0OiAxOTBweDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTU1MHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTIwcHgsIDBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTUwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTBweCwgMHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgdG9wOiAtMjBweDtcXG4gICAgICAgIGxlZnQ6IC01MHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgICAgIHdpZHRoOiAzNTBweDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpO1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICB9XFxuICAgIC53YXZlcyB7XFxuICAgICAgICB0b3A6IDUwcHg7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICByaWdodDogMDtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XFxuICAgIH1cXG5cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTBweCk7XFxuICAgIH1cXG4gICAgLnNoaXBCb3dXb29kIHtcXG4gICAgICAgIGxlZnQ6IDEwMHB4O1xcbiAgICB9XFxuICAgIC53YXZlcyB7XFxuICAgICAgICB0b3A6IDUwcHg7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDIpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA5NTBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICAgICAgdG9wOiAtNTBweDtcXG4gICAgICAgIGxlZnQ6IC04MHB4O1xcbiAgICB9XFxuXFxuICAgIC5idXR0b25Db250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbiAgICAucDFPcHRpb25zQ29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgaGVpZ2h0OiA2MHZoO1xcbiAgICB9XFxuXFxuICAgIC5wMUdyaWRDb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGZsZXg6IDE7XFxuICAgICAgICBwYWRkaW5nOiAwO1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICB9XFxuXFxuICAgIC5ib2FyZCB7XFxuICAgICAgICBtYXJnaW4tdG9wOiBub25lO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICB9XFxuICAgIC5jZWxsIHtcXG4gICAgICAgIHdpZHRoOiAzMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB9XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICB0b3A6IGF1dG87XFxuICAgICAgICBsZWZ0OiBhdXRvO1xcbiAgICAgICAgYm90dG9tOiAtNTBweDtcXG4gICAgICAgIHJpZ2h0OiAtMTAwcHg7XFxuICAgICAgICB6LWluZGV4OiA1O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZXBhZ2UuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ob21lcGFnZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFwcGFnZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21hcHBhZ2UuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25hbWVwYWdlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbmFtZXBhZ2UuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0YWdpbmdzY3JlZW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFnaW5nc2NyZWVuLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vc2NyaXB0cy9jb21wb25lbnRzL0dhbWUuanNcIjtcbmltcG9ydCBWaWV3TW9kZWwgZnJvbSBcIi4vc2NyaXB0cy9WaWV3TW9kZWxcIjtcbmltcG9ydCBBcHAgZnJvbSBcIi4vc2NyaXB0cy9ET00vQXBwLmpzXCI7XG5cbmNvbnN0IG1vZGVsID0gbmV3IEdhbWUoKTtcbmNvbnN0IHZtID0gbmV3IFZpZXdNb2RlbChtb2RlbCk7XG5uZXcgQXBwKHZtLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhaW5lclwiKSk7XG4iXSwibmFtZXMiOlsiUHViU3ViSW50ZXJmYWNlIiwiSG9tZVBhZ2UiLCJNYXBQYWdlIiwiR2FtZVBhZ2UiLCJlbGVtIiwiQXBwIiwiY29uc3RydWN0b3IiLCJ2aWV3TW9kZWwiLCJlbGVtZW50Iiwic2hvdWxkVXBkYXRlIiwib2xkTW9kZWwiLCJuZXdNb2RlbCIsImN1cnJlbnRQYWdlIiwicmVuZGVyIiwiYXBwRWxlbWVudCIsInByb3AiLCJpZCIsIndhdmVzU3JjIiwiR2FtZU1lc3NhZ2UiLCJTaGlwUXVldWUiLCJCb2FyZEVsZW0iLCJwbGFjZVNoaXBSYW5kb21seSIsImdhbWVTdGF0ZSIsIm1vZGVsIiwiYnVpbGRHYW1lcGFnZSIsImxlZnRCdXR0b24iLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsIm1pZGRsZUJ1dHRvbiIsInJpZ2h0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInVwZGF0ZU1vZGVsIiwicGxheWVyIiwic2hpcFF1ZXVlIiwiaXNIb3Jpem9udGFsIiwiZHJvcFF1ZXVlIiwicHVzaCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImxlbmd0aCIsInNoaXAiLCJzaGlmdCIsIm5ld0dhbWVib2FyZCIsIm5ld1NoaXAiLCJnYW1lYm9hcmQiLCJzaGlwcyIsInBvcCIsInNoaXBDb250YWluZXIiLCJzaGlwSW5kZXgiLCJjbGlja2VkSW5kZXgiLCJkcmFnZ2VkU2hpcEluZGV4IiwibWVzc2FnZUNvbnRhaW5lciIsImdhbWUiLCJnYW1lQ29udGFpbmVyIiwic3JjIiwiYXV0b3BsYXkiLCJsb29wIiwiZHJhZ2dhYmxlIiwidGV4dENvbnRlbnQiLCJIb21lUGFnZUlucHV0IiwiaG9tZXBhZ2VDb250YWluZXIiLCJhcHBlbmRDaGlsZCIsIm5ld0dhbWUiLCJocmVmIiwibmFtZVBhZ2VJc09wZW4iLCJuZXdHYW1lQnRuIiwiYnVpbGRGb3JtIiwiZ3JlZXRpbmciLCJpbnB1dEZpZWxkIiwidHlwZSIsInBsYWNlaG9sZGVyIiwiYnV0dG9uIiwibmFtZUZpZWxkIiwibmFtZSIsInZhbHVlIiwiZm9ybUNvbnRhaW5lciIsInJlZFBpblNyYyIsInN0aWNreU5vdGVTcmMiLCJzdGF0ZU1lc3NhZ2UiLCJyZWRQaW5zIiwiZm9yRWFjaCIsInBpbiIsIkFJIiwiZGlmZmljdWx0eSIsIm1hcCIsIm5vdGUiLCJidWlsZE5vdGUiLCJub3RlT3B0aW9ucyIsIm5vdGUxIiwibG9jYXRpb24iLCJwYXJhIiwibm90ZTIiLCJub3RlMyIsInNlbGVjdGVkT3B0aW9ucyIsImNvbnRlbnQiLCJ2ZXJzaW9uIiwiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0IiwiSFRNTCIsImlubmVySFRNTCIsImZvckkiLCJmb3IiLCJzcGVsbGNoZWNrIiwicmVxdWlyZWQiLCJjaGVja2VkIiwibXV0ZWQiLCJjaGlsZCIsIlNoaXAiLCJpc1ZhbGlkUGxhY2VtZW50IiwicGxhY2VTaGlwIiwiZHJhZ0VudGVyIiwiYm9hcmRTaXplIiwiYnVpbGRCb2FyZCIsInNoYWRvd0dyaWQiLCJib2FyZCIsInNpemUiLCJjZWxscyIsInJvdyIsImNvbCIsImNlbGwiLCJ0aWxlUmVmIiwiZGF0YXNldCIsImUiLCJib3VuZCIsImhhbmRsZURyYWdFbnRlciIsImJpbmQiLCJoYW5kbGVEcm9wIiwiaGFuZGxlRHJhZ092ZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0aWxlU3RhdHVzIiwic2hpcEVsZW0iLCJiYXNlVGlsZSIsInRpbGVzIiwiZW5kVGlsZSIsInN0eWxlIiwiZ3JpZEFyZWEiLCJ0aWxlIiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVEcmFnTGVhdmUiLCJkcmFnZ2VkU2hpcCIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJiYXNlQ29vcmRzIiwiZ2V0QmFzZVRpbGUiLCJiYXNlUm93IiwiYmFzZUNvbCIsImlzVmFsaWQiLCJyb3dPZmZzZXQiLCJjb2xPZmZzZXQiLCJpIiwiTnVtYmVyIiwiZ2V0Q2VsbCIsImluZGV4Iiwib2Zmc2V0Um93Iiwib2Zmc2V0Q29sIiwiY2FycmllclNyYyIsImJhdHRsZXNoaXBTcmMiLCJkZXN0cm95ZXJTcmMiLCJzdWJtYXJpbmVTcmMiLCJwYXRyb2xCb2F0U3JjIiwiY2xpY2tlZEV2ZW50Iiwic2hpcE1vZGVsIiwiY3JlYXRlIiwic2hpcFNyYyIsInNoaXBDbGFzcyIsImJvYXQiLCJzaGlwT3ZlcmxheSIsIm92ZXJsYXkiLCJvdmVybGF5Q2xhc3MiLCJoYW5kbGVEcmFnU3RhcnQiLCJ3aWR0aCIsImhlaWdodCIsInNldFRpbWVvdXQiLCJjb25zb2xlIiwibG9nIiwiYnVpbGRRdWV1ZSIsInN0YWdlIiwibmV4dCIsInF1ZXVlIiwiaW5jbHVkZXMiLCJwcmVwZW5kIiwib25Jbml0IiwicmVnaXN0ZXIiLCJnZXRFbGVtZW50IiwiVmlld01vZGVsIiwicHVic3VicyIsInB1YnN1YiIsInJlcGxhY2VDaGlsZHJlbiIsIm1vZGVsVXBkYXRlRnVuYyIsImtleSIsIlBsYXllciIsIkdhbWUiLCJjdXJyZW50VHVybiIsIndhcm4iLCJNYXRoIiwicmFuZG9tIiwicmFuZFJvdyIsImZsb29yIiwicmFuZENvbCIsIlRpbGUiLCJHYW1lYm9hcmQiLCJoaXRzIiwic3VuayIsInZtIiwicXVlcnlTZWxlY3RvciJdLCJzb3VyY2VSb290IjoiIn0=