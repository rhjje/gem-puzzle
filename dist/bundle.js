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
    this.counter = document.querySelector('.counter');
    this.timer = document.querySelector('.timer');
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
          var cell = document.createElement('div'); // cell.setAttribute('draggable', true);

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
            _this2.sound.play();

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
        console.log('you win');
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
      this.createGameField();
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
/* harmony export */   "default": () => (/* binding */ Setting)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Setting = /*#__PURE__*/function () {
  function Setting() {
    _classCallCheck(this, Setting);

    this.button = document.querySelector('.apply-settings');
    this.text = document.getElementById('text');
    this.sound = document.getElementById('sound');
    this.image = document.getElementById('image');
    this.stateText = false;
    this.stateSound = false;
    this.stateImage = false;
  }

  _createClass(Setting, [{
    key: "changeText",
    value: function changeText() {
      var _this = this;

      var cells = document.querySelectorAll('.cell');
      cells.forEach(function (_, i) {
        if (_this.text.value === 'disabled') {
          cells[i].style.fontSize = '0rem';
        } else {
          cells[i].style.color = "".concat(_this.text.value);
          cells[i].style.fontSize = '3.5rem';
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.text.addEventListener('change', function () {
        _this2.stateText = true;
      });
      this.sound.addEventListener('change', function () {
        _this2.stateSound = true;
      });
      this.image.addEventListener('change', function () {
        _this2.stateImage = true;
      });
      this.button.addEventListener('click', function () {
        if (_this2.stateText) _this2.changeText();
      });
    }
  }]);

  return Setting;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9yZXN1bWUtZ2FtZS5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL3NldHRpbmdzLmpzIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9zYXNzL3N0eWxlcy5zY3NzIl0sIm5hbWVzIjpbIkdlbVB1enpsZSIsImZpZWxkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY291bnRlciIsInRpbWVyIiwic291bmQiLCJBdWRpbyIsIm1vdmVDb3VudGVyIiwiZmllbGRTaXplIiwidGltZXJPZmYiLCJzb3VuZE9mZiIsInNpemUiLCJhcnIiLCJBcnJheSIsImtleXMiLCJzb3J0IiwiTWF0aCIsInJhbmRvbSIsImNlbGxzIiwic2h1ZmZsZUdhbWVGaWVsZCIsImZvckVhY2giLCJpdGVtIiwiaSIsImxlZnQiLCJzcXJ0IiwidG9wIiwiY2VsbFNpemUiLCJjZWxsIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVyVGV4dCIsInN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJhcHBlbmQiLCJiaW5kVHJpZ2dlcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZlcnRpY2FsRGlmZiIsImFicyIsInNsaWNlIiwiaG9yaXpvbnREaWZmIiwidHJ1bmMiLCJwbGF5IiwiaW5uZXJIVE1MIiwic2V0VGltZXIiLCJjaGVja1N0YXR1cyIsImNvdW50IiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsInRpbWUiLCJ0aW1lcklkIiwic2V0SW50ZXJ2YWwiLCJjcmVhdGVHYW1lRmllbGQiLCJyZXN1bWVHYW1lIiwic2V0dGluZ3MiLCJidXR0b24iLCJldmVudCIsInRhcmdldCIsIm91dGVyVGV4dCIsImRpc3BsYXkiLCJTZXR0aW5nIiwidGV4dCIsImdldEVsZW1lbnRCeUlkIiwiaW1hZ2UiLCJzdGF0ZVRleHQiLCJzdGF0ZVNvdW5kIiwic3RhdGVJbWFnZSIsIl8iLCJ2YWx1ZSIsImZvbnRTaXplIiwiY29sb3IiLCJjaGFuZ2VUZXh0IiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUVxQkEsUztBQUNuQix1QkFBYztBQUFBOztBQUNaLFNBQUtDLEtBQUwsR0FBYUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxTQUFLQyxPQUFMLEdBQWVGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFmO0FBQ0EsU0FBS0UsS0FBTCxHQUFhSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLFNBQUtHLEtBQUwsR0FBYSxJQUFJQyxLQUFKLENBQVUsMEJBQVYsQ0FBYjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDRDs7OztXQUVELDBCQUFpQkMsSUFBakIsRUFBdUI7QUFDckIsVUFBTUMsR0FBRyxHQUFHLG1CQUFJQyxLQUFLLENBQUNGLElBQUQsQ0FBTCxDQUFZRyxJQUFaLEVBQUosRUFBd0JDLElBQXhCLENBQTZCO0FBQUEsZUFB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QVgsQ0FBNEIsUUFBNUIsRUFBc0MsWUFBTTtBQUMxQyxjQUFJLENBQUMrQixVQUFMLEdBQWtCLElBQWxCO0FBQ0QsT0FGRDtBQUdBLFdBQUtYLE1BQUwsQ0FBWXBCLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDMUMsWUFBSSxNQUFJLENBQUM2QixTQUFULEVBQW9CLE1BQUksQ0FBQ08sVUFBTDtBQUNyQixPQUZEO0FBR0Q7Ozs7Ozs7Ozs7OztVQ3BDSDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUVBekUsUUFBUSxDQUFDcUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsTUFBSXZDLHdEQUFKLEdBQWdCNEUsSUFBaEI7QUFDQW5CLCtEQUFVO0FBQ1YsTUFBSU8sc0RBQUosR0FBY1ksSUFBZDtBQUNELENBSkQsRTs7Ozs7Ozs7O0FDSkEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW1QdXp6bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy5jb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXInKTtcbiAgICB0aGlzLnRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWVyJyk7XG4gICAgdGhpcy5zb3VuZCA9IG5ldyBBdWRpbygnLi9hc3NldHMvc291bmRzL21vdmUud2F2Jyk7XG4gICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG4gICAgdGhpcy5maWVsZFNpemUgPSAxNjtcbiAgICB0aGlzLnRpbWVyT2ZmID0gdHJ1ZTtcbiAgICB0aGlzLnNvdW5kT2ZmID0gZmFsc2U7XG4gIH1cblxuICBzaHVmZmxlR2FtZUZpZWxkKHNpemUpIHtcbiAgICBjb25zdCBhcnIgPSBbLi4uQXJyYXkoc2l6ZSkua2V5cygpXS5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjcmVhdGVHYW1lRmllbGQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSB0aGlzLnNodWZmbGVHYW1lRmllbGQodGhpcy5maWVsZFNpemUpO1xuICAgIGNlbGxzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGxlZnQgPSBpICUgTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGNvbnN0IHRvcCA9IChpIC0gbGVmdCkgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgaWYgKGl0ZW0gIT09IDApIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAvLyBjZWxsLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgdHJ1ZSk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICBjZWxsLmlubmVyVGV4dCA9IGl0ZW07XG4gICAgICAgIGNlbGwuc3R5bGUud2lkdGggPSBgJHs0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS5oZWlnaHQgPSBgJHs0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS5sZWZ0ID0gYCR7bGVmdCAqIGNlbGxTaXplfXB4YDtcbiAgICAgICAgY2VsbC5zdHlsZS50b3AgPSBgJHt0b3AgKiBjZWxsU2l6ZX1weGA7XG4gICAgICAgIHRoaXMuZmllbGQuYXBwZW5kKGNlbGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZWZ0ID0gYCR7bGVmdCAqIGNlbGxTaXplfXB4YDtcbiAgICAgICAgdGhpcy50b3AgPSBgJHt0b3AgKiBjZWxsU2l6ZX1weGA7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5iaW5kVHJpZ2dlcnMoKTtcbiAgfVxuXG4gIGJpbmRUcmlnZ2VycygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdmVydGljYWxEaWZmID0gTWF0aC5hYnModGhpcy50b3Auc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS50b3Auc2xpY2UoMCwgLTIpKTtcbiAgICAgICAgY29uc3QgaG9yaXpvbnREaWZmID0gTWF0aC5hYnModGhpcy5sZWZ0LnNsaWNlKDAsIC0yKSAtIGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgIGlmIChNYXRoLnRydW5jKHZlcnRpY2FsRGlmZikgKyBNYXRoLnRydW5jKGhvcml6b250RGlmZikgPT09IE1hdGgudHJ1bmMoY2VsbFNpemUpKSB7XG4gICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlQ291bnRlciArPSAxO1xuICAgICAgICAgIHRoaXMuY291bnRlci5pbm5lckhUTUwgPSBgTW92ZXM6ICR7dGhpcy5tb3ZlQ291bnRlcn1gO1xuICAgICAgICAgIGlmICh0aGlzLnRpbWVyT2ZmKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVyKCk7XG4gICAgICAgICAgICB0aGlzLnRpbWVyT2ZmID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgW3RoaXMubGVmdCwgY2VsbHNbaV0uc3R5bGUubGVmdF0gPSBbY2VsbHNbaV0uc3R5bGUubGVmdCwgdGhpcy5sZWZ0XTtcbiAgICAgICAgICBbdGhpcy50b3AsIGNlbGxzW2ldLnN0eWxlLnRvcF0gPSBbY2VsbHNbaV0uc3R5bGUudG9wLCB0aGlzLnRvcF07XG4gICAgICAgICAgdGhpcy5jaGVja1N0YXR1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrU3RhdHVzKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBpZiAoYCR7TWF0aC50cnVuYyhjZWxsLnN0eWxlLmxlZnQuc2xpY2UoMCwgLTIpKX1weGAgPT09IGAkeygoK2NlbGwuaW5uZXJUZXh0IC0gMSkgJSBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSAqIE1hdGgudHJ1bmMoY2VsbFNpemUpfXB4YCAmJiBgJHtNYXRoLnRydW5jKGNlbGwuc3R5bGUudG9wLnNsaWNlKDAsIC0yKSl9cHhgID09PSBgJHsoTWF0aC50cnVuYygoK2NlbGwuaW5uZXJUZXh0IC0gMSkgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSkgKiBNYXRoLnRydW5jKGNlbGxTaXplKX1weGApIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChjb3VudCA9PT0gY2VsbHMubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLmxvZygneW91IHdpbicpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRpbWVyKCkge1xuICAgIGxldCB0aW1lID0gMDtcbiAgICB0aGlzLnRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aW1lICs9IDE7XG4gICAgICB0aGlzLnRpbWVyLmlubmVySFRNTCA9IGBUaW1lOiBcbiAgICAgICR7TWF0aC50cnVuYyh0aW1lIC8gNjApIDwgMTAgPyBgMCR7TWF0aC50cnVuYyh0aW1lIC8gNjApfWBcbiAgICA6IE1hdGgudHJ1bmModGltZSAvIDYwKX06JHt0aW1lICUgNjAgPCAxMCA/IGAwJHt0aW1lICUgNjB9YCA6IHRpbWUgJSA2MH1gO1xuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZUdhbWVGaWVsZCgpO1xuICB9XG59XG4iLCJjb25zdCByZXN1bWVHYW1lID0gKCkgPT4ge1xuICBjb25zdCBzZXR0aW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncycpO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MtYnV0dG9uJyk7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQub3V0ZXJUZXh0ID09PSAnU2V0dGluZ3MnKSB7XG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gJ1Jlc3VtZSBnYW1lJztcbiAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gJ1NldHRpbmdzJztcbiAgICAgIHNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlc3VtZUdhbWU7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXBwbHktc2V0dGluZ3MnKTtcbiAgICB0aGlzLnRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dCcpO1xuICAgIHRoaXMuc291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQnKTtcbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJyk7XG4gICAgdGhpcy5zdGF0ZVRleHQgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlU291bmQgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlSW1hZ2UgPSBmYWxzZTtcbiAgfVxuXG4gIGNoYW5nZVRleHQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNlbGxzLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICAgIGlmICh0aGlzLnRleHQudmFsdWUgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuZm9udFNpemUgPSAnMHJlbSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5jb2xvciA9IGAke3RoaXMudGV4dC52YWx1ZX1gO1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5mb250U2l6ZSA9ICczLjVyZW0nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZVRleHQgPSB0cnVlO1xuICAgIH0pO1xuICAgIHRoaXMuc291bmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZVNvdW5kID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLmltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGVJbWFnZSA9IHRydWU7XG4gICAgfSk7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZVRleHQpIHRoaXMuY2hhbmdlVGV4dCgpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHZW1QdXp6bGUgZnJvbSAnLi9tb2R1bGVzL2dlbS1wdXp6bGUnO1xuaW1wb3J0IHJlc3VtZUdhbWUgZnJvbSAnLi9tb2R1bGVzL3Jlc3VtZS1nYW1lJztcbmltcG9ydCBTZXR0aW5nIGZyb20gJy4vbW9kdWxlcy9zZXR0aW5ncyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIG5ldyBHZW1QdXp6bGUoKS5pbml0KCk7XG4gIHJlc3VtZUdhbWUoKTtcbiAgbmV3IFNldHRpbmcoKS5pbml0KCk7XG59KTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJzb3VyY2VSb290IjoiIn0=