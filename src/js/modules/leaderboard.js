export default class Leaderboard {
  constructor() {
    this.button = document.querySelector('.popup-records__open');
    this.container = document.querySelector('.popup-records');
    this.settings = document.querySelector('.settings');
    this.buttonSettings = document.querySelector('.settings-button');
    this.fieldSize = document.getElementById('field-size');
  }

  buildTable() {
    this.container.innerHTML = '';
    const data = JSON.parse(localStorage.getItem(`records${this.fieldSize.value}`));
    if (data) {
      let rows = '';
      data.forEach((item) => {
        rows += `
        <tbody class="records__tbody">
          <tr class="records__row">
            <th class="records__cell">${item.moves}</th>
            <th class="records__cell">${item.time}</th>
            <th class="records__cell">${item.date}</th>
          </tr>
        </tbody>`;
      });
      const table = `
        <table class="records">
        <caption class="records__caption">Best scores ${this.fieldSize.value === '9' ? '3x3' : '4x4'}</caption>
        <thead class="records__thead">
          <tr class="records__row">
            <th class="records__cell">Moves</th>
            <th class="records__cell">Time</th>
            <th class="records__cell">Date</th>
          </tr>
        </thead>
        ${rows}
      </table>`;
      this.container.innerHTML += table;
    } else {
      this.container.innerHTML += '<div class="records__notice">No data yet (:</div>';
    }
    this.container.innerHTML += '<a href="#" class="popup-records__close">Back</a>';
    this.container.style.display = 'flex';
    document.querySelector('.popup-records__close').addEventListener('click', (event) => {
      event.preventDefault();
      this.container.style.display = 'none';
      this.settings.style.display = 'flex';
      this.buttonSettings.removeAttribute('disabled');
    });
  }

  init() {
    this.button.addEventListener('click', () => {
      this.buildTable();
      this.settings.style.display = 'none';
      this.buttonSettings.setAttribute('disabled', 'disabled');
    });
  }
}
