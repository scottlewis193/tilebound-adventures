class Monster {

    constructor({backEndMonster}) {
        super(backEndMonster)
    }

    draw() {
            fgC.fillStyle = this.colour
            fgC.beginPath()
            fgC.arc(this.boardXToCanvasX(true),this.boardYToCanvasY(true),(board.tileSize / 2),0,Math.PI * 2,false)
            fgC.fill()
            fgC.closePath()
        }
        

        boardXToCanvasX(centered = false) {
            if (centered) {return board.boardPos.x + (board.tileSize / 2) + ((this.boardPos.x) * board.tileSize)}
            else {return board.boardPos.x + ((this.boardPos.x) * board.tileSize)}
        }
        
        boardYToCanvasY(centered = false) {
           if(centered) {return board.boardPos.y + (board.tileSize / 2) + ((this.boardPos.y) * board.tileSize)}
           else {return board.boardPos.y + ((this.boardPos.y) * board.tileSize)}
        }


}
