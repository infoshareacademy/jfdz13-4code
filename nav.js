


const menuLine = document.querySelectorAll(".main-menu li a");
console.log(menuLine);
const hamburger = document.querySelector("#page-nav .fa-bars");
console.log(hamburger);
const menuList = document.querySelector(".main-menu");
console.log(menuList);
const cross = document.querySelector('#page-nav .fa-times');
console.log(cross);
const pageNavArea = document.getElementById('page-nav');
console.log(pageNavArea);
const headerContainer = document.querySelector('.site-header .container');
console.log(headerContainer);


console.log(menuList);



menuList.addEventListener("click", function () {
    setTimeout(() => {
        hamburger.style.display = 'block';
        menuList.style.display = 'none';
        //cross.style.display = 'none'
    headerContainer.style.backgroundColor = "rgba(0, 0, 0, 0.0)";

    }, 100);
});


hamburger.addEventListener("click", function () {
    hamburger.style.display = 'none';
    menuList.style.display = 'block';
    headerContainer.style.backgroundColor = "rgba(0, 0, 0, 0.895)";
});


cross.addEventListener("click", function () {
    hamburger.style.display = 'block';
    menuList.style.display = 'none';

   
});

