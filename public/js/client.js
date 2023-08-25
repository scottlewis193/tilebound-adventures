
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
        freeSlot1: null,
        freeSlot2: null,
        freeSlot3: null,
        freeSlot4: null
    }
})

this.socket.on("disconnect", () => {
    console.log(this.socket.id); // undefined
    toggleModalVisibility(['game-window','main-menu'])
    alert('Disconnected from server')
  });




// backend will trigger this when a new player connects so all clients can update player data on the front end
this.socket.on('updatePlayers', (backEndPlayers) => {

    for (const id in backEndPlayers) {
        const backEndPlayer = backEndPlayers[id]

        //if player doesn't exist in object, add them in (Client Connected)
        if (!players.frontEndPlayers[id]) {
          
            players.frontEndPlayers[id] = new Player({backEndPlayer: backEndPlayer})


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

// backend will trigger this when a new monster spawns or moves
this.socket.on('updateMonsters', (backEndMonsters) => {
    for (const id in backEndMonsters) {
        const backEndMonster = backEndMonsters[id]

               //if player doesn't exist in object, add them in (Client Connected)
               if (!monsters.frontEndMonsters[id]) {
          
                monsters.frontEndMonsters[id] = new Monster({backEndMonster: backEndMonster})
    
            } else {
                
                displayEventText('Monsters moving...')
                //if a monster already exists, update pos using tween
                TweenMax.to(monsters.frontEndMonsters[id].boardPos,{x: backEndMonster.boardPos.x, y: backEndMonster.boardPos.y,duration: 3, ease: 'linear', onUpdate: function() {client.drawLayers()}, onComplete: function() {delete monsters.frontEndMonsters[id].boardPos._gsap} })
    
            }
        }
    
        for (const id in monsters.frontEndMonsters) {
            if (!backEndMonsters[id]) {
    
                displayEventText(gameStatusTxt.innerText = monsters.frontEndMonsters[id].id + ' Has been defeated')
    
                delete monsters.frontEndMonsters[id]
    
                console.log(`${id} deleted`)
            }
        
    }

})

//triggered when players connects so it gives them the same board as everyone else
this.socket.on('updateBoard', (backendBoard) => {
    board.boardSeed = backendBoard.boardSeed
    board.boardSize = backendBoard.boardSize
    board.startPos = backendBoard.startPos
    board.tileSize = backendBoard.tileSize
    board.tiles = backendBoard.tiles
    board.convertBoard()
    // board.updateBoardPos()
})

this.socket.on('updateShopInventory', (shopInventory) => {
    shop.inventory = shopInventory
    shop.generateInventoryElements()
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

        //displayTurnText()
    }

    // board.updateBoardPos()
})

this.socket.on('spinOverWorldWheels', (backEndWheelOptions) => {
console.log('spin overworld wheels')
displayEventText('Spinning wheels...', 40000)
wheel.defineOverworldWheelSeq(backEndWheelOptions)
})

},

//render loop

animate(timeStamp) {

client.drawLayers()

   wheel.drawWheel()

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

    fgCanvas.width = fgCanvas.width //fix weird clearing bug
    fgC.clearRect(0, 0, fgCanvas.width, fgCanvas.height)

    board.drawBoard()

    players.drawAllPlayers()

    monsters.drawAllMonsters()

},






drawDebugText() {
 fgC.fillStyle = 'black'
 fgC.font = 15 + 'px Arial'

 let debugText = 'MouseX: ' + this.mousePos.x + '\n' 
                + 'MouseY: ' + this.mousePos.y + '\n'
                + 'MouseGX: ' + this.mouseGridPos.x + '\n'
                + 'MouseGY: ' + this.mouseGridPos.y + '\n'
                + 'CanvasW: ' + bgCanvas.width + '\n'
                + 'CanvasH: ' + bgCanvas.height + '\n'
                + 'FPS: ' + this.fps
let debugTextLines = debugText.split('\n')
let debugTextLineHeight = 30
for (var i = 0; i < debugTextLines.length; i++) {
    fgC.fillText(debugTextLines[i],0,debugTextLineHeight*(i+1))
}
 

}


}


//init loop
client.animate()

setTimeout(() => {
    bgC = setPixelDensity(bgCanvas); 
    fgC = setPixelDensity(fgCanvas);
    board.updateBoardPos()
    board.drawBoard()
    players.drawAllPlayers()
},1500)