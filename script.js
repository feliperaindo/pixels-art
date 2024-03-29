// Variáveis importantes para página.
const getElement = document.querySelectorAll('.color');

function randomNumber() {
  const random = Math.floor(Math.random() * 255);
  return random;
}
function checkColorWhite(numbeR, numberG, numberB) {
  if (numbeR === 255 && numberG === 255 && numberB === 255) {
    return false;
  }
  return true;
}
function checkColorBlack(numbeR, numberG, numberB) {
  if ((numbeR === 0 && numberG === 0 && numberB === 0)) {
    return false;
  }
  return true;
}
function checkRepetitionColor(color) {
  for (let index = 0; index < getElement.length; index += 1) {
    if (color === getElement[index].style.backgroundColor) {
      return false;
    }
  }
  return true;
}
function colorGenerator() {
  const numberR = randomNumber();
  const numberG = randomNumber();
  const numberB = randomNumber();
  const verifyWhite = checkColorWhite(numberR, numberG, numberB);
  const verifyBlack = checkColorBlack(numberR, numberG, numberB);
  const color = `rgb(${numberR}, ${numberG}, ${numberB})`;
  const verifyRepetition = checkRepetitionColor(color);

  if (verifyWhite === true && verifyBlack === true && verifyRepetition === true) {
    return color;
  }
  colorGenerator();
}
function saveColor() {
  const savedColor = {
    colorPalette: [],
  };

  for (let index = 0; index < getElement.length; index += 1) {
    const getCSS = window.getComputedStyle(getElement[index]).getPropertyValue('background-color');
    savedColor.colorPalette.push(getCSS);
  }
  localStorage.setItem('colorPalette', JSON.stringify(savedColor));
}
function createRandomPaletteColor() {
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
function createPixels(id, number) {
  const element = document.getElementById(id);

  for (let index = 0; index < number; index += 1) {
    const elementCreator = document.createElement('div');
    elementCreator.className = 'pixel';
    element.appendChild(elementCreator);
  }
}
function createHightPixelBoard(hight) {
  const element = document.getElementById('pixel-board');

  for (let i = 0; i < hight; i += 1) {
    const elementCreator = document.createElement('div');
    elementCreator.id = i;
    element.appendChild(elementCreator);
    createPixels(i.toString(), hight);
  }
}
function selectPaintColor(click) {
  const colorSelected = click.target;

  for (let index = 0; index < getElement.length; index += 1) {
    if (getElement[index].classList.contains('selected')) {
      getElement[index].classList.remove('selected');
    }
  }
  colorSelected.classList.add('selected');
}
function savePixelsPainteds() {
  const board = document.querySelectorAll('.pixel');
  const savedPixels = {
    color: [],
  };
  for (let index = 0; index < board.length; index += 1) {
    const getCSS = window.getComputedStyle(board[index]).getPropertyValue('background-color');
    savedPixels.color.push(getCSS);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(savedPixels));
}
function clearBoard() {
  const selectAll = document.querySelectorAll('.pixel');

  for (let index = 0; index < selectAll.length; index += 1) {
    selectAll[index].style.backgroundColor = 'white';
  }
  savePixelsPainteds();
}
function applayCollor(click) {
  const pixelClicked = click.target;
  const colorSelected = document.querySelector('.selected');

  pixelClicked.style.backgroundColor = colorSelected.style.backgroundColor;
  savePixelsPainteds();
}
function loadLocalStorageBoard() {
  const local = JSON.parse(localStorage.getItem('pixelBoard'));
  const element = document.querySelectorAll('.pixel');

  if (local === null) {
    savePixelsPainteds();
  } else {
    for (let index = 0; index < local.color.length; index += 1) {
      element[index].style.backgroundColor = local.color[index];
    }
  }
}
function makePixelsDinamic() {
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach((pix) => {
    pix.addEventListener('click', applayCollor);
  });
}
function verifyValue() {
  const getIntup = document.getElementById('board-size').value;

  if (getIntup === '') {
    alert('Board inválido!');
  } else if (getIntup < 5) {
    return 5;
  } else if (getIntup > 50) {
    return 50;
  } else {
    return getIntup;
  }
}
function saveSizeBoard() {
  const saveSize = document.getElementById('board-size').value;
  localStorage.setItem('boardSize', JSON.stringify(saveSize));
}
function removeItens() {
  const getChildren = document.getElementById('pixel-board').children;

  for (let index = getChildren.length - 1; index >= 0; index -= 1) {
    const removeItem = document.getElementById(index.toString());
    removeItem.remove();
  }
}
function resizeBoard() {
  const value = verifyValue();
  removeItens();
  createHightPixelBoard(value);
  clearBoard();
  saveSizeBoard();
  loadLocalStorageBoard();
  makePixelsDinamic();
}
function loadSizeBoard() {
  const size = JSON.parse(localStorage.getItem('boardSize'));

  if (size === null) {
    createHightPixelBoard(5);
    makePixelsDinamic();
  } else {
    removeItens();
    createHightPixelBoard(size);
    loadLocalStorageBoard();
    makePixelsDinamic();
  }
}
function loadLocalStoragePaletta() {
  const local = localStorage.getItem('colorPalette');

  if (local === null) {
    createRandomPaletteColor();
  } else {
    const load = JSON.parse(local);
    for (let index = 0; index < load.colorPalette.length; index += 1) {
      getElement[index].style.backgroundColor = load.colorPalette[index];
    }
  }
  loadSizeBoard();
  loadLocalStorageBoard();
}

// Seleção das cores.
const colorOne = getElement[0];
const colorTwo = getElement[1];
const colorThree = getElement[2];
const colorFour = getElement[3];
colorOne.addEventListener('click', selectPaintColor);
colorTwo.addEventListener('click', selectPaintColor);
colorThree.addEventListener('click', selectPaintColor);
colorFour.addEventListener('click', selectPaintColor);

// Criação do quadrado de pixels.
createHightPixelBoard();
makePixelsDinamic();

// Botão cores Aleatórias.
const getButton = document.getElementById('button-random-color');
getButton.addEventListener('click', createRandomPaletteColor);

// Botão Limpar.
const getButtonClear = document.getElementById('clear-board');
getButtonClear.addEventListener('click', clearBoard);

// Botão que muda tamanho da tabela.
const getButtonVQV = document.querySelector('#generate-board');
getButtonVQV.addEventListener('click', resizeBoard);

// Carregamento do Local Storage.
window.onload = loadLocalStoragePaletta;
