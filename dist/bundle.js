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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21vbWVudHVtLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvc2Nzcy9zdHlsZXMuc2NzcyJdLCJuYW1lcyI6WyJHZW1QdXp6bGUiLCJmaWVsZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJ1dHRvblBsYXkiLCJjb3VudGVyIiwidGltZXIiLCJlbmRPZkdhbWUiLCJhdWRpbyIsIkF1ZGlvIiwiZmllbGRTaXplIiwidGV4dCIsImltYWdlIiwibW92ZUNvdW50ZXIiLCJ0aW1lck9mZiIsInNpemUiLCJhcnIiLCJBcnJheSIsImtleXMiLCJzb3J0IiwiTWF0aCIsInJhbmRvbSIsImNlbGxzIiwic2h1ZmZsZUdhbWVGaWVsZCIsImZvckVhY2giLCJpdGVtIiwiaSIsImxlZnQiLCJzcXJ0IiwidG9wIiwiY2VsbFNpemUiLCJjZWxsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVyVGV4dCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJmb250U2l6ZSIsImNvbG9yIiwiYXBwZW5kIiwiYmluZFRyaWdnZXJzIiwic2V0SW1hZ2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwicmFuZG9tSW1hZ2UiLCJmbG9vciIsInNldEF0dHJpYnV0ZSIsInVybEltZyIsImdldEF0dHJpYnV0ZSIsIl8iLCJiYWNrZ3JvdW5kIiwidHJ1bmMiLCJiYWNrZ3JvdW5kU2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2ZXJ0aWNhbERpZmYiLCJhYnMiLCJzbGljZSIsImhvcml6b250RGlmZiIsInBsYXkiLCJpbm5lckhUTUwiLCJzZXRUaW1lciIsImNoZWNrU3RhdHVzIiwiY291bnQiLCJsZW5ndGgiLCJkaXNwbGF5IiwiY2xlYXJJbnRlcnZhbCIsInRpbWVySWQiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJnZXRJbWFnZVVybCIsImNsZWFyRmllbGQiLCJjcmVhdGVHYW1lRmllbGQiLCJzZXRJbml0aWFsU3RhdGUiLCJTZXR0aW5ncyIsInNldHRpbmdzIiwiYnV0dG9uIiwiZ2V0RWxlbWVudEJ5SWQiLCJzb3VuZCIsInZhbHVlIiwiZXZlbnQiLCJ0YXJnZXQiLCJvdXRlclRleHQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjaGFuZ2VUZXh0IiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUVxQkEsUztBQUNuQix1QkFBYztBQUFBOztBQUNaLFNBQUtDLEtBQUwsR0FBYUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBbEI7QUFDQSxTQUFLRSxPQUFMLEdBQWVILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFmO0FBQ0EsU0FBS0csS0FBTCxHQUFhSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLFNBQUtJLFNBQUwsR0FBaUJMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFqQjtBQUNBLFNBQUtLLEtBQUwsR0FBYSxJQUFJQyxLQUFKLENBQVUsMEJBQVYsQ0FBYjtBQUVBLFNBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLQyxJQUFMLEdBQVksT0FBWjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFiO0FBRUEsU0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDs7OztXQUVELDBCQUFpQkMsSUFBakIsRUFBdUI7QUFDckIsVUFBTUMsR0FBRyxHQUFHLG1CQUFJQyxLQUFLLENBQUNGLElBQUQsQ0FBTCxDQUFZRyxJQUFaLEVBQUosRUFBd0JDLElBQXhCLENBQTZCO0FBQUEsZUFBTUMsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLEdBQXRCO0FBQUEsT0FBN0IsQ0FBWjs7QUFDQSxhQUFPTCxHQUFQO0FBQ0Q7OztXQUVELDJCQUFrQjtBQUFBOztBQUNoQixVQUFNTSxLQUFLLEdBQUcsS0FBS0MsZ0JBQUwsQ0FBc0IsS0FBS2IsU0FBM0IsQ0FBZDtBQUNBWSxXQUFLLENBQUNFLE9BQU4sQ0FBYyxVQUFDQyxJQUFELEVBQU9DLENBQVAsRUFBYTtBQUN6QixZQUFNQyxJQUFJLEdBQUdELENBQUMsR0FBR04sSUFBSSxDQUFDUSxJQUFMLENBQVUsS0FBSSxDQUFDbEIsU0FBZixDQUFqQjtBQUNBLFlBQU1tQixHQUFHLEdBQUcsQ0FBQ0gsQ0FBQyxHQUFHQyxJQUFMLElBQWFQLElBQUksQ0FBQ1EsSUFBTCxDQUFVLEtBQUksQ0FBQ2xCLFNBQWYsQ0FBekI7QUFDQSxZQUFNb0IsUUFBUSxHQUFHLE1BQU1WLElBQUksQ0FBQ1EsSUFBTCxDQUFVLEtBQUksQ0FBQ2xCLFNBQWYsQ0FBdkI7O0FBQ0EsWUFBSWUsSUFBSSxLQUFLLENBQWIsRUFBZ0I7QUFDZCxjQUFNTSxJQUFJLEdBQUc3QixRQUFRLENBQUM4QixhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQUQsY0FBSSxDQUFDRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsTUFBbkI7QUFDQUgsY0FBSSxDQUFDSSxTQUFMLEdBQWlCVixJQUFqQjtBQUNBTSxjQUFJLENBQUNLLEtBQUwsQ0FBV0MsS0FBWCxhQUFzQixNQUFNakIsSUFBSSxDQUFDUSxJQUFMLENBQVUsS0FBSSxDQUFDbEIsU0FBZixDQUE1QjtBQUNBcUIsY0FBSSxDQUFDSyxLQUFMLENBQVdFLE1BQVgsYUFBdUIsTUFBTWxCLElBQUksQ0FBQ1EsSUFBTCxDQUFVLEtBQUksQ0FBQ2xCLFNBQWYsQ0FBN0I7QUFDQXFCLGNBQUksQ0FBQ0ssS0FBTCxDQUFXVCxJQUFYLGFBQXFCQSxJQUFJLEdBQUdHLFFBQTVCO0FBQ0FDLGNBQUksQ0FBQ0ssS0FBTCxDQUFXUCxHQUFYLGFBQW9CQSxHQUFHLEdBQUdDLFFBQTFCOztBQUVBLGNBQUksS0FBSSxDQUFDbkIsSUFBTCxLQUFjLFVBQWxCLEVBQThCO0FBQzVCb0IsZ0JBQUksQ0FBQ0ssS0FBTCxDQUFXRyxRQUFYLEdBQXNCLE1BQXRCO0FBQ0QsV0FGRCxNQUVPO0FBQ0xSLGdCQUFJLENBQUNLLEtBQUwsQ0FBV0ksS0FBWCxhQUFzQixLQUFJLENBQUM3QixJQUEzQjtBQUNBb0IsZ0JBQUksQ0FBQ0ssS0FBTCxDQUFXRyxRQUFYLEdBQXNCLEVBQXRCO0FBQ0Q7O0FBQ0QsZUFBSSxDQUFDdEMsS0FBTCxDQUFXd0MsTUFBWCxDQUFrQlYsSUFBbEI7QUFDRCxTQWhCRCxNQWdCTztBQUNMLGVBQUksQ0FBQ0osSUFBTCxhQUFlQSxJQUFJLEdBQUdHLFFBQXRCO0FBQ0EsZUFBSSxDQUFDRCxHQUFMLGFBQWNBLEdBQUcsR0FBR0MsUUFBcEI7QUFDRDtBQUNGLE9BeEJEO0FBeUJBLFdBQUtZLFlBQUw7QUFDQSxVQUFJLEtBQUs5QixLQUFMLEtBQWUsSUFBbkIsRUFBeUIsS0FBSytCLFFBQUw7QUFDMUI7OztXQUVELHNCQUFhO0FBQ1gsVUFBTXJCLEtBQUssR0FBR3BCLFFBQVEsQ0FBQzBDLGdCQUFULENBQTBCLE9BQTFCLENBQWQ7QUFDQXRCLFdBQUssQ0FBQ0UsT0FBTixDQUFjLFVBQUNPLElBQUQ7QUFBQSxlQUFVQSxJQUFJLENBQUNjLE1BQUwsRUFBVjtBQUFBLE9BQWQ7QUFDRDs7O1dBRUQsdUJBQWM7QUFDWixVQUFNQyxXQUFXLEdBQUcxQixJQUFJLENBQUMyQixLQUFMLENBQVczQixJQUFJLENBQUNDLE1BQUwsTUFBaUIsTUFBTSxDQUF2QixJQUE0QixDQUF2QyxDQUFwQjtBQUNBLFdBQUtwQixLQUFMLENBQVcrQyxZQUFYLENBQXdCLFVBQXhCLDhCQUF5REYsV0FBekQ7QUFDRDs7O1dBRUQsb0JBQVc7QUFBQTs7QUFDVCxVQUFNeEIsS0FBSyxHQUFHcEIsUUFBUSxDQUFDMEMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBZDtBQUNBLFVBQU1LLE1BQU0sR0FBRyxLQUFLaEQsS0FBTCxDQUFXaUQsWUFBWCxDQUF3QixVQUF4QixDQUFmO0FBRUE1QixXQUFLLENBQUNFLE9BQU4sQ0FBYyxVQUFDMkIsQ0FBRCxFQUFJekIsQ0FBSixFQUFVO0FBQ3RCLFlBQU0wQixVQUFVLGFBQU1ILE1BQU4sY0FBaUIsQ0FBQyxDQUFDM0IsS0FBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1MsU0FBVixHQUFzQixDQUF2QixJQUE2QmYsSUFBSSxDQUFDUSxJQUFMLENBQVUsTUFBSSxDQUFDbEIsU0FBZixDQUE5QixJQUMzQixPQUFPVSxJQUFJLENBQUNRLElBQUwsQ0FBVSxNQUFJLENBQUNsQixTQUFmLElBQTRCLENBQW5DLENBRDJCLENBQWhCLGVBQ2dDVSxJQUFJLENBQUNpQyxLQUFMLENBQVcsQ0FBQyxDQUFDL0IsS0FBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1MsU0FBVixHQUFzQixDQUF2QixJQUE2QmYsSUFBSSxDQUFDUSxJQUFMLENBQVUsTUFBSSxDQUFDbEIsU0FBZixDQUF4QyxLQUMzQyxPQUFPVSxJQUFJLENBQUNRLElBQUwsQ0FBVSxNQUFJLENBQUNsQixTQUFmLElBQTRCLENBQW5DLENBRDJDLENBRGhDLE1BQWhCOztBQUdBLFlBQUksTUFBSSxDQUFDVCxLQUFMLENBQVdpRCxZQUFYLENBQXdCLFlBQXhCLE1BQTBDLElBQTlDLEVBQW9EO0FBQ2xENUIsZUFBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1UsS0FBVCxDQUFlZ0IsVUFBZixHQUE0QkEsVUFBNUI7QUFDQTlCLGVBQUssQ0FBQ0ksQ0FBRCxDQUFMLENBQVNVLEtBQVQsQ0FBZWtCLGNBQWYsR0FBZ0MsT0FBaEM7QUFDRCxTQUhELE1BR087QUFDTGhDLGVBQUssQ0FBQ0ksQ0FBRCxDQUFMLENBQVNVLEtBQVQsQ0FBZWdCLFVBQWYsR0FBNEIsRUFBNUI7QUFDRDtBQUNGLE9BVkQ7QUFXRDs7O1dBRUQsd0JBQWU7QUFBQTs7QUFDYixVQUFNOUIsS0FBSyxHQUFHcEIsUUFBUSxDQUFDMEMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBZDtBQUNBdEIsV0FBSyxDQUFDRSxPQUFOLENBQWMsVUFBQ08sSUFBRCxFQUFPTCxDQUFQLEVBQWE7QUFDekJLLFlBQUksQ0FBQ3dCLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFlBQU07QUFDbkMsY0FBTUMsWUFBWSxHQUFHcEMsSUFBSSxDQUFDcUMsR0FBTCxDQUFTLE1BQUksQ0FBQzVCLEdBQUwsQ0FBUzZCLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLENBQUMsQ0FBbkIsSUFBd0IzQixJQUFJLENBQUNLLEtBQUwsQ0FBV1AsR0FBWCxDQUFlNkIsS0FBZixDQUFxQixDQUFyQixFQUF3QixDQUFDLENBQXpCLENBQWpDLENBQXJCO0FBQ0EsY0FBTUMsWUFBWSxHQUFHdkMsSUFBSSxDQUFDcUMsR0FBTCxDQUFTLE1BQUksQ0FBQzlCLElBQUwsQ0FBVStCLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBQyxDQUFwQixJQUF5QjNCLElBQUksQ0FBQ0ssS0FBTCxDQUFXVCxJQUFYLENBQWdCK0IsS0FBaEIsQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBQyxDQUExQixDQUFsQyxDQUFyQjtBQUNBLGNBQU01QixRQUFRLEdBQUcsTUFBTVYsSUFBSSxDQUFDUSxJQUFMLENBQVUsTUFBSSxDQUFDbEIsU0FBZixDQUF2Qjs7QUFDQSxjQUFJVSxJQUFJLENBQUNpQyxLQUFMLENBQVdHLFlBQVgsSUFBMkJwQyxJQUFJLENBQUNpQyxLQUFMLENBQVdNLFlBQVgsQ0FBM0IsS0FBd0R2QyxJQUFJLENBQUNpQyxLQUFMLENBQVd2QixRQUFYLENBQTVELEVBQWtGO0FBQ2hGLGdCQUFJLE1BQUksQ0FBQzdCLEtBQUwsQ0FBV2lELFlBQVgsQ0FBd0IsWUFBeEIsTUFBMEMsSUFBOUMsRUFBb0Q7QUFDbEQsb0JBQUksQ0FBQzFDLEtBQUwsQ0FBV29ELElBQVg7QUFDRDs7QUFDRCxrQkFBSSxDQUFDL0MsV0FBTCxJQUFvQixDQUFwQjtBQUNBLGtCQUFJLENBQUNSLE9BQUwsQ0FBYXdELFNBQWIsb0JBQW1DLE1BQUksQ0FBQ2hELFdBQXhDOztBQUNBLGdCQUFJLE1BQUksQ0FBQ0MsUUFBVCxFQUFtQjtBQUNqQixvQkFBSSxDQUFDZ0QsUUFBTDs7QUFDQSxvQkFBSSxDQUFDaEQsUUFBTCxHQUFnQixLQUFoQjtBQUNEOztBQVQrRSx1QkFXN0MsQ0FBQ1EsS0FBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1UsS0FBVCxDQUFlVCxJQUFoQixFQUFzQixNQUFJLENBQUNBLElBQTNCLENBWDZDO0FBVy9FLGtCQUFJLENBQUNBLElBWDBFO0FBV3BFTCxpQkFBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1UsS0FBVCxDQUFlVCxJQVhxRDtBQUFBLHdCQVkvQyxDQUFDTCxLQUFLLENBQUNJLENBQUQsQ0FBTCxDQUFTVSxLQUFULENBQWVQLEdBQWhCLEVBQXFCLE1BQUksQ0FBQ0EsR0FBMUIsQ0FaK0M7QUFZL0Usa0JBQUksQ0FBQ0EsR0FaMEU7QUFZckVQLGlCQUFLLENBQUNJLENBQUQsQ0FBTCxDQUFTVSxLQUFULENBQWVQLEdBWnNEOztBQWFoRixrQkFBSSxDQUFDa0MsV0FBTDtBQUNEO0FBQ0YsU0FuQkQ7QUFvQkQsT0FyQkQ7QUFzQkQ7OztXQUVELHVCQUFjO0FBQUE7O0FBQ1osVUFBTXpDLEtBQUssR0FBR3BCLFFBQVEsQ0FBQzBDLGdCQUFULENBQTBCLE9BQTFCLENBQWQ7QUFDQSxVQUFNZCxRQUFRLEdBQUcsTUFBTVYsSUFBSSxDQUFDUSxJQUFMLENBQVUsS0FBS2xCLFNBQWYsQ0FBdkI7QUFDQSxVQUFJc0QsS0FBSyxHQUFHLENBQVo7QUFDQTFDLFdBQUssQ0FBQ0UsT0FBTixDQUFjLFVBQUNPLElBQUQsRUFBVTtBQUN0QixZQUFJLFVBQUdYLElBQUksQ0FBQ2lDLEtBQUwsQ0FBV3RCLElBQUksQ0FBQ0ssS0FBTCxDQUFXVCxJQUFYLENBQWdCK0IsS0FBaEIsQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBQyxDQUExQixDQUFYLENBQUgsc0JBQ0ksQ0FBQyxDQUFDM0IsSUFBSSxDQUFDSSxTQUFOLEdBQWtCLENBQW5CLElBQXdCZixJQUFJLENBQUNRLElBQUwsQ0FBVSxNQUFJLENBQUNsQixTQUFmLENBQXpCLEdBQXNEVSxJQUFJLENBQUNpQyxLQUFMLENBQVd2QixRQUFYLENBRHpELFdBRUQsVUFBR1YsSUFBSSxDQUFDaUMsS0FBTCxDQUFXdEIsSUFBSSxDQUFDSyxLQUFMLENBQVdQLEdBQVgsQ0FBZTZCLEtBQWYsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBQyxDQUF6QixDQUFYLENBQUgsc0JBQ0t0QyxJQUFJLENBQUNpQyxLQUFMLENBQVcsQ0FBQyxDQUFDdEIsSUFBSSxDQUFDSSxTQUFOLEdBQWtCLENBQW5CLElBQXdCZixJQUFJLENBQUNRLElBQUwsQ0FBVSxNQUFJLENBQUNsQixTQUFmLENBQW5DLENBQUQsR0FBa0VVLElBQUksQ0FBQ2lDLEtBQUwsQ0FBV3ZCLFFBQVgsQ0FEdEUsT0FGSCxFQUdtRztBQUNqR2tDLGVBQUssSUFBSSxDQUFUO0FBQ0Q7QUFDRixPQVBEOztBQVNBLFVBQUlBLEtBQUssS0FBSzFDLEtBQUssQ0FBQzJDLE1BQXBCLEVBQTRCO0FBQzFCLGFBQUsxRCxTQUFMLENBQWU2QixLQUFmLENBQXFCOEIsT0FBckIsR0FBK0IsTUFBL0I7QUFDQUMscUJBQWEsQ0FBQyxLQUFLQyxPQUFOLENBQWI7QUFDRDtBQUNGOzs7V0FFRCxvQkFBVztBQUFBOztBQUNULFVBQUlDLElBQUksR0FBRyxDQUFYO0FBQ0EsV0FBS0QsT0FBTCxHQUFlRSxXQUFXLENBQUMsWUFBTTtBQUMvQixZQUFJLENBQUMsTUFBSSxDQUFDckUsS0FBTCxDQUFXaUQsWUFBWCxDQUF3QixZQUF4QixDQUFMLEVBQTRDO0FBQzFDbUIsY0FBSSxJQUFJLENBQVI7QUFDQSxnQkFBSSxDQUFDL0QsS0FBTCxDQUFXdUQsU0FBWCw2QkFDRXpDLElBQUksQ0FBQ2lDLEtBQUwsQ0FBV2dCLElBQUksR0FBRyxFQUFsQixJQUF3QixFQUF4QixjQUFpQ2pELElBQUksQ0FBQ2lDLEtBQUwsQ0FBV2dCLElBQUksR0FBRyxFQUFsQixDQUFqQyxJQUNKakQsSUFBSSxDQUFDaUMsS0FBTCxDQUFXZ0IsSUFBSSxHQUFHLEVBQWxCLENBRkUsY0FFdUJBLElBQUksR0FBRyxFQUFQLEdBQVksRUFBWixjQUFxQkEsSUFBSSxHQUFHLEVBQTVCLElBQW1DQSxJQUFJLEdBQUcsRUFGakU7QUFHRDtBQUNGLE9BUHlCLEVBT3ZCLElBUHVCLENBQTFCO0FBUUQ7OztXQUVELDJCQUFrQjtBQUNoQkYsbUJBQWEsQ0FBQyxLQUFLQyxPQUFOLENBQWI7QUFDQSxXQUFLN0QsU0FBTCxDQUFlNkIsS0FBZixDQUFxQjhCLE9BQXJCLEdBQStCLE1BQS9CO0FBQ0EsV0FBSzVELEtBQUwsQ0FBVzZCLFNBQVgsR0FBdUIsYUFBdkI7QUFDQSxXQUFLOUIsT0FBTCxDQUFhOEIsU0FBYixHQUF5QixVQUF6QjtBQUNBLFdBQUt0QixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUVBLFdBQUtKLFNBQUwsR0FBaUIsQ0FBQyxLQUFLVCxLQUFMLENBQVdpRCxZQUFYLENBQXdCLFdBQXhCLENBQWxCO0FBQ0EsV0FBS3ZDLElBQUwsR0FBWSxLQUFLVixLQUFMLENBQVdpRCxZQUFYLENBQXdCLFdBQXhCLENBQVo7QUFDQSxXQUFLdEMsS0FBTCxHQUFhLEtBQUtYLEtBQUwsQ0FBV2lELFlBQVgsQ0FBd0IsWUFBeEIsQ0FBYjtBQUVBLFdBQUtxQixXQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNEOzs7V0FFRCxnQkFBTztBQUFBOztBQUNMLFdBQUtELFdBQUw7QUFDQSxXQUFLRSxlQUFMO0FBRUEsV0FBS3JFLFVBQUwsQ0FBZ0JtRCxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBTTtBQUM5QyxjQUFJLENBQUNtQixlQUFMOztBQUNBLGNBQUksQ0FBQ0QsZUFBTDtBQUNELE9BSEQ7QUFJRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25LSDs7SUFFcUJFLFE7Ozs7O0FBQ25CLHNCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFDQSxVQUFLQyxRQUFMLEdBQWdCMUUsUUFBUSxDQUFDQyxhQUFULENBQXVCLFdBQXZCLENBQWhCO0FBQ0EsVUFBSzBFLE1BQUwsR0FBYzNFLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixrQkFBdkIsQ0FBZDtBQUNBLFVBQUtGLEtBQUwsR0FBYUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxVQUFLUSxJQUFMLEdBQVlULFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWjtBQUNBLFVBQUtDLEtBQUwsR0FBYTdFLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBYjtBQUNBLFVBQUtsRSxLQUFMLEdBQWFWLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBYjtBQUNBLFVBQUsvRCxJQUFMLEdBQVliLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBWjtBQVJZO0FBU2I7Ozs7V0FFRCxzQkFBYTtBQUFBOztBQUNYLFVBQU14RCxLQUFLLEdBQUdwQixRQUFRLENBQUMwQyxnQkFBVCxDQUEwQixPQUExQixDQUFkO0FBQ0F0QixXQUFLLENBQUNFLE9BQU4sQ0FBYyxVQUFDMkIsQ0FBRCxFQUFJekIsQ0FBSixFQUFVO0FBQ3RCLFlBQUksTUFBSSxDQUFDZixJQUFMLENBQVVxRSxLQUFWLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2xDMUQsZUFBSyxDQUFDSSxDQUFELENBQUwsQ0FBU1UsS0FBVCxDQUFlRyxRQUFmLEdBQTBCLE1BQTFCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xqQixlQUFLLENBQUNJLENBQUQsQ0FBTCxDQUFTVSxLQUFULENBQWVJLEtBQWYsYUFBMEIsTUFBSSxDQUFDN0IsSUFBTCxDQUFVcUUsS0FBcEM7QUFDQTFELGVBQUssQ0FBQ0ksQ0FBRCxDQUFMLENBQVNVLEtBQVQsQ0FBZUcsUUFBZixHQUEwQixFQUExQjtBQUNEO0FBQ0YsT0FQRDtBQVFEOzs7V0FFRCxnQkFBTztBQUFBOztBQUNMLFdBQUtzQyxNQUFMLENBQVl0QixnQkFBWixDQUE2QixPQUE3QixFQUFzQyxVQUFDMEIsS0FBRCxFQUFXO0FBQy9DLFlBQUlBLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxTQUFiLEtBQTJCLFVBQS9CLEVBQTJDO0FBQ3pDLGdCQUFJLENBQUNsRixLQUFMLENBQVcrQyxZQUFYLENBQXdCLFlBQXhCLEVBQXNDLElBQXRDOztBQUNBLGdCQUFJLENBQUM2QixNQUFMLENBQVloQixTQUFaLEdBQXdCLGFBQXhCO0FBQ0EsZ0JBQUksQ0FBQ2UsUUFBTCxDQUFjeEMsS0FBZCxDQUFvQjhCLE9BQXBCLEdBQThCLE1BQTlCO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsZ0JBQUksQ0FBQ2pFLEtBQUwsQ0FBV21GLGVBQVgsQ0FBMkIsWUFBM0I7O0FBQ0EsZ0JBQUksQ0FBQ1AsTUFBTCxDQUFZaEIsU0FBWixHQUF3QixVQUF4QjtBQUNBLGdCQUFJLENBQUNlLFFBQUwsQ0FBY3hDLEtBQWQsQ0FBb0I4QixPQUFwQixHQUE4QixNQUE5QjtBQUNEO0FBQ0YsT0FWRDtBQVlBLFdBQUt2RCxJQUFMLENBQVU0QyxnQkFBVixDQUEyQixRQUEzQixFQUFxQyxZQUFNO0FBQ3pDLGNBQUksQ0FBQ3RELEtBQUwsQ0FBVytDLFlBQVgsQ0FBd0IsV0FBeEIsWUFBd0MsTUFBSSxDQUFDckMsSUFBTCxDQUFVcUUsS0FBbEQ7O0FBQ0EsY0FBSSxDQUFDSyxVQUFMO0FBQ0QsT0FIRDtBQUtBLFdBQUtOLEtBQUwsQ0FBV3hCLGdCQUFYLENBQTRCLFFBQTVCLEVBQXNDLFlBQU07QUFDMUMsY0FBSSxDQUFDdEQsS0FBTCxDQUFXK0MsWUFBWCxDQUF3QixZQUF4QixZQUF5QyxNQUFJLENBQUMrQixLQUFMLENBQVdDLEtBQXBEO0FBQ0QsT0FGRDtBQUlBLFdBQUtwRSxLQUFMLENBQVcyQyxnQkFBWCxDQUE0QixRQUE1QixFQUFzQyxZQUFNO0FBQzFDLGNBQUksQ0FBQ3RELEtBQUwsQ0FBVytDLFlBQVgsQ0FBd0IsWUFBeEIsWUFBeUMsTUFBSSxDQUFDcEMsS0FBTCxDQUFXb0UsS0FBcEQ7O0FBQ0EsY0FBSSxDQUFDckMsUUFBTDtBQUNELE9BSEQ7QUFLQSxXQUFLNUIsSUFBTCxDQUFVd0MsZ0JBQVYsQ0FBMkIsUUFBM0IsRUFBcUMsWUFBTTtBQUN6QyxjQUFJLENBQUN0RCxLQUFMLENBQVcrQyxZQUFYLENBQXdCLFdBQXhCLFlBQXdDLE1BQUksQ0FBQ2pDLElBQUwsQ0FBVWlFLEtBQWxEO0FBQ0QsT0FGRDtBQUdEOzs7O0VBdERtQ2hGLGdEOzs7Ozs7OztVQ0Z0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBRSxRQUFRLENBQUNxRCxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxNQUFJdkQsd0RBQUosR0FBZ0JzRixJQUFoQjtBQUNBLE1BQUlYLHNEQUFKLEdBQWVXLElBQWY7QUFDRCxDQUhELEU7Ozs7Ozs7OztBQ0hBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VtUHV6emxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZCcpO1xuICAgIHRoaXMuYnV0dG9uUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5Jyk7XG4gICAgdGhpcy5jb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXInKTtcbiAgICB0aGlzLnRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVyJyk7XG4gICAgdGhpcy5lbmRPZkdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5kLW9mLWdhbWUnKTtcbiAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKCcuL2Fzc2V0cy9zb3VuZHMvbW92ZS53YXYnKTtcblxuICAgIHRoaXMuZmllbGRTaXplID0gMTY7XG4gICAgdGhpcy50ZXh0ID0gJ2JsYWNrJztcbiAgICB0aGlzLmltYWdlID0gJ29mZic7XG5cbiAgICB0aGlzLm1vdmVDb3VudGVyID0gMDtcbiAgICB0aGlzLnRpbWVyT2ZmID0gdHJ1ZTtcbiAgfVxuXG4gIHNodWZmbGVHYW1lRmllbGQoc2l6ZSkge1xuICAgIGNvbnN0IGFyciA9IFsuLi5BcnJheShzaXplKS5rZXlzKCldLnNvcnQoKCkgPT4gTWF0aC5yYW5kb20oKSAtIDAuNSk7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGNyZWF0ZUdhbWVGaWVsZCgpIHtcbiAgICBjb25zdCBjZWxscyA9IHRoaXMuc2h1ZmZsZUdhbWVGaWVsZCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgY2VsbHMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgY29uc3QgbGVmdCA9IGkgJSBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgY29uc3QgdG9wID0gKGkgLSBsZWZ0KSAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICBpZiAoaXRlbSAhPT0gMCkge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICBjZWxsLmlubmVyVGV4dCA9IGl0ZW07XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSBgJHs0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS5oZWlnaHQgPSBgJHs0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdCAqIGNlbGxTaXplfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS50b3AgPSBgJHt0b3AgKiBjZWxsU2l6ZX1weGA7XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dCA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICAgIGNlbGwuc3R5bGUuZm9udFNpemUgPSAnMHJlbSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbC5zdHlsZS5jb2xvciA9IGAke3RoaXMudGV4dH1gO1xuICAgICAgICAgIGNlbGwuc3R5bGUuZm9udFNpemUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpZWxkLmFwcGVuZChjZWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XG4gICAgICAgIHRoaXMudG9wID0gYCR7dG9wICogY2VsbFNpemV9cHhgO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYmluZFRyaWdnZXJzKCk7XG4gICAgaWYgKHRoaXMuaW1hZ2UgPT09ICdvbicpIHRoaXMuc2V0SW1hZ2UoKTtcbiAgfVxuXG4gIGNsZWFyRmllbGQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwucmVtb3ZlKCkpO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgY29uc3QgcmFuZG9tSW1hZ2UgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTUwIC0gMSkgKyAxKTtcbiAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS11cmwnLCBgdXJsKGFzc2V0cy9pbWFnZXMvJHtyYW5kb21JbWFnZX0uanBnKWApO1xuICB9XG5cbiAgc2V0SW1hZ2UoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IHVybEltZyA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXVybCcpO1xuXG4gICAgY2VsbHMuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IGAke3VybEltZ30gJHsoKCtjZWxsc1tpXS5pbm5lclRleHQgLSAxKSAlIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkgLSAxKSl9JSAke01hdGgudHJ1bmMoKCtjZWxsc1tpXS5pbm5lclRleHQgLSAxKSAvIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkgLSAxKSl9JWA7XG4gICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKSA9PT0gJ29uJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNDAwcHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZFRyaWdnZXJzKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbERpZmYgPSBNYXRoLmFicyh0aGlzLnRvcC5zbGljZSgwLCAtMikgLSBjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBob3Jpem9udERpZmYgPSBNYXRoLmFicyh0aGlzLmxlZnQuc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSk7XG4gICAgICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgICAgaWYgKE1hdGgudHJ1bmModmVydGljYWxEaWZmKSArIE1hdGgudHJ1bmMoaG9yaXpvbnREaWZmKSA9PT0gTWF0aC50cnVuYyhjZWxsU2l6ZSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291bmQnKSA9PT0gJ29uJykge1xuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNvdW50ZXIgKz0gMTtcbiAgICAgICAgICB0aGlzLmNvdW50ZXIuaW5uZXJIVE1MID0gYE1vdmVzOiAke3RoaXMubW92ZUNvdW50ZXJ9YDtcbiAgICAgICAgICBpZiAodGhpcy50aW1lck9mZikge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy50aW1lck9mZiA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFt0aGlzLmxlZnQsIGNlbGxzW2ldLnN0eWxlLmxlZnRdID0gW2NlbGxzW2ldLnN0eWxlLmxlZnQsIHRoaXMubGVmdF07XG4gICAgICAgICAgW3RoaXMudG9wLCBjZWxsc1tpXS5zdHlsZS50b3BdID0gW2NlbGxzW2ldLnN0eWxlLnRvcCwgdGhpcy50b3BdO1xuICAgICAgICAgIHRoaXMuY2hlY2tTdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1N0YXR1cygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKGAke01hdGgudHJ1bmMoY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSl9cHhgXG4gICAgICA9PT0gYCR7KCgrY2VsbC5pbm5lclRleHQgLSAxKSAlIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgXG4gICAgICAmJiBgJHtNYXRoLnRydW5jKGNlbGwuc3R5bGUudG9wLnNsaWNlKDAsIC0yKSl9cHhgXG4gICAgICA9PT0gYCR7KE1hdGgudHJ1bmMoKCtjZWxsLmlubmVyVGV4dCAtIDEpIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnQgPT09IGNlbGxzLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklkKTtcbiAgICB9XG4gIH1cblxuICBzZXRUaW1lcigpIHtcbiAgICBsZXQgdGltZSA9IDA7XG4gICAgdGhpcy50aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1wYXVzZScpKSB7XG4gICAgICAgIHRpbWUgKz0gMTtcbiAgICAgICAgdGhpcy50aW1lci5pbm5lckhUTUwgPSBgVGltZTogXG4gICAgICAgICR7TWF0aC50cnVuYyh0aW1lIC8gNjApIDwgMTAgPyBgMCR7TWF0aC50cnVuYyh0aW1lIC8gNjApfWBcbiAgICA6IE1hdGgudHJ1bmModGltZSAvIDYwKX06JHt0aW1lICUgNjAgPCAxMCA/IGAwJHt0aW1lICUgNjB9YCA6IHRpbWUgJSA2MH1gO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklkKTtcbiAgICB0aGlzLmVuZE9mR2FtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMudGltZXIuaW5uZXJUZXh0ID0gJ1RpbWU6IDAwOjAwJztcbiAgICB0aGlzLmNvdW50ZXIuaW5uZXJUZXh0ID0gJ01vdmVzOiAwJztcbiAgICB0aGlzLm1vdmVDb3VudGVyID0gMDtcbiAgICB0aGlzLnRpbWVyT2ZmID0gdHJ1ZTtcblxuICAgIHRoaXMuZmllbGRTaXplID0gK3RoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemUnKTtcbiAgICB0aGlzLnRleHQgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XG4gICAgdGhpcy5pbWFnZSA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWltYWdlJyk7XG5cbiAgICB0aGlzLmdldEltYWdlVXJsKCk7XG4gICAgdGhpcy5jbGVhckZpZWxkKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgICB0aGlzLmNyZWF0ZUdhbWVGaWVsZCgpO1xuXG4gICAgdGhpcy5idXR0b25QbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgIHRoaXMuY3JlYXRlR2FtZUZpZWxkKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBHZW1QdXp6bGUgZnJvbSAnLi9nZW0tcHV6emxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBHZW1QdXp6bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKTtcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncy1idXR0b24nKTtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy50ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHQnKTtcbiAgICB0aGlzLnNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdW5kJyk7XG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZScpO1xuICAgIHRoaXMuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZC1zaXplJyk7XG4gIH1cblxuICBjaGFuZ2VUZXh0KCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICBpZiAodGhpcy50ZXh0LnZhbHVlID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmZvbnRTaXplID0gJzByZW0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuY29sb3IgPSBgJHt0aGlzLnRleHQudmFsdWV9YDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuZm9udFNpemUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQub3V0ZXJUZXh0ID09PSAnU2V0dGluZ3MnKSB7XG4gICAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXBhdXNlJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuYnV0dG9uLmlubmVySFRNTCA9ICdSZXN1bWUgZ2FtZSc7XG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmllbGQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXBhdXNlJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uLmlubmVySFRNTCA9ICdTZXR0aW5ncyc7XG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudGV4dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgYCR7dGhpcy50ZXh0LnZhbHVlfWApO1xuICAgICAgdGhpcy5jaGFuZ2VUZXh0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXNvdW5kJywgYCR7dGhpcy5zb3VuZC52YWx1ZX1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnLCBgJHt0aGlzLmltYWdlLnZhbHVlfWApO1xuICAgICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaXplLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXNpemUnLCBgJHt0aGlzLnNpemUudmFsdWV9YCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL21vZHVsZXMvZ2VtLXB1enpsZSc7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9tb2R1bGVzL3NldHRpbmdzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbmV3IEdlbVB1enpsZSgpLmluaXQoKTtcbiAgbmV3IFNldHRpbmdzKCkuaW5pdCgpO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9