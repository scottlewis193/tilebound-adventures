
var client = {

socket: null,
animationId: null,
mousePos: {x:0,y:0},
mouseGridPos: {x:0,y:0},
secondsPassed: 0,
oldTimeStamp: 0,
fps: 0,


//called when players attempts to enter game
initClientConnection() {

//client socket
this.socket = io()


//add client event listeners
window.addEventListener('resize', function(e) {client.windowResized(e)})
canvas.addEventListener('click', function(e) {client.canvasMouseClick(e)})
canvas.addEventListener('mousemove', function(e) {client.canvasMouseMove(e)})

// backend will trigger this when a new player connects so all clients can update player data on the front end
this.socket.on('updatePlayers', (backEndPlayers) => {

    for (const id in backEndPlayers) {
        const backEndPlayer = backEndPlayers[id]

        //if player doesn't exist in object, add them in (Client Connected)
        if (!players.frontEndPlayers[id]) {
            console.log(backEndPlayer.colour)
            players.frontEndPlayers[id] = new BasePlayer({
                id: backEndPlayer.id,
                boardPos: backEndPlayer.boardPos,
                colour: backEndPlayer.colour
            })

            displayEventText(backEndPlayer.id + ' Joined The Game')
            

        } else {
            //if a player already exists
            players.frontEndPlayers[id].boardPos = backEndPlayer.boardPos

        }
    }

    for (const id in players.frontEndPlayers) {
        if (!backEndPlayers[id]) {

            displayEventText(gameStatusTxt.innerText = players.frontEndPlayers[id].id + ' Left The Game')

            delete players.frontEndPlayers[id]

            console.log(`${id} deleted`)
        }
    }

})

this.socket.on('updateBoard', (backendBoard) => {
    board.boardSeed = backendBoard.boardSeed
    board.boardPos = backendBoard.boardPos
    board.boardSize = backendBoard.boardSize
    board.startPos = backendBoard.startPos
    board.tileSize = backendBoard.tileSize * devicePixelRatio
    board.tiles = backendBoard.tiles
    board.convertBoard()
})

this.socket.on('updateGameState', (backEndGameState) => {
    gameState = backEndGameState
        console.log(gameState)
    //update elements based on gameState

    if (gameState.status == 'StartGame') {
        document.getElementById('interact-btn').addEventListener("click",startGame)
    } else if(gameState.status == 'InProgress') {
        interactBtn.innerText = 'Interact'
        interactBtn.onclick = function() {interact}

        players.frontEndPlayers[this.socket.id].playersTurn = (gameState.playersTurnID == this.socket.id) ? true : false

    }
})

},

//game loop

animate(timeStamp) {



    c.clearRect(0, 0, canvas.width, canvas.height)
    // c.fillStyle = 'rgba(0,0,0,0.1)'
    // c.fillRect(0,0, canvas.width, canvas.height)

    //wheel.drawWheel()

    board.updateBoardPos()
    board.drawBoard()


    players.drawAllPlayers()


    // Calculate how much time has passed
    client.secondsPassed = (timeStamp - client.oldTimeStamp) / 1000;
    client.oldTimeStamp = timeStamp;

    //calculate fps
    client.fps = Math.round(1 / client.secondsPassed);
        
    //Move forward in time with a maximum amount
    client.secondsPassed = Math.min(client.secondsPassed, 0.1);

    client.drawDebugText()

    setTimeout( () => {requestAnimationFrame(client.animate)
    },0)

},




//called when browser window has been resized by the user
windowResized(e) {
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = (innerHeight - 100) * devicePixelRatio
    //wheel.defineWinWheel()
    board.updateBoardPos()
    board.drawBoard()
    players.drawAllPlayers()

},

//called when user clicks within the canvas element
canvasMouseClick(e) {


//has client clicked it's player
if (JSON.stringify(this.mouseGridPos) === JSON.stringify(players.frontEndPlayers[client.socket.id].boardPos)) {
    players.frontEndPlayers[client.socket.id].onClick()
}},

//called when the mouse position has changed within the canvas
canvasMouseMove(e) {

const rect = canvas.getBoundingClientRect();
this.mousePos = { x: (e.clientX - (rect.left / devicePixelRatio)) * devicePixelRatio, y: ((e.clientY - (rect.top / devicePixelRatio)) * devicePixelRatio) - 50};
this.mouseGridPos = mousePosToMouseGridPos(this.mousePos);
},

drawDebugText() {
 c.fillStyle = 'black'
 c.font = 15 * devicePixelRatio + 'px Arial'

 let debugText = 'MouseX: ' + this.mousePos.x + '\n' 
                + 'MouseY: ' + this.mousePos.y + '\n'
                + 'MouseGX: ' + this.mouseGridPos.x + '\n'
                + 'MouseGY: ' + this.mouseGridPos.y + '\n'
                + 'FPS: ' + this.fps
let debugTextLines = debugText.split('\n')
let debugTextLineHeight = 30
for (var i = 0; i < debugTextLines.length; i++) {
    c.fillText(debugTextLines[i],0,debugTextLineHeight*(i+1))
}
 

}
//init wheel
//wheel.defineWheel()



//click canvas to toggle wheel spin animation
//canvas.onclick = function() {wheel.toggleAnimation()}

//intial function call to start loop



//gameLoopPaused = true

    // theWheel.startAnimation()

}

client.animate()