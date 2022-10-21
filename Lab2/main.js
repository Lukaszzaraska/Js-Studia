

// notatnik z zajęć
const main = document.querySelector('main')
var NewSlideL = document.createElement("img")
var NewSlideR = document.createElement("img")
const Slides = document.querySelector('.slides');
const ProgressBar = document.querySelector('#PB');
const Slider = document.querySelector('#slider');
const Next_Slide = document.querySelector('#after')
const Before_Slide = document.querySelector('#before')

var ActualSlide;
let arrayOfImages = [];

for (let x = 1; x < 7; x++) {
    if (x % 2 == 0) {
        arrayOfImages[x-1]=new Array(['http://picsum.photos/seed/picsum/600/400?grayscale'],['http://picsum.photos/seed/picsum/600/400']);
    } else {
        arrayOfImages[x-1]=new Array(['http://picsum.photos/seed/picsum/600/400'],['http://picsum.photos/seed/picsum/600/400?grayscale']);
    }
}

for (let index = 0; index < arrayOfImages.length; index++) {
    const element = arrayOfImages[index];

}


let licznik = 0;

Next_Slide.addEventListener('click', () => {
    Slides.setAttribute("class","animation")
    changeSlide(1);
})
Before_Slide.addEventListener('click', () => {
    Slides.setAttribute("class","animation")
    changeSlide(-1);
 
})
function changeSlide(prop) {
    licznik = licznik + prop;
    if (licznik == 7) { licznik = 1 }
    if (licznik == 0) { licznik = 6 }
    
    NewSlideL.setAttribute("src", arrayOfImages[licznik-1][0])
    Slides.appendChild(NewSlideL);
   // console.log(NewSlide)
    NewSlideR.setAttribute("src", arrayOfImages[licznik-1][1])
    Slides.appendChild(NewSlideR);
   // console.log(NewSlide)
    ProgressBar.setAttribute("value", licznik)
    Slides.removeAttribute("animation")
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

    Interval=setInterval(() => { autoplay() }, 3000);
}

Slides.addEventListener('mouseout', () => {
    Start_slaid()
})


