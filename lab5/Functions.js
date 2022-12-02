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
export function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}
export const GenerateHoles = (count,PlayerSize) => {
  const Field = document.querySelector("#field")
for (let index = 0; index < count; index++) {
  
  let holeObj = new Hole()
  const hole = document.createElement('div')
  const holeCenter = document.createElement('div')
  holeCenter.setAttribute("class","holeHelper")
  holeCenter.style.width = `${Math.round((holeObj.size-PlayerSize)*2)}px`
  holeCenter.style.height = `${Math.round((holeObj.size-PlayerSize)*2)}px`
  

  holeCenter.style.top = `${Math.round(holeObj.size/2)}px`
  holeCenter.style.left = `${Math.round(holeObj.size/2)}px`

  hole.setAttribute("class","hole")
  hole.style.width = `${Math.round(holeObj.size*2)}px`
  hole.style.height = `${Math.round(holeObj.size*2)}px`

  hole.style.top = `${Math.round(holeObj.PositionY)}px`
  hole.style.left = `${Math.round(holeObj.PositionX)}px`

  hole.appendChild(holeCenter)
  Field.appendChild(hole)
}
}  