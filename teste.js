function genetareRandomColorPalette() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  console.log(randomColor);
}
genetareRandomColorPalette();
