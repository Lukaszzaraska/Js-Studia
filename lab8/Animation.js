const ToMain = document.querySelector("#ToMain")
const ToMenu = document.querySelector("#ToMenu")
const Localized = document.querySelector("#Localization")
ToMenu.addEventListener("click", makeALoopWait)
ToMain.addEventListener("click", Shrink)

const delay = async (ms = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms))

async function makeALoopWait() {
  for (let index = -300; index < 1; index += 5) {
    await delay(1)
    Localized.style.left = `${index}px`
  }
}
async function Shrink() {
  for (let index = 1; index > -305; index -= 5) {
    await delay(1)
    Localized.style.left = `${index}px`
  }
}