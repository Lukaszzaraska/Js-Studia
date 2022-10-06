
const NewField = document.querySelector('#dodaj')
const przeliczBtn = document.querySelector("#przelicz")
const output = document.querySelector('#newField')
const wynik = document.querySelector('#wynik');
const wynik2 = document.querySelector('#wynik2');
const wynik3 = document.querySelector('#wynik3');
const wynik4 = document.querySelector('#wynik4');
const btn = document.querySelectorAll('.del')
const delete_btn=document.querySelectorAll('.delete')

let input = document.querySelectorAll('.inputField')
let index =1
let tab_field=[]

window.onload = () => {
    for (let index = 0; index < 3; index++) {
        add_field()
    }
  };
NewField.addEventListener('click',()=>{
   add_field()
})
input.forEach(element=>
    element.addEventListener('input',przelicz)
    )
function przelicz(){
    let sum=0
    let tab=[]

tab_field.forEach (element=>{
    console.log(element)
let field = parseInt(eval(`liczba${element.slice(-1)}.value`))
if(!isNaN(field))
{
    sum+=field
    tab.push(field)
}

wynik.innerHTML = `Suma : ${sum}`
wynik2.innerHTML = `Min : ${Math.min(...tab)}`
wynik3.innerHTML = `Max : ${Math.max(...tab)}`
let suma=0
tab.forEach(x=>{
suma=suma+parseInt(x)
}
)
wynik4.innerHTML = `Średnia : ${suma/tab.length}`
})
}
function add_field(){
    var field_new =document.createElement("div")
    var vdiv = document.createElement("input")
    var del_btn = document.createElement("button")
    field_new.setAttribute("id",`del${index}`)
    field_new.setAttribute("class",'Oneline')
    del_btn.setAttribute("class",`del`)
    vdiv.setAttribute("id", `liczba${index}`)
    vdiv.setAttribute("class", `inputField`)
    del_btn.setAttribute("onclick", "remove(this.parentNode.id)")
    del_btn.setAttribute("class","fa fa-trash btn_del")
    index+=1
    field_new.appendChild(del_btn)
    field_new.appendChild(vdiv)
    output.appendChild(field_new)
    tab_field.push(vdiv.id)
    input = document.querySelectorAll('.inputField')
    vdiv.addEventListener('input',przelicz)
}
function remove(e) {
    if(tab_field.length>2)
    {
        var index = tab_field.indexOf(`liczba${e.slice(-1)}`);
        if (index !== -1) {
          tab_field.splice(index, 1);
        }
        document.querySelector(`#${e}`).remove()
        document.getElementById("wrong").style.display="none"
        przelicz()
    }else{
        document.getElementById("wrong").style.display="block"
    }


}