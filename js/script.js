

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
        this.nextNumber = 1;
    }

    createButtons() {
        for (let i = 0; i < this.numButtons; i++) {
            const button = new Button(i + 1)
            this.buttons.push(button)
            button.btn.addEventListener('click', (e) => {
                button.disable()
                button.showText()
                this.#checkCorrect(button.id)
            })
            this.container.appendChild(this.buttons[i].btn);
        }
    }

    async startGame() {
        const MILLISECONDS_PER_SECOND = 1000;
        await sleep(this.numButtons * MILLISECONDS_PER_SECOND)
        await this.#shuffleButtons()
        this.#hideButtonsText()
        this.#enableButtons()
    }

    #win() {
        alert(winMsg)
    }

    #lose() {
        alert(loseMsg)
        this.#disableButtons()
        this.#showButtonsText()
    }

    #checkCorrect(number) {
        if(this.nextNumber != number) {
            this.#lose()
        }
        if(++this.nextNumber > this.numButtons) {
            this.#win()
        }
    }

    async #shuffleButtons() {
        for (let i = 0; i < this.numButtons; ++i) {
            for (let i = 0; i < this.numButtons; i++) {
                this.buttons[i].moveButton(this.container.offsetHeight, this.container.offsetWidth)
                
            }
            if (i != this.numButtons - 1) {
                await sleep(2000)
            }
        }
    }

    #hideButtonsText() {
        for(let i = 0; i < this.numButtons; ++i) {
            this.buttons[i].hideText()
        }
    }

    #showButtonsText() {
        for (let i = 0; i < this.numButtons; ++i) {
            this.buttons[i].showText()
        }
    }

    #enableButtons() {
        for(let i = 0; i < this.numButtons; ++i) {
            this.buttons[i].enable()
        }
    }

    #disableButtons() {
        for (let i = 0; i < this.numButtons; ++i) {
            this.buttons[i].disable()
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
        this.id = number
        this.btn.classList.add('game-button')
        this.btn.disabled = true
        this.btn.style.backgroundColor = selectRandomColor();
        this.position = new Position()
    }

    moveButton(containerHeight, containerWidth) {
        this.btn.style.position = 'absolute'
        this.position.randomizePosition(this.btn.offsetHeight, this.btn.offsetWidth, containerHeight, containerWidth)
        this.btn.style.top = this.position.top
        this.btn.style.left = this.position.left
    }

    hideText() {
        this.btn.innerText = ''
    }

    showText() {
        this.btn.innerText = this.id
    }

    disable() {
        this.btn.disabled = true
    }

    enable() {
        this.btn.disabled = false
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

document.getElementById('num-buttons-label').innerText = labelMsg
document.getElementById('go-button').innerText = buttonText

function checkValidInput(inputValue) {
    const MIN = 3
    const MAX = 7
    return inputValue >= MIN && inputValue <= MAX
}

async function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms))
}