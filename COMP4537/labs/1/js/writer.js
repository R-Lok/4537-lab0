(function(){
    let notes = [];
    //inject strings into the page
    document.getElementById("add-button").innerText = writerAddButton
    document.getElementById("last-stored-text").innerText = writerLastStoredText
    document.getElementById("writer-title").innerText = writerTitle
    document.getElementById("return-button").innerText = returnBtnText

    //Set eventListeners
    document.getElementById("add-button").addEventListener("click", (e) => {
        const note = new Note()
        notes.push(note)
        new NoteElement(note, notes)
    })

    document.getElementById("return-button").addEventListener("click", (e) => {
        window.location.href="../1/"
    })

    //immediately retrieve data from localStorage
    retrieveFromLocalStorage(notes)

    //if retrieved notes is not empty, populate the notes-container element
    if(notes.length != 0) {
        renderNotes(notes, true)
    }
})()