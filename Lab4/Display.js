const HeadersNotesList = document.querySelector('#headingNote')
const FormsNotesList = document.querySelector('#headingNewNote')
const ContentNewNote = document.querySelector('#contentNewNote')
export const NotesList = document.querySelector('#contentNote')

const Notification = document.querySelector('#headingNotification')
const NotificationList = document.querySelector('#contentNotification')

const FormsNewNotification = document.querySelector('#headingNewNotification')
const ContentNewNotification = document.querySelector('#contentNewNotification')

const HeadersEditNote = document.querySelector('#headingEditNote')
const ContentEditNote = document.querySelector('#contentEditNote')

export function displayNotification() {
    Notification.style.display = "flex"
    NotificationList.style.display = "flex"
    FormsNewNotification.style.display = "none"
    ContentNewNotification.style.display = "none"
}
export function displayNewNotification() {
    Notification.style.display = "none"
    NotificationList.style.display = "none"
    FormsNewNotification.style.display = "flex"
    ContentNewNotification.style.display = "flex"
}
export function displayNote() {
    HeadersNotesList.style.display = "flex"
    FormsNotesList.style.display = "none"
    ContentNewNote.style.display = "none"
    NotesList.style.display = "flex"
    HeadersEditNote.style.display = "none"
    ContentEditNote.style.display = "none"
}
export function displayNewNote() {
    HeadersNotesList.style.display = "none"
    FormsNotesList.style.display = "flex"
    ContentNewNote.style.display = "flex"
    NotesList.style.display = "none"
}
export function displayEditNote() {
    HeadersEditNote.style.display = "flex"
    ContentEditNote.style.display = "flex"
    NotesList.style.display = "none"
    HeadersNotesList.style.display = "none"
}

