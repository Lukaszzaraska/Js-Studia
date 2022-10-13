


// notatnik z zajęć
const main = document.querySelector('main')
var NewSlide =document.createElement("img")
const Slides = document.querySelector('.slides');
const ProgressBar =  document.querySelector('#PB');
const Slider =  document.querySelector('#slider');


var ActualSlide;
let arrayOfImages = [];

for(let x=1;x<6;x++)
{
    if(x%2==0){
        arrayOfImages.push('http://picsum.photos/seed/picsum/600/400?grayscale');
    }else{
        arrayOfImages.push('http://picsum.photos/seed/picsum/600/400');
    }
   
}

const timeoutRef = setTimeout( 
    () => {
      //  main.innerHTML='From setTimeout'
    },
    2000
)
let licznik = 0 
const intervalRef = setInterval( 
    () => {
        NewSlide.setAttribute("src",arrayOfImages[licznik])
      licznik++;
      //  main.innerHTML='From interval' + licznik++
        Slides.appendChild(NewSlide);
        ProgressBar.setAttribute("value",licznik)
     
        Slider.addEventListener('mouseover',(event)=>{
            timeoutRef();
            console.log("stop");
           // event.stopPropagation;
         })

     console.log("ide")
        if(licznik==5){licznik=0}
        
    },
    3000
)




// kasujemy setInterval
//clearInterval(intervalRef)

// kasujemy setTimeout
//clearTimeout(intervalRef)


// window.requestAnimationFrame