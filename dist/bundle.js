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

/***/ "./src/js/modules/resume-game.js":
/*!***************************************!*\
  !*** ./src/js/modules/resume-game.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var resumeGame = function resumeGame() {
  var settings = document.querySelector('.settings');
  var button = document.querySelector('.settings-button');
  button.addEventListener('click', function (event) {
    if (event.target.outerText === 'Settings') {
      button.innerHTML = 'Resume game';
      settings.style.display = 'block';
    } else {
      button.innerHTML = 'Settings';
      settings.style.display = 'none';
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resumeGame);

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
/* harmony import */ var _modules_resume_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/resume-game */ "./src/js/modules/resume-game.js");
/* harmony import */ var _modules_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/settings */ "./src/js/modules/settings.js");



document.addEventListener('DOMContentLoaded', function () {
  new _modules_gem_puzzle__WEBPACK_IMPORTED_MODULE_0__.default().init();
  (0,_modules_resume_game__WEBPACK_IMPORTED_MODULE_1__.default)();
  new _modules_settings__WEBPACK_IMPORTED_MODULE_2__.default().init();
});
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************!*\
  !*** ./src/sass/styles.scss ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9yZXN1bWUtZ2FtZS5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL3NldHRpbmdzLmpzIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9zYXNzL3N0eWxlcy5zY3NzIl0sIm5hbWVzIjpbIkdlbVB1enpsZSIsImZpZWxkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYnV0dG9uUGxheSIsImNvdW50ZXIiLCJ0aW1lciIsImVuZE9mR2FtZSIsImF1ZGlvIiwiQXVkaW8iLCJtb3ZlQ291bnRlciIsImZpZWxkU2l6ZSIsInRleHQiLCJpbWFnZSIsInRpbWVyT2ZmIiwic2l6ZSIsImFyciIsIkFycmF5Iiwia2V5cyIsInNvcnQiLCJNYXRoIiwicmFuZG9tIiwiY2VsbHMiLCJzaHVmZmxlR2FtZUZpZWxkIiwiZm9yRWFjaCIsIml0ZW0iLCJpIiwibGVmdCIsInNxcnQiLCJ0b3AiLCJjZWxsU2l6ZSIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJUZXh0Iiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImZvbnRTaXplIiwiY29sb3IiLCJhcHBlbmQiLCJiaW5kVHJpZ2dlcnMiLCJzZXRJbWFnZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJyYW5kb21JbWFnZSIsImZsb29yIiwic2V0QXR0cmlidXRlIiwidXJsSW1nIiwiZ2V0QXR0cmlidXRlIiwibGVuZ3RoIiwiXyIsImJhY2tncm91bmQiLCJ0cnVuYyIsImJhY2tncm91bmRTaXplIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZlcnRpY2FsRGlmZiIsImFicyIsInNsaWNlIiwiaG9yaXpvbnREaWZmIiwicGxheSIsImlubmVySFRNTCIsInNldFRpbWVyIiwiY2hlY2tTdGF0dXMiLCJjb3VudCIsImRpc3BsYXkiLCJjbGVhckludGVydmFsIiwidGltZXJJZCIsInRpbWUiLCJzZXRJbnRlcnZhbCIsImNsZWFyRmllbGQiLCJnZXRJbWFnZVVybCIsImNyZWF0ZUdhbWVGaWVsZCIsInNldEluaXRpYWxTdGF0ZSIsInJlc3VtZUdhbWUiLCJzZXR0aW5ncyIsImJ1dHRvbiIsImV2ZW50IiwidGFyZ2V0Iiwib3V0ZXJUZXh0IiwiU2V0dGluZ3MiLCJnZXRFbGVtZW50QnlJZCIsInNvdW5kIiwidmFsdWUiLCJjaGFuZ2VUZXh0IiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUVxQkEsUztBQUNuQix1QkFBYztBQUFBOztBQUNaLFNBQUtDLEtBQUwsR0FBYUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBbEI7QUFDQSxTQUFLRSxPQUFMLEdBQWVILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFmO0FBQ0EsU0FBS0csS0FBTCxHQUFhSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLFNBQUtJLFNBQUwsR0FBaUJMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFqQjtBQUNBLFNBQUtLLEtBQUwsR0FBYSxJQUFJQyxLQUFK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QUN2RCxLQUFMLENBQVcrQyxZQUFYLENBQXdCLFlBQXhCLFlBQXlDLE1BQUksQ0FBQ25DLEtBQUwsQ0FBV3VFLEtBQXBEOztBQUNBLGNBQUksQ0FBQ3pDLFFBQUw7QUFDRCxPQUhEO0FBS0EsV0FBSzVCLElBQUwsQ0FBVXlDLGdCQUFWLENBQTJCLFFBQTNCLEVBQXFDLFlBQU07QUFDekMsY0FBSSxDQUFDdkQsS0FBTCxDQUFXK0MsWUFBWCxDQUF3QixXQUF4QixZQUF3QyxNQUFJLENBQUNqQyxJQUFMLENBQVVxRSxLQUFsRDtBQUNELE9BRkQ7QUFHRDs7OztFQXhDbUNwRixnRDs7Ozs7Ozs7VUNIdEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFFQUUsUUFBUSxDQUFDc0QsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsTUFBSXhELHdEQUFKLEdBQWdCc0YsSUFBaEI7QUFDQVgsK0RBQVU7QUFDVixNQUFJTSxzREFBSixHQUFlSyxJQUFmO0FBQ0QsQ0FKRCxFOzs7Ozs7Ozs7QUNKQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbVB1enpsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmllbGQnKTtcbiAgICB0aGlzLmJ1dHRvblBsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheScpO1xuICAgIHRoaXMuY291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyJyk7XG4gICAgdGhpcy50aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lcicpO1xuICAgIHRoaXMuZW5kT2ZHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZC1vZi1nYW1lJyk7XG4gICAgdGhpcy5hdWRpbyA9IG5ldyBBdWRpbygnLi9hc3NldHMvc291bmRzL21vdmUud2F2Jyk7XG4gICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG5cbiAgICB0aGlzLmZpZWxkU2l6ZSA9IDE2O1xuICAgIHRoaXMudGV4dCA9ICdibGFjayc7XG4gICAgdGhpcy5pbWFnZSA9ICdvZmYnO1xuICAgIHRoaXMudGltZXJPZmYgPSB0cnVlO1xuICB9XG5cbiAgc2h1ZmZsZUdhbWVGaWVsZChzaXplKSB7XG4gICAgY29uc3QgYXJyID0gWy4uLkFycmF5KHNpemUpLmtleXMoKV0uc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgY3JlYXRlR2FtZUZpZWxkKCkge1xuICAgIGNvbnN0IGNlbGxzID0gdGhpcy5zaHVmZmxlR2FtZUZpZWxkKHRoaXMuZmllbGRTaXplKTtcbiAgICBjZWxscy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICBjb25zdCBsZWZ0ID0gaSAlIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICBjb25zdCB0b3AgPSAoaSAtIGxlZnQpIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGlmIChpdGVtICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gaXRlbTtcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IGAkezQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSl9cHhgO1xuICAgICAgICBjZWxsLnN0eWxlLmhlaWdodCA9IGAkezQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSl9cHhgO1xuICAgICAgICBjZWxsLnN0eWxlLmxlZnQgPSBgJHtsZWZ0ICogY2VsbFNpemV9cHhgO1xuICAgICAgICBjZWxsLnN0eWxlLnRvcCA9IGAke3RvcCAqIGNlbGxTaXplfXB4YDtcblxuICAgICAgICBpZiAodGhpcy50ZXh0ID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgICAgY2VsbC5zdHlsZS5mb250U2l6ZSA9ICcwcmVtJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsLnN0eWxlLmNvbG9yID0gYCR7dGhpcy50ZXh0fWA7XG4gICAgICAgICAgY2VsbC5zdHlsZS5mb250U2l6ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmllbGQuYXBwZW5kKGNlbGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZWZ0ID0gYCR7bGVmdCAqIGNlbGxTaXplfXB4YDtcbiAgICAgICAgdGhpcy50b3AgPSBgJHt0b3AgKiBjZWxsU2l6ZX1weGA7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5iaW5kVHJpZ2dlcnMoKTtcbiAgICBpZiAodGhpcy5pbWFnZSA9PT0gJ29uJykgdGhpcy5zZXRJbWFnZSgpO1xuICB9XG5cbiAgY2xlYXJGaWVsZCgpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEltYWdlVXJsKCkge1xuICAgIGNvbnN0IHJhbmRvbUltYWdlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDE1MCAtIDEpICsgMSk7XG4gICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXJsJywgYHVybChhc3NldHMvaW1hZ2VzLyR7cmFuZG9tSW1hZ2V9LmpwZylgKTtcbiAgfVxuXG4gIHNldEltYWdlKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjb25zdCB1cmxJbWcgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKTtcbiAgICBjb25zdCBmaWVsZFNpemUgPSBjZWxscy5sZW5ndGggKyAxO1xuXG4gICAgY2VsbHMuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IGAke3VybEltZ30gJHsoKCtjZWxsc1tpXS5pbm5lclRleHQgLSAxKSAlIChNYXRoLnNxcnQoZmllbGRTaXplKSkpXG4gICAgICAgICogKDEwMCAvIChNYXRoLnNxcnQoZmllbGRTaXplKSAtIDEpKX0lICR7TWF0aC50cnVuYygoK2NlbGxzW2ldLmlubmVyVGV4dCAtIDEpIC8gKE1hdGguc3FydChmaWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydChmaWVsZFNpemUpIC0gMSkpfSVgO1xuICAgICAgaWYgKHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWltYWdlJykgPT09ICdvbicpIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzQwMHB4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRUcmlnZ2VycygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdmVydGljYWxEaWZmID0gTWF0aC5hYnModGhpcy50b3Auc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS50b3Auc2xpY2UoMCwgLTIpKTtcbiAgICAgICAgY29uc3QgaG9yaXpvbnREaWZmID0gTWF0aC5hYnModGhpcy5sZWZ0LnNsaWNlKDAsIC0yKSAtIGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgIGlmIChNYXRoLnRydW5jKHZlcnRpY2FsRGlmZikgKyBNYXRoLnRydW5jKGhvcml6b250RGlmZikgPT09IE1hdGgudHJ1bmMoY2VsbFNpemUpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXNvdW5kJykgPT09ICdvbicpIHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDb3VudGVyICs9IDE7XG4gICAgICAgICAgdGhpcy5jb3VudGVyLmlubmVySFRNTCA9IGBNb3ZlczogJHt0aGlzLm1vdmVDb3VudGVyfWA7XG4gICAgICAgICAgaWYgKHRoaXMudGltZXJPZmYpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudGltZXJPZmYgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBbdGhpcy5sZWZ0LCBjZWxsc1tpXS5zdHlsZS5sZWZ0XSA9IFtjZWxsc1tpXS5zdHlsZS5sZWZ0LCB0aGlzLmxlZnRdO1xuICAgICAgICAgIFt0aGlzLnRvcCwgY2VsbHNbaV0uc3R5bGUudG9wXSA9IFtjZWxsc1tpXS5zdHlsZS50b3AsIHRoaXMudG9wXTtcbiAgICAgICAgICB0aGlzLmNoZWNrU3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tTdGF0dXMoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmIChgJHtNYXRoLnRydW5jKGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpfXB4YCA9PT0gYCR7KCgrY2VsbC5pbm5lclRleHQgLSAxKSAlIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgICYmIGAke01hdGgudHJ1bmMoY2VsbC5zdHlsZS50b3Auc2xpY2UoMCwgLTIpKX1weGAgPT09IGAkeyhNYXRoLnRydW5jKCgrY2VsbC5pbm5lclRleHQgLSAxKSAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpKSAqIE1hdGgudHJ1bmMoY2VsbFNpemUpfXB4YCkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNvdW50ID09PSBjZWxscy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW5kT2ZHYW1lLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VGltZXIoKSB7XG4gICAgbGV0IHRpbWUgPSAwO1xuICAgIHRoaXMudGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRpbWUgKz0gMTtcbiAgICAgIHRoaXMudGltZXIuaW5uZXJIVE1MID0gYFRpbWU6IFxuICAgICAgJHtNYXRoLnRydW5jKHRpbWUgLyA2MCkgPCAxMCA/IGAwJHtNYXRoLnRydW5jKHRpbWUgLyA2MCl9YFxuICAgIDogTWF0aC50cnVuYyh0aW1lIC8gNjApfToke3RpbWUgJSA2MCA8IDEwID8gYDAke3RpbWUgJSA2MH1gIDogdGltZSAlIDYwfWA7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySWQpO1xuICAgIHRoaXMuZW5kT2ZHYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy50aW1lci5pbm5lclRleHQgPSAnVGltZTogMDA6MDAnO1xuICAgIHRoaXMuY291bnRlci5pbm5lclRleHQgPSAnTW92ZXM6IDAnO1xuICAgIHRoaXMubW92ZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMudGltZXJPZmYgPSB0cnVlO1xuXG4gICAgdGhpcy5maWVsZFNpemUgPSArdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScpO1xuICAgIHRoaXMudGV4dCA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXRleHQnKTtcbiAgICB0aGlzLmltYWdlID0gdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKTtcblxuICAgIHRoaXMuY2xlYXJGaWVsZCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmdldEltYWdlVXJsKCk7XG4gICAgdGhpcy5jcmVhdGVHYW1lRmllbGQoKTtcblxuICAgIHRoaXMuYnV0dG9uUGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICB0aGlzLmNyZWF0ZUdhbWVGaWVsZCgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJjb25zdCByZXN1bWVHYW1lID0gKCkgPT4ge1xuICBjb25zdCBzZXR0aW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncycpO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MtYnV0dG9uJyk7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQub3V0ZXJUZXh0ID09PSAnU2V0dGluZ3MnKSB7XG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gJ1Jlc3VtZSBnYW1lJztcbiAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gJ1NldHRpbmdzJztcbiAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlc3VtZUdhbWU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG5pbXBvcnQgR2VtUHV6emxlIGZyb20gJy4vZ2VtLXB1enpsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzIGV4dGVuZHMgR2VtUHV6emxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy50ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcbiAgICB0aGlzLnNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdW5kJyk7XG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpO1xuICAgIHRoaXMuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZC1zaXplJyk7XG4gIH1cblxuICBjaGFuZ2VUZXh0KCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICBpZiAodGhpcy50ZXh0LnZhbHVlID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmZvbnRTaXplID0gJzByZW0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuY29sb3IgPSBgJHt0aGlzLnRleHQudmFsdWV9YDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuZm9udFNpemUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy50ZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXRleHQnLCBgJHt0aGlzLnRleHQudmFsdWV9YCk7XG4gICAgICB0aGlzLmNoYW5nZVRleHQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc291bmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc291bmQnLCBgJHt0aGlzLnNvdW5kLnZhbHVlfWApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1pbWFnZScsIGAke3RoaXMuaW1hZ2UudmFsdWV9YCk7XG4gICAgICB0aGlzLnNldEltYWdlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNpemUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScsIGAke3RoaXMuc2l6ZS52YWx1ZX1gKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2VtUHV6emxlIGZyb20gJy4vbW9kdWxlcy9nZW0tcHV6emxlJztcbmltcG9ydCByZXN1bWVHYW1lIGZyb20gJy4vbW9kdWxlcy9yZXN1bWUtZ2FtZSc7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9tb2R1bGVzL3NldHRpbmdzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbmV3IEdlbVB1enpsZSgpLmluaXQoKTtcbiAgcmVzdW1lR2FtZSgpO1xuICBuZXcgU2V0dGluZ3MoKS5pbml0KCk7XG59KTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJzb3VyY2VSb290IjoiIn0=