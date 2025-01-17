
let notes = []
class Note {
    constructor(string = "") {
        this.text = string
    }

    removeNote() {
        const idx = notes.findIndex(element => element === this)
        notes.splice(idx, 1)
        storeToLocalStorage()
    }
}
class NoteElement {
    constructor(note) {
        this.note = note

        const container = document.createElement ("div")
        this.UIelement = container

        const textArea = document.createElement("textarea")
        this.textArea = textArea

        const btn = document.createElement("button")

        container.classList.add("editable-note")
        container.appendChild(textArea)
        container.appendChild(btn)

        textArea.value = note.text
        textArea.addEventListener("input", (e) => {
            this.#updateNote()
        })

        btn.textContent = writerRemoveButton
        btn.addEventListener("click", (e) => {
            this.#deleteNote()
        })

        document.getElementById("notes-container").append(container)
        storeToLocalStorage()
    }

    #updateNote() {
        this.note.text = this.textArea.value
        storeToLocalStorage()
    }

    #deleteNote() {
        this.note.removeNote()
        this.UIelement.remove()
    }
}

(function(){
    //inject strings into the page
    document.getElementById("add-button").innerText = writerAddButton
    document.getElementById("last-stored-text").innerText = writerLastStoredText

    //immediately retrieve data from localStorage
    retrieveFromLocalStorage()

    if(notes.length != 0) {
        const container = document.getElementById("notes-container")
        for(let i = 0; i < notes.length; i++) {
            const nElement = new NoteElement(notes[i])
            container.appendChild(nElement.UIelement)
        }
    }
})()

document.getElementById("add-button").addEventListener("click", (e) => {
    const note = new Note()
    notes.push(note)
    new NoteElement(note)
})

function storeToLocalStorage() {
    const stringifiedArr = JSON.stringify(notes)
    localStorage.setItem("data", stringifiedArr)
    updateTimeStamp()
}

function retrieveFromLocalStorage() {
    const stringifiedArr = localStorage.getItem("data")
    if (stringifiedArr) {
        const parsedNotes = JSON.parse(stringifiedArr)
        notes = parsedNotes.map(obj => {
            return new Note(obj.text)
        })
    }
}

function updateTimeStamp() {
    const span = document.getElementById("timestamp")
    const currentDate = new Date()

    //Used some ChatGPT here to modify my logic to ensure the timestamps have 2 digits at all times for each field
    span.innerText = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
}