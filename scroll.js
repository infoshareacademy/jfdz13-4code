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

/*
let mainMenu = document.querySelectorAll(".main-menu-item");



mainMenu.addEventListener("click", () => {
setTimeout(() => {
    mainMenu.style.display = "none";
}, 1000);
});
/*
document.addEventListener("click", function(){
    document.getElementById("demo").innerHTML = "Hello World";
  });
  */

/*
startButton.addEventListener('click', () => {
    const helloSection = document.querySelector('.hello-section');
    helloSection.style.display = 'none';
    intervalId = setInterval(() => {
        addNewBox();
    }, 1500);
});
*/
/*
const mainMenu = document.getElementsByClassName("main-menu-item ");
const newMainMenuColor = "black";
const oldMainMenuColor = "white";



window.addEventListener('click', (event) =>  {
   if ((event.code === 'click') && (mainMenu.style.color === oldMainMenuColor)) {
  mainMenu.style.color = newMainMenuColor;
  */
  /*
} else if ((event.code === 'click') && (background.style.backgroundColor === newBackgroundColor)) {
    background.style.backgroundColor = oldBackgroundColor;
}*/

   /*
});

const background = document.querySelector('.world');
const oldBackgroundColor = 'cadetblue';
const newBackgroundColor = 'green';

background.style.backgroundColor = oldBackgroundColor;

window.addEventListener("keyup", (event) => {
    if ((event.code === 'Space') && (background.style.backgroundColor === oldBackgroundColor)) {
        background.style.backgroundColor = newBackgroundColor;
    } else if ((event.code === 'Space') && (background.style.backgroundColor === newBackgroundColor)) {
        background.style.backgroundColor = oldBackgroundColor;
    }
});
*/