
import { dist, getCursorPosition, CreateCanva, map } from "./func.js"
import { Circle, Cursor } from "./Class.js"

export const CanvaH = Math.floor(window.innerHeight / 2);
export const CanvaW = Math.floor(window.innerWidth / 1.5);
CreateCanva();
const canva = document.querySelector("#myCanvas");

// const canvaLine = document.createElement("canvas")
// canvaLine.setAttribute("id", "myCanvasLine")
// canvaLine.setAttribute('width', `${CanvaW}`);
// canvaLine.setAttribute('height', `${CanvaH}`);
// Body.appendChild(canvaLine)

const StartBtn = document.querySelector("#StartBtn");
const ResetBtn = document.querySelector("#ResetBtn");
const c = document.querySelector("#myCanvas");
let animation
const ctx = c.getContext("2d", { alpha: false });

let CircleTab = []

export const cursor = new Cursor()

canva.addEventListener('mousemove', e => { getCursorPosition(e.clientX, e.clientY); })

ResetBtn.addEventListener("click", () => {
    const value = document.querySelector('[name="ballsNumber"]').value
    CircleTab = []
    for (let index = 0; index < value; index++) {
        CircleTab.push(new Circle())
    }
    window.cancelAnimationFrame(animation);
    animate()
})
StartBtn.addEventListener("click", () => {
    const value = document.querySelector('[name="ballsNumber"]').value
    for (let index = 0; index < value; index++) {
        CircleTab.push(new Circle())
    }
    window.cancelAnimationFrame(animation);
    animate()
})

function animate() {

    ctx.beginPath();
    ctx.rect(0, 0, CanvaW, CanvaH);
    ctx.fill();
    ctx.stroke();

    CircleTab.forEach(myCircle => {


        if (myCircle.x >= CanvaW - myCircle.radius) {
            myCircle.x = CanvaW - myCircle.radius;
            myCircle.Xspeed = myCircle.Xspeed * (-1)
        } else if (myCircle.x < myCircle.radius) {
            myCircle.x = myCircle.radius;
            myCircle.Xspeed = myCircle.Xspeed * (-1)
        }

        if (myCircle.y >= CanvaH - myCircle.radius) {
            myCircle.y = CanvaH - myCircle.radius;
            myCircle.Yspeed = myCircle.Yspeed * (-1)
        } else if (myCircle.y < myCircle.radius) {
            myCircle.y = myCircle.radius;
            myCircle.Yspeed = myCircle.Yspeed * (-1)
        }

        myCircle.x += myCircle.Xspeed;
        myCircle.y += myCircle.Yspeed;

        cursor.collide(myCircle)
        const HelpTab = CircleTab.filter(Circle => dist(myCircle.x, Circle.x, myCircle.y, Circle.y) < myCircle.RadiusLineDraw + Circle.radius)

        HelpTab.forEach(Circle => {
            if (JSON.stringify(myCircle) !== JSON.stringify(Circle)) {
                let distance = Math.round(dist(myCircle.x, Circle.x, myCircle.y, Circle.y))

                const Color = map(distance, 1, myCircle.RadiusLineDraw, 0, 100, false)
                const Size = map(distance, 1, myCircle.RadiusLineDraw, 1, 0.1, false)
                ctx.beginPath();

                ctx.strokeStyle = `rgb(${Color},0,0)`;
                ctx.lineWidth = Size;
                ctx.moveTo(myCircle.x, myCircle.y);
                ctx.lineTo(Circle.x, Circle.y);
                ctx.stroke()
            }
        })

        myCircle.draw(ctx)
    })

    // setTimeout(() => {
    //     requestAnimationFrame(animate)
    // }, 10)
     animation = requestAnimationFrame(animate)
}


