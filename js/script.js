let game;
class Game {
    constructor(numButtons) {
        this.numButtons = numButtons
        this.buttons = []
        this.container = document.createElement('div')
        this.container.style.width = '100%'
        this.container.style.height = '90%'
        this.container.style.position = 'relative'
        document.body.appendChild(this.container)
    }

    createButtons() {
        for (let i = 0; i < this.numButtons; i++) {
            this.buttons.push(new Button(i + 1))
            this.container.appendChild(this.buttons[i].btn);
        }
    }

    startGame() {
        for (let i = 0; i < this.numButtons; i++) {
            this.buttons[i].moveButton(this.container.offsetHeight, this.container.offsetWidth)
        }
    }

    endSession() {
        this.container.remove();
    }
}

class Button {
    constructor(number) {
        this.btn = document.createElement('button')
        this.btn.innerText = number
        this.btn.id = number
        this.btn.style.height = '5em'
        this.btn.style.width = '10em'
        this.btn.style.margin = '0.5em'
        this.btn.style.backgroundColor = selectRandomColor();
        this.position = new Position()
    }

    moveButton(containerHeight, containerWidth) {
        this.btn.style.position = 'absolute'
        this.position.randomizePosition(this.btn.offsetHeight, this.btn.offsetWidth, containerHeight, containerWidth)
        this.btn.style.top = this.position.top
        this.btn.style.left = this.position.left
    }
}

class Position {
    constructor() {
        this.top = "0px"
        this.left = "0px"
    }

    randomizePosition(offsety, offsetx, containerHeight, containerWidth) {

        // Convert the button's dimensions from pixels to percentages of the container
        const maxTop = containerHeight - parseFloat(offsety);
        const maxLeft = containerWidth - parseFloat(offsetx);

        // Now randomize the position within these bounds
        this.top = `${Math.random() * maxTop}px`;
        this.left = `${Math.random() * maxLeft}px`;
    }
}

function selectRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

document.getElementById('go-button').addEventListener('click', e => {
    e.preventDefault()
    const inputValue = parseInt(document.getElementById('num-buttons-input').value)

    if (!checkValidInput(inputValue)) {
        alert(inputWarning)
        return
    }
    if (game)
        game.endSession()
    game = new Game(inputValue)
    game.createButtons()
    game.startGame()
})

function checkValidInput(inputValue) {
    return inputValue >= 3 && inputValue <= 7
}