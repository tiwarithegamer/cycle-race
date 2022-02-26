var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var coneG, holeg, nailG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

var obstacle1,obstacle2,obstacle3;
var obstacle1Img,obstacle2Img,obstacle3Img;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40,50);
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();

coneG = new Group();
holeG = new Group();
nailG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){

   gameOver.visible = false;
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }

  var select_obstacle = Math.round(random(1,3));

  if(World.frameCount % 200 == 0){
    if(select_obstacle == 1) {
      coneObstacle();
    } else if (select_obstacle == 2){
      holeObstacle();
    } else {
      nailObstacle();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(coneG.isTouching(mainCyclist)){
      gameState = END;
      coneG.setVelocityXEach(0);
    }

    if(holeG.isTouching(mainCyclist)){
      gameState = END;
      holeG.setVelocityXEach(0); 
    }

    if(nailG.isTouching(mainCyclist)){
      gameState = END;
      nailG.setVelocityXEach(0);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    coneG.setVelocityXEach(0);
    coneG.setLifetimeEach(-1);
  
    holeG.setVelocityXEach(0);
    holeG.setLifetimeEach(-1);
  
    nailG.setVelocityXEach(0);
    nailG.setLifetimeEach(-1);

 if(keyDown("UP_ARROW")) {
    reset();
 }
}
}

function pinkCyclists(){
  player1 =createSprite(1100,Math.round(random(50, 250)));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",oppPink1Img);
  player1.setLifetime=170;
  pinkCG.add(player1);
}

function yellowCyclists(){
  player2 =createSprite(1100,Math.round(random(50, 250)));
  player2.scale =0.06;
  player2.velocityX = -(6 + 2*distance/150);
  player2.addAnimation("opponentPlayer2",oppYellow1Img);
  player2.setLifetime=170;
  yellowCG.add(player2);
}

function redCyclists(){
  player3 =createSprite(1100,Math.round(random(50, 250)));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",oppRed1Img);
  player3.setLifetime=170;
  redCG.add(player3);
}

function coneObstacle(){
  obstacle1 = createSprite(1100,Math.round(random(50,250)));
  obstacle1.velocityX = -(6 + 2*distance/200);
  obstacle1.addImage("obstacle1",obstacle1Img);
  obstacle1.setLifetime = 170;
  obstacle1.scale = 0.1;
  coneG.add(obstacle1);
}

function holeObstacle(){
  obstacle2 = createSprite(1100,Math.round(random(50,250)));
  obstacle2.velocityX = -(6 + 2*distance/200);
  obstacle2.addImage("obstacle2",obstacle2Img);
  obstacle2.setLifetime = 170;
  obstacle2.scale = 0.1;
  holeG.add(obstacle2);
}

function nailObstacle(){
  obstacle3 = createSprite(1100,Math.round(random(50,250)));
  obstacle3.velocityX = -(6 + 2*distance/200);
  obstacle3.addImage("obstacle3",obstacle3Img);
  obstacle3.setLifetime = 170;
  obstacle3.scale = 0.1;
  nailG.add(obstacle3);
}


function reset(){
  gameState = PLAY;
 
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  coneG.destroyEach();
  holeG.destroyEach();
  nailG.destroyEach();

  distance = 0;
 }


