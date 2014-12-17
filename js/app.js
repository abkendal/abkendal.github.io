// Enemies our player must avoid. Enemy takes two arguments which specify where on the screen
// the enemy will be created.
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;

    // Saves the initial x location for later reference
    this.initialx = x;
    this.y = y;
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
    
    // Once moving off the screen a sufficient distance to the right,  it will be moved back to its initial x axis location
    if (this.x > 700) {
        this.x = this.initialx;
    }

    // Here is the collision detection. If the enemy collides with the player, the player will be sent back 
    // to the starting location.
    if (player.y < this.y && player.y + 83 > this.y && this.x + 83> player.x && this.x < player.x + 101) {
        player.x = 200;
        player.y = 380;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Create the slowest subclass of Enemy. 
var SlowEnemy = function (x, y) {
    Enemy.call(this,x, y);
};
SlowEnemy.prototype = Object.create(Enemy.prototype);
SlowEnemy.prototype.constructor = SlowEnemy;
SlowEnemy.prototype.speed = 1;

//Create medium speed subclass of Enemy.
var MedEnemy = function (x, y) {
    Enemy.call(this, x, y);
};
MedEnemy.prototype = Object.create(Enemy.prototype);
MedEnemy.prototype.constructor = MedEnemy;
MedEnemy.prototype.speed = 2;

//Create the fastest subblass of Enemy.
var FastEnemy = function(x, y) {
    Enemy.call(this, x, y);
};
FastEnemy.prototype = Object.create(Enemy.prototype);
FastEnemy.prototype.constructor = FastEnemy;
FastEnemy.prototype.speed = 3;




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    // This sets the starting location for the player    
    this.x = 200;
    this.y = 380;
}
Player.prototype.update = function() {
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
}

//Update location based on keyboard inputs and prevents the player from going off the side of the canvas
Player.prototype.handleInput = function(key) { 
      this.render();
    switch(key) {
        case 'left':
            this.x = this.x - 101;
            if (this.x < -2) {
                this.x = -2;
            }
            break;
        case 'up':
            this.y = this.y - 83;
            if (this.y < -35){
                this.y = -35;
            }
            break;
        case 'right':
            this.x = this.x + 101;
            if (this.x > 404) {
                this.x = 404;
            }
           break;
        case 'down':
            this.y = this.y + 83;
            if (this.y > 380) {
                this.y = 380;
            }
        default:
            break;
    }
}

 
// Now instantiate your objects.
// Each enemy has a variable starting location. The variation in x axis starting locations creates
// the enemy asynchrony. 

var topSlow1 = new SlowEnemy (-75, 50);
var topMed1 = new MedEnemy (-200, 50);
var topFast1 = new FastEnemy (-300, 50);
var midMed1 = new MedEnemy(-175, 133);
var midFast1 = new FastEnemy (-150, 133);
var botSlow1 = new SlowEnemy (-300, 216);
var botFast1 = new FastEnemy (-500, 216);

// Place all enemy objects in an array called allEnemies
var allEnemies = [topSlow1, midMed1, topFast1, midFast1, botSlow1, botFast1];

// Place the player object in a variable called player
var player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
