const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const devicePixelRatio = window.devicePixelRatio || 1


const socket = io()

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

const x = canvas.width / 2
const y = canvas.height / 2

const frontEndPlayers = {}


socket.on('updatePlayers', (backEndPlayers) => {

    for (const id in backEndPlayers) {
        const backEndPlayer = backEndPlayers[id]

        //if player doesn't exist in object, add them in (Client Connected)
        if (!frontEndPlayers[id]) {
            frontEndPlayers[id] = new basePlayer({
                x: backEndPlayer.x,
                y: backEndPlayer.y,
                color: backEndPlayer.color
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

let animationId
function animate() {

    animationId = requestAnimationFrame(animate)

    c.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // c.fillStyle = 'rgba(0,0,0,0.1)'
    // c.fillRect(0,0, canvas.width, canvas.height)


    theWheel.draw()

    for (const id in frontEndPlayers) {
        const player = frontEndPlayers[id]
        //player.draw()
    }

    drawTriangle()

}

function toggleModalVisibility(elementID) {
    let currentState = document.getElementById(elementID).style.display
    document.getElementById(elementID).style.display = (currentState == 'block') ? 'none' : 'block'
}

//'outerRadius' : 240*devicePixelRatio,
let theWheel
function defineWinWheel() {
    theWheel = new Winwheel(
        {'numSegments' : 2,
        'textFontSize' : 30*devicePixelRatio,
        'centerX' : innerWidth / 2,
        'centerY' : innerHeight / 2,
        'outerRadius' : (innerHeight/2) - (50*devicePixelRatio),
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
                'stopAngle'    : 55,
                'direction'    : 'clockwise',
                'repeat'       : 0,
                'yoyo'         : false,
                'callbackAfter' : 'drawTriangle()'
            }
    
        
        });

       
    
}

defineWinWheel()
    animate()

window.addEventListener('resize', (event) =>  {
canvas.width = innerWidth
canvas.height = innerHeight
defineWinWheel()
})

    // theWheel.startAnimation()