import { getRandom, dist } from "./func.js"
import { CanvaH, CanvaW } from "./main.js"

export class Circle {
    constructor(RadiusLineDraw = 120) {
        this.radius = 20;
        this.x = getRandom(this.radius, CanvaW - this.radius);
        this.y = getRandom(this.radius, CanvaH - this.radius);
        this.Xspeed = getRandom(-1, 1);
        this.Yspeed = getRandom(-1, 1);
        this.RadiusLineDraw = Math.round((CanvaW / 100) * RadiusLineDraw)

    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.stroke()
    }
    Update(NewX, NewY) {
        this.x=NewX;
        this.y=NewY;
        if (this.x >= CanvaW - this.radius || this.x < this.radius) {
            this.x = this.x < this.radius ? this.radius : CanvaW - this.radius;
            this.Xspeed *= -1;
            this.Xspeed *= (this.Xspeed > 0.2 && this.Xspeed < 0.9) ? 0.9 : 1.1;
        }

        if (this.y >= CanvaH - this.radius || this.y < this.radius) {
            this.y = this.y < this.radius ? this.radius : CanvaH - this.radius;
            this.Yspeed *= -1;
            this.Yspeed *= (this.Yspeed > 0.2 && this.Yspeed < 0.9) ? 0.9 : 1.1;
        }
        this.x += this.Xspeed;
        this.y += this.Yspeed;
    }
}

export class Cursor {
    constructor(posX = 0, posY = 0, Power = 90) {
        this.X = posX;
        this.Y = posY;
        this.radius = Power;

    }
    OverLaps(obj) {
       return dist(obj.x,this.X,obj.y+obj.radius*3,this.Y)
    }
    Update(NewX, NewY) {
        this.X = NewX;
        this.Y = NewY;
    }
    DistTo(obj) {
        const distance = dist(this.X, obj.x, this.Y, obj.y)
        return distance - (Math.abs(this.radius) + obj.radius)
    }
    collide(obj) {

        let relative = Vector.substract({ x: obj.x, y: obj.y }, { x: this.X, y: this.Y })
        let distance = relative.magnitude() - (Math.abs(this.radius) + obj.radius)
        if (distance < 0) {
            let movment = new Vector(relative.x, relative.y).setMagnitude(Math.abs(distance / 2));

            obj.x += movment.x
            obj.y += movment.y

            let thisToOtherNormal = new Vector(relative.x, relative.y).normalize()
            let direct = this.radius > 0 ? 1 : -1;


            let approachSpeed = direct - (obj.Xspeed * thisToOtherNormal.x + obj.Yspeed * thisToOtherNormal.y)
            //  let approachVector
            // if(approachSpeed>1.2){
            //     approachVector = new Vector(thisToOtherNormal.x, thisToOtherNormal.y).setMagnitude(approachSpeed-0.5)
            // }else{
            let approachVector = new Vector(thisToOtherNormal.x, thisToOtherNormal.y).setMagnitude(approachSpeed)
            // }

            obj.Xspeed += approachVector.x
            obj.Yspeed += approachVector.y


        }
    }
}

class Vector {
    constructor(x, y) {
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

    set(x, y) {
        this.x = x
        this.y = y
    }
}