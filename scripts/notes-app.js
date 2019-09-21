'use strict'

// Get saved notes from local storage
let notes = getSavedNotes()

// Object of filters 
const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    // When note is created, create an ID and timestamp and push attributes to notes array
    let noteId = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: noteId,
        title: '',
        body: '',
        created: timestamp,
        updated: timestamp
    })
    saveNotes(notes)
    document.location.assign(`/note.html#${noteId}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    // Render notes with text filter
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    // Render notes with a specific sort
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    // Update notes when local storage is modified
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})