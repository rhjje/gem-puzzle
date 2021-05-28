import GemPuzzle from './gem-puzzle';

export default class Settings extends GemPuzzle {
  constructor() {
    super();
    this.settings = document.querySelector('.settings');
    this.button = document.querySelector('.settings-button');
    this.field = document.querySelector('.field');
    this.text = document.getElementById('text');
    this.sound = document.getElementById('sound');
    this.image = document.getElementById('image');
    this.size = document.getElementById('field-size');
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

  init() {
    this.button.addEventListener('click', (event) => {
      if (event.target.outerText === 'Settings') {
        this.field.setAttribute('data-pause', true);
        this.button.innerHTML = 'Resume game';
        this.settings.style.display = 'flex';
      } else {
        this.field.removeAttribute('data-pause');
        this.button.innerHTML = 'Settings';
        this.settings.style.display = 'none';
      }
    });

    this.text.addEventListener('change', () => {
      this.field.setAttribute('data-text', `${this.text.value}`);
      this.changeText();
    });

    this.sound.addEventListener('change', () => {
      this.field.setAttribute('data-sound', `${this.sound.value}`);
    });

    this.image.addEventListener('change', () => {
      this.field.setAttribute('data-image', `${this.image.value}`);
      this.setImage();
    });

    this.size.addEventListener('change', () => {
      this.field.setAttribute('data-size', `${this.size.value}`);
    });
  }
}
