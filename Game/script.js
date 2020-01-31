const world = document.querySelector(".world");
const superDog = document.querySelector('.superDog');
const startGameButton = document.querySelector("#start_btn");
const instructionButton = document.querySelector("#instruction_btn");
const rankingButton = document.querySelector("#ranking_btn");
const instructionContainer = document.querySelector(".instruction");
const rankingContainer = document.querySelector(".ranking");
const scoreElement = document.querySelector(".score")

rankingButton.addEventListener("click", () => rankingContainer.style.display = "block");
instructionButton.addEventListener("click", () => instructionContainer.style.display = "block");

class World {
    constructor() {
        this.width = parseInt(window.getComputedStyle(world).width);
        this.height = parseInt(window.getComputedStyle(world).height);
        this.lastTotalTime = 0;
    }

    clickedButton() {
        startGameButton.addEventListener("click", () => game.startGame())
    }

    getRandom() {
        return parseInt(Math.random() * (gameWorld.width - 75));
    }
    startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }
}

class Game {
    constructor() {
        this.gameStarted = false;
        this.startTime = null;
        this.lastFrame = 0;
        this.cats = [];
        this.score = 0;
    }

    startGame() {
        this.gameStarted = true;
        this.startTime = new Date().getTime();
        document.getElementById("startPage").style.display = "none";
        document.getElementById("game-container").style.display = "flex";
        const display = document.querySelector('#time');
        const startTime = 120;
        gameWorld.startTimer(startTime, display);
        player.handlePlayerMovement();
        this.generateCats();
        requestAnimationFrame(this.update.bind(this));
        //requestAnimationFrame(gameWorld.render.bind(gameWorld));
    }

    generateCats() {
        setInterval(() => {
            const fallingCat = new Cat(gameWorld.getRandom(), 0, 75, 75, 50);
            const node = document.createElement("div");
            node.classList.add("falling-cat");
            node.style.left = fallingCat.x + "px";
            node.style.top = fallingCat.y + "px";
            fallingCat.node = node;
            world.appendChild(node);
            this.cats.push(fallingCat);
        }, 1000);
    }

    update(totalTime) {
        if (!this.lastFrame)
            this.lastFrame = totalTime;

        const dt = (totalTime - this.lastFrame) / 1000; //delta time in seconds
        this.lastFrame = totalTime;

        this.moveCats(dt);

        let toRemove = [];

        this.cats.forEach((cat, idx) => {
            if (cat.isDead) {
                cat.node.classList.add('dead-cat');
                toRemove.push(idx);
                cat.node.style.opacity = '0';
                setTimeout(() => {
                    world.removeChild(cat.node);
                }, 2000);
            }
            else if (cat.isRescued) {
                cat.node.classList.add('rescued-cat');
                game.scoreWhenCollison()
                toRemove.push(idx);
                cat.node.style.opacity = '0';
                //dodajemy tu doliczanie punktu
                setTimeout(() => {
                    world.removeChild(cat.node);
                }, 2000);
            }
        });
        this.cats = this.cats.filter((cat, idx) => toRemove.indexOf(idx) < 0);

        requestAnimationFrame(this.update.bind(this));
    }

    moveCats(dt) {
        this.cats.forEach(cat => {
            cat.updateCatPosition(dt);
            this.checkCollision(cat);
        });
    }

    checkCollision(cat) {
        if (cat.x < player.x + player.width &&
            cat.x + cat.width > player.x &&
            cat.y < player.y + player.height / 2 - 40 &&
            cat.y + cat.height > player.y + player.height / 2 + 10) {

            cat.speed = 0;
            cat.isRescued = true;
        }
        else if (cat.y >= 710) {//player.y + player.height / 2
            cat.speed = 0;
            cat.isDead = true;
        }
    }

    scoreWhenCollison() {
        this.score += 1
        scoreElement.innerText = `Punkty: ${this.score}`;
    }

    finishGame() {
        gameFinished = true;
        this.stopCatsGeneration();
        this.showGameOver();    
    }
}

class GameObject {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
}

class Player extends GameObject {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.dogJumpingSpeedY = 200;
        this.dogJumpingSpeedX = 50;
    }
    handlePlayerMovement() {
        window.addEventListener('keydown', event => {
            if (event.code === 'ArrowRight') {
                this.x += Math.min(gameWorld.width - this.width - this.x, this.speed);
                superDog.style.transform = 'scaleX(-1)'
            } else if (event.code === 'ArrowLeft') {
                this.x -= Math.min(this.x, this.speed);
                superDog.style.transform = 'scaleX(1)'
            }
            superDog.style.left = `${this.x}px`;
        });
        window.addEventListener('keydown', event => {
            if (event.code === 'Enter' && superDog.style.transform === 'scaleX(-1)' && this.y === 630 && this.x + this.width + this.dogJumpingSpeedX < gameWorld.width) {
                this.y -= this.dogJumpingSpeedY;
                this.x += this.dogJumpingSpeedX;
                superDog.style.top = `${this.y}px`;
                superDog.style.left = `${this.dogX}px`;
            }
            if (event.code === 'Enter' && superDog.style.transform === 'scaleX(1)' && this.y === 630 && this.x + this.dogJumpingSpeedX > 0) {
                this.y -= this.dogJumpingSpeedY;
                this.x -= this.dogJumpingSpeedX;
                superDog.style.top = `${this.y}px`;
                superDog.style.left = `${this.x}px`;
            }
        });
        window.addEventListener('keyup', event => {
            if (event.code === 'Enter' && this.y === 430) {
                this.y += this.dogJumpingSpeedY;
                superDog.style.top = `${this.y}px`;
            }
        });
    }
    }


class Cat extends GameObject {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.node = null;
        this.isDead = false;
        this.isRescued = false;
    }
    updateCatPosition(dt) {
        this.y += this.speed * dt;
        this.node.style.top = this.y + 'px';
    }

}

const gameWorld = new World();
const game = new Game();

const player = new Player(0, 630, 256, 160, 10);
gameWorld.clickedButton();