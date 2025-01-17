(function(){
    //inject strings into the page
    document.getElementById("page-title").innerText = indexTitle
    document.getElementById("writer").innerText = indexWriterButton
    document.getElementById("reader").innerText = indexReaderButton
})()


class WriteElement {
    constructor() {
        const container = document.createElement("div")
        container.classList.add("write-container")

        const removeButton = document.createElement("button")
        
        container.appendChild(document.createElement("textarea"))
        
        
    }
}