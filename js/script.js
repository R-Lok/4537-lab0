
let game;
class Game {
    constructor(numButtons) {
        this.buttons = []
        this.container = document.createElement('div')
        document.body.appendChild(this.container)
    }

    createButtons(numButtons) {
        for(let i = 0; i < numButtons; i++) {
            this.buttons.push(new Button(i))
            this.container.appendChild(this.buttons[i].btn);
        }
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
    game = new Game()
    game.createButtons(5)
})