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

  for (let index = 0; index < saved.length; index += 1) {
    localStorage.setItem(`style${[index]}`, JSON.stringify(saved[index].style));
  }
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

// function loadLocalStorage() {
//   const getElement = document.querySelectorAll('.color');
//   const loadZero = JSON.parse(sessionStorage.getItem('style0'));
//   const loadOne = JSON.parse(sessionStorage.getItem('style1'));
//   const loadTwo = JSON.parse(sessionStorage.getItem('style2'));
//   const loadThree = JSON.parse(sessionStorage.getItem('style3'));
//   getElement[0].style.loadZero;
//   getElement[1].style(loadOne);
//   getElement[2].style(loadTwo);
//   getElement[3].style(loadThree);
// }

const getButton = document.getElementById('button-random-color');
getButton.addEventListener('click', randomPaletteColor);

// function createHightPixelBoard() {
//  let element = document.getElementById('pixel-board');
//  let elementCreator = document.createElement('div').

//     for (let i = 0; i < 5; i += 1) {
//     element.appendChild(elementCreator);
//     console.log element;
//     }
// }
