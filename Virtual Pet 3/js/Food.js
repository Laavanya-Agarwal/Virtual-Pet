class Food {
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image=loadImage('images/Milk.png');
    }
    
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFoodStock(){
        if(this.foodStock<0){
            this.foodStock = 0
            alert("Sorry, no food left, please add some food")
        }
        return this.foodStock;
    }

    display(){
        background(46,139,87);
        
        fill(255,255,254);
        textSize(15);
        if (lastFed>=12){
            text('Last Fed: ' + lastFed%12 + "PM", 50, 30);
        } else if (lastFed==0){
            text('Last Fed: 12 AM', 50, 30);
        }else{
            text('Last Fed: ' + lastFed + 'AM', 50, 30);
        }
        var x = 70, y = 100;

        imageMode(CENTER);

        if(this.foodStock!=0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 70;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }}}

    //to add the bedroom, garden, and washroom
    bedroom(){
        background(bedroom,1000,400);
    }
    garden(){
        background(garden,1000,400);
    }
    washroom(){
        background(washroom,1000,400);
    }
    livingRoom(){
        background(livingRoom,1000,400);
    }
    lazy(){
        background(lazy,1000,400);
    }
}