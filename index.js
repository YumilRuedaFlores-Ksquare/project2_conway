const canvas = document.querySelector("#board");
const ctx = canvas.getContext("2d"); 
const show = document.querySelector("#show");

//Clear variable added
const clear = document.querySelector("#clear");




const GRID_WIDTH =  500;             
const GRID_HEIGHT = 500;       
const RES = 50;                     
const COL = GRID_WIDTH / RES;    
const ROW = GRID_HEIGHT / RES;  

canvas.width = GRID_WIDTH;
canvas.height = GRID_HEIGHT;


//Make a function to create the grid , the function will recive 2 parameters: Columns and Rows.
let grid= [[0,0,0,0,0,0,0,0,0,1],
          [0,0,0,0,0,0,0,0,1,0],
          [0,0,0,0,0,0,0,1,0,0],
          [0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,1,0,0,0,0],
          [0,0,0,0,1,0,0,0,0,0],
          [0,0,0,1,0,0,0,0,0,0],
          [0,0,1,0,0,0,0,0,0,0],
          [0,1,0,0,0,0,0,0,0,0],
          [1,0,0,0,0,0,0,0,0,0]];


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
      ctx.fillRect((i * 50) , (j * 5), 2, 500);
      ctx.fillStyle ="#000000";
      ctx.fillRect((i * 5) , (j * 50), 500, 2);
    }
  } 
};
drawGrid(grid);


show.addEventListener('click', () =>{
  grid = [[0,0,0,0,0,0,0,0,0,1],
          [0,0,0,0,0,0,0,0,1,0],
          [0,0,0,0,0,0,0,1,0,0],
          [0,0,0,0,0,0,1,0,0,0],
          [0,0,0,0,0,1,0,0,0,0],
          [0,0,0,0,1,0,0,0,0,0],
          [0,0,0,1,0,0,0,0,0,0],
          [0,0,1,0,0,0,0,0,0,0],
          [0,1,0,0,0,0,0,0,0,0],
          [1,0,0,0,0,0,0,0,0,0]];
  drawGrid(grid);
});

clear.addEventListener('click', () =>{
    grid = [[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]];
    drawGrid(grid);
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

  //change the state the grid 
  let Pos_X = Math.trunc(Math.trunc(mouseGrid.x)/RES) ;
  let Pos_Y = Math.trunc(Math.trunc(mouseGrid.y)/RES) ;


  grid[Pos_X][Pos_Y] = grid[Pos_X][Pos_Y] ? 0 : 1;
  drawGrid(grid);
  
});