const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const socket = io()

canvas.width = innerWidth
canvas.height = innerHeight

const x = canvas.width / 2
const y = canvas.height / 2

const players = {}

socket.on('updatePlayers', (backendPlayers) => {

    for (const id in backendPlayers) {
        const backendPlayer = backendPlayers[id]

        //if player doesn't exist in object, add them in (Client Connected)
        if (!players[id]) {
            players[id] = new basePlayer(backendPlayer.x,backendPlayer.y,'white')
        }
    }

    for (const id in players) {
        if (!backendPlayers[id]) {
            delete players[id]
            console.log(`${id} deleted`)
        }
    }

    console.log(players)
})

let animationId
function animate() {

    animationId = requestAnimationFrame(animate)

    c.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // c.fillStyle = 'rgba(0,0,0,0.1)'
    // c.fillRect(0,0, canvas.width, canvas.height)

    theWheel.draw()

    for (const id in players) {
        const player = players[id]
        //player.draw()
    }

    drawTriangle()
}




let theWheel = new Winwheel(
    {'numSegments' : 2,
    'segments' : [
        {'size' : 90, 'text' : 'Win', 'fillStyle' : '#89f26e'},
        {'size' : 270, 'text' : 'Lose', 'fillStyle' : '#e7706f'}
    ],
    'animation' :
        {
            // Must be specified...
            'type'     : 'spinToStop',
            'duration' : 10,
 
            // These are the defaults, all optional...
            'spins'        : 5,
            'easing'       : 'Power4.easeOut',
            'stopAngle'    : null,
            'direction'    : 'clockwise',
            'repeat'       : 0,
            'yoyo'         : false
        }

    
    });

    animate()
    theWheel.startAnimation()