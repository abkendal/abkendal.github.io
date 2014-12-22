// Enemies our player must avoid. Enemy takes two arguments which specify where on the screen
// the enemy will be created.
var Enemy = function(x, y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/rsz-enemy-bug.png';
    
    this.x = x;
    this.y = y;

    // Saves the initial x location for later reference
    this.initialx = x;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // The speed of the enemy is dependent on the speed multiplier specific to each enemy subclass
    xmove = dt * 100 * this.speed;
    this.x = this.x + xmove;

    // Once moving off the screen,  the enemy will be moved back to its initial x location
    if (this.x > 900) {
        this.x = -100;
    }

    // Here is the collision detection. If the enemy collides with the player, the player will be sent back 
    // to the starting location.
    if (player.y === this.y && this.x + 42> player.x && this.x < player.x + 21) {
        player.x = 203;
        player.y = 362;
        frozen = 0;
        player.sprite = 'images/rsz-char-boy.png';
        
        // Lose a life every time the player collides with an enemy
        playerLives = playerLives - 1;
        
        // When the player has no more lives, apply the game over state.    
        if (playerLives === 0) {
            gameover.render();
        }
        console.log("You have " + playerLives + " lives.");
        console.log(playerScore);
    }
    //if (player.y === this.y && player.y + 83 > this.y && this.x + 83> player.x && this.x < player.x + 42) {
    //    player.x = 402;
    //    player.y = 629;
    //};
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Create the slowest subclass of Enemy. 
var SlowEnemy = function (x, y, level) {
    Enemy.call(this,x, y);
    this.speed = this.speed * level * 0.5;
};
SlowEnemy.prototype = Object.create(Enemy.prototype);
SlowEnemy.prototype.constructor = SlowEnemy;
SlowEnemy.prototype.speed = 1;

//Create medium speed subclass of Enemy.
var MedEnemy = function (x, y, level) {
    Enemy.call(this, x, y);
    this.speed = this.speed * level * 0.5;
};
MedEnemy.prototype = Object.create(Enemy.prototype);
MedEnemy.prototype.constructor = MedEnemy;
MedEnemy.prototype.speed = 1.5;

//Create the fastest subblass of Enemy.
var FastEnemy = function(x, y, level) {
    Enemy.call(this, x, y);
    this.speed = this.speed * level * 0.4;
};
FastEnemy.prototype = Object.create(Enemy.prototype);
FastEnemy.prototype.constructor = FastEnemy;
FastEnemy.prototype.speed = 3;




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/rsz-char-boy.png';
    // This sets the starting location for the player    
    this.x = 203;
    this.y = 362;
}
Player.prototype.update = function() {
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
    // This checks to see if the player is in the top/winning row
    if (this.y < 25) {
        winTrue = 1;
    }
    if (this.y > 25) {
        winTrue = 0;
    }
    
}

//Update location based on keyboard inputs and prevents the player from going off the side of the canvas
Player.prototype.handleInput = function(key) { 
    switch(key) {
        case 'left':
            this.x = this.x - 51;
            if (this.x < -1) {
                this.x = -1;
            }
            break;
        case 'up':
            this.y = this.y - 42;
            if (this.y < -16){
                this.y = -16;
            }
            break;
        case 'right':
            this.x = this.x + 51;
            if (this.x > 407) {
                this.x = 407;
            }
           break;
        case 'down':
            this.y = this.y + 42;
            if (this.y > 362) {
                this.y = 362;
            }
        default:
            break;
    }
    console.log(this.x, this.y)

    // If the player can obtain the key by colliding with it
    if (gamekey.y === this.y && gamekey.x === this.x) {
        keyObtained = 1;
    }
    if (gamekey2.y === this.y && gamekey2.x === this.x) {
        key2Obtained = 1;
    }
    if (gamekey3.y === this.y && gamekey3.x === this.x) {
        key3Obtained = 1;
    }
    if (gamekey4.y === this.y && gamekey4.x === this.x) {
        key4Obtained = 1;
    }
    if (gamekey5.y === this.y && gamekey5.x === this.x) {
        key5Obtained = 1;
    }
    if (gamekey6.y === this.y && gamekey6.x === this.x) {
        key6Obtained = 1;
    }
    if (bluegem.y === this.y && bluegem.x === this.x) {
        blueGemObtained = 1;
        frozen = 1;
        player.sprite = 'images/rsz-char-boy-frozen.png'
        bluegem.x = 9999;
        bluegem.y = 9999;
    }
    if (bluegem2.y === this.y && bluegem2.x === this.x) {
        blueGem2Obtained = 1;
        frozen = 1;
        player.sprite = 'images/rsz-char-boy-frozen.png'
        bluegem2.x = 9999;
        bluegem2.y = 9999;
    }
    if (heart.y === this.y && heart.x === this.x) {
        heartObtained = 1;
        playerLives = playerLives + 1;
    }
}

// Lives display class
var Lives = function () {
    this.x =410;
    this.y = 25;
}
//Lives.prototype.update = function (){};
Lives.prototype.render = function (num) {
        if (num === 0) {
        this.sprite = 'images/rsz-0.png';
    }
    else if (num === 1) {
        this.sprite = 'images/rsz-1.png';
    }
    else if (num === 2) {
        this.sprite = 'images/rsz-2.png';
    }
    else if (num === 3) {
        this.sprite = 'images/rsz-3.png';
    }
    else if (num === 4) {
        this.sprite = 'images/rsz-4.png';
    }
    else if (num === 5) {
        this.sprite = 'images/rsz-5.png';
    }
    else if (num === 6) {
        this.sprite = 'images/rsz-6.png';
    }
    else if (num === 7) {
        this.sprite = 'images/rsz-7.png';
    }
    else if (num === 8) {
        this.sprite = 'images/rsz-8.png';
    }
    else if (num === 9) {
        this.sprite = 'images/rsz-9.png';
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Level display class
var LevelDisplay = function () {
    this.x = 10;
    this.y = 25;
}

LevelDisplay.prototype.render = function (num) {
    if (num === 1) {
        this.sprite = 'images/level1.png';
    }
    else if (num === 2) {
        this.sprite = 'images/level2.png';
    }
    else if (num === 3) {
        this.sprite = 'images/level3.png';
    }
    else if (num === 4) {
        this.sprite = 'images/level4.png';
    }
    else if (num === 5) {
        this.sprite = 'images/level5.png';
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Game over display class
var GameOver = function () {
    this.x = 30;
    this.y = 120;
}
GameOver.prototype.render = function () {
    this.sprite = 'images/gameover.png';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Level in display class
var LevelClear = function () {
    this.x = 30;
    this.y = 120;
}

LevelClear.prototype.render = function () {
    this.sprite = 'images/levelClearflat.png';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Game win display class
var GameWin = function () {
    this.x = 285;
    this.y = 380;
}
GameWin.prototype.render = function () {
    this.sprite = 'images/youwin.png';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Creates a key that must be obtained before being able to win the game.
var Key = function (x, y) {
    this.x = x;
    this.y = y;
}
Key.prototype.render = function (){
    this.sprite = 'images/rszKey.png';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Gems that the player must either avoid or pick up for extra points
var Gem = function (x, y) {
    this.x = x;
    this.y = y;
}
Gem.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Blue Gem subclass - freezes the player when obtained
var BlueGem = function (x, y) {
    Gem.call(this,x, y);
};
BlueGem.prototype = Object.create(Gem.prototype);
BlueGem.prototype.constructor = BlueGem;
BlueGem.prototype.sprite = 'images/rszGem-Blue.png';

// Hearts that a player can pick up to gain an extra life
var Heart = function (x, y) {
    this.x = x;
    this.y = y;
}
Heart.prototype.render = function (){
    this.sprite = 'images/rszHeart.png';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Reloads the browser when the game ends
var RestartGame = function (){
    location.reload();
}

// Resets the initial state for the new level
var NewLevel = function () {
    //playerLives = 3;
    winTrue = 0;
    gameEnd = 0;
    levelClear = 0;
    keyObtained = 0;
    key2Obtained = 0;
    key3Obtained = 0;
    key4Obtained = 0;
    key5Obtained = 0;
    key6Obtained = 0;
    blueGemObtained = 0;
    blueGem2Obtained = 0;
    frozen = 0;
    heartObtained = 0;
    player.x = 203;
    player.y = 362;
    currentLevel = currentLevel + 1;
    NewKeys();
    NewEnemies();
    NewGems();
    NewHeart();
} 

// Sets new key locations
var NewKeys =  function () {
    randx = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    keyx = -1 + (randx * 51);
    randy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    keyy = -16 + (randy * 42);

    randx2 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    keyx2 = -1 + (randx2 * 51);
    randy2 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    keyy2 = -16 + (randy2 * 42);

    randx3 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    keyx3 = -1 + (randx3 * 51);
    randy3 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    keyy3 = -16 + (randy3 * 42);

    randx4 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    keyx4 = -1 + (randx4 * 51);
    randy4 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    keyy4 = 152 + (randy4 * 42);

    randx5 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    keyx5 = -1 + (randx5 * 51);
    randy5 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    keyy5 = 152 + (randy5 * 42);

    randx6 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    keyx6 = -1 + (randx6 * 51);
    randy6 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    keyy6 = 152 + (randy6 * 42);

    gamekey = new Key(keyx, keyy);
    gamekey2 = new Key(keyx2, keyy2);
    gamekey3 = new Key(keyx3, keyy3);
    gamekey4 = new Key(keyx4, keyy4);
    gamekey5 = new Key(keyx5, keyy5);
    gamekey6 = new Key(keyx6, keyy6);
}

var NewEnemies = function () {
    top1 = new FastEnemy (250, 26, currentLevel);
    top2 = new FastEnemy (-250, 26, currentLevel);
    mid1 = new MedEnemy (100, 68, currentLevel);
    mid2 = new MedEnemy (-200, 68, currentLevel);
    mid3 = new MedEnemy (-500, 68, currentLevel);
    bot1 = new SlowEnemy (250, 110, currentLevel);
    bot2 = new SlowEnemy (-250, 110, currentLevel);

    top21 = new FastEnemy (400, 194, currentLevel);
    top22 = new FastEnemy (-100, 194, currentLevel);
    mid21 = new MedEnemy (250, 236, currentLevel);
    mid22 = new MedEnemy (-50, 236, currentLevel);
    mid23 = new MedEnemy (-350, 236, currentLevel);
    bot21 = new SlowEnemy (200, 278, currentLevel);
    bot22 = new SlowEnemy (-300, 278, currentLevel);
    allEnemies = [top1, top2, mid1, mid2, mid3, bot1, bot2, top21, top22, mid21, mid22, mid23, bot21, bot22];

}

var NewGems = function () {
    bgrandx = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    bgx = -1 + (bgrandx * 51);
    bgrandy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    bgy = -16 + (bgrandy * 42);

    bg2randx = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    bg2x = -1 + (bg2randx * 51);
    bg2randy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    bg2y = 152 + (bg2randy * 42);


    bluegem = new BlueGem(bgx, bgy);
    bluegem2 = new BlueGem(bg2x, bg2y);
}

var NewHeart = function () {
    hrandx = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    heartx = -1 + (hrandx * 51);
    hrandy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    hearty = -16 + (hrandy * 42);
    var heart = new Heart(heartx, hearty);

}
// Now instantiate your objects.
// Each enemy has a variable starting location. The variation in x axis starting locations creates
// the enemy asynchrony. 

var top1 = new FastEnemy (250, 26, currentLevel);
var top2 = new FastEnemy (-250, 26, currentLevel);
var mid1 = new MedEnemy (100, 68, currentLevel);
var mid2 = new MedEnemy (-200, 68, currentLevel);
var mid3 = new MedEnemy (-500, 68, currentLevel);
var bot1 = new SlowEnemy (250, 110, currentLevel);
var bot2 = new SlowEnemy (-250, 110, currentLevel);

var top21 = new FastEnemy (400, 194, currentLevel);
var top22 = new FastEnemy (-100, 194, currentLevel);
var mid21 = new MedEnemy (250, 236, currentLevel);
var mid22 = new MedEnemy (-50, 236, currentLevel);
var mid23 = new MedEnemy (-350, 236, currentLevel);
var bot21 = new SlowEnemy (200, 278, currentLevel);
var bot22 = new SlowEnemy (-300, 278, currentLevel);



// Place all enemy objects in an array called allEnemies
var allEnemies = [top1, top2, mid1, mid2, mid3, bot1, bot2, top21, top22, mid21, mid22, mid23, bot21, bot22];

var player = new Player();
var lives = new Lives();
var gameover = new GameOver();
var gamewin = new GameWin();
var levelclear = new LevelClear();
var leveldisplay = new LevelDisplay();

// Creates a random location on the track for the keys
// and gems to be generated
var randx = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var keyx = -1 + (randx * 51);
var randy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var keyy = -16 + (randy * 42);

var randx2 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var keyx2 = -1 + (randx2 * 51);
var randy2 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var keyy2 = -16 + (randy2 * 42);

var randx3 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var keyx3 = -1 + (randx3 * 51);
var randy3 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var keyy3 = -16 + (randy3 * 42);

var randx4 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var keyx4 = -1 + (randx4 * 51);
var randy4 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var keyy4 = 152 + (randy4 * 42);

var randx5 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var keyx5 = -1 + (randx5 * 51);
var randy5 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var keyy5 = 152 + (randy5 * 42);

var randx6 = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var keyx6 = -1 + (randx6 * 51);
var randy6 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var keyy6 = 152 + (randy6 * 42);

var bgrandx = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var bgx = -1 + (bgrandx * 51);
var bgrandy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var bgy = -16 + (bgrandy * 42);

var bg2randx = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var bg2x = -1 + (bg2randx * 51);
var bg2randy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var bg2y = 152 + (bg2randy * 42);

var hrandx = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
var heartx = -1 + (hrandx * 51);
var hrandy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
var hearty = -16 + (hrandy * 42);

var gamekey = new Key(keyx, keyy);
var gamekey2 = new Key(keyx2, keyy2);
var gamekey3 = new Key(keyx3, keyy3);
var gamekey4 = new Key(keyx4, keyy4);
var gamekey5 = new Key(keyx5, keyy5);
var gamekey6 = new Key(keyx6, keyy6);
var bluegem = new BlueGem(bgx, bgy);
var bluegem2 = new BlueGem(bg2x, bg2y);
var heart = new Heart(heartx, hearty);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
            var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
    if (splashState === 1) {
        $("#SplashScreen").hide();
        $("#canvasID").show();
        splashState = 0;
    }
    else if (splashState === 0 && gameEnd === 0 && frozen === 0) {

        player.handleInput(allowedKeys[e.keyCode]);
    }
    else if (gameEnd === 1){
        RestartGame();
    };
    if (levelClear === 1) {
        NewLevel();
    }
});    