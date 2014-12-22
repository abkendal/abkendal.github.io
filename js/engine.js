/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 */

// Global variables relating to game states
var playerLives = 3;
var playerScore = 0;

var winTrue = 0;
var gameEnd = 0;
var currentLevel = 1;
var levelClear = 0;
var keyObtained = 0;
var splashState = 1;
var key2Obtained = 0;
var key3Obtained = 0;
var key4Obtained = 0;
var key5Obtained = 0;
var key6Obtained = 0;
var blueGemObtained = 0;
var blueGem2Obtained = 0;
var frozen = 0;
var heartObtained = 0;


var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.setAttribute("id", "canvasID");
    canvas.width = 459;
    canvas.height = 500;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/rsz-water-block.png',   // Top row is water
                'images/rsz-stone-block.png',   // Row 1 of 3 of stone
                'images/rsz-stone-block.png',   // Row 2 of 3 of stone
                'images/rsz-stone-block.png',
                'images/rsz-grass-block.png',
                'images/rsz-stone-block.png',   // Row 1 of 3 of stone
                'images/rsz-stone-block.png',   // Row 2 of 3 of stone
                'images/rsz-stone-block.png',   // Row 3 of 3 of stone
                'images/rsz-grass-block.png',   // Row 1 of 2 of grass
                'images/rsz-grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 10,
            numCols = 9,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 51, row * 42);
            }
        }
        // Clears the top of the canvas
        ctx.clearRect(0, 0, canvas.width, 25);
        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */

         //Renders the heart as long as it has not been obtained 
         if (heartObtained === 0) {
            heart.render();
         }

         // Renders the blue gems as long as they have not been obtained
        if (blueGemObtained === 0) {
            bluegem.render();
        }
        if (blueGem2Obtained === 0) {
            bluegem2.render();
        }

         // Renders they key as long as it has not been obtained
        if (keyObtained === 0) {
            gamekey.render();
        }
        if (key2Obtained === 0) {
            gamekey2.render();
        }
        if (key3Obtained === 0) {
            gamekey3.render();
        }
        if (key4Obtained === 0) {
            gamekey4.render();
        }
        if (key5Obtained === 0) {
            gamekey5.render();
        }
        if (key6Obtained === 0) {
            gamekey6.render();
        }
        

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
        lives.render(playerLives);
        leveldisplay.render(currentLevel)
        

        // If the player runs out of lives, they will receive a Game Over and the game will end.
        if (playerLives === 0){
            gameover.render();
            gameEnd=1;

        }

        // The player beats the level when they have obtained the key and are located in
        // the top row. After 5 levels the player wins the game
        if (winTrue === 1 && keyObtained === 1 && key2Obtained === 1 && key3Obtained === 1 && key4Obtained === 1 && key5Obtained === 1 & key6Obtained === 1){
            levelclear.render();
            levelClear = 1;
        }
        if (winTrue === 1 && keyObtained === 1 && key2Obtained === 1 && key3Obtained === 1 && key4Obtained === 1 && key5Obtained === 1 & key6Obtained === 1 && currentLevel === 5){
            gamewin.render();
            gameEnd = 1;
        }
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */

    // Creates some global variables for lives, score and winTrue. winTrue tells game 
    // when the player has reached the goal area/top row. KeyObtained tells the game
    // if the player has obtained the key yet. gameEnd tells the game to no longer 
    // respond to keyboard inputs.  
    function reset() {
        
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/rsz-stone-block.png',
        'images/rsz-water-block.png',
        'images/rsz-grass-block.png',
        'images/rsz-enemy-bug.png',
        'images/rsz-char-boy.png',
        'images/rsz-char-boy-frozen.png',
        'images/rsz-Key.png',
        'images/rsz-Gem-Blue.png',
        'images/rsz-Gem-Orange.png',
        'images/rsz-Heart.png',
        'images/rsz-0.png',
        'images/rsz-1.png',
        'images/rsz-2.png',
        'images/rsz-3.png',
        'images/rsz-4.png',
        'images/rsz-5.png',
        'images/rsz-6.png',
        'images/rsz-7.png',
        'images/rsz-8.png',
        'images/rsz-9.png',
        'images/gameover.png',
        'images/gameover2.png',
        'images/youwin.png',
        'images/levelClearflat.png',
        'images/level1.png',
        'images/level2.png',
        'images/level3.png',
        'images/level4.png',
        'images/level5.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
