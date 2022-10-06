

const liczba1 =  document.querySelector('#liczba1')
const liczba2 =  document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')
const przeliczBtn = document.querySelector("#przelicz")
const input = document.querySelectorAll('.inputField')
const wynik = document.querySelector('#wynik');
const wynik2 = document.querySelector('#wynik2');
const wynik3 = document.querySelector('#wynik3');
const wynik4 = document.querySelector('#wynik4');
input.forEach(element=>

element.addEventListener('input',przelicz)

)

przeliczBtn.addEventListener('click',()=>{
wynik.innerHTML = `Suma: ${Number.parseInt(liczba1.value)+Number.parseInt(liczba2.value)+Number.parseInt(liczba3.value)+Number.parseInt(liczba4.value)}`
wynik2.innerHTML = `Min : ${Math.min(parseInt(liczba1.value),parseInt(liczba2.value),parseInt(liczba3.value),parseInt(liczba4.value))}`
wynik3.innerHTML = `Max : ${Math.max(parseInt(liczba1.value),parseInt(liczba2.value),parseInt(liczba3.value),parseInt(liczba4.value))}`
wynik4.innerHTML = `Średnia : ${(parseInt(liczba1.value)+parseInt(liczba2.value)+parseInt(liczba3.value)+parseInt(liczba4.value))/4} `
})
function przelicz(){
    let sum=0
    let tab=[]
for(let x=1;x<5;x++)
{
const field = parseInt(eval(`liczba${x}.value`))
if(isNaN(field))
{
    continue
}
sum+=field
tab.push(field)
}
console.log(tab)
wynik.innerHTML = `Suma : ${sum}`
wynik2.innerHTML = `Min : ${Math.min(...tab)}`
//wynik.innerHTML = `Suma: ${Number.parseInt(liczba1.value)+Number.parseInt(liczba2.value)+Number.parseInt(liczba3.value)+Number.parseInt(liczba4.value)}`
//wynik2.innerHTML = `Min : ${Math.min(parseInt(liczba1.value),parseInt(liczba2.value),parseInt(liczba3.value),parseInt(liczba4.value))}`
wynik3.innerHTML = `Max : ${Math.max(parseInt(liczba1.value),parseInt(liczba2.value),parseInt(liczba3.value),parseInt(liczba4.value))}`
wynik4.innerHTML = `Średnia : ${(parseInt(liczba1.value)+parseInt(liczba2.value)+parseInt(liczba3.value)+parseInt(liczba4.value))/4} `
}