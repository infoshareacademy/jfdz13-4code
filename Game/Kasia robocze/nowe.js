let LIFE = 3;
const generateLife = () => {
    let right = 0;
    const lifeTime = document.querySelector('.lifetime');
    lifeTime.innerHTML = ''
    for (let i = 0; i < LIFE; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.right = `${right}px`
        lifeTime.appendChild(heart);
        right+=60

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



let score = 0;

const scoreCounter = () => {
    
    score+=1
}