var backgroundImg, redBarImg, greenBarImg, springImg, playerImg, playerKickImg, ballImg, retryImg, yellowBarImg;
var ball, redBar, greenBar, spring, yellowBar, player, playerKick, retry; 
var redBarGroup, greenBarGroup, springGroup;
var gamestate = "serve";
var object1, object2;
var score = 0;
var sound1,sound3,sound4;

function preload(){ 
  ballImg = loadImage("sprites/ball.png");
  backgroundImg = loadImage("sprites/sky.png");
  redBarImg = loadImage("sprites/redbar2.png");
  greenBarImg = loadImage("sprites/greenBar.png");
  springImg = loadImage("sprites/spring.png");
  playerImg = loadImage("sprites/player.png");
  playerKickImg = loadImage("sprites/playerKick.png");
  retryImg =loadImage("sprites/retry.png");
  yellowBarImg = loadImage("sprites/yellowBar.png");
  sound1 = loadSound("sound/sound1.mp3");
  sound3 = loadSound("sound/sound3.wav");
  sound4 = loadSound("sound/sound4.mp3");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  ball = createSprite(displayWidth/2 + 10, displayHeight - 140, 40, 40);
  ball.addImage(ballImg);
  ball.scale = 0.05;


  player = createSprite(displayWidth/2 + 50, displayHeight-160, 40, 40);
  player.addImage(playerImg);

  yellowBar = createSprite(displayWidth/2, displayHeight - 100, 60,20);
  yellowBar.addImage(yellowBarImg);
  yellowBar.scale = 0.1;
  yellowBar.debug = true;
 
  retry = createSprite(displayWidth/2, displayHeight/2, 50, 20);
 // retry.addImage(retryImg);
  retry.visible = false;

  redBarGroup = createGroup();
  greenBarGroup = createGroup();
  springGroup = createGroup();
}

function draw() {
  background(backgroundImg); 

  textSize(40);
  fill("yellow");
  text("Score: "+score,displayWidth/2+450,displayHeight-300);

  if(keyCode === 39){
    ball.x+= 3;
  }

  if(keyCode === 37){
    ball.x-= 3;
  }
 
  if (keyCode === 32 && gamestate === "serve"){
    ball.velocityY= - 6;
    player.addImage(playerKickImg);
    gamestate = "play";
  }

  if (gamestate === "play"){
    ball.velocityY = ball.velocityY + 3;
  }
  if(keyCode === 39){
    if(isTouching(ball,springGroup) && gamestate === "play"){
      score = score + 2;
      ball.velocityY = ball.velocityY -5;
      sound4.play();
    }
  }

  if(isTouching(ball,greenBarGroup)){
    score = score + 1;
    ball.velocityY = ball.velocityY -5;
    sound1.play();
  }

  if(isTouching(ball,yellowBar) && gamestate === "play"){
    score = score + 1;
    ball.velocityY = ball.velocityY - 5;
    sound1.play();
  }

  if(isTouching(ball,redBarGroup) && gamestate === "play"){
    stroke("yellow");
    fill("blue");
    text("Game Over", displayWidth/2, displayHeight/2);
    textSize(60);
    retry.visible = true;
    sound3.play();
  }

  spawnSprings();
  spawnRedBars();
  spawnGreenBars();

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

function bounceoff(sp1,sp2){
  if(sp1.x - sp2.x < sp1.width/2 + sp2.width/2
    && sp2.x - sp1.x < sp1.width/2 + sp2.width/2){
      sp1.velocityX + sp2.velocityX * (-1);
      sp2.velocityX + sp2.velocityX * (-1)
    }
}
function spawnRedBars(){
  if(frameCount % 80 === 0){ 
    redBar = createSprite(displayWidth/2 - 200, displayHeight/2 - 400);
    redBar.x = Math.round(random(10, displayWidth - 100));
    redBar.addImage(redBarImg);
    redBar.velocityY = 2;
    redBar.lifetime = 1000;
    redBar.scale = 0.05;
    redBarGroup.add(redBar);
    redBar.x = greenBar.x + 100;
    if(redBar.y === greenBar.y){ 
      redBar.y = greenBar.y + Math.round(random(10, 50));
    }
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

function spawnSprings(){
  if(frameCount % 150 === 0){
    spring = createSprite(displayWidth/2, displayHeight/2-600);
    spring.x = greenBar.x;
    spring.y = greenBar.y - 20;
    spring.addImage(springImg);
    spring.scale = 0.1;
    spring.velocityY = 2;
    spring.lifetime = 1000;
    springGroup.add(spring);
  }
}
