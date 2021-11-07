const blockSize = 360;
let defaultGrid = 20;
let sqSize = blockSize / defaultGrid;
const sqColor = "black";
const borderWid = 2;
let rgb = false;

let content = document.querySelector('.content');
draw(defaultGrid, sqSize);

//create a color changing button 
let colorChanger = document.querySelector('#rgb');
colorChanger.addEventListener("click", changeColor);
function changeColor () {
    rgb = !(rgb);
    if (rgb){
        this.style.backgroundColor = 'black';
        this.style.color = 'white';
    } else {
        this.style.backgroundColor = 'white';
        this.style.color = 'black';
    }
    
}

//redraw the grid with new square size & gridsize
function draw (gridSize, squareSize) {
    let container = document.createElement('div');
    container.setAttribute("class", "container");
    for (let j = 0; j < gridSize; j++){
        let xrow = row(j);
        for (let i = 0; i < gridSize; i++){
            xrow.appendChild(square(j.toString + i, squareSize));
        }
        container.appendChild(xrow);
    }
    content.appendChild(container);
}

function redraw(gridVarSize, squareVarSize){
    let find = document.querySelector(".container");
    content.removeChild(find);
    draw(gridVarSize, squareVarSize);
}

function row(num){
    let r = document.createElement('div');
    r.setAttribute("class", "row");
    r.setAttribute("id", num);
    r.style.cssText = `display:flex; flex-direction: row;`;
    return r;
}

function randomColor () {
    let color = Math.floor(Math.random()*16777215).toString(16); 
    return color; 
}

function square(num, squareSize){
    let sq = document.createElement('div');
    sq.setAttribute("id", num);
    sq.setAttribute("class", "pixel");
    sq.style.cssText = `background-color: white; display: flex; width: ${squareSize}px; height: ${squareSize}px; flex: 0 0 auto;` + 
    `border: 1px solid rgb(220,220,220); margin: -1px;`
    sq.addEventListener("mouseover", colorBlock);
    return sq;
}

function colorBlock(){
    if (rgb) {
        this.style.backgroundColor = "#" + randomColor();
    }
    else {this.style.backgroundColor = sqColor;}
}

//do the clear button 
let clear = document.querySelector('#clear');
clear.addEventListener('click', clearScreen);

let pixels = document.querySelectorAll(".pixel");

function clearScreen(){
    pixels.forEach((x) => {
        x.style.backgroundColor = "white";
    });
    let invalid = true; 
    let size = sqSize;
    while (invalid){
        size = prompt("Please enter a size dimention!"); 
        if (size >= 1 && size <= 100) {
            invalid = false;
        }
        else {
            alert("Please enter a number greater than 0, less than 100.");
        }

    }
    redraw(size, blockSize / size);
}
