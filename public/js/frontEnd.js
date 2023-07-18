
//client socket
const socket = io()




// backend will trigger this when a new player connects so all clients can update player data on the front end
socket.on('updatePlayers', (backEndPlayers) => {

    for (const id in backEndPlayers) {
        const backEndPlayer = backEndPlayers[id]

        //if player doesn't exist in object, add them in (Client Connected)
        if (!players.frontEndPlayers[id]) {
            console.log(backEndPlayer.colour)
            players.frontEndPlayers[id] = new BasePlayer({
                boardX: backEndPlayer.boardX,
                boardY: backEndPlayer.boardY,
                colour: backEndPlayer.colour
            })

        } else {
            //if a player already exists
            players.frontEndPlayers[id].boardX = backEndPlayer.boardX
            players.frontEndPlayers[id].boardY = backEndPlayer.boardY

        }
    }

    for (const id in players.frontEndPlayers) {
        if (!backEndPlayers[id]) {
            delete players.frontEndPlayers[id]
            console.log(`${id} deleted`)
        }
    }

 
    animate()
})

socket.on('updateGameProps', (gameProps) => {
    board.boardSeed = gameProps.boardSeed
})


//game loop
let animationId
function animate() {

    //animationId = requestAnimationFrame(animate)

//if (!gameLoopPaused) {
    c.clearRect(0, 0, canvas.width, canvas.height)
    // c.fillStyle = 'rgba(0,0,0,0.1)'
    // c.fillRect(0,0, canvas.width, canvas.height)

    //wheel.drawWheel()

    board.drawBoard()

    
    players.drawAllPlayers()

}

//}



//auto resize elements when resizing window
window.addEventListener('resize', (event) =>  {
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = innerHeight * devicePixelRatio
    //wheel.defineWinWheel()
    board.updateBoardPos()
    board.drawBoard()
    players.drawAllPlayers()

})


//init wheel
//wheel.defineWheel()



//click canvas to toggle wheel spin animation
//canvas.onclick = function() {wheel.toggleAnimation()}

//intial function call to start loop
animate()

//gameLoopPaused = true

    // theWheel.startAnimation()