
var client = {

socket: io(),
animationId: null,
mousePos: {x:0,y:0},
mouseGridPos: {x:0,y:0},
secondsPassed: 0,
oldTimeStamp: 0,
fps: 0,


//called when players attempts to enter game
initClientConnection() {


    
this.socket.emit('initClient', 
{username: 'testUsername', 
    inventory: {
        headSlot: null,
        chestSlot: null,
        legsSlot: null,
        feetSlot: null,
        handSlot1: null,
        handSlot2: null,
        freeSlot1: new Longsword(),
        freeSlot2: null,
        freeSlot3: null,
        freeSlot4: null
    }
})

// backend will trigger this when a new player connects so all clients can update player data on the front end
this.socket.on('updatePlayers', (backEndPlayers) => {

    for (const id in backEndPlayers) {
        const backEndPlayer = backEndPlayers[id]

        //if player doesn't exist in object, add them in (Client Connected)
        if (!players.frontEndPlayers[id]) {
          
            players.frontEndPlayers[id] = new BasePlayer({
                id: backEndPlayer.id,
                boardPos: backEndPlayer.boardPos,
                colour: backEndPlayer.colour,
                username: backEndPlayer.username,
                inventory: backEndPlayer.inventory
            })


            displayEventText(backEndPlayer.username + ' Joined The Game')
            

        } else {
            
            //if a player already exists, update pos using tween
            TweenMax.to(players.frontEndPlayers[id].boardPos,{x: backEndPlayer.boardPos.x, y: backEndPlayer.boardPos.y,duration: 3, ease: 'linear', onUpdate: function() {client.drawLayers()}, onComplete: function() {delete players.frontEndPlayers[id].boardPos._gsap} })

            //update inventory
            players.frontEndPlayers[id].inventory = JSON.parse(JSON.stringify(backEndPlayer.inventory))

            inventory.updateInventoryLayout()

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

//triggered when players connects so it gives them the same board as everyone else
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
        interactBtn.addEventListener("click",startGame)
     } else if (gameState.status == 'StartingGame') {
        displayEventText('Starting Game...')     
    } else if(gameState.status == 'InProgress') {

        interactBtn.disabled = (this.socket.id !== gameState.playersTurnID) ? true : false
        inventoryBtn.disabled = (this.socket.id !== gameState.playersTurnID) ? true : false

        if (this.socket.id == gameState.playersTurnID) {

            if(gameState.turnPhase == 4) {
                interactBtn.innerText = 'End Turn'
            } else {
                interactBtn.innerText = 'Interact'
            }

        }
        
        interactBtn.removeEventListener('click',startGame)
        interactBtn.addEventListener('click',interact)

        players.frontEndPlayers[this.socket.id].playersTurn = (gameState.playersTurnID == this.socket.id) ? true : false

        displayTurnText()
    }
})

},

//game loop

animate(timeStamp) {




    // c.fillStyle = 'rgba(0,0,0,0.1)'
    // c.fillRect(0,0, canvas.width, canvas.height)

    //wheel.drawWheel()


    board.updateBoardPos()

    client.drawLayers()

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

drawLayers() {
    canvas.width = canvas.width //fix weird clearing bug
    c.clearRect(0, 0, canvas.width, canvas.height)

    board.drawBoard()


    players.drawAllPlayers()

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