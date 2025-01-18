function createNoteElement(string) {
    const container = document.createElement("div")
    const textSpan = document.createElement("span")
    textSpan.innerText = string
    container.appendChild(textSpan)
    document.getElementById("notes-container").appendChild(container)    
}


(function() {
    document.getElementById("reader-title").innerText = readerTitle
    document.getElementById("return-button").innerText = returnBtnText
    document.getElementById("last-updated").innerText = readerLastUpdatedText
    
    document.getElementById("return-button").addEventListener("click", (e) => {
        window.location.href="../1/"
    })

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
        createNoteElement(notes[i].text)
    }
    updateTimeStamp()
}