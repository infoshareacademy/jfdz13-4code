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

