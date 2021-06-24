var dog, dogImg,happyDogImg;
var database;
var foodS,foodStock,foodObj;
var addFood,fedTime,lastFed;
var gameState, readState;

function preload(){
  dogImg = loadImage("images/dogImg1.png")
  happyDogImg = loadImage("images/dogImg.png")
  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
  livingRoom = loadImage("images/Living Room.png")
  lazy = loadImage("images/Lazy.png")
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  foodObj = new Food();

  //to create dog
  dog = createSprite(800,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  //button to feed dog, goes to the feed dog funcion
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  //button to add food, goes to the add food function
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  })
}

function draw(){
  //when the time changes, the setting changes
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  } else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  } else if(currentTime==(lastFed+3)){
    update("Bathing");
    foodObj.washroom();
  } else{
    update("Hungry");
    foodObj.display();
  }

  //when the gamestate is Hungry, or else
  if(gameState==="Hungry"){
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  } else{
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  drawSprites();
}

//function to read foodStock values from database
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update foodStock and lastFed time
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState: "Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//function to update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}