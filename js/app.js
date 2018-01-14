// constant describing map grid
const COL_STEP    = 101
const ROW_STEP    = 83
const COL         = 5
const ROW         = 6

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= ROW*ROW_STEP) {
        this.x = 0;
    }
    // check collision
    if (this.isCollidedWithPosition(player.x, player.y))
    {
      // collision happens, reset player position
      player.lose+=1;
      player.reset_position();
      console.log(`Lose: ${player.lose} times`);
    }
};

Enemy.prototype.isCollidedWithPosition = function(x, y) {
    return Math.abs(this.x - x) < COL_STEP/2 && Math.abs(this.y - y) == 0;
}



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.win  = 0;
    this.lose = 0;
    this.sprite = 'images/char-boy.png';
};

// update player position when it hit the map edge
Player.prototype.update = function(dt) {
    if (this.x >= (COL-1)*COL_STEP) {
        this.x =  (COL-1)*COL_STEP;
    }
    if (this.x <= 0) {
        this.x =  0;
    }
    if (this.y >= (ROW-1)*ROW_STEP) {
        this.y =  (ROW-1)*ROW_STEP;
    }
    if (this.y < 0) {
        this.win += 1;
        this.reset_position();
        this.reset_enemies();
        document.querySelector("h1").textContent = `Level: ${this.win}`;
        console.log(`Win: ${this.win} times`);
    }
};

// reset player position
Player.prototype.reset_position = function() {
    this.x = (COL-1)/2*COL_STEP
    this.y = (ROW-1)*ROW_STEP
}

Player.prototype.reset_enemies = function() {
  // clear enemies
  allEnemies.length = 0;
  // create enemies according to winning times
  for (let i = 0; i <= this.win; i++)
  {
    var enemy = new Enemy(0, Math.floor(Math.random() * 4 + 1)*ROW_STEP, Math.random() * 256);
    allEnemies.push(enemy);
  }

}

// render player icon
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handler for key press
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= COL_STEP
    }
    if (keyPress == 'up') {
        this.y -= ROW_STEP;
    }
    if (keyPress == 'right') {
        this.x += COL_STEP;
    }
    if (keyPress == 'down') {
        this.y += ROW_STEP;
    }
    console.log('keyPress is: ' + keyPress);
};

// Now instantiate your objects.
// Place the player object in a variable called player
var player = new Player((COL-1)/2*COL_STEP, (ROW-1)*ROW_STEP);
// create enemy w. x = 0 y = row#0/1/2/3
var enemy = new Enemy(0, Math.floor(Math.random() * 4 + 1)*ROW_STEP, Math.random() * 256);
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
