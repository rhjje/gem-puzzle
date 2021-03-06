/* eslint-disable class-methods-use-this */
export default class GemPuzzle {
  constructor() {
    this.field = document.querySelector('.field');
    this.buttonPlay = document.querySelector('.play');
    this.buttonSettings = document.querySelector('.settings-button');
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

  shuffleGameField(size) {
    const arr = [...Array(size).keys()].sort(() => Math.random() - 0.5);
    const sqrt = Math.sqrt(size);
    const temp = [];
    for (let i = 0; i < arr.length; i += sqrt) {
      temp.push(arr.slice(i, sqrt + i));
    }
    temp.map((item, i) => {
      if (i % 2) {
        return item.reverse();
      }
      return item;
    });
    const snakeArr = temp.flat();
    let counter = 0;
    for (let i = 0; i < snakeArr.length - 1; i += 1) {
      if (snakeArr[i] !== 0) {
        for (let j = i + 1; j < snakeArr.length; j += 1) {
          if (snakeArr[i] > snakeArr[j] && snakeArr[j] !== 0) counter += 1;
        }
      }
    }
    if (counter % 2 === 0) {
      if (arr[0] !== 0 && arr[1] !== 0) {
        [arr[0], arr[1]] = [arr[1], arr[0]];
      } else {
        [arr[arr.length - 1], arr[arr.length - 2]] = [
          arr[arr.length - 2],
          arr[arr.length - 1],
        ];
      }
    }
    return arr;
  }

  createGameField() {
    const cells = this.shuffleGameField(this.fieldSize);
    cells.forEach((item, i) => {
      const left = i % Math.sqrt(this.fieldSize);
      const top = (i - left) / Math.sqrt(this.fieldSize);
      const cellSize = 400 / Math.sqrt(this.fieldSize);
      if (item !== 0) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerText = item;
        cell.style.width = `${400 / Math.sqrt(this.fieldSize)}px`;
        cell.style.height = `${400 / Math.sqrt(this.fieldSize)}px`;
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;

        if (this.text === 'disabled') {
          cell.style.fontSize = '0rem';
        } else {
          cell.style.color = `${this.text}`;
          cell.style.fontSize = '';
        }
        this.field.append(cell);
      } else {
        this.left = `${left * cellSize}px`;
        this.top = `${top * cellSize}px`;
      }
    });
    this.bindTriggers();
    if (this.image === 'on') this.setImage();
  }

  clearField() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => cell.remove());
  }

  getImageUrl() {
    const randomImage = Math.floor(Math.random() * (150 - 1) + 1);
    this.field.setAttribute(
      'data-url',
      `url(assets/images/${randomImage}.jpg)`,
    );
  }

  setImage() {
    const cells = document.querySelectorAll('.cell');
    const urlImg = this.field.getAttribute('data-url');

    cells.forEach((_, i) => {
      const background = `${urlImg} ${
        ((+cells[i].innerText - 1) % Math.sqrt(this.fieldSize)) *
        (100 / (Math.sqrt(this.fieldSize) - 1))
      }% ${
        Math.trunc((+cells[i].innerText - 1) / Math.sqrt(this.fieldSize)) *
        (100 / (Math.sqrt(this.fieldSize) - 1))
      }%`;
      if (this.field.getAttribute('data-image') === 'on') {
        cells[i].style.background = background;
        cells[i].style.backgroundSize = '400px';
      } else {
        cells[i].style.background = '';
      }
    });
  }

  bindTriggers() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
      cell.addEventListener('click', () => {
        const verticalDiff = Math.abs(
          this.top.slice(0, -2) - cell.style.top.slice(0, -2),
        );
        const horizontDiff = Math.abs(
          this.left.slice(0, -2) - cell.style.left.slice(0, -2),
        );
        const cellSize = 400 / Math.sqrt(this.fieldSize);
        if (
          Math.trunc(verticalDiff) + Math.trunc(horizontDiff) ===
          Math.trunc(cellSize)
        ) {
          if (this.field.getAttribute('data-sound') === 'on') {
            this.audio.play();
          }
          this.moveCounter += 1;
          this.counter.innerHTML = `Moves: ${this.moveCounter}`;
          if (this.timerOff) {
            this.setTimer();
            this.timerOff = false;
          }

          [this.left, cells[i].style.left] = [cells[i].style.left, this.left];
          [this.top, cells[i].style.top] = [cells[i].style.top, this.top];
          this.checkStatus();
        }
      });
    });
  }

  checkStatus() {
    const cells = document.querySelectorAll('.cell');
    const cellSize = 400 / Math.sqrt(this.fieldSize);
    let count = 0;
    cells.forEach((cell) => {
      if (
        `${Math.trunc(cell.style.left.slice(0, -2))}px` ===
          `${
            ((+cell.innerText - 1) % Math.sqrt(this.fieldSize)) *
            Math.trunc(cellSize)
          }px` &&
        `${Math.trunc(cell.style.top.slice(0, -2))}px` ===
          `${
            Math.trunc((+cell.innerText - 1) / Math.sqrt(this.fieldSize)) *
            Math.trunc(cellSize)
          }px`
      ) {
        count += 1;
      }
    });

    if (count === cells.length) {
      this.endOfGame.style.display = 'flex';
      this.buttonSettings.setAttribute('disabled', 'disabled');
      this.setRecord(
        this.moveCounter,
        this.timer.innerText.slice(6),
        this.fieldSize,
      );
      clearInterval(this.timerId);
    }
  }

  setTimer() {
    let time = 0;
    this.timerId = setInterval(() => {
      if (!this.field.getAttribute('data-pause')) {
        time += 1;
        this.timer.innerHTML = `Time: 
        ${
          Math.trunc(time / 60) < 10
            ? `0${Math.trunc(time / 60)}`
            : Math.trunc(time / 60)
        }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;
      }
    }, 1000);
  }

  setRecord(moves, time, size) {
    let data;
    if (localStorage.getItem(`records${size}`)) {
      data = JSON.parse(localStorage.getItem(`records${size}`));
    } else {
      data = [];
    }

    const now = new Date().toString();
    const date = `${now.slice(8, 10)} ${now.slice(4, 7)} ${now.slice(11, 15)}`;

    const currentResult = { moves, time, date };
    data.push(currentResult);
    data.sort((a, b) => (a.moves > b.moves ? 1 : -1));

    if (data.length > 10) {
      localStorage.setItem(`records${size}`, JSON.stringify(data.slice(0, 10)));
    } else {
      localStorage.setItem(`records${size}`, JSON.stringify(data));
    }
  }

  setInitialState() {
    clearInterval(this.timerId);
    this.endOfGame.style.display = 'none';
    this.timer.innerText = 'Time: 00:00';
    this.counter.innerText = 'Moves: 0';
    this.moveCounter = 0;
    this.timerOff = true;

    this.fieldSize = +this.field.getAttribute('data-size');
    this.text = this.field.getAttribute('data-text');
    this.image = this.field.getAttribute('data-image');
    this.buttonSettings.removeAttribute('disabled');

    this.getImageUrl();
    this.clearField();
  }

  init() {
    this.getImageUrl();
    this.createGameField();

    this.buttonPlay.addEventListener('click', () => {
      this.setInitialState();
      this.createGameField();
    });
  }
}
