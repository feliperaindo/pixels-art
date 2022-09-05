function genetareRandomColorPalette() {
  const getElement = document.querySelectorAll('.color');

  for (let index = 0; index < 4; index += 1) {
    if (index > 0) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      getElement[index].style.backgroundColor = randomColor;
    }
  }
}
genetareRandomColorPalette();

// function createHightPixelBoard() {
//  let element = document.getElementById('pixel-board');
//  let elementCreator = document.createElement('div').

//     for (let i = 0; i < 5; i += 1) {
//     element.appendChild(elementCreator);
//     console.log element;
//     }
// }
