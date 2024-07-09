const sketchContainer = document.querySelector("#sketch-container");
const GRID_SIZE= 960;

let gridResolution = 16;
let pixelSize = GRID_SIZE / gridResolution;
let numeberOfPixels = gridResolution**2;

for(let i = 0; i < numeberOfPixels; i++){
    const gridPixel = document.createElement("div");
    gridPixel.style.width = `${pixelSize}px`;
    gridPixel.style.height = `${pixelSize}px`;
    gridPixel.style.border = "1px solid black";
    gridPixel.style.boxSizing = "border-box";
    sketchContainer.appendChild(gridPixel);
}
