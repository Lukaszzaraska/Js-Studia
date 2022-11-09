import { displayNote, NotesList, displayNotification, displayNewNotification, displayNewNote, displayEditNote } from "./Display.js"

const reset = document.querySelector('#reset')

reset.addEventListener("click", () => {
    localStorageCache = []
    localStorage.clear()
})

const send_button = document.querySelector('#createNewNote')
const sendEdit_button = document.querySelector('#SendEdit')
const Btn_FormsNewNotification = document.querySelector('#openNewNotification')
const Btn_FormsNewNote = document.querySelector('#openNewNote')
const Btn_undo_note_fromEdit = document.querySelector(`#undo_note_fromEdit`)
const Btn_undo = document.querySelector('#undo')
const Btn_undo_note = document.querySelector('#undo_note')

var localStorageCache = []


let rawData = null
send_button.addEventListener("click", () => {
    const title = document.querySelector('#Title')
    const body = document.querySelector('#BodyNewNote')
    const color = document.querySelector('#Colors')
    rawData = new RawData(title.value, body.value, color.value)
    AddNote(rawData.title, rawData.body, rawData.color)
    displayNote()
    title.value = '';
    body.value = '';
})
document.addEventListener('click', function (e) {
    if (e.target.className == 'material-symbols-outlined deleteBtn') {
        const obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.id)
        const htmlobj = document.querySelector(`#${obj.title}`)
        NotesList.removeChild(htmlobj)
        new Note(obj.title, obj.body, obj.color, obj.bold, obj.date).DeleteInStorage()
    }

    if (e.target.className == 'material-symbols-outlined editBtn') {
        displayEditNote()
        const obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.id)
        const titleEdit = document.querySelector("#EditTitle")
        const bodyEdit = document.querySelector("#BodyEditNote")
        const colorEdit = document.querySelector("#EditColors")

        titleEdit.value = obj.title
        bodyEdit.value = obj.body
        colorEdit.value = obj.color
    }
    if((e.target.className == 'PinImg')){
        const obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.id)
        obj.bold = !obj.bold
        //console.log(e.target)
        e.target.style.backgroundImage = "url('/Lab4/pinned.png')";
    }
    if((e.target.className == 'PinnedImg')){
        const obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.id)
        obj.bold = !obj.bold
        //console.log(e.target)
        e.target.style.backgroundImage = "url('/Lab4/pin.png')";
    }
});
sendEdit_button.addEventListener("click",()=>{
    const titleEdit = document.querySelector("#EditTitle")
    const bodyEdit = document.querySelector("#BodyEditNote")
    const colorEdit = document.querySelector("#EditColors")
    const index = Object.values(localStorageCache).findIndex((item) => item.title === titleEdit.value)

    var obj = localStorageCache.find((item) => item.title === titleEdit.value)
    obj.body=bodyEdit.value
    obj.color=colorEdit.value
    const htmlobj = document.querySelector(`#${obj.title}`)
    NotesList.removeChild(htmlobj)
    localStorageCache[index] = obj
    if (index > -1) { 
        localStorageCache.splice(index, 1);
    }
    AddNote(titleEdit.value,obj.body,obj.color)
    displayNote()
})
Btn_FormsNewNotification.addEventListener("click", () => {
    displayNotification()
})

Btn_undo.addEventListener("click", () => {
    displayNewNotification()
})

Btn_FormsNewNote.addEventListener("click", () => {
    displayNewNote()

})
Btn_undo_note.addEventListener("click", () => {
    displayNote()
});

Btn_undo_note_fromEdit.addEventListener("click", () => {
    displayNote()
})
class RawData {
    constructor(title, body, color) {
        this.title = title
        this.body = body
        this.color = color
    }
}

const ColorNote = {
    white: "rgb(0, 0, 0)",
    blue: "rgb(0, 0, 255)",
    red: "rgb(255, 0, 0)",
    green: "rgb(0, 255, 0)"
}

class Note {
    constructor(title, body, color, bold = false, date = Date.now()) {
        if (!isValidColor(color)) {
            throw new Error("Invalid color")
        }
        this.title = title
        this.body = body
        this.bold = bold
        this.date = date
        this.color = color
    }
    AddToStorage() {

        if (!(Object.values(localStorageCache).findIndex((item) => item.title === this.title) > -1)) {
            localStorageCache.push({ title: this.title, body: this.body, bold: this.bold, date: this.date, color: this.color, date: this.date })
            createElementNote(localStorageCache.find((x) => x.title === this.title))
        }

    }
    DeleteInStorage() {
        const index = localStorageCache.findIndex((item) => item.title === this.title);
        if (index > -1) { 
            localStorageCache.splice(index, 1);
        }
    }

}

const isValidColor = (color) => {
    return Object.keys(ColorNote).includes(color)
}
const AddNote = (title, body, color) => {
    new Note(title, body, color).AddToStorage()
}
const createElementNote = (key) => {
    const NewNote = document.querySelector('#contentNote')
    var note = document.createElement("div")
    var pin_btn = document.createElement("div")
    var title = document.createElement("div")
    var span = document.createElement("span")
    var delete_btn = document.createElement("button")
    var edit_btn = document.createElement("button")
    var options = document.createElement("div")
    const data = localStorageCache.find((x) => key.title === x.title)
    note.setAttribute("class", "templatesNote")
    note.style.borderColor = data.color;
    if(data.bold){
        pin_btn.setAttribute("class","PinnedImg")
    }else{
        pin_btn.setAttribute("class","PinImg")
    }
   
    edit_btn.setAttribute("class", "material-symbols-outlined editBtn")
    edit_btn.innerHTML = "drive_file_rename_outline"
    delete_btn.setAttribute("class", "material-symbols-outlined deleteBtn")
    delete_btn.innerHTML = "delete"
    span.setAttribute("class","PinNote")
    title.setAttribute("class", "TitleNote")
    title.innerHTML = data.title
    note.setAttribute("id", data.title)
    options.setAttribute("class", "OptionsNote")
    options.appendChild(edit_btn)
    options.appendChild(delete_btn)
    span.appendChild(pin_btn)
    span.appendChild(title)
    note.appendChild(span)
    note.appendChild(options)
    NewNote.appendChild(note)

}
window.onload = () => {

    localStorageCache = allStorage()

    localStorageCache.forEach((item) => {

        createElementNote(item)
    })
}
window.addEventListener('beforeunload', function () {

    localStorageCache.forEach((item) => {
        //   console.log(item)
        localStorage.setItem(item.title, JSON.stringify(item))
    })

});

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
}
