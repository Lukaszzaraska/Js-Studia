import { displayNote, NotesList, displayNotification, displayNewNotification, displayNewNote, displayEditNote } from "./Display.js"

const reset = document.querySelector('#reset')

reset.addEventListener("click", () => {
    localStorageCache = []
    localStorage.clear()
    NotificationList = []
})

const send_button = document.querySelector('#createNewNote')
const send_button_Notification = document.querySelector("#createNewNotification")
const sendEdit_button = document.querySelector('#SendEdit')
const Btn_FormsNewNotification = document.querySelector('#openNewNotification')
const Btn_FormsNewNote = document.querySelector('#openNewNote')
const Btn_undo_note_fromEdit = document.querySelector(`#undo_note_fromEdit`)
const Btn_undo = document.querySelector('#undo')
const Btn_undo_note = document.querySelector('#undo_note')
const Lightbox = document.querySelector('#lightBox')
const LightboxSearch = document.querySelector('#lightBoxSearch')
const SelectNotesList = document.querySelector("#NotesList")
const NotificationListDisplay = document.querySelector("#contentNotification")

var localStorageCache = []
let rawData = null
var ResultList = []
var NotificationList = []

const Search = document.querySelector("#search")

const interval = setInterval(NotificationTest, 5000)

function NotificationTest(){
const actualTime = Date.now()
NotificationList.forEach(x=>{
    let toTimestamp = Date.parse(x.date)
    if((actualTime-toTimestamp)>0){
        if(x.bold!=true){
            x.ChangeBold()
        }
    }
    if(x.bold===true){
        const elements = document.querySelectorAll("[data-idNotification]")
        elements.forEach(x=>{
            console.log(x.dataset.idNotification)
        })
    }
})
//console.log(actualTime)
}

send_button_Notification.addEventListener("click", () => {
    const date = document.querySelector(`input[type="datetime-local"]`)
    const NoteToNotification = document.querySelector("#NotesList")
    NotificationList.push(new Notification(NoteToNotification.value, (date.value).toLocaleString()))
    NotificationList.forEach(x => {
        CreateElementNotification(x)
    })
    displayNotification()
})
function CreateElementNotification(item) {
    const templatesNotification = document.createElement("div")
    templatesNotification.setAttribute("data-idNotification", item.title)
    const NotificationDate = document.createElement("div")
    const title = document.createElement("div")
    title.setAttribute("class", "titleNotification")
    templatesNotification.setAttribute("class", "templatesNotification")

    NotificationDate.innerHTML = item.date
    title.innerHTML = item.title
    templatesNotification.appendChild(title)
    templatesNotification.appendChild(NotificationDate)
    NotificationListDisplay.appendChild(templatesNotification)
}
class Notification {
    constructor(title, date, bold = false, afterBold=false) {
        this.title = title
        this.date = date
        this.bold = bold
        this.afterBold = afterBold
    }
    ChangeBold() {
        this.bold = !this.bold
    }
}
Search.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        ResultList = []
        const resultTitle = localStorageCache.find((item) => item.title === Search.value)
        if (resultTitle !== undefined) {
            ResultList.push([[resultTitle], "Title"])
        }

        var resultTag = []
        localStorageCache.forEach(x => {
            (x.tag).forEach(y => {
                if (y === Search.value) {
                    const ItemAdd = localStorageCache.find((item) => item.title === x.title)
                    resultTag.push(ItemAdd)
                }
            })
        })
        if (resultTag !== undefined && resultTag.length !== 0) {
            ResultList.push([resultTag, "Tag"])
        }

        var resultBody = []
        localStorageCache.forEach(x => {
            const index = x.body.search(Search.value)
            if (index !== -1) {
                const ItemAdd = localStorageCache.find((item) => item.title === x.title)
                resultBody.push(ItemAdd)
            }
        })
        if (resultBody !== undefined && resultBody.length !== 0) {
            ResultList.push([resultBody, "Body"])
        }
        const SearchList = document.querySelector("#contentSearch")
        if (resultBody !== undefined && ResultList.length !== 0) {

            LightboxSearch.style.display = "block"

            ResultList.map(x => {
                const result = document.querySelector(`#${x[0][0].title}`)
                const destination = document.createElement("div")
                destination.setAttribute("class", "destination")
                const destinationClone = destination.cloneNode(true)
                const Resultclone = result.cloneNode(true)
                const id = Resultclone.id
                Resultclone.removeAttribute('id')
                Resultclone.setAttribute("data-id", id)
                destinationClone.innerHTML = "from: " + x[1]
                Resultclone.appendChild(destinationClone)
                SearchList.appendChild(Resultclone)
            })
        }
    }
});

send_button.addEventListener("click", () => {
    const title = document.querySelector('#Title')
    const body = document.querySelector('#BodyNewNote')
    const color = document.querySelector('#Colors')
    const tag = document.querySelectorAll('.RdyTag')
    var tagTab = []
    tag.forEach(OneTag => {
        tagTab.push(OneTag.id)
    })

    rawData = new RawData(title.value, body.value, color.value, tagTab)
    AddNote(rawData.title, rawData.body, rawData.color, rawData.tag)
    displayNote()
    title.value = '';
    body.value = '';
    tag.value = '#tag';
    tag.forEach(removeTag => {
        removeTag.remove()
    })
})
function RebuildListNote() {
    NotesList.replaceChildren()
    localStorageCache.sort(dynamicSortMultiple("-bold", "title"));
    localStorageCache.forEach((item) => {
        createElementNote(item)
        SelectNotesList.options[SelectNotesList.options.length] = new Option(`${item.title}`, `${item.title}`);
    })
}
function RebuildListNotification() {
    NotificationListDisplay.replaceChildren()
    // localStorageCache.sort(dynamicSortMultiple("-bold", "title"));
    NotificationList.forEach((item) => {
        CreateElementNotification(item)
        SelectNotesList.options[SelectNotesList.options.length] = new Option(`${item.title}`, `${item.title}`);
    })
}
document.addEventListener('click', function (e) {
    if (e.target.id !== "lightBoxSearch" && LightboxSearch.style.display === "block") {
        LightboxSearch.style.display = "none"
        const ToRemoveChild = document.querySelectorAll(".templatesNote")
        ToRemoveChild.forEach(x => {
            if (x.hasAttribute("data-id")) {
                x.remove()
            }
        })
    }

    if (e.target.className == 'material-symbols-outlined deleteBtn') {
        const obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.id)
        const htmlobj = document.querySelector(`#${obj.title}`)
        NotesList.removeChild(htmlobj)
        new Note(obj.title, obj.body, obj.color, obj.bold, obj.date, obj.tag).DeleteInStorage()
    }

    if (e.target.className == 'material-symbols-outlined editBtn') {
        displayEditNote()
        console.log(e.target.parentNode)
        console.log((e.target.parentNode).parentNode.dataset.id)
        var obj
        if ((e.target.parentNode).parentNode.dataset.id !== undefined) {
            obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.dataset.id)
        } else {
            obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.id)
        }
        const titleEdit = document.querySelector("#EditTitle")
        const bodyEdit = document.querySelector("#BodyEditNote")
        const colorEdit = document.querySelector("#EditColors")

        titleEdit.value = obj.title
        bodyEdit.value = obj.body
        colorEdit.value = obj.color
    }
    if ((e.target.className == 'PinImg') || (e.target.className == 'PinnedImg')) {


        var obj
        if ((e.target.parentNode).parentNode.dataset.id !== undefined) {
            obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.dataset.id)
        } else {
            obj = localStorageCache.find((item) => item.title === (e.target.parentNode).parentNode.id)
        }

        obj.bold = !obj.bold

        if (obj.bold) {
            e.target.style.backgroundImage = "url('/Lab4/starred.png')";
        } else {
            e.target.style.backgroundImage = "url('/Lab4/star.png')";
        }
        RebuildListNote()

    }
    if (e.target.className == 'templatesNote' || (e.target.id == 'lightBox')) {
        if (Lightbox.style.display === "block") {
            Lightbox.style.display = "none"

        } else {
            const obj = localStorageCache.find((item) => item.title === (e.target.id))
            const content = document.querySelector('#ContentLightBox')
            const title = document.querySelector('#titleLightBox')
            const color = document.querySelector('#colorLightBox')
            title.innerHTML = "Title: " + obj.title
            color.innerHTML = "Color: " + obj.color
            content.innerHTML = obj.body
            Lightbox.style.display = "block"
        }

    }
    if (Lightbox.style.display === "block") {
        if (e.target.className === "body") {
            Lightbox.style.display = "none"
        }
    }
});
sendEdit_button.addEventListener("click", () => {
    const titleEdit = document.querySelector("#EditTitle")
    const bodyEdit = document.querySelector("#BodyEditNote")
    const colorEdit = document.querySelector("#EditColors")
    const index = Object.values(localStorageCache).findIndex((item) => item.title === titleEdit.value)

    var obj = localStorageCache.find((item) => item.title === titleEdit.value)
    obj.body = bodyEdit.value
    obj.color = colorEdit.value
    const htmlobj = document.querySelector(`#${obj.title}`)
    console.log(htmlobj)
    NotesList.removeChild(htmlobj)
    localStorageCache[index] = obj
    if (index > -1) {
        localStorageCache.splice(index, 1);
    }
    AddNote(titleEdit.value, obj.body, obj.color, obj.tag)

    displayNote()
})
Btn_FormsNewNotification.addEventListener("click", () => {
    displayNewNotification()
})

Btn_undo.addEventListener("click", () => {
    displayNotification()
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
    constructor(title, body, color, tag) {
        this.title = title
        this.body = body
        this.color = color
        this.tag = tag
    }
}

const ColorNote = {
    white: "rgb(0, 0, 0)",
    blue: "rgb(0, 0, 255)",
    red: "rgb(255, 0, 0)",
    green: "rgb(0, 255, 0)"
}

class Note {
    constructor(title, body, color, tag, bold = false, date = Date.now()) {
        if (!isValidColor(color)) {
            throw new Error("Invalid color")
        }
        this.title = title
        this.body = body
        this.bold = bold
        this.date = date
        this.color = color
        this.tag = tag

    }

    AddToStorage() {
        if (!(Object.values(localStorageCache).findIndex((item) => item.title === this.title) > -1)) {
            localStorageCache.push({ title: this.title, body: this.body, bold: this.bold, date: this.date, color: this.color, date: this.date, tag: this.tag })
            createElementNote(localStorageCache.find((x) => x.title === this.title))
        }

    }
    DeleteInStorage() {
        const index = localStorageCache.findIndex((item) => item.title === this.title);
        const indexNotification = NotificationList.findIndex((item) => item.title === this.title);
        if (index > -1) {
            localStorageCache.splice(index, 1);
            if (indexNotification > -1) {
                NotificationList.splice(indexNotification, 1);
                RebuildListNotification()
            }
            console.log(localStorageCache)
        }
    }

}

const isValidColor = (color) => {
    return Object.keys(ColorNote).includes(color)
}
const AddNote = (title, body, color, tag) => {
    new Note(title, body, color, tag).AddToStorage()

}
const createElementNote = (key) => {
    const NewNote = document.querySelector('#contentNote')
    const color_circle = document.createElement('span')
    const note = document.createElement("div")
    const pin_btn = document.createElement("div")
    const title = document.createElement("div")
    const span = document.createElement("span")
    const NewTag = document.createElement("div")
    const delete_btn = document.createElement("button")
    const edit_btn = document.createElement("button")
    const options = document.createElement("div")
    const dateDisplay = document.createElement("div")
    NewTag.setAttribute("class", "Tag")
    const data = localStorageCache.find((x) => key.title === x.title)
    note.setAttribute("class", "templatesNote")
    dateDisplay.setAttribute("class", "date")
    color_circle.setAttribute("class", "dot")
    color_circle.style.backgroundColor = data.color;
    dateDisplay.innerHTML = new Date(data.date).toISOString().slice(0, 10)
    if (data.bold) {
        pin_btn.setAttribute("class", "PinnedImg")
    } else {
        pin_btn.setAttribute("class", "PinImg")
    }

    edit_btn.setAttribute("class", "material-symbols-outlined editBtn")
    edit_btn.innerHTML = "drive_file_rename_outline"
    delete_btn.setAttribute("class", "material-symbols-outlined deleteBtn")
    delete_btn.innerHTML = "delete"
    span.setAttribute("class", "PinNote")
    title.setAttribute("class", "TitleNote")
    title.innerHTML = data.title
    note.setAttribute("id", data.title)
    options.setAttribute("class", "OptionsNote")
    options.appendChild(dateDisplay)
    options.appendChild(edit_btn)
    options.appendChild(delete_btn)
    span.appendChild(pin_btn)
    span.appendChild(color_circle)
    span.appendChild(title)
    note.appendChild(span)
    note.appendChild(options)
    NewNote.appendChild(note)

}
window.onload = () => {

    localStorageCache = allStorageNote()[0]
    NotificationList = allStorageNote()[1]
    localStorageCache.sort(dynamicSortMultiple("-bold", "title"));
    localStorageCache.forEach((item) => {
        createElementNote(item)
        SelectNotesList.options[SelectNotesList.options.length] = new Option(`${item.title}`, `${item.title}`);
    })
    NotificationList.forEach(item => {
        CreateElementNotification(item)
    })
}
window.addEventListener('beforeunload', function () {

    localStorage.clear()
    localStorageCache.forEach((item) => {
        localStorage.setItem(item.title, JSON.stringify(item))
    })
    NotificationList.forEach(item => {
        localStorage.setItem(item.title + " ", new Notification(item.title,item.date,item.bold,item.afterBold) )
    })

});

function allStorageNote() {
    var valueNotification = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        if (keys[i].slice(-1) !== " ") {
           
            values.push(JSON.parse(localStorage.getItem(keys[i])));
        } else {
            console.log(JSON.stringify(localStorage.getItem(keys[i])))
            valueNotification.push(JSON.parse(localStorage.getItem(keys[i])));
        }

    }

    return [values, valueNotification];
}
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function dynamicSortMultiple() {

    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;

        while (result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}