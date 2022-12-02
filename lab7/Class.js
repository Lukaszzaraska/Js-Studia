import { getRandom, dist } from "./func.js"
import { CanvaH, CanvaW } from "./main.js"

export class Circle {
    constructor() {
        this.radius = 3;
        this.x = getRandom(10, CanvaW - this.radius);
        this.y = getRandom(10, CanvaH - this.radius);
        this.Xspeed = getRandom(-2, 2);
        this.Yspeed = getRandom(-2, 2);

        this.RadiusLineDraw = 100;
        this.draw = function (ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.stroke()
        };

    }
}

export class Cursor {
    constructor(posX = 0, posY = 0) {
        this.X = posX;
        this.Y = posY;
        this.radius = 100;
       
    }
    
    Update(NewX, NewY) {
        this.X = NewX;
        this.Y = NewY;
    }
    DistTo(obj) {
        const distance = dist(this.X, obj.x, this.Y, obj.y)
        return distance - (this.radius+obj.radius)
    }
    collide(obj){
       let relative = Vector.substract({x:obj.x,y:obj.y},{x:this.X,y:this.Y})
       let distance = relative.magnitude()-(this.radius+obj.radius)
      if(distance<0){
        let movment = new Vector(relative.x,relative.y).setMagnitude(Math.abs(distance/2));

        obj.x += movment.x 
        obj.y += movment.y 

        let thisToOtherNormal = new Vector(relative.x,relative.y).normalize()
        let approachSpeed = 1-(obj.Xspeed*thisToOtherNormal.x+obj.Yspeed*thisToOtherNormal.y)
        let approachVector = new Vector(thisToOtherNormal.x,thisToOtherNormal.y).setMagnitude(approachSpeed)
        obj.Xspeed+=approachVector.x
        obj.Yspeed+=approachVector.y
      }
    }
}

 class Vector {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    static substract(v1, v2) {
        let newV = new Vector(v1.x, v1.y)
        newV.x -= v2.x || 0
        newV.y -= v2.y || 0
        return newV
    }

    static divide(v1, n) {
        let newV = new Vector(v1.x, v1.y)
        newV.x /= n
        newV.y /= n
        return newV
    }

    static add(v1, v2) {
        let newV = new Vector(v1.x, v1.y)
        newV.x += v2.x || 0
        newV.y += v2.y || 0
        return newV
    }

    add(v) {
        this.x += v.x
        this.y += v.y

        return this
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    setMagnitude(num) {
        return this.normalize().mult(num)
    }

    mult(num) {
        this.x *= num
        this.y *= num

        return this
    }

    normalize() {
        const len = this.magnitude()

        if (len !== 0) this.mult((1 / len))
        return this
    }

    set(x,y) {
        this.x = x
        this.y = y
    }
}