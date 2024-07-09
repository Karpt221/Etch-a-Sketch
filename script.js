const sketchContainer = document.querySelector(".sketch-container");
const changeResolutionBtn = document.querySelector(".change-grid-btn");
const GRID_SIZE= 960;
if(!sessionStorage.getItem("resolution")){
    sessionStorage.setItem("resolution", 16);
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

function addPixelHoverListeners(){
    const pixelsArray = document.querySelectorAll(".sketch-container > div");

    pixelsArray.forEach(pixel => {
        pixel.addEventListener("mouseenter", (event) => {
            pixel.style.backgroundColor = "red";
        });
    });
}

buildGrid(sessionStorage.getItem("resolution"));

addPixelHoverListeners();

changeResolutionBtn.addEventListener("click", () => {
    let newResolution = prompt("Enter new grid resolution (Max 64 | Min 2)", "");
    if(newResolution > 64 || newResolution < 2){
        alert("Incorrect resolution!");
        return;
    }
    sketchContainer.innerHTML = "";
    buildGrid(newResolution);
    addPixelHoverListeners();
    sessionStorage.setItem("resolution", newResolution);
});
