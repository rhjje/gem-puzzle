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
    this.fieldSize = 16;
    this.text = 'black';
    this.image = 'off';
    this.moveCounter = 0;
    this.timerOff = true;
  }

  _createClass(GemPuzzle, [{
    key: "shuffleGameField",
    value: function shuffleGameField(size) {
      var arr = _toConsumableArray(Array(size).keys()).sort(function () {
        return Math.random() - 0.5;
      });

      arr.sort(function () {
        return Math.random() - 0.5;
      });
      var sqrt = Math.sqrt(size);
      var temp = [];

      for (var i = 0; i < arr.length; i += sqrt) {
        temp.push(arr.slice(i, sqrt + i));
      }

      temp.map(function (item, i) {
        if (i % 2) {
          return item.reverse();
        }

        return item;
      });
      var snakeArr = temp.flat();
      var counter = 0;

      for (var _i = 0; _i < snakeArr.length - 1; _i += 1) {
        if (snakeArr[_i] !== 0) {
          for (var j = _i + 1; j < snakeArr.length; j += 1) {
            if (snakeArr[_i] > snakeArr[j] && snakeArr[j] !== 0) counter += 1;
          }
        }
      }

      if (counter % 2 === 0) {
        if (arr[0] !== 0 && arr[1] !== 0) {
          var _ref = [arr[1], arr[0]];
          arr[0] = _ref[0];
          arr[1] = _ref[1];
        } else {
          var _ref2 = [arr[arr.length - 2], arr[arr.length - 1]];
          arr[arr.length - 1] = _ref2[0];
          arr[arr.length - 2] = _ref2[1];
        }
      }

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
        return cell.remove();
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
      cells.forEach(function (_, i) {
        var background = "".concat(urlImg, " ").concat((+cells[i].innerText - 1) % Math.sqrt(_this2.fieldSize) * (100 / (Math.sqrt(_this2.fieldSize) - 1)), "% ").concat(Math.trunc((+cells[i].innerText - 1) / Math.sqrt(_this2.fieldSize)) * (100 / (Math.sqrt(_this2.fieldSize) - 1)), "%");

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

            var _ref3 = [cells[i].style.left, _this3.left];
            _this3.left = _ref3[0];
            cells[i].style.left = _ref3[1];
            var _ref4 = [cells[i].style.top, _this3.top];
            _this3.top = _ref4[0];
            cells[i].style.top = _ref4[1];

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
        if (!_this5.field.getAttribute('data-pause')) {
          time += 1;
          _this5.timer.innerHTML = "Time: \n        ".concat(Math.trunc(time / 60) < 10 ? "0".concat(Math.trunc(time / 60)) : Math.trunc(time / 60), ":").concat(time % 60 < 10 ? "0".concat(time % 60) : time % 60);
        }
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
      this.getImageUrl();
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
          _this3.field.setAttribute('data-pause', true);

          _this3.button.innerHTML = 'Resume game';
          _this3.settings.style.display = 'flex';
        } else {
          _this3.field.removeAttribute('data-pause');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21vbWVudHVtLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvc2Nzcy9zdHlsZXMuc2NzcyJdLCJuYW1lcyI6WyJHZW1QdXp6bGUiLCJmaWVsZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJ1dHRvblBsYXkiLCJjb3VudGVyIiwidGltZXIiLCJlbmRPZkdhbWUiLCJhdWRpbyIsIkF1ZGlvIiwiZmllbGRTaXplIiwidGV4dCIsImltYWdlIiwibW92ZUNvdW50ZXIiLCJ0aW1lck9mZiIsInNpemUiLCJhcnIiLCJBcnJheSIsImtleXMiLCJzb3J0IiwiTWF0aCIsInJhbmRvbSIsInNxcnQiLCJ0ZW1wIiwiaSIsImxlbmd0aCIsInB1c2giLCJzbGljZSIsIm1hcCIsIml0ZW0iLCJyZXZlcnNlIiwic25ha2VBcnIiLCJmbGF0IiwiaiIsImNlbGxzIiwic2h1ZmZsZUdhbWVGaWVsZCIsImZvckVhY2giLCJsZWZ0IiwidG9wIiwiY2VsbFNpemUiLCJjZWxsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVyVGV4dCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJmb250U2l6ZSIsImNvbG9yIiwiYXBwZW5kIiwiYmluZFRyaWdnZXJzIiwic2V0SW1hZ2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwicmFuZG9tSW1hZ2UiLCJmbG9vciIsInNldEF0dHJpYnV0ZSIsInVybEltZyIsImdldEF0dHJpYnV0ZSIsIl8iLCJiYWNrZ3JvdW5kIiwidHJ1bmMiLCJiYWNrZ3JvdW5kU2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2ZXJ0aWNhbERpZmYiLCJhYnMiLCJob3Jpem9udERpZmYiLCJwbGF5IiwiaW5uZXJIVE1MIiwic2V0VGltZXIiLCJjaGVja1N0YXR1cyIsImNvdW50IiwiZGlzcGxheSIsImNsZWFySW50ZXJ2YWwiLCJ0aW1lcklkIiwidGltZSIsInNldEludGVydmFsIiwiZ2V0SW1hZ2VVcmwiLCJjbGVhckZpZWxkIiwiY3JlYXRlR2FtZUZpZWxkIiwic2V0SW5pdGlhbFN0YXRlIiwiU2V0dGluZ3MiLCJzZXR0aW5ncyIsImJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIiwic291bmQiLCJ2YWx1ZSIsImV2ZW50IiwidGFyZ2V0Iiwib3V0ZXJUZXh0IiwicmVtb3ZlQXR0cmlidXRlIiwiY2hhbmdlVGV4dCIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFFcUJBLFM7QUFDbkIsdUJBQWM7QUFBQTs7QUFDWixTQUFLQyxLQUFMLEdBQWFDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkYsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQWxCO0FBQ0EsU0FBS0UsT0FBTCxHQUFlSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBZjtBQUNBLFNBQUtHLEtBQUwsR0FBYUosUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxTQUFLSSxTQUFMLEdBQWlCTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBakI7QUFDQSxTQUFLSyxLQUFMLEdBQWEsSUFBSUMs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Q0FBQy9ELEtBQUwsQ0FBV3dELFlBQVgsQ0FBd0IsV0FBeEIsWUFBd0MsTUFBSSxDQUFDMUMsSUFBTCxDQUFVd0UsS0FBbEQ7QUFDRCxPQUZEO0FBR0Q7Ozs7RUF0RG1DdkYsZ0Q7Ozs7Ozs7O1VDRnRDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUFFLFFBQVEsQ0FBQzhELGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xELE1BQUloRSx3REFBSixHQUFnQjZGLElBQWhCO0FBQ0EsTUFBSVgsc0RBQUosR0FBZVcsSUFBZjtBQUNELENBSEQsRTs7Ozs7Ozs7O0FDSEEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW1QdXp6bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy5idXR0b25QbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXknKTtcbiAgICB0aGlzLmNvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlcicpO1xuICAgIHRoaXMudGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZXInKTtcbiAgICB0aGlzLmVuZE9mR2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmQtb2YtZ2FtZScpO1xuICAgIHRoaXMuYXVkaW8gPSBuZXcgQXVkaW8oJy4vYXNzZXRzL3NvdW5kcy9tb3ZlLndhdicpO1xuXG4gICAgdGhpcy5maWVsZFNpemUgPSAxNjtcbiAgICB0aGlzLnRleHQgPSAnYmxhY2snO1xuICAgIHRoaXMuaW1hZ2UgPSAnb2ZmJztcblxuICAgIHRoaXMubW92ZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMudGltZXJPZmYgPSB0cnVlO1xuICB9XG5cbiAgc2h1ZmZsZUdhbWVGaWVsZChzaXplKSB7XG4gICAgY29uc3QgYXJyID0gWy4uLkFycmF5KHNpemUpLmtleXMoKV0uc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcbiAgICBhcnIuc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcbiAgICBjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KHNpemUpO1xuICAgIGNvbnN0IHRlbXAgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gc3FydCkge1xuICAgICAgdGVtcC5wdXNoKGFyci5zbGljZShpLCBzcXJ0ICsgaSkpO1xuICAgIH1cbiAgICB0ZW1wLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgaWYgKGkgJSAyKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnJldmVyc2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuICAgIGNvbnN0IHNuYWtlQXJyID0gdGVtcC5mbGF0KCk7XG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25ha2VBcnIubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICBpZiAoc25ha2VBcnJbaV0gIT09IDApIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgc25ha2VBcnIubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBpZiAoc25ha2VBcnJbaV0gPiBzbmFrZUFycltqXSAmJiBzbmFrZUFycltqXSAhPT0gMCkgY291bnRlciArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb3VudGVyICUgMiA9PT0gMCkge1xuICAgICAgaWYgKGFyclswXSAhPT0gMCAmJiBhcnJbMV0gIT09IDApIHtcbiAgICAgICAgW2FyclswXSwgYXJyWzFdXSA9IFthcnJbMV0sIGFyclswXV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbYXJyW2Fyci5sZW5ndGggLSAxXSwgYXJyW2Fyci5sZW5ndGggLSAyXV0gPSBbYXJyW2Fyci5sZW5ndGggLSAyXSwgYXJyW2Fyci5sZW5ndGggLSAxXV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjcmVhdGVHYW1lRmllbGQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSB0aGlzLnNodWZmbGVHYW1lRmllbGQodGhpcy5maWVsZFNpemUpO1xuICAgIGNlbGxzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGxlZnQgPSBpICUgTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGNvbnN0IHRvcCA9IChpIC0gbGVmdCkgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgaWYgKGl0ZW0gIT09IDApIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgY2VsbC5pbm5lclRleHQgPSBpdGVtO1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gYCR7NDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUuaGVpZ2h0ID0gYCR7NDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUudG9wID0gYCR7dG9wICogY2VsbFNpemV9cHhgO1xuXG4gICAgICAgIGlmICh0aGlzLnRleHQgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gJzByZW0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBgJHt0aGlzLnRleHR9YDtcbiAgICAgICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWVsZC5hcHBlbmQoY2VsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlZnQgPSBgJHtsZWZ0ICogY2VsbFNpemV9cHhgO1xuICAgICAgICB0aGlzLnRvcCA9IGAke3RvcCAqIGNlbGxTaXplfXB4YDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmJpbmRUcmlnZ2VycygpO1xuICAgIGlmICh0aGlzLmltYWdlID09PSAnb24nKSB0aGlzLnNldEltYWdlKCk7XG4gIH1cblxuICBjbGVhckZpZWxkKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLnJlbW92ZSgpKTtcbiAgfVxuXG4gIGdldEltYWdlVXJsKCkge1xuICAgIGNvbnN0IHJhbmRvbUltYWdlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDE1MCAtIDEpICsgMSk7XG4gICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXJsJywgYHVybChhc3NldHMvaW1hZ2VzLyR7cmFuZG9tSW1hZ2V9LmpwZylgKTtcbiAgfVxuXG4gIHNldEltYWdlKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjb25zdCB1cmxJbWcgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKTtcblxuICAgIGNlbGxzLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBgJHt1cmxJbWd9ICR7KCgrY2VsbHNbaV0uaW5uZXJUZXh0IC0gMSkgJSAoTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpXG4gICAgICAgICogKDEwMCAvIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpIC0gMSkpfSUgJHtNYXRoLnRydW5jKCgrY2VsbHNbaV0uaW5uZXJUZXh0IC0gMSkgLyAoTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpXG4gICAgICAgICogKDEwMCAvIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpIC0gMSkpfSVgO1xuICAgICAgaWYgKHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWltYWdlJykgPT09ICdvbicpIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzQwMHB4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRUcmlnZ2VycygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdmVydGljYWxEaWZmID0gTWF0aC5hYnModGhpcy50b3Auc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS50b3Auc2xpY2UoMCwgLTIpKTtcbiAgICAgICAgY29uc3QgaG9yaXpvbnREaWZmID0gTWF0aC5hYnModGhpcy5sZWZ0LnNsaWNlKDAsIC0yKSAtIGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgIGlmIChNYXRoLnRydW5jKHZlcnRpY2FsRGlmZikgKyBNYXRoLnRydW5jKGhvcml6b250RGlmZikgPT09IE1hdGgudHJ1bmMoY2VsbFNpemUpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXNvdW5kJykgPT09ICdvbicpIHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDb3VudGVyICs9IDE7XG4gICAgICAgICAgdGhpcy5jb3VudGVyLmlubmVySFRNTCA9IGBNb3ZlczogJHt0aGlzLm1vdmVDb3VudGVyfWA7XG4gICAgICAgICAgaWYgKHRoaXMudGltZXJPZmYpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudGltZXJPZmYgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBbdGhpcy5sZWZ0LCBjZWxsc1tpXS5zdHlsZS5sZWZ0XSA9IFtjZWxsc1tpXS5zdHlsZS5sZWZ0LCB0aGlzLmxlZnRdO1xuICAgICAgICAgIFt0aGlzLnRvcCwgY2VsbHNbaV0uc3R5bGUudG9wXSA9IFtjZWxsc1tpXS5zdHlsZS50b3AsIHRoaXMudG9wXTtcbiAgICAgICAgICB0aGlzLmNoZWNrU3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tTdGF0dXMoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmIChgJHtNYXRoLnRydW5jKGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpfXB4YFxuICAgICAgPT09IGAkeygoK2NlbGwuaW5uZXJUZXh0IC0gMSkgJSBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSAqIE1hdGgudHJ1bmMoY2VsbFNpemUpfXB4YFxuICAgICAgJiYgYCR7TWF0aC50cnVuYyhjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpfXB4YFxuICAgICAgPT09IGAkeyhNYXRoLnRydW5jKCgrY2VsbC5pbm5lclRleHQgLSAxKSAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpKSAqIE1hdGgudHJ1bmMoY2VsbFNpemUpfXB4YCkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNvdW50ID09PSBjZWxscy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW5kT2ZHYW1lLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VGltZXIoKSB7XG4gICAgbGV0IHRpbWUgPSAwO1xuICAgIHRoaXMudGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGF1c2UnKSkge1xuICAgICAgICB0aW1lICs9IDE7XG4gICAgICAgIHRoaXMudGltZXIuaW5uZXJIVE1MID0gYFRpbWU6IFxuICAgICAgICAke01hdGgudHJ1bmModGltZSAvIDYwKSA8IDEwID8gYDAke01hdGgudHJ1bmModGltZSAvIDYwKX1gXG4gICAgOiBNYXRoLnRydW5jKHRpbWUgLyA2MCl9OiR7dGltZSAlIDYwIDwgMTAgPyBgMCR7dGltZSAlIDYwfWAgOiB0aW1lICUgNjB9YDtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJZCk7XG4gICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLnRpbWVyLmlubmVyVGV4dCA9ICdUaW1lOiAwMDowMCc7XG4gICAgdGhpcy5jb3VudGVyLmlubmVyVGV4dCA9ICdNb3ZlczogMCc7XG4gICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG5cbiAgICB0aGlzLmZpZWxkU2l6ZSA9ICt0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJyk7XG4gICAgdGhpcy50ZXh0ID0gdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1pbWFnZScpO1xuXG4gICAgdGhpcy5nZXRJbWFnZVVybCgpO1xuICAgIHRoaXMuY2xlYXJGaWVsZCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmdldEltYWdlVXJsKCk7XG4gICAgdGhpcy5jcmVhdGVHYW1lRmllbGQoKTtcblxuICAgIHRoaXMuYnV0dG9uUGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICB0aGlzLmNyZWF0ZUdhbWVGaWVsZCgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgR2VtUHV6emxlIGZyb20gJy4vZ2VtLXB1enpsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzIGV4dGVuZHMgR2VtUHV6emxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNldHRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJyk7XG4gICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MtYnV0dG9uJyk7XG4gICAgdGhpcy5maWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZCcpO1xuICAgIHRoaXMudGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Jyk7XG4gICAgdGhpcy5zb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZCcpO1xuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKTtcbiAgICB0aGlzLnNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmllbGQtc2l6ZScpO1xuICB9XG5cbiAgY2hhbmdlVGV4dCgpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgaWYgKHRoaXMudGV4dC52YWx1ZSA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5mb250U2l6ZSA9ICcwcmVtJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmNvbG9yID0gYCR7dGhpcy50ZXh0LnZhbHVlfWA7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0Lm91dGVyVGV4dCA9PT0gJ1NldHRpbmdzJykge1xuICAgICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1wYXVzZScsIHRydWUpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5pbm5lckhUTUwgPSAnUmVzdW1lIGdhbWUnO1xuICAgICAgICB0aGlzLnNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1wYXVzZScpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5pbm5lckhUTUwgPSAnU2V0dGluZ3MnO1xuICAgICAgICB0aGlzLnNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcsIGAke3RoaXMudGV4dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuY2hhbmdlVGV4dCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1zb3VuZCcsIGAke3RoaXMuc291bmQudmFsdWV9YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLWltYWdlJywgYCR7dGhpcy5pbWFnZS52YWx1ZX1gKTtcbiAgICAgIHRoaXMuc2V0SW1hZ2UoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2l6ZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1zaXplJywgYCR7dGhpcy5zaXplLnZhbHVlfWApO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHZW1QdXp6bGUgZnJvbSAnLi9tb2R1bGVzL2dlbS1wdXp6bGUnO1xuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vbW9kdWxlcy9zZXR0aW5ncyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIG5ldyBHZW1QdXp6bGUoKS5pbml0KCk7XG4gIG5ldyBTZXR0aW5ncygpLmluaXQoKTtcbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sInNvdXJjZVJvb3QiOiIifQ==