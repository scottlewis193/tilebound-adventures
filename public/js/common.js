//canvas & context
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//short hand devicePixelRatio
const devicePixelRatio = window.devicePixelRatio || 1

//set canvas res correctly
canvas.width = innerWidth * devicePixelRatio
canvas.height = (innerHeight-100) * devicePixelRatio

let gameState = {
        status: 'StartGame',
        playersTurnID: null,
        turnPhase: 1
}

//UI
let interactBtn = document.getElementById('interact-btn')
let gameStatusTxt = document.getElementById('game-status')

function toggleModalVisibility(elementIDs) {

    for (let i = 0; i < elementIDs.length; i++) {
    let currentElement = document.getElementById(elementIDs[i])
    let currentState = currentElement.style.display;
 
    currentElement.style.display = (currentState == 'block') ? 'none' : 'block';
    }
}

function startGame() {
    displayEventText('Starting Game...')
    gameState.status = 'InProgress'
    client.socket.emit('updateGameState', gameState)
}

function Interact() {
    console.log('InteractTest')
}

function displayEventText(text) {
    gameStatusTxt.innerText = text
    setTimeout(() => {displayTurnText()}, 7000)
}

function displayTurnText() {
(gameState.playersTurnID !== null) ? gameStatusTxt.innerText = gameState.playersTurnID + ' Turn' : gameStatusTxt.innerText = 'Waiting To Start Game...'
}

function mousePosToMouseGridPos(mousePos) {
    let boardSizePixels = ((board.tileSize) * board.boardSize)
    let mousePosOnBoardX =  (mousePos.x-board.boardPos.x)
    let mousePosOnBoardY =  (mousePos.y-board.boardPos.y)
    
    return {x: Math.floor(mousePosOnBoardX / (boardSizePixels/board.boardSize)), y: Math.floor(mousePosOnBoardY / (boardSizePixels/board.boardSize))}
}

