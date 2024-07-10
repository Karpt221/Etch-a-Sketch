const sketchContainer = document.querySelector(".sketch-container");
const changeResolutionBtn = document.querySelector(".change-grid-btn");
const btnContainer = document.querySelector(".btn-container");
const colorPicker = document.querySelector("#color-picker");

const GRID_SIZE= 960;
let rainbowMode = false;
let singleColorMode = true;
let opacityMode = false;

if(!sessionStorage.getItem("resolution")){
    sessionStorage.setItem("resolution", 16);
}

function cleanGrid(){
    const pixelsArray = document.querySelectorAll(".sketch-container div");
    pixelsArray.forEach(pixel => {
        pixel.style.backgroundColor = "transparent";
        pixel.style.opacity = "0";
    });
}

function buildGrid(gridResolution){
    let numeberOfPixels = gridResolution**2;
    let pixelSize = GRID_SIZE / gridResolution;

    for(let i = 0; i < numeberOfPixels; i++){
        const gridPixel = document.createElement("div");
        gridPixel.style.width = `${pixelSize}px`;
        gridPixel.style.height = `${pixelSize}px`;
        gridPixel.style.boxSizing = "border-box";
        gridPixel.style.opacity = "0";
        sketchContainer.appendChild(gridPixel);
    }
}

function defineNewResolution(){
    let newResolution = prompt("Enter new grid resolution (Max 64 | Min 2)", "");
    if(newResolution > 64 || newResolution < 2){
        alert("Incorrect resolution!");
        return;
    }
    sketchContainer.innerHTML = "";
    buildGrid(newResolution);
    addPixelHoverListeners();
    sessionStorage.setItem("resolution", newResolution);
}

function addPixelHoverListeners(){
    const pixelsArray = document.querySelectorAll(".sketch-container > div");

    pixelsArray.forEach(pixel => {
        pixel.addEventListener("mouseenter", () => {
            if(rainbowMode){
                let red = Math.random() * 255;
                let green = Math.random() * 255;
                let blue = Math.random() * 255;
                pixel.style.backgroundColor = `rgb(${red},${green},${blue})`;
                pixel.style.opacity = "1";
            }else if(singleColorMode){
                pixel.style.backgroundColor = `${colorPicker.value}`;
                pixel.style.opacity = "1";
            }else if(opacityMode){
                pixel.style.backgroundColor = `${colorPicker.value}`;
                pixel.style.opacity = parseFloat(pixel.style.opacity) + 0.1;
            }
            
        });
    });
}

buildGrid(sessionStorage.getItem("resolution"));

addPixelHoverListeners();

btnContainer.addEventListener("click", (event) =>{
    switch(event.target.id){
        case "change-grid-btn":
            defineNewResolution();
            break;
        case "rainbow-mode-btn":
            if(rainbowMode) return;
            rainbowMode = true;
            singleColorMode = false;
            opacityMode = false;
            break;
        case "single-color-btn":
            if(singleColorMode) return;
            rainbowMode = false;
            singleColorMode = true;
            opacityMode = false;
            break;
        case "opacity-mode-btn":
            if(opacityMode) return;
            rainbowMode = false;
            singleColorMode = false;
            opacityMode = true;
            break;
        case "clean-grid":
            cleanGrid();
            break;
    }
});