'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const timeElement = document.querySelector('#timestamp')
const removeElement = document.querySelector('#remove-note')

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    // If note is not found, redirect to index.html
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
timeElement.textContent = generateLastEdited(note.updated)

titleElement.addEventListener('input', (e) => {
    // Update notes title on input, update when edited, save to local storage
    note.title = e.target.value
    note.updated = moment().valueOf()
    timeElement.textContent = generateLastEdited(note.updated)
    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    // Update notes body on input, update when edited, save to local storage
    note.body = e.target.value
    note.updated = moment().valueOf()
    timeElement.textContent = generateLastEdited(note.updated)
    saveNotes(notes)
})

removeElement.addEventListener('click', () => {
    // Delete a note, redirect back to index.html
    removeNote(noteId)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    // Update other pages data when local storage is updated
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteId)

        if (!note) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        timeElement.textContent = generateLastEdited(note.updated)
    }
})