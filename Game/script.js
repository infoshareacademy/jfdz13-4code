let gameStarted = false;




const superDog = document.getElementById('superDog');
const world = document.getElementById('world');


const worldHeight = parseInt(window.getComputedStyle(world).height);
const worldWidth = parseInt(window.getComputedStyle(world).width);


const superDogWidth = parseInt(window.getComputedStyle(superDog).width);
const superDogHeight = parseInt(window.getComputedStyle(superDog).height);

let superDogSpeed = 10;
let superDogPositionX = parseInt(window.getComputedStyle(superDog).left);
let superDogPositionY = parseInt(window.getComputedStyle(superDog).bottom);

function startGame() {
    gameStarted=true;
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
        superDog.style.transform = 'scaleX(1)';
        superDog.style.left = `${superDogPositionX}px`;
    }
    if (event.code === 'ArrowLeft' && superDogPositionX > 0) {
        superDogPositionX -= superDogSpeed;
        pirate.style.transform = 'scaleX(-1)';
        superDog.style.left = `${superDogPositionX}px`;
    }
    if (event.code === 'ArrowUp' && superDogPositionY + superDogHeight < worldHeight) {
        superDogPositionY += superDogSpeed;
        superDog.style.bottom = `${superDogPositionY}px`;
    }

});
