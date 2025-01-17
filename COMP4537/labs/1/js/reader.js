class NoteReadElement {
    constructor(string) {
        const container = document.createElement("div")
        const textSpan = document.createElement("span")

        textSpan.innerText = string

        container.appendChild(textSpan)
        document.getElementById("notes-container").appendChild(container)
    }
}


(function() {
    document.getElementById("reader-title").innerText = readerTitle

    const notes = []

    retrieveFromLocalStorage(notes)
    renderNotes(notes)

    setInterval(() => {
        retrieveFromLocalStorage(notes)
        renderNotes(notes)
    }, 2000)
})()

function renderNotes(notes) {
    document.getElementById("notes-container").replaceChildren()
    for(let i = 0; i < notes.length; i++) {
        new NoteReadElement(notes[i].text)
    }
}

//need to implement timestamp thing