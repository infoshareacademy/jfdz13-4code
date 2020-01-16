let gameStarted = false;




const superDog = document.getElementById('superDog');
const world = document.getElementById('world');
const fallingCat = document.getElementById('fallingCat');


const worldHeight = parseInt(window.getComputedStyle(world).height);
const worldWidth = parseInt(window.getComputedStyle(world).width);


const superDogWidth = parseInt(window.getComputedStyle(superDog).width);
const superDogHeight = parseInt(window.getComputedStyle(superDog).height);

const fallingCatWidth = parseInt(window.getComputedStyle(fallingCat).width);
const fallingCatHeight = parseInt(window.getComputedStyle(fallingCat).height);

let superDogSpeed = 10;
let superDogPositionX = parseInt(window.getComputedStyle(superDog).left);
let superDogPositionY = parseInt(window.getComputedStyle(superDog).bottom);

let fallingCatPositionX = parseInt(window.getComputedStyle(fallingCat).right);
let fallingCatPositionY = parseInt(window.getComputedStyle(fallingCat).bottom);


function startGame() {
    gameStarted = true;
    let startButton = document.getElementById("startPage");
    startTime = new Date().getTime();
    document.getElementById("startPage").style.display = "none";
    document.getElementById("game-container").style.visibility = "visible";
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
    if (event.code === 'ArrowUp' && superDogPositionY + superDogHeight < worldHeight) {
        superDogPositionY += superDogSpeed;
        superDog.style.bottom = `${superDogPositionY}px`;
    }

});



// dodoawanie losowych kotów



function getRandom(maxSize) {
    return parseInt(Math.random() * maxSize);
  }

  function createSprite(element, x, y, w, h) {
    let result = new Object();
    result.element = element;
    result.x = x;
    result.y = y;
    result.w = w;
    result.h = h;
    return result;
  }
  

function addfallingCat() {
    
        let elementName = 'fallingCat' + getRandom(10000000);
        let fallingCat = createSprite(elementName, getRandom(450), -40, 35, 35);

        let element = document.createElement('div');
        element.id = fallingCat.element;
        element.className = 'fallingCat';
        document.children[0].appendChild(element);

        
    };


setInterval(() => {
    addfallingCat();
}, 5000);





// function addEnemy() {
//   var interval = 50;
//   if (iterations > 1500) {
//     interval = 5;
//   } else if (iterations > 1000) {
//     interval = 20;
//   } else if (iterations > 500) {
//     interval = 35;
//   }

//   if (getRandom(interval) == 0) {
//     var elementName = 'enemy' + getRandom(10000000);
//     var enemy = createSprite(elementName, getRandom(450), -40, 35, 35);

//     var element = document.createElement('div');
//     element.id = enemy.element;
//     element.className = 'enemy'; 
//     document.children[0].appendChild(element);

//     enemies[enemies.length] = enemy;
//   }
// }
