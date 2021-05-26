/* eslint-disable class-methods-use-this */
export default class Settings {
  constructor() {
    this.button = document.querySelector('.apply-settings');
    this.text = document.getElementById('text');
    this.sound = document.getElementById('sound');
    this.image = document.getElementById('image');
    this.stateText = false;
    this.stateSound = false;
    this.stateImage = false;
  }

  changeText() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((_, i) => {
      if (this.text.value === 'disabled') {
        cells[i].style.fontSize = '0rem';
      } else {
        cells[i].style.color = `${this.text.value}`;
        cells[i].style.fontSize = '';
      }
    });
  }

  setImage() {
    const cells = document.querySelectorAll('.cell');
    const randomImage = Math.floor(Math.random() * (150 - 1) + 1);
    const urlImg = `url(assets/images/${randomImage}.jpg)`;
    const fieldSize = cells.length + 1;

    cells.forEach((_, i) => {
      const background = `${urlImg} ${((+cells[i].innerText - 1) % (Math.sqrt(fieldSize)))
        * (100 / (Math.sqrt(fieldSize) - 1))}% ${Math.trunc((+cells[i].innerText - 1) / (Math.sqrt(fieldSize)))
        * (100 / (Math.sqrt(fieldSize) - 1))}%`;
      if (this.image.value === 'on') {
        cells[i].style.background = background;
        cells[i].style.backgroundSize = '400px';
      } else {
        cells[i].style.background = '';
      }
    });
  }

  setLocalStorage() {
    const currentSettings = { text: `${this.text.value}`, sound: `${this.sound.value}`, image: `${this.image.value}` };
    localStorage.setItem('settings', JSON.stringify(currentSettings));
  }

  init() {
    // this.setLocalStorage();
    this.text.addEventListener('change', () => {
      this.stateText = true;
    });
    this.sound.addEventListener('change', () => {
      this.stateSound = true;
    });
    this.image.addEventListener('change', () => {
      this.stateImage = true;
    });
    this.button.addEventListener('click', () => {
      if (this.stateText) this.changeText();
      if (this.stateImage) this.setImage();
    });
  }
}
