
global.board = require('./js/board')
global.seedrandom = require('seedrandom')

//express setup
const express = require('express')
const app = express()
const port = 3000

//socket io setup
const http = require('http');
const { get } = require('https')
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {pingInterval: 2000,pingTimeout: 5000})

//set static folder
app.use(express.static('public'))

//serve index page to client
app.get('/', (req,res) => {
    res.sendFile(__dirname= '/index.html')
})




//declare backend players object
const backEndPlayers = {}



//declare game state properties object
const gameProperties = {
    gameState: {status: 'StartGame',
                playersTurnID: null,
                playerTurnIndex: 0,
                turnPhase: 1,
                playersConnected: 0},
    board: board
}

gameProperties.board.generateBoard()


//socket io connection event listener
io.on('connection', (socket) => {

    console.log(`user ${socket.id} connected`);

    //on connect add player to players object
    backEndPlayers[socket.id] = {
        id: socket.id,
        boardPos: (typeof board !== 'undefined') ? {x: board.startPos.x, y:board.startPos.y} : {x: 0, y: 0}, 
        colour: 'royalblue',
        visible: true
    } 

    //if no players were previously connected, set turn as newly connected player
    if (gameProperties.gameState.playersTurnID == null) {gameProperties.gameState.playersTurnID = socket.id}

    //update player count
    gameProperties.gameState.playersConnected += 1

    //send updated players object to all clients
    updatePlayers()

    //send updated board object to all clients
    updateBoard()

    //send updated game state object to all clients
    updateGameState()

    // socket io client disconnect event listener
    socket.on('disconnect', (reason) => {
        console.log(`user ${socket.id} disconnected: ${reason}`)

        //upon disconnection remove player from players object
        delete backEndPlayers[socket.id]

        //send updated players object to all clients
        io.emit('updatePlayers', backEndPlayers)

        //if it was the players turn who disconnected, turn should change to next player
        gameProperties.gameState.playersTurnID = 
        (JSON.stringify(backEndPlayers) === '{}') ? null : getPlayerFromIndex(gameProperties.gameState.playerTurnIndex).id
        
        //update player count
         gameProperties.gameState.playersConnected -= 1

        updateGameState()

    })

    socket.on('updateGameState', (gameState) => {
        gameProperties.gameState = {
            status: gameState.status || gameProperties.gameState.status,
            playersTurnID: gameState.playersTurnID || gameProperties.gameState.playersTurnID,
            turnPhase: gameState.turnPhase || gameProperties.gameState.turnPhase
        }

        console.log('received UpdatedGameState')
        //if game has just started, set first players turn
        if (gameProperties.gameState.status == 'InProgress' && gameProperties.gameState.playersTurnID == null) {
            gameProperties.gameState.playersTurnID = Object.values(backEndPlayers)[0].id
            updateGameState()
        }

        updateDebug()
    })

  });

 


//server listen event listener
server.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

console.log('Server loaded')

function updatePlayers() {
    console.log('updatePlayers')
    io.emit('updatePlayers', backEndPlayers)

    updateDebug()

}

function updateBoard() {
    console.log('updateBoard')
    io.emit('updateBoard', gameProperties.board)

    updateDebug()
}

function updateGameState() {
    console.log('updateGameState')
    io.emit('updateGameState', gameProperties.gameState)
    
   updateDebug()
}

function getPlayerFromIndex(index) {
    let i = 0 
    for (const id in backEndPlayers) {
        if(i == index) {return backEndPlayers[id]}
        i++
    }
    return null
}

function updateDebug() {
    console.clear()
    console.
    console.log(` 0000000                                                          0                                                                  `)
    console.log(`    0    0 0      000000 00000   0000  0    0 0    0 00000       0 0   00000  0    0 000000 0    0 00000 0    0 00000  000000  0000  `)
    console.log(`    0    0 0      0      0    0 0    0 0    0 00   0 0    0     0   0  0    0 0    0 0      00   0   0   0    0 0    0 0      0      `)
    console.log(`    0    0 0      00000  00000  0    0 0    0 0 0  0 0    0    0     0 0    0 0    0 00000  0 0  0   0   0    0 0    0 00000   0000  `)
    console.log(`    0    0 0      0      0    0 0    0 0    0 0  0 0 0    0    0000000 0    0 0    0 0      0  0 0   0   0    0 00000  0           0 `)
    console.log(`    0    0 0      0      0    0 0    0 0    0 0   00 0    0    0     0 0    0  0  0  0      0   00   0   0    0 0   0  0      0    0 `)
    console.log(`    0    0 000000 000000 00000   0000   0000  0    0 00000     0     0 00000    00   000000 0    0   0    0000  0    0 000000  0000  `)
    console.log(``)
    console.log(`INDEV`)
    console.log(``)
    console.log(`=================================`)
    console.log(`GameState: ${gameProperties.gameState.status}`)
    console.log(`Players: ${gameProperties.gameState.playersConnected}`)
    console.log(`TurnID: ${gameProperties.gameState.playersTurnID}`)
    console.log(`TurnIndex: ${gameProperties.gameState.playerTurnIndex}`)
    console.log(`TurnPhase: ${gameProperties.gameState.turnPhase}`)
    console.log(`=================================`)
}
