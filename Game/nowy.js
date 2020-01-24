let LIFE = 3;
const generateLife = () => {
    let right = 0;
    const lifeTime = document.querySelector('.lifetime');
    lifeTime.innerHTML = '';
    for (let i = 0; i < LIFE; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.right = `${right}px`
        lifeTime.appendChild(heart);
        right += 60

    }
};

const looseLife = () => {
    LIFE -= 1;
    generateLife();
}



const addLife = () => {
    LIFE += 1;
    generateLife();
}



//punktacja 


const summarySection = document.querySelector('.summary-section');
  summarySection.style.display='block';
let score = 0;

const summaryScoreElement = document.querySelector('#score');
summaryScoreElement.innerText = score;
score = 0;


const box = document.querySelector('.box');
box.addEventListener('click', (event) => {
    score += 1;
    console.log(score);
    event.stopPropagation();
    updateScoreView();
})

const updateScoreView = () => {
    const scoreElement = document.querySelector('.score');
    scoreElement.innerText = `Wynik: ${score}`;
};


*/





//skakanie


let superDogJumpingSpeedY = 200;
let superDogJumpingSpeedX = 50;


window.addEventListener('keydown', event => {

    console.log('event: ', event.code);
    if (event.code === 'Enter' && superDogPositionY === 0) {
        superDogPositionY += superDogJumpingSpeedY;
        superDogPositionX += superDogJumpingSpeedX;
        superDog.style.bottom = `${superDogPositionY}px`;
        superDog.style.left = `${superDogPositionX}px`;
    }
});


window.addEventListener('keyup', event => {

    console.log('event: ', event.code);
    if (event.code === 'Enter' && superDogPositionY === 200) {
        superDogPositionY -= superDogJumpingSpeedY;
        //superDogPositionX -= superDogJumpingSpeedX;
        superDog.style.bottom = `${superDogPositionY}px`;
        //superDog.style.left = `${superDogPositionX}px`;
    }

});

//kolizja

