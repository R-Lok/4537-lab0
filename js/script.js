let game;
class Game {
    constructor(numButtons) {
        this.buttons = []
        this.container = document.createElement('div')
        this.container.style.width = '100%'
        this.container.style.height = '90%'
        document.body.appendChild(this.container)
    }

    createButtons(numButtons) {
        for(let i = 0; i < numButtons; i++) {
            this.buttons.push(new Button(i))
            this.container.appendChild(this.buttons[i].btn);
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
        this.btn.style.backgroundColor = selectRandomColor();
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

    if(!checkValidInput(inputValue)) {
        alert(inputWarning)
        return
    }
    if(game)
        game.endSession()
    game = new Game()
    game.createButtons(inputValue)
})

function checkValidInput(inputValue){
    return inputValue >= 3 && inputValue <= 7
}