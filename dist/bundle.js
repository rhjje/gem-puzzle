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
        this.setRecord(this.moveCounter, this.timer.innerText.slice(6), this.fieldSize);
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
    key: "setRecord",
    value: function setRecord(moves, time, size) {
      var data;

      if (localStorage.getItem("records".concat(size))) {
        data = JSON.parse(localStorage.getItem("records".concat(size)));
      } else {
        data = [];
      }

      var now = new Date().toString();
      var date = "".concat(now.slice(8, 10), " ").concat(now.slice(4, 7), " ").concat(now.slice(11, 15));
      var currentResult = {
        moves: moves,
        time: time,
        date: date
      };
      data.push(currentResult);
      data.sort(function (a, b) {
        return a.moves > b.moves ? 1 : -1;
      });

      if (data.length > 10) {
        localStorage.setItem("records".concat(size), JSON.stringify(data.slice(0, 10)));
      } else {
        localStorage.setItem("records".concat(size), JSON.stringify(data));
      }
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

/***/ "./src/js/modules/leaderboard.js":
/*!***************************************!*\
  !*** ./src/js/modules/leaderboard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Leaderboard)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Leaderboard = /*#__PURE__*/function () {
  function Leaderboard() {
    _classCallCheck(this, Leaderboard);

    this.button = document.querySelector('.popup-records__open');
    this.container = document.querySelector('.popup-records');
    this.settings = document.querySelector('.settings');
    this.settingsButton = document.querySelector('.settings-button');
    this.fieldSize = document.getElementById('field-size');
  }

  _createClass(Leaderboard, [{
    key: "buildTable",
    value: function buildTable() {
      var _this = this;

      this.container.innerHTML = '';
      var data = JSON.parse(localStorage.getItem("records".concat(this.fieldSize.value)));
      var rows = '';
      data.forEach(function (item) {
        rows += "\n      <tbody class=\"records__tbody\">\n        <tr class=\"records__row\">\n          <th class=\"records__cell\">".concat(item.moves, "</th>\n          <th class=\"records__cell\">").concat(item.time, "</th>\n          <th class=\"records__cell\">").concat(item.date, "</th>\n        </tr>\n      </tbody>");
      });
      var table = "\n      <table class=\"records\">\n      <caption class=\"records__caption\">Best scores ".concat(this.fieldSize.value === '9' ? '3x3' : '4x4', "</caption>\n      <thead class=\"records__thead\">\n        <tr class=\"records__row\">\n          <th class=\"records__cell\">Moves</th>\n          <th class=\"records__cell\">Time</th>\n          <th class=\"records__cell\">Date</th>\n        </tr>\n      </thead>\n      ").concat(rows, "\n    </table>");
      this.container.innerHTML += table;
      this.container.innerHTML += '<a href="#" class="popup-records__close">Back</a>';
      this.container.style.display = 'flex';
      document.querySelector('.popup-records__close').addEventListener('click', function (event) {
        event.preventDefault();
        _this.container.style.display = 'none';
        _this.settings.style.display = 'flex';

        _this.settingsButton.removeAttribute('disabled');
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.button.addEventListener('click', function () {
        _this2.buildTable();

        _this2.settings.style.display = 'none';

        _this2.settingsButton.setAttribute('disabled', 'disabled');
      });
    }
  }]);

  return Leaderboard;
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
/* harmony import */ var _modules_leaderboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/leaderboard */ "./src/js/modules/leaderboard.js");



document.addEventListener('DOMContentLoaded', function () {
  new _modules_gem_puzzle__WEBPACK_IMPORTED_MODULE_0__.default().init();
  new _modules_settings__WEBPACK_IMPORTED_MODULE_1__.default().init();
  new _modules_leaderboard__WEBPACK_IMPORTED_MODULE_2__.default().init();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbW9kdWxlcy9sZWFkZXJib2FyZC5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9qcy9tb2R1bGVzL3NldHRpbmdzLmpzIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tb21lbnR1bS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21vbWVudHVtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbW9tZW50dW0vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly9tb21lbnR1bS8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzIl0sIm5hbWVzIjpbIkdlbVB1enpsZSIsImZpZWxkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYnV0dG9uUGxheSIsImNvdW50ZXIiLCJ0aW1lciIsImVuZE9mR2FtZSIsImF1ZGlvIiwiQXVkaW8iLCJmaWVsZFNpemUiLCJ0ZXh0IiwiaW1hZ2UiLCJtb3ZlQ291bnRlciIsInRpbWVyT2ZmIiwic2l6ZSIsImFyciIsIkFycmF5Iiwia2V5cyIsInNvcnQiLCJNYXRoIiwicmFuZG9tIiwic3FydCIsInRlbXAiLCJpIiwibGVuZ3RoIiwicHVzaCIsInNsaWNlIiwibWFwIiwiaXRlbSIsInJldmVyc2UiLCJzbmFrZUFyciIsImZsYXQiLCJqIiwiY2VsbHMiLCJzaHVmZmxlR2FtZUZpZWxkIiwiZm9yRWFjaCIsImxlZnQiLCJ0b3AiLCJjZWxsU2l6ZSIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJUZXh0Iiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImZvbnRTaXplIiwiY29sb3IiLCJhcHBlbmQiLCJiaW5kVHJpZ2dlcnMiLCJzZXRJbWFnZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZW1vdmUiLCJyYW5kb21JbWFnZSIsImZsb29yIiwic2V0QXR0cmlidXRlIiwidXJsSW1nIiwiZ2V0QXR0cmlidXRlIiwiXyIsImJhY2tncm91bmQiLCJ0cnVuYyIsImJhY2tncm91bmRTaXplIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZlcnRpY2FsRGlmZiIsImFicyIsImhvcml6b250RGlmZiIsInBsYXkiLCJpbm5lckhUTUwiLCJzZXRUaW1lciIsImNoZWNrU3RhdHVzIiwiY291bnQiLCJkaXNwbGF5Iiwic2V0UmVjb3JkIiwiY2xlYXJJbnRlcnZhbCIsInRpbWVySWQiLCJ0aW1lIiwic2V0SW50ZXJ2YWwiLCJtb3ZlcyIsImRhdGEiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwibm93IiwiRGF0ZSIsInRvU3RyaW5nIiwiZGF0ZSIsImN1cnJlbnRSZXN1bHQiLCJhIiwiYiIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJnZXRJbWFnZVVybCIsImNsZWFyRmllbGQiLCJjcmVhdGVHYW1lRmllbGQiLCJzZXRJbml0aWFsU3RhdGUiLCJMZWFkZXJib2FyZCIsImJ1dHRvbiIsImNvbnRhaW5lciIsInNldHRpbmdzIiwic2V0dGluZ3NCdXR0b24iLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwicm93cyIsInRhYmxlIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInJlbW92ZUF0dHJpYnV0ZSIsImJ1aWxkVGFibGUiLCJTZXR0aW5ncyIsInNvdW5kIiwidGFyZ2V0Iiwib3V0ZXJUZXh0IiwiY2hhbmdlVGV4dCIsImluaXQiLCJMZWFkZXJCb2FyZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUVxQkEsUztBQUNuQix1QkFBYztBQUFBOztBQUNaLFNB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QUFDMUMsY0FBSSxDQUFDL0QsS0FBTCxDQUFXd0QsWUFBWCxDQUF3QixZQUF4QixZQUF5QyxNQUFJLENBQUM3QyxLQUFMLENBQVc0RixLQUFwRDs7QUFDQSxjQUFJLENBQUNwRCxRQUFMO0FBQ0QsT0FIRDtBQUtBLFdBQUtyQyxJQUFMLENBQVVpRCxnQkFBVixDQUEyQixRQUEzQixFQUFxQyxZQUFNO0FBQ3pDLGNBQUksQ0FBQy9ELEtBQUwsQ0FBV3dELFlBQVgsQ0FBd0IsV0FBeEIsWUFBd0MsTUFBSSxDQUFDMUMsSUFBTCxDQUFVeUYsS0FBbEQ7QUFDRCxPQUZEO0FBR0Q7Ozs7RUF0RG1DeEcsZ0Q7Ozs7Ozs7O1VDRnRDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBRUFFLFFBQVEsQ0FBQzhELGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xELE1BQUloRSx3REFBSixHQUFnQm9ILElBQWhCO0FBQ0EsTUFBSUwsc0RBQUosR0FBZUssSUFBZjtBQUNBLE1BQUlDLHlEQUFKLEdBQWtCRCxJQUFsQjtBQUNELENBSkQsRTs7Ozs7Ozs7O0FDSkEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW1QdXp6bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpZWxkJyk7XG4gICAgdGhpcy5idXR0b25QbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXknKTtcbiAgICB0aGlzLmNvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlcicpO1xuICAgIHRoaXMudGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZXInKTtcbiAgICB0aGlzLmVuZE9mR2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmQtb2YtZ2FtZScpO1xuICAgIHRoaXMuYXVkaW8gPSBuZXcgQXVkaW8oJy4vYXNzZXRzL3NvdW5kcy9tb3ZlLndhdicpO1xuXG4gICAgdGhpcy5maWVsZFNpemUgPSAxNjtcbiAgICB0aGlzLnRleHQgPSAnYmxhY2snO1xuICAgIHRoaXMuaW1hZ2UgPSAnb2ZmJztcblxuICAgIHRoaXMubW92ZUNvdW50ZXIgPSAwO1xuICAgIHRoaXMudGltZXJPZmYgPSB0cnVlO1xuICB9XG5cbiAgc2h1ZmZsZUdhbWVGaWVsZChzaXplKSB7XG4gICAgY29uc3QgYXJyID0gWy4uLkFycmF5KHNpemUpLmtleXMoKV0uc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcbiAgICBhcnIuc29ydCgoKSA9PiBNYXRoLnJhbmRvbSgpIC0gMC41KTtcbiAgICBjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KHNpemUpO1xuICAgIGNvbnN0IHRlbXAgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gc3FydCkge1xuICAgICAgdGVtcC5wdXNoKGFyci5zbGljZShpLCBzcXJ0ICsgaSkpO1xuICAgIH1cbiAgICB0ZW1wLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgaWYgKGkgJSAyKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnJldmVyc2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuICAgIGNvbnN0IHNuYWtlQXJyID0gdGVtcC5mbGF0KCk7XG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25ha2VBcnIubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICBpZiAoc25ha2VBcnJbaV0gIT09IDApIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgc25ha2VBcnIubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBpZiAoc25ha2VBcnJbaV0gPiBzbmFrZUFycltqXSAmJiBzbmFrZUFycltqXSAhPT0gMCkgY291bnRlciArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjb3VudGVyICUgMiA9PT0gMCkge1xuICAgICAgaWYgKGFyclswXSAhPT0gMCAmJiBhcnJbMV0gIT09IDApIHtcbiAgICAgICAgW2FyclswXSwgYXJyWzFdXSA9IFthcnJbMV0sIGFyclswXV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbYXJyW2Fyci5sZW5ndGggLSAxXSwgYXJyW2Fyci5sZW5ndGggLSAyXV0gPSBbYXJyW2Fyci5sZW5ndGggLSAyXSwgYXJyW2Fyci5sZW5ndGggLSAxXV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjcmVhdGVHYW1lRmllbGQoKSB7XG4gICAgY29uc3QgY2VsbHMgPSB0aGlzLnNodWZmbGVHYW1lRmllbGQodGhpcy5maWVsZFNpemUpO1xuICAgIGNlbGxzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGxlZnQgPSBpICUgTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICAgIGNvbnN0IHRvcCA9IChpIC0gbGVmdCkgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgY29uc3QgY2VsbFNpemUgPSA0MDAgLyBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpO1xuICAgICAgaWYgKGl0ZW0gIT09IDApIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgY2VsbC5pbm5lclRleHQgPSBpdGVtO1xuICAgICAgICBjZWxsLnN0eWxlLndpZHRoID0gYCR7NDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUuaGVpZ2h0ID0gYCR7NDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUubGVmdCA9IGAke2xlZnQgKiBjZWxsU2l6ZX1weGA7XG4gICAgICAgIGNlbGwuc3R5bGUudG9wID0gYCR7dG9wICogY2VsbFNpemV9cHhgO1xuXG4gICAgICAgIGlmICh0aGlzLnRleHQgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gJzByZW0nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwuc3R5bGUuY29sb3IgPSBgJHt0aGlzLnRleHR9YDtcbiAgICAgICAgICBjZWxsLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWVsZC5hcHBlbmQoY2VsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlZnQgPSBgJHtsZWZ0ICogY2VsbFNpemV9cHhgO1xuICAgICAgICB0aGlzLnRvcCA9IGAke3RvcCAqIGNlbGxTaXplfXB4YDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmJpbmRUcmlnZ2VycygpO1xuICAgIGlmICh0aGlzLmltYWdlID09PSAnb24nKSB0aGlzLnNldEltYWdlKCk7XG4gIH1cblxuICBjbGVhckZpZWxkKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLnJlbW92ZSgpKTtcbiAgfVxuXG4gIGdldEltYWdlVXJsKCkge1xuICAgIGNvbnN0IHJhbmRvbUltYWdlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDE1MCAtIDEpICsgMSk7XG4gICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXJsJywgYHVybChhc3NldHMvaW1hZ2VzLyR7cmFuZG9tSW1hZ2V9LmpwZylgKTtcbiAgfVxuXG4gIHNldEltYWdlKCkge1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBjb25zdCB1cmxJbWcgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKTtcblxuICAgIGNlbGxzLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBgJHt1cmxJbWd9ICR7KCgrY2VsbHNbaV0uaW5uZXJUZXh0IC0gMSkgJSAoTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpXG4gICAgICAgICogKDEwMCAvIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpIC0gMSkpfSUgJHtNYXRoLnRydW5jKCgrY2VsbHNbaV0uaW5uZXJUZXh0IC0gMSkgLyAoTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKSkpXG4gICAgICAgICogKDEwMCAvIChNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpIC0gMSkpfSVgO1xuICAgICAgaWYgKHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWltYWdlJykgPT09ICdvbicpIHtcbiAgICAgICAgY2VsbHNbaV0uc3R5bGUuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzQwMHB4JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRUcmlnZ2VycygpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdmVydGljYWxEaWZmID0gTWF0aC5hYnModGhpcy50b3Auc2xpY2UoMCwgLTIpIC0gY2VsbC5zdHlsZS50b3Auc2xpY2UoMCwgLTIpKTtcbiAgICAgICAgY29uc3QgaG9yaXpvbnREaWZmID0gTWF0aC5hYnModGhpcy5sZWZ0LnNsaWNlKDAsIC0yKSAtIGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpO1xuICAgICAgICBjb25zdCBjZWxsU2l6ZSA9IDQwMCAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgIGlmIChNYXRoLnRydW5jKHZlcnRpY2FsRGlmZikgKyBNYXRoLnRydW5jKGhvcml6b250RGlmZikgPT09IE1hdGgudHJ1bmMoY2VsbFNpemUpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXNvdW5kJykgPT09ICdvbicpIHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1vdmVDb3VudGVyICs9IDE7XG4gICAgICAgICAgdGhpcy5jb3VudGVyLmlubmVySFRNTCA9IGBNb3ZlczogJHt0aGlzLm1vdmVDb3VudGVyfWA7XG4gICAgICAgICAgaWYgKHRoaXMudGltZXJPZmYpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudGltZXJPZmYgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBbdGhpcy5sZWZ0LCBjZWxsc1tpXS5zdHlsZS5sZWZ0XSA9IFtjZWxsc1tpXS5zdHlsZS5sZWZ0LCB0aGlzLmxlZnRdO1xuICAgICAgICAgIFt0aGlzLnRvcCwgY2VsbHNbaV0uc3R5bGUudG9wXSA9IFtjZWxsc1tpXS5zdHlsZS50b3AsIHRoaXMudG9wXTtcbiAgICAgICAgICB0aGlzLmNoZWNrU3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tTdGF0dXMoKSB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGNvbnN0IGNlbGxTaXplID0gNDAwIC8gTWF0aC5zcXJ0KHRoaXMuZmllbGRTaXplKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmIChgJHtNYXRoLnRydW5jKGNlbGwuc3R5bGUubGVmdC5zbGljZSgwLCAtMikpfXB4YFxuICAgICAgPT09IGAkeygoK2NlbGwuaW5uZXJUZXh0IC0gMSkgJSBNYXRoLnNxcnQodGhpcy5maWVsZFNpemUpKSAqIE1hdGgudHJ1bmMoY2VsbFNpemUpfXB4YFxuICAgICAgJiYgYCR7TWF0aC50cnVuYyhjZWxsLnN0eWxlLnRvcC5zbGljZSgwLCAtMikpfXB4YFxuICAgICAgPT09IGAkeyhNYXRoLnRydW5jKCgrY2VsbC5pbm5lclRleHQgLSAxKSAvIE1hdGguc3FydCh0aGlzLmZpZWxkU2l6ZSkpKSAqIE1hdGgudHJ1bmMoY2VsbFNpemUpfXB4YCkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNvdW50ID09PSBjZWxscy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW5kT2ZHYW1lLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICB0aGlzLnNldFJlY29yZCh0aGlzLm1vdmVDb3VudGVyLCB0aGlzLnRpbWVyLmlubmVyVGV4dC5zbGljZSg2KSwgdGhpcy5maWVsZFNpemUpO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySWQpO1xuICAgIH1cbiAgfVxuXG4gIHNldFRpbWVyKCkge1xuICAgIGxldCB0aW1lID0gMDtcbiAgICB0aGlzLnRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZmllbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXBhdXNlJykpIHtcbiAgICAgICAgdGltZSArPSAxO1xuICAgICAgICB0aGlzLnRpbWVyLmlubmVySFRNTCA9IGBUaW1lOiBcbiAgICAgICAgJHtNYXRoLnRydW5jKHRpbWUgLyA2MCkgPCAxMCA/IGAwJHtNYXRoLnRydW5jKHRpbWUgLyA2MCl9YFxuICAgIDogTWF0aC50cnVuYyh0aW1lIC8gNjApfToke3RpbWUgJSA2MCA8IDEwID8gYDAke3RpbWUgJSA2MH1gIDogdGltZSAlIDYwfWA7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBzZXRSZWNvcmQobW92ZXMsIHRpbWUsIHNpemUpIHtcbiAgICBsZXQgZGF0YTtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oYHJlY29yZHMke3NpemV9YCkpIHtcbiAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGByZWNvcmRzJHtzaXplfWApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICBjb25zdCBkYXRlID0gYCR7bm93LnNsaWNlKDgsIDEwKX0gJHtub3cuc2xpY2UoNCwgNyl9ICR7bm93LnNsaWNlKDExLCAxNSl9YDtcblxuICAgIGNvbnN0IGN1cnJlbnRSZXN1bHQgPSB7IG1vdmVzLCB0aW1lLCBkYXRlIH07XG4gICAgZGF0YS5wdXNoKGN1cnJlbnRSZXN1bHQpO1xuICAgIGRhdGEuc29ydCgoYSwgYikgPT4gKGEubW92ZXMgPiBiLm1vdmVzID8gMSA6IC0xKSk7XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAxMCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHJlY29yZHMke3NpemV9YCwgSlNPTi5zdHJpbmdpZnkoZGF0YS5zbGljZSgwLCAxMCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHJlY29yZHMke3NpemV9YCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJZCk7XG4gICAgdGhpcy5lbmRPZkdhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLnRpbWVyLmlubmVyVGV4dCA9ICdUaW1lOiAwMDowMCc7XG4gICAgdGhpcy5jb3VudGVyLmlubmVyVGV4dCA9ICdNb3ZlczogMCc7XG4gICAgdGhpcy5tb3ZlQ291bnRlciA9IDA7XG4gICAgdGhpcy50aW1lck9mZiA9IHRydWU7XG5cbiAgICB0aGlzLmZpZWxkU2l6ZSA9ICt0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJyk7XG4gICAgdGhpcy50ZXh0ID0gdGhpcy5maWVsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmZpZWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1pbWFnZScpO1xuXG4gICAgdGhpcy5nZXRJbWFnZVVybCgpO1xuICAgIHRoaXMuY2xlYXJGaWVsZCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmdldEltYWdlVXJsKCk7XG4gICAgdGhpcy5jcmVhdGVHYW1lRmllbGQoKTtcblxuICAgIHRoaXMuYnV0dG9uUGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICB0aGlzLmNyZWF0ZUdhbWVGaWVsZCgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMZWFkZXJib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLXJlY29yZHNfX29wZW4nKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1yZWNvcmRzJyk7XG4gICAgdGhpcy5zZXR0aW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZXR0aW5ncycpO1xuICAgIHRoaXMuc2V0dGluZ3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MtYnV0dG9uJyk7XG4gICAgdGhpcy5maWVsZFNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmllbGQtc2l6ZScpO1xuICB9XG5cbiAgYnVpbGRUYWJsZSgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgcmVjb3JkcyR7dGhpcy5maWVsZFNpemUudmFsdWV9YCkpO1xuICAgIGxldCByb3dzID0gJyc7XG4gICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICByb3dzICs9IGBcbiAgICAgIDx0Ym9keSBjbGFzcz1cInJlY29yZHNfX3Rib2R5XCI+XG4gICAgICAgIDx0ciBjbGFzcz1cInJlY29yZHNfX3Jvd1wiPlxuICAgICAgICAgIDx0aCBjbGFzcz1cInJlY29yZHNfX2NlbGxcIj4ke2l0ZW0ubW92ZXN9PC90aD5cbiAgICAgICAgICA8dGggY2xhc3M9XCJyZWNvcmRzX19jZWxsXCI+JHtpdGVtLnRpbWV9PC90aD5cbiAgICAgICAgICA8dGggY2xhc3M9XCJyZWNvcmRzX19jZWxsXCI+JHtpdGVtLmRhdGV9PC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+YDtcbiAgICB9KTtcbiAgICBjb25zdCB0YWJsZSA9IGBcbiAgICAgIDx0YWJsZSBjbGFzcz1cInJlY29yZHNcIj5cbiAgICAgIDxjYXB0aW9uIGNsYXNzPVwicmVjb3Jkc19fY2FwdGlvblwiPkJlc3Qgc2NvcmVzICR7dGhpcy5maWVsZFNpemUudmFsdWUgPT09ICc5JyA/ICczeDMnIDogJzR4NCd9PC9jYXB0aW9uPlxuICAgICAgPHRoZWFkIGNsYXNzPVwicmVjb3Jkc19fdGhlYWRcIj5cbiAgICAgICAgPHRyIGNsYXNzPVwicmVjb3Jkc19fcm93XCI+XG4gICAgICAgICAgPHRoIGNsYXNzPVwicmVjb3Jkc19fY2VsbFwiPk1vdmVzPC90aD5cbiAgICAgICAgICA8dGggY2xhc3M9XCJyZWNvcmRzX19jZWxsXCI+VGltZTwvdGg+XG4gICAgICAgICAgPHRoIGNsYXNzPVwicmVjb3Jkc19fY2VsbFwiPkRhdGU8L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgICR7cm93c31cbiAgICA8L3RhYmxlPmA7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgKz0gdGFibGU7XG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MICs9ICc8YSBocmVmPVwiI1wiIGNsYXNzPVwicG9wdXAtcmVjb3Jkc19fY2xvc2VcIj5CYWNrPC9hPic7XG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtcmVjb3Jkc19fY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLnNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICB0aGlzLnNldHRpbmdzQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmJ1aWxkVGFibGUoKTtcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuc2V0dGluZ3NCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgR2VtUHV6emxlIGZyb20gJy4vZ2VtLXB1enpsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzIGV4dGVuZHMgR2VtUHV6emxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNldHRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNldHRpbmdzJyk7XG4gICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2V0dGluZ3MtYnV0dG9uJyk7XG4gICAgdGhpcy5maWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZCcpO1xuICAgIHRoaXMudGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0Jyk7XG4gICAgdGhpcy5zb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZCcpO1xuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKTtcbiAgICB0aGlzLnNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmllbGQtc2l6ZScpO1xuICB9XG5cbiAgY2hhbmdlVGV4dCgpIHtcbiAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XG4gICAgY2VsbHMuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgaWYgKHRoaXMudGV4dC52YWx1ZSA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICBjZWxsc1tpXS5zdHlsZS5mb250U2l6ZSA9ICcwcmVtJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmNvbG9yID0gYCR7dGhpcy50ZXh0LnZhbHVlfWA7XG4gICAgICAgIGNlbGxzW2ldLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0Lm91dGVyVGV4dCA9PT0gJ1NldHRpbmdzJykge1xuICAgICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1wYXVzZScsIHRydWUpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5pbm5lckhUTUwgPSAnUmVzdW1lIGdhbWUnO1xuICAgICAgICB0aGlzLnNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1wYXVzZScpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5pbm5lckhUTUwgPSAnU2V0dGluZ3MnO1xuICAgICAgICB0aGlzLnNldHRpbmdzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGhpcy5maWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcsIGAke3RoaXMudGV4dC52YWx1ZX1gKTtcbiAgICAgIHRoaXMuY2hhbmdlVGV4dCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1zb3VuZCcsIGAke3RoaXMuc291bmQudmFsdWV9YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMuZmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLWltYWdlJywgYCR7dGhpcy5pbWFnZS52YWx1ZX1gKTtcbiAgICAgIHRoaXMuc2V0SW1hZ2UoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2l6ZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLmZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1zaXplJywgYCR7dGhpcy5zaXplLnZhbHVlfWApO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHZW1QdXp6bGUgZnJvbSAnLi9tb2R1bGVzL2dlbS1wdXp6bGUnO1xuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vbW9kdWxlcy9zZXR0aW5ncyc7XG5pbXBvcnQgTGVhZGVyQm9hcmQgZnJvbSAnLi9tb2R1bGVzL2xlYWRlcmJvYXJkJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbmV3IEdlbVB1enpsZSgpLmluaXQoKTtcbiAgbmV3IFNldHRpbmdzKCkuaW5pdCgpO1xuICBuZXcgTGVhZGVyQm9hcmQoKS5pbml0KCk7XG59KTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJzb3VyY2VSb290IjoiIn0=