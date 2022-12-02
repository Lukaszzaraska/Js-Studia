import { DevicePosition, Ball, Vector, Time } from "./Classes.js"
import { GenerateHoles, elementsOverlap } from "./Functions.js"

const ball = document.querySelector("#ball")
const field = document.querySelector("#field")
const start_btn = document.querySelector("#start_btn")
const TimerHtml = document.querySelector("#Timer")
const menu = document.querySelector("#menu")
const SingleBallSingleHole = document.querySelector("#SingleBallSingleHole")
const HoleHelper = document.querySelectorAll(".holeHelper")
let time = new Time()


let devicePosition = new DevicePosition()
let vector = new Vector(devicePosition.Beta, devicePosition.Gamma)
let Player = new Ball(vector.PositionY, vector.PositionX)

const interval = () => { setInterval(Timer, 10) }

function Timer() {
  time.Change(10)
  TimerHtml.innerHTML = `${time.s < 10 ? '0' + time.s : time.s}:${time.ms / 10}`
}

window.addEventListener('deviceorientation', onDeviceMove)

function onDeviceMove(event) {
  devicePosition.UpdatePosition(event.alpha, event.beta, event.gamma)
}


function animate() {

  vector.Update(devicePosition.Beta, devicePosition.Gamma, Player.PositionX, Player.PositionY)
  Player.ChangePosition(vector.PositionX, vector.PositionY)
  const BallCenter = document.querySelector("#BallHelper")

  HoleHelper.forEach(hole => {
    if (elementsOverlap(BallCenter, hole)) {
      console.log("Bumm")
    }
  })

  ball.style.top = `${Math.round(Player.PositionY)}px`
  ball.style.left = `${Math.round(Player.PositionX)}px`
  //console.log(`${Math.round(Player.PositionY)}px`)
  requestAnimationFrame(animate)
}

const openMenu = () => {
  start_btn.style.display = 'none'
  menu.style.display = 'flex'

}

const SBSH = () => {
  menu.style.display = 'none'
  field.style.display = 'block'
  TimerHtml.style.display = 'block'
  GenerateHoles(1, Player.size)
  const BallHelper = document.createElement("div")
  BallHelper.setAttribute("id", "BallHelper")
  ball.appendChild(BallHelper)
  interval()
  requestAnimationFrame(animate)
}
start_btn.addEventListener('mousedown', openMenu)
SingleBallSingleHole.addEventListener('mousedown', SBSH)