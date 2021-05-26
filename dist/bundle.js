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
    this.soundSettings = document.getElementById('sound');
    this.fieldSizeSettings = document.getElementById('field-size');
    this.endOfGame = document.querySelector('.end-of-game');
    this.sound = new Audio('./assets/sounds/move.wav');
    this.moveCounter = 0;
    this.fieldSize = 16;
    this.timerOff = true;
    this.soundOff = false;
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

          _this.field.append(cell);
        } else {
          _this.left = "".concat(left * cellSize, "px");
          _this.top = "".concat(top * cellSize, "px");
        }
      });
      this.bindTriggers();
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
    key: "bindTriggers",
    value: function bindTriggers() {
      var _this2 = this;

      var cells = document.querySelectorAll('.cell');
      cells.forEach(function (cell, i) {
        cell.addEventListener('click', function () {
          var verticalDiff = Math.abs(_this2.top.slice(0, -2) - cell.style.top.slice(0, -2));
          var horizontDiff = Math.abs(_this2.left.slice(0, -2) - cell.style.left.slice(0, -2));
          var cellSize = 400 / Math.sqrt(_this2.fieldSize);

          if (Math.trunc(verticalDiff) + Math.trunc(horizontDiff) === Math.trunc(cellSize)) {
            if (!_this2.soundOff) _this2.sound.play();
            _this2.moveCounter += 1;
            _this2.counter.innerHTML = "Moves: ".concat(_this2.moveCounter);

            if (_this2.timerOff) {
              _this2.setTimer();

              _this2.timerOff = false;
            }

            var _ref = [cells[i].style.left, _this2.left];
            _this2.left = _ref[0];
            cells[i].style.left = _ref[1];
            var _ref2 = [cells[i].style.top, _this2.top];
            _this2.top = _ref2[0];
            cells[i].style.top = _ref2[1];

            _this2.checkStatus();
          }
        });
      });
    }
  }, {
    key: "checkStatus",
    value: function checkStatus() {
      var _this3 = this;

      var cells = document.querySelectorAll('.cell');
      var cellSize = 400 / Math.sqrt(this.fieldSize);
      var count = 0;
      cells.forEach(function (cell) {
        if ("".concat(Math.trunc(cell.style.left.slice(0, -2)), "px") === "".concat((+cell.innerText - 1) % Math.sqrt(_this3.fieldSize) * Math.trunc(cellSize), "px") && "".concat(Math.trunc(cell.style.top.slice(0, -2)), "px") === "".concat(Math.trunc((+cell.innerText - 1) / Math.sqrt(_this3.fieldSize)) * Math.trunc(cellSize), "px")) {
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
      var _this4 = this;

      var time = 0;
      this.timerId = setInterval(function () {
        time += 1;
        _this4.timer.innerHTML = "Time: \n      ".concat(Math.trunc(time / 60) < 10 ? "0".concat(Math.trunc(time / 60)) : Math.trunc(time / 60), ":").concat(time % 60 < 10 ? "0".concat(time % 60) : time % 60);
      }, 1000);
    }
  }, {
    key: "init",
    value: function init() {
      var _this5 = this;

      this.createGameField();
      this.fieldSizeSettings.addEventListener('change', function () {
        _this5.fieldSize = +_this5.fieldSizeSettings.value;
      });
      this.buttonPlay.addEventListener('click', function () {
        clearInterval(_this5.timerId);
        _this5.endOfGame.style.display = 'none';
        _this5.timer.innerText = 'Time: 00:00';
        _this5.counter.innerText = 'Moves: 0';
        _this5.moveCounter = 0;
        _this5.timerOff = true;

        _this5.clearField();

        _this5.createGameField();
      });
      this.soundSettings.addEventListener('change', function () {
        if (_this5.soundSettings.value === 'off') {
          _this5.soundOff = true;
        } else {
          _this5.soundOff = false;
        }
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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */
var Settings = /*#__PURE__*/function () {
  function Settings() {
    _classCallCheck(this, Settings);

    this.button = document.querySelector('.apply-settings');
    this.text = document.getElementById('text');
    this.sound = document.getElementById('sound');
    this.image = document.getElementById('image');
    this.stateText = false;
    this.stateSound = false;
    this.stateImage = false;
  }

  _createClass(Settings, [{
    key: "changeText",
    value: function changeText() {
      var _this = this;

      var cells = document.querySelectorAll('.cell');
      cells.forEach(function (_, i) {
        if (_this.text.value === 'disabled') {
          cells[i].style.fontSize = '0rem';
        } else {
          cells[i].style.color = "".concat(_this.text.value);
          cells[i].style.fontSize = '';
        }
      });
    }
  }, {
    key: "setImage",
    value: function setImage() {
      var _this2 = this;

      var cells = document.querySelectorAll('.cell');
      var randomImage = Math.floor(Math.random() * (150 - 1) + 1);
      var urlImg = "url(assets/images/".concat(randomImage, ".jpg)");
      var fieldSize = cells.length + 1;
      cells.forEach(function (_, i) {
        var background = "".concat(urlImg, " ").concat((+cells[i].innerText - 1) % Math.sqrt(fieldSize) * (100 / (Math.sqrt(fieldSize) - 1)), "% ").concat(Math.trunc((+cells[i].innerText - 1) / Math.sqrt(fieldSize)) * (100 / (Math.sqrt(fieldSize) - 1)), "%");

        if (_this2.image.value === 'on') {
          cells[i].style.background = background;
          cells[i].style.backgroundSize = '400px';
        } else {
          cells[i].style.background = '';
        }
      });
    }
  }, {
    key: "setLocalStorage",
    value: function setLocalStorage() {
      var currentSettings = {
        text: "".concat(this.text.value),
        sound: "".concat(this.sound.value),
        image: "".concat(this.image.value)
      };
      localStorage.setItem('settings', JSON.stringify(currentSettings));
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      // this.setLocalStorage();
      this.text.addEventListener('change', function () {
        _this3.stateText = true;
      });
      this.sound.addEventListener('change', function () {
        _this3.stateSound = true;
      });
      this.image.addEventListener('change', function () {
        _this3.stateImage = true;
      });
      this.button.addEventListener('click', function () {
        if (_this3.stateText) _this3.changeText();
        if (_this3.stateImage) _this3.setImage();
      });
    }
  }]);

  return Settings;
}();



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9yZXN1bWUtZ2FtZS5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL3NldHRpbmdzLmpzIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9zYXNzL3N0eWxlcy5zY3NzPzhkYzkiXSwibmFtZXMiOlsiR2VtUHV6emxlIiwiZmllbGQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJidXR0b25QbGF5IiwiY291bnRlciIsInRpbWVyIiwic291bmRTZXR0aW5ncyIsImdldEVsZW1lbnRCeUlkIiwiZmllbGRTaXplU2V0dGluZ3MiLCJlbmRPZkdhbWUiLCJzb3VuZCIsIkF1ZGlvIiwibW92ZUNvdW50ZXIiLCJmaWVsZFNpemUiLCJ0aW1lck9mZiIsInNvdW5kT2ZmIiwic2l6ZSIsImFyciIsIkFycmF5Iiwia2V5cyIsInNvcnQiLCJNYXRoIiwicmFuZG9tIiwiY2VsbHMiLCJzaHVmZmxlR2FtZUZpZWxkIiwiZm9yRWFjaCIsIml0ZW0iLCJpIiwibGVmdCIsInNxcnQiLCJ0b3AiLCJjZWxsU2l6ZSIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJUZXh0Iiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImFwcGVuZCIsImJpbmRUcmlnZ2VycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwidmVydGljYWxEaWZmIiwiYWJzIiwic2xpY2UiLCJob3Jpem9udERpZmYiLCJ0cnVuYyIsInBsYXkiLCJpbm5lckhUTUwiLCJzZXRUaW1lciIsImNoZWNrU3RhdHVzIiwiY291bnQiLCJsZW5ndGgiLCJkaXNwbGF5IiwiY2xlYXJJbnRlcnZhbCIsInRpbWVySWQiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJjcmVhdGVHYW1lRmllbGQiLCJ2YWx1ZSIsImNsZWFyRmllbGQiLCJyZXN1bWVHYW1lIiwic2V0dGluZ3MiLCJidXR0b24iLCJldmVudCIsInRhcmdldCIsIm91dGVyVGV4dCIsIlNldHRpbmdzIiwidGV4dCIsImltYWdlIiwic3RhdGVUZXh0Iiwic3RhdGVTb3VuZCIsInN0YXRlSW1hZ2UiLCJfIiwiZm9udFNpemUiLCJjb2xvciIsInJhbmRvbUltYWdlIiwiZmxvb3IiLCJ1cmxJbWciLCJiYWNrZ3JvdW5kIiwiYmFja2dyb3VuZFNpemUiLCJjdXJyZW50U2V0dGluZ3MiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImNoYW5nZVRleHQiLCJzZXRJbWFnZSIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFFcUJBLFM7QUFDbkIsdUJBQWM7QUFBQTs7QUFDWixTQUFLQyxLQUFMLEdBQWFDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkYsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQWxCO0FBQ0EsU0FBS0UsT0FBTCxHQUFlSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBZjtBQUNBLFNBQUtHLEtBQUwsR0FBYUosUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxT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QyxjQUFJLENBQUMrQixVQUFMLEdBQWtCLElBQWxCO0FBQ0QsT0FGRDtBQUdBLFdBQUtULE1BQUwsQ0FBWXRCLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDMUMsWUFBSSxNQUFJLENBQUM2QixTQUFULEVBQW9CLE1BQUksQ0FBQ2dCLFVBQUw7QUFDcEIsWUFBSSxNQUFJLENBQUNkLFVBQVQsRUFBcUIsTUFBSSxDQUFDZSxRQUFMO0FBQ3RCLE9BSEQ7QUFJRDs7Ozs7Ozs7Ozs7O1VDL0RIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBRUF6RixRQUFRLENBQUMyQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxNQUFJN0Msd0RBQUosR0FBZ0I0RixJQUFoQjtBQUNBM0IsK0RBQVU7QUFDVixNQUFJTSxzREFBSixHQUFlcUIsSUFBZjtBQUNELENBSkQsRTs7Ozs7Ozs7O0FDSkEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW1QdXp6bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy5idXR0b25QbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXknKTtcbiAgICB0aGlzLmNvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlcicpO1xuICAgIHRoaXMudGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZXInKTtcbiAgICB0aGlzLnNvdW5kU2V0dGluZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQnKTtcbiAgICB0aGlzLmZpZWxkU2l6ZVNldHRpbmdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkLXNpemUnKTtcbiAgICB0aGlzLmVuZE9mR2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmQtb2YtZ2FtZScpO1xuICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oJy4vYXNzZXRzL3NvdW5kcy9tb3ZlLndhdicpO1xuICAgIHRoaXMubW92ZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMuZmllbGRTaXplID0gMTY7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG4gICAgdGhpcy5zb3VuZE9mZiA9IGZhbHNlO1xuICB9XG5cbiAgc2h1ZmZsZUdhbWVGaWVsZChzaXplKSB7XG4gICAgY29uc3QgYXJyID0gWy4uLkFycmF5KHNpemUpLmtleXMoKV0uc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgY3JlYXRlR2FtZUZpZWxkKCkge1xuICAgIGNvbnN0IGNlbGxzID0gdGhpcy5zaHVmZmxlR2FtZUZpZWxkKHRoaXMuZmllbGRTaXplKTtcbiAgICBjZWxscy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICBjb25zdCBsZWZ0ID0gaSAlIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICBjb25zdCB0b3AgPSAoaSAtIGxlZnQpIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGlmIChpdGVtICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gaXRlbTtcbiAgICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IGAkezQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSl9cHhgO1xuICAgICAgICBjZWxsLnN0eWxlLmhlaWdodCA9IGAkezQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSl9cHhgO1xuICAgICAgICBjZWxsLnN0eWxlLmxlZnQgPSBgJHtsZWZ0ICogY2VsbFNpemV9cHhgO1xuICAgICAgICBjZWxsLnN0eWxlLnRvcCA9IGAke3RvcCAqIGNlbGxTaXplfXB4YDtcbiAgICAgICAgdGhpcy5maWVsZC5hcHBlbmQoY2VsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlZnQgPSBgJHtsZWZ0ICogY2VsbFNpemV9cHhgO1xuICAgICAgICB0aGlzLnRvcCA9IGAke3RvcCAqIGNlbGxTaXplfXB4YDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmJpbmRUcmlnZ2VycygpO1xuICB9XG5cbiAgY2xlYXJGaWVsZCgpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRUcmlnZ2VycygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdmVydGljYWxEaWZmID0gTWF0aC5hYnModGhpcy50b3Auc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS50b3Auc2xpY2UoMCwgLTIpKTtcbiAgICAgICAgY29uc3QgaG9yaXpvbnREaWZmID0gTWF0aC5hYnModGhpcy5sZWZ0LnNsaWNlKDAsIC0yKSAtIGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgIGlmIChNYXRoLnRydW5jKHZlcnRpY2FsRGlmZikgKyBNYXRoLnRydW5jKGhvcml6b250RGlmZikgPT09IE1hdGgudHJ1bmMoY2VsbFNpemUpKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLnNvdW5kT2ZmKSB0aGlzLnNvdW5kLnBsYXkoKTtcbiAgICAgICAgICB0aGlzLm1vdmVDb3VudGVyICs9IDE7XG4gICAgICAgICAgdGhpcy5jb3VudGVyLmlubmVySFRNTCA9IGBNb3ZlczogJHt0aGlzLm1vdmVDb3VudGVyfWA7XG4gICAgICAgICAgaWYgKHRoaXMudGltZXJPZmYpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudGltZXJPZmYgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBbdGhpcy5sZWZ0LCBjZWxsc1tpXS5zdHlsZS5sZWZ0XSA9IFtjZWxsc1tpXS5zdHlsZS5sZWZ0LCB0aGlzLmxlZnRdO1xuICAgICAgICAgIFt0aGlzLnRvcCwgY2VsbHNbaV0uc3R5bGUudG9wXSA9IFtjZWxsc1tpXS5zdHlsZS50b3AsIHRoaXMudG9wXTtcbiAgICAgICAgICB0aGlzLmNoZWNrU3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tTdGF0dXMoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmIChgJHtNYXRoLnRydW5jKGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpfXB4YCA9PT0gYCR7KCgrY2VsbC5pbm5lclRleHQgLSAxKSAlIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpICogTWF0aC50cnVuYyhjZWxsU2l6ZSl9cHhgICYmIGAke01hdGgudHJ1bmMoY2VsbC5zdHlsZS50b3Auc2xpY2UoMCwgLTIpKX1weGAgPT09IGAkeyhNYXRoLnRydW5jKCgrY2VsbC5pbm5lclRleHQgLSAxKSAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpKSAqIE1hdGgudHJ1bmMoY2VsbFNpemUpfXB4YCkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNvdW50ID09PSBjZWxscy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW5kT2ZHYW1lLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VGltZXIoKSB7XG4gICAgbGV0IHRpbWUgPSAwO1xuICAgIHRoaXMudGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRpbWUgKz0gMTtcbiAgICAgIHRoaXMudGltZXIuaW5uZXJIVE1MID0gYFRpbWU6IFxuICAgICAgJHtNYXRoLnRydW5jKHRpbWUgLyA2MCkgPCAxMCA/IGAwJHtNYXRoLnRydW5jKHRpbWUgLyA2MCl9YFxuICAgIDogTWF0aC50cnVuYyh0aW1lIC8gNjApfToke3RpbWUgJSA2MCA8IDEwID8gYDAke3RpbWUgJSA2MH1gIDogdGltZSAlIDYwfWA7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY3JlYXRlR2FtZUZpZWxkKCk7XG4gICAgdGhpcy5maWVsZFNpemVTZXR0aW5ncy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkU2l6ZSA9ICt0aGlzLmZpZWxkU2l6ZVNldHRpbmdzLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5idXR0b25QbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySWQpO1xuICAgICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMudGltZXIuaW5uZXJUZXh0ID0gJ1RpbWU6IDAwOjAwJztcbiAgICAgIHRoaXMuY291bnRlci5pbm5lclRleHQgPSAnTW92ZXM6IDAnO1xuICAgICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG4gICAgICB0aGlzLnRpbWVyT2ZmID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2xlYXJGaWVsZCgpO1xuICAgICAgdGhpcy5jcmVhdGVHYW1lRmllbGQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc291bmRTZXR0aW5ncy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zb3VuZFNldHRpbmdzLnZhbHVlID09PSAnb2ZmJykge1xuICAgICAgICB0aGlzLnNvdW5kT2ZmID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc291bmRPZmYgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiY29uc3QgcmVzdW1lR2FtZSA9ICgpID0+IHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MnKTtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzLWJ1dHRvbicpO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0Lm91dGVyVGV4dCA9PT0gJ1NldHRpbmdzJykge1xuICAgICAgYnV0dG9uLmlubmVySFRNTCA9ICdSZXN1bWUgZ2FtZSc7XG4gICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uLmlubmVySFRNTCA9ICdTZXR0aW5ncyc7XG4gICAgICBzZXR0aW5ncy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXN1bWVHYW1lO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcHBseS1zZXR0aW5ncycpO1xuICAgIHRoaXMudGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Jyk7XG4gICAgdGhpcy5zb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZCcpO1xuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKTtcbiAgICB0aGlzLnN0YXRlVGV4dCA9IGZhbHNlO1xuICAgIHRoaXMuc3RhdGVTb3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuc3RhdGVJbWFnZSA9IGZhbHNlO1xuICB9XG5cbiAgY2hhbmdlVGV4dCgpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgaWYgKHRoaXMudGV4dC52YWx1ZSA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5mb250U2l6ZSA9ICcwcmVtJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmNvbG9yID0gYCR7dGhpcy50ZXh0LnZhbHVlfWA7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbWFnZSgpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY29uc3QgcmFuZG9tSW1hZ2UgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTUwIC0gMSkgKyAxKTtcbiAgICBjb25zdCB1cmxJbWcgPSBgdXJsKGFzc2V0cy9pbWFnZXMvJHtyYW5kb21JbWFnZX0uanBnKWA7XG4gICAgY29uc3QgZmllbGRTaXplID0gY2VsbHMubGVuZ3RoICsgMTtcblxuICAgIGNlbGxzLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBgJHt1cmxJbWd9ICR7KCgrY2VsbHNbaV0uaW5uZXJUZXh0IC0gMSkgJSAoTWF0aC5zcXJ0KGZpZWxkU2l6ZSkpKVxuICAgICAgICAqICgxMDAgLyAoTWF0aC5zcXJ0KGZpZWxkU2l6ZSkgLSAxKSl9JSAke01hdGgudHJ1bmMoKCtjZWxsc1tpXS5pbm5lclRleHQgLSAxKSAvIChNYXRoLnNxcnQoZmllbGRTaXplKSkpXG4gICAgICAgICogKDEwMCAvIChNYXRoLnNxcnQoZmllbGRTaXplKSAtIDEpKX0lYDtcbiAgICAgIGlmICh0aGlzLmltYWdlLnZhbHVlID09PSAnb24nKSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICc0MDBweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRMb2NhbFN0b3JhZ2UoKSB7XG4gICAgY29uc3QgY3VycmVudFNldHRpbmdzID0geyB0ZXh0OiBgJHt0aGlzLnRleHQudmFsdWV9YCwgc291bmQ6IGAke3RoaXMuc291bmQudmFsdWV9YCwgaW1hZ2U6IGAke3RoaXMuaW1hZ2UudmFsdWV9YCB9O1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXR0aW5ncycsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRTZXR0aW5ncykpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyB0aGlzLnNldExvY2FsU3RvcmFnZSgpO1xuICAgIHRoaXMudGV4dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlVGV4dCA9IHRydWU7XG4gICAgfSk7XG4gICAgdGhpcy5zb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlU291bmQgPSB0cnVlO1xuICAgIH0pO1xuICAgIHRoaXMuaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZUltYWdlID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlVGV4dCkgdGhpcy5jaGFuZ2VUZXh0KCk7XG4gICAgICBpZiAodGhpcy5zdGF0ZUltYWdlKSB0aGlzLnNldEltYWdlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL21vZHVsZXMvZ2VtLXB1enpsZSc7XG5pbXBvcnQgcmVzdW1lR2FtZSBmcm9tICcuL21vZHVsZXMvcmVzdW1lLWdhbWUnO1xuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vbW9kdWxlcy9zZXR0aW5ncyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIG5ldyBHZW1QdXp6bGUoKS5pbml0KCk7XG4gIHJlc3VtZUdhbWUoKTtcbiAgbmV3IFNldHRpbmdzKCkuaW5pdCgpO1xufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9