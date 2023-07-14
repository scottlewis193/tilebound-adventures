
//client socket
const socket = io()

//set canvas res correctly
canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio


const x = canvas.width / 2
const y = canvas.height / 2


//To store player data on the front end
const frontEndPlayers = {}

// backend will trigger this when a new player connects so all clients can update player data on the front end
socket.on('updatePlayers', (backEndPlayers) => {

    for (const id in backEndPlayers) {
        const backEndPlayer = backEndPlayers[id]

        //if player doesn't exist in object, add them in (Client Connected)
        if (!frontEndPlayers[id]) {
            console.log(backEndPlayer.colour)
            frontEndPlayers[id] = new BasePlayer({
                x: backEndPlayer.x,
                y: backEndPlayer.y,
                colour: backEndPlayer.colour
            })

        } else {
            //if a player already exists
            frontEndPlayers[id].x = backEndPlayer.x
            frontEndPlayers[id].y = backEndPlayer.y

        }
    }

    for (const id in frontEndPlayers) {
        if (!backEndPlayers[id]) {
            delete frontEndPlayers[id]
            console.log(`${id} deleted`)
        }
    }

    console.log(frontEndPlayers)
})


//game loop
let animationId
function animate() {

    animationId = requestAnimationFrame(animate)

    c.clearRect(0, 0, canvas.width, canvas.height)
    // c.fillStyle = 'rgba(0,0,0,0.1)'
    // c.fillRect(0,0, canvas.width, canvas.height)


    //wheel.drawWheel()

    board.drawBoard()

    for (const id in frontEndPlayers) {
        const player = frontEndPlayers[id]
        player.draw()
    }



}



//auto resize elements when resizing window
window.addEventListener('resize', (event) =>  {
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = innerHeight * devicePixelRatio
    //wheel.defineWinWheel()
    console.log("resize")
})


//init wheel
//wheel.defineWheel()



//click canvas to toggle wheel spin animation
//canvas.onclick = function() {wheel.toggleAnimation()}

//intial function call to start loop
animate()





    // theWheel.startAnimation()