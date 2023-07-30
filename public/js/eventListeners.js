//const { tileSize } = require("../../js/board");

//setup client event listeners
window.addEventListener('resize', function(e) {windowResized(e)});
canvas.addEventListener('click', function(e) {canvasMouseClick(e)});
canvas.addEventListener('mousemove', function(e) {canvasMouseMove(e)});

//called when browser window has been resized by the user
function windowResized(e) {
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = (innerHeight - 100) * devicePixelRatio
    //wheel.defineWinWheel()
    board.updateBoardPos()
    board.drawBoard()
    players.drawAllPlayers()

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

const rect = canvas.getBoundingClientRect();

client.mousePos = { x: (e.clientX - rect.left) * devicePixelRatio, y: (e.clientY - rect.top) * devicePixelRatio};
client.mouseGridPos = mousePosToMouseGridPos(client.mousePos);

}
