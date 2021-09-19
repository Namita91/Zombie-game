var bgImg,bg;
var bulletCount = 10;
var zombieKilled = 0;
var gameState = "start"; 
var bullet,bulletImg,bulletGroup;
var firing, firingImg, gun, gunGroup;
var gameOverImg,gameOver;
var start1,start2,howToPlay,instruction;
var reload = new Audio('sounds/reload.mp3');
var gunSound = new Audio('sounds/gunshot.mp3');
var dyingSound = new Audio('sounds/dying.mp3');
var player, playerImg, dyingImg, knifeImg, jumpingImg;
var zombie1, zombie1Img, zombie2, zombie2Img, zombie3, zombie3Img,zombie4, zombie4Img, zombie5, zombie5Img, zombieGroup;

function preload(){
    bgImg = loadImage("images/bg.jpg");  
    firingImg = loadImage("images/firing.png");
    game = loadImage("images/zombieShooter.png");
    bulletImg = loadImage("images/bullets2.png");   
    gameOverImg = loadImage("images/gameover.png");
    playerStanding = loadAnimation("images/jump6.png")
    playerImg = loadAnimation("images/1.png","images/2.png","images/3.png","images/4.png","images/56.png");
    knifeImg = loadAnimation("images/knife1.png","images/knife2.png","images/knife3.png","images/knife4.png");
    dyingImg = loadAnimation("images/dying3.png","images/dying4.png","images/dying5.png","images/dying6.png");
    // dyingImg = loadAnimation("images/dying1.png","images/dying2.png","images/dying3.png","images/dying4.png","images/dying5.png","images/dying6.png");
    jumpingImg = loadAnimation("images/jump1.png","images/jump2.png","images/jump3.png","images/jump4.png","images/jump5.png","images/jump6.png");
    zombie1Img = loadAnimation("images/zombie11.png","images/zombie12.png","images/zombie13.png","images/zombie14.png","images/zombie15.png","images/zombie16.png");
    zombie2Img = loadAnimation("images/zombie21.png","images/zombie22.png","images/zombie23.png","images/zombie24.png","images/zombie25.png","images/zombie26.png","images/zombie27.png","images/zombie28.png","images/zombie29.png","images/zombie30.png");
    zombie3Img = loadAnimation("images/zombie31.png","images/zombie32.png","images/zombie33.png","images/zombie34.png","images/zombie35.png","images/zombie36.png","images/zombie37.png","images/zombie38.png","images/zombie39.png");
    zombie4Img = loadAnimation("images/zombie44.png","images/zombie45.png","images/zombie46.png","images/zombie47.png","images/zombie48.png","images/zombie49.png");
    zombie5Img = loadAnimation("images/zombie51.png","images/zombie52.png","images/zombie53.png","images/zombie54.png","images/zombie55.png","images/zombie56.png","images/zombie57.png","images/zombie58.png");
}

function setup(){
    createCanvas(1300,700);

    bg = createSprite(3000,350);
    bg.addImage(bgImg);
    bg.scale = 0.7;

    player = createSprite(150,530);
    player.addAnimation("plr", dyingImg);
    player.addAnimation('plr', jumpingImg);
    player.addAnimation("plr", knifeImg);
    player.addAnimation("plr", playerImg);
    player.addAnimation("plr", playerStanding);
    player.scale = 0.6;
    player.debug = false;
    player.setCollider("rectangle",0,40,250,340);

    ground = createSprite(300,640,600,20);
    ground.visible = false;
    upperGround = createSprite(300,220,500,20);
    upperGround.visible = false;

    bulletGroup = new Group();
    zombieGroup = new Group();
    gunGroup = new Group();

    howToPlay = createButton('HOW TO PLAY');
    howToPlay.position(540,460);
    howToPlay.style("height","30px");
    howToPlay.style("width","190px");
    howToPlay.style('font-size','21px');
    howToPlay.style('background','rgb(80, 255, 240)');
           
    start1 = createButton('PLAY');
    start1.position(540,520);
    start1.style("height","30px");
    start1.style("width","190px");
    start1.style('font-size','24px');
    start1.style('background','rgb(80, 255, 240)');

    gameOver = createSprite(630,300);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
}

function draw(){

    /*game states
    start = 1
    how to play = 2
    game = 3
    end = 4*/

    player.collide(ground);
    player.collide(upperGround);
    //gravity 
    player.velocity.y = player.velocity.y+0.6;

    if(gameState === "start" || gameState === "howPlay") {
        player.changeAnimation("plr",playerStanding);
    }
    else if(gameState === "game") {
        player.changeAnimation("plr",playerImg);
    } else {
        player.changeAnimation("plr",dyingImg);
    }

    if(gameState === "start"){
        background(50,140,140);
        player.changeAnimation("plr",playerStanding);
        
        // "s" key changes the game state
        // Note for Aishwarya: I think we can keep this in keyPressed function
        if(keyCode===83){
            gameState = "howPlay";
        }      
        start1.mousePressed(()=>{gameState = "game"});
        howToPlay.mousePressed(()=>{           
        gameState = "howPlay"
            
        })
        image(game,400,160,450,250);
    }

    if(gameState === "howPlay"){
        player.changeAnimation("plr",playerStanding);
        background(50,140,140);
        start1.hide();
        // start2.hide();
        howToPlay.hide();
        textSize(25);
        fill(0);
        text("!!!Be Careful!!!",560,320);
        text("You Are Entering In Zombie Game",430,350);
        text("Use X To         -  Use Knife",480,400)
        text("Use Space To     -  Shoot",480,450);
        text("Use UP Arrow To -  Jump",480,500);
        start2 = createButton('PLAY');
        start2.position(550,560);
        start2.style("height","30px");
        start2.style("width","190px");
        start2.style('font-size','26px');
        start2.style('background','rgb(80, 255, 240)');
        start2.mousePressed(()=>{
            start2.hide();
            start1.hide();
            gameState = "game";
        });
        image(game,400,25,450,250);
    }

    if(gameState === "game"){
        player.changeAnimation("plr",playerImg);
        bg.velocity.x = -(5+3*zombieKilled/15);
        if(bg.x<0){
           bg.x = bg.width/3;
        }

        //hiding the buttons when game starts
        start1.hide();
        start2.hide();
        howToPlay.hide();
        
        // player jumps to collect more bullets
        if(player.isTouching(bulletGroup)){
            bulletCount = bulletCount+5;
            bulletGroup[0].destroy();
            //load sound of bullet
            reload.play();
        }
     
        //zombie dies when hit by bullet and the kill count increases
        if(gunGroup.isTouching(zombieGroup)){
            zombieGroup[0].destroy();
            gunGroup[0].destroy();
            zombieKilled = zombieKilled+1;
        }
     
        //player dies when touches the zombies and game state changes to end
        if(player.isTouching(zombieGroup)){
            gameState = "end" ;
            dyingSound.play();
            player.changeAnimation("plr",dyingImg);
        }

        //to generate zombies and power bullets every few frames
         spawnzombie();
         spawnbullets();
    }

    if(gameState === "end"){
        bg.velocity.x = 0;
        bulletGroup.destroyEach();
        gameOver.visible = true;
        player.changeAnimation("plr",dyingImg);
    }

    
    
    drawSprites();

    //displaying bullet count and zombie killed count
    textSize(40);
    textFont("MV Boli");
    fill("yellow");
    text("Bullet Left : "+bulletCount,40,130);
    text("Zombie Killed: "+zombieKilled,920,130);

}

function gunshot(){
    gun = createSprite(player.x+80,player.y-40);
    gunSound.play();
    gun.addImage(firingImg);
    gun.scale = 0.2;
    gun.velocity.x = gun.velocity.x+25;
    bulletCount = bulletCount-1;
    gunGroup.add(gun);
    gun.debug = false;
    gun.setCollider("rectangle",100,0,250,50)
}

function spawnbullets(){ 
    if(frameCount%250===0){  
        bullet = createSprite(1000,300);
        bullet.addImage("bullet",bulletImg);
        bullet.scale = 0.4;
        bullet.velocity.x = -20;
        bulletGroup.add(bullet);
        bullet.debug = false;
    }
}

function spawnzombie(){
    if(frameCount%47 === 0){
        zombie1 = createSprite(1400,500);
        r1 = Math.round(random(1,5));
        switch(r1){
            case 1 : zombie1.addAnimation("zombie",zombie1Img);zombie1.scale = 1.3;zombie1.y=520;zombie1.setCollider("rectangle",0,0,70,140);
            break;
            case 2 : zombie1.addAnimation("zombie",zombie2Img);zombie1.scale = 0.58;zombie1.y=520;zombie1.setCollider("rectangle",15,0,100,300);
            break;
            case 3 : zombie1.addAnimation("zombie",zombie3Img);zombie1.scale = 1.1;zombie1.y=500;zombie1.setCollider("rectangle",10,0,50,200)
            break;
            case 4 : zombie1.addAnimation("zombie",zombie4Img);zombie1.scale = 0.5;zombie1.y=525;zombie1.setCollider("rectangle",-10,0,150,320);
            break;
            case 5 : zombie1.addAnimation("zombie",zombie5Img);zombie1.scale = 1;zombie1.y=520;zombie1.setCollider("rectangle",0,0,100,160)
            break;
            default : break;
        }
        zombie1.velocity.x = -(3+3*zombieKilled/15);
        zombieGroup.add(zombie1);
        zombie1.debug = false  ;
    }
}

function keyPressed(){
    if(gameState === "game"){
      if(keyCode===32 && bulletCount>0){
        gunshot();    
      }  
    }

    // Up arrow for making the player jump
    if(keyCode===38){
        player.velocity.y = player.velocity.y-15;
        player.changeAnimation("plr",jumpingImg);
        //player.scale = 1;
        //player.setCollider("rectangle",0,0,100,250);
    }

    // "x" key for knife animation
    if(keyCode===88){
        player.changeAnimation("plr",knifeImg);
        player.scale = 1;
        player.setCollider("rectangle",0,0,100,250);
    }
    
}
