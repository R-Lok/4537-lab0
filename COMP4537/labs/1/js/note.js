class Note {
    constructor(string = "") {
        this.text = string
    }

    removeNote(notes) {
        const idx = notes.findIndex(element => element === this)
        notes.splice(idx, 1)
    }
}

class NoteElement {
    constructor(note, notes, editable = true) {
        this.note = note

        const container = document.createElement("div")
        this.UIelement = container

        const textArea = document.createElement("textarea")
        this.textArea = textArea

        const btn = document.createElement("button")

        container.classList.add("editable-note")
        container.appendChild(textArea)

        textArea.value = note.text
        textArea.addEventListener("input", (e) => {
            this.#updateNote()
            storeToLocalStorage(notes)
        })

        if (editable) {
            btn.textContent = writerRemoveButton
            btn.addEventListener("click", (e) => {
                this.#deleteNote(notes)
                storeToLocalStorage(notes)
            })
            container.appendChild(btn)
        } else {
            textArea.disabled = true
        }
        document.getElementById("notes-container").append(container)
    }

    //Updates the text attribute of the note tied to this UIElement and stores to localStorage
    #updateNote() {
        this.note.text = this.textArea.value
    }

    //Removes the note from the array and deletes UI element
    #deleteNote(notes) {
        this.note.removeNote(notes)
        this.UIelement.remove()
    }
}

//Retrieves the notes from local storage and populates the array
function retrieveFromLocalStorage(arr) {
    const stringifiedArr = localStorage.getItem("data")
    if (stringifiedArr) {
        const parsedNotes = JSON.parse(stringifiedArr)
        arr.length = 0
        arr.push(...parsedNotes.map(obj => {
            return new Note(obj.text)
        }))
    }
}

//Store the notes array to local storage
function storeToLocalStorage(notes) {
    const stringifiedArr = JSON.stringify(notes)
    localStorage.setItem("data", stringifiedArr)
    updateTimeStamp()
}

//renders the notes in editable or non editable mode (writer vs reader)
function renderNotes(notes, editable) {
    document.getElementById("notes-container").replaceChildren()
    for(let i = 0; i < notes.length; i++) {
        new NoteElement(notes[i], notes, editable)
    }
    updateTimeStamp()
}