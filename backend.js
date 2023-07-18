
global.board = require('./js/board')
global.seedrandom = require('seedrandom')

//express setup
const express = require('express')
const app = express()
const port = 3000

//socket io setup
const http = require('http');
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
                turnPhase: 1},
    board: board
}

gameProperties.board.generateBoard()


//socket io connection event listener
io.on('connection', (socket) => {

    console.log(`user ${socket.id} connected`);

    //on connect add player to players object
    backEndPlayers[socket.id] = {
        id: socket.id,
        boardX: (typeof board !== 'undefined') ? board.startPos.x : 0, 
        boardY: (typeof board !== 'undefined') ? board.startPos.y : 0,
        colour: 'royalblue',
        visible: true
    } 


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
            gameProperties.gameState.playersTurnID = Object.values(backEndPlayers)[0]
            updateGameState()
        }
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

}

function updateBoard() {
    console.log('updateBoard')
    io.emit('updateBoard', gameProperties.board)
}

function updateGameState() {
    console.log('updateGameState')
    io.emit('updateGameState', gameProperties.gameState)
}
