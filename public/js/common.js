//canvas & context
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//short hand devicePixelRatio
const devicePixelRatio = window.devicePixelRatio || 1

//set canvas res correctly
canvas.width = innerWidth * devicePixelRatio
canvas.height = (innerHeight-100) * devicePixelRatio

let gameState = {}

//UI
let interactBtn = document.getElementById('interact-btn')


function toggleModalVisibility(elementIDs) {

    for (let i = 0; i < elementIDs.length; i++) {
    let currentElement = document.getElementById(elementIDs[i])
    let currentState = currentElement.style.display;
 
    currentElement.style.display = (currentState == 'block') ? 'none' : 'block';
    }
}

function startGame() {
    console.log('StartGame')
    gameState.status = 'InProgress'
    socket.emit('updateGameState', gameState)
}

function Interact() {
    console.log('InteractTest')
}