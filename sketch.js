var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime;


var score=0;

var gameOver, restart;

function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(200,480,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survivaltime = 0;
}

function draw() {
  
  background("white");
  text("Survival Time: "+ survivaltime, 250,50);
  
  if (gameState===PLAY){
    if(monkey.isTouching(FoodGroup))   {
FoodGroup.destroyEach();
      survivaltime = survivaltime+5;
      }
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8

    spawnFood();
    spawnObstacles();
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {

    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
 }
  monkey.collide(ground);
  
  
  drawSprites();
}

function spawnFood() {
 
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.x = Math.round(random(400,600));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -7;
    
     
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
    
    FoodGroup.add(banana);
   //FoodGroup.debug = true;
  }
  
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(600,465,10,40);
    obstacle.x = Math.round(random(400,600));
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.addImage(obstacleImage);
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 150;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }

}