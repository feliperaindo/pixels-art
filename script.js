document.body.onload = createHightPixelBoard();

function createHightPixelBoard() {
 let element = document.getElementById('pixel-board');
 let elementCreator = document.createElement('div').

    for (let i = 0; i < 5; i += 1) {
    element.appendChild(elementCreator);
    console.log element;
    }
}
