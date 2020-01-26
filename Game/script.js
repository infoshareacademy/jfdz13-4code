let gameStarted = false;

const numberOfCats = 3;
const catFallingOffsetStep = 25;
const catFallingSpeed = 50;
const catDimensions = {
    width: 75,
    height: 75,
};
const dogDimensions = {
    width: 256,
    height: 160
};


const superDog = document.querySelector('#superDog');
const world = document.querySelector('#world');
// const fallingCat = document.getElementById('fallingCat');


const worldHeight = parseInt(window.getComputedStyle(world).height);
const worldWidth = parseInt(window.getComputedStyle(world).width);




// const fallingCatWidth = parseInt(window.getComputedStyle(fallingCat).width);
// const fallingCatHeight = parseInt(window.getComputedStyle(fallingCat).height);

// let fallingCatPositionX = parseInt(window.getComputedStyle(fallingCat).right);
// let fallingCatPositionY = parseInt(window.getComputedStyle(fallingCat).bottom);
class Game {
    constructor() {
        this.startTime = null;
        this.cats = [];
        this.lastFrame = 0;
    }

    startGame() {
        console.log('start')
        gameStarted = true;
        this.startTime = new Date().getTime();
        document.getElementById("startPage").style.display = "none";
        document.getElementById("game-container").style.display = "flex";
        player.moveDog()
        this.generateCats();
        requestAnimationFrame(this.update.bind(this));
    }

    generateCats() {
        setInterval(() => {
            const cat = new Cat();
            cat.createNode();
            world.appendChild(cat.node);
            this.cats.push(cat);
        }, 1000);
    }

    update(totalTime) {
        if (!this.lastFrame)
            this.lastFrame = totalTime;

        const dt = (totalTime - this.lastFrame) / 1000; //delta time in seconds
        this.lastFrame = totalTime;

        this.moveCats(dt);

        requestAnimationFrame(this.update.bind(this));
    }

    moveCats(dt) {
        this.cats.forEach(cat => {
            cat.update(dt);
            this.checkCollision(cat);
            
        });
    }

    checkCollision(cat) {
        let catX = cat.x;
        let catY = cat.y
        let dogX = player.dogX;
        let dogY = player.dogY;

        const cats = { x: catX, y: catY, width: catDimensions.width, height: catDimensions.height }
        const dog = { x: dogX, y: dogY, width: dogDimensions.width, height: dogDimensions.height }


        if (cats.x < dog.x + dog.width &&
            cats.x + cats.width > dog.x &&
            cats.y < dog.y + dog.height &&
            cats.y + cats.height > dog.y + dog.height / 2) {
          
            console.log('hit');
            
            }
    }

};


class Cat {
    constructor() {
        this.node = null;
        this.y = 0;
        this.x = getRandom();
    }

    createNode() {
        const node = document.createElement('div');
        node.classList.add('falling-cat');
        node.style.top = 0;
        node.style.left = this.x + 'px';
        this.node = node;
    }

    update(dt) {
        this.y += catFallingSpeed * dt;
        this.node.style.top = this.y + 'px';
    }
}

class Player {
    constructor(){
        this.dogX = parseInt(window.getComputedStyle(superDog).left);
        this.dogY = 660;//parseInt(window.getComputedStyle(superDog).top);
    this.superDogWidth = parseInt(window.getComputedStyle(superDog).width);
    this.superDogHeight = parseInt(window.getComputedStyle(superDog).height);
    this.superDogSpeed = 10;
    //this.superDogPositionX = parseInt(window.getComputedStyle(superDog).left);
    //this.superDogPositionY = parseInt(window.getComputedStyle(superDog).top);
}
moveDog() {

window.addEventListener('keydown', event => {

    console.log('event: ', event.code);
    if (event.code === 'ArrowRight' && this.dogX + this.superDogWidth < worldWidth) {
        this.dogX += this.superDogSpeed;
        superDog.style.transform = 'scaleX(-1)';
        superDog.style.left = `${this.dogX}px`;
    }
    if (event.code === 'ArrowLeft' && this.dogX > 0) {
        this.dogX -= this.superDogSpeed;
        superDog.style.transform = 'scaleX(1)';
        superDog.style.left = `${this.dogX}px`;
    };
    console.log(this.dogX, this.dogY);
    
});
}}
const game = new Game();
document.getElementById("start_btn").addEventListener("click", () => game.startGame());
const player = new Player();
//sprawdzanie kolizji



function getRandom() {
    return parseInt(Math.random() * (worldWidth-catDimensions.width));
}



// function checkCollision(cat) {
//     const catX = cat.node.style.left;
//     const catY = cat.node.style.top;
//     const dogX = superDog.style.left;
//     const dogY = superDog.style.top;


//   var cat = {x: catX, y: catY, width: catDimensions.width, height: catDimensions.height}
//   var dog = {x: dogX, y: dogY, width: superDog.width, height: superDog.height}

//   console.log(dog.width);


//   if (cat.x < dog.x + dog.width &&
//      cat.x + cat.width > dog.x &&
//      cat.y < dog.y + dog.height &&
//      cat.y + cat.height > dog.y) {
//       console.log("hit");

//   }
// }


//sterowanie


//przyciski






// dodawanie losowych kotów inne

// const generateRandomNumberWidth = () => {
//     return Math.floor(Math.random() * (worldHeight - fallingCatWidth + 1));
// };

// setInterval(() => {
//     let fallingCats = document.querySelectorAll('fallingCat');
//     if (fallingCats.length < 20) {
//         let newElement = document.createElement('div');
//         newElement.classList.add('fallingCat');
//         newElement.style.left ='${generateRandomNumberWidth()}px';

//     }

// }, 6000);

// dodoawanie losowych kotów





function createSprite(element, x, y, w, h) {
    let result = new Object();
    result.element = element;
    result.x = x;
    result.y = y;
    result.w = w;
    result.h = h;
    return result;
}
