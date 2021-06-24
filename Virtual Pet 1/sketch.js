//Create variables here
var dog;
var dogImg, happyDogImg;
var database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg1.png")
  happyDogImg = loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(1000,1000);
  database = firebase.database();

  //normal dog
  dog = createSprite(500,500);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw(){
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    dog.addImage(happyDogImg);
    writeStock(foodS);
  }

  //to give them instruction to feed the dog
  textSize(15);
  fill("lightblue");
  stroke("black");
  text("Press the Up Arrow the feed the Dog",700,50);

  //to show them how much food is left
  textSize(15);
  fill("lightblue");
  stroke("black");
  text("Food remaining: " + foodS,50,50);

  drawSprites();
}

//function to read values from database
function readStock(data){
  foodS = data.val();
}

//function to write values in database
function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1
  }

  database.ref('/').update({
    Food:x
  })
}