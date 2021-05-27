const setImage = (value) => {
  const field = document.querySelector('.field');
  const cells = field.querySelectorAll('.cell');
  const urlImg = field.getAttribute('data-url');
  const fieldSize = cells.length + 1;

  cells.forEach((_, i) => {
    const background = `${urlImg} ${((+cells[i].innerText - 1) % (Math.sqrt(fieldSize)))
      * (100 / (Math.sqrt(fieldSize) - 1))}% ${Math.trunc((+cells[i].innerText - 1) / (Math.sqrt(fieldSize)))
      * (100 / (Math.sqrt(fieldSize) - 1))}%`;
    if (value === 'on') {
      cells[i].style.background = background;
      cells[i].style.backgroundSize = '400px';
    } else {
      cells[i].style.background = '';
    }
  });
};

export default setImage;
