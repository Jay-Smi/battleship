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
/* harmony import */ var _assets_images_Battleship2_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assets/images/Battleship2.svg */ "./src/assets/images/Battleship2.svg");
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
        shipSrc = _assets_images_Battleship2_svg__WEBPACK_IMPORTED_MODULE_2__;
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
___CSS_LOADER_EXPORT___.push([module.id, ".gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    flex: 2;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px rgba(0, 255, 0, 0.5),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: rgb(49, 158, 49);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid rgba(0, 255, 0, 1);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, #00ff00 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.radar li:nth-child(8) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(9) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(10) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(11) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(12) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin #777, 0 4vmin 0.15vmin 0vmin #777,\n        0 2vmin 0.15vmin 0vmin #777, -20px 20px 50px black;\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 50px rgba(0, 255, 0, 0.5);\n    display: flex;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5),\n        inset 0 0 10px rgba(0, 255, 0, 0.5);\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8),\n        inset 0 0 10px rgba(0, 255, 0, 0.8);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n#CarrierOverlay,\n#BattleshipOverlay,\n#DestroyerOverlay,\n#SubmarineOverlay,\n#Patrol-BoatOverlay {\n    object-fit: contain;\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n}\n\n.board {\n    margin-top: auto;\n    position: relative;\n\n    border-bottom: 10px solid rgb(155, 155, 155);\n    border-right: 30px solid rgb(182, 182, 182);\n    border-top: 30px solid rgb(71, 71, 71);\n    border-left: 30px solid rgb(94, 94, 94);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px rgba(0, 255, 0, 0.5);\n    border-top-left-radius: 5%;\n    border-top-right-radius: 5%;\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.6);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.cell {\n    height: 100%;\n    width: 100%;\n    border: 1px solid #009c00;\n}\n.tile.x0 {\n    border-left: none;\n}\n.tile.x9 {\n    border-right: none;\n}\n.tile.y9 {\n    border-top: none;\n}\n.tile.y0 {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.5);\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: #00ff00;\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: #00ff00;\n    }\n}\n.waves {\n    position: absolute;\n    width: 100vw;\n\n    top: -50px;\n    animation: wave 10s linear infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/stagingscreen.css"],"names":[],"mappings":"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","sourcesContent":[".gameContainer {\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n}\n\n.queueContainer {\n    width: 100%;\n    height: 100%;\n    display: flex;\n}\n\n.p1OptionsContainer {\n    flex: 1.3;\n    display: flex;\n    background: rgb(144, 144, 144);\n    background: radial-gradient(\n        circle,\n        rgba(144, 144, 144, 1) 0%,\n        rgba(140, 140, 140, 1) 11%,\n        rgba(136, 136, 136, 1) 21%,\n        rgba(144, 144, 144, 1) 69%,\n        rgba(138, 138, 138, 1) 87%,\n        rgba(168, 168, 168, 1) 100%\n    );\n    min-height: 200px;\n}\n.p1GridContainer {\n    flex: 3;\n\n    background-color: transparent;\n    display: flex;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.radarContainer {\n    flex: 2;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.radar {\n    position: relative;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    margin: 0;\n    padding: 0;\n    width: 263px;\n    height: 100%;\n    border-radius: 50%;\n    border: 10px solid #6d6d6d;\n    background-color: black;\n    box-shadow: 3px 10px 0 #c5c5c5, inset 0 0 50px rgba(0, 255, 0, 0.5),\n        -5px -5px 20px black;\n    overflow: hidden;\n}\n\n.radar li:nth-child(1),\n.radar li:nth-child(2),\n.radar li:nth-child(3),\n.radar li:nth-child(4) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    height: 1px;\n    width: 100%;\n    background: rgb(49, 158, 49);\n    border-radius: 50%;\n}\n.radar li:nth-child(2) {\n    transform: rotate(90deg);\n}\n.radar li:nth-child(3) {\n    transform: rotate(45deg);\n}\n.radar li:nth-child(4) {\n    transform: rotate(-45deg);\n}\n\n.radar li:nth-child(5),\n.radar li:nth-child(6) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border: 1px solid rgba(0, 255, 0, 1);\n    background: transparent;\n    border-radius: 50%;\n}\n\n.radar li:nth-child(5) {\n    width: 75px;\n    height: 75px;\n}\n\n.radar li:nth-child(6) {\n    width: 175px;\n    height: 175px;\n}\n\n.radar li:nth-child(7) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(45deg, #00ff00 0%, transparent 50%);\n    animation: radar 2s linear infinite;\n    transform-origin: top left;\n}\n\n.radar li:nth-child(8) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(9) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 75%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(10) {\n    list-style: none;\n    position: absolute;\n    top: 45%;\n    left: 85%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(11) {\n    list-style: none;\n    position: absolute;\n    top: 50%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n.radar li:nth-child(12) {\n    list-style: none;\n    position: absolute;\n    top: 40%;\n    left: 80%;\n    width: 8px;\n    height: 8px;\n    background: #00ff00;\n    border-radius: 50%;\n    filter: blur(2px);\n    animation: glow 2s linear infinite;\n}\n\n@keyframes radar {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes glow {\n    0% {\n        opacity: 0;\n    }\n    50% {\n        opacity: 1;\n    }\n    100% {\n        opacity: 0;\n    }\n}\n\n.buttonContainer {\n    display: flex;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.base {\n    background: #cacaca;\n    width: 100%;\n    border-radius: 27vmin;\n    box-shadow: 0 6vmin 0.15vmin 0vmin #777, 0 4vmin 0.15vmin 0vmin #777,\n        0 2vmin 0.15vmin 0vmin #777, -20px 20px 50px black;\n    padding: 0vmin 2vmin 2vmin 2vmin;\n    transform: rotateX(0deg) rotateZ(0deg);\n    margin-top: -4.5vmin;\n    height: 90%;\n}\n\nbutton#activate {\n    background: #d60505;\n    border: 0;\n    width: 20vmin;\n    height: 19vmin;\n    border-radius: 100%;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n    box-shadow: 0 4vmin 0.15vmin 0vmin #af0000, 0 2vmin 0.15vmin 0vmin #af0000;\n    top: -2.5vmin;\n    border: 0.5vmin solid #af0000a1;\n    transition: all 0.25s ease 0s;\n}\n\nbutton#activate:hover {\n    box-shadow: 0 3vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: -1.5vmin;\n    transition: all 0.5s ease 0s;\n}\nbutton#activate:active,\nbutton#activate.pushed {\n    box-shadow: 0 1vmin 0.15vmin 0vmin #af0000, 0 1vmin 0.15vmin 0vmin #af0000;\n    top: 0.5vmin;\n    transition: all 0.25s ease 0s;\n}\nbutton#activate.pushed {\n    box-shadow: 0 0 20px 10px #ff3c3c, 0 0 100px 50px #ff2828;\n    background: #ff0000;\n    border-bottom: 3px solid #00000020;\n}\n\n.base {\n    scale: 0.3;\n}\n.rightButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.middleButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n.leftButton {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n}\n\n.buttonText {\n    background-color: #6d6d6d;\n    padding: 1rem 2rem;\n    font-family: BlackOps1;\n    font-size: 1.3rem;\n    border-radius: 15%;\n    box-shadow: 0 0 10px black;\n    position: relative;\n    color: white;\n    letter-spacing: 0.1rem;\n    text-shadow: -1px -1px 1px black;\n}\n.buttonText::before {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    left: 5px;\n    box-shadow: 0 0 3px black;\n}\n.buttonText::after {\n    content: \"\";\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #2b2b2b;\n    position: absolute;\n    top: 25px;\n    right: 5px;\n    box-shadow: 0 0 3px black;\n}\n\n.middleButton .buttonText {\n    padding: 1rem 1.1rem;\n}\n\n.p1ShipStage {\n    flex: 5;\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n}\n\n.shipContainer {\n    flex: 1;\n\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 50px rgba(0, 255, 0, 0.5);\n    display: flex;\n}\n\n.shipQueue {\n    padding: 20px;\n    flex: 3;\n    display: flex;\n    gap: 18%;\n    justify-content: flex-end;\n    align-items: center;\n    filter: blur(5px);\n}\n.nextShipContainer {\n    margin: 10px;\n    height: 90%;\n    width: 220px;\n    border-radius: 10px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5),\n        inset 0 0 10px rgba(0, 255, 0, 0.5);\n}\n\n.nextShipContainer:hover {\n    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8),\n        inset 0 0 10px rgba(0, 255, 0, 0.8);\n}\n\n.nextShip:hover {\n    transform: scale(1.1);\n}\n\n.nextShip {\n    cursor: pointer;\n}\n\n.CarrierContainer,\n.BattleshipContainer,\n.DestroyerContainer,\n.SubmarineContainer,\n.Patrol-BoatContainer {\n    display: flex;\n    flex-direction: column;\n}\n\n#CarrierOverlay,\n#BattleshipOverlay,\n#DestroyerOverlay,\n#SubmarineOverlay,\n#Patrol-BoatOverlay {\n    object-fit: contain;\n}\n\n#Carrier,\n#Battleship,\n#Destroyer,\n#Submarine,\n#Patrol-Boat {\n    position: relative;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    height: 30px;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n    width: 30px;\n    height: auto;\n    /* animation: rotate 0.4s ease-in-out; */\n}\n\n/* .shipOverlay.horizontal {\n    animation: rotate1 0.4s ease-in-out;\n}\n\n@keyframes rotate {\n    0% {\n        transform: scale(5.5) rotate(0deg);\n    }\n    100% {\n        transform: scale(5) rotate(90deg);\n    }\n}\n\n@keyframes rotate1 {\n    0% {\n        transform: scale(1.6) rotate(90deg);\n    }\n    100% {\n        transform: scale(1.8) rotate(0deg);\n    }\n} */\n\n#Patrol-BoatOverlay.vertical {\n    transform: rotate(90deg) scale(3);\n}\n\n.shipTile {\n    width: 30px;\n    height: 30px;\n}\n\n.ship {\n    display: flex;\n    flex-direction: column;\n}\n.ship.horizontal {\n    flex-direction: row;\n}\n\n.game {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n}\n\n.board {\n    margin-top: auto;\n    position: relative;\n\n    border-bottom: 10px solid rgb(155, 155, 155);\n    border-right: 30px solid rgb(182, 182, 182);\n    border-top: 30px solid rgb(71, 71, 71);\n    border-left: 30px solid rgb(94, 94, 94);\n    background-color: rgba(0, 0, 0, 0.8);\n    box-shadow: inset 0 0 140px rgba(0, 255, 0, 0.5);\n    border-top-left-radius: 5%;\n    border-top-right-radius: 5%;\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n}\n\n.shadowGrid {\n    display: grid;\n    grid-template-rows: repeat(10, 50px);\n    grid-template-columns: repeat(10, 50px);\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    pointer-events: none;\n}\n\n#Carrier.boardShip img,\n#Battleship.boardShip img,\n#Destroyer.boardShip img,\n#Submarine.boardShip img,\n#Patrol-Boat.boardShip img {\n    pointer-events: all;\n}\n\n#Carrier.boardShip:hover,\n#Battleship.boardShip:hover,\n#Destroyer.boardShip:hover,\n#Submarine.boardShip:hover,\n#Patrol-Boat.boardShip:hover {\n    pointer-events: all;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.6);\n}\n\n.tile {\n    height: 30px;\n    width: 30px;\n}\n\n.cell {\n    height: 100%;\n    width: 100%;\n    border: 1px solid #009c00;\n}\n.tile.x0 {\n    border-left: none;\n}\n.tile.x9 {\n    border-right: none;\n}\n.tile.y9 {\n    border-top: none;\n}\n.tile.y0 {\n    border-bottom: none;\n}\n\n.shipOverlay {\n    position: absolute;\n    top: -20%;\n    left: 20%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transform: scale(1.8);\n    pointer-events: none;\n    background: transparent;\n}\n\n#Submarine img.horizontal {\n    left: -5%;\n}\n\n.shipOverlay.vertical {\n    transform: rotate(90deg) scale(5);\n    left: 20%;\n    top: 42%;\n}\n\n.boardShip {\n    z-index: 9;\n}\n\n.boardShip img {\n}\n\n#Carrier.boardShip img.vertical {\n    transform: rotate(90deg) scale(8, 6);\n    left: 33%;\n    top: 48%;\n}\n\n#Battleship.boardShip img.vertical {\n    transform: rotate(90deg) scale(6.5, 5);\n    left: 18%;\n    top: 47%;\n}\n\n#Destroyer.boardShip img.vertical {\n    top: 46%;\n    left: 24%;\n}\n\n#Submarine.boardShip img.vertical {\n    transform: rotate(90deg) scale(6, 8);\n    top: 43%;\n    left: -3%;\n}\n\n#Carrier.boardShip img.horizontal {\n    transform: scale(2.6, 2);\n    top: 8%;\n    left: 32%;\n}\n#Battleship.boardShip img.horizontal {\n    transform: scale(2.2, 2);\n    top: 15%;\n    left: 28%;\n}\n\n#Destroyer.boardShip img.horizontal {\n    transform: scale(2.3, 2.5);\n    top: 15%;\n    left: 28%;\n}\n\n#Submarine.boardShip img.horizontal {\n    transform: scale(2, 2.6);\n    top: 40%;\n    left: 17%;\n}\n\n#Patrol-Boat.boardShip img.horizontal {\n    top: 15%;\n}\n.tile.onBoard {\n    height: 50px;\n    width: 50px;\n}\n\n.draggedOver {\n    background-color: green;\n}\n\n.invalid {\n    background-color: #ff0000;\n}\n\n.valid {\n    background-color: green;\n}\n\n.shipFooter {\n    border-bottom: 5px solid lightgrey;\n    border-right: 5px solid lightgrey;\n    border-top: 5px solid rgb(109, 109, 109);\n    border-left: 5px solid rgb(107, 107, 107);\n    background-color: black;\n    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.5);\n}\n\n.stagePara {\n    font-family: PressStart;\n    margin: 1rem;\n    font-size: 1rem;\n    color: #00ff00;\n    font-weight: 100;\n    white-space: nowrap;\n    border-right: 1rem solid transparent;\n    overflow: hidden;\n    animation: typing 2.5s steps(40, end), blink-caret2 1s step-end infinite;\n}\n\n@keyframes blink-caret2 {\n    from,\n    to {\n        border-color: transparent;\n    }\n    50% {\n        border-color: #00ff00;\n    }\n}\n.waves {\n    position: absolute;\n    width: 100vw;\n\n    top: -50px;\n    animation: wave 10s linear infinite;\n}\n.shipBow {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(194, 194, 194, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: -400px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n.shipBowWood {\n    position: absolute;\n    width: 70%;\n    height: 3000px;\n    background: rgb(119, 57, 0);\n    background: radial-gradient(\n        circle,\n        rgba(119, 57, 0, 1) 0%,\n        rgba(164, 79, 0, 1) 46%,\n        rgba(119, 57, 0, 1) 100%\n    );\n\n    top: -640px;\n    left: 160px;\n\n    border-top-left-radius: 70% 100%;\n    border-top-right-radius: 70% 100%;\n    border-bottom-left-radius: 10% 30%;\n    border-bottom-right-radius: 10% 30%;\n    transform: rotateX(60deg);\n}\n\n.flakBarrel1,\n.flakBarrel2,\n.flakBarrel3,\n.flakBarrel4,\n.flakBarrel5,\n.flakBarrel6 {\n    position: absolute;\n    width: 20px;\n    height: 300px;\n    border-top-left-radius: 30% 100%;\n    border-top-right-radius: 30% 100%;\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    transform: rotate(20deg);\n}\n\n.flakBarrel1 {\n    top: -150px;\n    left: 555px;\n}\n.flakBarrel2 {\n    top: -150px;\n    left: 605px;\n}\n.flakBarrel3 {\n    top: -150px;\n    left: 655px;\n}\n.flakBarrel4 {\n    top: -90px;\n    left: 555px;\n}\n.flakBarrel5 {\n    top: -95px;\n    left: 605px;\n}\n.flakBarrel6 {\n    top: -95px;\n    left: 655px;\n}\n\n.flakCover {\n    background: rgb(78, 78, 78);\n    background: linear-gradient(\n        90deg,\n        rgba(78, 78, 78, 1) 0%,\n        rgba(166, 166, 166, 1) 50%,\n        rgba(84, 84, 84, 1) 100%\n    );\n    top: 150px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 200px;\n}\n.flakCoverTop {\n    background: rgb(78, 78, 78);\n    background: rgb(158, 158, 158);\n    background: radial-gradient(\n        circle,\n        rgba(158, 158, 158, 1) 1%,\n        rgba(113, 113, 113, 1) 47%,\n        rgba(112, 112, 112, 1) 99%\n    );\n\n    top: 100px;\n    left: 450px;\n    position: absolute;\n    width: 200px;\n    height: 100px;\n    border-radius: 50%;\n}\n\n@keyframes wave {\n    0% {\n    }\n    50% {\n        transform: translateY(-15%);\n    }\n    100% {\n    }\n}\n\n@media (min-width: 1800px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(100px, -50px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(100px) rotate(20deg);\n    }\n    .shipBowWood {\n        left: 190px;\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-20px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-20px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1550px) {\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6,\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-50px, 0px);\n    }\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-50px, 0px) rotate(20deg);\n    }\n}\n\n@media (max-width: 1500px) {\n    .radarContainer {\n        position: fixed;\n        top: -20px;\n        left: -50px;\n        height: 300px;\n        width: 350px;\n        background-color: transparent;\n        transform: scale(0.7);\n        border: none;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(1.5);\n    }\n}\n\n@media (max-width: 1200px) {\n    .buttonContainer {\n        position: fixed;\n        flex-direction: column;\n        right: 0;\n        top: 0;\n        background-color: grey;\n        transform: scale(0.8);\n    }\n\n    .flakBarrel1,\n    .flakBarrel2,\n    .flakBarrel3,\n    .flakBarrel4,\n    .flakBarrel5,\n    .flakBarrel6 {\n        transform: translate(-150px, 0px) rotate(20deg);\n    }\n    .flakCover,\n    .flakCoverTop {\n        transform: translate(-150px);\n    }\n    .shipBowWood {\n        left: 100px;\n    }\n    .waves {\n        top: 50px;\n        transform: scale(2);\n    }\n}\n\n@media (max-width: 950px) {\n    .radarContainer {\n        transform: scale(0.5);\n        top: -50px;\n        left: -80px;\n    }\n\n    .buttonContainer {\n        position: static;\n        flex-direction: row;\n        width: 100%;\n    }\n    .p1OptionsContainer {\n        flex-direction: column;\n\n        overflow: hidden;\n        height: 60vh;\n    }\n\n    .p1GridContainer {\n        display: flex;\n        flex: 1;\n        padding: 0;\n        margin: 0;\n    }\n\n    .board {\n        margin-top: none;\n        grid-template-rows: repeat(10, 30px);\n        grid-template-columns: repeat(10, 30px);\n    }\n    .cell {\n        width: 30px;\n        height: 30px;\n    }\n    .radarContainer {\n        top: auto;\n        left: auto;\n        bottom: -50px;\n        right: -100px;\n        z-index: 5;\n    }\n}\n\n@media (max-width: 600px) {\n    .radarContainer {\n        display: none;\n    }\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/assets/images/Battleship2.svg":
/*!*******************************************!*\
  !*** ./src/assets/images/Battleship2.svg ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2b47b4ef993afba4188c.svg";

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

module.exports = __webpack_require__.p + "84599cc59b47b832e10e.svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxPQUFPLGFBQWEsYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxNQUFNLE1BQU0sWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE1BQU0sT0FBTyxPQUFPLEtBQUssS0FBSyxPQUFPLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sU0FBUyxVQUFVLFlBQVksT0FBTyxTQUFTLFlBQVksT0FBTyxTQUFTLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyx3QkFBd0IsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLGNBQWMsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLFNBQVMsWUFBWSxPQUFPLFNBQVMsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLEtBQUssS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssTUFBTSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFlBQVksWUFBWSxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksVUFBVSxLQUFLLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFVBQVUsTUFBTSxVQUFVLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxVQUFVLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxVQUFVLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsVUFBVSxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFB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cmMvc2NyaXB0cy9ET00vQXBwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ET00vR2FtZVBhZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9Ib21lUGFnZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL0hvbWVQYWdlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9NYXBQYWdlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ET00vZWxlbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NL2dhbWVFbGVtZW50cy9Cb2FyZEVsZW0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9nYW1lRWxlbWVudHMvR2FtZU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9nYW1lRWxlbWVudHMvU2hpcEVsZW0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTS9nYW1lRWxlbWVudHMvU2hpcFF1ZXVlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9QdWJTdWJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL1ZpZXdNb2RlbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9BSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9UaWxlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL2hvbWVwYWdlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9tYXBwYWdlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0NTUy9uYW1lcGFnZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1Mvc3RhZ2luZ3NjcmVlbi5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL2hvbWVwYWdlLmNzcz8xNGNmIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvQ1NTL21hcHBhZ2UuY3NzPzcxZWEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1MvbmFtZXBhZ2UuY3NzPzdhZGEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9DU1Mvc3RhZ2luZ3NjcmVlbi5jc3M/NjNlNyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi9QdWJTdWJJbnRlcmZhY2UuanNcIjtcblxuaW1wb3J0IEhvbWVQYWdlIGZyb20gXCIuL0hvbWVQYWdlLmpzXCI7XG5pbXBvcnQgTWFwUGFnZSBmcm9tIFwiLi9NYXBQYWdlLmpzXCI7XG5pbXBvcnQgR2FtZVBhZ2UgZnJvbSBcIi4vR2FtZVBhZ2UuanNcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuL2VsZW0uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIHJldHVybiBvbGRNb2RlbC5jdXJyZW50UGFnZSAhPT0gbmV3TW9kZWwuY3VycmVudFBhZ2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKHsgY3VycmVudFBhZ2UgfSkge1xuICAgICAgICBjb25zdCBhcHBFbGVtZW50ID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGlkOiBcImFwcFwiIH0pO1xuXG4gICAgICAgIGlmIChjdXJyZW50UGFnZSA9PT0gXCJob21lUGFnZVwiKSB7XG4gICAgICAgICAgICBuZXcgSG9tZVBhZ2UodGhpcy52aWV3TW9kZWwsIGFwcEVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID09PSBcIm1hcFBhZ2VcIikge1xuICAgICAgICAgICAgbmV3IE1hcFBhZ2UodGhpcy52aWV3TW9kZWwsIGFwcEVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID09PSBcImdhbWVQYWdlXCIpIHtcbiAgICAgICAgICAgIG5ldyBHYW1lUGFnZSh0aGlzLnZpZXdNb2RlbCwgYXBwRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFwcEVsZW1lbnQ7XG4gICAgfVxufVxuIiwiLy8gaW1wb3J0IEJvYXJkIGZyb20gXCIuL2JvYXJkVmlldy5qc1wiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5pbXBvcnQgd2F2ZXNTcmMgZnJvbSBcIi4uLy4uL2Fzc2V0cy92aWRlb3Mvb2NlYW4ubXA0XCI7XG5pbXBvcnQgXCIuLi8uLi9DU1Mvc3RhZ2luZ3NjcmVlbi5jc3NcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuL2VsZW0uanNcIjtcbmltcG9ydCBHYW1lTWVzc2FnZSBmcm9tIFwiLi9nYW1lRWxlbWVudHMvR2FtZU1lc3NhZ2UuanNcIjtcbmltcG9ydCBTaGlwUXVldWUgZnJvbSBcIi4vZ2FtZUVsZW1lbnRzL1NoaXBRdWV1ZS5qc1wiO1xuaW1wb3J0IEJvYXJkRWxlbSBmcm9tIFwiLi9nYW1lRWxlbWVudHMvQm9hcmRFbGVtLmpzXCI7XG5pbXBvcnQgeyBwbGFjZVNoaXBSYW5kb21seSB9IGZyb20gXCIuLi9jb21wb25lbnRzL0dhbWUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBhZ2UgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHNob3VsZFVwZGF0ZShvbGRNb2RlbCwgbmV3TW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIG9sZE1vZGVsLmdhbWVTdGF0ZSA9PT0gXCJwbGFjZVNoaXBzXCIgJiZcbiAgICAgICAgICAgIG5ld01vZGVsLmdhbWVTdGF0ZSAhPT0gXCJwbGFjZVNoaXBzXCIgJiZcbiAgICAgICAgICAgIG9sZE1vZGVsLmN1cnJlbnRQYWdlID09PSBcImdhbWVQYWdlXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRHYW1lcGFnZShtb2RlbCk7XG4gICAgfVxuXG4gICAgYnVpbGRHYW1lcGFnZShtb2RlbCkge1xuICAgICAgICBjb25zdCBsZWZ0QnV0dG9uID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWQ6IFwiYWN0aXZhdGVcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyb3RhdGVCdXR0b25cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZWxlbSh7IHByb3A6IFwic3BhblwiIH0pXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG1pZGRsZUJ1dHRvbiA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJidXR0b25cIixcbiAgICAgICAgICAgIGlkOiBcImFjdGl2YXRlXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2VsZW0oeyBwcm9wOiBcInNwYW5cIiB9KV0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByaWdodEJ1dHRvbiA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJidXR0b25cIixcbiAgICAgICAgICAgIGlkOiBcImFjdGl2YXRlXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW2VsZW0oeyBwcm9wOiBcInNwYW5cIiB9KV0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtb2RlbC5nYW1lU3RhdGUgPT09IFwicGxhY2VTaGlwc1wiKSB7XG4gICAgICAgICAgICBsZWZ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlWzBdLmlzSG9yaXpvbnRhbCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAhbmV3TW9kZWwucGxheWVyLnNoaXBRdWV1ZVswXS5pc0hvcml6b250YWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtaWRkbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLmRyb3BRdWV1ZS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvbGRNb2RlbCkpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbmV3R2FtZWJvYXJkLCBuZXdTaGlwIH0gPSBwbGFjZVNoaXBSYW5kb21seShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkID0gbmV3R2FtZWJvYXJkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLmdhbWVib2FyZC5zaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJpZ2h0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmRyb3BRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSBvbGRNb2RlbC5kcm9wUXVldWUucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hpcENvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwQ29udGFpbmVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTaGlwUXVldWUoXG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbCxcbiAgICAgICAgICAgIHNoaXBDb250YWluZXIsXG4gICAgICAgICAgICAoc2hpcEluZGV4LCBjbGlja2VkSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRJbmRleCA9IGNsaWNrZWRJbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdnZWRTaGlwSW5kZXggPSBzaGlwSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzaGlwRm9vdGVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBHYW1lTWVzc2FnZSh0aGlzLnZpZXdNb2RlbCwgbWVzc2FnZUNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgZ2FtZSA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZ2FtZVwiIH0pO1xuXG4gICAgICAgIGlmIChtb2RlbC5nYW1lU3RhdGUgPT09IFwicGxhY2VTaGlwc1wiKSB7XG4gICAgICAgICAgICBuZXcgQm9hcmRFbGVtKHRoaXMudmlld01vZGVsLCBnYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnBsYXllci5zaGlwUXVldWVbdGhpcy5kcmFnZ2VkU2hpcEluZGV4XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImdhbWVDb250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwMUdyaWRDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwidmlkZW9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwid2F2ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHdhdmVzU3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcEJvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwic2hpcEJvd1dvb2RcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsMVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWwyXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDNcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQmFycmVsNFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJkaXZcIiwgY2xhc3NOYW1lOiBcImZsYWtCYXJyZWw1XCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiZmxha0JhcnJlbDZcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJmbGFrQ292ZXJcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZsYWtDb3ZlclRvcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicDFPcHRpb25zQ29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJ1bFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImxpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyYWRhckxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJsaVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmFkYXJMaW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInJhZGFyTGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicDFTaGlwU3RhZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbc2hpcENvbnRhaW5lciwgbWVzc2FnZUNvbnRhaW5lcl0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJ1dHRvbkNvbnRhaW5lclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJsZWZ0QnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYmFzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW2xlZnRCdXR0b25dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnV0dG9uVGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJSb3RhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwibWlkZGxlQnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYmFzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW21pZGRsZUJ1dHRvbl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJidXR0b25UZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcIkF1dG8tcGxhY2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmlnaHRCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJiYXNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbcmlnaHRCdXR0b25dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiYnV0dG9uVGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogXCJVbmRvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGdhbWVDb250YWluZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5pbXBvcnQgZWxlbSBmcm9tIFwiLi9lbGVtLmpzXCI7XG5pbXBvcnQgXCIuLi8uLi9DU1MvaG9tZXBhZ2UuY3NzXCI7XG5pbXBvcnQgSG9tZVBhZ2VJbnB1dCBmcm9tIFwiLi9Ib21lUGFnZUlucHV0LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgY29uc3QgaG9tZXBhZ2VDb250YWluZXIgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwiaG9tZXBhZ2VDb250YWluZXJcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaG9tZXBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcIkJBVFRMRVNISVBcIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiaG9tZUhlYWRlclwiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBuZXdHYW1lID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcIm1haW5cIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJuZXdHYW1lQ29udGFpbmVyXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBIb21lUGFnZUlucHV0KHRoaXMudmlld01vZGVsLCBuZXdHYW1lKTtcblxuICAgICAgICBob21lcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdHYW1lKTtcbiAgICAgICAgaG9tZXBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcInVsXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNtb2tlQ29udGFpbmVyXCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7IHByb3A6IFwibGlcIiwgY2xhc3NOYW1lOiBcInNtb2tlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW0oeyBwcm9wOiBcImxpXCIsIGNsYXNzTmFtZTogXCJzbW9rZVwiIH0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJsaVwiLCBjbGFzc05hbWU6IFwic21va2VcIiB9KSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgaG9tZXBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImZvb3RlclwiLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJmb290ZXJcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICBlbGVtKHsgcHJvcDogXCJzcGFuXCIsIHRleHRDb250ZW50OiBcIkNyZWF0ZWQgYnkgR2x1dHR6LCBcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBcIkltYWdlIGJ5IHVwa2x5YWsgb24gRnJlZXBpa1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogXCJodHRwczovL3d3dy5mcmVlcGlrLmNvbS9mcmVlLXZlY3Rvci9zdW5rZW4tY3J1aXNlLXNoaXAtc2VhLWhhcmJvci1tb3JuaW5nXzIxNTg0OTE1Lmh0bSNxdWVyeT1iYXR0bGVzaGlwJTIwYmFja2dyb3VuZCZwb3NpdGlvbj0zMiZmcm9tX3ZpZXc9c2VhcmNoJnRyYWNrPWFpc1wiLFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gaG9tZXBhZ2VDb250YWluZXI7XG4gICAgfVxufVxuIiwiaW1wb3J0IGVsZW0gZnJvbSBcIi4vZWxlbS5qc1wiO1xuaW1wb3J0IFwiLi4vLi4vQ1NTL25hbWVwYWdlLmNzc1wiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVQYWdlSW5wdXQgZXh0ZW5kcyBQdWJTdWJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgZWxlbWVudCkge1xuICAgICAgICBzdXBlcih2aWV3TW9kZWwsIGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbmRlcih7IG5hbWVQYWdlSXNPcGVuIH0pIHtcbiAgICAgICAgY29uc3QgbmV3R2FtZUJ0biA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBcIk5ldyBHYW1lXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibmV3R2FtZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC51cGRhdGVNb2RlbCgob2xkTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lUGFnZUlzT3BlbjogdHJ1ZSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuYW1lUGFnZUlzT3BlbiA/IHRoaXMuYnVpbGRGb3JtKCkgOiBuZXdHYW1lQnRuO1xuICAgIH1cblxuICAgIGJ1aWxkRm9ybSgpIHtcbiAgICAgICAgY29uc3QgZ3JlZXRpbmcgPSBlbGVtKHsgcHJvcDogXCJwXCIsIHRleHRDb250ZW50OiBcIkhlbGxvIEFkbWlyYWwuLi5cIiB9KTtcbiAgICAgICAgY29uc3QgaW5wdXRGaWVsZCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJpbnB1dFwiLFxuICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJOYW1lXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBidXR0b24gPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IFwiQ29udGludWVcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG5hbWVGaWVsZCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJmb3JtXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibmFtZUZvcm1cIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbaW5wdXRGaWVsZCwgYnV0dG9uXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudXBkYXRlTW9kZWwoKG9sZE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwuY3VycmVudFBhZ2UgPSBcIm1hcFBhZ2VcIjtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIubmFtZSA9IGlucHV0RmllbGQudmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm1Db250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZ3JlZXRpbmcsIG5hbWVGaWVsZF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtQ29udGFpbmVyO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuL2VsZW0uanNcIjtcbmltcG9ydCBcIi4uLy4uL0NTUy9tYXBwYWdlLmNzc1wiO1xuaW1wb3J0IHJlZFBpblNyYyBmcm9tIFwiLi4vLi4vYXNzZXRzL2ltYWdlcy9yZWQtcGluLnBuZ1wiO1xuaW1wb3J0IHN0aWNreU5vdGVTcmMgZnJvbSBcIi4uLy4uL2Fzc2V0cy9pbWFnZXMvc3RpY2t5LW5vdGUuc3ZnXCI7XG5pbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi9QdWJTdWJJbnRlcmZhY2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwUGFnZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHZpZXdNb2RlbCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKHsgc3RhdGVNZXNzYWdlLCBwbGF5ZXIgfSkge1xuICAgICAgICBjb25zdCByZWRQaW5zID0gW1xuICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgICAgICBzcmM6IHJlZFBpblNyYyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmVkUGluMVwiLFxuICAgICAgICAgICAgICAgIGlkOiBcImVhc3lcIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgcHJvcDogXCJpbWdcIixcbiAgICAgICAgICAgICAgICBzcmM6IHJlZFBpblNyYyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwicmVkUGluMlwiLFxuICAgICAgICAgICAgICAgIGlkOiBcIm1lZGl1bVwiLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICBwcm9wOiBcImltZ1wiLFxuICAgICAgICAgICAgICAgIHNyYzogcmVkUGluU3JjLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJyZWRQaW4zXCIsXG4gICAgICAgICAgICAgICAgaWQ6IFwiaGFyZFwiLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF07XG5cbiAgICAgICAgcmVkUGlucy5mb3JFYWNoKChwaW4pID0+IHtcbiAgICAgICAgICAgIHBpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdNb2RlbCA9IHsgLi4ub2xkTW9kZWwgfTtcbiAgICAgICAgICAgICAgICAgICAgbmV3TW9kZWwuY3VycmVudFBhZ2UgPSBcImdhbWVQYWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIG5ld01vZGVsLmdhbWVTdGF0ZSA9IFwicGxhY2VTaGlwc1wiO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFbmVtaWVzIGFwcHJvYWNoLiBEZXBsb3kgdGhlIGZsZWV0LlwiO1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5BSS5kaWZmaWN1bHR5ID0gcGluLmlkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3TW9kZWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzdGF0ZU1lc3NhZ2UgIT09IHBpbi5pZCkge1xuICAgICAgICAgICAgICAgIHBpbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3RhdGVNZXNzYWdlOiBwaW4uaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG1hcCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJtYXBcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiByZWRQaW5zLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc3RhdGVNZXNzYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBub3RlID0gdGhpcy5idWlsZE5vdGUoc3RhdGVNZXNzYWdlLCBwbGF5ZXIpO1xuICAgICAgICAgICAgbWFwLmFwcGVuZENoaWxkKG5vdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICBidWlsZE5vdGUoc3RhdGVNZXNzYWdlLCBwbGF5ZXIpIHtcbiAgICAgICAgY29uc3Qgbm90ZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBub3RlMToge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBcIlNvbWFsaWFuIENvYXN0XCIsXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eTogXCJFYXN5XCIsXG4gICAgICAgICAgICAgICAgcGFyYTogXCJJIHJlZ3JldCB0byBpbmZvcm0geW91IHRoYXQgYSBncm91cCBvZiBTb21hbGlhbiBwaXJhdGVzIGhhdmUgc3VjY2Vzc2Z1bGx5IGNvbW1hbmRlZXJlZCBhbiBJbmRpYW4gY2FycmllciBncm91cCBpbiB0aGUgQXJhYmlhbiBTZWEuIFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGUyOiB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IFwiQmxhY2sgU2VhXCIsXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eTogXCJNZWRpdW1cIixcbiAgICAgICAgICAgICAgICBwYXJhOiBcIkkgYW0gd3JpdGluZyB0byBpbmZvcm0geW91IGFib3V0IGEgZ3JvdXAgb2YgUnVzc2lhbiBwaXJhdGVzIHdobyBoYXZlIGNvbW1hbmRlZXJlZCBhIFJ1c3NpYW4gY2FycmllciBncm91cC4gVGhpcyBncm91cCBpcyBhIHNpZ25pZmljYW50IHRocmVhdCB0byB0aGUgc2FmZXR5IGFuZCBzZWN1cml0eSBvZiB0aGUgYXJlYS5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3RlMzoge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBcIlNvdXRoIENoaW5hIFNlYVwiLFxuICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6IFwiSGFyZFwiLFxuICAgICAgICAgICAgICAgIHBhcmE6IFwiQSBncm91cCBvZiBDaGluZXNlIHBpcmF0ZXMgaGFzIG1hbmFnZWQgdG8gc2VpemUgY29udHJvbCBvZiBhIENoaW5lc2UgY2FycmllciBncm91cCwgYW5kIGl0IHBvc2VzIGEgc2lnbmlmaWNhbnQgdGhyZWF0IHRvIHJlZ2lvbmFsIHNlY3VyaXR5LlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHNlbGVjdGVkT3B0aW9ucyA9IHt9O1xuICAgICAgICBzd2l0Y2ggKHN0YXRlTWVzc2FnZSkge1xuICAgICAgICAgICAgY2FzZSBcImVhc3lcIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnMgPSBub3RlT3B0aW9ucy5ub3RlMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtZWRpdW1cIjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnMgPSBub3RlT3B0aW9ucy5ub3RlMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJoYXJkXCI6XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zID0gbm90ZU9wdGlvbnMubm90ZTM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm90ZSA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJhcnRpY2xlXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwibm90ZUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgaWQ6IHN0YXRlTWVzc2FnZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICAgICAgICAgIHNyYzogc3RpY2t5Tm90ZVNyYyxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInN0aWNreU5vdGVcIixcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInBhcmFDb250YWluZXJcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwicFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBgTG9jYXRpb246ICR7c2VsZWN0ZWRPcHRpb25zLmxvY2F0aW9ufWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3A6IFwicFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50OiBgRGlmZmljdWx0eTogJHtzZWxlY3RlZE9wdGlvbnMuZGlmZmljdWx0eX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wOiBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogYEFkbWlyYWwgJHtwbGF5ZXIubmFtZX0sYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDogXCJwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGAke3NlbGVjdGVkT3B0aW9ucy5wYXJhfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBub3RlO1xuICAgIH1cbn1cbiIsImNvbnN0IGVsZW0gPSAoY29udGVudCwgdmVyc2lvbiA9IDEpID0+IHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbnRlbnRbXCJwcm9wXCJdKTtcbiAgICBsZXQgdGV4dCA9IGNvbnRlbnRbXCJ0ZXh0Q29udGVudFwiXTtcbiAgICBpZiAodGV4dCkge1xuICAgICAgICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgfVxuICAgIGxldCBpZCA9IGNvbnRlbnRbXCJpZFwiXTtcbiAgICBpZiAoaWQpIHtcbiAgICAgICAgZWwuaWQgPSBpZDtcbiAgICB9XG4gICAgbGV0IGNsYXNzTmFtZSA9IGNvbnRlbnRbXCJjbGFzc05hbWVcIl07XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgfVxuICAgIGxldCBIVE1MID0gY29udGVudFtcImlubmVySFRNTFwiXTtcbiAgICBpZiAoSFRNTCkge1xuICAgICAgICBlbC5pbm5lckhUTUwgPSBIVE1MO1xuICAgIH1cbiAgICBsZXQgc3JjID0gY29udGVudFtcInNyY1wiXTtcbiAgICBpZiAoc3JjKSB7XG4gICAgICAgIGVsLnNyYyA9IHNyYztcbiAgICB9XG4gICAgbGV0IGZvckkgPSBjb250ZW50W1wiZm9yXCJdO1xuICAgIGlmIChmb3JJKSB7XG4gICAgICAgIGVsLmZvciA9IGZvckk7XG4gICAgfVxuICAgIGxldCB0eXBlID0gY29udGVudFtcInR5cGVcIl07XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgZWwudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGxldCBuYW1lID0gY29udGVudFtcIm5hbWVcIl07XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgICAgZWwubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IGNvbnRlbnRbXCJ2YWx1ZVwiXTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgbGV0IHBsYWNlaG9sZGVyID0gY29udGVudFtcInBsYWNlaG9sZGVyXCJdO1xuICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICBlbC5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICBsZXQgc3BlbGxjaGVjayA9IGNvbnRlbnRbXCJzcGVsbGNoZWNrXCJdO1xuICAgIGlmIChzcGVsbGNoZWNrKSB7XG4gICAgICAgIGVsLnNwZWxsY2hlY2sgPSBzcGVsbGNoZWNrO1xuICAgIH1cbiAgICBsZXQgcmVxdWlyZWQgPSBjb250ZW50W1wicmVxdWlyZWRcIl07XG4gICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgIGVsLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGNoZWNrZWQgPSBjb250ZW50W1wiY2hlY2tlZFwiXTtcbiAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICBlbC5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGhyZWYgPSBjb250ZW50W1wiaHJlZlwiXTtcbiAgICBpZiAoaHJlZikge1xuICAgICAgICBlbC5ocmVmID0gaHJlZjtcbiAgICB9XG4gICAgbGV0IGF1dG9wbGF5ID0gY29udGVudFtcImF1dG9wbGF5XCJdO1xuICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICBlbC5hdXRvcGxheSA9IHRydWU7XG4gICAgfVxuICAgIGxldCBtdXRlZCA9IGNvbnRlbnRbXCJtdXRlZFwiXTtcbiAgICBpZiAobXV0ZWQpIHtcbiAgICAgICAgZWwubXV0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgbG9vcCA9IGNvbnRlbnRbXCJsb29wXCJdO1xuICAgIGlmIChsb29wKSB7XG4gICAgICAgIGVsLmxvb3AgPSB0cnVlO1xuICAgIH1cbiAgICBsZXQgZHJhZ2dhYmxlID0gY29udGVudFtcImRyYWdnYWJsZVwiXTtcbiAgICBpZiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGVsLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgfVxuICAgIGxldCBjaGlsZHJlbiA9IGNvbnRlbnRbXCJjaGlsZHJlblwiXTtcbiAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmICh2ZXJzaW9uID09PSAyKSB7XG4gICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZWxlbShjaGlsZCwgMikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsO1xufTtcblxuLy8gZnVuY3Rpb24gZWxlbShjb250ZW50KSB7XG4vLyAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGNvbnRlbnRbXCJwcm9wXCJdKTtcblxuLy8gICAgIGZvciAobGV0IGtleSBpbiBjb250ZW50KSB7XG4vLyAgICAgICAgIGlmIChjb250ZW50W2tleV0gPT09IFwicHJvcFwiKSB7XG4vLyAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiY2xhc3NMaXN0XCIpIHtcbi8vICAgICAgICAgICAgIGZvciAobGV0IGNsYXNzTmFtZSBvZiBjb250ZW50W2NsYXNzTGlzdF0pIHtcbi8vICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNvbnRlbnRbY2xhc3NMaXN0XVtjbGFzc05hbWVdKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwiY2hpbGRyZW5cIikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coY29udGVudFtrZXldKTtcbi8vICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNvbnRlbnRba2V5XSkge1xuLy8gICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGVsZW0oY29udGVudFtrZXldW2NoaWxkXSkpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgZWxba2V5XSA9IGNvbnRlbnRba2V5XTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cblxuLy8gICAgIHJldHVybiBlbDtcbi8vIH1cblxuZXhwb3J0IGRlZmF1bHQgZWxlbTtcbiIsImltcG9ydCBQdWJTdWJJbnRlcmZhY2UgZnJvbSBcIi4uLy4uL1B1YlN1YkludGVyZmFjZVwiO1xuaW1wb3J0IGVsZW0gZnJvbSBcIi4uL2VsZW1cIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXBFbGVtXCI7XG5pbXBvcnQgeyBpc1ZhbGlkUGxhY2VtZW50LCBwbGFjZVNoaXAgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9HYW1lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkRWxlbSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50LCBkcmFnRW50ZXIpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICAgICAgdGhpcy5kcmFnRW50ZXIgPSBkcmFnRW50ZXI7XG4gICAgICAgIHRoaXMuYm9hcmRTaXplID0gbnVsbDtcbiAgICB9XG5cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgaWYgKG1vZGVsLmdhbWVTdGF0ZSA9PT0gXCJwbGFjZVNoaXBzXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQm9hcmQobW9kZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRCb2FyZChtb2RlbCkge1xuICAgICAgICBjb25zdCBzaGFkb3dHcmlkID0gZWxlbSh7IHByb3A6IFwiZGl2XCIsIGNsYXNzTmFtZTogXCJzaGFkb3dHcmlkXCIgfSk7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcImRpdlwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJvYXJkXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3NoYWRvd0dyaWRdLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ib2FyZFNpemUgPSBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLnNpemU7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gW107XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMuYm9hcmRTaXplOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5ib2FyZFNpemU7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGVsZW0oeyBwcm9wOiBcImRpdlwiLCBjbGFzc05hbWU6IFwiY2VsbFwiIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbGVSZWYgPSBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXTtcbiAgICAgICAgICAgICAgICAvLyBzZXRzIGRhdGEgdmFsdWVzIGZvciBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgICAgICAgICAgIC8vIGFkZHMgdGhlIGRyYWdlbnRlciBhbmQgZHJvcCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VudGVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJvdW5kKGUsIHJvdywgY29sLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3VuZCA9IHRoaXMuaGFuZGxlRHJvcC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBib3VuZChlLCByb3csIGNvbCwgbW9kZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kID0gdGhpcy5oYW5kbGVEcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBib3VuZChlLCByb3csIGNvbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGVSZWYuc2hpcCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IHNoaXAgZWZmZWN0XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRpbGVSZWYudGlsZVN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGxheSBoaXQgbWFya2VyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgbWlzcyBtYXJrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmRzIHRoZSBjZWxsIHRvIHRoZSBib2FyZCBjb250YWluZXJcbiAgICAgICAgICAgICAgICAvLyBhZGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBET00gY2VsbCB0byB0aGUgY2VsbHMgYXJyYXlcbiAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcblxuICAgICAgICAgICAgICAgIGNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZWxscyA9IGNlbGxzO1xuXG4gICAgICAgIG1vZGVsLnBsYXllci5nYW1lYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcEVsZW0gPSBuZXcgU2hpcChzaGlwLCAoY2xpY2tlZEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jbGlja2VkRXZlbnQoaW5kZXgsIGNsaWNrZWRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VUaWxlID0gc2hpcC50aWxlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IGVuZFRpbGUgPSBzaGlwLnRpbGVzW3NoaXAuc2l6ZSAtIDFdO1xuICAgICAgICAgICAgc2hpcEVsZW0uZWxlbWVudC5zdHlsZS5ncmlkQXJlYSA9IGAke2Jhc2VUaWxlLnJvdyArIDF9IC8gJHtcbiAgICAgICAgICAgICAgICBiYXNlVGlsZS5jb2wgKyAxXG4gICAgICAgICAgICB9IC8gJHtlbmRUaWxlLnJvdyArIDJ9IC8gJHtlbmRUaWxlLmNvbCArIDJ9YDtcbiAgICAgICAgICAgIHNoaXBFbGVtLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvYXJkU2hpcFwiKTtcbiAgICAgICAgICAgIHNoaXBFbGVtLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aWxlLmNsYXNzTGlzdC5hZGQoXCJvbkJvYXJkXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzaGFkb3dHcmlkLmFwcGVuZENoaWxkKHNoaXBFbGVtLmVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGJvYXJkO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdPdmVyKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdMZWF2ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEcmFnRW50ZXIoZSwgcm93LCBjb2wsIG1vZGVsKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgW2NsaWNrZWRJbmRleCwgc2hpcF0gPSB0aGlzLmRyYWdFbnRlcigpO1xuICAgICAgICB0aGlzLmRyYWdnZWRTaGlwID0gc2hpcDtcbiAgICAgICAgdGhpcy5jbGlja2VkSW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICAgIC8vIGdldCBhbGwgdGlsZXMgd2l0aCBwcmlvciBob3ZlciBlZmZlY3RzXG4gICAgICAgIGNvbnN0IHRpbGVzID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJcIiwgXCIudmFsaWRcIiwgXCIuaW52YWxpZFwiKVxuICAgICAgICApO1xuICAgICAgICAvLyBjbGVhciB0aGVpciBob3ZlciBlZmZlY3RzXG4gICAgICAgIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIsIFwiaW52YWxpZFwiLCBcInZhbGlkXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSBzaGlwLmlzSG9yaXpvbnRhbDtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gc2hpcC5zaXplO1xuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGJhc2UgdGlsZSBmb3IgdGhlIGRyYWdnZWQgc2hpcFxuICAgICAgICAvLyBiYXNlZCBvbiB0aGUgc2hpcCBpbmRleCB0aGF0IHdhcyBjbGlja2VkIGFuZCB0aWxlIGN1cnJlbnQgaG92ZXJlZFxuICAgICAgICAvLyAobGVmdCBtb3N0IGZvciBob3Jpem9udGFsLCB0b3AgbW9zdCBmb3IgdmVydGljYWwpXG4gICAgICAgIGNvbnN0IGJhc2VDb29yZHMgPSB0aGlzLmdldEJhc2VUaWxlKHNoaXAsIHJvdywgY29sLCBjbGlja2VkSW5kZXgpO1xuICAgICAgICBjb25zdCBiYXNlUm93ID0gYmFzZUNvb3Jkcy5yb3c7XG4gICAgICAgIGNvbnN0IGJhc2VDb2wgPSBiYXNlQ29vcmRzLmNvbDtcblxuICAgICAgICAvLyBjaGVjayBpZiBob3ZlcmVkIHRpbGVzIGFyZSBhbGwgb24gdGhlIGJvYXJkIGFuZCBkb250IG92ZXJsYXAgYSBzaGlwXG4gICAgICAgIGxldCBpc1ZhbGlkID0gaXNWYWxpZFBsYWNlbWVudChcbiAgICAgICAgICAgIHNoaXAsXG4gICAgICAgICAgICBiYXNlUm93LFxuICAgICAgICAgICAgYmFzZUNvbCxcbiAgICAgICAgICAgIG1vZGVsLnBsYXllci5nYW1lYm9hcmRcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IHJvd09mZnNldCA9IGJhc2VSb3c7XG4gICAgICAgIGxldCBjb2xPZmZzZXQgPSBiYXNlQ29sO1xuXG4gICAgICAgIC8vIGFxdWlyZSB0aGUgZGl2IGZvciBldmVyeSBjZWxsXG4gICAgICAgIC8vIGFuZCBzdHlsZSBhY2NvcmRpbmcgdG8gdmFsaWRpdHlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJvd09mZnNldCA+PSB0aGlzLmJvYXJkU2l6ZSB8fCBjb2xPZmZzZXQgPj0gdGhpcy5ib2FyZFNpemUpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jZWxsc1tOdW1iZXIoYCR7cm93T2Zmc2V0fWAgKyBgJHtjb2xPZmZzZXR9YCldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIGNvbE9mZnNldCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3dPZmZzZXQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICByb3dPZmZzZXQgPSBiYXNlUm93O1xuICAgICAgICAgICAgY29sT2Zmc2V0ID0gYmFzZUNvbDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKHJvd09mZnNldCwgY29sT2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInZhbGlkXCIpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm93T2Zmc2V0ID0gaXNIb3Jpem9udGFsID8gcm93T2Zmc2V0IDogcm93T2Zmc2V0ICsgMTtcbiAgICAgICAgICAgICAgICBjb2xPZmZzZXQgPSBpc0hvcml6b250YWwgPyBjb2xPZmZzZXQgKyAxIDogY29sT2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm93T2Zmc2V0ID0gYmFzZVJvdztcbiAgICAgICAgICAgIGNvbE9mZnNldCA9IGJhc2VDb2w7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChyb3dPZmZzZXQsIGNvbE9mZnNldCk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaW52YWxpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvd09mZnNldCA9IGlzSG9yaXpvbnRhbCA/IHJvd09mZnNldCA6IHJvd09mZnNldCArIDE7XG4gICAgICAgICAgICAgICAgY29sT2Zmc2V0ID0gaXNIb3Jpem9udGFsID8gY29sT2Zmc2V0ICsgMSA6IGNvbE9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURyb3AoZSwgcm93LCBjb2wsIG1vZGVsKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgYmFzZUNvb3JkcyA9IHRoaXMuZ2V0QmFzZVRpbGUoXG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRTaGlwLFxuICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgdGhpcy5jbGlja2VkSW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGJhc2VSb3cgPSBiYXNlQ29vcmRzLnJvdztcbiAgICAgICAgbGV0IGJhc2VDb2wgPSBiYXNlQ29vcmRzLmNvbDtcblxuICAgICAgICBsZXQgaXNWYWxpZCA9IGlzVmFsaWRQbGFjZW1lbnQoXG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRTaGlwLFxuICAgICAgICAgICAgYmFzZVJvdyxcbiAgICAgICAgICAgIGJhc2VDb2wsXG4gICAgICAgICAgICBtb2RlbC5wbGF5ZXIuZ2FtZWJvYXJkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld01vZGVsID0geyAuLi5vbGRNb2RlbCB9O1xuICAgICAgICAgICAgICAgIG5ld01vZGVsLmRyb3BRdWV1ZS5wdXNoKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2xkTW9kZWwpKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuZXdHYW1lYm9hcmQsIG5ld1NoaXAgfSA9IHBsYWNlU2hpcChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2VkU2hpcCxcbiAgICAgICAgICAgICAgICAgICAgYmFzZVJvdyxcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbCxcbiAgICAgICAgICAgICAgICAgICAgb2xkTW9kZWwucGxheWVyLmdhbWVib2FyZFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3R2FtZWJvYXJkLCBuZXdTaGlwKTtcbiAgICAgICAgICAgICAgICAvLyBpZiAob2xkTW9kZWwucGxheWVyLnNoaXBRdWV1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgbmV3TW9kZWwuZ2FtZVN0YXRlID0gXCJpbkdhbWVcIjtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgbmV3TW9kZWwucGxheWVyLmdhbWVib2FyZCA9IG5ld0dhbWVib2FyZDtcbiAgICAgICAgICAgICAgICBuZXdNb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld01vZGVsLnBsYXllci5zaGlwUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2UgPSBgUGxhY2UgeW91ciAke25ld01vZGVsLnBsYXllci5zaGlwUXVldWVbMF0ubmFtZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld01vZGVsLnBsYXllci5nYW1lYm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdNb2RlbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETzogaGFuZGxlIGludmFsaWQgcGxhY2VtZW50IGRyb3BcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiAgY2FsY3VsYXRlcyB0aGUgbGVmdCBtb3N0IG9yIHRvcCBtb3N0IHRpbGUgKi9cbiAgICBnZXRCYXNlVGlsZShzaGlwLCByb3csIGNvbCwgY2xpY2tlZEluZGV4KSB7XG4gICAgICAgIC8vIGdldHMgdGhlIGluZGV4IHRoYXQgdGhlIHNoaXAgd2FzIHBpY2tlZCB1cCBieVxuICAgICAgICBjb25zdCBpbmRleCA9IGNsaWNrZWRJbmRleDtcbiAgICAgICAgbGV0IG9mZnNldFJvdyA9IDA7XG4gICAgICAgIGxldCBvZmZzZXRDb2wgPSAwO1xuXG4gICAgICAgIC8vIG9mZnNldHMgdGhlIGhvdmVyZWQgdGlsZSBhY2NvcmRpbmcgdG8gdGhlIGdyYWJiZWQgaW5kZXhcbiAgICAgICAgaWYgKHNoaXAuaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBvZmZzZXRDb2wgPSBpbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9mZnNldFJvdyA9IGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYmFzZVJvdyA9IHJvdyAtIG9mZnNldFJvdztcbiAgICAgICAgY29uc3QgYmFzZUNvbCA9IGNvbCAtIG9mZnNldENvbDtcblxuICAgICAgICByZXR1cm4geyByb3c6IGJhc2VSb3csIGNvbDogYmFzZUNvbCB9O1xuICAgIH1cblxuICAgIC8qKiAgcmV0dXJucyB0aGUgRE9NIGVsZW1lbnQgZm9yIGEgZ2l2ZW4gY29vcmRpbmF0ZSAqL1xuICAgIGdldENlbGwocm93LCBjb2wpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcm93IDwgMCB8fFxuICAgICAgICAgICAgcm93ID49IHRoaXMuYm9hcmRTaXplIHx8XG4gICAgICAgICAgICBjb2wgPCAwIHx8XG4gICAgICAgICAgICBjb2wgPj0gdGhpcy5ib2FyZFNpemVcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNlbGxzW3JvdyAqIHRoaXMuYm9hcmRTaXplICsgY29sXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUHViU3ViSW50ZXJmYWNlIGZyb20gXCIuLi8uLi9QdWJTdWJJbnRlcmZhY2VcIjtcbmltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNZXNzYWdlIGV4dGVuZHMgUHViU3ViSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgICBzaG91bGRVcGRhdGUob2xkTW9kZWwsIG5ld01vZGVsKSB7XG4gICAgICAgIHJldHVybiBvbGRNb2RlbC5zdGF0ZU1lc3NhZ2UgIT09IG5ld01vZGVsLnN0YXRlTWVzc2FnZTtcbiAgICB9XG5cbiAgICByZW5kZXIoeyBzdGF0ZU1lc3NhZ2UgfSkge1xuICAgICAgICByZXR1cm4gZWxlbSh7XG4gICAgICAgICAgICBwcm9wOiBcInBcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzdGFnZVBhcmFcIixcbiAgICAgICAgICAgIHRleHRDb250ZW50OiBzdGF0ZU1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtXCI7XG5pbXBvcnQgY2FycmllclNyYyBmcm9tIFwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9DYXJyaWVyLnN2Z1wiO1xuaW1wb3J0IGJhdHRsZXNoaXBTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvQmF0dGxlc2hpcDIuc3ZnXCI7XG5pbXBvcnQgZGVzdHJveWVyU3JjIGZyb20gXCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL0Rlc3Ryb3llci5zdmdcIjtcbmltcG9ydCBzdWJtYXJpbmVTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvU3VibWFyaW5lLnN2Z1wiO1xuaW1wb3J0IHBhdHJvbEJvYXRTcmMgZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUGF0cm9sLUJvYXQuc3ZnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKHNoaXAsIGNsaWNrZWRFdmVudCkge1xuICAgICAgICB0aGlzLnNoaXBNb2RlbCA9IHNoaXA7XG5cbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuY2xpY2tlZEluZGV4ID0gbnVsbDtcblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50ID0gY2xpY2tlZEV2ZW50O1xuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgLy9zaGlwcyBjb250YWluZXJcbiAgICAgICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNoaXAuaWQgPSB0aGlzLnNoaXBNb2RlbC5uYW1lO1xuICAgICAgICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICBzaGlwLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIGxldCBzaGlwU3JjID0gbnVsbDtcblxuICAgICAgICBsZXQgc2hpcENsYXNzID0gdGhpcy5zaGlwTW9kZWwuaXNIb3Jpem9udGFsID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gICAgICAgIHNoaXAuY2xhc3NMaXN0LmFkZChzaGlwQ2xhc3MpO1xuXG4gICAgICAgIC8vIG1hdGNoZXMgbmFtZSBvZiBzaGlwIHRvIHRoZSBpbWFnZSBzb3VyY2UgZmlsZVxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2hpcE1vZGVsLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJDYXJyaWVyXCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IGNhcnJpZXJTcmM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiQmF0dGxlc2hpcFwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBiYXR0bGVzaGlwU3JjO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkRlc3Ryb3llclwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBkZXN0cm95ZXJTcmM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiU3VibWFyaW5lXCI6XG4gICAgICAgICAgICAgICAgc2hpcFNyYyA9IHN1Ym1hcmluZVNyYztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQYXRyb2wtQm9hdFwiOlxuICAgICAgICAgICAgICAgIHNoaXBTcmMgPSBwYXRyb2xCb2F0U3JjO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlcyB0aGUgaW5uZXIgZGl2cyBmb3IgZWFjaCBzaGlwXG4gICAgICAgIC8vIGJhc2VkIG9uIHRoZSBzaXplXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwTW9kZWwuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcInRpbGVcIik7XG4gICAgICAgICAgICB0aWxlLmRhdGFzZXQuYm9hdCA9IHRoaXMuc2hpcE1vZGVsLm5hbWU7XG4gICAgICAgICAgICB0aWxlLmRhdGFzZXQudGlsZSA9IGk7XG4gICAgICAgICAgICB0aWxlLmRyYWdnYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvL2FkZCBoZWFkIGNsYXNzIHRvIGZyb250IGZvciBzdHlsaW5nXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgdGlsZS5jbGFzc0xpc3QuYWRkKFwiaGVhZFwiKTtcbiAgICAgICAgICAgIC8vYWRkIHRhaWwgY2xhc3MgdG8gdGFpbCBmb3Igc3R5bGluZ1xuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5zaGlwTW9kZWwuc2l6ZSAtIDEpIHRpbGUuY2xhc3NMaXN0LmFkZChcInRhaWxcIik7XG5cbiAgICAgICAgICAgIC8vIGFkZHMgY2xpY2sgbGlzdGVuZXIgdG8gc2V0IGNsaWNrZWQgaW5kZXhcbiAgICAgICAgICAgIHRpbGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZEV2ZW50KGkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aWxlcyB0byB0aGUgc2hpcFxuICAgICAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICAgICAgc2hpcC5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNwaWNlIHVwIHRoZSBzaGlwIGRpc3BsYXlcbiAgICAgICAgY29uc3Qgc2hpcE92ZXJsYXkgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiaW1nXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IGBzaGlwT3ZlcmxheWAsXG4gICAgICAgICAgICBpZDogYCR7dGhpcy5zaGlwTW9kZWwubmFtZX1PdmVybGF5YCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHNoaXBPdmVybGF5O1xuICAgICAgICBzaGlwT3ZlcmxheS5zcmMgPSBzaGlwU3JjO1xuICAgICAgICBsZXQgb3ZlcmxheUNsYXNzID0gdGhpcy5zaGlwTW9kZWwuaXNIb3Jpem9udGFsXG4gICAgICAgICAgICA/IFwiaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICA6IFwidmVydGljYWxcIjtcbiAgICAgICAgc2hpcE92ZXJsYXkuY2xhc3NMaXN0LmFkZChvdmVybGF5Q2xhc3MpO1xuICAgICAgICBzaGlwT3ZlcmxheS5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgc2hpcC5hcHBlbmRDaGlsZChzaGlwT3ZlcmxheSk7XG5cbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBib3VuZCA9IHRoaXMuaGFuZGxlRHJhZ1N0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBib3VuZChlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzaGlwO1xuICAgIH1cblxuICAgIGhhbmRsZURyYWdTdGFydChlKSB7XG4gICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgICAgICAgdGlsZS5zdHlsZS53aWR0aCA9IFwiNDBweFwiO1xuICAgICAgICAgICAgdGlsZS5zdHlsZS5oZWlnaHQgPSBcIjQwcHhcIjtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRpbGUuc3R5bGUud2lkdGggPSBcIjMwcHhcIjtcbiAgICAgICAgICAgICAgICB0aWxlLnN0eWxlLmhlaWdodCA9IFwiMzBweFwiO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBlbGVtIGZyb20gXCIuLi9lbGVtLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwRWxlbS5qc1wiO1xuaW1wb3J0IFB1YlN1YkludGVyZmFjZSBmcm9tIFwiLi4vLi4vUHViU3ViSW50ZXJmYWNlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBRdWV1ZSBleHRlbmRzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50LCBjbGlja2VkRXZlbnQpIHtcbiAgICAgICAgc3VwZXIodmlld01vZGVsLCBlbGVtZW50KTtcbiAgICAgICAgdGhpcy5jbGlja2VkRXZlbnQgPSBjbGlja2VkRXZlbnQ7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gbmV3TW9kZWwuZ2FtZVN0YXRlID09PSBcInBsYWNlU2hpcHNcIjtcbiAgICB9XG5cbiAgICByZW5kZXIobW9kZWwpIHtcbiAgICAgICAgaWYgKG1vZGVsLnBsYXllci5zaGlwUXVldWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgc2hpcHMgcGxhY2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUXVldWUobW9kZWwpO1xuICAgIH1cblxuICAgIGJ1aWxkUXVldWUobW9kZWwpIHtcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwic2hpcFF1ZXVlXCIsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV4dCA9IGVsZW0oe1xuICAgICAgICAgICAgcHJvcDogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJuZXh0U2hpcENvbnRhaW5lclwiLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcXVldWUgPSBlbGVtKHtcbiAgICAgICAgICAgIHByb3A6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IFwicXVldWVDb250YWluZXJcIixcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbc3RhZ2UsIG5leHRdLFxuICAgICAgICB9KTtcblxuICAgICAgICBtb2RlbC5wbGF5ZXIuc2hpcFF1ZXVlLmZvckVhY2goKHNoaXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwRWxlbSA9IG5ldyBTaGlwKHNoaXAsIChjbGlja2VkSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRFdmVudChpbmRleCwgY2xpY2tlZEluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1vZGVsLnN0YXRlTWVzc2FnZS5pbmNsdWRlcyhcIkVuZW1pZXNcIikpIHtcbiAgICAgICAgICAgICAgICBzaGlwRWxlbS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnVwZGF0ZU1vZGVsKChvbGRNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kZWwgPSB7IC4uLm9sZE1vZGVsIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNb2RlbC5zdGF0ZU1lc3NhZ2UgPSBgUGxhY2UgeW91ciAke25ld01vZGVsLnBsYXllci5zaGlwUXVldWVbMF0ubmFtZX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld01vZGVsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dC5hcHBlbmRDaGlsZChzaGlwRWxlbS5lbGVtZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhZ2UucHJlcGVuZChzaGlwRWxlbS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHF1ZXVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1YlN1YkludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBlbGVtZW50KSB7XG4gICAgICAgIHRoaXMudmlld01vZGVsID0gdmlld01vZGVsO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLm9uSW5pdCgpO1xuICAgIH1cblxuICAgIG9uSW5pdCgpIHtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwucmVnaXN0ZXIodGhpcyk7XG4gICAgfVxuXG4gICAgc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNb2RlbCB7XG4gICAgY29uc3RydWN0b3IobW9kZWwpIHtcbiAgICAgICAgdGhpcy5wdWJzdWJzID0gW107XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB9XG5cbiAgICByZWdpc3RlcihwdWJzdWIpIHtcbiAgICAgICAgdGhpcy5wdWJzdWJzLnB1c2gocHVic3ViKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHB1YnN1Yi5nZXRFbGVtZW50KCk7XG4gICAgICAgIC8vIFRPRE86IGNoZWNrIGlmIGFueSBvdGhlciBwdWJzdWJzIGFyZSB0aWVkIHRvIHRoaXMgZWxlbWVudCBeLiAgSWYgdGhleSBhcmUsIHJlbW92ZSB0aGVtIGZyb20gdGhlIHB1YnN1YiBsaXN0XG4gICAgICAgIGVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKHB1YnN1Yi5yZW5kZXIodGhpcy5tb2RlbCkpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKG1vZGVsVXBkYXRlRnVuYykge1xuICAgICAgICBjb25zdCBvbGRNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tb2RlbCkpO1xuICAgICAgICBjb25zdCBuZXdNb2RlbCA9IG1vZGVsVXBkYXRlRnVuYyhvbGRNb2RlbCk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5ld01vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsW2tleV0gPSBuZXdNb2RlbFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHB1YnN1YiBvZiB0aGlzLnB1YnN1YnMpIHtcbiAgICAgICAgICAgIGlmIChwdWJzdWIuc2hvdWxkVXBkYXRlKG9sZE1vZGVsLCBuZXdNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcHVic3ViLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2VDaGlsZHJlbihwdWJzdWIucmVuZGVyKHRoaXMubW9kZWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFJIGV4dGVuZHMgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc3VwZXIubmFtZSA9IFwiQUlcIjtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHR5ID0gbnVsbDtcbiAgICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IEFJIGZyb20gXCIuL0FJXCI7XG5cbi8vIG1vZGVsXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgICAgIHRoaXMuQUkgPSBuZXcgQUkoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VHVybiA9IFwicGxheWVyXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBcImhvbWVQYWdlXCI7XG4gICAgICAgIHRoaXMubmFtZVBhZ2VJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZU1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZHJvcFF1ZXVlID0gW107XG4gICAgfVxufVxuXG4vLyBhc3N1bWVzIHJvdyAvIGNvbCBhcmUgdGhlIGJhc2UgdGlsZSBvZiB0aGUgc2hpcFxuZnVuY3Rpb24gaXNWYWxpZFBsYWNlbWVudChzaGlwLCByb3csIGNvbCwgZ2FtZWJvYXJkKSB7XG4gICAgLy8gY2hlY2tzIGlmIGFsbCBob3ZlcmVkIHRpbGVzIGFyZSBvbiB0aGUgYm9hcmRcblxuICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBjb2wgKyBzaGlwLnNpemUgPiBnYW1lYm9hcmQuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gZmFsc2UgJiYgcm93ICsgc2hpcC5zaXplID4gZ2FtZWJvYXJkLnNpemUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBpdGVyYXRlcyBvdmVyIGV2ZXJ5IHRpbGVcbiAgICAvLyBhbmQgY2hlY2tzIGlmIHRoZSBnYW1lYm9hcmQgY29udGFpbnMgYSBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkrKykge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd10pIHtcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uc2hpcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByb3crKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBnYW1lYm9hcmQpIHtcbiAgICBsZXQgbmV3R2FtZWJvYXJkID0geyAuLi5nYW1lYm9hcmQgfTtcbiAgICBsZXQgbmV3U2hpcCA9IHsgLi4uc2hpcCB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNpemU7IGkrKykge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW3Jvd10pIHtcbiAgICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uc2hpcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdHYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdLnNoaXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBuZXdTaGlwLnRpbGVzLnB1c2gobmV3R2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXAuaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2wrKztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdysrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ0aGlzIHNob3VsZG4ndCBoYXBwZW5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwidGhpcyBzaG91bGRuJ3QgaGFwcGVuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG5ld0dhbWVib2FyZCwgbmV3U2hpcCB9O1xufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXBSYW5kb21seShzaGlwLCBnYW1lYm9hcmQpIHtcbiAgICBzaGlwLmlzSG9yaXpvbnRhbCA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG5cbiAgICBjb25zdCByYW5kUm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IHJhbmRDb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICBjb25zdCBpc1ZhbGlkID0gaXNWYWxpZFBsYWNlbWVudChzaGlwLCByYW5kUm93LCByYW5kQ29sLCBnYW1lYm9hcmQpO1xuXG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHBsYWNlU2hpcChzaGlwLCByYW5kUm93LCByYW5kQ29sLCBnYW1lYm9hcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwbGFjZVNoaXBSYW5kb21seShzaGlwLCBnYW1lYm9hcmQpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgaXNWYWxpZFBsYWNlbWVudCwgcGxhY2VTaGlwLCBwbGFjZVNoaXBSYW5kb21seSB9O1xuIiwiaW1wb3J0IFRpbGUgZnJvbSBcIi4vVGlsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgICAgICAvLyB0aGlzLm9yaWVudGF0aW9uID0gdHJ1ZTsgLy90cnVlIHZlcnRpY2FsLCBmYWxzZSBob3Jpem9udGFsXG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnNpemU7IHJvdysrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3Jvd10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuc2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IG5ldyBUaWxlKHJvdywgY29sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vR2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG4gICAgICAgIHRoaXMuc2hpcFF1ZXVlID0gW1xuICAgICAgICAgICAgbmV3IFNoaXAoNSwgXCJDYXJyaWVyXCIpLFxuICAgICAgICAgICAgbmV3IFNoaXAoNCwgXCJCYXR0bGVzaGlwXCIpLFxuICAgICAgICAgICAgbmV3IFNoaXAoMywgXCJEZXN0cm95ZXJcIiksXG4gICAgICAgICAgICBuZXcgU2hpcCgzLCBcIlN1Ym1hcmluZVwiKSxcbiAgICAgICAgICAgIG5ldyBTaGlwKDIsIFwiUGF0cm9sLUJvYXRcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmhpdHMgPSAwO1xuICAgICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0hvcml6b250YWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKHJvdywgY29sKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5zaGlwID0gbnVsbDtcbiAgICAgICAgdGhpcy50aWxlU3RhdHVzID0gbnVsbDtcbiAgICAgICAgLy8gbnVsbCBIIE1cbiAgICB9XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ZvbnRzL0JsYWNrT3BzT25lLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9mb250cy9QcmVzc1N0YXJ0LnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvaG9tZXNjcmVlbi5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcbkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbn1cXG5cXG4qIHtcXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uaG9tZXBhZ2VDb250YWluZXIge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogZ3JleTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhvbWVIZWFkZXIge1xcbiAgICBtYXJnaW46IDRyZW0gMDtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiA3cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCAjYThhOGE4LCAxcHggMnB4IDFweCAjYThhOGE4LCAxcHggM3B4IDFweCAjYThhOGE4LFxcbiAgICAgICAgMXB4IDRweCAxcHggI2E4YThhOCwgMXB4IDVweCAxcHggI2E4YThhOCwgMXB4IDZweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA3cHggMXB4ICNhOGE4YTgsIDFweCA4cHggMXB4ICNhOGE4YTg7XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLm5ld0dhbWUge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjRyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjE4NSk7XFxufVxcblxcbi5uZXdHYW1lOmhvdmVyIHtcXG4gICAgY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHR5cGluZyB7XFxuICAgIGZyb20ge1xcbiAgICAgICAgd2lkdGg6IDA7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBibGluay1jYXJldCB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogZ3JleTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2VDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogNDAlO1xcbiAgICBsZWZ0OiA2NSU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5zbW9rZSB7XFxuICAgICAgICBsZWZ0OiA3NSU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XFxuICAgIC5zbW9rZUNvbnRhaW5lciB7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG5cXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA1cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2Uge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHdpZHRoOiA4MHB4O1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMyNjI2MjY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlRXZlbiAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnNtb2tlOm50aC1jaGlsZChvZGQpIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlT2RkIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDkpIHtcXG4gICAgYW5pbWF0aW9uOiBub25lO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZUV2ZW4ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlT2RkIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDEpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgyKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC40cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgzKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC44cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg0KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS4ycztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg1KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS42cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg2KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNykge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuNHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoOCkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuOHM7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvaG9tZXBhZ2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0JBQXNCO0lBQ3RCLDRDQUEyQztBQUMvQztBQUNBO0lBQ0ksdUJBQXVCO0lBQ3ZCLDRDQUEwQztBQUM5Qzs7QUFFQTtJQUNJLDJCQUEyQjtJQUMzQixVQUFVO0lBQ1YsU0FBUztJQUNULHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsNkJBQTZCO0lBQzdCLHlEQUF3RDtJQUN4RCxzQkFBc0I7SUFDdEIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksY0FBYztJQUNkLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCOztnREFFNEM7QUFDaEQ7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsNkJBQTZCO0lBQzdCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsc0JBQXNCO0lBQ3RCLHdFQUF3RTtJQUN4RSxlQUFlO0lBQ2YsMENBQTBDO0FBQzlDOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJO1FBQ0ksUUFBUTtJQUNaO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7QUFDSjs7QUFFQTtJQUNJOztRQUVJLHlCQUF5QjtJQUM3QjtJQUNBO1FBQ0ksa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLFNBQVM7SUFDVCwyQkFBMkI7SUFDM0IsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJO1FBQ0ksU0FBUztJQUNiO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFNBQVM7SUFDYjs7SUFFQTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksZUFBZTtRQUNmLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksaUJBQWlCO0lBQ3JCO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7UUFDZixtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLGlCQUFpQjtJQUNyQjtBQUNKOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksMkNBQTJDO0FBQy9DO0FBQ0E7SUFDSSwwQ0FBMEM7QUFDOUM7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0k7UUFDSSxtQ0FBbUM7UUFDbkMsVUFBVTtRQUNWLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0ksNENBQTRDO1FBQzVDLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksbUNBQW1DO1FBQ25DLFVBQVU7UUFDVixrQkFBa0I7SUFDdEI7SUFDQTtRQUNJLDZDQUE2QztRQUM3QyxVQUFVO1FBQ1Ysa0JBQWtCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0ksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7QUFDQTtJQUNJLHFCQUFxQjtBQUN6QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgc3JjOiB1cmwoXFxcIi4uL2Fzc2V0cy9mb250cy9CbGFja09wc09uZS50dGZcXFwiKTtcXG59XFxuQGZvbnQtZmFjZSB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBzcmM6IHVybChcXFwiLi4vYXNzZXRzL2ZvbnRzL1ByZXNzU3RhcnQudHRmXFxcIik7XFxufVxcblxcbioge1xcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuI2NvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5ob21lcGFnZUNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGNvbG9yOiBncmV5O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIuLi9hc3NldHMvaW1hZ2VzL2hvbWVzY3JlZW4uanBnXFxcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLmhvbWVIZWFkZXIge1xcbiAgICBtYXJnaW46IDRyZW0gMDtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiA3cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCAjYThhOGE4LCAxcHggMnB4IDFweCAjYThhOGE4LCAxcHggM3B4IDFweCAjYThhOGE4LFxcbiAgICAgICAgMXB4IDRweCAxcHggI2E4YThhOCwgMXB4IDVweCAxcHggI2E4YThhOCwgMXB4IDZweCAxcHggI2E4YThhOCxcXG4gICAgICAgIDFweCA3cHggMXB4ICNhOGE4YTgsIDFweCA4cHggMXB4ICNhOGE4YTg7XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLm5ld0dhbWUge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjRyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjE4NSk7XFxufVxcblxcbi5uZXdHYW1lOmhvdmVyIHtcXG4gICAgY29sb3I6IGRhcmtncmF5O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHR5cGluZyB7XFxuICAgIGZyb20ge1xcbiAgICAgICAgd2lkdGg6IDA7XFxuICAgIH1cXG4gICAgdG8ge1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBibGluay1jYXJldCB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogZ3JleTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2VDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIGJvdHRvbTogNDAlO1xcbiAgICBsZWZ0OiA2NSU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAgIC5zbW9rZSB7XFxuICAgICAgICBsZWZ0OiA3NSU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XFxuICAgIC5zbW9rZUNvbnRhaW5lciB7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG5cXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA1cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiA0cmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLmhvbWVIZWFkZXIge1xcbiAgICAgICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcXG4gICAgfVxcbiAgICAubmV3R2FtZSB7XFxuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2Uge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHdpZHRoOiA4MHB4O1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMyNjI2MjY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDE1cHgpO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKGV2ZW4pIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlRXZlbiAzLjVzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnNtb2tlOm50aC1jaGlsZChvZGQpIHtcXG4gICAgYW5pbWF0aW9uOiBhbmltYXRlT2RkIDMuNXMgbGluZWFyIGluZmluaXRlO1xcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDkpIHtcXG4gICAgYW5pbWF0aW9uOiBub25lO1xcbiAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxufVxcblxcbkBrZXlmcmFtZXMgYW5pbWF0ZUV2ZW4ge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSBzY2FsZSgxKTtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTBweCk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCwgLTUwMHB4KSBzY2FsZSgzKTtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMTVweCk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRlT2RkIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCkgc2NhbGUoMSk7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICAgICAgZmlsdGVyOiBibHVyKDEwcHgpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMHB4LCAtNTAwcHgpIHNjYWxlKDMpO1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgICAgIGZpbHRlcjogYmx1cigxNXB4KTtcXG4gICAgfVxcbn1cXG5cXG4uc21va2U6bnRoLWNoaWxkKDEpIHtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgyKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC40cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCgzKSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMC44cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg0KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS4ycztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg1KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS42cztcXG59XFxuLnNtb2tlOm50aC1jaGlsZCg2KSB7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMnM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoNykge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuNHM7XFxufVxcbi5zbW9rZTpudGgtY2hpbGQoOCkge1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDIuOHM7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ZvbnRzL0thbGFtLVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi4vYXNzZXRzL2ltYWdlcy9tYXAuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogS2FsYW07XFxuICAgIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG59XFxuXFxuLm1hcCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGFuaW1hdGlvbjogdW5ibHVyIDAuNXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyB1bmJsdXIge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMCk7XFxuICAgIH1cXG59XFxuLnJlZFBpbjEge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDElO1xcbiAgICBsZWZ0OiA2MyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxOSU7XFxuICAgIGxlZnQ6IDU3JTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcbi5yZWRQaW4zIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODElO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuXFxuLnJlZFBpbjE6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcbi5yZWRQaW4zOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5vdGVDb250YWluZXIge1xcbiAgICB3aWR0aDogMjUwcHg7XFxuICAgIGhlaWdodDogMjUwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiA2MCU7XFxuICAgIGxlZnQ6IDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTFkZWcpO1xcbiAgICBhbmltYXRpb246IGZseSAwLjFzIGxpbmVhcjtcXG59XFxuLnBhcmFDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTBweDtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcbiAgICB0cmFuc2Zvcm06IHNrZXcoLTJkZWcsIC0yZGVnKTtcXG59XFxuXFxuLnN0aWNreU5vdGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTgwcHg7XFxuICAgIGxlZnQ6IC03MHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGhlaWdodDogNDAwcHg7XFxufVxcblxcbkBrZXlmcmFtZXMgZmx5IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwMCUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE2MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQxJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIyJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjMlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNCU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEzMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODElO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NCU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDg0JTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjUlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NyU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY3JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTglO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogOTAlO1xcbiAgICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1MvbWFwcGFnZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxrQkFBa0I7SUFDbEIsNENBQTZDO0FBQ2pEOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIseURBQWlEO0lBQ2pELHNCQUFzQjtJQUN0QiwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBQzdCLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJO0lBQ0E7SUFDQTtRQUNJLGVBQWU7SUFDbkI7QUFDSjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixTQUFTO0lBQ1QsZUFBZTtJQUNmLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGVBQWU7SUFDZixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDtBQUNBO0lBQ0ksVUFBVTtBQUNkO0FBQ0E7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGVBQWU7SUFDZixRQUFRO0lBQ1IsU0FBUztJQUNULHdCQUF3QjtJQUN4QiwwQkFBMEI7QUFDOUI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsV0FBVztJQUNYLFlBQVk7SUFDWixhQUFhO0FBQ2pCOztBQUVBO0lBQ0k7UUFDSSwyQkFBMkI7SUFDL0I7SUFDQTtJQUNBO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksVUFBVTtRQUNWLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7SUFDQTtRQUNJLFVBQVU7UUFDVixTQUFTO0lBQ2I7SUFDQTtRQUNJLFFBQVE7UUFDUixTQUFTO0lBQ2I7QUFDSjtBQUNBO0lBQ0k7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsU0FBUztJQUNiO0lBQ0E7UUFDSSxRQUFRO1FBQ1IsU0FBUztJQUNiO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtJQUNBO1FBQ0ksVUFBVTtRQUNWLFNBQVM7SUFDYjtJQUNBO1FBQ0ksUUFBUTtRQUNSLFNBQVM7SUFDYjtBQUNKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgICBmb250LWZhbWlseTogS2FsYW07XFxuICAgIHNyYzogdXJsKFxcXCIuLi9hc3NldHMvZm9udHMvS2FsYW0tUmVndWxhci50dGZcXFwiKTtcXG59XFxuXFxuLm1hcCB7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi4uL2Fzc2V0cy9pbWFnZXMvbWFwLmpwZ1xcXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAgIGFuaW1hdGlvbjogdW5ibHVyIDAuNXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyB1bmJsdXIge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBmaWx0ZXI6IGJsdXIoMCk7XFxuICAgIH1cXG59XFxuLnJlZFBpbjEge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDElO1xcbiAgICBsZWZ0OiA2MyU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgb3BhY2l0eTogMC45O1xcbn1cXG4ucmVkUGluMiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxOSU7XFxuICAgIGxlZnQ6IDU3JTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvcGFjaXR5OiAwLjk7XFxufVxcbi5yZWRQaW4zIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODElO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG9wYWNpdHk6IDAuOTtcXG59XFxuXFxuLnJlZFBpbjE6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG4ucmVkUGluMjpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcbi5yZWRQaW4zOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5vdGVDb250YWluZXIge1xcbiAgICB3aWR0aDogMjUwcHg7XFxuICAgIGhlaWdodDogMjUwcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiA2MCU7XFxuICAgIGxlZnQ6IDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTFkZWcpO1xcbiAgICBhbmltYXRpb246IGZseSAwLjFzIGxpbmVhcjtcXG59XFxuLnBhcmFDb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTBweDtcXG4gICAgZm9udC1mYW1pbHk6IEthbGFtO1xcbiAgICB0cmFuc2Zvcm06IHNrZXcoLTJkZWcsIC0yZGVnKTtcXG59XFxuXFxuLnN0aWNreU5vdGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTgwcHg7XFxuICAgIGxlZnQ6IC03MHB4O1xcbiAgICB3aWR0aDogNDAwcHg7XFxuICAgIGhlaWdodDogNDAwcHg7XFxufVxcblxcbkBrZXlmcmFtZXMgZmx5IHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwMCUpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNzAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MSU7XFxuICAgICAgICBsZWZ0OiA2MyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyMSU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE2MDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQxJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDIyJTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDgwJTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjMlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjMlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODAlO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNDAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2MiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNCU7XFxuICAgICAgICBsZWZ0OiA1NiU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4MCU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEzMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDYzJTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTYlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogODElO1xcbiAgICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLnJlZFBpbjEge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA2NCU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjIge1xcbiAgICAgICAgdG9wOiAyNC41JTtcXG4gICAgICAgIGxlZnQ6IDU2JTtcXG4gICAgfVxcbiAgICAucmVkUGluMyB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDg0JTtcXG4gICAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAgIC5yZWRQaW4xIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogNjUlO1xcbiAgICB9XFxuICAgIC5yZWRQaW4yIHtcXG4gICAgICAgIHRvcDogMjQuNSU7XFxuICAgICAgICBsZWZ0OiA1NyU7XFxuICAgIH1cXG4gICAgLnJlZFBpbjMge1xcbiAgICAgICAgdG9wOiA0MCU7XFxuICAgICAgICBsZWZ0OiA4NyU7XFxuICAgIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xcbiAgICAucmVkUGluMSB7XFxuICAgICAgICB0b3A6IDQwJTtcXG4gICAgICAgIGxlZnQ6IDY3JTtcXG4gICAgfVxcbiAgICAucmVkUGluMiB7XFxuICAgICAgICB0b3A6IDI0LjUlO1xcbiAgICAgICAgbGVmdDogNTglO1xcbiAgICB9XFxuICAgIC5yZWRQaW4zIHtcXG4gICAgICAgIHRvcDogNDAlO1xcbiAgICAgICAgbGVmdDogOTAlO1xcbiAgICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5uZXdHYW1lQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAycmVtO1xcbn1cXG5cXG4ubmV3R2FtZUNvbnRhaW5lciBwIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICBmb250LXdlaWdodDogNzAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCBncmV5O1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBtYXJnaW46IDAgYXV0byBhdXRvIGF1dG87XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjJyZW07XFxuICAgIGFuaW1hdGlvbjogdHlwaW5nIDJzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldCAwLjc1cyBzdGVwLWVuZCBpbmZpbml0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZ2FwOiAxMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgcGFkZGluZzogMXJlbSAxcmVtO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgY2FyZXQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggM3B4IDVweCAjYThhOGE4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogM3B4O1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dDpmb2N1cyB7XFxuICAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5uYW1lRm9ybSBpbnB1dDo6cGxhY2Vob2xkZXIge1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b24ge1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgY29sb3I6IHJnYig3MSwgNzEsIDcxKTtcXG4gICAgb3BhY2l0eTogMC44O1xcbn1cXG5cXG4ubmFtZUZvcm0gYnV0dG9uOmhvdmVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLmhpZGUge1xcbiAgICBhbmltYXRpb246IGJ1cm4gMXMgbGluZWFyO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG59XFxuXFxuQGtleWZyYW1lcyBidXJuIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcXG4gICAgLm5hbWVGb3JtIGlucHV0IHtcXG4gICAgICAgIHdpZHRoOiA4MCU7XFxuICAgIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL0NTUy9uYW1lcGFnZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixTQUFTO0FBQ2I7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHNCQUFzQjtJQUN0Qix3RUFBd0U7QUFDNUU7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCx1QkFBdUI7SUFDdkIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixhQUFhO0lBQ2IsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQiwrQkFBK0I7SUFDL0IsbUJBQW1CO0lBQ25CLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLGVBQWU7SUFDZixlQUFlO0lBQ2YsWUFBWTtJQUNaLDZCQUE2QjtJQUM3QixzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSTtJQUNBO0lBQ0E7UUFDSSxVQUFVO0lBQ2Q7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksVUFBVTtJQUNkO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm5ld0dhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDJyZW07XFxufVxcblxcbi5uZXdHYW1lQ29udGFpbmVyIHAge1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcmVtIHNvbGlkIGdyZXk7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG1hcmdpbjogMCBhdXRvIGF1dG8gYXV0bztcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMnMgc3RlcHMoNDAsIGVuZCksIGJsaW5rLWNhcmV0IDAuNzVzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG4ubmFtZUZvcm0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBnYXA6IDEwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubmFtZUZvcm0gaW5wdXQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICBmb250LWZhbWlseTogUHJlc3NTdGFydDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAxcmVtIDFyZW07XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgb3V0bGluZTogbm9uZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBjYXJldC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IDNweCAzcHggNXB4ICNhOGE4YTg7XFxuICAgIGxldHRlci1zcGFjaW5nOiAzcHg7XFxuICAgIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OmZvY3VzIHtcXG4gICAgb3BhY2l0eTogMTtcXG59XFxuXFxuLm5hbWVGb3JtIGlucHV0OjpwbGFjZWhvbGRlciB7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLm5hbWVGb3JtIGJ1dHRvbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBCbGFja09wczE7XFxuICAgIGZvbnQtc2l6ZTogMnJlbTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBjb2xvcjogcmdiKDcxLCA3MSwgNzEpO1xcbiAgICBvcGFjaXR5OiAwLjg7XFxufVxcblxcbi5uYW1lRm9ybSBidXR0b246aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4uaGlkZSB7XFxuICAgIGFuaW1hdGlvbjogYnVybiAxcyBsaW5lYXI7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJ1cm4ge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA1MDBweCkge1xcbiAgICAubmFtZUZvcm0gaW5wdXQge1xcbiAgICAgICAgd2lkdGg6IDgwJTtcXG4gICAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuZ2FtZUNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuLnF1ZXVlQ29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnAxT3B0aW9uc0NvbnRhaW5lciB7XFxuICAgIGZsZXg6IDEuMztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDE0NCwgMTQ0LCAxNDQpO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDE0NCwgMTQ0LCAxNDQsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNDAsIDE0MCwgMTQwLCAxKSAxMSUsXFxuICAgICAgICByZ2JhKDEzNiwgMTM2LCAxMzYsIDEpIDIxJSxcXG4gICAgICAgIHJnYmEoMTQ0LCAxNDQsIDE0NCwgMSkgNjklLFxcbiAgICAgICAgcmdiYSgxMzgsIDEzOCwgMTM4LCAxKSA4NyUsXFxuICAgICAgICByZ2JhKDE2OCwgMTY4LCAxNjgsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgbWluLWhlaWdodDogMjAwcHg7XFxufVxcbi5wMUdyaWRDb250YWluZXIge1xcbiAgICBmbGV4OiAzO1xcblxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgZmxleDogMjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuXFxuLnJhZGFyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICB3aWR0aDogMjYzcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBib3JkZXI6IDEwcHggc29saWQgIzZkNmQ2ZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IDNweCAxMHB4IDAgI2M1YzVjNSwgaW5zZXQgMCAwIDUwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSksXFxuICAgICAgICAtNXB4IC01cHggMjBweCBibGFjaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDIpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoMyksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg0KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGhlaWdodDogMXB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogcmdiKDQ5LCAxNTgsIDQ5KTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDIpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDMpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg1KSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDYpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAyNTUsIDAsIDEpO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDUpIHtcXG4gICAgd2lkdGg6IDc1cHg7XFxuICAgIGhlaWdodDogNzVweDtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg2KSB7XFxuICAgIHdpZHRoOiAxNzVweDtcXG4gICAgaGVpZ2h0OiAxNzVweDtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg3KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjMDBmZjAwIDAlLCB0cmFuc3BhcmVudCA1MCUpO1xcbiAgICBhbmltYXRpb246IHJhZGFyIDJzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoOCkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiA3NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDkpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogNzUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxMCkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNDUlO1xcbiAgICBsZWZ0OiA4NSU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDExKSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMTIpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogODAlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuXFxuQGtleWZyYW1lcyByYWRhciB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGdsb3cge1xcbiAgICAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbn1cXG5cXG4uYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuXFxuLmJhc2Uge1xcbiAgICBiYWNrZ3JvdW5kOiAjY2FjYWNhO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYm9yZGVyLXJhZGl1czogMjd2bWluO1xcbiAgICBib3gtc2hhZG93OiAwIDZ2bWluIDAuMTV2bWluIDB2bWluICM3NzcsIDAgNHZtaW4gMC4xNXZtaW4gMHZtaW4gIzc3NyxcXG4gICAgICAgIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gIzc3NywgLTIwcHggMjBweCA1MHB4IGJsYWNrO1xcbiAgICBwYWRkaW5nOiAwdm1pbiAydm1pbiAydm1pbiAydm1pbjtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDBkZWcpIHJvdGF0ZVooMGRlZyk7XFxuICAgIG1hcmdpbi10b3A6IC00LjV2bWluO1xcbiAgICBoZWlnaHQ6IDkwJTtcXG59XFxuXFxuYnV0dG9uI2FjdGl2YXRlIHtcXG4gICAgYmFja2dyb3VuZDogI2Q2MDUwNTtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICB3aWR0aDogMjB2bWluO1xcbiAgICBoZWlnaHQ6IDE5dm1pbjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxuICAgIGJveC1zaGFkb3c6IDAgNHZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAydm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IC0yLjV2bWluO1xcbiAgICBib3JkZXI6IDAuNXZtaW4gc29saWQgI2FmMDAwMGExO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZSAwcztcXG59XFxuXFxuYnV0dG9uI2FjdGl2YXRlOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAzdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwLCAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDA7XFxuICAgIHRvcDogLTEuNXZtaW47XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UgMHM7XFxufVxcbmJ1dHRvbiNhY3RpdmF0ZTphY3RpdmUsXFxuYnV0dG9uI2FjdGl2YXRlLnB1c2hlZCB7XFxuICAgIGJveC1zaGFkb3c6IDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IDAuNXZtaW47XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjI1cyBlYXNlIDBzO1xcbn1cXG5idXR0b24jYWN0aXZhdGUucHVzaGVkIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDIwcHggMTBweCAjZmYzYzNjLCAwIDAgMTAwcHggNTBweCAjZmYyODI4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmYwMDAwO1xcbiAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzAwMDAwMDIwO1xcbn1cXG5cXG4uYmFzZSB7XFxuICAgIHNjYWxlOiAwLjM7XFxufVxcbi5yaWdodEJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcbi5taWRkbGVCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG4ubGVmdEJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5idXR0b25UZXh0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzZkNmQ2ZDtcXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgICBmb250LWZhbWlseTogQmxhY2tPcHMxO1xcbiAgICBmb250LXNpemU6IDEuM3JlbTtcXG4gICAgYm9yZGVyLXJhZGl1czogMTUlO1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCBibGFjaztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjFyZW07XFxuICAgIHRleHQtc2hhZG93OiAtMXB4IC0xcHggMXB4IGJsYWNrO1xcbn1cXG4uYnV0dG9uVGV4dDo6YmVmb3JlIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDEwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJiMmIyYjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI1cHg7XFxuICAgIGxlZnQ6IDVweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDNweCBibGFjaztcXG59XFxuLmJ1dHRvblRleHQ6OmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHdpZHRoOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDEwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJiMmIyYjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDI1cHg7XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggYmxhY2s7XFxufVxcblxcbi5taWRkbGVCdXR0b24gLmJ1dHRvblRleHQge1xcbiAgICBwYWRkaW5nOiAxcmVtIDEuMXJlbTtcXG59XFxuXFxuLnAxU2hpcFN0YWdlIHtcXG4gICAgZmxleDogNTtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uc2hpcENvbnRhaW5lciB7XFxuICAgIGZsZXg6IDE7XFxuXFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNTBweCByZ2JhKDAsIDI1NSwgMCwgMC41KTtcXG4gICAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnNoaXBRdWV1ZSB7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIGZsZXg6IDM7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMTglO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmaWx0ZXI6IGJsdXIoNXB4KTtcXG59XFxuLm5leHRTaGlwQ29udGFpbmVyIHtcXG4gICAgbWFyZ2luOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDkwJTtcXG4gICAgd2lkdGg6IDIyMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSksXFxuICAgICAgICBpbnNldCAwIDAgMTBweCByZ2JhKDAsIDI1NSwgMCwgMC41KTtcXG59XFxuXFxuLm5leHRTaGlwQ29udGFpbmVyOmhvdmVyIHtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuOCksXFxuICAgICAgICBpbnNldCAwIDAgMTBweCByZ2JhKDAsIDI1NSwgMCwgMC44KTtcXG59XFxuXFxuLm5leHRTaGlwOmhvdmVyIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbn1cXG5cXG4ubmV4dFNoaXAge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5DYXJyaWVyQ29udGFpbmVyLFxcbi5CYXR0bGVzaGlwQ29udGFpbmVyLFxcbi5EZXN0cm95ZXJDb250YWluZXIsXFxuLlN1Ym1hcmluZUNvbnRhaW5lcixcXG4uUGF0cm9sLUJvYXRDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jQ2Fycmllck92ZXJsYXksXFxuI0JhdHRsZXNoaXBPdmVybGF5LFxcbiNEZXN0cm95ZXJPdmVybGF5LFxcbiNTdWJtYXJpbmVPdmVybGF5LFxcbiNQYXRyb2wtQm9hdE92ZXJsYXkge1xcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xcbn1cXG5cXG4jQ2FycmllcixcXG4jQmF0dGxlc2hpcCxcXG4jRGVzdHJveWVyLFxcbiNTdWJtYXJpbmUsXFxuI1BhdHJvbC1Cb2F0IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwJTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiBhdXRvO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi5zaGlwT3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg1KTtcXG4gICAgbGVmdDogMjAlO1xcbiAgICB0b3A6IDQyJTtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgLyogYW5pbWF0aW9uOiByb3RhdGUgMC40cyBlYXNlLWluLW91dDsgKi9cXG59XFxuXFxuLyogLnNoaXBPdmVybGF5Lmhvcml6b250YWwge1xcbiAgICBhbmltYXRpb246IHJvdGF0ZTEgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuQGtleWZyYW1lcyByb3RhdGUge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDUuNSkgcm90YXRlKDBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg1KSByb3RhdGUoOTBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlMSB7XFxuICAgIDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS42KSByb3RhdGUoOTBkZWcpO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjgpIHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbn0gKi9cXG5cXG4jUGF0cm9sLUJvYXRPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDMpO1xcbn1cXG5cXG4uc2hpcFRpbGUge1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbn1cXG5cXG4uc2hpcCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5zaGlwLmhvcml6b250YWwge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbn1cXG5cXG4uZ2FtZSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uYm9hcmQge1xcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxuICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDE1NSwgMTU1LCAxNTUpO1xcbiAgICBib3JkZXItcmlnaHQ6IDMwcHggc29saWQgcmdiKDE4MiwgMTgyLCAxODIpO1xcbiAgICBib3JkZXItdG9wOiAzMHB4IHNvbGlkIHJnYig3MSwgNzEsIDcxKTtcXG4gICAgYm9yZGVyLWxlZnQ6IDMwcHggc29saWQgcmdiKDk0LCA5NCwgOTQpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAxNDBweCByZ2JhKDAsIDI1NSwgMCwgMC41KTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNSU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1JTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNTBweCk7XFxufVxcblxcbi5zaGFkb3dHcmlkIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgNTBweCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZyxcXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLFxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZyxcXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcsXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcCBpbWcge1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXA6aG92ZXIsXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwOmhvdmVyLFxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwOmhvdmVyLFxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwOmhvdmVyLFxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXA6aG92ZXIge1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCByZ2JhKDAsIDI1NSwgMCwgMC42KTtcXG59XFxuXFxuLnRpbGUge1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiAzMHB4O1xcbn1cXG5cXG4uY2VsbCB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMDljMDA7XFxufVxcbi50aWxlLngwIHtcXG4gICAgYm9yZGVyLWxlZnQ6IG5vbmU7XFxufVxcbi50aWxlLng5IHtcXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xcbn1cXG4udGlsZS55OSB7XFxuICAgIGJvcmRlci10b3A6IG5vbmU7XFxufVxcbi50aWxlLnkwIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG59XFxuXFxuLnNoaXBPdmVybGF5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC0yMCU7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KTtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4jU3VibWFyaW5lIGltZy5ob3Jpem9udGFsIHtcXG4gICAgbGVmdDogLTUlO1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNSk7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdG9wOiA0MiU7XFxufVxcblxcbi5ib2FyZFNoaXAge1xcbiAgICB6LWluZGV4OiA5O1xcbn1cXG5cXG4uYm9hcmRTaGlwIGltZyB7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoOCwgNik7XFxuICAgIGxlZnQ6IDMzJTtcXG4gICAgdG9wOiA0OCU7XFxufVxcblxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNi41LCA1KTtcXG4gICAgbGVmdDogMTglO1xcbiAgICB0b3A6IDQ3JTtcXG59XFxuXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdG9wOiA0NiU7XFxuICAgIGxlZnQ6IDI0JTtcXG59XFxuXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDYsIDgpO1xcbiAgICB0b3A6IDQzJTtcXG4gICAgbGVmdDogLTMlO1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuNiwgMik7XFxuICAgIHRvcDogOCU7XFxuICAgIGxlZnQ6IDMyJTtcXG59XFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjIsIDIpO1xcbiAgICB0b3A6IDE1JTtcXG4gICAgbGVmdDogMjglO1xcbn1cXG5cXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi4zLCAyLjUpO1xcbiAgICB0b3A6IDE1JTtcXG4gICAgbGVmdDogMjglO1xcbn1cXG5cXG4jU3VibWFyaW5lLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMiwgMi42KTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDE3JTtcXG59XFxuXFxuI1BhdHJvbC1Cb2F0LmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRvcDogMTUlO1xcbn1cXG4udGlsZS5vbkJvYXJkIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG59XFxuXFxuLmRyYWdnZWRPdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxufVxcblxcbi5pbnZhbGlkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDAwMDtcXG59XFxuXFxuLnZhbGlkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxufVxcblxcbi5zaGlwRm9vdGVyIHtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAyMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpO1xcbn1cXG5cXG4uc3RhZ2VQYXJhIHtcXG4gICAgZm9udC1mYW1pbHk6IFByZXNzU3RhcnQ7XFxuICAgIG1hcmdpbjogMXJlbTtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBjb2xvcjogIzAwZmYwMDtcXG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcmVtIHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBhbmltYXRpb246IHR5cGluZyAyLjVzIHN0ZXBzKDQwLCBlbmQpLCBibGluay1jYXJldDIgMXMgc3RlcC1lbmQgaW5maW5pdGU7XFxufVxcblxcbkBrZXlmcmFtZXMgYmxpbmstY2FyZXQyIHtcXG4gICAgZnJvbSxcXG4gICAgdG8ge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDBmZjAwO1xcbiAgICB9XFxufVxcbi53YXZlcyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcblxcbiAgICB0b3A6IC01MHB4O1xcbiAgICBhbmltYXRpb246IHdhdmUgMTBzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnNoaXBCb3cge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIGhlaWdodDogMzAwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTk0LCAxOTQsIDE5NCwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRvcDogLTQwMHB4O1xcblxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDYwZGVnKTtcXG59XFxuLnNoaXBCb3dXb29kIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDMwMDBweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDExOSwgNTcsIDApO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDExOSwgNTcsIDAsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjQsIDc5LCAwLCAxKSA0NiUsXFxuICAgICAgICByZ2JhKDExOSwgNTcsIDAsIDEpIDEwMCVcXG4gICAgKTtcXG5cXG4gICAgdG9wOiAtNjQwcHg7XFxuICAgIGxlZnQ6IDE2MHB4O1xcblxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDcwJSAxMDAlO1xcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMCUgMzAlO1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVYKDYwZGVnKTtcXG59XFxuXFxuLmZsYWtCYXJyZWwxLFxcbi5mbGFrQmFycmVsMixcXG4uZmxha0JhcnJlbDMsXFxuLmZsYWtCYXJyZWw0LFxcbi5mbGFrQmFycmVsNSxcXG4uZmxha0JhcnJlbDYge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMHB4O1xcbiAgICBoZWlnaHQ6IDMwMHB4O1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzMCUgMTAwJTtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDMwJSAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY2LCAxNjYsIDE2NiwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDIwZGVnKTtcXG59XFxuXFxuLmZsYWtCYXJyZWwxIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDU1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDIge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNjA1cHg7XFxufVxcbi5mbGFrQmFycmVsMyB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA2NTVweDtcXG59XFxuLmZsYWtCYXJyZWw0IHtcXG4gICAgdG9wOiAtOTBweDtcXG4gICAgbGVmdDogNTU1cHg7XFxufVxcbi5mbGFrQmFycmVsNSB7XFxuICAgIHRvcDogLTk1cHg7XFxuICAgIGxlZnQ6IDYwNXB4O1xcbn1cXG4uZmxha0JhcnJlbDYge1xcbiAgICB0b3A6IC05NXB4O1xcbiAgICBsZWZ0OiA2NTVweDtcXG59XFxuXFxuLmZsYWtDb3ZlciB7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgOTBkZWcsXFxuICAgICAgICByZ2JhKDc4LCA3OCwgNzgsIDEpIDAlLFxcbiAgICAgICAgcmdiYSgxNjYsIDE2NiwgMTY2LCAxKSA1MCUsXFxuICAgICAgICByZ2JhKDg0LCA4NCwgODQsIDEpIDEwMCVcXG4gICAgKTtcXG4gICAgdG9wOiAxNTBweDtcXG4gICAgbGVmdDogNDUwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDIwMHB4O1xcbn1cXG4uZmxha0NvdmVyVG9wIHtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMTU4LCAxNTgsIDE1OCk7XFxuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChcXG4gICAgICAgIGNpcmNsZSxcXG4gICAgICAgIHJnYmEoMTU4LCAxNTgsIDE1OCwgMSkgMSUsXFxuICAgICAgICByZ2JhKDExMywgMTEzLCAxMTMsIDEpIDQ3JSxcXG4gICAgICAgIHJnYmEoMTEyLCAxMTIsIDExMiwgMSkgOTklXFxuICAgICk7XFxuXFxuICAgIHRvcDogMTAwcHg7XFxuICAgIGxlZnQ6IDQ1MHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHdhdmUge1xcbiAgICAwJSB7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTUlKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTgwMHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwcHgsIC01MHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxuICAgIC5zaGlwQm93V29vZCB7XFxuICAgICAgICBsZWZ0OiAxOTBweDtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTU1MHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTIwcHgsIDBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMjBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTUwcHgpIHtcXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNixcXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTBweCwgMHB4KTtcXG4gICAgfVxcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2IHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgICAgdG9wOiAtMjBweDtcXG4gICAgICAgIGxlZnQ6IC01MHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgICAgIHdpZHRoOiAzNTBweDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpO1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICB9XFxuICAgIC53YXZlcyB7XFxuICAgICAgICB0b3A6IDUwcHg7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgICAuYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICByaWdodDogMDtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XFxuICAgIH1cXG5cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTBweCk7XFxuICAgIH1cXG4gICAgLnNoaXBCb3dXb29kIHtcXG4gICAgICAgIGxlZnQ6IDEwMHB4O1xcbiAgICB9XFxuICAgIC53YXZlcyB7XFxuICAgICAgICB0b3A6IDUwcHg7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDIpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA5NTBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICAgICAgdG9wOiAtNTBweDtcXG4gICAgICAgIGxlZnQ6IC04MHB4O1xcbiAgICB9XFxuXFxuICAgIC5idXR0b25Db250YWluZXIge1xcbiAgICAgICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgfVxcbiAgICAucDFPcHRpb25zQ29udGFpbmVyIHtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgaGVpZ2h0OiA2MHZoO1xcbiAgICB9XFxuXFxuICAgIC5wMUdyaWRDb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGZsZXg6IDE7XFxuICAgICAgICBwYWRkaW5nOiAwO1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICB9XFxuXFxuICAgIC5ib2FyZCB7XFxuICAgICAgICBtYXJnaW4tdG9wOiBub25lO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgICB9XFxuICAgIC5jZWxsIHtcXG4gICAgICAgIHdpZHRoOiAzMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB9XFxuICAgIC5yYWRhckNvbnRhaW5lciB7XFxuICAgICAgICB0b3A6IGF1dG87XFxuICAgICAgICBsZWZ0OiBhdXRvO1xcbiAgICAgICAgYm90dG9tOiAtNTBweDtcXG4gICAgICAgIHJpZ2h0OiAtMTAwcHg7XFxuICAgICAgICB6LWluZGV4OiA1O1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL3N0YWdpbmdzY3JlZW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJLFNBQVM7SUFDVCxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCOzs7Ozs7OztLQVFDO0lBQ0QsaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxPQUFPOztJQUVQLDZCQUE2QjtJQUM3QixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxPQUFPO0lBQ1Asa0NBQWtDO0lBQ2xDLGlDQUFpQztJQUNqQyx3Q0FB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Q0ksU0FBUztRQUNULHFCQUFxQjtJQUN6QjtBQUNKOztBQUVBO0lBQ0k7UUFDSSxlQUFlO1FBQ2Ysc0JBQXNCO1FBQ3RCLFFBQVE7UUFDUixNQUFNO1FBQ04sc0JBQXNCO1FBQ3RCLHFCQUFxQjtJQUN6Qjs7SUFFQTs7Ozs7O1FBTUksK0NBQStDO0lBQ25EO0lBQ0E7O1FBRUksNEJBQTRCO0lBQ2hDO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7SUFDQTtRQUNJLFNBQVM7UUFDVCxtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJO1FBQ0kscUJBQXFCO1FBQ3JCLFVBQVU7UUFDVixXQUFXO0lBQ2Y7O0lBRUE7UUFDSSxnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLFdBQVc7SUFDZjtJQUNBO1FBQ0ksc0JBQXNCOztRQUV0QixnQkFBZ0I7UUFDaEIsWUFBWTtJQUNoQjs7SUFFQTtRQUNJLGFBQWE7UUFDYixPQUFPO1FBQ1AsVUFBVTtRQUNWLFNBQVM7SUFDYjs7SUFFQTtRQUNJLGdCQUFnQjtRQUNoQixvQ0FBb0M7UUFDcEMsdUNBQXVDO0lBQzNDO0lBQ0E7UUFDSSxXQUFXO1FBQ1gsWUFBWTtJQUNoQjtJQUNBO1FBQ0ksU0FBUztRQUNULFVBQVU7UUFDVixhQUFhO1FBQ2IsYUFBYTtRQUNiLFVBQVU7SUFDZDtBQUNKOztBQUVBO0lBQ0k7UUFDSSxhQUFhO0lBQ2pCO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmdhbWVDb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5xdWV1ZUNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5wMU9wdGlvbnNDb250YWluZXIge1xcbiAgICBmbGV4OiAxLjM7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxNDQsIDE0NCwgMTQ0KTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxNDQsIDE0NCwgMTQ0LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTQwLCAxNDAsIDE0MCwgMSkgMTElLFxcbiAgICAgICAgcmdiYSgxMzYsIDEzNiwgMTM2LCAxKSAyMSUsXFxuICAgICAgICByZ2JhKDE0NCwgMTQ0LCAxNDQsIDEpIDY5JSxcXG4gICAgICAgIHJnYmEoMTM4LCAxMzgsIDEzOCwgMSkgODclLFxcbiAgICAgICAgcmdiYSgxNjgsIDE2OCwgMTY4LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xcbn1cXG4ucDFHcmlkQ29udGFpbmVyIHtcXG4gICAgZmxleDogMztcXG5cXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5yYWRhckNvbnRhaW5lciB7XFxuICAgIGZsZXg6IDI7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5yYWRhciB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgd2lkdGg6IDI2M3B4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgYm9yZGVyOiAxMHB4IHNvbGlkICM2ZDZkNmQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiAzcHggMTBweCAwICNjNWM1YzUsIGluc2V0IDAgMCA1MHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpLFxcbiAgICAgICAgLTVweCAtNXB4IDIwcHggYmxhY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoMSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSxcXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDMpLFxcbi5yYWRhciBsaTpudGgtY2hpbGQoNCkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHJnYig0OSwgMTU4LCA0OSk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgyKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgzKSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCg0KSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNSksXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg2KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMjU1LCAwLCAxKTtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLnJhZGFyIGxpOm50aC1jaGlsZCg1KSB7XFxuICAgIHdpZHRoOiA3NXB4O1xcbiAgICBoZWlnaHQ6IDc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNikge1xcbiAgICB3aWR0aDogMTc1cHg7XFxuICAgIGhlaWdodDogMTc1cHg7XFxufVxcblxcbi5yYWRhciBsaTpudGgtY2hpbGQoNykge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwZmYwMCAwJSwgdHJhbnNwYXJlbnQgNTAlKTtcXG4gICAgYW5pbWF0aW9uOiByYWRhciAycyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBsZWZ0O1xcbn1cXG5cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDgpIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQwJTtcXG4gICAgbGVmdDogNzUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCg5KSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NSU7XFxuICAgIGxlZnQ6IDc1JTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5yYWRhciBsaTpudGgtY2hpbGQoMTApIHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1JTtcXG4gICAgbGVmdDogODUlO1xcbiAgICB3aWR0aDogOHB4O1xcbiAgICBoZWlnaHQ6IDhweDtcXG4gICAgYmFja2dyb3VuZDogIzAwZmYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBmaWx0ZXI6IGJsdXIoMnB4KTtcXG4gICAgYW5pbWF0aW9uOiBnbG93IDJzIGxpbmVhciBpbmZpbml0ZTtcXG59XFxuLnJhZGFyIGxpOm50aC1jaGlsZCgxMSkge1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA4MCU7XFxuICAgIHdpZHRoOiA4cHg7XFxuICAgIGhlaWdodDogOHB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjMDBmZjAwO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGZpbHRlcjogYmx1cigycHgpO1xcbiAgICBhbmltYXRpb246IGdsb3cgMnMgbGluZWFyIGluZmluaXRlO1xcbn1cXG4ucmFkYXIgbGk6bnRoLWNoaWxkKDEyKSB7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0MCU7XFxuICAgIGxlZnQ6IDgwJTtcXG4gICAgd2lkdGg6IDhweDtcXG4gICAgaGVpZ2h0OiA4cHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMGZmMDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgZmlsdGVyOiBibHVyKDJweCk7XFxuICAgIGFuaW1hdGlvbjogZ2xvdyAycyBsaW5lYXIgaW5maW5pdGU7XFxufVxcblxcbkBrZXlmcmFtZXMgcmFkYXIge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIH1cXG59XFxuXFxuQGtleWZyYW1lcyBnbG93IHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG59XFxuXFxuLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxufVxcblxcbi5iYXNlIHtcXG4gICAgYmFja2dyb3VuZDogI2NhY2FjYTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI3dm1pbjtcXG4gICAgYm94LXNoYWRvdzogMCA2dm1pbiAwLjE1dm1pbiAwdm1pbiAjNzc3LCAwIDR2bWluIDAuMTV2bWluIDB2bWluICM3NzcsXFxuICAgICAgICAwIDJ2bWluIDAuMTV2bWluIDB2bWluICM3NzcsIC0yMHB4IDIwcHggNTBweCBibGFjaztcXG4gICAgcGFkZGluZzogMHZtaW4gMnZtaW4gMnZtaW4gMnZtaW47XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKSByb3RhdGVaKDBkZWcpO1xcbiAgICBtYXJnaW4tdG9wOiAtNC41dm1pbjtcXG4gICAgaGVpZ2h0OiA5MCU7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZSB7XFxuICAgIGJhY2tncm91bmQ6ICNkNjA1MDU7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgd2lkdGg6IDIwdm1pbjtcXG4gICAgaGVpZ2h0OiAxOXZtaW47XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBvdXRsaW5lOiBub25lO1xcbiAgICBib3gtc2hhZG93OiAwIDR2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMnZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAtMi41dm1pbjtcXG4gICAgYm9yZGVyOiAwLjV2bWluIHNvbGlkICNhZjAwMDBhMTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMjVzIGVhc2UgMHM7XFxufVxcblxcbmJ1dHRvbiNhY3RpdmF0ZTpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgM3ZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMCwgMCAxdm1pbiAwLjE1dm1pbiAwdm1pbiAjYWYwMDAwO1xcbiAgICB0b3A6IC0xLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlIDBzO1xcbn1cXG5idXR0b24jYWN0aXZhdGU6YWN0aXZlLFxcbmJ1dHRvbiNhY3RpdmF0ZS5wdXNoZWQge1xcbiAgICBib3gtc2hhZG93OiAwIDF2bWluIDAuMTV2bWluIDB2bWluICNhZjAwMDAsIDAgMXZtaW4gMC4xNXZtaW4gMHZtaW4gI2FmMDAwMDtcXG4gICAgdG9wOiAwLjV2bWluO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4yNXMgZWFzZSAwcztcXG59XFxuYnV0dG9uI2FjdGl2YXRlLnB1c2hlZCB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAyMHB4IDEwcHggI2ZmM2MzYywgMCAwIDEwMHB4IDUwcHggI2ZmMjgyODtcXG4gICAgYmFja2dyb3VuZDogI2ZmMDAwMDtcXG4gICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMwMDAwMDAyMDtcXG59XFxuXFxuLmJhc2Uge1xcbiAgICBzY2FsZTogMC4zO1xcbn1cXG4ucmlnaHRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG4ubWlkZGxlQnV0dG9uIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXJpZ2h0OiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItdG9wOiA1cHggc29saWQgcmdiKDEwOSwgMTA5LCAxMDkpO1xcbiAgICBib3JkZXItbGVmdDogNXB4IHNvbGlkIHJnYigxMDcsIDEwNywgMTA3KTtcXG59XFxuLmxlZnRCdXR0b24ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbn1cXG5cXG4uYnV0dG9uVGV4dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2ZDZkNmQ7XFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXG4gICAgZm9udC1mYW1pbHk6IEJsYWNrT3BzMTtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxuICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggYmxhY2s7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xcbiAgICB0ZXh0LXNoYWRvdzogLTFweCAtMXB4IDFweCBibGFjaztcXG59XFxuLmJ1dHRvblRleHQ6OmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICBsZWZ0OiA1cHg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAzcHggYmxhY2s7XFxufVxcbi5idXR0b25UZXh0OjphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICB3aWR0aDogMTBweDtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjJiMmI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNXB4O1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgM3B4IGJsYWNrO1xcbn1cXG5cXG4ubWlkZGxlQnV0dG9uIC5idXR0b25UZXh0IHtcXG4gICAgcGFkZGluZzogMXJlbSAxLjFyZW07XFxufVxcblxcbi5wMVNoaXBTdGFnZSB7XFxuICAgIGZsZXg6IDU7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnNoaXBDb250YWluZXIge1xcbiAgICBmbGV4OiAxO1xcblxcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgbGlnaHRncmV5O1xcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCByZ2IoMTA5LCAxMDksIDEwOSk7XFxuICAgIGJvcmRlci1sZWZ0OiA1cHggc29saWQgcmdiKDEwNywgMTA3LCAxMDcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDUwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5zaGlwUXVldWUge1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBmbGV4OiAzO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBnYXA6IDE4JTtcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmlsdGVyOiBibHVyKDVweCk7XFxufVxcbi5uZXh0U2hpcENvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogMTBweDtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIHdpZHRoOiAyMjBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjUpLFxcbiAgICAgICAgaW5zZXQgMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxufVxcblxcbi5uZXh0U2hpcENvbnRhaW5lcjpob3ZlciB7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMjU1LCAwLCAwLjgpLFxcbiAgICAgICAgaW5zZXQgMCAwIDEwcHggcmdiYSgwLCAyNTUsIDAsIDAuOCk7XFxufVxcblxcbi5uZXh0U2hpcDpob3ZlciB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG59XFxuXFxuLm5leHRTaGlwIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uQ2FycmllckNvbnRhaW5lcixcXG4uQmF0dGxlc2hpcENvbnRhaW5lcixcXG4uRGVzdHJveWVyQ29udGFpbmVyLFxcbi5TdWJtYXJpbmVDb250YWluZXIsXFxuLlBhdHJvbC1Cb2F0Q29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI0NhcnJpZXJPdmVybGF5LFxcbiNCYXR0bGVzaGlwT3ZlcmxheSxcXG4jRGVzdHJveWVyT3ZlcmxheSxcXG4jU3VibWFyaW5lT3ZlcmxheSxcXG4jUGF0cm9sLUJvYXRPdmVybGF5IHtcXG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcXG59XFxuXFxuI0NhcnJpZXIsXFxuI0JhdHRsZXNoaXAsXFxuI0Rlc3Ryb3llcixcXG4jU3VibWFyaW5lLFxcbiNQYXRyb2wtQm9hdCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnNoaXBPdmVybGF5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC0yMCU7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KTtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4uc2hpcE92ZXJsYXkudmVydGljYWwge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZykgc2NhbGUoNSk7XFxuICAgIGxlZnQ6IDIwJTtcXG4gICAgdG9wOiA0MiU7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIC8qIGFuaW1hdGlvbjogcm90YXRlIDAuNHMgZWFzZS1pbi1vdXQ7ICovXFxufVxcblxcbi8qIC5zaGlwT3ZlcmxheS5ob3Jpem9udGFsIHtcXG4gICAgYW5pbWF0aW9uOiByb3RhdGUxIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRlIHtcXG4gICAgMCUge1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSg1LjUpIHJvdGF0ZSgwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoNSkgcm90YXRlKDkwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0ZTEge1xcbiAgICAwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNikgcm90YXRlKDkwZGVnKTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS44KSByb3RhdGUoMGRlZyk7XFxuICAgIH1cXG59ICovXFxuXFxuI1BhdHJvbC1Cb2F0T3ZlcmxheS52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSgzKTtcXG59XFxuXFxuLnNoaXBUaWxlIHtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uc2hpcC5ob3Jpem9udGFsIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuLmdhbWUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmJvYXJkIHtcXG4gICAgbWFyZ2luLXRvcDogYXV0bztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbiAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYigxNTUsIDE1NSwgMTU1KTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAzMHB4IHNvbGlkIHJnYigxODIsIDE4MiwgMTgyKTtcXG4gICAgYm9yZGVyLXRvcDogMzBweCBzb2xpZCByZ2IoNzEsIDcxLCA3MSk7XFxuICAgIGJvcmRlci1sZWZ0OiAzMHB4IHNvbGlkIHJnYig5NCwgOTQsIDk0KTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMTQwcHggcmdiYSgwLCAyNTUsIDAsIDAuNSk7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUlO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNSU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDUwcHgpO1xcbn1cXG5cXG4uc2hhZG93R3JpZCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCA1MHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDUwcHgpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNDYXJyaWVyLmJvYXJkU2hpcCBpbWcsXFxuI0JhdHRsZXNoaXAuYm9hcmRTaGlwIGltZyxcXG4jRGVzdHJveWVyLmJvYXJkU2hpcCBpbWcsXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLFxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXAgaW1nIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwOmhvdmVyLFxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcDpob3ZlcixcXG4jRGVzdHJveWVyLmJvYXJkU2hpcDpob3ZlcixcXG4jU3VibWFyaW5lLmJvYXJkU2hpcDpob3ZlcixcXG4jUGF0cm9sLUJvYXQuYm9hcmRTaGlwOmhvdmVyIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDIwcHggcmdiYSgwLCAyNTUsIDAsIDAuNik7XFxufVxcblxcbi50aWxlIHtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMzBweDtcXG59XFxuXFxuLmNlbGwge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDA5YzAwO1xcbn1cXG4udGlsZS54MCB7XFxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xcbn1cXG4udGlsZS54OSB7XFxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcXG59XFxuLnRpbGUueTkge1xcbiAgICBib3JkZXItdG9wOiBub25lO1xcbn1cXG4udGlsZS55MCB7XFxuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxufVxcblxcbi5zaGlwT3ZlcmxheSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAtMjAlO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuOCk7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuI1N1Ym1hcmluZSBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIGxlZnQ6IC01JTtcXG59XFxuXFxuLnNoaXBPdmVybGF5LnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDUpO1xcbiAgICBsZWZ0OiAyMCU7XFxuICAgIHRvcDogNDIlO1xcbn1cXG5cXG4uYm9hcmRTaGlwIHtcXG4gICAgei1pbmRleDogOTtcXG59XFxuXFxuLmJvYXJkU2hpcCBpbWcge1xcbn1cXG5cXG4jQ2Fycmllci5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDgsIDYpO1xcbiAgICBsZWZ0OiAzMyU7XFxuICAgIHRvcDogNDglO1xcbn1cXG5cXG4jQmF0dGxlc2hpcC5ib2FyZFNoaXAgaW1nLnZlcnRpY2FsIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpIHNjYWxlKDYuNSwgNSk7XFxuICAgIGxlZnQ6IDE4JTtcXG4gICAgdG9wOiA0NyU7XFxufVxcblxcbiNEZXN0cm95ZXIuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRvcDogNDYlO1xcbiAgICBsZWZ0OiAyNCU7XFxufVxcblxcbiNTdWJtYXJpbmUuYm9hcmRTaGlwIGltZy52ZXJ0aWNhbCB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKSBzY2FsZSg2LCA4KTtcXG4gICAgdG9wOiA0MyU7XFxuICAgIGxlZnQ6IC0zJTtcXG59XFxuXFxuI0NhcnJpZXIuYm9hcmRTaGlwIGltZy5ob3Jpem9udGFsIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgyLjYsIDIpO1xcbiAgICB0b3A6IDglO1xcbiAgICBsZWZ0OiAzMiU7XFxufVxcbiNCYXR0bGVzaGlwLmJvYXJkU2hpcCBpbWcuaG9yaXpvbnRhbCB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMi4yLCAyKTtcXG4gICAgdG9wOiAxNSU7XFxuICAgIGxlZnQ6IDI4JTtcXG59XFxuXFxuI0Rlc3Ryb3llci5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIuMywgMi41KTtcXG4gICAgdG9wOiAxNSU7XFxuICAgIGxlZnQ6IDI4JTtcXG59XFxuXFxuI1N1Ym1hcmluZS5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDIsIDIuNik7XFxuICAgIHRvcDogNDAlO1xcbiAgICBsZWZ0OiAxNyU7XFxufVxcblxcbiNQYXRyb2wtQm9hdC5ib2FyZFNoaXAgaW1nLmhvcml6b250YWwge1xcbiAgICB0b3A6IDE1JTtcXG59XFxuLnRpbGUub25Cb2FyZCB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgd2lkdGg6IDUwcHg7XFxufVxcblxcbi5kcmFnZ2VkT3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uaW52YWxpZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjAwMDA7XFxufVxcblxcbi52YWxpZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uc2hpcEZvb3RlciB7XFxuICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCBsaWdodGdyZXk7XFxuICAgIGJvcmRlci1yaWdodDogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkIHJnYigxMDksIDEwOSwgMTA5KTtcXG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCByZ2IoMTA3LCAxMDcsIDEwNyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCByZ2JhKDAsIDI1NSwgMCwgMC41KTtcXG59XFxuXFxuLnN0YWdlUGFyYSB7XFxuICAgIGZvbnQtZmFtaWx5OiBQcmVzc1N0YXJ0O1xcbiAgICBtYXJnaW46IDFyZW07XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgY29sb3I6ICMwMGZmMDA7XFxuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIGJvcmRlci1yaWdodDogMXJlbSBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgYW5pbWF0aW9uOiB0eXBpbmcgMi41cyBzdGVwcyg0MCwgZW5kKSwgYmxpbmstY2FyZXQyIDFzIHN0ZXAtZW5kIGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGJsaW5rLWNhcmV0MiB7XFxuICAgIGZyb20sXFxuICAgIHRvIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogIzAwZmYwMDtcXG4gICAgfVxcbn1cXG4ud2F2ZXMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMDB2dztcXG5cXG4gICAgdG9wOiAtNTBweDtcXG4gICAgYW5pbWF0aW9uOiB3YXZlIDEwcyBsaW5lYXIgaW5maW5pdGU7XFxufVxcbi5zaGlwQm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBoZWlnaHQ6IDMwMDBweDtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE5NCwgMTk0LCAxOTQsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0b3A6IC00MDBweDtcXG5cXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCg2MGRlZyk7XFxufVxcbi5zaGlwQm93V29vZCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgaGVpZ2h0OiAzMDAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHJnYigxMTksIDU3LCAwKTtcXG4gICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxcbiAgICAgICAgY2lyY2xlLFxcbiAgICAgICAgcmdiYSgxMTksIDU3LCAwLCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY0LCA3OSwgMCwgMSkgNDYlLFxcbiAgICAgICAgcmdiYSgxMTksIDU3LCAwLCAxKSAxMDAlXFxuICAgICk7XFxuXFxuICAgIHRvcDogLTY0MHB4O1xcbiAgICBsZWZ0OiAxNjBweDtcXG5cXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA3MCUgMTAwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAlIDMwJTtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwJSAzMCU7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWCg2MGRlZyk7XFxufVxcblxcbi5mbGFrQmFycmVsMSxcXG4uZmxha0JhcnJlbDIsXFxuLmZsYWtCYXJyZWwzLFxcbi5mbGFrQmFycmVsNCxcXG4uZmxha0JhcnJlbDUsXFxuLmZsYWtCYXJyZWw2IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMzAlIDEwMCU7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAzMCUgMTAwJTtcXG4gICAgYmFja2dyb3VuZDogcmdiKDc4LCA3OCwgNzgpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICA5MGRlZyxcXG4gICAgICAgIHJnYmEoNzgsIDc4LCA3OCwgMSkgMCUsXFxuICAgICAgICByZ2JhKDE2NiwgMTY2LCAxNjYsIDEpIDUwJSxcXG4gICAgICAgIHJnYmEoODQsIDg0LCA4NCwgMSkgMTAwJVxcbiAgICApO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgyMGRlZyk7XFxufVxcblxcbi5mbGFrQmFycmVsMSB7XFxuICAgIHRvcDogLTE1MHB4O1xcbiAgICBsZWZ0OiA1NTVweDtcXG59XFxuLmZsYWtCYXJyZWwyIHtcXG4gICAgdG9wOiAtMTUwcHg7XFxuICAgIGxlZnQ6IDYwNXB4O1xcbn1cXG4uZmxha0JhcnJlbDMge1xcbiAgICB0b3A6IC0xNTBweDtcXG4gICAgbGVmdDogNjU1cHg7XFxufVxcbi5mbGFrQmFycmVsNCB7XFxuICAgIHRvcDogLTkwcHg7XFxuICAgIGxlZnQ6IDU1NXB4O1xcbn1cXG4uZmxha0JhcnJlbDUge1xcbiAgICB0b3A6IC05NXB4O1xcbiAgICBsZWZ0OiA2MDVweDtcXG59XFxuLmZsYWtCYXJyZWw2IHtcXG4gICAgdG9wOiAtOTVweDtcXG4gICAgbGVmdDogNjU1cHg7XFxufVxcblxcbi5mbGFrQ292ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiByZ2IoNzgsIDc4LCA3OCk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgIDkwZGVnLFxcbiAgICAgICAgcmdiYSg3OCwgNzgsIDc4LCAxKSAwJSxcXG4gICAgICAgIHJnYmEoMTY2LCAxNjYsIDE2NiwgMSkgNTAlLFxcbiAgICAgICAgcmdiYSg4NCwgODQsIDg0LCAxKSAxMDAlXFxuICAgICk7XFxuICAgIHRvcDogMTUwcHg7XFxuICAgIGxlZnQ6IDQ1MHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiAyMDBweDtcXG59XFxuLmZsYWtDb3ZlclRvcCB7XFxuICAgIGJhY2tncm91bmQ6IHJnYig3OCwgNzgsIDc4KTtcXG4gICAgYmFja2dyb3VuZDogcmdiKDE1OCwgMTU4LCAxNTgpO1xcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXFxuICAgICAgICBjaXJjbGUsXFxuICAgICAgICByZ2JhKDE1OCwgMTU4LCAxNTgsIDEpIDElLFxcbiAgICAgICAgcmdiYSgxMTMsIDExMywgMTEzLCAxKSA0NyUsXFxuICAgICAgICByZ2JhKDExMiwgMTEyLCAxMTIsIDEpIDk5JVxcbiAgICApO1xcblxcbiAgICB0b3A6IDEwMHB4O1xcbiAgICBsZWZ0OiA0NTBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuQGtleWZyYW1lcyB3YXZlIHtcXG4gICAgMCUge1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE1JSk7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDE4MDBweCkge1xcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2LFxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMHB4LCAtNTBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbiAgICAuc2hpcEJvd1dvb2Qge1xcbiAgICAgICAgbGVmdDogMTkwcHg7XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDE1NTBweCkge1xcbiAgICAuZmxha0JhcnJlbDEsXFxuICAgIC5mbGFrQmFycmVsMixcXG4gICAgLmZsYWtCYXJyZWwzLFxcbiAgICAuZmxha0JhcnJlbDQsXFxuICAgIC5mbGFrQmFycmVsNSxcXG4gICAgLmZsYWtCYXJyZWw2LFxcbiAgICAuZmxha0NvdmVyLFxcbiAgICAuZmxha0NvdmVyVG9wIHtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0yMHB4LCAwcHgpO1xcbiAgICB9XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTIwcHgsIDBweCkgcm90YXRlKDIwZGVnKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTU1MHB4KSB7XFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYsXFxuICAgIC5mbGFrQ292ZXIsXFxuICAgIC5mbGFrQ292ZXJUb3Age1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwcHgsIDBweCk7XFxuICAgIH1cXG4gICAgLmZsYWtCYXJyZWwxLFxcbiAgICAuZmxha0JhcnJlbDIsXFxuICAgIC5mbGFrQmFycmVsMyxcXG4gICAgLmZsYWtCYXJyZWw0LFxcbiAgICAuZmxha0JhcnJlbDUsXFxuICAgIC5mbGFrQmFycmVsNiB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTBweCwgMHB4KSByb3RhdGUoMjBkZWcpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxNTAwcHgpIHtcXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgICAgIHRvcDogLTIwcHg7XFxuICAgICAgICBsZWZ0OiAtNTBweDtcXG4gICAgICAgIGhlaWdodDogMzAwcHg7XFxuICAgICAgICB3aWR0aDogMzUwcHg7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC43KTtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgfVxcbiAgICAud2F2ZXMge1xcbiAgICAgICAgdG9wOiA1MHB4O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xcbiAgICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMjAwcHgpIHtcXG4gICAgLmJ1dHRvbkNvbnRhaW5lciB7XFxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgcmlnaHQ6IDA7XFxuICAgICAgICB0b3A6IDA7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xcbiAgICB9XFxuXFxuICAgIC5mbGFrQmFycmVsMSxcXG4gICAgLmZsYWtCYXJyZWwyLFxcbiAgICAuZmxha0JhcnJlbDMsXFxuICAgIC5mbGFrQmFycmVsNCxcXG4gICAgLmZsYWtCYXJyZWw1LFxcbiAgICAuZmxha0JhcnJlbDYge1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MHB4LCAwcHgpIHJvdGF0ZSgyMGRlZyk7XFxuICAgIH1cXG4gICAgLmZsYWtDb3ZlcixcXG4gICAgLmZsYWtDb3ZlclRvcCB7XFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwcHgpO1xcbiAgICB9XFxuICAgIC5zaGlwQm93V29vZCB7XFxuICAgICAgICBsZWZ0OiAxMDBweDtcXG4gICAgfVxcbiAgICAud2F2ZXMge1xcbiAgICAgICAgdG9wOiA1MHB4O1xcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgyKTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogOTUwcHgpIHtcXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gICAgICAgIHRvcDogLTUwcHg7XFxuICAgICAgICBsZWZ0OiAtODBweDtcXG4gICAgfVxcblxcbiAgICAuYnV0dG9uQ29udGFpbmVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgIH1cXG4gICAgLnAxT3B0aW9uc0NvbnRhaW5lciB7XFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIGhlaWdodDogNjB2aDtcXG4gICAgfVxcblxcbiAgICAucDFHcmlkQ29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBmbGV4OiAxO1xcbiAgICAgICAgcGFkZGluZzogMDtcXG4gICAgICAgIG1hcmdpbjogMDtcXG4gICAgfVxcblxcbiAgICAuYm9hcmQge1xcbiAgICAgICAgbWFyZ2luLXRvcDogbm9uZTtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gICAgfVxcbiAgICAuY2VsbCB7XFxuICAgICAgICB3aWR0aDogMzBweDtcXG4gICAgICAgIGhlaWdodDogMzBweDtcXG4gICAgfVxcbiAgICAucmFkYXJDb250YWluZXIge1xcbiAgICAgICAgdG9wOiBhdXRvO1xcbiAgICAgICAgbGVmdDogYXV0bztcXG4gICAgICAgIGJvdHRvbTogLTUwcHg7XFxuICAgICAgICByaWdodDogLTEwMHB4O1xcbiAgICAgICAgei1pbmRleDogNTtcXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gICAgLnJhZGFyQ29udGFpbmVyIHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2hvbWVwYWdlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaG9tZXBhZ2UuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21hcHBhZ2UuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYXBwYWdlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9uYW1lcGFnZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25hbWVwYWdlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdGFnaW5nc2NyZWVuLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3RhZ2luZ3NjcmVlbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBHYW1lIGZyb20gXCIuL3NjcmlwdHMvY29tcG9uZW50cy9HYW1lLmpzXCI7XG5pbXBvcnQgVmlld01vZGVsIGZyb20gXCIuL3NjcmlwdHMvVmlld01vZGVsXCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL3NjcmlwdHMvRE9NL0FwcC5qc1wiO1xuXG5jb25zdCBtb2RlbCA9IG5ldyBHYW1lKCk7XG5jb25zdCB2bSA9IG5ldyBWaWV3TW9kZWwobW9kZWwpO1xubmV3IEFwcCh2bSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIikpO1xuIl0sIm5hbWVzIjpbIlB1YlN1YkludGVyZmFjZSIsIkhvbWVQYWdlIiwiTWFwUGFnZSIsIkdhbWVQYWdlIiwiZWxlbSIsIkFwcCIsImNvbnN0cnVjdG9yIiwidmlld01vZGVsIiwiZWxlbWVudCIsInNob3VsZFVwZGF0ZSIsIm9sZE1vZGVsIiwibmV3TW9kZWwiLCJjdXJyZW50UGFnZSIsInJlbmRlciIsImFwcEVsZW1lbnQiLCJwcm9wIiwiaWQiLCJ3YXZlc1NyYyIsIkdhbWVNZXNzYWdlIiwiU2hpcFF1ZXVlIiwiQm9hcmRFbGVtIiwicGxhY2VTaGlwUmFuZG9tbHkiLCJnYW1lU3RhdGUiLCJtb2RlbCIsImJ1aWxkR2FtZXBhZ2UiLCJsZWZ0QnV0dG9uIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJtaWRkbGVCdXR0b24iLCJyaWdodEJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGVNb2RlbCIsInBsYXllciIsInNoaXBRdWV1ZSIsImlzSG9yaXpvbnRhbCIsImRyb3BRdWV1ZSIsInB1c2giLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJsZW5ndGgiLCJzaGlwIiwic2hpZnQiLCJuZXdHYW1lYm9hcmQiLCJuZXdTaGlwIiwiZ2FtZWJvYXJkIiwic2hpcHMiLCJwb3AiLCJzaGlwQ29udGFpbmVyIiwic2hpcEluZGV4IiwiY2xpY2tlZEluZGV4IiwiZHJhZ2dlZFNoaXBJbmRleCIsIm1lc3NhZ2VDb250YWluZXIiLCJnYW1lIiwiZ2FtZUNvbnRhaW5lciIsInNyYyIsImF1dG9wbGF5IiwibG9vcCIsImRyYWdnYWJsZSIsInRleHRDb250ZW50IiwiSG9tZVBhZ2VJbnB1dCIsImhvbWVwYWdlQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJuZXdHYW1lIiwiaHJlZiIsIm5hbWVQYWdlSXNPcGVuIiwibmV3R2FtZUJ0biIsImJ1aWxkRm9ybSIsImdyZWV0aW5nIiwiaW5wdXRGaWVsZCIsInR5cGUiLCJwbGFjZWhvbGRlciIsImJ1dHRvbiIsIm5hbWVGaWVsZCIsIm5hbWUiLCJ2YWx1ZSIsImZvcm1Db250YWluZXIiLCJyZWRQaW5TcmMiLCJzdGlja3lOb3RlU3JjIiwic3RhdGVNZXNzYWdlIiwicmVkUGlucyIsImZvckVhY2giLCJwaW4iLCJBSSIsImRpZmZpY3VsdHkiLCJtYXAiLCJub3RlIiwiYnVpbGROb3RlIiwibm90ZU9wdGlvbnMiLCJub3RlMSIsImxvY2F0aW9uIiwicGFyYSIsIm5vdGUyIiwibm90ZTMiLCJzZWxlY3RlZE9wdGlvbnMiLCJjb250ZW50IiwidmVyc2lvbiIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidGV4dCIsIkhUTUwiLCJpbm5lckhUTUwiLCJmb3JJIiwiZm9yIiwic3BlbGxjaGVjayIsInJlcXVpcmVkIiwiY2hlY2tlZCIsIm11dGVkIiwiY2hpbGQiLCJTaGlwIiwiaXNWYWxpZFBsYWNlbWVudCIsInBsYWNlU2hpcCIsImRyYWdFbnRlciIsImJvYXJkU2l6ZSIsImJ1aWxkQm9hcmQiLCJzaGFkb3dHcmlkIiwiYm9hcmQiLCJzaXplIiwiY2VsbHMiLCJyb3ciLCJjb2wiLCJjZWxsIiwidGlsZVJlZiIsImRhdGFzZXQiLCJlIiwiYm91bmQiLCJoYW5kbGVEcmFnRW50ZXIiLCJiaW5kIiwiaGFuZGxlRHJvcCIsImhhbmRsZURyYWdPdmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwidGlsZVN0YXR1cyIsInNoaXBFbGVtIiwiYmFzZVRpbGUiLCJ0aWxlcyIsImVuZFRpbGUiLCJzdHlsZSIsImdyaWRBcmVhIiwidGlsZSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlRHJhZ0xlYXZlIiwiZHJhZ2dlZFNoaXAiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwiYmFzZUNvb3JkcyIsImdldEJhc2VUaWxlIiwiYmFzZVJvdyIsImJhc2VDb2wiLCJpc1ZhbGlkIiwicm93T2Zmc2V0IiwiY29sT2Zmc2V0IiwiaSIsIk51bWJlciIsImdldENlbGwiLCJpbmRleCIsIm9mZnNldFJvdyIsIm9mZnNldENvbCIsImNhcnJpZXJTcmMiLCJiYXR0bGVzaGlwU3JjIiwiZGVzdHJveWVyU3JjIiwic3VibWFyaW5lU3JjIiwicGF0cm9sQm9hdFNyYyIsImNsaWNrZWRFdmVudCIsInNoaXBNb2RlbCIsImNyZWF0ZSIsInNoaXBTcmMiLCJzaGlwQ2xhc3MiLCJib2F0Iiwic2hpcE92ZXJsYXkiLCJvdmVybGF5Iiwib3ZlcmxheUNsYXNzIiwiaGFuZGxlRHJhZ1N0YXJ0Iiwid2lkdGgiLCJoZWlnaHQiLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsImJ1aWxkUXVldWUiLCJzdGFnZSIsIm5leHQiLCJxdWV1ZSIsImluY2x1ZGVzIiwicHJlcGVuZCIsIm9uSW5pdCIsInJlZ2lzdGVyIiwiZ2V0RWxlbWVudCIsIlZpZXdNb2RlbCIsInB1YnN1YnMiLCJwdWJzdWIiLCJyZXBsYWNlQ2hpbGRyZW4iLCJtb2RlbFVwZGF0ZUZ1bmMiLCJrZXkiLCJQbGF5ZXIiLCJHYW1lIiwiY3VycmVudFR1cm4iLCJ3YXJuIiwiTWF0aCIsInJhbmRvbSIsInJhbmRSb3ciLCJmbG9vciIsInJhbmRDb2wiLCJUaWxlIiwiR2FtZWJvYXJkIiwiaGl0cyIsInN1bmsiLCJ2bSIsInF1ZXJ5U2VsZWN0b3IiXSwic291cmNlUm9vdCI6IiJ9