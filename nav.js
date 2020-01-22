const icon = document.getElementById("icon");
const icon1 = document.getElementById("a");
const icon2 = document.getElementById("b");
const icon3 = document.getElementById("c");
const menuList = document.querySelector(".main-menu");
const curtain = document.querySelector(".menu-curtain");



icon.addEventListener('click', function () {
  if (menuList.style.display === "block") {
    menuList.style.display = 'none';
    icon1.classList.toggle('a');
    icon2.classList.toggle('c');
    icon3.classList.toggle('b');
    curtain.classList.toggle('move');
    
  } else {
    menuList.style.display = "block";
    curtain.classList.toggle('move');
    icon1.classList.toggle('a');
    icon2.classList.toggle('c');
    icon3.classList.toggle('b');
  }
});


menuList.addEventListener("click", function () {
  setTimeout(() => {
    icon1.classList.toggle('a');
    icon2.classList.toggle('c');
    icon3.classList.toggle('b');
    menuList.style.display = 'none';
    curtain.classList.toggle('move');

  }, 100);
});


