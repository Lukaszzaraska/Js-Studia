const tab = []
for (let index = 1; index < 101; index++) {
    tab.push(index)
}
let div3 = 0
let div5 = 0
tab.forEach(liczba => {

    //sposób 1
    div3++
    div5++
    div3 === 3 && div5 === 5 ? (console.log("FizzBuzz"), div3 = 0, div5 = 0) : div3 === 3 ? (console.log("Fizz"), div3 = 0) : div5 === 5 ? (console.log("Buzz"), div5 = 0) : console.log(liczba)

    //Sposób 2
    console.log(liczba % 5 == 0 && liczba % 3 == 0 ? "FizzBuzz" : liczba % 5 == 0 ? "Buzz" : liczba % 3 == 0 ? "Fizz" : liczba)

})


