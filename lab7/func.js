import { cursor } from "./main.js"
import { CanvaH, CanvaW } from "./main.js"

const Body = document.querySelector("body")
export const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}
export const dist = (x1, x2, y1, y2) => {
  const result = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
  return result;
}
export const getCursorPosition = (x, y) => {
  cursor.Update(x, y)
}
export const CreateCanva = () => {
  const canva = document.createElement("canvas")
  canva.setAttribute("id", "myCanvas")
  canva.setAttribute('width', `${CanvaW}`);
  canva.setAttribute('height', `${CanvaH}`);
  Body.appendChild(canva)
}
export const map = (value, start1, stop1, start2, stop2, withinBounds = false) => {
  const newval = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}
