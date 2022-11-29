import { Hole } from "./Classes.js";

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

export const constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low)
}
export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}
export const GenerateHoles = (count) => {
  const Field = document.querySelector("#field")
for (let index = 0; index < count; index++) {
  
  let holeObj = new Hole()
  const hole = document.createElement('div')
  hole.setAttribute("class","hole")
  hole.style.width = `${Math.round(holeObj.size*2)}px`
  hole.style.height = `${Math.round(holeObj.size*2)}px`

  hole.style.top = `${Math.round(holeObj.PositionY)}px`
  hole.style.left = `${Math.round(holeObj.PositionX)}px`
  Field.appendChild(hole)
}
}  