

// notatnik z zajęć
const main = document.querySelector('main')
var NewSlide = document.createElement("img")
const Slides = document.querySelector('.slides');
const ProgressBar = document.querySelector('#PB');
const Slider = document.querySelector('#slider');
const Next_Slide = document.querySelector('#after')
const Before_Slide = document.querySelector('#before')

var ActualSlide;
let arrayOfImages = [];

for (let x = 1; x < 7; x++) {
    if (x % 2 == 0) {
        arrayOfImages.push('http://picsum.photos/seed/picsum/600/400?grayscale');
    } else {
        arrayOfImages.push('http://picsum.photos/seed/picsum/600/400');
    }

}

let licznik = 0;

Next_Slide.addEventListener('click', () => {
    changeSlide(1);
})
Before_Slide.addEventListener('click', () => {
    changeSlide(-1);
 
})
function changeSlide(prop) {
    licznik = licznik + prop;
    if (licznik == 7) { licznik = 1 }
    if (licznik == 0) { licznik = 6 }
    NewSlide.setAttribute("src", arrayOfImages[licznik-1])

    Slides.appendChild(NewSlide);
    ProgressBar.setAttribute("value", licznik)
}
function autoplay() {
    Next_Slide.click();
}

Slides.addEventListener('mouseover', () => {
    clearInterval(Interval)
})

let Interval;
Start_slaid();
function Start_slaid() {

    Interval=setInterval(() => { autoplay() }, 2500);
}

Slides.addEventListener('mouseout', () => {
    Start_slaid()
})


