//Updates the Timestamp UI element
function updateTimeStamp() {
    const span = document.getElementById("timestamp")
    const currentDate = new Date()

    //Used some ChatGPT here to modify my logic to ensure the timestamps have 2 digits at all times for each field
    span.innerText = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
}