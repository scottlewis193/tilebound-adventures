class BasePlayer {
    
    constructor({id,boardPos,colour}) {
        this.id = id;
        this.boardPos = boardPos;
        this.colour = colour;
        this.visible = true;
        this.gameMaster = false;
        this.moveSquaresVisible = false;
        this.playersTurn = false;
        this.gold = 5
        this.inventory = {
            headSlot: null,
            chestSlot: null,
            legsSlot: null,
            feetSlot: null,
            handSlot1: null,
            handSlot2: null,
            freeSlot1: new Longsword(),
            freeSlot2: null,
            freeSlot3: null,
            freeSlot4: null
        }
    }

    draw() {
    if (this.visible) {
 
        c.fillStyle = this.colour

        c.arc(this.boardXToCanvasX(true),this.boardYToCanvasY(true),(board.tileSize / 2),0,Math.PI * 2,false)
        c.fill()

        if (this.moveSquaresVisible) {
        c.fillStyle = 'yellow'
        if (this.boardPos.x !== board.boardSize-1) { c.fillRect(this.boardXToCanvasX() + board.tileSize,this.boardYToCanvasY(),board.tileSize,board.tileSize)}
        if (this.boardPos.x !== 0) { c.fillRect(this.boardXToCanvasX() - board.tileSize,this.boardYToCanvasY(),board.tileSize,board.tileSize)}
        if (this.boardPos.y !== board.boardSize-1) {c.fillRect(this.boardXToCanvasX() ,this.boardYToCanvasY() + board.tileSize,board.tileSize,board.tileSize)}
        if (this.boardPos.y !== 0) {c.fillRect(this.boardXToCanvasX() ,this.boardYToCanvasY() - board.tileSize,board.tileSize,board.tileSize)}
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
    if (this.playersTurn) {this.toggleMoveSquares()}
    }
    
    toggleMoveSquares() {
        this.moveSquaresVisible = !this.moveSquaresVisible
    }

    move(newBoardPos) {
        TweenMax.to(this,3,this.boardPos = newBoardPos)
    }
}
