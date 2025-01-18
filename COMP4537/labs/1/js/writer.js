
let notes = []
class NoteWriteElement {
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

    //Updates the text attribute of the note tied to this UIElement and stores to localStorage
    #updateNote() {
        this.note.text = this.textArea.value
        storeToLocalStorage()
    }

    //Removes the note from the array and deletes UI element
    #deleteNote() {
        this.note.removeNote(notes)
        storeToLocalStorage()
        this.UIelement.remove()
    }
}

(function(){
    //inject strings into the page
    document.getElementById("add-button").innerText = writerAddButton
    document.getElementById("last-stored-text").innerText = writerLastStoredText
    document.getElementById("writer-title").innerText = writerTitle
    document.getElementById("return-button").innerText = returnBtnText

    //Set eventListeners
    document.getElementById("add-button").addEventListener("click", (e) => {
        const note = new Note()
        notes.push(note)
        new NoteWriteElement(note)
    })

    document.getElementById("return-button").addEventListener("click", (e) => {
        window.location.href="../1/"
    })

    //immediately retrieve data from localStorage
    retrieveFromLocalStorage(notes)

    //if retrieved notes is not empty, populate the notes-container element
    if(notes.length != 0) {
        const container = document.getElementById("notes-container")
        for(let i = 0; i < notes.length; i++) {
            const nElement = new NoteWriteElement(notes[i])
            container.appendChild(nElement.UIelement)
        }
    }
})()



//Store the notes array to local storage
function storeToLocalStorage() {
    const stringifiedArr = JSON.stringify(notes)
    localStorage.setItem("data", stringifiedArr)
    updateTimeStamp()
}