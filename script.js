const sketchContainer = document.querySelector(".sketch-container");
const changeResolutionBtn = document.querySelector(".change-grid-btn");
const btnContainer = document.querySelector(".btn-container");

const GRID_SIZE= 960;
let rainbowMode = false;
let singleColorMode = true;
let opacityMode = false;

if(!sessionStorage.getItem("resolution")){
    sessionStorage.setItem("resolution", 16);
}

function setOpacity(opacity){
    const pixelsArray = document.querySelectorAll(".sketch-container div");
    pixelsArray.forEach(pixel => {
        pixel.style.opacity = `${opacity}`;
    });
}

function buildGrid(gridResolution){
    let numeberOfPixels = gridResolution**2;
    let pixelSize = GRID_SIZE / gridResolution;

    for(let i = 0; i < numeberOfPixels; i++){
        const gridPixel = document.createElement("div");
        gridPixel.style.width = `${pixelSize}px`;
        gridPixel.style.height = `${pixelSize}px`;
        gridPixel.style.border = "1px solid black";
        gridPixel.style.boxSizing = "border-box";
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
            }else if(singleColorMode){
                pixel.style.backgroundColor = "grey";
            }else if(opacityMode){
                pixel.style.backgroundColor = "grey";
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
            rainbowMode = true;
            singleColorMode = false;
            opacityMode = false;
            setOpacity("1");
            break;
        case "single-color-btn":
            rainbowMode = false;
            singleColorMode = true;
            opacityMode = false;
            setOpacity("1");
            break;
        case "opacity-mode-btn":
            rainbowMode = false;
            singleColorMode = false;
            opacityMode = true;
            setOpacity("0");
            break;
    }
});