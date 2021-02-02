var balloon;
var backgroundImage;
var database;
var position;
var balloonImage;

function preload(){
  backgroundImage=loadImage("Hot Air Ballon-01.png")
  balloonImage=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1500,700);
  balloon=createSprite(400, 200, 50, 50);
  var balloonPosition=database.ref('balloon/position');
  ballonPosition.on('value',readPosition,showError)

}

function draw() {
  background(backgroundImage);

   if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10
    }
    else if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x+10
    }
    else if(keyDown(UP_ARROW)){
      balloon.y=balloon.y-10
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.y=balloon.y+10
    } 
    if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.addAnimation('hotAirBalloon',balloonImage)
    balloon.scale=balloon.scale-0.01
    }
  drawSprites();
}

function updateHeight(x,y){
database.ref('balloon/height').set({
  'x':height.x + x,
  'y':height.y + y
})
}

function readHeight(data){
height=data.vel()
balloon.x=height.x
balloon.y=height.y
}

function showError(){
  console.log("Error in writting to the database")
}