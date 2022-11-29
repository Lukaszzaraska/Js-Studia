import { getRandomArbitrary,map } from "./Functions.js"

export class DevicePosition {
    constructor(Alfa = 0, Beta = 0, Gamma = 0) {
        this.Alfa = Alfa
        this.Beta = Beta
        this.Gamma = Gamma
    }
    UpdatePosition(Alfa, Beta, Gamma) {
        this.Alfa = Alfa
        this.Beta = Beta
        this.Gamma = Gamma
    }
}

export class Ball {
    constructor(PositionX, PositionY) {
        this.PositionX = PositionX
        this.PositionY = PositionY
    }
    ChangePosition(PosX, PosY) {
        this.PositionX = PosX
        this.PositionY = PosY
    }
}

export class Vector {
    constructor(Beta, Gamma) {
        this.PositionY = map(Beta, -90, 90, -10, 10, true)
        this.PositionX = map(Gamma, -90, 90, -10, 10, true)

    }
    Update(Beta, Gamma, PositionPlayerX, PositionPlayerY) {
        let tempY = map(Beta, -90, 90, -10, 10, true)
        if (tempY + PositionPlayerY > 0) {
            this.PositionY = this.PositionY + tempY
        }
        if (tempY + PositionPlayerY > (window.innerHeight - 50)) {
            this.PositionY = this.PositionY - tempY
        }
        let tempX = map(Gamma, -90, 90, -10, 10, true)

        if (tempX + PositionPlayerX > 0) {
            this.PositionX = this.PositionX + tempX
        }
        if (tempX + PositionPlayerX > window.innerWidth - 50) {
            this.PositionX = this.PositionX - tempX
        }
    }
}

export class Time {
    constructor(ms = 0) {
        this.ms = ms
        this.s = 0
    }
    Change(ms) {
        this.ms += ms%1000 
        if(this.ms>1000){
            this.s += Math.floor(this.ms/1000)
            this.ms=0
        }
    }
}
export class Hole {
    constructor(){
        //size = r
        this.size = getRandomArbitrary(27,50)
        this.PositionY = getRandomArbitrary(50+(this.size*2),window.innerHeight-50-(this.size*2))
        this.PositionX = getRandomArbitrary(50+(this.size*2),window.innerWidth-50-(this.size*2))
    }
}
