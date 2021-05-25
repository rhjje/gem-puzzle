/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
const modalWindow = {
  elements: {
    buttonEnter: null,
    modalWindow: null,
    buttonExit: null,
    contacts: null,
  },

  init() {
    // create enter modal window button
    this.elements.buttonEnter = document.createElement('div');
    this.elements.buttonEnter.className = 'info';
    const img = document.createElement('img');
    img.src = 'assets/icons/info.svg';
    img.addEventListener('click', () => {
      this.elements.modalWindow.classList.remove('disabled');
    });
    this.elements.buttonEnter.append(img);

    // create modal window
    this.elements.modalWindow = document.createElement('div');
    this.elements.modalWindow.classList.add('info-modal', 'disabled');

    // create description
    const paragraph1 = document.createElement('p');
    paragraph1.innerHTML = `Для включения-отключения изображения поставьте 
      галочку<br> в поле <b>image</b>.`;

    const paragraph2 = document.createElement('p');
    paragraph2.innerHTML = `Чтобы изменить цвет текста или совсем убрать текст, 
      выберите соответствующее значение в поле рядом с кнопкой <b>text</b> и 
      нажмите кнопку <b>text</b>, чтобы изменения вступили в силу.`;

    const paragraph3 = document.createElement('p');
    paragraph3.innerHTML = `Чтобы изменить размер игрового поля, выберите 
      соответствующее значение в поле рядом с кнопкой <b>start</b> и 
      нажмите кнопку <b>start</b>, чтобы изменения вступили в силу.`;

    const paragraph4 = document.createElement('p');
    paragraph4.innerHTML = `Чтобы посмотреть таблицу лидеров нажмите кнопку 
      <b>show scores</b>. Для того, чтобы закрыть таблицу лидеров нажмите на кнопку 
      <b>hide scores</b>, которая появилась на месте <b>show scores</b>.`;

    const paragraph5 = document.createElement('p');
    paragraph5.innerHTML = 'Кнопки сохранения игры нет.';

    const paragraph6 = document.createElement('p');
    paragraph6.innerHTML = `<b>Autocomplete</b> работает только на свежем сгенерированном поле 4х4, 
      если сделать один ход или сменить размер поля, то кнопка <b>autocomplete</b> перестает работать. 
      Предупреждаю для того, чтобы вы не тратили время зря и не пытались понять, что не так. 
      Мне не хватило мозгов и времени, чтобы реализовать <b>autocomplete</b> как надо:) Удачи всем нам!`;

    // create exit modal window button
    this.elements.buttonExit = document.createElement('div');
    this.elements.buttonExit.className = 'close';
    const imgClose = document.createElement('img');
    imgClose.src = 'assets/icons/close-button.svg';
    imgClose.addEventListener('click', () => {
      this.elements.modalWindow.classList.add('disabled');
    });
    this.elements.buttonExit.append(imgClose);

    // creating a contact block
    this.elements.contacts = document.createElement('div');
    this.elements.contacts.className = 'contacts';
    this.elements.contacts.innerText = 'По всем вопросам обращаться: ';

    const contactsData = document.createElement('div');
    contactsData.className = 'contacts-data';

    const discord = document.createElement('div');
    discord.className = 'discord';
    const imgDiscord = document.createElement('img');
    imgDiscord.src = 'assets/icons/discord.svg';
    const spanDiscord = document.createElement('span');
    spanDiscord.innerText = 'rhjje(@rhjje)';
    discord.appendChild(imgDiscord);
    discord.appendChild(spanDiscord);

    const telegram = document.createElement('div');
    telegram.className = 'telegram';
    const imgTelegram = document.createElement('img');
    imgTelegram.src = 'assets/icons/telegram.svg';
    const spanTelegram = document.createElement('span');
    spanTelegram.innerText = '@rhjje';
    telegram.appendChild(imgTelegram);
    telegram.appendChild(spanTelegram);

    const mail = document.createElement('div');
    mail.className = 'mail';
    const imgMail = document.createElement('img');
    imgMail.src = 'assets/icons/gmail.svg';
    const spanMail = document.createElement('span');
    spanMail.innerText = 'numelen@gmail.com';
    mail.appendChild(imgMail);
    mail.appendChild(spanMail);

    contactsData.appendChild(discord);
    contactsData.appendChild(telegram);
    contactsData.appendChild(mail);

    this.elements.contacts.appendChild(contactsData);

    // add data to madal window
    this.elements.modalWindow.appendChild(this.elements.buttonExit);
    this.elements.modalWindow.appendChild(paragraph1);
    this.elements.modalWindow.appendChild(paragraph2);
    this.elements.modalWindow.appendChild(paragraph3);
    this.elements.modalWindow.appendChild(paragraph4);
    this.elements.modalWindow.appendChild(paragraph5);
    this.elements.modalWindow.appendChild(paragraph6);
    this.elements.modalWindow.appendChild(this.elements.contacts);

    document.querySelector('body').appendChild(this.elements.modalWindow);
  },
};

const gemPuzzle = {
  elements: {
    counter: null,
    timer: null,
    countPanel: null,
    field: null,
    controlPanel: null,
    select: null,
    selectButton: null,
    selectText: null,
    selectTextButton: null,
    sound: null,
    audio: null,
    switchImage: null,
    leaderBoard: null,
    resultsPanel: null,
    leaderBoardButton: null,
    saveGame: null,
    modalWin: null,
  },

  moves: [],
  image: null,

  empty: {
    left: 0,
    top: 0,
  },

  counters: {
    moves: 0,
    time: 0,
  },

  toggles: {
    timer: false,
    timerId: null,
    sound: true,
    image: false,
  },

  fieldSize: 16,
  text: 'white',
  fontSize: '3.5rem',

  init() {
    this.elements.counter = document.createElement('div');
    this.elements.counter.className = 'counter';
    this.elements.counter.innerText = 'Moves: 0';

    this.elements.timer = document.createElement('div');
    this.elements.timer.className = 'timer';
    this.elements.timer.innerText = 'Time: 00:00';

    this.elements.countPanel = document.createElement('div');
    this.elements.countPanel.className = 'count-panel';
    this.elements.countPanel.appendChild(this.elements.counter);
    this.elements.countPanel.appendChild(this.elements.timer);

    this.elements.field = document.createElement('div');
    this.elements.field.className = 'field';

    this.elements.controlPanel = document.createElement('div');
    this.elements.controlPanel.className = 'control-panel';

    this.elements.select = document.createElement('select');
    this.elements.select.className = 'select';

    for (let i = 3; i < 9; i += 1) {
      const option = document.createElement('option');
      option.setAttribute('value', `${i ** 2}`);
      option.innerText = `${i}x${i}`;
      if (i === 4) {
        option.setAttribute('selected', true);
      }
      this.elements.select.appendChild(option);
    }

    this.elements.selectButton = document.createElement('div');
    this.elements.selectButton.className = 'button-submit';
    this.elements.selectButton.innerText = 'start';

    this.elements.selectText = document.createElement('select');
    this.elements.selectText.className = 'select-text';

    for (let i = 0; i < 3; i += 1) {
      const option = document.createElement('option');
      if (i === 0) {
        option.setAttribute('value', 'disable');
        option.innerText = 'disable';
      } else if (i === 1) {
        option.setAttribute('value', 'white');
        option.setAttribute('selected', true);
        option.innerText = 'white';
      } else {
        option.setAttribute('value', 'black');
        option.innerText = 'black';
      }

      this.elements.selectText.appendChild(option);
    }

    this.elements.selectTextButton = document.createElement('div');
    this.elements.selectTextButton.className = 'button-submit-text';
    this.elements.selectTextButton.innerText = 'text';

    this.elements.select.addEventListener('change', () => {
      this.fieldSize = +this.elements.select.value;
    });

    this.elements.selectButton.addEventListener('click', () => {
      this.moves = [];
      this.clearGameField();
      this.shuffleGameField(this.fieldSize);
      this.drawImages();
      clearTimeout(this.toggles.timerId);
      this.toggles.timer = false;
      this.counters.time = 0;
      this.elements.timer.innerText = 'Time: 00:00';
      this.elements.counter.innerText = 'Moves: 0';
      this.counters.moves = 0;
      this.dragAndDrop();
      this.elements.modalWin.classList.add('hide');
      this.elements.saveGame.removeAttribute('disabled');
    });

    this.elements.selectText.addEventListener('change', () => {
      this.text = this.elements.selectText.value;
    });

    this.elements.selectTextButton.addEventListener('click', () => {
      const cells = document.querySelectorAll('.cell');

      cells.forEach((cell) => {
        if (this.text === 'white' || this.text === 'black') {
          cell.style.color = `${this.text}`;
          cell.style.fontSize = '3.5rem';
          this.fontSize = '3.5rem';
        } else {
          cell.style.fontSize = '0rem';
          this.fontSize = '0rem';
        }
      });
    });

    this.elements.sound = document.createElement('div');
    this.elements.sound.className = 'sound';
    const img = document.createElement('img');
    img.src = 'assets/icons/volume.svg';
    this.elements.sound.appendChild(img);

    img.addEventListener('click', () => {
      if (img.classList.contains('off')) {
        img.src = 'assets/icons/volume.svg';
        img.classList.remove('off');
        this.toggles.sound = true;
      } else {
        img.src = 'assets/icons/volume-off.svg';
        img.classList.add('off');
        this.toggles.sound = false;
      }
    });

    this.elements.audio = document.createElement('audio');
    const source = document.createElement('source');
    source.src = 'assets/sounds/move.wav';
    this.elements.audio.appendChild(source);

    this.elements.switchImage = document.createElement('label');
    this.elements.switchImage.className = 'switch';
    const switchText = document.createElement('div');
    switchText.className = 'switch-text';
    switchText.innerText = 'image';
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    this.elements.switchImage.appendChild(switchText);
    this.elements.switchImage.appendChild(input);

    this.elements.switchImage.addEventListener('change', (event) => {
      if (event.target.checked) {
        this.toggles.image = true;
        this.drawImages();
      } else {
        this.toggles.image = false;
        this.drawImages();
      }
    });

    // add elements to control panel
    this.elements.controlPanel.appendChild(this.elements.sound);
    this.elements.controlPanel.appendChild(this.elements.switchImage);
    this.elements.controlPanel.appendChild(this.elements.selectText);
    this.elements.controlPanel.appendChild(this.elements.selectTextButton);
    this.elements.controlPanel.appendChild(this.elements.select);
    this.elements.controlPanel.appendChild(this.elements.selectButton);

    // create results panel
    this.elements.resultsPanel = document.createElement('div');
    this.elements.resultsPanel.className = 'results-panel';

    this.elements.saveGame = document.createElement('button');
    this.elements.saveGame.className = 'autocomplete';
    this.elements.saveGame.innerText = 'autocomplete';
    this.elements.saveGame.addEventListener('click', () => {
      if (this.fieldSize === 16) {
        this.autocomplete();
      }
      this.elements.saveGame.setAttribute('disabled', true);
    });

    this.elements.leaderBoardButton = document.createElement('div');
    this.elements.leaderBoardButton.className = 'leaderboard-button';
    this.elements.leaderBoardButton.innerText = 'show scores';
    this.elements.leaderBoardButton.addEventListener('click', () => {
      this.elements.leaderBoard.classList.toggle('disabled');

      if (this.elements.leaderBoardButton.innerText === 'show scores') {
        this.elements.leaderBoardButton.innerText = 'hide scores';
      } else {
        this.elements.leaderBoardButton.innerText = 'show scores';
      }
    });

    this.elements.modalWin = document.createElement('div');
    this.elements.modalWin.classList.add('modal-win', 'hide');
    this.elements.modalWin.innerHTML = '<span></span>';
    this.elements.field.appendChild(this.elements.modalWin);

    this.elements.resultsPanel.appendChild(modalWindow.elements.buttonEnter);
    this.elements.resultsPanel.appendChild(this.elements.saveGame);
    this.elements.resultsPanel.appendChild(this.elements.leaderBoardButton);

    this.elements.field.appendChild(modalWindow.elements.modalWindow);

    document.body.appendChild(this.elements.countPanel);
    document.body.appendChild(this.elements.field);
    document.body.appendChild(this.elements.controlPanel);
    document.body.appendChild(this.elements.resultsPanel);

    this.shuffleGameField(this.fieldSize);
    this.setLeaderBoard();
  },

  shuffleGameField(size) {
    const arr = [...Array(size).keys()];
    const first = arr.shift();
    arr.push(first);
    const previousMove = [];

    if (this.fieldSize === 16) {
      for (let i = 0; i < 50; i += 1) {
        const random = Math.floor(Math.random() * (5 - 1) + 1);
        const index = arr.indexOf(0);
        const currentMove = [];

        if (index === 0) {
          random < 3
            ? [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
            : [arr[index], arr[index + Math.sqrt(this.fieldSize)]] = [arr[index
              + Math.sqrt(this.fieldSize)], arr[index]];
        } else if (index === arr.length - 1) {
          random < 3
            ? [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]]
            : [arr[index], arr[index - Math.sqrt(this.fieldSize)]] = [arr[index
               - Math.sqrt(this.fieldSize)], arr[index]];
        } else if (index % Math.sqrt(this.fieldSize) === Math.sqrt(this.fieldSize) - 1) {
          [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
        } else if ((index / Math.sqrt(this.fieldSize)) % 1 === 0) {
          [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
        } else {
          // eslint-disable-next-line no-lonely-if
          if (index - 4 >= 0 && index + 4 <= arr.length - 1) {
            switch (random) {
              case 1:
                [arr[index], arr[index - 4]] = [arr[index - 4], arr[index]];
                break;
              case 2:
                [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
                break;
              case 3:
                [arr[index], arr[index + 4]] = [arr[index + 4], arr[index]];
                break;
              case 4:
                [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
                break;
              default:
                break;
            }
          } else {
            random < 3
              ? [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
              : [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
          }
        }

        const indexCurrent = arr.indexOf(0);
        currentMove[0] = index;
        currentMove[1] = indexCurrent;
        if (currentMove[0] === previousMove[0] && currentMove[1] === previousMove[1]) {
          [arr[indexCurrent], arr[index]] = [arr[index], arr[indexCurrent]];
          previousMove[0] = indexCurrent;
          previousMove[1] = index;
          i -= 1;
        } else {
          this.moves.push(currentMove);
          previousMove[0] = indexCurrent;
          previousMove[1] = index;
        }
      }
    } else {
      arr.sort(() => Math.random() - 0.5);
    }

    this.createGameField(arr);
  },

  createGameField(arr) {
    for (let i = 0; i < this.fieldSize; i += 1) {
      const left = i % Math.sqrt(this.fieldSize);
      const top = (i - left) / Math.sqrt(this.fieldSize);
      const cellSize = 400 / Math.sqrt(this.fieldSize);
      if (arr[i] !== 0) {
        const cell = document.createElement('div');
        cell.setAttribute('draggable', true);
        cell.className = 'cell';
        cell.innerText = arr[i];

        cell.style.width = `${400 / Math.sqrt(this.fieldSize)}px`;
        cell.style.height = `${400 / Math.sqrt(this.fieldSize)}px`;

        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;

        this.elements.field.append(cell);
      } else {
        this.empty.left = `${left * cellSize}px`;
        this.empty.top = `${top * cellSize}px`;
      }
    }
    this.setRandomImag();
    this.drawImages();
    this.getCurrentCells();
  },

  setRandomImag() {
    const randomImage = Math.floor(Math.random() * (150 - 1) + 1);
    this.image = `url(assets/images/${randomImage}.jpg)`;
  },

  drawImages() {
    const cells = document.querySelectorAll('.cell');
    const arrDrawImages = [];

    for (let i = 1; i < this.fieldSize; i += 1) {
      arrDrawImages.push(`${this.image} ${((i - 1) % (Math.sqrt(this.fieldSize))) * (100 / (Math.sqrt(this.fieldSize) - 1))}% ${Math.trunc((i - 1) / (Math.sqrt(this.fieldSize))) * (100 / (Math.sqrt(this.fieldSize) - 1))}%`);
    }

    if (this.toggles.image) {
      cells.forEach((cell) => {
        cell.style.background = arrDrawImages[+cell.innerText - 1];
        cell.style.backgroundSize = '400px';
        cell.style.color = `${this.text}`;
        cell.style.fontSize = `${this.fontSize}`;
      });
    } else {
      cells.forEach((cell) => {
        cell.style.background = '';
        cell.style.backgroundSize = '400px';
        cell.style.color = `${this.text}`;
        cell.style.fontSize = `${this.fontSize}`;
      });
    }
  },

  getCurrentCells() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        const verticalDiff = Math.abs(this.empty.top.slice(0, -2) - cell.style.top.slice(0, -2));
        const horizontDiff = Math.abs(this.empty.left.slice(0, -2) - cell.style.left.slice(0, -2));
        const cellSize = 400 / Math.sqrt(this.fieldSize);

        if (Math.trunc(verticalDiff) + Math.trunc(horizontDiff) === Math.trunc(cellSize)) {
          this.elements.saveGame.setAttribute('disabled', true);
          if (this.toggles.sound) {
            this.elements.audio.play();
          }

          this.counters.moves += 1;
          this.elements.counter.innerHTML = `Moves: ${this.counters.moves}`;

          if (!this.toggles.timer) {
            countTime();
            this.toggles.timer = true;
          }

          [this.empty.left, cell.style.left] = [cell.style.left, this.empty.left];
          [this.empty.top, cell.style.top] = [cell.style.top, this.empty.top];

          const cellsCurrent = document.querySelectorAll('.cell');
          let count = 0;
          cellsCurrent.forEach((cellCurrent) => {
            if (`${Math.trunc(cellCurrent.style.left.slice(0, -2))}px` === `${((+cellCurrent.innerText - 1) % Math.sqrt(this.fieldSize)) * Math.trunc(cellSize)}px` && `${Math.trunc(cellCurrent.style.top.slice(0, -2))}px` === `${(Math.trunc((+cellCurrent.innerText - 1) / Math.sqrt(this.fieldSize))) * Math.trunc(cellSize)}px`) {
              count += 1;
            }
          });
          const sizeGameField = document.querySelectorAll('.cell');
          if (count === sizeGameField.length) {
            this.setRecord(this.elements.counter.innerText, this.elements.timer.innerText);
            clearTimeout(this.toggles.timerId);
            this.toggles.timer = false;
            this.elements.modalWin.innerHTML = `<span>Ура, вы решили головоломку за ${this.elements.timer.innerText.slice(6)} и ${this.counters.moves} ходов!</span>`;
            this.elements.modalWin.classList.remove('hide');
          }
        }
      });
    });
  },

  clearGameField() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      this.elements.field.removeChild(cell);
    });
  },

  setRecord(move, timer) {
    let arrFromLocStor;
    if (localStorage.getItem('records')) {
      arrFromLocStor = JSON.parse(localStorage.getItem('records'));
    }

    const today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const date = `${day} ${monthNames[month].slice(0, 3)} ${year}`;

    const currentResult = [+move.slice(7), timer.slice(6), date, `${Math.sqrt(this.elements.select.value)}x${Math.sqrt(this.elements.select.value)}`];

    let leaderBoard;
    arrFromLocStor ? leaderBoard = arrFromLocStor : leaderBoard = [];

    if (arrFromLocStor) {
      leaderBoard.push(currentResult);
      leaderBoard.sort((a, b) => a[0] - b[0]);
    } else {
      leaderBoard.push(currentResult);
    }

    if (leaderBoard.length > 10) {
      localStorage.setItem('records', JSON.stringify(leaderBoard.slice(0, 10)));
    } else {
      localStorage.setItem('records', JSON.stringify(leaderBoard));
    }

    this.setLeaderBoard();
  },

  setLeaderBoard() {
    const leaderBoard = JSON.parse(localStorage.getItem('records'));
    this.elements.leaderBoard = document.createElement('div');
    this.elements.leaderBoard.classList.add('leaderboard', 'disabled');

    const heading = document.createElement('div');
    heading.className = 'heading-leaderboard';
    heading.innerText = 'Best scores';

    this.elements.leaderBoard.appendChild(heading);

    const date = document.createElement('div');
    date.className = 'date';
    const dateHeading = document.createElement('div');
    dateHeading.innerText = 'Date';
    date.appendChild(dateHeading);

    const moves = document.createElement('div');
    moves.className = 'moves';
    const movesHeading = document.createElement('div');
    movesHeading.innerText = 'Moves';
    moves.appendChild(movesHeading);

    const size = document.createElement('div');
    size.className = 'size';
    const sizeHeading = document.createElement('div');
    sizeHeading.innerText = 'Size';
    size.appendChild(sizeHeading);

    const time = document.createElement('div');
    time.className = 'time';
    const timeHeading = document.createElement('div');
    timeHeading.innerText = 'Time';
    time.appendChild(timeHeading);

    if (leaderBoard) {
      leaderBoard.forEach((item) => {
        const dateResult = document.createElement('div');
        dateResult.innerText = `${item[2]}`;
        const movesResult = document.createElement('div');
        movesResult.innerText = `${item[0]}`;
        const sizeResult = document.createElement('div');
        sizeResult.innerText = `${item[3]}`;
        const timeResult = document.createElement('div');
        timeResult.innerText = `${item[1]}`;

        date.appendChild(dateResult);
        moves.appendChild(movesResult);
        size.appendChild(sizeResult);
        time.appendChild(timeResult);
      });
    }

    this.elements.leaderBoard.append(date);
    this.elements.leaderBoard.append(moves);
    this.elements.leaderBoard.append(size);
    this.elements.leaderBoard.append(time);

    this.elements.field.appendChild(this.elements.leaderBoard);
  },

  dragAndDrop() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      let leftCellStart;
      let topCellStart;
      cell.addEventListener('dragstart', () => {
        setTimeout(() => {
          cell.classList.add('hide');
        }, 0);

        const verticalDiff = Math.abs(this.empty.top.slice(0, -2) - cell.style.top.slice(0, -2));
        const horizontDiff = Math.abs(this.empty.left.slice(0, -2) - cell.style.left.slice(0, -2));
        const cellSize = 400 / Math.sqrt(this.fieldSize);
        if (Math.trunc(verticalDiff) + Math.trunc(horizontDiff) === Math.trunc(cellSize)) {
          leftCellStart = cell.style.left;
          topCellStart = cell.style.top;
        }
      });

      cell.addEventListener('dragend', () => {
        cell.classList.remove('hide');
      });

      this.elements.field.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      this.elements.field.addEventListener('drop', () => {
        const verticalDiff = Math.abs(this.empty.top.slice(0, -2) - cell.style.top.slice(0, -2));
        const horizontDiff = Math.abs(this.empty.left.slice(0, -2) - cell.style.left.slice(0, -2));
        const cellSize = 400 / Math.sqrt(this.fieldSize);

        if (leftCellStart === cell.style.left && topCellStart === cell.style.top
          && Math.trunc(verticalDiff) + Math.trunc(horizontDiff) === Math.trunc(cellSize)) {
          this.elements.saveGame.setAttribute('disabled', true);

          if (this.toggles.sound) {
            this.elements.audio.play();
          }

          this.counters.moves += 1;
          this.elements.counter.innerHTML = `Moves: ${this.counters.moves}`;

          if (!this.toggles.timer) {
            countTime();
            this.toggles.timer = true;
          }

          [this.empty.left, cell.style.left] = [cell.style.left, this.empty.left];
          [this.empty.top, cell.style.top] = [cell.style.top, this.empty.top];

          const cellsCurrent = document.querySelectorAll('.cell');
          let count = 0;
          cellsCurrent.forEach((cellCurrent) => {
            if (`${Math.trunc(cellCurrent.style.left.slice(0, -2))}px` === `${((+cellCurrent.innerText - 1) % Math.sqrt(this.fieldSize)) * Math.trunc(cellSize)}px` && `${Math.trunc(cellCurrent.style.top.slice(0, -2))}px` === `${(Math.trunc((+cellCurrent.innerText - 1) / Math.sqrt(this.fieldSize))) * Math.trunc(cellSize)}px`) {
              count += 1;
            }
          });
          const sizeGameField = document.querySelectorAll('.cell');
          if (count === sizeGameField.length) {
            this.setRecord(this.elements.counter.innerText, this.elements.timer.innerText);
            clearTimeout(this.toggles.timerId);
            this.toggles.timer = false;
            this.elements.modalWin.innerHTML = `<span>Ура, вы решили головоломку за ${this.elements.timer.innerText.slice(6)} и ${this.counters.moves} ходов!</span>`;
            this.elements.modalWin.classList.remove('hide');
          }
        }
      });
    });
  },

  autocomplete() {
    const moves = this.moves.reverse();
    const cells = document.querySelectorAll('.cell');
    let count = 0;
    const reverseMove = () => {
      const leftEmpty = `${((moves[count][0]) % Math.sqrt(this.fieldSize)) * (400 / Math.sqrt(this.fieldSize))}px`;
      const topEmpty = `${Math.trunc((moves[count][0]) / Math.sqrt(this.fieldSize)) * (400 / Math.sqrt(this.fieldSize))}px`;

      const left = `${((moves[count][1]) % Math.sqrt(this.fieldSize)) * (400 / Math.sqrt(this.fieldSize))}px`;
      const top = `${Math.trunc((moves[count][1]) / Math.sqrt(this.fieldSize)) * (400 / Math.sqrt(this.fieldSize))}px`;

      cells.forEach((cell) => {
        if (cell.style.left === leftEmpty && cell.style.top === topEmpty) {
          cell.style.left = left;
          cell.style.top = top;
        }
      });
      count += 1;

      if (count !== moves.length) {
        setTimeout(reverseMove, 500);
      }
    };

    reverseMove();
  },
};

const countTime = () => {
  gemPuzzle.counters.time += 1;
  gemPuzzle.elements.timer.innerText = `Time: ${Math.trunc(gemPuzzle.counters.time / 60) < 10 ? `0${Math.trunc(gemPuzzle.counters.time / 60)}` : Math.trunc(gemPuzzle.counters.time / 60)}:${gemPuzzle.counters.time % 60 < 10 ? `0${gemPuzzle.counters.time % 60}` : gemPuzzle.counters.time % 60}`;
  gemPuzzle.toggles.timerId = setTimeout(countTime, 1000);
};

modalWindow.init();
gemPuzzle.init();
gemPuzzle.dragAndDrop();
