class BasePlayer {
    
    constructor({id,boardX,boardY,colour}) {
        this.id = id;
        this.boardX = boardX;
        this.boardY = boardY;
        this.colour = colour;
        this.visible = true;
        this.gameMaster = false;
    }

    draw() {
    if (this.visible) {
        c.fillStyle = this.colour
        c.arc(this.boardXToCanvasX(),this.boardYToCanvasY(),(board.tileSize / 2),0,Math.PI * 2,false)
        c.fill()
        }
    }

   boardXToCanvasX() {
        return board.boardPos.x + (board.tileSize / 2) + ((this.boardX) * board.tileSize)
    }
    
    boardYToCanvasY() {
        return board.boardPos.y + (board.tileSize / 2) + ((this.boardY) * board.tileSize)
    }

    
}
