


const menuLine = document.querySelectorAll(".main-menu li a");
const hamburger = document.querySelector("#page-nav .fa-bars");
const menuList = document.querySelector(".main-menu");
console.log(menuList);
const pageNavArea = document.getElementById('page-nav');
const headerContainer = document.querySelector('.site-header .container');

menuList.addEventListener("click", function () {
    setTimeout(() => {
        hamburger.style.display = 'block';
        menuList.style.display = 'none';
    headerContainer.style.backgroundColor = "rgba(0, 0, 0, 0.0)";

    }, 100);
});


hamburger.addEventListener("click", function () {
    hamburger.style.display = 'none';
    menuList.style.display = 'block';
    //menuList.style.toggle('slide');
    headerContainer.style.backgroundColor = "rgba(0, 0, 0, 0.895)";
});



