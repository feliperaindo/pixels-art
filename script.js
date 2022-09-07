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
  const getElement = document.querySelectorAll('.color');

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
  const saved = document.querySelectorAll('.color');
  const savedColor = {
    colorPalette: [],
  };

  for (let index = 0; index < saved.length; index += 1) {
    savedColor.colorPalette.push(saved[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(savedColor));
}

function createRandomPaletteColor() {
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
  const atribute = (hight === undefined) ? 5 : hight;

  for (let i = 0; i < atribute; i += 1) {
    const elementCreator = document.createElement('div');
    elementCreator.id = i;
    element.appendChild(elementCreator);
    createPixels(i.toString(), atribute);
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

function savePixelsPainteds() {
  const board = document.querySelectorAll('.pixel');
  const savedPixels = {
    color: [],
  };
  for (let index = 0; index < board.length; index += 1) {
    savedPixels.color.push(board[index].style.backgroundColor);
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

function loadLocalStoragePaletta() {
  const local = localStorage.getItem('colorPalette');
  const element = document.querySelectorAll('.color');

  if (local === null) {
    createRandomPaletteColor();
  } else {
    const load = JSON.parse(local);
    for (let index = 0; index < load.colorPalette.length; index += 1) {
      element[index].style.backgroundColor = load.colorPalette[index];
    }
  }
  loadLocalStorageBoard();
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

function resizeBoard() {
  const value = verifyValue();
  const getChildren = document.getElementById('pixel-board').children;

  for (let index = getChildren.length - 1; index >= 0; index -= 1) {
    const removeItem = document.getElementById(index.toString());
    removeItem.remove();
  }
  createHightPixelBoard(value);
  clearBoard();
  loadLocalStorageBoard();
  makePixelsDinamic();
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
