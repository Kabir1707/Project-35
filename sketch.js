var balloon,balloonImage1,balloonImage2;
var database,height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
 
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 

  database = firebase.database();
  var balloonRef = database.ref('balloon/height');
  balloonRef.on("value",readHeight, showError);
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(1,0);
  }
  else if(keyDown(UP_ARROW)){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,+1);


  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function readHeight(data){
  height = data.val();

  balloon.x = height.x;
  balloon.y = height.y;
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x + x,
    'y':height.y + y
  })
}
function showError(){
  console.log("Error in writing to the database")
}