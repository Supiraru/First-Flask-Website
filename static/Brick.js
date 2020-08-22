const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var check = false;

//BALL
const Circle = {
    x: canvas.width/2,
    y: canvas.height/2+canvas.height/5,
    size: 10,
    dx: 4,
    dy: 3
};
//USER
const user = {
    w: 90,
    h: 10,
    x: canvas.width/2-35,
    y: canvas.height-20,
    speed: 5,
    dx: 0,
    dy: 0
};
//RED Brick
var tmpX = 0;
var tmpY = 0;
var brick = [];

for(var i = 0 ; i < 24; i++){
    brick[i]  = {
        w: 100,
        h: 60,
        x: 20 + tmpX,
        y: 20 + tmpY,
        val: false
    };
    tmpX = tmpX +  brick[i].w + 20;
    if(i === 7 || i === 15){
      tmpY = tmpY + brick[i].h + 20;
      tmpX = 0;
    }
}

function DrawCircle(){
    context.beginPath();
    context.arc(Circle.x, Circle.y, Circle.size, 0, Math.PI*2);
    context.fillStyle = 'blue';
    context.fill();
}

function Hit(){
    if(Circle.x + Circle.size >= canvas.width || Circle.x - Circle.size <= 0){
        Circle.dx *= -1;
    }
    if( Circle.y - Circle.size <= 0){
        Circle.dy *= -1;
    }
    if(Circle.y + Circle.size >= canvas.height){
        Circle.dy *= -1;
        check = true;
    }

    if(Circle.y + Circle.size >= user.y && 
      Circle.y + Circle.size <= user.y + user.h  && 
      Circle.x  >= user.x && 
      Circle.x <= user.x + user.w){
        Circle.dy *= -1;
    }


}

function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function move(){
    
    DrawCircle();
    Circle.x += Circle.dx;
    Circle.y += Circle.dy;

    Hit();


}

//USER
function DrawRect(){
    context.beginPath();
    context.rect(user.x, user.y, user.w, user.h);
    context.fillStyle = 'red';
    context.fill();
}

function detectWalls() {
    // Left wall
    if (user.x < 0) {
      user.x = 0;
    }
  
    // Right Wall
    if (user.x + user.w > canvas.width) {
      user.x = canvas.width - user.w;
    }
}

function MovPos() {
    user.x += user.dx;
    detectWalls();
  }


  function Movement() {

    DrawRect();
  
    MovPos();
  
  }

  function moveRight() {
    user.dx = user.speed;
  }
  
  function moveLeft() {
    user.dx = -user.speed;
  }

  function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
      moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      moveLeft();
    }
  }
  function keyUp(e) {
    if (
      e.key == 'Right' ||
      e.key == 'ArrowRight' ||
      e.key == 'Left' ||
      e.key == 'ArrowLeft'
    ) {
      user.dx = 0;
    }
  }

  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

  // Brick
function CheckBrick(){
  if(check === false){
    for( var j = 0; j < 24; j++){
        if(brick[j].val === false){
            context.fillStyle = 'red';
            context.fillRect(brick[j].x, brick[j].y, brick[j].w, brick[j].h);
            RemBrick(j);
        }
    }
  }
  else{
    check = false;
    for( var j = 0; j < 24; j++){
      brick[j].val = false;
    }
  }
}
function RemBrick(j){
    if(Circle.x + Circle.size >= brick[j].x && 
        Circle.x + Circle.size <= brick[j].x + brick[j].w && 
        Circle.y + Circle.size >= brick[j].y && 
        Circle.y + Circle.size <= brick[j].y + brick[j].h){

        brick[j].val = true;
        Circle.dy *= -1;
    }
}


function Start(){
    clear();
    move();
    Movement();
    CheckBrick();
    requestAnimationFrame(Start);
}

Start();
