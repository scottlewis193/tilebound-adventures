class BasePlayer {
    
    constructor({id,boardPos,colour, username, inventory}) {
        this.id = id;
        this.boardPos = boardPos;
        this.colour = colour;
        this.username = username;
        this.visible = true;
        this.gameMaster = false;
        this.moveSquaresVisible = false;
        this.baseDamage = 3;
        this.levelDamageMod = 2;
        this.gold = 5;
        this.level = 1;
        this.inventory = inventory;
    }

    draw() {
    if (this.visible) {
       
        fgC.fillStyle = this.colour
        fgC.imageSmoothingEnabled = false;
        fgC.beginPath()
        fgC.arc(this.boardXToCanvasX(true),this.boardYToCanvasY(true),(board.tileSize / 2),0,Math.PI * 2,false)
        fgC.fill()
        fgC.closePath()

        if (this.moveSquaresVisible) {
        fgC.fillStyle = 'yellow'
        if (this.boardPos.x !== board.boardSize-1) { fgC.fillRect(this.boardXToCanvasX() + board.tileSize,this.boardYToCanvasY(),board.tileSize,board.tileSize)}
        if (this.boardPos.x !== 0) { fgC.fillRect(this.boardXToCanvasX() - board.tileSize,this.boardYToCanvasY(),board.tileSize,board.tileSize)}
        if (this.boardPos.y !== board.boardSize-1) {fgC.fillRect(this.boardXToCanvasX() ,this.boardYToCanvasY() + board.tileSize,board.tileSize,board.tileSize)}
        if (this.boardPos.y !== 0) {fgC.fillRect(this.boardXToCanvasX() ,this.boardYToCanvasY() - board.tileSize,board.tileSize,board.tileSize)}
        }
        }
    }

   boardXToCanvasX(centered = false) {
        if (centered) {return board.boardPos.x + (board.tileSize / 2) + ((this.boardPos.x) * board.tileSize)}
        else {return board.boardPos.x + ((this.boardPos.x) * board.tileSize)}
    }
    
    boardYToCanvasY(centered = false) {
       if(centered) {return board.boardPos.y + (board.tileSize / 2) + ((this.boardPos.y) * board.tileSize)}
       else {return board.boardPos.y + ((this.boardPos.y) * board.tileSize)}
    }


    //if player has been clicked
    onClick() {
        console.log('Clients Player Clicked')
    if (this.isPlayersTurn() && gameState.turnPhase < 4 && gameState.status == 'InProgress') {this.toggleMoveSquares()}
    }
    
    toggleMoveSquares() {
        this.moveSquaresVisible = !this.moveSquaresVisible
    }

    move(newBoardPos) {
        TweenMax.to(this,3,this.boardPos = newBoardPos)
    }

    isPlayersTurn() {
        return (this.id == gameState.playersTurnID)
    }

    moveItem({oldSlotId,newSlotId}) {
        client.socket.emit('playerMoveInventory',{oldSlotId,newSlotId})
    }
}
