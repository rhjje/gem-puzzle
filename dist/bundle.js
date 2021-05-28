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
        var _ref = [arr[1], arr[0]];
        arr[0] = _ref[0];
        arr[1] = _ref[1];
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

            var _ref2 = [cells[i].style.left, _this3.left];
            _this3.left = _ref2[0];
            cells[i].style.left = _ref2[1];
            var _ref3 = [cells[i].style.top, _this3.top];
            _this3.top = _ref3[0];
            cells[i].style.top = _ref3[1];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21vbWVudHVtLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvc2Nzcy9zdHlsZXMuc2NzcyJdLCJuYW1lcyI6WyJHZW1QdXp6bGUiLCJmaWVsZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJ1dHRvblBsYXkiLCJjb3VudGVyIiwidGltZXIiLCJlbmRPZkdhbWUiLCJhdWRpbyIsIkF1ZGlvIiwiZmllbGRTaXplIiwidGV4dCIsImltYWdlIiwibW92ZUNvdW50ZXIiLCJ0aW1lck9mZiIsInNpemUiLCJhcnIiLCJBcnJheSIsImtleXMiLCJzb3J0IiwiTWF0aCIsInJhbmRvbSIsInNxcnQiLCJ0ZW1wIiwiaSIsImxlbmd0aCIsInB1c2giLCJzbGljZSIsIm1hcCIsIml0ZW0iLCJyZXZlcnNlIiwic25ha2VBcnIiLCJmbGF0IiwiaiIsImNlbGxzIiwic2h1ZmZsZUdhbWVGaWVsZCIsImZvckVhY2giLCJsZWZ0IiwidG9wIiwiY2VsbFNpemUiLCJjZWxsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVyVGV4dCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJmb250U2l6ZSIsImNvbG9yIiwiYXBwZW5kIiwiYmluZFRyaWdnZXJzIiwic2V0SW1hZ2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwicmFuZG9tSW1hZ2UiLCJmbG9vciIsInNldEF0dHJpYnV0ZSIsInVybEltZyIsImdldEF0dHJpYnV0ZSIsIl8iLCJiYWNrZ3JvdW5kIiwidHJ1bmMiLCJiYWNrZ3JvdW5kU2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2ZXJ0aWNhbERpZmYiLCJhYnMiLCJob3Jpem9udERpZmYiLCJwbGF5IiwiaW5uZXJIVE1MIiwic2V0VGltZXIiLCJjaGVja1N0YXR1cyIsImNvdW50IiwiZGlzcGxheSIsImNsZWFySW50ZXJ2YWwiLCJ0aW1lcklkIiwidGltZSIsInNldEludGVydmFsIiwiZ2V0SW1hZ2VVcmwiLCJjbGVhckZpZWxkIiwiY3JlYXRlR2FtZUZpZWxkIiwic2V0SW5pdGlhbFN0YXRlIiwiU2V0dGluZ3MiLCJzZXR0aW5ncyIsImJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIiwic291bmQiLCJ2YWx1ZSIsImV2ZW50IiwidGFyZ2V0Iiwib3V0ZXJUZXh0IiwicmVtb3ZlQXR0cmlidXRlIiwiY2hhbmdlVGV4dCIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFFcUJBLFM7QUFDbkIsdUJBQWM7QUFBQTs7QUFDWixTQUFLQyxLQUFMLEdBQWFDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkYsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQWxCO0FBQ0EsU0FBS0UsT0FBTCxHQUFlSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBZjtBQUNBLFNBQUtHLEtBQUwsR0FBYUosUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxTQUFLSSxTQUFMLEdBQWlCTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBakI7QUFDQSxTQUFLSyxLQUFMLEdBQWEsSUFBSUMs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a0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFFQUUsUUFBUSxDQUFDOEQsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsTUFBSWhFLHdEQUFKLEdBQWdCNkYsSUFBaEI7QUFDQSxNQUFJWCxzREFBSixHQUFlVyxJQUFmO0FBQ0QsQ0FIRCxFOzs7Ozs7Ozs7QUNIQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbVB1enpsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmllbGQnKTtcbiAgICB0aGlzLmJ1dHRvblBsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheScpO1xuICAgIHRoaXMuY291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyJyk7XG4gICAgdGhpcy50aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lcicpO1xuICAgIHRoaXMuZW5kT2ZHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZC1vZi1nYW1lJyk7XG4gICAgdGhpcy5hdWRpbyA9IG5ldyBBdWRpbygnLi9hc3NldHMvc291bmRzL21vdmUud2F2Jyk7XG5cbiAgICB0aGlzLmZpZWxkU2l6ZSA9IDE2O1xuICAgIHRoaXMudGV4dCA9ICdibGFjayc7XG4gICAgdGhpcy5pbWFnZSA9ICdvZmYnO1xuXG4gICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG4gIH1cblxuICBzaHVmZmxlR2FtZUZpZWxkKHNpemUpIHtcbiAgICBjb25zdCBhcnIgPSBbLi4uQXJyYXkoc2l6ZSkua2V5cygpXS5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuICAgIGFyci5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuICAgIGNvbnN0IHNxcnQgPSBNYXRoLnNxcnQoc2l6ZSk7XG4gICAgY29uc3QgdGVtcCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSBzcXJ0KSB7XG4gICAgICB0ZW1wLnB1c2goYXJyLnNsaWNlKGksIHNxcnQgKyBpKSk7XG4gICAgfVxuICAgIHRlbXAubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICBpZiAoaSAlIDIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucmV2ZXJzZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gICAgY29uc3Qgc25ha2VBcnIgPSB0ZW1wLmZsYXQoKTtcbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbmFrZUFyci5sZW5ndGggLSAxOyBpICs9IDEpIHtcbiAgICAgIGlmIChzbmFrZUFycltpXSAhPT0gMCkge1xuICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBzbmFrZUFyci5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGlmIChzbmFrZUFycltpXSA+IHNuYWtlQXJyW2pdICYmIHNuYWtlQXJyW2pdICE9PSAwKSBjb3VudGVyICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvdW50ZXIgJSAyID09PSAwKSB7XG4gICAgICBbYXJyWzBdLCBhcnJbMV1dID0gW2FyclsxXSwgYXJyWzBdXTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGNyZWF0ZUdhbWVGaWVsZCgpIHtcbiAgICBjb25zdCBjZWxscyA9IHRoaXMuc2h1ZmZsZUdhbWVGaWVsZCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgY2VsbHMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgY29uc3QgbGVmdCA9IGkgJSBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgY29uc3QgdG9wID0gKGkgLSBsZWZ0KSAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICBpZiAoaXRlbSAhPT0gMCkge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICBjZWxsLmlubmVyVGV4dCA9IGl0ZW07XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSBgJHs0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS5oZWlnaHQgPSBgJHs0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdCAqIGNlbGxTaXplfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS50b3AgPSBgJHt0b3AgKiBjZWxsU2l6ZX1weGA7XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dCA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICAgIGNlbGwuc3R5bGUuZm9udFNpemUgPSAnMHJlbSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IGAke3RoaXMudGV4dH1gO1xuICAgICAgICAgIGNlbGwuc3R5bGUuZm9udFNpemUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpZWxkLmFwcGVuZChjZWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XG4gICAgICAgIHRoaXMudG9wID0gYCR7dG9wICogY2VsbFNpemV9cHhgO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYmluZFRyaWdnZXJzKCk7XG4gICAgaWYgKHRoaXMuaW1hZ2UgPT09ICdvbicpIHRoaXMuc2V0SW1hZ2UoKTtcbiAgfVxuXG4gIGNsZWFyRmllbGQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwucmVtb3ZlKCkpO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgY29uc3QgcmFuZG9tSW1hZ2UgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTUwIC0gMSkgKyAxKTtcbiAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS11cmwnLCBgdXJsKGFzc2V0cy9pbWFnZXMvJHtyYW5kb21JbWFnZX0uanBnKWApO1xuICB9XG5cbiAgc2V0SW1hZ2UoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IHVybEltZyA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXVybCcpO1xuXG4gICAgY2VsbHMuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IGAke3VybEltZ30gJHsoKCtjZWxsc1tpXS5pbm5lclRleHQgLSAxKSAlIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkgLSAxKSl9JSAke01hdGgudHJ1bmMoKCtjZWxsc1tpXS5pbm5lclRleHQgLSAxKSAvIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkgLSAxKSl9JWA7XG4gICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKSA9PT0gJ29uJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNDAwcHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZFRyaWdnZXJzKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbERpZmYgPSBNYXRoLmFicyh0aGlzLnRvcC5zbGljZSgwLCAtMikgLSBjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBob3Jpem9udERpZmYgPSBNYXRoLmFicyh0aGlzLmxlZnQuc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSk7XG4gICAgICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgICAgaWYgKE1hdGgudHJ1bmModmVydGljYWxEaWZmKSArIE1hdGgudHJ1bmMoaG9yaXpvbnREaWZmKSA9PT0gTWF0aC50cnVuYyhjZWxsU2l6ZSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291bmQnKSA9PT0gJ29uJykge1xuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNvdW50ZXIgKz0gMTtcbiAgICAgICAgICB0aGlzLmNvdW50ZXIuaW5uZXJIVE1MID0gYE1vdmVzOiAke3RoaXMubW92ZUNvdW50ZXJ9YDtcbiAgICAgICAgICBpZiAodGhpcy50aW1lck9mZikge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy50aW1lck9mZiA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFt0aGlzLmxlZnQsIGNlbGxzW2ldLnN0eWxlLmxlZnRdID0gW2NlbGxzW2ldLnN0eWxlLmxlZnQsIHRoaXMubGVmdF07XG4gICAgICAgICAgW3RoaXMudG9wLCBjZWxsc1tpXS5zdHlsZS50b3BdID0gW2NlbGxzW2ldLnN0eWxlLnRvcCwgdGhpcy50b3BdO1xuICAgICAgICAgIHRoaXMuY2hlY2tTdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1N0YXR1cygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKGAke01hdGgudHJ1bmMoY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSl9cHhgXG4gICAgICA9PT0gYCR7KCgrY2VsbC5pbm5lclRleHQgLSAxKSAlIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgXG4gICAgICAmJiBgJHtNYXRoLnRydW5jKGNlbGwuc3R5bGUudG9wLnNsaWNlKDAsIC0yKSl9cHhgXG4gICAgICA9PT0gYCR7KE1hdGgudHJ1bmMoKCtjZWxsLmlubmVyVGV4dCAtIDEpIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnQgPT09IGNlbGxzLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklkKTtcbiAgICB9XG4gIH1cblxuICBzZXRUaW1lcigpIHtcbiAgICBsZXQgdGltZSA9IDA7XG4gICAgdGhpcy50aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXVzZScpKSB7XG4gICAgICAgIHRpbWUgKz0gMTtcbiAgICAgICAgdGhpcy50aW1lci5pbm5lckhUTUwgPSBgVGltZTogXG4gICAgICAgICR7TWF0aC50cnVuYyh0aW1lIC8gNjApIDwgMTAgPyBgMCR7TWF0aC50cnVuYyh0aW1lIC8gNjApfWBcbiAgICA6IE1hdGgudHJ1bmModGltZSAvIDYwKX06JHt0aW1lICUgNjAgPCAxMCA/IGAwJHt0aW1lICUgNjB9YCA6IHRpbWUgJSA2MH1gO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklkKTtcbiAgICB0aGlzLmVuZE9mR2FtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMudGltZXIuaW5uZXJUZXh0ID0gJ1RpbWU6IDAwOjAwJztcbiAgICB0aGlzLmNvdW50ZXIuaW5uZXJUZXh0ID0gJ01vdmVzOiAwJztcbiAgICB0aGlzLm1vdmVDb3VudGVyID0gMDtcbiAgICB0aGlzLnRpbWVyT2ZmID0gdHJ1ZTtcblxuICAgIHRoaXMuZmllbGRTaXplID0gK3RoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemUnKTtcbiAgICB0aGlzLnRleHQgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XG4gICAgdGhpcy5pbWFnZSA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWltYWdlJyk7XG5cbiAgICB0aGlzLmdldEltYWdlVXJsKCk7XG4gICAgdGhpcy5jbGVhckZpZWxkKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgICB0aGlzLmNyZWF0ZUdhbWVGaWVsZCgpO1xuXG4gICAgdGhpcy5idXR0b25QbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgIHRoaXMuY3JlYXRlR2FtZUZpZWxkKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBHZW1QdXp6bGUgZnJvbSAnLi9nZW0tcHV6emxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBHZW1QdXp6bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKTtcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncy1idXR0b24nKTtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy50ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcbiAgICB0aGlzLnNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdW5kJyk7XG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpO1xuICAgIHRoaXMuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZC1zaXplJyk7XG4gIH1cblxuICBjaGFuZ2VUZXh0KCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICBpZiAodGhpcy50ZXh0LnZhbHVlID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmZvbnRTaXplID0gJzByZW0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuY29sb3IgPSBgJHt0aGlzLnRleHQudmFsdWV9YDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuZm9udFNpemUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQub3V0ZXJUZXh0ID09PSAnU2V0dGluZ3MnKSB7XG4gICAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXBhdXNlJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuYnV0dG9uLmlubmVySFRNTCA9ICdSZXN1bWUgZ2FtZSc7XG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmllbGQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXBhdXNlJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uLmlubmVySFRNTCA9ICdTZXR0aW5ncyc7XG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudGV4dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgYCR7dGhpcy50ZXh0LnZhbHVlfWApO1xuICAgICAgdGhpcy5jaGFuZ2VUZXh0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXNvdW5kJywgYCR7dGhpcy5zb3VuZC52YWx1ZX1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnLCBgJHt0aGlzLmltYWdlLnZhbHVlfWApO1xuICAgICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaXplLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXNpemUnLCBgJHt0aGlzLnNpemUudmFsdWV9YCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL21vZHVsZXMvZ2VtLXB1enpsZSc7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9tb2R1bGVzL3NldHRpbmdzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbmV3IEdlbVB1enpsZSgpLmluaXQoKTtcbiAgbmV3IFNldHRpbmdzKCkuaW5pdCgpO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9