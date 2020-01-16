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




// function component(width, height, color, x, y) {
//   this.gamearea = gamearea;
//   this.width = width;
//   this.height = height;
//   this.angle = 0;
//   this.speed = 1;
//   this.x = x;
//   this.y = y;
//   this.update = function() {
//     ctx = myGameArea.context;
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(this.angle);
//     ctx.fillStyle = color;
//     ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
//     ctx.restore();
//   }
//   this.newPos = function() {
//     this.x += this.speed * Math.sin(this.angle);
//     this.y -= this.speed * Math.cos(this.angle);
//   }
// }