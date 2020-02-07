const paragraphIds = ['slide1', 'slide2', 'slide3', 'slide4'];
let activeSlider = 0;
let intervalHandle = null;

function slideTimer() {
    activeSlider = (activeSlider + 1) % 4;

    changeActiveSlider(activeSlider);
}

function changeActiveSlider(sliderIdx) {
    let className = "slide" + (sliderIdx + 1);
    paragraphIds.forEach(paragraph => {
        if (paragraph === className) {
            document.getElementById(paragraph).style.opacity = 1;
            document.querySelector(".radio." + paragraph).classList.add("radio--active");
        } else {
            document.getElementById(paragraph).style.opacity = 0;
            document.querySelector(".radio." + paragraph).classList.remove("radio--active");
        }
    });

    activeSlider = sliderIdx;
}

function radioClicked(sliderIdx) {
    changeActiveSlider(sliderIdx);

    if (intervalHandle !== null) {
        clearInterval(intervalHandle);
    }
    intervalHandle = setInterval(slideTimer, 5000);
}

class CookiesAccept {
    constructor(caName, caValue, caExpire){
        this.caName = caName;
        this.caValue = caValue;
        this.caExpire = caExpire;
    }

    setCookies (){
        const dateCookie = new Date();
        dateCookie.setTime(dateCookie.getTime() + (this.caExpire*24*60*60*1000));
        
        const expires = dateCookie.toUTCString();
        document.cookie = `${this.caName} = ${this.caValue}; expires=${expires} ; path=/; SameSite=None;`;
    }

    cookiesBannerVisible(){
        const cookiesBanner = document.getElementById('cookiesbanner');
        cookiesBanner.style.display='block';
    }

    cookiesBannerInVisible(){
        const cookiesBanner = document.getElementById('cookiesbanner');
        cookiesBanner.style.display='none';
    }

    pressAcceptBtn(){
        const pressedBtn = document.getElementById('cookiesbtn');
        
        pressedBtn.addEventListener('click',()=>{
            this.setCookies (this.caName, this.caValue, this.caExpire);
            this.cookiesBannerInVisible();
        })
    }

    pressDeclineBtn(){
        const pressedBtnNo = document.getElementsById('cookiesbtn1');
        
        pressedBtnNo.addEventListener('click',()=>{
            const cookiesBanner = document.getElementById('cookiesbanner');
            cookiesBanner.style.display='none';
        })
    }

    readThisCookies() {
        const newCookies = document.cookie.split(';');
        
        if (newCookies.length>0){
            for(let i=0; i<newCookies.length ; i++){
                const cookieName = newCookies[i].split("=")[0];
                const cookieValue = newCookies[i].split("=")[1];
                if(cookieName === this.caName && cookieValue === this.caValue){
                    return cookieValue;
                }else {return ""}
            }
        }
    }
    
    checkCookies(){
        const checkCookiecValue = this.readThisCookies();
        if (checkCookiecValue === 'yes'){
            this.cookiesBannerInVisible();
        }else{
            this.cookiesBannerVisible();
            this.pressAcceptBtn();
        }
    }   
}

const checkCookiesBanner = new CookiesAccept ("CookiesAccept","yes",30);
checkCookiesBanner.checkCookies();


//

let menuContainer = document.getElementById("mainNav");


let sections = menuContainer.getElementsByClassName("main-menu-item");


for (let i = 0; i < sections.length; i++) {
  sections[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}