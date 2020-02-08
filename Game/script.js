const world = document.querySelector(".world");
const superDog = document.querySelector(".superDog");
const scoreElement = document.querySelector(".score");
const display = document.querySelector("#time");
const nicknameButton = document.querySelector(".nickname-button");
const startTime = 120;



class WelcomeWindow {
    constructor() {
        this.closeCross = document.querySelectorAll(".close");
        this.instructionButton = document.querySelector("#instruction_btn");
        this.rankingButton = document.querySelector("#ranking_btn");
        this.startGameButton = document.querySelector("#start_btn");
        this.playAgainButton = document.querySelector("#play-again");
        this.instructionContainer = document.querySelector(".instruction");
        this.rankingContainer = document.querySelector(".ranking-after");
        this.startGameContainer = document.querySelector(".start_game");
        this.easyButton = document.querySelector(".easy");
        this.hardButton = document.querySelector(".hard");
    }
    closeWindow() {
        this.closeCross.forEach(cross => {
            cross.addEventListener("click", () => {
                this.rankingContainer.style.display = "none";
                this.instructionContainer.style.display = "none";
            })
        });
    }

    showWindow() {
        this.rankingButton.addEventListener("click", () => {
            this.rankingContainer.style.display = "block";
            this.rankingContainer.classList.remove("is-game-over");
            click.play();
        });
        this.instructionButton.addEventListener("click", () => {
            this.instructionContainer.style.display = "block";
            click.play();
        });
        this.startGameButton.addEventListener("click", () => {
            this.startGameContainer.style.display = "block";
            click.play();
        });
        this.playAgainButton.addEventListener("click", () => {
            document.location.reload();
            click.play();
        });
    }
}

class Ranking {
    constructor() {
        this.name = document.querySelector('.nickname-input');
        this.rankingAfter = document.querySelector('.ranking-after');

        this.easyNames = document.querySelectorAll(".table-easy .name");
        this.easyPoints = document.querySelectorAll(".table-easy .points");
        this.hardNames = document.querySelectorAll(".table-hard .name");
        this.hardPoints = document.querySelectorAll(".table-hard .points");
    }

    toLocalStorageEasy() {
        setTimeout(() => {
            game.name = document.querySelector(".nickname-input").value;
            let storedEasy = JSON.parse(localStorage.getItem('storedEasy'));
            if (!Array.isArray(storedEasy)) {
                storedEasy = [];
            };
            storedEasy.push({ name: game.name, score: game.score })
            storedEasy.sort((stored1, stored2) => {
                return stored2.score - stored1.score
            });
            localStorage.setItem("storedEasy", JSON.stringify(storedEasy.slice(0, 5)));
        }, 6000);
    }

    toLocalStorageHard() {
        setTimeout(() => {
            game.name = document.querySelector(".nickname-input").value;
            let storedHard = JSON.parse(localStorage.getItem('storedHard'));
            if (!Array.isArray(storedHard)) {
                storedHard = [];
            }
            storedHard.push({ name: game.name, score: game.score });
            storedHard.sort((stored1, stored2) => {
                return stored2.score - stored1.score
            })
            localStorage.setItem("storedHard", JSON.stringify(storedHard.slice(0, 5)));
        }, 6000);
    }


    getRanking() {
        let ranking = JSON.parse(localStorage.getItem('storedEasy'));
        if (!Array.isArray(ranking)) {
            ranking = [];
        }

        for (let i = 0; i < ranking.length; ++i) {
            this.easyNames[i].innerHTML = ranking[i].name;
            this.easyPoints[i].innerHTML = ranking[i].score;
        }

        ranking = JSON.parse(localStorage.getItem('storedHard'));
        if (!Array.isArray(ranking)) {
            ranking = [];
        }
        for (let i = 0; i < ranking.length; ++i) {
            this.hardNames[i].innerHTML = ranking[i].name;
            this.hardPoints[i].innerHTML = ranking[i].score;
        }
    }

    showRanking() {
        this.getRanking();
        this.rankingAfter.style.display = 'block';
    };
}

class World {
    constructor() {
        this.width = parseInt(window.getComputedStyle(world).width);
        this.height = parseInt(window.getComputedStyle(world).height);
        this.lastTotalTime = 0;
    }

    clickedButton() {
        welcomeWindow.easyButton.addEventListener("click", () => {
            game.startEasyGame()
            click.play();
        })
        welcomeWindow.hardButton.addEventListener("click", () => {
            game.startHardGame()
            click.play();
        })
    }

    getRandom() {
        return Math.random() * (gameWorld.width - 75);
    }
    startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        const intervalId = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                timer = duration;
                clearInterval(intervalId);
                game.finishGame();
            }
        }, 1000);
    }
}

class Game {
    constructor() {
        this.gameStarted = false;
        this.easyGameStarted = false;
        this.hardGameStarted = false;
        this.gameFinished = false;
        this.startTime = null;
        this.lastFrame = 0;
        this.cats = [];
        this.aeroplanes = [];
        this.score = 0;
        this.catGenerateIntervalId = null;
        this.aeroplaneGenerateIntervalId = null;
        this.catsIntervalTime = 3000;

        nicknameButton.addEventListener('click', event => {
            ranking.showRanking();
        });

        document.querySelector('.nickname-input').addEventListener('keypress', event => {
            if(event.code === 'Enter') {
                ranking.showRanking();
            }
        })
    }

    startGame() {
        this.gameStarted = true;
        this.gameFinished = false;
        gameMusic.play();
        this.startTime = new Date().getTime();
        document.getElementById("startPage").style.display = "none";
        document.getElementById("game-container").style.display = "flex";
        gameWorld.startTimer(startTime, display);
        player.handlePlayerMovement();
        this.generateCats();
        requestAnimationFrame(this.update.bind(this));
    }

    startEasyGame() {
        this.easyGameStarted = true;
        this.startGame();
    }

    startHardGame() {
        this.hardGameStarted = true;
        this.startGame();
        scoreElement.style.top = "55px";
        life.generateLife();
        this.generateAeroplanes();
    }

    generateCats() {
        this.catGenerateIntervalId = setInterval(() => {
            const fallingCat = new Cat(gameWorld.getRandom(), 0, 75, 75, 50);
            const node = document.createElement("div");
            node.classList.add("falling-cat");
            node.style.left = fallingCat.x + "px";
            node.style.top = fallingCat.y + "px";
            fallingCat.node = node;
            world.appendChild(node);
            this.cats.push(fallingCat);

            clearInterval(this.catGenerateIntervalId);
            if (this.catsIntervalTime > 505) {
                this.catsIntervalTime -= 20;
            }
            this.generateCats();
        }, this.catsIntervalTime);
    }

    generateAeroplanes() {
        this.aeroplaneGenerateIntervalId = setInterval(() => {
            const fallingAeroplane = new Aeroplane(gameWorld.getRandom(), 0, 75, 75, 60);
            const node = document.createElement("div");
            const classOfAeroplanes = ["url('img/aeroplane-one.png')", "url('img/aeroplane-two.png')", "url('img/aeroplane-three.png')"];
            let idx = Math.floor(Math.random() * classOfAeroplanes.length);
            node.classList.add("falling-aeroplane");
            node.style.backgroundImage = classOfAeroplanes[idx];
            node.style.left = fallingAeroplane.x + "px";
            node.style.top = fallingAeroplane.y + "px";
            fallingAeroplane.node = node;
            world.appendChild(node);
            this.aeroplanes.push(fallingAeroplane);
        }, 2000);
    }

    stopFallingObjectsGeneration() {
        clearInterval(this.catGenerateIntervalId);
        if (this.hardGameStarted) {
            clearInterval(this.aeroplaneGenerateIntervalId);
        }
    }

    update(totalTime) {
        if (!this.lastFrame)
            this.lastFrame = totalTime;

        const dt = (totalTime - this.lastFrame) / 1000; //delta time in seconds
        this.lastFrame = totalTime;

        this.moveObjects(dt, this.cats);

        let catsToRemove = [];

        this.cats.forEach((cat, idx) => {
            if (cat.isDead) {
                cat.node.classList.add('dead-cat');
                deadCatSound.play();
                catsToRemove.push(idx);
                cat.node.style.opacity = '0';
                setTimeout(() => {
                    world.removeChild(cat.node);
                }, 2000);
            }
            else if (cat.isRescued) {
                cat.node.classList.add('rescued-cat');
                game.scoreWhenCollison();
                rescuedCatSound.play();
                catsToRemove.push(idx);
                cat.node.style.opacity = '0';
                setTimeout(() => {
                    world.removeChild(cat.node);
                }, 2000);
            }
        });
        this.cats = this.cats.filter((cat, idx) => catsToRemove.indexOf(idx) < 0);

        if (this.hardGameStarted) {
            let aeroplanesToRemove = [];

            this.moveObjects(dt, this.aeroplanes);

            this.aeroplanes.forEach((aeroplane, idx) => {
                if (aeroplane.isRescued || aeroplane.isDead) {
                    aeroplanesToRemove.push(idx);
                    aeroplane.node.style.opacity = '0';
                    setTimeout(() => {
                        world.removeChild(aeroplane.node);
                    }, 1000)
                }
                if (aeroplane.isRescued) {
                    crashSound.play();
                    life.looseLife();
                }
            });
            this.aeroplanes = this.aeroplanes.filter((aeroplane, idx) => aeroplanesToRemove.indexOf(idx) < 0);
        }
        requestAnimationFrame(this.update.bind(this));
    }

    moveObjects(dt, array) {
        array.forEach(fallingObject => {
            if (this.gameFinished) {
                dt = 0
            }
            fallingObject.updatePosition(dt);
            this.checkCollision(fallingObject);
        });
    }

    checkCollision(fallingObject) {
        if (fallingObject.x < player.x + player.width &&
            fallingObject.x + fallingObject.width > player.x &&
            fallingObject.y < player.y + player.height / 2 - 30 &&
            fallingObject.y + fallingObject.height > player.y + player.height / 2 + 20) {

            fallingObject.speed = 0;
            fallingObject.isRescued = true;
        }
        else if (fallingObject.y >= player.y + player.height - 70) {
            fallingObject.speed = 0;
            fallingObject.isDead = true;
        }
    }

    scoreWhenCollison() {
        this.score += 1
        scoreElement.innerText = `Punkty: ${this.score}`;
    }

    finishGame() {
        this.gameFinished = true;
        this.gameStarted = false;
        this.stopFallingObjectsGeneration();
        this.showGameOver();
        this.hardGameStarted = false;
        gameMusic.pause();
        finishMusic.play();
        this.showNameContainer();
        if (this.easyGameStarted) {
            ranking.toLocalStorageEasy();
        }
        else {
            ranking.toLocalStorageHard();
        }
        ranking.rankingAfter.classList.add("is-game-over");
    }

    showNameContainer() {
        setTimeout(() => {
            const nameContainer = document.querySelector('.name-container');
            nameContainer.style.display = "flex";
        }, 2500);
    };

    showGameOver() {
        const gameoverContainer = document.getElementById('gameover');
        gameoverContainer.style.display = "block";
        gameoverContainer.innerHTML = "Game over!" + "<br/>" + "Zdobyłeś " + this.score + " punktów";
    }

    gameOver() {
        const gameoverContainer = document.getElementById('gameover');
        gameoverContainer.style.display = "block";
        this.gameFinished = true;
        this.gameStarted = false;
        this.stopFallingObjectsGeneration();
        this.showGameOver();
        this.hardGameStarted = false;
        gameMusic.pause();
        ranking.rankingAfter.classList.add("is-game-over");
        ranking.showRanking();
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
                superDog.style.transform = 'scaleX(1)'
            } else if (event.code === 'ArrowLeft') {
                this.x -= Math.min(this.x, this.speed);
                superDog.style.transform = 'scaleX(-1)'
            }
            superDog.style.left = `${this.x}px`;
        })
    }
}

class Life {
    constructor() {
        this.life = null;
        this.hearts = [];
    }
    generateLife() {
        this.life = 3;
        let right = 0;
        for (let i = 0; i < this.life; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.width = '68px'
            heart.style.height = '50px'
            heart.style.right = `${right}px`
            world.appendChild(heart);
            right += 68;
            this.hearts.push(heart);
        }
    }
    looseLife() {
        this.life--;
        this.hearts[0].remove();
        this.hearts.splice(0, 1);
        if (this.life === 0) {
            game.gameOver();
        }

    }
}


class Cat extends GameObject {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.node = null;
        this.isDead = false;
        this.isRescued = false;
    }
    updatePosition(dt) {
        this.y += this.speed * dt;
        this.node.style.top = this.y + 'px';
    }

}

class Aeroplane extends GameObject {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.node = null;
        this.isDead = false;
        this.isRescued = false;
    }
    updatePosition(dt) {
        this.y += this.speed * dt;
        this.node.style.top = this.y + 'px';
    }
}

const welcomeWindow = new WelcomeWindow();
const gameWorld = new World();
const game = new Game();
const ranking = new Ranking;

const life = new Life();
const deadCatSound = new Audio("sounds/deadcatsound.wav");
const rescuedCatSound = new Audio("sounds/rescuedcatsound.wav");
const finishMusic = new Audio("sounds/who.mp3");
const gameMusic = new Audio("sounds/gameMusic.mp3");
const crashSound = new Audio("sounds/crash.wav");
const click = new Audio("sounds/click.wav")

const player = new Player(0, 630, 100, 150, 10);

welcomeWindow.showWindow();
welcomeWindow.closeWindow();
gameWorld.clickedButton();
ranking.getRanking();