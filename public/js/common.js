document.addEventListener("DOMContentLoaded", function(){
    // Code here waits to run until the DOM is loaded.
  });

//canvas & context
const bgCanvas = document.querySelector('#bg-canvas')
responsiveCanvas(bgCanvas)
let bgC = bgCanvas.getContext('2d') 

const fgCanvas = document.querySelector('#fg-canvas')
responsiveCanvas(fgCanvas)
let fgC = fgCanvas.getContext('2d')


//short hand devicePixelRatio
const devicePixelRatio = window.devicePixelRatio || 1



let gameState = {
        status: 'StartGame',
        playersTurnID: null,
        playersTurnUsername: null,
        turnPhase: 1
}

//UI
let interactBtn = document.getElementById('interact-btn')
let inventoryBtn = document.getElementById('inventory-btn')
let gameStatusTxt = document.getElementById('game-status')

function setPixelDensity(canvas) {

    // Get the device pixel ratio.
    let pixelRatio = window.devicePixelRatio;
	
    // Optionally print it to the console (if interested).


    // Get the actual screen (or CSS) size of the canvas.
    //let sizeOnScreen = {width: canvas.width, height: canvas.height - 100};
        
        // Set our canvas size equal to that of the screen size x the pixel ratio.
        // canvas.width = sizeOnScreen.width * pixelRatio;
        // canvas.height = sizeOnScreen.height * pixelRatio;
    
        // Shrink back down the canvas CSS size by the pixel ratio, thereby 'compressing' the pixels.
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = (innerHeight - 100) + 'px';

        canvas.width = innerWidth * pixelRatio
        canvas.height = (innerHeight - 100) * pixelRatio
        
        // Fetch the context.
        let context = canvas.getContext('2d');
    
        // Scale all canvas operations by the pixelRatio, so you don't have to calculate these manually.
        context.scale(pixelRatio, pixelRatio);
    
        // Return the modified context.
        return context;
    
   


}


function responsiveCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}

function toggleModalVisibility(elementIDs) {

    for (let i = 0; i < elementIDs.length; i++) {
      let currentElement = document.getElementById(elementIDs[i])
      let currentState = currentElement.style.display;
  
      currentElement.style.display = (currentState == 'block' || currentState == '') ? 'none' : 'block';
    }
}



function startGame() {
    gameState.status = 'StartingGame'
    client.socket.emit('updateGameState', gameState)
    gameState.status = 'InProgress'
    client.socket.emit('updateGameState', gameState)
}

function interact() {
    console.log('InteractTest')
    gameState.turnPhase = (interactBtn.innerText == 'End Turn' && gameState.playersTurnID == client.socket.id) ? 1 : 3
    client.socket.emit('updateGameState', gameState)
}

function displayEventText(text, interval = 7000) {
    gameStatusTxt.innerText = text
    setTimeout(() => {displayTurnText()}, interval)
}

function displayTurnText() {
(gameState.playersTurnID !== null && gameState.status !== 'StartGame') ? gameStatusTxt.innerText = gameState.playersTurnUsername + ' Turn' : gameStatusTxt.innerText = 'Waiting To Start Game...'
}

function mousePosToMouseGridPos(mousePos) {
    let boardSizePixels = ((board.tileSize) * board.boardSize)
    let mousePosOnBoardX =  (mousePos.x-board.boardPos.x)
    let mousePosOnBoardY =  (mousePos.y-board.boardPos.y)
    
    return {x: Math.floor(mousePosOnBoardX / (boardSizePixels/board.boardSize)), y: Math.floor(mousePosOnBoardY / (boardSizePixels/board.boardSize))}
}

function getElementPosition(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
    };
  }

  function getPropByIndex(obj, index) {
   return Object.keys(obj)[index]
  }

  function getObjPropCount(obj) {
   return Object.keys(obj).length
  }

  function oddOrEven(x) {
    return ( x & 1 ) ? "odd" : "even";
  }





  

