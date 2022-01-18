var road,escapist;
var police1;

var policeCG;

var roadImg,escapistImg;

var gameOverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver;

function preload(){
  roadImg = loadImage("road.png");
  escapistImg = loadImage("spr_bike_0.png");
  policeImage=loadImage("police.png")
  gameOverImg = loadImage("gameover.png");
}

function setup(){
createCanvas(1200,300);

road=createSprite(600,150,1200,300);
road.addImage(roadImg);
//road.scale=1.2
road.velocityX = -5;

escapist  = createSprite(70,150);
escapist.addImage("escaping",escapistImg);
escapist.scale=0.7;
escapist.setCollider("rectangle",0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale =1.2
 
policeCG=createGroup()
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
  //road.velocityX = -(6 + 2*distance/150);
  
   escapist.y = World.mouseY;
  
   edges= createEdgeSprites();
   escapist.collide(edges);
  
  if(road.x < 0 ){
    road.x = width/2;
  }
    police()
  if(policeCG.isTouching(escapist)){
    gameState=END
  }
  
  
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    road.velocityX = 0;
    escapist.velocityY = 0;
    //escapist.changeImage("escaping",escapist);
gameOver.visible=true
    policeCG.setVelocityXEach(0);
    policeCG.setLifetimeEach(-1);

    if(keyDown("UP_ARROW")) {
        reset();
      }
}
  }
  
function police(){
  if(frameCount % 100===0){
        police1 = createSprite(1100,Math.round(random(50, 250)));
        police1.scale =0.06;
        police1.velocityX = -(6 + 2*distance/150);
        police1.addImage("chasing",policeImage);
        police1.setLifetime=1200;
        policeCG.add(police1);
       
}
}

function reset(){
 gameState = PLAY;
 gameOver.visible = false;
 escapist.changeImage("escaping",escapistImg);
  
 policeCG.destroyEach();

 distance = 0;
}