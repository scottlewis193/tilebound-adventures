//const { tileSize } = require("../../js/board");

//setup client event listeners
window.addEventListener('resize', function(e) {windowResized(e)});
fgCanvas.addEventListener('click', function(e) {canvasMouseClick(e)});
fgCanvas.addEventListener('mousemove', function(e) {canvasMouseMove(e)});

//called when browser window has been resized by the user
function windowResized(e) {

    //check if height is even to avoid gaps in tiles when rendering
    if (oddOrEven(innerHeight) == 'even') {

    bgC = setPixelDensity(bgCanvas)
    fgC = setPixelDensity(fgCanvas)

    //wheel.defineWinWheel()
    board.updateBoardPos()
    board.drawBoard()
    players.drawAllPlayers()

}

};

//called when user clicks within the canvas element
function canvasMouseClick(e) {

let clientPlayer = players.frontEndPlayers[client.socket.id]

//has client clicked it's player
if (JSON.stringify(client.mouseGridPos) === JSON.stringify(clientPlayer.boardPos)) {
    clientPlayer.onClick()
}

//has client clicked a move square
if (clientPlayer.moveSquaresVisible) {

const MOUSE_GRID_POS = JSON.stringify(client.mouseGridPos)

if(MOUSE_GRID_POS == JSON.stringify({x: clientPlayer.boardPos.x - 1, y: clientPlayer.boardPos.y}) ||
MOUSE_GRID_POS ==  JSON.stringify({x: clientPlayer.boardPos.x + 1, y: clientPlayer.boardPos.y}) ||
MOUSE_GRID_POS ==  JSON.stringify({x: clientPlayer.boardPos.x, y: clientPlayer.boardPos.y - 1}) ||
MOUSE_GRID_POS ==  JSON.stringify({x: clientPlayer.boardPos.x, y: clientPlayer.boardPos.y + 1})
) {
    clientPlayer.toggleMoveSquares()    
    client.socket.emit('playerMove',JSON.parse(MOUSE_GRID_POS))

}

}

};

//called when the mouse position has changed within the canvas
function canvasMouseMove(e) {

const rect = fgCanvas.getBoundingClientRect();

client.mousePos = { x: (e.clientX - rect.left) * devicePixelRatio, y: (e.clientY - rect.top) * devicePixelRatio};
client.mouseGridPos = mousePosToMouseGridPos(client.mousePos);

}
