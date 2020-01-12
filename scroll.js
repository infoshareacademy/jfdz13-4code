(function () {
    var elements;
    var windowHeight;

    function init() {
        elements = document.querySelectorAll('.hidden');
        windowHeight = window.innerHeight;
    }

    function checkPosition() {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var positionFromTop = elements[i].getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= -250) {
                element.classList.add('slidedown');
                element.classList.remove('hidden');
            }
        }
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
})();


const home = document.querySelector(".main-menu-item a");
const hamburger = document.querySelector("#page-nav label");
console.log(hamburger);
const menu = document.querySelectorAll(".main-menu-item a");
//const hiddenMenu = menu.classList.add('main-menu-hidden');
//console.log(hiddenMenu);
console.log(menu);

home.addEventListener("click", function () {
    setTimeout(() => {
        hamburger.style.display = 'block';
        menu.style.display = 'none';
    }, 2000);
});
/*
const input = document.querySelector('.subscribe__input');
input.setAttribute('type', 'email');

const subscribeButton = document.querySelector('.subscribe__button');



const checkIfContains = () => {
    if (input.indexOf('@') > -1) {
        input.display = 'none';
    } else {
        input.display = 'none';
    }
};



subscribeButton.addEventListener('click', (event) => {
    if (checkIfContains === true) {
        alert('Dziękujemy')
    } else {
        alert('Nieprawidłowy adres email');
    }
});

*/



/*

*/
const header = document.querySelectorAll('h1');