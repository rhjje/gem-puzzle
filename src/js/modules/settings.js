export default class Setting {
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
        cells[i].style.fontSize = '3.5rem';
      }
    });
  }

  init() {
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
    });
  }
}
