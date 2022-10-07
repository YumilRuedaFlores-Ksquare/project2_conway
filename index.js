const canvas = document.querySelector("#board");
const ctx = canvas.getContext("2d"); 
const reset = document.querySelector("#reset");
const start = document.querySelector("#start");
const randomize = document.querySelector("#randomize");
const input =  document.querySelector("#quantity");
const clear = document.querySelector("#clear");

const textLevel = document.querySelector('.generationNo');

let stop = true;
let gameId = 0;
let count = 0;

const GRID_WIDTH =  600;             
const GRID_HEIGHT = 600;       
let RES = 60;                     
let COL = GRID_WIDTH / RES;    
let ROW = GRID_HEIGHT / RES;  

canvas.width = GRID_WIDTH;
canvas.height = GRID_HEIGHT;


//Create a simetrical grid, the function will recive 2 parameters who set the Columns and Rows.
function seedGen(col, row) {
  let grid = [];
  
  for(let x = 0; x < col; x++){
    let nest = [];
    for(let y = 0; y < row; y++){
      let num = Math.floor(Math.random() * (2));
      nest.push(num);
    }
    grid.push(nest);
  }

  return grid;
};
function emptyGrid(col, row) {
  let grid = [];
  
  for(let x = 0; x < col; x++){
    let nest = [];
    for(let y = 0; y < row; y++){
      nest.push(0);
    }
    grid.push(nest);
  }

  return grid;
};

let grid = emptyGrid(COL, ROW);

function drawGrid(grid) {

  let cols = COL;
  let rows = ROW;
  let reslution = RES;

  ctx.clearRect(0, 0, cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = grid[i][j];
      ctx.fillStyle = cell ? "#000000" : "#ffffff";
      //draw the cubes
      ctx.fillRect(i * reslution, j * reslution, reslution, reslution);
      //draw my cells
      ctx.fillStyle ="#000000";
      ctx.fillRect((i * RES) , (j * 5), 2, GRID_WIDTH);
      ctx.fillStyle ="#000000";
      ctx.fillRect((i * 5) , (j * RES), GRID_HEIGHT, 2);
    }
  } 
};
drawGrid(grid);

function check(x,y){
  if(x < 0 || x >= COL|| y < 0 || y >= ROW){
      return 0;
  }
  let val = grid[x][y]==1?1:0;
  return val;
}

function checkAlive(grid){
  let gridAlive = emptyGrid(COL,ROW);
  let numAlive=0;
  for (let x = 0; x < COL; x++) {
      for (let y = 0; y < ROW; y++) {
          // Count ofpopulation
          numAlive = check(x - 1, y - 1) + check(x, y - 1) + check(x + 1, y - 1) + check(x - 1, y) + check(x + 1, y) + check(x - 1, y + 1) + check(x, y + 1) + check(x + 1, y + 1);
          gridAlive[x][y] = numAlive;
          
          
      }
  }
  return gridAlive;
}

function game(grid) {
  let newGrid = grid;
  if (stop) {
      clearInterval(gameId);
      console.log("YOU PRESS STOP!")
      //count = 0;
  }
  // Game Logic
  let gridPopullation = checkAlive(grid);
  //console.log(gridPopullation);
  //Here the rules...
  for(let i = 0;i<COL;i++){
    for(let j = 0;j<COL;j++){

      let cellPopulation = gridPopullation[i][j];
      let cellStatus = grid[i][j]; 
      if(cellStatus == 1){
        let chase = cellPopulation >3?1:(cellPopulation<2?1:cellPopulation);
        switch (chase) {
          case 1:
            newGrid[i][j] = 0;
            break;
          case 2:
            newGrid[i][j] = 1;
            break;
          case 3:
            newGrid[i][j] = 1;
            break;
          default:
            newGrid[i][j] = 0;
        }
      }else{
        switch (cellPopulation) {
          case 3:
            newGrid[i][j] = 1;
            break;
          default:
            newGrid[i][j] = 0;
        }
      }
    }
  }
  //console.log("is working", count++);
  
  //updateCounter(count++);
  grid = newGrid;
  drawGrid(newGrid);
  updateCounter(count++);
};

reset.addEventListener('click', () =>{
  if (!stop) {
    stop = true;        
    start.innerHTML = "START"
  };
  
  let grid = seedGen(COL, ROW);
  drawGrid(grid);
  
  updateCounter(0);

});

start.addEventListener('click', () =>{
  if (stop) {    
    stop = false;
    start.innerHTML = "STOP"
    gameId = setInterval(game, 200, grid);
    
  } else {
    stop = true;
    start.innerHTML = "START"
  };
});

let mouseGrid = {
  x: Number,
  y: Number
};

window.addEventListener('mousemove', function (e) {
  var rect = canvas.getBoundingClientRect();
  //here I get the position of my click
  mouseGrid.x = e.x - rect.left;
  mouseGrid.y = e.y - rect.top;

});

canvas.addEventListener('click', function(){

  if(stop){
    //change the state the grid 
  let Pos_X = Math.trunc(Math.trunc(mouseGrid.x)/RES) ;
  let Pos_Y = Math.trunc(Math.trunc(mouseGrid.y)/RES) ;


  grid[Pos_X][Pos_Y] = grid[Pos_X][Pos_Y] ? 0 : 1;
  drawGrid(grid);
  }
  
});


//adding the interaction with the randomize button
randomize.addEventListener('click', () =>{
  if (stop == true) { //confirms that the game is stopped before changing it
      grid = seedGen(COL, ROW);
      drawGrid(grid);
      count = 0;
      updateCounter(count);
  }
  else{ //sends a warning message if the game is running and does not allow the change to push through
      window.alert("Can only randomize when the game is not playing!");
  }

});


//Adding the interaction with the clear button
clear.addEventListener('click', () =>{
  grid = emptyGrid(COL,ROW);
  drawGrid(grid);
  count =0;
  updateCounter(count);
});


input.addEventListener('change', (event) => {
  
  RES = 600/event.target.value;
  COL = GRID_WIDTH / RES;    
  ROW = GRID_HEIGHT / RES;
  grid = emptyGrid(COL,ROW);
  drawGrid(grid);
});

function updateCounter(count){
  textLevel.innerText = `Generation No: ${count}`;
  console.log(count);
}

