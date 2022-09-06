function checkColorWhite(element) {
  if (element.style.backgroundColor === 'rgb(255, 255, 255)'
        || element.style.backgroundColor === '#ffffff'
        || element.style.backgroundColor === 'white') {
    return false;
  }
  return true;
}

function checkRepetitionColor(element) {
  const getElement = document.querySelectorAll('.color');

  for (let index = 0; index < getElement.length; index += 1) {
    if (element.style.backgroundColor === getElement[index].style.backgroundColor) {
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

  for (let index = 1; index < saved.length; index += 1) {
    savedColor.colorPalette.push(saved[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(savedColor));
}

function randomPaletteColor() {
  const getElement = document.querySelectorAll('.color');

  for (let index = 1; index < 4; index += 1) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    getElement[index].style.backgroundColor = randomColor;
    checkColorWhite(getElement[index]);
    checkRepetitionColor(getElement[index]);
    if (checkColorWhite === false || checkRepetitionColor === false) {
      index = 0;
    }
  }
  saveColor();
}

function loadLocalStorage() {
  const local = localStorage.getItem('colorPalette');

  if (local === null) {
    randomPaletteColor();
  }
  const load = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < load.colorPalette.length; index += 1) {
    document.querySelectorAll('.color')[index + 1].style.backgroundColor = load.colorPalette[index];
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
createHightPixelBoard();

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

const colorOne = document.querySelectorAll('.color')[0];
const colorTwo = document.querySelectorAll('.color')[1];
const colorThree = document.querySelectorAll('.color')[2];
const colorFour = document.querySelectorAll('.color')[3];
colorOne.addEventListener('click', selectPaintColor);
colorTwo.addEventListener('click', selectPaintColor);
colorThree.addEventListener('click', selectPaintColor);
colorFour.addEventListener('click', selectPaintColor);

const getButton = document.getElementById('button-random-color');
getButton.addEventListener('click', randomPaletteColor);
window.onload = loadLocalStorage;
