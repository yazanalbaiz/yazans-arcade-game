class Enemy {
    constructor(x, y, speed, sprite = 'images/enemy-bug.png') {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = sprite;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        //Moves the enemy according to the speed 
        this.x += this.speed * dt;

        //Checks if the enemy has left the cobblestones and resets them
        if(this.x > 500){
            this.x = -100;
            //Change the speed randomly each time
            //Math.ceil proved to be better than floor which is the norm
            this.speed = Math.ceil(Math.random() * this.speed) + 100;
        }
        //Collision test after every update
        if(this.y === player.y){
            if(this.x > player.x - 50 && this.x < player.x + 50){  
                player.resetGame(100, 'loss');
            }
        }

    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method

//The Player class is a subclass of Enemy since it shares most it's props and methods
class Player extends Enemy {
    constructor(x, y, speed = 0, sprite = 'images/char-horn-girl.png') {
        super(x, y, speed, sprite);
        this.score = 0;
    }
    update(dt) {
        //Override the parent's function so the player won't
    }

    //Moves the player according to the key pressed and doesn't if it'll leave canvas
    handleInput(key) {
        if(key === 'left') {
            if(this.x > 2){
                this.x -= 100;
            }
        }
        else if(key === 'up') {
            if(this.y > -60){
                this.y -= 85;
            }
        }
        else if(key === 'right') {
            if(this.x < 402) {
                this.x += 100;
            }
        }
        else if(key === 'down') {
            if(this.y < 390) {
                this.y += 85;
            }
        }
    }
    //Resets the position of the player when called after an offset 'ms'
    resetGame(ms, status) {
        setTimeout(() => {
            this.y = 400;
            this.x = 202;
        }, ms);
        if(status === 'loss'){
            this.score =0;

            document.getElementById('score-span').innerHTML = this.score;
            document.getElementById('status').classList.remove('won');
            document.getElementById('status').classList.add('lost');
            document.getElementById('status').innerHTML = 'You lost >:(';

            setTimeout(() => {
                document.getElementById('status').innerHTML = '';
            }, 1000);
        }
        else if(status === 'won'){
            this.score++;

            document.getElementById('score-span').innerHTML = this.score;
            document.getElementById('status').classList.remove('lost');
            document.getElementById('status').classList.add('won');
            document.getElementById('status').innerHTML = 'You won :)';

            setTimeout(() => {
                document.getElementById('status').innerHTML = '';
            }, 1000);
        }
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

//Enemy starting locations are 80 Ys apart
const enemyYs = [60, 145, 230];
let i = 0;
const allEnemies = enemyYs.map(y => {
    let e = new Enemy(0, y, 200);
    return e;
});
i = 0;
// Place the player object in a variable called player
const player = new Player(202, 400);




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

    // Winning the game
    if(player.y === -25){
        player.resetGame(500, 'won');
    }
});
