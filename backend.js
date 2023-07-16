
//express setup
const express = require('express')
const app = express()
const port = 3000

//socket io setup
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')
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
    gameState: null,
    boardSeed: Math.floor(Math.random() * 100000000000)
}

    



//socket io connection event listener
io.on('connection', (socket) => {

    console.log(`user ${socket.id} connected`);

    //on connect add player to players object
    backEndPlayers[socket.id] = {
        boardX: (typeof board !== 'undefined') ? board.startPos.x : 0,
        boardY: (typeof board !== 'undefined') ? board.startPos.y : 0,
        colour: 'royalblue'
    }


    //send updated players object to all clients
    io.emit('updatePlayers', backEndPlayers)

    //send updated board object to all clients
    io.emit('updateGameProps', gameProperties)

    // socket io client disconnect event listener
    socket.on('disconnect', (reason) => {
        console.log(`user ${socket.id} disconnected: ${reason}`)

        //upon disconnection remove player from players object
        delete backEndPlayers[socket.id]

        //send updated players object to all clients
        io.emit('updatePlayers', backEndPlayers)
    })

  });

  


//server listen event listener
server.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

console.log('Server loaded')