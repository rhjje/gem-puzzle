/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/gem-puzzle.js":
/*!**************************************!*\
  !*** ./src/js/modules/gem-puzzle.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GemPuzzle)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */
var GemPuzzle = /*#__PURE__*/function () {
  function GemPuzzle() {
    _classCallCheck(this, GemPuzzle);

    this.field = document.querySelector('.field');
    this.buttonPlay = document.querySelector('.play');
    this.counter = document.querySelector('.counter');
    this.timer = document.querySelector('.timer');
    this.endOfGame = document.querySelector('.end-of-game');
    this.audio = new Audio('./assets/sounds/move.wav');
    this.moveCounter = 0;
    this.fieldSize = 16;
    this.text = 'black';
    this.image = 'off';
    this.timerOff = true;
  }

  _createClass(GemPuzzle, [{
    key: "shuffleGameField",
    value: function shuffleGameField(size) {
      var arr = _toConsumableArray(Array(size).keys()).sort(function () {
        return Math.random() - 0.5;
      });

      return arr;
    }
  }, {
    key: "createGameField",
    value: function createGameField() {
      var _this = this;

      var cells = this.shuffleGameField(this.fieldSize);
      cells.forEach(function (item, i) {
        var left = i % Math.sqrt(_this.fieldSize);
        var top = (i - left) / Math.sqrt(_this.fieldSize);
        var cellSize = 400 / Math.sqrt(_this.fieldSize);

        if (item !== 0) {
          var cell = document.createElement('div');
          cell.classList.add('cell');
          cell.innerText = item;
          cell.style.width = "".concat(400 / Math.sqrt(_this.fieldSize), "px");
          cell.style.height = "".concat(400 / Math.sqrt(_this.fieldSize), "px");
          cell.style.left = "".concat(left * cellSize, "px");
          cell.style.top = "".concat(top * cellSize, "px");

          if (_this.text === 'disabled') {
            cell.style.fontSize = '0rem';
          } else {
            cell.style.color = "".concat(_this.text);
            cell.style.fontSize = '';
          }

          _this.field.append(cell);
        } else {
          _this.left = "".concat(left * cellSize, "px");
          _this.top = "".concat(top * cellSize, "px");
        }
      });
      this.bindTriggers();
      if (this.image === 'on') this.setImage();
    }
  }, {
    key: "clearField",
    value: function clearField() {
      var cells = document.querySelectorAll('.cell');
      cells.forEach(function (cell) {
        cell.remove();
      });
    }
  }, {
    key: "getImageUrl",
    value: function getImageUrl() {
      var randomImage = Math.floor(Math.random() * (150 - 1) + 1);
      this.field.setAttribute('data-url', "url(assets/images/".concat(randomImage, ".jpg)"));
    }
  }, {
    key: "setImage",
    value: function setImage() {
      var _this2 = this;

      var cells = document.querySelectorAll('.cell');
      var urlImg = this.field.getAttribute('data-url');
      var fieldSize = cells.length + 1;
      cells.forEach(function (_, i) {
        var background = "".concat(urlImg, " ").concat((+cells[i].innerText - 1) % Math.sqrt(fieldSize) * (100 / (Math.sqrt(fieldSize) - 1)), "% ").concat(Math.trunc((+cells[i].innerText - 1) / Math.sqrt(fieldSize)) * (100 / (Math.sqrt(fieldSize) - 1)), "%");

        if (_this2.field.getAttribute('data-image') === 'on') {
          cells[i].style.background = background;
          cells[i].style.backgroundSize = '400px';
        } else {
          cells[i].style.background = '';
        }
      });
    }
  }, {
    key: "bindTriggers",
    value: function bindTriggers() {
      var _this3 = this;

      var cells = document.querySelectorAll('.cell');
      cells.forEach(function (cell, i) {
        cell.addEventListener('click', function () {
          var verticalDiff = Math.abs(_this3.top.slice(0, -2) - cell.style.top.slice(0, -2));
          var horizontDiff = Math.abs(_this3.left.slice(0, -2) - cell.style.left.slice(0, -2));
          var cellSize = 400 / Math.sqrt(_this3.fieldSize);

          if (Math.trunc(verticalDiff) + Math.trunc(horizontDiff) === Math.trunc(cellSize)) {
            if (_this3.field.getAttribute('data-sound') === 'on') {
              _this3.audio.play();
            }

            _this3.moveCounter += 1;
            _this3.counter.innerHTML = "Moves: ".concat(_this3.moveCounter);

            if (_this3.timerOff) {
              _this3.setTimer();

              _this3.timerOff = false;
            }

            var _ref = [cells[i].style.left, _this3.left];
            _this3.left = _ref[0];
            cells[i].style.left = _ref[1];
            var _ref2 = [cells[i].style.top, _this3.top];
            _this3.top = _ref2[0];
            cells[i].style.top = _ref2[1];

            _this3.checkStatus();
          }
        });
      });
    }
  }, {
    key: "checkStatus",
    value: function checkStatus() {
      var _this4 = this;

      var cells = document.querySelectorAll('.cell');
      var cellSize = 400 / Math.sqrt(this.fieldSize);
      var count = 0;
      cells.forEach(function (cell) {
        if ("".concat(Math.trunc(cell.style.left.slice(0, -2)), "px") === "".concat((+cell.innerText - 1) % Math.sqrt(_this4.fieldSize) * Math.trunc(cellSize), "px") && "".concat(Math.trunc(cell.style.top.slice(0, -2)), "px") === "".concat(Math.trunc((+cell.innerText - 1) / Math.sqrt(_this4.fieldSize)) * Math.trunc(cellSize), "px")) {
          count += 1;
        }
      });

      if (count === cells.length) {
        this.endOfGame.style.display = 'flex';
        clearInterval(this.timerId);
      }
    }
  }, {
    key: "setTimer",
    value: function setTimer() {
      var _this5 = this;

      var time = 0;
      this.timerId = setInterval(function () {
        time += 1;
        _this5.timer.innerHTML = "Time: \n      ".concat(Math.trunc(time / 60) < 10 ? "0".concat(Math.trunc(time / 60)) : Math.trunc(time / 60), ":").concat(time % 60 < 10 ? "0".concat(time % 60) : time % 60);
      }, 1000);
    }
  }, {
    key: "setInitialState",
    value: function setInitialState() {
      clearInterval(this.timerId);
      this.endOfGame.style.display = 'none';
      this.timer.innerText = 'Time: 00:00';
      this.counter.innerText = 'Moves: 0';
      this.moveCounter = 0;
      this.timerOff = true;
      this.fieldSize = +this.field.getAttribute('data-size');
      this.text = this.field.getAttribute('data-text');
      this.image = this.field.getAttribute('data-image');
      this.clearField();
    }
  }, {
    key: "init",
    value: function init() {
      var _this6 = this;

      this.getImageUrl();
      this.createGameField();
      this.buttonPlay.addEventListener('click', function () {
        _this6.setInitialState();

        _this6.createGameField();
      });
    }
  }]);

  return GemPuzzle;
}();



/***/ }),

/***/ "./src/js/modules/settings.js":
/*!************************************!*\
  !*** ./src/js/modules/settings.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var _gem_puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gem-puzzle */ "./src/js/modules/gem-puzzle.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* eslint-disable class-methods-use-this */


var Settings = /*#__PURE__*/function (_GemPuzzle) {
  _inherits(Settings, _GemPuzzle);

  var _super = _createSuper(Settings);

  function Settings() {
    var _this;

    _classCallCheck(this, Settings);

    _this = _super.call(this);
    _this.settings = document.querySelector('.settings');
    _this.button = document.querySelector('.settings-button');
    _this.field = document.querySelector('.field');
    _this.text = document.getElementById('text');
    _this.sound = document.getElementById('sound');
    _this.image = document.getElementById('image');
    _this.size = document.getElementById('field-size');
    return _this;
  }

  _createClass(Settings, [{
    key: "changeText",
    value: function changeText() {
      var _this2 = this;

      var cells = document.querySelectorAll('.cell');
      cells.forEach(function (_, i) {
        if (_this2.text.value === 'disabled') {
          cells[i].style.fontSize = '0rem';
        } else {
          cells[i].style.color = "".concat(_this2.text.value);
          cells[i].style.fontSize = '';
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      this.button.addEventListener('click', function (event) {
        if (event.target.outerText === 'Settings') {
          _this3.button.innerHTML = 'Resume game';
          _this3.settings.style.display = 'flex';
        } else {
          _this3.button.innerHTML = 'Settings';
          _this3.settings.style.display = 'none';
        }
      });
      this.text.addEventListener('change', function () {
        _this3.field.setAttribute('data-text', "".concat(_this3.text.value));

        _this3.changeText();
      });
      this.sound.addEventListener('change', function () {
        _this3.field.setAttribute('data-sound', "".concat(_this3.sound.value));
      });
      this.image.addEventListener('change', function () {
        _this3.field.setAttribute('data-image', "".concat(_this3.image.value));

        _this3.setImage();
      });
      this.size.addEventListener('change', function () {
        _this3.field.setAttribute('data-size', "".concat(_this3.size.value));
      });
    }
  }]);

  return Settings;
}(_gem_puzzle__WEBPACK_IMPORTED_MODULE_0__.default);



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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_gem_puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gem-puzzle */ "./src/js/modules/gem-puzzle.js");
/* harmony import */ var _modules_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/settings */ "./src/js/modules/settings.js");


document.addEventListener('DOMContentLoaded', function () {
  new _modules_gem_puzzle__WEBPACK_IMPORTED_MODULE_0__.default().init();
  new _modules_settings__WEBPACK_IMPORTED_MODULE_1__.default().init();
});
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************!*\
  !*** ./src/scss/styles.scss ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21vbWVudHVtLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvc2Nzcy9zdHlsZXMuc2NzcyJdLCJuYW1lcyI6WyJHZW1QdXp6bGUiLCJmaWVsZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJ1dHRvblBsYXkiLCJjb3VudGVyIiwidGltZXIiLCJlbmRPZkdhbWUiLCJhdWRpbyIsIkF1ZGlvIiwibW92ZUNvdW50ZXIiLCJmaWVsZFNpemUiLCJ0ZXh0IiwiaW1hZ2UiLCJ0aW1lck9mZiIsInNpemUiLCJhcnIiLCJBcnJheSIsImtleXMiLCJzb3J0IiwiTWF0aCIsInJhbmRvbSIsImNlbGxzIiwic2h1ZmZsZUdhbWVGaWVsZCIsImZvckVhY2giLCJpdGVtIiwiaSIsImxlZnQiLCJzcXJ0IiwidG9wIiwiY2VsbFNpemUiLCJjZWxsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVyVGV4dCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJmb250U2l6ZSIsImNvbG9yIiwiYXBwZW5kIiwiYmluZFRyaWdnZXJzIiwic2V0SW1hZ2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwicmFuZG9tSW1hZ2UiLCJmbG9vciIsInNldEF0dHJpYnV0ZSIsInVybEltZyIsImdldEF0dHJpYnV0ZSIsImxlbmd0aCIsIl8iLCJiYWNrZ3JvdW5kIiwidHJ1bmMiLCJiYWNrZ3JvdW5kU2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2ZXJ0aWNhbERpZmYiLCJhYnMiLCJzbGljZSIsImhvcml6b250RGlmZiIsInBsYXkiLCJpbm5lckhUTUwiLCJzZXRUaW1lciIsImNoZWNrU3RhdHVzIiwiY291bnQiLCJkaXNwbGF5IiwiY2xlYXJJbnRlcnZhbCIsInRpbWVySWQiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckZpZWxkIiwiZ2V0SW1hZ2VVcmwiLCJjcmVhdGVHYW1lRmllbGQiLCJzZXRJbml0aWFsU3RhdGUiLCJTZXR0aW5ncyIsInNldHRpbmdzIiwiYnV0dG9uIiwiZ2V0RWxlbWVudEJ5SWQiLCJzb3VuZCIsInZhbHVlIiwiZXZlbnQiLCJ0YXJnZXQiLCJvdXRlclRleHQiLCJjaGFuZ2VUZXh0IiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUVxQkEsUztBQUNuQix1QkFBYztBQUFBOztBQUNaLFNBQUtDLEtBQUwsR0FBYUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBbEI7QUFDQSxTQUFLRSxPQUFMLEdBQWVILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFmO0FBQ0EsU0FBS0csS0FBTCxHQUFhSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLFNBQUtJLFNBQUwsR0FBaUJMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFqQjtBQUNBLFNBQUtLLEtBQUwsR0FBYSxJQUFJQyxLQUFKLENBQVUsMEJBQVYsQ0FBYjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFFQSxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLE9BQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDs7OztXQUVELDBCQUFpQkMsSUFBakIsRUFBdUI7QUFDckIsVUFBTUMsR0FBRyxHQUFHLG1CQUFJQyxLQUFLLENBQUNGLElBQUQsQ0FBTCxDQUFZRyxJQUFaLEVBQUosRUFBd0JDLElBQXhCLENBQTZCO0FBQUEsZUFBTUMsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLEdBQXRCO0FBQUEsT0FBN0IsQ0FBWjs7QUFDQSxhQUFPTCxHQUFQO0FBQ0Q7OztXQUVELDJCQUFrQjtBQUFBOztBQUNoQixVQUFNTSxLQUFLLEdBQUcsS0FBS0MsZ0JBQUwsQ0FBc0IsS0FBS1osU0FBM0IsQ0FBZDtBQUNBVyxXQUFLLENBQUNFLE9BQU4sQ0FBYyxVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUN6QixZQUFNQyxJQUFJLEdBQUdELENBQUMsR0FBR04sSUFBSSxDQUFDUSxJQUFMLENBQVUsS0FBSSxDQUFDakIsU0FBZixDQUFqQjtBQUNBLFlBQU1rQixHQUFHLEdBQUcsQ0FBQ0gsQ0FBQyxHQUFHQyxJQUFMLElBQWFQLElBQUksQ0FBQ1EsSUFBTCxDQUFVLEtBQUksQ0FBQ2pCLFNBQWYsQ0FBekI7QUFDQSxZQUFNbUIsUUFBUSxHQUFHLE1BQU1WLElBQUksQ0FBQ1EsSUFBTCxDQUFVLEtBQUksQ0FBQ2pCLFNBQWYsQ0FBdkI7O0FBQ0EsWUFBSWMsSUFBSSxLQUFLLENBQWIsRUFBZ0I7QUFDZCxjQUFNTSxJQUFJLEdBQUc3QixRQUFRLENBQUM4QixhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQUQsY0FBSSxDQUFDRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsTUFBbkI7QUFDQUgsY0FBSSxDQUFDSSxTQUFMLEdBQWlCVixJQUFqQjtBQUNBTSxjQUFJLENBQUNLLEtBQUwsQ0FBV0MsS0FBWCxhQUFzQixNQUFNakIsSUFBSSxDQUFDUSxJQUFMLENBQVUsS0FBSSxDQUFDakIsU0FBZixDQUE1QjtBQUNBb0IsY0FBSSxDQUFDSyxLQUFMLENBQVdFLE1BQVgsYUFBdUIsTUFBTWxCLElBQUksQ0FBQ1EsSUFBTCxDQUFVLEtBQUksQ0FBQ2pCLFNBQWYsQ0FBN0I7QUFDQW9CLGNBQUksQ0FBQ0ssS0FBTCxDQUFXVCxJQUFYLGFBQXFCQSxJQUFJLEdBQUdHLFFBQTVCO0FBQ0FDLGNBQUksQ0FBQ0ssS0FBTCxDQUFXUCxHQUFYLGFBQW9CQSxHQUFHLEdBQUdDLFFBQTFCOztBQUVBLGNBQUksS0FBSSxDQUFDbEIsSUFBTCxLQUFjLFVBQWxCLEVBQThCO0FBQzVCbUIsZ0JBQUksQ0FBQ0ssS0FBTCxDQUFXRyxRQUFYLEdBQXNCLE1BQXRCO0FBQ0QsV0FGRCxNQUVPO0FBQ0xSLGdCQUFJLENBQUNLLEtBQUwsQ0FBV0ksS0FBWCxhQUFzQixLQUFJLENBQUM1QixJQUEzQjtBQUNBbUIsZ0JBQUksQ0FBQ0ssS0FBTCxDQUFXRyxRQUFYLEdBQXNCLEVBQXRCO0FBQ0Q7O0FBQ0QsZUFBSSxDQUFDdEMsS0FBTCxDQUFXd0MsTUFBWCxDQUFrQlYsSUFBbEI7QUFDRCxTQWhCRCxNQWdCTztBQUNMLGVBQUksQ0FBQ0osSUFBTCxhQUFlQSxJQUFJLEdBQUdHLFFBQXRCO0FBQ0EsZUFBSSxDQUFDRCxHQUFMLGFBQWNBLEdBQUcsR0FBR0MsUUFBcEI7QUFDRDtBQUNGLE9BeEJEO0FBeUJBLFdBQUtZLFlBQUw7QUFDQSxVQUFJLEtBQUs3QixLQUFMLEtBQWUsSUFBbkIsRUFBeUIsS0FBSzhCLFFBQUw7QUFDMUI7OztXQUVELHNCQUFhO0FBQ1gsVUFBTXJCLEtBQUssR0FBR3BCLFFBQVEsQ0FBQzBDLGdCQUFULENBQTBCLE9BQTFCLENBQWQ7QUFDQXRCLFdBQUssQ0FBQ0UsT0FBTixDQUFjLFVBQUNPLElBQUQsRUFBVTtBQUN0QkEsWUFBSSxDQUFDYyxNQUFMO0FBQ0QsT0FGRDtBQUdEOzs7V0FFRCx1QkFBYztBQUNaLFVBQU1DLFdBQVcsR0FBRzFCLElBQUksQ0FBQzJCLEtBQUwsQ0FBVzNCLElBQUksQ0FBQ0MsTUFBTCxNQUFpQixNQUFNLENBQXZCLElBQTRCLENBQXZDLENBQXBCO0FBQ0EsV0FBS3BCLEtBQUwsQ0FBVytDLFlBQVgsQ0FBd0IsVUFBeEIsOEJBQXlERixXQUF6RDtBQUNEOzs7V0FFRCxvQkFBVztBQUFBOztBQUNULFVBQU14QixLQUFLLEdBQUdwQixRQUFRLENBQUMwQyxnQkFBVCxDQUEwQixPQUExQixDQUFkO0FBQ0EsVUFBTUssTUFBTSxHQUFHLEtBQUtoRCxLQUFMLENBQVdpRCxZQUFYLENBQXdCLFVBQXhCLENBQWY7QUFDQSxVQUFNdkMsU0FBUyxHQUFHVyxLQUFLLENBQUM2QixNQUFOLEdBQWUsQ0FBakM7QUFFQTdCLFdBQUssQ0FBQ0UsT0FBTixDQUFjLFVBQUM0QixDQUFELEVBQUkxQixDQUFKLEVBQVU7QUFDdEIsWUFBTTJCLFVBQVUsYUFBTUosTUFBTixjQUFpQixDQUFDLENBQUMzQixLQUFLLENBQUNJLENBQUQsQ0FBTCxDQUFTUyxTQUFWLEdBQXNCLENBQXZCLElBQTZCZixJQUFJLENBQUNRLElBQUwsQ0FBVWpCLFNBQVYsQ0FBOUIsSUFDM0IsT0FBT1MsSUFBSSxDQUFDUSxJQUFMLENBQVVqQixTQUFWLElBQXVCLENBQTlCLENBRDJCLENBQWhCLGVBQzJCUyxJQUFJLENBQUNrQyxLQUFMLENBQVcsQ0FBQyxDQUFDaEMsS0FBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1MsU0FBVixHQUFzQixDQUF2QixJQUE2QmYsSUFBSSxDQUFDUSxJQUFMLENBQVVqQixTQUFWLENBQXhDLEtBQ3RDLE9BQU9TLElBQUksQ0FBQ1EsSUFBTCxDQUFVakIsU0FBVixJQUF1QixDQUE5QixDQURzQyxDQUQzQixNQUFoQjs7QUFHQSxZQUFJLE1BQUksQ0FBQ1YsS0FBTCxDQUFXaUQsWUFBWCxDQUF3QixZQUF4QixNQUEwQyxJQUE5QyxFQUFvRDtBQUNsRDVCLGVBQUssQ0FBQ0ksQ0FBRCxDQUFMLENBQVNVLEtBQVQsQ0FBZWlCLFVBQWYsR0FBNEJBLFVBQTVCO0FBQ0EvQixlQUFLLENBQUNJLENBQUQsQ0FBTCxDQUFTVSxLQUFULENBQWVtQixjQUFmLEdBQWdDLE9BQWhDO0FBQ0QsU0FIRCxNQUdPO0FBQ0xqQyxlQUFLLENBQUNJLENBQUQsQ0FBTCxDQUFTVSxLQUFULENBQWVpQixVQUFmLEdBQTRCLEVBQTVCO0FBQ0Q7QUFDRixPQVZEO0FBV0Q7OztXQUVELHdCQUFlO0FBQUE7O0FBQ2IsVUFBTS9CLEtBQUssR0FBR3BCLFFBQVEsQ0FBQzBDLGdCQUFULENBQTBCLE9BQTFCLENBQWQ7QUFDQXRCLFdBQUssQ0FBQ0UsT0FBTixDQUFjLFVBQUNPLElBQUQsRUFBT0wsQ0FBUCxFQUFhO0FBQ3pCSyxZQUFJLENBQUN5QixnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFNO0FBQ25DLGNBQU1DLFlBQVksR0FBR3JDLElBQUksQ0FBQ3NDLEdBQUwsQ0FBUyxNQUFJLENBQUM3QixHQUFMLENBQVM4QixLQUFULENBQWUsQ0FBZixFQUFrQixDQUFDLENBQW5CLElBQXdCNUIsSUFBSSxDQUFDSyxLQUFMLENBQVdQLEdBQVgsQ0FBZThCLEtBQWYsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBQyxDQUF6QixDQUFqQyxDQUFyQjtBQUNBLGNBQU1DLFlBQVksR0FBR3hDLElBQUksQ0FBQ3NDLEdBQUwsQ0FBUyxNQUFJLENBQUMvQixJQUFMLENBQVVnQyxLQUFWLENBQWdCLENBQWhCLEVBQW1CLENBQUMsQ0FBcEIsSUFBeUI1QixJQUFJLENBQUNLLEtBQUwsQ0FBV1QsSUFBWCxDQUFnQmdDLEtBQWhCLENBQXNCLENBQXRCLEVBQXlCLENBQUMsQ0FBMUIsQ0FBbEMsQ0FBckI7QUFDQSxjQUFNN0IsUUFBUSxHQUFHLE1BQU1WLElBQUksQ0FBQ1EsSUFBTCxDQUFVLE1BQUksQ0FBQ2pCLFNBQWYsQ0FBdkI7O0FBQ0EsY0FBSVMsSUFBSSxDQUFDa0MsS0FBTCxDQUFXRyxZQUFYLElBQTJCckMsSUFBSSxDQUFDa0MsS0FBTCxDQUFXTSxZQUFYLENBQTNCLEtBQXdEeEMsSUFBSSxDQUFDa0MsS0FBTCxDQUFXeEIsUUFBWCxDQUE1RCxFQUFrRjtBQUNoRixnQkFBSSxNQUFJLENBQUM3QixLQUFMLENBQVdpRCxZQUFYLENBQXdCLFlBQXhCLE1BQTBDLElBQTlDLEVBQW9EO0FBQ2xELG9CQUFJLENBQUMxQyxLQUFMLENBQVdxRCxJQUFYO0FBQ0Q7O0FBQ0Qsa0JBQUksQ0FBQ25ELFdBQUwsSUFBb0IsQ0FBcEI7QUFDQSxrQkFBSSxDQUFDTCxPQUFMLENBQWF5RCxTQUFiLG9CQUFtQyxNQUFJLENBQUNwRCxXQUF4Qzs7QUFDQSxnQkFBSSxNQUFJLENBQUNJLFFBQVQsRUFBbUI7QUFDakIsb0JBQUksQ0FBQ2lELFFBQUw7O0FBQ0Esb0JBQUksQ0FBQ2pELFFBQUwsR0FBZ0IsS0FBaEI7QUFDRDs7QUFUK0UsdUJBVzdDLENBQUNRLEtBQUssQ0FBQ0ksQ0FBRCxDQUFMLENBQVNVLEtBQVQsQ0FBZVQsSUFBaEIsRUFBc0IsTUFBSSxDQUFDQSxJQUEzQixDQVg2QztBQVcvRSxrQkFBSSxDQUFDQSxJQVgwRTtBQVdwRUwsaUJBQUssQ0FBQ0ksQ0FBRCxDQUFMLENBQVNVLEtBQVQsQ0FBZVQsSUFYcUQ7QUFBQSx3QkFZL0MsQ0FBQ0wsS0FBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1UsS0FBVCxDQUFlUCxHQUFoQixFQUFxQixNQUFJLENBQUNBLEdBQTFCLENBWitDO0FBWS9FLGtCQUFJLENBQUNBLEdBWjBFO0FBWXJFUCxpQkFBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1UsS0FBVCxDQUFlUCxHQVpzRDs7QUFhaEYsa0JBQUksQ0FBQ21DLFdBQUw7QUFDRDtBQUNGLFNBbkJEO0FBb0JELE9BckJEO0FBc0JEOzs7V0FFRCx1QkFBYztBQUFBOztBQUNaLFVBQU0xQyxLQUFLLEdBQUdwQixRQUFRLENBQUMwQyxnQkFBVCxDQUEwQixPQUExQixDQUFkO0FBQ0EsVUFBTWQsUUFBUSxHQUFHLE1BQU1WLElBQUksQ0FBQ1EsSUFBTCxDQUFVLEtBQUtqQixTQUFmLENBQXZCO0FBQ0EsVUFBSXNELEtBQUssR0FBRyxDQUFaO0FBQ0EzQyxXQUFLLENBQUNFLE9BQU4sQ0FBYyxVQUFDTyxJQUFELEVBQVU7QUFDdEIsWUFBSSxVQUFHWCxJQUFJLENBQUNrQyxLQUFMLENBQVd2QixJQUFJLENBQUNLLEtBQUwsQ0FBV1QsSUFBWCxDQUFnQmdDLEtBQWhCLENBQXNCLENBQXRCLEVBQXlCLENBQUMsQ0FBMUIsQ0FBWCxDQUFILHNCQUF3RCxDQUFDLENBQUM1QixJQUFJLENBQUNJLFNBQU4sR0FBa0IsQ0FBbkIsSUFBd0JmLElBQUksQ0FBQ1EsSUFBTCxDQUFVLE1BQUksQ0FBQ2pCLFNBQWYsQ0FBekIsR0FBc0RTLElBQUksQ0FBQ2tDLEtBQUwsQ0FBV3hCLFFBQVgsQ0FBN0csV0FBeUksVUFBR1YsSUFBSSxDQUFDa0MsS0FBTCxDQUFXdkIsSUFBSSxDQUFDSyxLQUFMLENBQVdQLEdBQVgsQ0FBZThCLEtBQWYsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBQyxDQUF6QixDQUFYLENBQUgsc0JBQXVEdkMsSUFBSSxDQUFDa0MsS0FBTCxDQUFXLENBQUMsQ0FBQ3ZCLElBQUksQ0FBQ0ksU0FBTixHQUFrQixDQUFuQixJQUF3QmYsSUFBSSxDQUFDUSxJQUFMLENBQVUsTUFBSSxDQUFDakIsU0FBZixDQUFuQyxDQUFELEdBQWtFUyxJQUFJLENBQUNrQyxLQUFMLENBQVd4QixRQUFYLENBQXhILE9BQTdJLEVBQStSO0FBQzdSbUMsZUFBSyxJQUFJLENBQVQ7QUFDRDtBQUNGLE9BSkQ7O0FBTUEsVUFBSUEsS0FBSyxLQUFLM0MsS0FBSyxDQUFDNkIsTUFBcEIsRUFBNEI7QUFDMUIsYUFBSzVDLFNBQUwsQ0FBZTZCLEtBQWYsQ0FBcUI4QixPQUFyQixHQUErQixNQUEvQjtBQUNBQyxxQkFBYSxDQUFDLEtBQUtDLE9BQU4sQ0FBYjtBQUNEO0FBQ0Y7OztXQUVELG9CQUFXO0FBQUE7O0FBQ1QsVUFBSUMsSUFBSSxHQUFHLENBQVg7QUFDQSxXQUFLRCxPQUFMLEdBQWVFLFdBQVcsQ0FBQyxZQUFNO0FBQy9CRCxZQUFJLElBQUksQ0FBUjtBQUNBLGNBQUksQ0FBQy9ELEtBQUwsQ0FBV3dELFNBQVgsMkJBQ0UxQyxJQUFJLENBQUNrQyxLQUFMLENBQVdlLElBQUksR0FBRyxFQUFsQixJQUF3QixFQUF4QixjQUFpQ2pELElBQUksQ0FBQ2tDLEtBQUwsQ0FBV2UsSUFBSSxHQUFHLEVBQWxCLENBQWpDLElBQ0ZqRCxJQUFJLENBQUNrQyxLQUFMLENBQVdlLElBQUksR0FBRyxFQUFsQixDQUZBLGNBRXlCQSxJQUFJLEdBQUcsRUFBUCxHQUFZLEVBQVosY0FBcUJBLElBQUksR0FBRyxFQUE1QixJQUFtQ0EsSUFBSSxHQUFHLEVBRm5FO0FBR0QsT0FMeUIsRUFLdkIsSUFMdUIsQ0FBMUI7QUFNRDs7O1dBRUQsMkJBQWtCO0FBQ2hCRixtQkFBYSxDQUFDLEtBQUtDLE9BQU4sQ0FBYjtBQUNBLFdBQUs3RCxTQUFMLENBQWU2QixLQUFmLENBQXFCOEIsT0FBckIsR0FBK0IsTUFBL0I7QUFDQSxXQUFLNUQsS0FBTCxDQUFXNkIsU0FBWCxHQUF1QixhQUF2QjtBQUNBLFdBQUs5QixPQUFMLENBQWE4QixTQUFiLEdBQXlCLFVBQXpCO0FBQ0EsV0FBS3pCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxXQUFLSSxRQUFMLEdBQWdCLElBQWhCO0FBRUEsV0FBS0gsU0FBTCxHQUFpQixDQUFDLEtBQUtWLEtBQUwsQ0FBV2lELFlBQVgsQ0FBd0IsV0FBeEIsQ0FBbEI7QUFDQSxXQUFLdEMsSUFBTCxHQUFZLEtBQUtYLEtBQUwsQ0FBV2lELFlBQVgsQ0FBd0IsV0FBeEIsQ0FBWjtBQUNBLFdBQUtyQyxLQUFMLEdBQWEsS0FBS1osS0FBTCxDQUFXaUQsWUFBWCxDQUF3QixZQUF4QixDQUFiO0FBRUEsV0FBS3FCLFVBQUw7QUFDRDs7O1dBRUQsZ0JBQU87QUFBQTs7QUFDTCxXQUFLQyxXQUFMO0FBQ0EsV0FBS0MsZUFBTDtBQUVBLFdBQUtyRSxVQUFMLENBQWdCb0QsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFlBQU07QUFDOUMsY0FBSSxDQUFDa0IsZUFBTDs7QUFDQSxjQUFJLENBQUNELGVBQUw7QUFDRCxPQUhEO0FBSUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSkg7QUFDQTs7SUFFcUJFLFE7Ozs7O0FBQ25CLHNCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFDQSxVQUFLQyxRQUFMLEdBQWdCMUUsUUFBUSxDQUFDQyxhQUFULENBQXVCLFdBQXZCLENBQWhCO0FBQ0EsVUFBSzBFLE1BQUwsR0FBYzNFLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixrQkFBdkIsQ0FBZDtBQUNBLFVBQUtGLEtBQUwsR0FBYUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxVQUFLUyxJQUFMLEdBQVlWLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWjtBQUNBLFVBQUtDLEtBQUwsR0FBYTdFLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBYjtBQUNBLFVBQUtqRSxLQUFMLEdBQWFYLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBYjtBQUNBLFVBQUsvRCxJQUFMLEdBQVliLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBWjtBQVJZO0FBU2I7Ozs7V0FFRCxzQkFBYTtBQUFBOztBQUNYLFVBQU14RCxLQUFLLEdBQUdwQixRQUFRLENBQUMwQyxnQkFBVCxDQUEwQixPQUExQixDQUFkO0FBQ0F0QixXQUFLLENBQUNFLE9BQU4sQ0FBYyxVQUFDNEIsQ0FBRCxFQUFJMUIsQ0FBSixFQUFVO0FBQ3RCLFlBQUksTUFBSSxDQUFDZCxJQUFMLENBQVVvRSxLQUFWLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2xDMUQsZUFBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1UsS0FBVCxDQUFlRyxRQUFmLEdBQTBCLE1BQTFCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xqQixlQUFLLENBQUNJLENBQUQsQ0FBTCxDQUFTVSxLQUFULENBQWVJLEtBQWYsYUFBMEIsTUFBSSxDQUFDNUIsSUFBTCxDQUFVb0UsS0FBcEM7QUFDQTFELGVBQUssQ0FBQ0ksQ0FBRCxDQUFMLENBQVNVLEtBQVQsQ0FBZUcsUUFBZixHQUEwQixFQUExQjtBQUNEO0FBQ0YsT0FQRDtBQVFEOzs7V0FFRCxnQkFBTztBQUFBOztBQUNMLFdBQUtzQyxNQUFMLENBQVlyQixnQkFBWixDQUE2QixPQUE3QixFQUFzQyxVQUFDeUIsS0FBRCxFQUFXO0FBQy9DLFlBQUlBLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxTQUFiLEtBQTJCLFVBQS9CLEVBQTJDO0FBQ3pDLGdCQUFJLENBQUNOLE1BQUwsQ0FBWWYsU0FBWixHQUF3QixhQUF4QjtBQUNBLGdCQUFJLENBQUNjLFFBQUwsQ0FBY3hDLEtBQWQsQ0FBb0I4QixPQUFwQixHQUE4QixNQUE5QjtBQUNELFNBSEQsTUFHTztBQUNMLGdCQUFJLENBQUNXLE1BQUwsQ0FBWWYsU0FBWixHQUF3QixVQUF4QjtBQUNBLGdCQUFJLENBQUNjLFFBQUwsQ0FBY3hDLEtBQWQsQ0FBb0I4QixPQUFwQixHQUE4QixNQUE5QjtBQUNEO0FBQ0YsT0FSRDtBQVVBLFdBQUt0RCxJQUFMLENBQVU0QyxnQkFBVixDQUEyQixRQUEzQixFQUFxQyxZQUFNO0FBQ3pDLGNBQUksQ0FBQ3ZELEtBQUwsQ0FBVytDLFlBQVgsQ0FBd0IsV0FBeEIsWUFBd0MsTUFBSSxDQUFDcEMsSUFBTCxDQUFVb0UsS0FBbEQ7O0FBQ0EsY0FBSSxDQUFDSSxVQUFMO0FBQ0QsT0FIRDtBQUtBLFdBQUtMLEtBQUwsQ0FBV3ZCLGdCQUFYLENBQTRCLFFBQTVCLEVBQXNDLFlBQU07QUFDMUMsY0FBSSxDQUFDdkQsS0FBTCxDQUFXK0MsWUFBWCxDQUF3QixZQUF4QixZQUF5QyxNQUFJLENBQUMrQixLQUFMLENBQVdDLEtBQXBEO0FBQ0QsT0FGRDtBQUlBLFdBQUtuRSxLQUFMLENBQVcyQyxnQkFBWCxDQUE0QixRQUE1QixFQUFzQyxZQUFNO0FBQzFDLGNBQUksQ0FBQ3ZELEtBQUwsQ0FBVytDLFlBQVgsQ0FBd0IsWUFBeEIsWUFBeUMsTUFBSSxDQUFDbkMsS0FBTCxDQUFXbUUsS0FBcEQ7O0FBQ0EsY0FBSSxDQUFDckMsUUFBTDtBQUNELE9BSEQ7QUFLQSxXQUFLNUIsSUFBTCxDQUFVeUMsZ0JBQVYsQ0FBMkIsUUFBM0IsRUFBcUMsWUFBTTtBQUN6QyxjQUFJLENBQUN2RCxLQUFMLENBQVcrQyxZQUFYLENBQXdCLFdBQXhCLFlBQXdDLE1BQUksQ0FBQ2pDLElBQUwsQ0FBVWlFLEtBQWxEO0FBQ0QsT0FGRDtBQUdEOzs7O0VBcERtQ2hGLGdEOzs7Ozs7OztVQ0h0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBRSxRQUFRLENBQUNzRCxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxNQUFJeEQsd0RBQUosR0FBZ0JxRixJQUFoQjtBQUNBLE1BQUlWLHNEQUFKLEdBQWVVLElBQWY7QUFDRCxDQUhELEU7Ozs7Ozs7OztBQ0hBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VtUHV6emxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZCcpO1xuICAgIHRoaXMuYnV0dG9uUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5Jyk7XG4gICAgdGhpcy5jb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXInKTtcbiAgICB0aGlzLnRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVyJyk7XG4gICAgdGhpcy5lbmRPZkdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5kLW9mLWdhbWUnKTtcbiAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKCcuL2Fzc2V0cy9zb3VuZHMvbW92ZS53YXYnKTtcbiAgICB0aGlzLm1vdmVDb3VudGVyID0gMDtcblxuICAgIHRoaXMuZmllbGRTaXplID0gMTY7XG4gICAgdGhpcy50ZXh0ID0gJ2JsYWNrJztcbiAgICB0aGlzLmltYWdlID0gJ29mZic7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG4gIH1cblxuICBzaHVmZmxlR2FtZUZpZWxkKHNpemUpIHtcbiAgICBjb25zdCBhcnIgPSBbLi4uQXJyYXkoc2l6ZSkua2V5cygpXS5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjcmVhdGVHYW1lRmllbGQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSB0aGlzLnNodWZmbGVHYW1lRmllbGQodGhpcy5maWVsZFNpemUpO1xuICAgIGNlbGxzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGxlZnQgPSBpICUgTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGNvbnN0IHRvcCA9IChpIC0gbGVmdCkgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgaWYgKGl0ZW0gIT09IDApIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgY2VsbC5pbm5lclRleHQgPSBpdGVtO1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gYCR7NDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUuaGVpZ2h0ID0gYCR7NDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUudG9wID0gYCR7dG9wICogY2VsbFNpemV9cHhgO1xuXG4gICAgICAgIGlmICh0aGlzLnRleHQgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gJzByZW0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBgJHt0aGlzLnRleHR9YDtcbiAgICAgICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWVsZC5hcHBlbmQoY2VsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlZnQgPSBgJHtsZWZ0ICogY2VsbFNpemV9cHhgO1xuICAgICAgICB0aGlzLnRvcCA9IGAke3RvcCAqIGNlbGxTaXplfXB4YDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmJpbmRUcmlnZ2VycygpO1xuICAgIGlmICh0aGlzLmltYWdlID09PSAnb24nKSB0aGlzLnNldEltYWdlKCk7XG4gIH1cblxuICBjbGVhckZpZWxkKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjZWxsLnJlbW92ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgY29uc3QgcmFuZG9tSW1hZ2UgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTUwIC0gMSkgKyAxKTtcbiAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS11cmwnLCBgdXJsKGFzc2V0cy9pbWFnZXMvJHtyYW5kb21JbWFnZX0uanBnKWApO1xuICB9XG5cbiAgc2V0SW1hZ2UoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IHVybEltZyA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXVybCcpO1xuICAgIGNvbnN0IGZpZWxkU2l6ZSA9IGNlbGxzLmxlbmd0aCArIDE7XG5cbiAgICBjZWxscy5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICBjb25zdCBiYWNrZ3JvdW5kID0gYCR7dXJsSW1nfSAkeygoK2NlbGxzW2ldLmlubmVyVGV4dCAtIDEpICUgKE1hdGguc3FydChmaWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydChmaWVsZFNpemUpIC0gMSkpfSUgJHtNYXRoLnRydW5jKCgrY2VsbHNbaV0uaW5uZXJUZXh0IC0gMSkgLyAoTWF0aC5zcXJ0KGZpZWxkU2l6ZSkpKVxuICAgICAgICAqICgxMDAgLyAoTWF0aC5zcXJ0KGZpZWxkU2l6ZSkgLSAxKSl9JWA7XG4gICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKSA9PT0gJ29uJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNDAwcHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZFRyaWdnZXJzKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbERpZmYgPSBNYXRoLmFicyh0aGlzLnRvcC5zbGljZSgwLCAtMikgLSBjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBob3Jpem9udERpZmYgPSBNYXRoLmFicyh0aGlzLmxlZnQuc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSk7XG4gICAgICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgICAgaWYgKE1hdGgudHJ1bmModmVydGljYWxEaWZmKSArIE1hdGgudHJ1bmMoaG9yaXpvbnREaWZmKSA9PT0gTWF0aC50cnVuYyhjZWxsU2l6ZSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291bmQnKSA9PT0gJ29uJykge1xuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNvdW50ZXIgKz0gMTtcbiAgICAgICAgICB0aGlzLmNvdW50ZXIuaW5uZXJIVE1MID0gYE1vdmVzOiAke3RoaXMubW92ZUNvdW50ZXJ9YDtcbiAgICAgICAgICBpZiAodGhpcy50aW1lck9mZikge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy50aW1lck9mZiA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFt0aGlzLmxlZnQsIGNlbGxzW2ldLnN0eWxlLmxlZnRdID0gW2NlbGxzW2ldLnN0eWxlLmxlZnQsIHRoaXMubGVmdF07XG4gICAgICAgICAgW3RoaXMudG9wLCBjZWxsc1tpXS5zdHlsZS50b3BdID0gW2NlbGxzW2ldLnN0eWxlLnRvcCwgdGhpcy50b3BdO1xuICAgICAgICAgIHRoaXMuY2hlY2tTdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1N0YXR1cygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKGAke01hdGgudHJ1bmMoY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSl9cHhgID09PSBgJHsoKCtjZWxsLmlubmVyVGV4dCAtIDEpICUgTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkgKiBNYXRoLnRydW5jKGNlbGxTaXplKX1weGAgJiYgYCR7TWF0aC50cnVuYyhjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpfXB4YCA9PT0gYCR7KE1hdGgudHJ1bmMoKCtjZWxsLmlubmVyVGV4dCAtIDEpIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnQgPT09IGNlbGxzLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklkKTtcbiAgICB9XG4gIH1cblxuICBzZXRUaW1lcigpIHtcbiAgICBsZXQgdGltZSA9IDA7XG4gICAgdGhpcy50aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGltZSArPSAxO1xuICAgICAgdGhpcy50aW1lci5pbm5lckhUTUwgPSBgVGltZTogXG4gICAgICAke01hdGgudHJ1bmModGltZSAvIDYwKSA8IDEwID8gYDAke01hdGgudHJ1bmModGltZSAvIDYwKX1gXG4gICAgOiBNYXRoLnRydW5jKHRpbWUgLyA2MCl9OiR7dGltZSAlIDYwIDwgMTAgPyBgMCR7dGltZSAlIDYwfWAgOiB0aW1lICUgNjB9YDtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJZCk7XG4gICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLnRpbWVyLmlubmVyVGV4dCA9ICdUaW1lOiAwMDowMCc7XG4gICAgdGhpcy5jb3VudGVyLmlubmVyVGV4dCA9ICdNb3ZlczogMCc7XG4gICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG5cbiAgICB0aGlzLmZpZWxkU2l6ZSA9ICt0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJyk7XG4gICAgdGhpcy50ZXh0ID0gdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1pbWFnZScpO1xuXG4gICAgdGhpcy5jbGVhckZpZWxkKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgICB0aGlzLmNyZWF0ZUdhbWVGaWVsZCgpO1xuXG4gICAgdGhpcy5idXR0b25QbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgIHRoaXMuY3JlYXRlR2FtZUZpZWxkKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbmltcG9ydCBHZW1QdXp6bGUgZnJvbSAnLi9nZW0tcHV6emxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBHZW1QdXp6bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKTtcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncy1idXR0b24nKTtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy50ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcbiAgICB0aGlzLnNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdW5kJyk7XG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpO1xuICAgIHRoaXMuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZC1zaXplJyk7XG4gIH1cblxuICBjaGFuZ2VUZXh0KCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICBpZiAodGhpcy50ZXh0LnZhbHVlID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmZvbnRTaXplID0gJzByZW0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuY29sb3IgPSBgJHt0aGlzLnRleHQudmFsdWV9YDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuZm9udFNpemUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQub3V0ZXJUZXh0ID09PSAnU2V0dGluZ3MnKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmlubmVySFRNTCA9ICdSZXN1bWUgZ2FtZSc7XG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmlubmVySFRNTCA9ICdTZXR0aW5ncyc7XG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudGV4dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgYCR7dGhpcy50ZXh0LnZhbHVlfWApO1xuICAgICAgdGhpcy5jaGFuZ2VUZXh0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXNvdW5kJywgYCR7dGhpcy5zb3VuZC52YWx1ZX1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnLCBgJHt0aGlzLmltYWdlLnZhbHVlfWApO1xuICAgICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaXplLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXNpemUnLCBgJHt0aGlzLnNpemUudmFsdWV9YCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL21vZHVsZXMvZ2VtLXB1enpsZSc7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9tb2R1bGVzL3NldHRpbmdzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbmV3IEdlbVB1enpsZSgpLmluaXQoKTtcbiAgbmV3IFNldHRpbmdzKCkuaW5pdCgpO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9