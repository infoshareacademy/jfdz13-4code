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
const menu = document.querySelector(".main-menu");
//const hiddenMenu = menu.classList.add('main-menu-hidden');
//console.log(hiddenMenu);
console.log(menu);
/*
home.addEventListener("click", function () {
    setTimeout(() => {
        hamburger.style.display = 'block';
        menu.style.display = 'none';
    }, 2000);
});
*/
home.addEventListener("click", function () {
        hamburger.style.display = 'block';
        menu.style.display = 'none';
});


hamburger.addEventListener("click", function () {
        hamburger.style.display = 'none';
        menu.style.display = 'block';
});




const input = document.querySelector('.subscribe__input');
console.log('input: ', input.innerText);
//input.setAttribute('type', 'email');

const subscribeButton = document.querySelector('.subscribe__button');



// const checkIfContains = () => {
//     console.log('bla');
//     console.log('input: ', input.value);
    

//     if (input.value.indexOf('@') > -1) {
//       alert('Dziękujemy')
//     } else {
//         alert('Nieprawidłowy adres email');
        
//     }
// };



// subscribeButton.addEventListener('click', (event) => {
//     checkIfContains();

// });





/*

*/
const header = document.querySelectorAll('h1');