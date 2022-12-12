const body = document.querySelector("body");
export const CreateTile = () => {
    const canva = document.createElement("canvas");
    canva.setAttribute("id", "Tile");
    canva.setAttribute('width', `400`);
    canva.setAttribute('height', `700`);
    body.appendChild(canva);
}
export const getRandom = (chance, max) => {

    const value = Math.round(map(chance, 0, max, 0, 100, false))
    let chanceTab = [...Array(value).keys()];

    const num = Math.round(Math.random() * 100);

    if (chanceTab.includes(num)) {
        return true;
    }
    return false;
}
export const getRandomNum = (min, max) => {
    return Math.random() * (max - min) + min;
  }
export const RandomHeight = (chance)=>{
    let height = 0
    if(getRandom(chance, 700)){
        height++
    }else{
        return height
    }
}
const map = (value, start1, stop1, start2, stop2, withinBounds = false) => {
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