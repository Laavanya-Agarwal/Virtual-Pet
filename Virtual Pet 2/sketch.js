var dog, dogImg,happyDogImg;
var database;
var foodS,foodStock,foodObj;
var addFood,fedTime,lastFed;

function preload()
{
  dogImg = loadImage("images/dogImg1.png")
  happyDogImg = loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  //to create dog
  dog = createSprite(800,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  foodObj = new Food();

  //button to feed dog, goes to the feed dog funcion
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  //button to add food, goes to the add food function
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw(){
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  //to show when the dog was last fed
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed: " + lastFed%12+ "PM" , 350,30);
  } else if(lastFed==0){
    text("Last Fed: 12 AM" , 350,30);
  } else{
    text("Last Fed: " + lastFed + "AM", 350,30)
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
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}