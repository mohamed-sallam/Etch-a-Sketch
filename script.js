let gridSlider = document.querySelector('#grid-slider');
let penMode;
let beginDrawing = false;

function EraserMode(element) {
    element.style['background-color'] = 'transparent';
}

function BrushMode(element) {
    element.style['background-color'] = document.querySelector('#colorPicker').value;
}

function RgbBrushMode(element) {
    const colors = [
        "#FF0000", // Red
        "#FF8800", // Orange
        "#FFFF00", // Yellow
        "#00FF00", // Green
        "#0000FF", // Blue
        "#9900FF", // Purple
    ];
        
    element.style['background-color'] = colors[Math.floor(Math.random() * colors.length)];
}

function initSketchGrid() {
    let size = gridSlider.value;
    document.querySelector('.sketch').style['grid-template-columns'] = `repeat(${size}, 1fr)`;
    gridSlider.labels[0].textContent = `Grid Size: ${size} x ${size}`;
    size *= size;
    let grid = document.querySelector('.sketch');
    grid.innerHTML = '';
    while (size--)
        grid.innerHTML += /*HTML*/`<div class="pixel"><div>`;

    document.querySelectorAll('.pixel').forEach((element) => {
        element.addEventListener('mouseenter', () => {
            if (beginDrawing)
                penMode(element);
        });
        element.addEventListener('mousedown', () => penMode(element));
    });     
}


gridSlider.addEventListener('change', initSketchGrid);

let colorBrush = document.querySelector('#color-brush');
let rgbBrush = document.querySelector('#rgb-brush');
let eraser = document.querySelector('#eraser');
colorBrush.addEventListener('click', () => penMode = BrushMode);
rgbBrush.addEventListener('click', () => penMode = RgbBrushMode);
eraser.addEventListener('click', () => penMode = EraserMode);

document.querySelector('#brush').addEventListener('click', () => {
    if (colorBrush.checked) 
        penMode = BrushMode;
    else if (rgbBrush.checked)
        penMode = RgbBrushMode;
});

if (colorBrush.checked) 
    penMode = BrushMode;
else if (rgbBrush.checked)
    penMode = RgbBrushMode;
else if (eraser.checked)
    penMode = EraserMode;

document.querySelector('#clear').addEventListener('click', () => confirm('Do you, really, want to clear the sketch?') && initSketchGrid())

document.querySelector('#sketch').addEventListener('mousedown', () => beginDrawing = true);
document.querySelector('#sketch').addEventListener('mouseup', () => beginDrawing = false);
initSketchGrid();

