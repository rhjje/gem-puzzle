const resumeGame = () => {
  const settings = document.querySelector('.settings');
  const button = document.querySelector('.settings-button');
  button.addEventListener('click', (event) => {
    if (event.target.outerText === 'Settings') {
      button.innerHTML = 'Resume game';
      settings.style.display = 'block';
    } else {
      button.innerHTML = 'Settings';
      settings.style.display = 'none';
    }
  });
};

export default resumeGame;
