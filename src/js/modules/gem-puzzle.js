/* eslint-disable class-methods-use-this */

export default class GemPuzzle {
  constructor() {
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

  shuffleGameField(size) {
    const arr = [...Array(size).keys()].sort(() => Math.random() - 0.5);
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
        this.field.append(cell);
      } else {
        this.left = `${left * cellSize}px`;
        this.top = `${top * cellSize}px`;
      }
    });
    this.bindTriggers();
  }

  clearField() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.remove();
    });
  }

  bindTriggers() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
      cell.addEventListener('click', () => {
        const verticalDiff = Math.abs(this.top.slice(0, -2) - cell.style.top.slice(0, -2));
        const horizontDiff = Math.abs(this.left.slice(0, -2) - cell.style.left.slice(0, -2));
        const cellSize = 400 / Math.sqrt(this.fieldSize);
        if (Math.trunc(verticalDiff) + Math.trunc(horizontDiff) === Math.trunc(cellSize)) {
          if (!this.soundOff) this.sound.play();
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
      if (`${Math.trunc(cell.style.left.slice(0, -2))}px` === `${((+cell.innerText - 1) % Math.sqrt(this.fieldSize)) * Math.trunc(cellSize)}px` && `${Math.trunc(cell.style.top.slice(0, -2))}px` === `${(Math.trunc((+cell.innerText - 1) / Math.sqrt(this.fieldSize))) * Math.trunc(cellSize)}px`) {
        count += 1;
      }
    });

    if (count === cells.length) {
      this.endOfGame.style.display = 'flex';
      clearInterval(this.timerId);
    }
  }

  setTimer() {
    let time = 0;
    this.timerId = setInterval(() => {
      time += 1;
      this.timer.innerHTML = `Time: 
      ${Math.trunc(time / 60) < 10 ? `0${Math.trunc(time / 60)}`
    : Math.trunc(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`;
    }, 1000);
  }

  init() {
    this.createGameField();
    this.fieldSizeSettings.addEventListener('change', () => {
      this.fieldSize = +this.fieldSizeSettings.value;
    });

    this.buttonPlay.addEventListener('click', () => {
      clearInterval(this.timerId);
      this.endOfGame.style.display = 'none';
      this.timer.innerText = 'Time: 00:00';
      this.counter.innerText = 'Moves: 0';
      this.moveCounter = 0;
      this.timerOff = true;
      this.clearField();
      this.createGameField();
    });

    this.soundSettings.addEventListener('change', () => {
      if (this.soundSettings.value === 'off') {
        this.soundOff = true;
      } else {
        this.soundOff = false;
      }
    });
  }
}
