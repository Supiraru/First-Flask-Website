const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var isRendered = true;
var length = 3;
var lose = false;
var condition = false;

var food = {
    x: 500,
    y: 460,
    w: 20,
    h: 20,
    val: false
};

//snake
var snake = [];
var tmp = 0;
var detWall = false;
for(var i = 0; i < 200; i++){
    if(i < 3){
        snake[i] = {
            w: 20,
            h: 20,
            x: canvas.width/2 + tmp,
            y: canvas.height/2, 
            dx: 20,
            dy: 0
        };
        tmp = tmp - snake[i].w;
    }
    else{
        snake[i] = {
            w: 20,
            h: 20,
            x: -20,
            y: -20, 
            dx: 0,
            dy: 0
        };
    }
}

function drawSnake(){
    for(var j = 0; j < length; j++){
        context.fillStyle = 'red';
        context.fillRect(snake[j].x, snake[j].y, snake[j].w, snake[j].h);
    }
}

function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function MovPos() {
    if(detWall === false){
        if(isRendered === false){
            isRendered = true;
        }
        var xPrev, yPrev, xNow, yNow ;
        for(var i = 0; i < length; i++){
            if(i === 0){
                xPrev = snake[i].x;
                yPrev = snake[i].y;
                snake[i].x += snake[i].dx;
                snake[i].y += snake[i].dy;
                
            }
            else{
                xNow = snake[i].x;
                yNow = snake[i].y;
                snake[i].x = xPrev;
                snake[i].y = yPrev;
                xPrev = xNow;
                yPrev = yNow;
            }
        }
    }
    detectWalls();
  }
  function detectWalls() {
    // Left wall
    if (snake[0].x <= 0) {
        snake[0].dx = 0;
    }
  
    // Right Wall
    if (snake[0].x + snake[0].w >= canvas.width) {
        snake[0].dx = 0;
    }
    if (snake[0].y <= 0) {
        snake[0].dy = 0;
      }
    if (snake[0].y + snake[0].h >= canvas.height) {
        snake[0].dy = 0;
    }  
    if(snake[0].dx === 0 && snake[0].dy === 0){
        detWall = true;
    }
}


//keyDown
function moveRight() {
    snake[0].dx = 20;
    snake[0].dy = 0;
    detWall = false;
}
  
function moveLeft() {
    snake[0].dx = -20;
    snake[0].dy = 0;
    detWall = false;
}

function moveUp() {
    snake[0].dx = 0;
    snake[0].dy = -20;
    detWall = false;
}
  
function moveDown() {
    snake[0].dx = 0;
    snake[0].dy = 20;
    detWall = false;
}

function keyDown(e) {
    if(isRendered === true){
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            if(snake[0].dx != -20 ){
                moveRight();
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            if(snake[0].dx != 20){
                moveLeft();
            }
        }
        else if (e.key === 'ArrowUp' || e.key === 'Up') {
            if(snake[0].dy != 20 ){
                moveUp();
            }
        }
        else if (e.key === 'ArrowDown' || e.key === 'Down') {
            if(snake[0].dy != -20 ){
                moveDown();
            }
        }
        isRendered = false;
    }
}

document.addEventListener('keydown', keyDown);


//Food
function drawFood(){
    checkFood();
    if(food.val === false){
        context.fillStyle = 'blue';
        context.fillRect(food.x, food.y, food.w, food.h);
    }
    else{
        food.x = Math.floor(Math.random() * 50) * 20;
        food.x = Math.floor(Math.random() * 30) * 20;
        food.val = false;
    }
}

function checkFood(){
    if(snake[0].x === food.x && snake[0].y === food.y){
        setTimeout(function(){food.val = true}, 80);
        length++;
    }
}

function detectBody(){
    for(var i = 1; i < length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            lose = true;
        }
    }
}

function ScoreBoard(){
    document.getElementById("score").innerHTML = "YOUR SCORE : " + length * 10;
}


function movement(){
    clear();
    drawSnake();
    MovPos();
    drawFood();
    detectBody();
    ScoreBoard();
}

function reset(){
    if(lose === false){
        movement();
    }
    else{
        alert("YOU LOSE ! YOUR SCORE : " + length * 10 +  ". PLEASE REFRESH THIS PAGE TO RESTART! "  );
        condition = true;
    }
}

if(condition == false){
    setInterval(reset, 200);
}
else{
    window.location.reload(true);
}