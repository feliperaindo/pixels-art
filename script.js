function checkColorWhite(color) {
  if (color === 'rgb(255, 255, 255)'
        || color === '#ffffff'
        || color === 'white') {
    return false;
  }
  return true;
}

function checkRepetitionColor(color) {
  const getElement = document.querySelectorAll('.color');

  for (let index = 0; index < getElement.length; index += 1) {
    if (color === getElement[index].style.backgroundColor) {
      return false;
    }
  }
  return true;
}

function saveColor() {
  const saved = document.querySelectorAll('.color');
  const savedColor = {
    colorPalette: [],
  };

  for (let index = 0; index < saved.length; index += 1) {
    savedColor.colorPalette.push(saved[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(savedColor));
}

function colorGenerator() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  checkColorWhite(randomColor);
  checkRepetitionColor(randomColor);

  if (checkColorWhite === false || checkRepetitionColor === false) {
    colorGenerator();
  } else {
    return randomColor;
  }
}

function randomPaletteColor() {
  const getElement = document.querySelectorAll('.color');
  let newColor = null;

  for (let index = 0; index <= 3; index += 1) {
    if (index === 0) {
      getElement[index].style.backgroundColor = 'rgb(0, 0, 0)';
    } else {
      newColor = colorGenerator();
      getElement[index].style.backgroundColor = newColor;
    }
  }
  saveColor();
}

function loadLocalStorage() {
  const local = localStorage.getItem('colorPalette');
  const element = document.querySelectorAll('.color');

  if (local === null) {
    randomPaletteColor();
  } else {
    const load = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 0; index < load.colorPalette.length; index += 1) {
      element[index].style.backgroundColor = load.colorPalette[index];
    }
  }
}

function createPixels(id) {
  const element = document.getElementById(id);

  for (let index = 0; index < 5; index += 1) {
    const elementCreator = document.createElement('div');
    elementCreator.className = 'pixel';
    element.appendChild(elementCreator);
  }
}

function createHightPixelBoard() {
  const element = document.querySelector('#pixel-board');

  for (let i = 0; i < 5; i += 1) {
    const elementCreator = document.createElement('div');
    elementCreator.id = i;
    element.appendChild(elementCreator);
    createPixels(i.toString());
  }
}

function selectPaintColor(click) {
  const colorSelected = click.target;
  const allColors = document.querySelectorAll('.color');

  for (let index = 0; index < allColors.length; index += 1) {
    if (allColors[index].classList.contains('selected')) {
      allColors[index].classList.remove('selected');
    }
  }
  colorSelected.classList.add('selected');
}

function clearBoard() {
  const selectAll = document.querySelectorAll('.pixel');

  for (let index = 0; index < selectAll.length; index += 1) {
    selectAll[index].style.backgroundColor = 'white';
  }
}

function applayCollor(click) {
  const pixelClicked = click.target;
  const colorSelected = document.querySelector('.selected');

  pixelClicked.style.backgroundColor = colorSelected.style.backgroundColor;
}

// Seleção das cores.
const colorOne = document.querySelectorAll('.color')[0];
const colorTwo = document.querySelectorAll('.color')[1];
const colorThree = document.querySelectorAll('.color')[2];
const colorFour = document.querySelectorAll('.color')[3];
colorOne.addEventListener('click', selectPaintColor);
colorTwo.addEventListener('click', selectPaintColor);
colorThree.addEventListener('click', selectPaintColor);
colorFour.addEventListener('click', selectPaintColor);

// Criação do quadrado de pixels.
createHightPixelBoard();

// Pintura de cada pixel.
const pixel = document.querySelectorAll('.pixel');
pixel.forEach((pix) => {
  pix.addEventListener('click', applayCollor);
});

// Botão cores Aleatórias.
const getButton = document.getElementById('button-random-color');
getButton.addEventListener('click', randomPaletteColor);

// Botão Limpar.
const getButtonClear = document.getElementById('clear-board');
getButtonClear.addEventListener('click', clearBoard);

// Carregamento do Local Storage.
window.onload = loadLocalStorage;
