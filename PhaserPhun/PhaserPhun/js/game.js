var game = new Phaser.Game(800,600,Phaser.CANVAS,'',
                           {
                               preload: preload,
                               create: create,
                               update: update
                           }
                        );
// load in game assets

var sprite, group, b, elves, stateText, music;
var score = 0;
var scoreString = '';
var scoreText;


function preload(){
    //game.load.atlasJSONHash('inch','assets/inchy.png','assets/inchy.json');
    //game.load.atlasJSONHash('inch','assets/golden.png','assets/golden.js');
    game.load.audio('goldenAxe',
                    ['assets/GoldenAxe.mp3','assets/GoldenAxe.ogg'] 
                     );
    
    game.load.image('background', 'assets/background.png');

    game.load.atlasJSONHash('walk',
                            'assets/walk.png',
                            'assets/walk.js');
    
    game.load.atlasJSONHash('elf',
                         'assets/elves.png',
                           'assets/elves.js');
    
}

//setup game entities
function create(){
    //background
    b = game.add.sprite(0, 0,'background');
    //score
    
    music = game.add.audio('goldenAxe',10, true );
    music.play();



    //protag
    sprite = game.add.sprite(400,535,'walk');
    sprite.animations.add('idle');
    sprite.animations.play('idle',5,true);
    sprite.anchor.setTo(.5,0);
    sprite.body.collideWorldBounds = true;
    sprite.body.immovable = true;

    
    group = game.add.group();
   // group.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
    scoreString = 'Score : ';
    scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    
    stateText = game.add.text(game.world.centerX,game.world.centerY,'',{fontSize : '84px',fill : '#fff'});
    stateText.anchor.setTo(0.5,0.5);
    stateText.visible=false;
    
    
   
}

//game logic ~30 fps
function update(){
    
    if(Math.random()<.01){
        elves = group.create(Math.random()*800,0,'elf');
        elves.animations.add('idle');
        elves.animations.play('idle',5,true);
        elves.body.bounce.setTo(1, 1);
        elves.acceleration.y = 25;
    }
        group.forEach(function(hb) {
        if(hb.y > 600) {
            gameOver();
        }
    })

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
         {
            sprite.x -= 6;
            sprite.scale.x = -1;
        }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        sprite.x += 6;
        sprite.scale.x = 1;
    }

    game.physics.collide(
                        sprite,group,catchElf,
        null,this
    );
    
    
}
function catchElf(walk,elf){
    elf.kill();
    score ++;
    scoreText.text =  scoreString + score.toString();
}
function gameOver(){
    
    //game over
    sprite.kill();
    group.callAll('kill');
    stateText.text=" GAME OVER!!! \n Your Score "+score;
    stateText.visible = true;
}
 
