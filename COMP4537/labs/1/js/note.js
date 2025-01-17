class Note {
    constructor(string = "") {
        this.text = string
    }

    removeNote(notes) {
        const idx = notes.findIndex(element => element === this)
        notes.splice(idx, 1)
    }
}

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
