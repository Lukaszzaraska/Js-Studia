const button = document.querySelector("#random")
const result = document.querySelector("#result")
let child = document.querySelectorAll(".row")
function generate() {
    child = document.querySelectorAll(".row")
    child.forEach(x=>{
        result.removeChild(x)
    })
  
   let tab = shuffle(numbers)

    for (let index = 0; index < 21; index++) {
        const row = document.createElement("div")
        row.setAttribute("class", "row")
        row.innerHTML = tab[index]
        result.appendChild(row)

    }

}

button.addEventListener("click", generate)

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  
