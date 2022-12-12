import { CreateTile, getRandom, RandomHeight, getRandomNum } from "./functions.js"
CreateTile()

const canvas = document.querySelector("#Tile");
let ctx = canvas.getContext("2d");
//ctx.strokeStyle = "brown";
ctx.beginPath();
ctx.rect(0, 0, 400, 700);
ctx.fillStyle = "white";
ctx.fill();
ctx.stroke();

for (let indexH = 50; indexH > 0; indexH--) {


    for (let indexW = 50; indexW > 0; indexW--) {
        GenerateColor(indexH, indexW)
        ctx.beginPath();
        ctx.moveTo(indexW, indexH);
        ctx.lineTo(indexW - 1, indexH);
        ctx.stroke()
    }


}
//generowanie wielu canv o wymiarach 50x50
//zrobic wiele presetów i generowac je zaleznie od ustawienia

