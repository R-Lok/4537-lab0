(function() {
    document.getElementById("reader-title").innerText = readerTitle
    document.getElementById("return-button").innerText = returnBtnText
    document.getElementById("last-updated").innerText = readerLastUpdatedText
    
    document.getElementById("return-button").addEventListener("click", (e) => {
        window.location.href="../1/"
    })

    const notes = []

    retrieveFromLocalStorage(notes)
    renderNotes(notes, false)
    
    //Fetch notes from localStorage every 2 seconds
    setInterval(() => {
        retrieveFromLocalStorage(notes)
        renderNotes(notes, false)
    }, 2000)
})()

