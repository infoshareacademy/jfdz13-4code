let gameStarted = false;

const cats = [];
const numberOfCats = 10;
const catFallingOffsetStep = 50;
const catDimensions = {
    width: 75,
    height: 75,
}


const superDog = document.getElementById('superDog');
const world = document.getElementById('world');
// const fallingCat = document.getElementById('fallingCat');


const worldHeight = parseInt(window.getComputedStyle(world).height);
const worldWidth = parseInt(window.getComputedStyle(world).width);


const superDogWidth = parseInt(window.getComputedStyle(superDog).width);
const superDogHeight = parseInt(window.getComputedStyle(superDog).height);

// const fallingCatWidth = parseInt(window.getComputedStyle(fallingCat).width);
// const fallingCatHeight = parseInt(window.getComputedStyle(fallingCat).height);

let superDogSpeed = 10;
let superDogPositionX = parseInt(window.getComputedStyle(superDog).left);
let superDogPositionY = parseInt(window.getComputedStyle(superDog).bottom);

// let fallingCatPositionX = parseInt(window.getComputedStyle(fallingCat).right);
// let fallingCatPositionY = parseInt(window.getComputedStyle(fallingCat).bottom);

function getCatNode() {
    const catNode = document.createElement('div');
    catNode.classList.add('falling-cat');
    catNode.style.top = 0;
    catNode.style.left = getRandom() + 'px';
    return catNode;
}

function generateCats() {
    setInterval(() => {
        const cat = {
            x: 0,
            y: 0,
            node: getCatNode(),
        };
        world.appendChild(cat.node);
        cats.push(cat);
    }, 1000);
}

function checkCollision(cat) {
    const catX = parseInt(cat.node.style.left);
    const catY = parseInt(cat.node.style.top);
    const dogX = parseInt(superDog.style.left);
    const dogY = parseInt(superDog.style.top);

  var cat = {x: catX, y: catY, width: parseInt(catDimensions.width), height: parseInt(catDimensions.height)}
  var dog = {x: dogX, y: dogY, width: 128, height: 128}
  console.log(superDog.width, 'dsdsds')
  
  if (cat.x < dog.x + dog.width &&
     cat.x + cat.width > dog.x &&
     cat.y < dog.y + dog.height &&
     cat.y + cat.height > dog.y) {
      console.log("hit");
      
  }
}

function moveCats() {
    cats.forEach(cat => {
        cat.node.style.top = parseInt(cat.node.style.top) + catFallingOffsetStep + 'px';
        checkCollision(cat);
    })
 
}



function runCatsInterval() {
    setInterval(() => moveCats(), 1000);
}

function getRandom(maxSize) {
    return parseInt(Math.random() * window.innerWidth);
}

function startGame() {
    console.log('start')
    gameStarted = true;
    let startButton = document.getElementById("startPage");
    startTime = new Date().getTime();
    document.getElementById("startPage").style.display = "none";
    document.getElementById("game-container").style.visibility = "visible";
    generateCats();
    runCatsInterval();
}

function checkCollision(cat) {
    const catX = cat.node.style.left;
    const catY = cat.node.style.top;
    const dogX = superDog.style.left;
    const dogY = superDog.style.top;

  var cat = {x: catX, y: catY, width: catDimensions.width, height: catDimensions.height}
  var dog = {x: dogX, y: dogY, width: superDog.width, height: superDog.height}
  
  if (cat.x < dog.x + dog.width &&
     cat.x + cat.width > dog.x &&
     cat.y < dog.y + dog.height &&
     cat.y + cat.height > dog.y) {
      console.log("hit");
      
  }
}


//sterowanie


//przyciski

document.getElementById("start_btn").addEventListener("click", startGame);



window.addEventListener('keydown', event => {

    console.log('event: ', event.code);
    if (event.code === 'ArrowRight' && superDogPositionX + superDogWidth < worldWidth) {
        superDogPositionX += superDogSpeed;
        superDog.style.transform = 'scaleX(-1)';
        superDog.style.left = `${superDogPositionX}px`;
    }
    if (event.code === 'ArrowLeft' && superDogPositionX > 0) {
        superDogPositionX -= superDogSpeed;
        superDog.style.transform = 'scaleX(1)';
        superDog.style.left = `${superDogPositionX}px`;
    }
    

});

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
  

