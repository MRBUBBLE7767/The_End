var backImage,backgr;
var player, player_running;
var ground,ground_img,backimg;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img,background1,background2;

var gameOver , gameState;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  canvas = createCanvas(displayWidth - 20,displayHeight - 20);

   
  backimg = createSprite(100,0,displayWidth,displayHeight)
  backimg.addImage(backImage);
  backimg.velocityX =-5
  backimg.scale = 2.9;
  player = createSprite(200,displayHeight-100,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.5;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.y=displayHeight-20;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  gameState = "play";
  score = 0;
}

function draw() {
  
  //background(backImage);
  
    
    
  if(backimg.x<100){  
    backimg.x=backimg.width/2;
  }
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
    switch(score){
        case 10: player.scale+=0.12;
                break;
        case 20: player.scale+=0.14;
                break;
        case 30: player.scale+=0.16;
                break;
        case 40: player.scale+=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") && gameState === "play" ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale-=0.1;
        obstaclesGroup.destroyEach();
        score=score-2;
    }
    if(FoodGroup.isTouching(player)){ 
      FoodGroup.destroyEach();
      score=score+2;
  }
  if(player.scale <0.2 || score<0){
    gameState = "end";
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, displayWidth-250,displayHeight-550);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0 && gameState ==="play" ) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(displayHeight - 500 ,displayHeight - 100);  
    banana.x = displayWidth + 100;  
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0 && gameState === "play")  {
    var obstacle = createSprite(800,350,10,40);
    obstacle.y = displayHeight - 100;  
    obstacle.x = displayWidth + 100;  
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
