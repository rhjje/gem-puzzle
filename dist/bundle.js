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
      settings.style.display = 'flex';
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
  !*** ./src/scss/styles.scss ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9yZXN1bWUtZ2FtZS5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL3NldHRpbmdzLmpzIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzP2I3ZmYiXSwibmFtZXMiOlsiR2VtUHV6emxlIiwiZmllbGQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJidXR0b25QbGF5IiwiY291bnRlciIsInRpbWVyIiwiZW5kT2ZHYW1lIiwiYXVkaW8iLCJBdWRpbyIsIm1vdmVDb3VudGVyIiwiZmllbGRTaXplIiwidGV4dCIsImltYWdlIiwidGltZXJPZmYiLCJzaXplIiwiYXJyIiwiQXJyYXkiLCJrZXlzIiwic29ydCIsIk1hdGgiLCJyYW5kb20iLCJjZWxscyIsInNodWZmbGVHYW1lRmllbGQiLCJmb3JFYWNoIiwiaXRlbSIsImkiLCJsZWZ0Iiwic3FydCIsInRvcCIsImNlbGxTaXplIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lclRleHQiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiZm9udFNpemUiLCJjb2xvciIsImFwcGVuZCIsImJpbmRUcmlnZ2VycyIsInNldEltYWdlIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZSIsInJhbmRvbUltYWdlIiwiZmxvb3IiLCJzZXRBdHRyaWJ1dGUiLCJ1cmxJbWciLCJnZXRBdHRyaWJ1dGUiLCJsZW5ndGgiLCJfIiwiYmFja2dyb3VuZCIsInRydW5jIiwiYmFja2dyb3VuZFNpemUiLCJhZGRFdmVudExpc3RlbmVyIiwidmVydGljYWxEaWZmIiwiYWJzIiwic2xpY2UiLCJob3Jpem9udERpZmYiLCJwbGF5IiwiaW5uZXJIVE1MIiwic2V0VGltZXIiLCJjaGVja1N0YXR1cyIsImNvdW50IiwiZGlzcGxheSIsImNsZWFySW50ZXJ2YWwiLCJ0aW1lcklkIiwidGltZSIsInNldEludGVydmFsIiwiY2xlYXJGaWVsZCIsImdldEltYWdlVXJsIiwiY3JlYXRlR2FtZUZpZWxkIiwic2V0SW5pdGlhbFN0YXRlIiwicmVzdW1lR2FtZSIsInNldHRpbmdzIiwiYnV0dG9uIiwiZXZlbnQiLCJ0YXJnZXQiLCJvdXRlclRleHQiLCJTZXR0aW5ncyIsImdldEVsZW1lbnRCeUlkIiwic291bmQiLCJ2YWx1ZSIsImNoYW5nZVRleHQiLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBRXFCQSxTO0FBQ25CLHVCQUFjO0FBQUE7O0FBQ1osU0FBS0MsS0FBTCxHQUFhQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFsQjtBQUNBLFNBQUtFLE9BQUwsR0FBZUgsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQWY7QUFDQSxTQUFLRyxLQUFMLEdBQWFKLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsU0FBS0ksU0FBTCxHQUFpQkwsUUFBUSxDQUFDQyxhQUFULENBQXVCLGNBQXZCLENBQWpCO0FBQ0EsU0FBS0ssS0FBTCxHQUFhLElBQUlD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QUksQ0FBQ3ZELEtBQUwsQ0FBVytDLFlBQVgsQ0FBd0IsWUFBeEIsWUFBeUMsTUFBSSxDQUFDbkMsS0FBTCxDQUFXdUUsS0FBcEQ7O0FBQ0EsY0FBSSxDQUFDekMsUUFBTDtBQUNELE9BSEQ7QUFLQSxXQUFLNUIsSUFBTCxDQUFVeUMsZ0JBQVYsQ0FBMkIsUUFBM0IsRUFBcUMsWUFBTTtBQUN6QyxjQUFJLENBQUN2RCxLQUFMLENBQVcrQyxZQUFYLENBQXdCLFdBQXhCLFlBQXdDLE1BQUksQ0FBQ2pDLElBQUwsQ0FBVXFFLEtBQWxEO0FBQ0QsT0FGRDtBQUdEOzs7O0VBeENtQ3BGLGdEOzs7Ozs7OztVQ0h0QztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUVBRSxRQUFRLENBQUNzRCxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxNQUFJeEQsd0RBQUosR0FBZ0JzRixJQUFoQjtBQUNBWCwrREFBVTtBQUNWLE1BQUlNLHNEQUFKLEdBQWVLLElBQWY7QUFDRCxDQUpELEU7Ozs7Ozs7OztBQ0pBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VtUHV6emxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZCcpO1xuICAgIHRoaXMuYnV0dG9uUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5Jyk7XG4gICAgdGhpcy5jb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXInKTtcbiAgICB0aGlzLnRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVyJyk7XG4gICAgdGhpcy5lbmRPZkdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5kLW9mLWdhbWUnKTtcbiAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKCcuL2Fzc2V0cy9zb3VuZHMvbW92ZS53YXYnKTtcbiAgICB0aGlzLm1vdmVDb3VudGVyID0gMDtcblxuICAgIHRoaXMuZmllbGRTaXplID0gMTY7XG4gICAgdGhpcy50ZXh0ID0gJ2JsYWNrJztcbiAgICB0aGlzLmltYWdlID0gJ29mZic7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG4gIH1cblxuICBzaHVmZmxlR2FtZUZpZWxkKHNpemUpIHtcbiAgICBjb25zdCBhcnIgPSBbLi4uQXJyYXkoc2l6ZSkua2V5cygpXS5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjcmVhdGVHYW1lRmllbGQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSB0aGlzLnNodWZmbGVHYW1lRmllbGQodGhpcy5maWVsZFNpemUpO1xuICAgIGNlbGxzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGxlZnQgPSBpICUgTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGNvbnN0IHRvcCA9IChpIC0gbGVmdCkgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgaWYgKGl0ZW0gIT09IDApIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgY2VsbC5pbm5lclRleHQgPSBpdGVtO1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gYCR7NDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUuaGVpZ2h0ID0gYCR7NDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUudG9wID0gYCR7dG9wICogY2VsbFNpemV9cHhgO1xuXG4gICAgICAgIGlmICh0aGlzLnRleHQgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gJzByZW0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBgJHt0aGlzLnRleHR9YDtcbiAgICAgICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWVsZC5hcHBlbmQoY2VsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlZnQgPSBgJHtsZWZ0ICogY2VsbFNpemV9cHhgO1xuICAgICAgICB0aGlzLnRvcCA9IGAke3RvcCAqIGNlbGxTaXplfXB4YDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmJpbmRUcmlnZ2VycygpO1xuICAgIGlmICh0aGlzLmltYWdlID09PSAnb24nKSB0aGlzLnNldEltYWdlKCk7XG4gIH1cblxuICBjbGVhckZpZWxkKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjZWxsLnJlbW92ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgY29uc3QgcmFuZG9tSW1hZ2UgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTUwIC0gMSkgKyAxKTtcbiAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS11cmwnLCBgdXJsKGFzc2V0cy9pbWFnZXMvJHtyYW5kb21JbWFnZX0uanBnKWApO1xuICB9XG5cbiAgc2V0SW1hZ2UoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IHVybEltZyA9IHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXVybCcpO1xuICAgIGNvbnN0IGZpZWxkU2l6ZSA9IGNlbGxzLmxlbmd0aCArIDE7XG5cbiAgICBjZWxscy5mb3JFYWNoKChfLCBpKSA9PiB7XG4gICAgICBjb25zdCBiYWNrZ3JvdW5kID0gYCR7dXJsSW1nfSAkeygoK2NlbGxzW2ldLmlubmVyVGV4dCAtIDEpICUgKE1hdGguc3FydChmaWVsZFNpemUpKSlcbiAgICAgICAgKiAoMTAwIC8gKE1hdGguc3FydChmaWVsZFNpemUpIC0gMSkpfSUgJHtNYXRoLnRydW5jKCgrY2VsbHNbaV0uaW5uZXJUZXh0IC0gMSkgLyAoTWF0aC5zcXJ0KGZpZWxkU2l6ZSkpKVxuICAgICAgICAqICgxMDAgLyAoTWF0aC5zcXJ0KGZpZWxkU2l6ZSkgLSAxKSl9JWA7XG4gICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnKSA9PT0gJ29uJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNDAwcHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZFRyaWdnZXJzKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbERpZmYgPSBNYXRoLmFicyh0aGlzLnRvcC5zbGljZSgwLCAtMikgLSBjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBob3Jpem9udERpZmYgPSBNYXRoLmFicyh0aGlzLmxlZnQuc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSk7XG4gICAgICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgICAgaWYgKE1hdGgudHJ1bmModmVydGljYWxEaWZmKSArIE1hdGgudHJ1bmMoaG9yaXpvbnREaWZmKSA9PT0gTWF0aC50cnVuYyhjZWxsU2l6ZSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291bmQnKSA9PT0gJ29uJykge1xuICAgICAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW92ZUNvdW50ZXIgKz0gMTtcbiAgICAgICAgICB0aGlzLmNvdW50ZXIuaW5uZXJIVE1MID0gYE1vdmVzOiAke3RoaXMubW92ZUNvdW50ZXJ9YDtcbiAgICAgICAgICBpZiAodGhpcy50aW1lck9mZikge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lcigpO1xuICAgICAgICAgICAgdGhpcy50aW1lck9mZiA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFt0aGlzLmxlZnQsIGNlbGxzW2ldLnN0eWxlLmxlZnRdID0gW2NlbGxzW2ldLnN0eWxlLmxlZnQsIHRoaXMubGVmdF07XG4gICAgICAgICAgW3RoaXMudG9wLCBjZWxsc1tpXS5zdHlsZS50b3BdID0gW2NlbGxzW2ldLnN0eWxlLnRvcCwgdGhpcy50b3BdO1xuICAgICAgICAgIHRoaXMuY2hlY2tTdGF0dXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1N0YXR1cygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKGAke01hdGgudHJ1bmMoY2VsbC5zdHlsZS5sZWZ0LnNsaWNlKDAsIC0yKSl9cHhgID09PSBgJHsoKCtjZWxsLmlubmVyVGV4dCAtIDEpICUgTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkgKiBNYXRoLnRydW5jKGNlbGxTaXplKX1weGAgJiYgYCR7TWF0aC50cnVuYyhjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpfXB4YCA9PT0gYCR7KE1hdGgudHJ1bmMoKCtjZWxsLmlubmVyVGV4dCAtIDEpIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgKSB7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnQgPT09IGNlbGxzLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklkKTtcbiAgICB9XG4gIH1cblxuICBzZXRUaW1lcigpIHtcbiAgICBsZXQgdGltZSA9IDA7XG4gICAgdGhpcy50aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGltZSArPSAxO1xuICAgICAgdGhpcy50aW1lci5pbm5lckhUTUwgPSBgVGltZTogXG4gICAgICAke01hdGgudHJ1bmModGltZSAvIDYwKSA8IDEwID8gYDAke01hdGgudHJ1bmModGltZSAvIDYwKX1gXG4gICAgOiBNYXRoLnRydW5jKHRpbWUgLyA2MCl9OiR7dGltZSAlIDYwIDwgMTAgPyBgMCR7dGltZSAlIDYwfWAgOiB0aW1lICUgNjB9YDtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJZCk7XG4gICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLnRpbWVyLmlubmVyVGV4dCA9ICdUaW1lOiAwMDowMCc7XG4gICAgdGhpcy5jb3VudGVyLmlubmVyVGV4dCA9ICdNb3ZlczogMCc7XG4gICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG5cbiAgICB0aGlzLmZpZWxkU2l6ZSA9ICt0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJyk7XG4gICAgdGhpcy50ZXh0ID0gdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1pbWFnZScpO1xuXG4gICAgdGhpcy5jbGVhckZpZWxkKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgICB0aGlzLmNyZWF0ZUdhbWVGaWVsZCgpO1xuXG4gICAgdGhpcy5idXR0b25QbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgIHRoaXMuY3JlYXRlR2FtZUZpZWxkKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImNvbnN0IHJlc3VtZUdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IHNldHRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJyk7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncy1idXR0b24nKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5vdXRlclRleHQgPT09ICdTZXR0aW5ncycpIHtcbiAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnUmVzdW1lIGdhbWUnO1xuICAgICAgc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uLmlubmVySFRNTCA9ICdTZXR0aW5ncyc7XG4gICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXN1bWVHYW1lO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL2dlbS1wdXp6bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5ncyBleHRlbmRzIEdlbVB1enpsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5maWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZCcpO1xuICAgIHRoaXMudGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Jyk7XG4gICAgdGhpcy5zb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZCcpO1xuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKTtcbiAgICB0aGlzLnNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmllbGQtc2l6ZScpO1xuICB9XG5cbiAgY2hhbmdlVGV4dCgpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgaWYgKHRoaXMudGV4dC52YWx1ZSA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5mb250U2l6ZSA9ICcwcmVtJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmNvbG9yID0gYCR7dGhpcy50ZXh0LnZhbHVlfWA7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMudGV4dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS10ZXh0JywgYCR7dGhpcy50ZXh0LnZhbHVlfWApO1xuICAgICAgdGhpcy5jaGFuZ2VUZXh0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXNvdW5kJywgYCR7dGhpcy5zb3VuZC52YWx1ZX1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2UnLCBgJHt0aGlzLmltYWdlLnZhbHVlfWApO1xuICAgICAgdGhpcy5zZXRJbWFnZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zaXplLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXNpemUnLCBgJHt0aGlzLnNpemUudmFsdWV9YCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL21vZHVsZXMvZ2VtLXB1enpsZSc7XG5pbXBvcnQgcmVzdW1lR2FtZSBmcm9tICcuL21vZHVsZXMvcmVzdW1lLWdhbWUnO1xuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vbW9kdWxlcy9zZXR0aW5ncyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIG5ldyBHZW1QdXp6bGUoKS5pbml0KCk7XG4gIHJlc3VtZUdhbWUoKTtcbiAgbmV3IFNldHRpbmdzKCkuaW5pdCgpO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9