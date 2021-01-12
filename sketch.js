var backgroundImg, redBarImg, greenBarImg, springImg, playerImg, playerKickImg, ballImg, retryImg, yellowBarImg;
var ball, redBar, greenBar, spring, yellowBar, player, playerKick, retry; 
var redBarGroup, greenBarGroup, springGroup;
var kickSound,hitSound, gameOverSound,springJumpSound;
var serve = 1;
var play = 2;
var end = 3;
var gamestate = "serve";
var object1, object2;

function preload(){ 
  ballImg = loadImage("sprites/ball.png");
  backgroundImg = loadImage("sprites/sky.png");
  redBarImg = loadImage("sprites/redBar2.png");
  greenBarImg = loadImage("sprites/greenBar.png");
  springImg = loadImage("sprites/spring.png");
  playerImg = loadImage("sprites/player.png");
  playerKickImg = loadImage("sprites/playerKick.png");
  retryImg =loadImage("sprites/retry.png");
  yellowBarImg = loadImage("sprites/yellowBar.png")
  kickSound = loadSound("sound/sound1.mp3");
  hitSound = loadSound("sound/sound2.mp3");
  gameOverSound = loadSound("sound/sound3.wav");
  springJumpSound = loadSound("sound/sound4.mp3")
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  ball = createSprite(displayWidth/2, displayHeight - 110, 40, 40);
  ball.addImage(ballImg);
  ball.scale = 0.1;

  player = createSprite(displayWidth/2 + 50, displayHeight-160, 40, 40);
  player.addImage(playerImg);
    
  yellowBar = createSprite(displayWidth/2, displayHeight - 100, 60,20);
  yellowBar.addImage(yellowBarImg);
  yellowBar.scale = 0.1;
 
  retry = createSprite(displayWidth/2, displayHeight/2, 50, 20);
  retry.addImage(retryImg);
  retry.scale = 0.1;
  retry.visible = false;

  redBarGroup = createGroup();
  greenBarGroup = createGroup();
  springGroup = createGroup();
}

function draw() {
  background(backgroundImg); 

  if(gamestate === "serve"){
    textSize(60);
    text("press space to start", displayWidth/2, displayHeight/2);
  }

  if(keyCode === 32 && gamestate === "serve"){
    kickSound.play();
    ball.velocity = -6;
    gamestate = "play";
  }

  if(gamestate === "play"){
    player.addImage(playerKickImg);
    spawnSprings();
    spawnRedBars();
    spawnGreenBars();
  }

  if(gamestate === "play"){
    ball.velocityY= ball.velocity + 0.8;
  }

  if(isTouching(ball,springGroup) && gamestate === "play"){
    ball.velocityY = ball.velocityY - 7;
  }

  if(keyCode === 39 && gamestate === "play"){
    ball.x+= 6;
  }

  if(keyCode === 37 && gamestate === "play"){
    ball.x-= 6;
  }

  if(isTouching(ball,greenBarGroup) && gamestate === "play"){
    ball.velocityY = ba5ll.velocityY - 5;
  }
  
  if(isTouching(ball,yellowBar) && gamestate === "play"){
    ball.velocityY = ball.velocityY - 5;
  }
  if(isTouching(ball,redBarGroup) && gamestate === "play"){
    gameOverSound.play();
    stroke("yellow");
    fill("blue");
    textSize(60);
    text("Game Over", displayWidth/2, displayHeight/2);
    retry.visible = true;
    ball.velocity = 0;
    greenBarGroup.velocityY = 0;
    redBarGroup.velocityY = 0;
    springGroup.velocityY = 0;
  }
  drawSprites();
}

function isTouching(object1,object2){
  if (object1.x - object2.x < object2.width/2 + object1.width/2
    && object2.x - object1.x < object2.width/2 + object1.width/2
    && object1.y - object2.y < object2.height/2 + object1.height/2
    && object2.y - object1.y < object2.height/2 + object1.height/2){ 
    return true;
  } 
  else {
    return false;
  }
}

function spawnSprings(){
  if(frameCount % 150 === 0){
    spring = createSprite(displayWidth/2, displayHeight/2-600);
    spring.x = greenBarGroup.x;
    spring.y = spring.y - 20;
    spring.addImage(springImg);
    spring.scale = 0.1;
    spring.velocityY = 2;
    spring.lifetime = 1000;
    springGroup.add(spring);
  }
}
function spawnGreenBars(){
  if(frameCount % 50 === 0){
    greenBar = createSprite(displayWidth/2, displayHeight/2 - 400);
    greenBar.x = Math.round(random(10, displayWidth - 100));
    greenBar.addImage(greenBarImg);
    greenBar.velocityY = 2;
    greenBar.lifetime = 1000;
    greenBar.scale = 0.1;
    greenBar.depth = springGroup.depth;
    greenBar.depth+= 1;
    greenBarGroup.add(greenBar);
  }
}
function spawnRedBars(){
  if(frameCount % 80 === 0){ 
    redBar = createSprite(displayWidth/2, displayHeight/2 - 400);
    redBar.x = Math.round(random(10, displayWidth - 100));
    redBar.addImage(redBarImg);
    redBar.velocityY = 2;
    redBar.lifetime = 1000;
    redBar.scale = 0.05;
    redBar.x = greenBarGroup.x + 100;
    if(redBar.y === greenBarGroup.y){ 
      redBar.y = greenBarGroup.y + Math.round(random(10, 50));
    }
    redBarGroup.add(redBar);
  }
}