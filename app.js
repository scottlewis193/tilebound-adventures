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
const players = {}



//socket io connection event listener
io.on('connection', (socket) => {

    console.log(`user ${socket.id} connected`);

    //on connect add player to players object
    players[socket.id] = {
        x: 500 * Math.random(),
        y: 500 * Math.random()
    }

    //send updated players object to all clients
    io.emit('updatePlayers', players)

    // socket io client disconnect event listener
    socket.on('disconnect', (reason) => {
        console.log(`user ${socket.id} disconnected: ${reason}`)

        //upon disconnection remove player from players object
        delete players[socket.id]

        //send updated players object to all clients
        io.emit('updatePlayers', players)
    })

  });

  


//server listen event listener
server.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

console.log('Server loaded')