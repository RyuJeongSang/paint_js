const canvas = document.querySelector("#jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#1a1c20";
const CANVAS_SIZE = 650;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.lineWidth = 2.8;
context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
  context.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  context.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseout", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
