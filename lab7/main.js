
import { dist, getCursorPosition, CreateCanva, map ,getRandom} from "./func.js"
import { Circle, Cursor } from "./Class.js"

let sizeLinkBall = document.querySelector('[name="sizeLinkBall"]').value

export const CanvaH = Math.round(window.innerHeight - 200)
export const CanvaW = Math.round(window.innerWidth - 100)
CreateCanva();
let canva = document.querySelector("#myCanvas");
let value = document.querySelector('[name="ballsNumber"]').value

let CursorPower = document.querySelector('[name="CursorPower"]').value

const StartBtn = document.querySelector("#StartBtn");
const ResetBtn = document.querySelector("#ResetBtn");

let animation
const ctx = canva.getContext("2d", { alpha: false });

let CircleTab = [];

export const cursor = new Cursor()

canva.addEventListener('mousemove', e => { getCursorPosition(e.clientX, e.clientY); })
canva.addEventListener("click", () => {
    CircleTab.forEach((x, i) => {
        if (cursor.OverLaps(x) < x.radius) {
            CircleTab.splice(i, 1);
            CircleTab.push(new Circle(sizeLinkBall), new Circle(sizeLinkBall));
        }
    });
})

ResetBtn.addEventListener("click", () => {
    ctx.beginPath();
    ctx.rect(0, 0, CanvaW, CanvaH);
    ctx.fill();
    ctx.stroke();
    CircleTab = [];
    window.cancelAnimationFrame(animation);

})
StartBtn.addEventListener("click", () => {
    CursorPower = document.querySelector('[name="CursorPower"]').value;
    cursor.radius = CursorPower;
    value = document.querySelector('[name="ballsNumber"]').value;
    sizeLinkBall = document.querySelector('[name="sizeLinkBall"]').value;
    for (let index = 0; index < value; index++) {
      
       
        CircleTab.push(new Circle(sizeLinkBall))
    }

    window.cancelAnimationFrame(animation);
    animate()
})

let animate = () => {
    ctx.beginPath();
    ctx.rect(0, 0, CanvaW, CanvaH);
    ctx.fill();
    ctx.stroke();

    CircleTab.forEach((myCircle,i) => {
        if(myCircle.radius<2){
            CircleTab.splice(i, 1);
        }
        myCircle.Update(myCircle.x, myCircle.y)

        const HelpTab = CircleTab.filter(Circle => dist(myCircle.x, Circle.x, myCircle.y, Circle.y) < myCircle.RadiusLineDraw + Circle.radius)

        HelpTab.forEach(Circle => {
            if (JSON.stringify(myCircle) !== JSON.stringify(Circle)) {
                let distance = Math.round(dist(myCircle.x, Circle.x, myCircle.y, Circle.y))

                const Color = map(distance, 1, myCircle.RadiusLineDraw, 0, myCircle.RadiusLineDraw * 0.2, false)
                const Size = map(distance, 1, myCircle.RadiusLineDraw, 2, 0.1, false)
                Circle.massReplacement(myCircle)
                ctx.beginPath();
               // ctx.strokeStyle = `rgb(${Color},0,0)`;
               if(Circle.kineticForce>myCircle.kineticForce){
                ctx.strokeStyle = myCircle.color;
               }else{
                ctx.strokeStyle = Circle.color;
               }
               
                ctx.lineWidth = Size;
                ctx.moveTo(myCircle.x, myCircle.y);
                ctx.lineTo(Circle.x, Circle.y);
           
                ctx.stroke()
            }
        })

        myCircle.draw(ctx)
        if (cursor.radius != 0) {
            cursor.collide(myCircle)
        }
    })
    // setTimeout(() => {
    //     requestAnimationFrame(animate)
    // }, 10)
   animation = requestAnimationFrame(animate)
}


