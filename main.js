const header = document.querySelector(".header")
const headerImage = document.querySelector(".header__image")
const headerWelcome = document.querySelector(".header__welcome")
const headerContent = document.querySelector(".header__content")

setTimeout(() => {
    header.style.height = "50vh";
}, 6000);

setTimeout(() => {
    headerWelcome.style.height = "0"
    headerImage.style.height = "0"
    headerContent.style.height = "50vh"
    headerContent.style.opacity = "1"
}, 13000);
