var board = {
    
    //updated by backend
    boardSeed: null,
    boardSize: null,
    tileSize: null,
    startPos: {},
    tiles: {},

    //updated by frontend when user resizes window
    boardPos: {},
    
 
    drawBoard() {

        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                this.tiles[gridX + ' ' + gridY].draw()             
            }

        }

        console.log('drawBoard')

    },

    updateBoardPos() {
        this.boardPos = {x: (canvas.width / 2) - (this.tileSize*(this.boardSize/2)), 
                         y: (canvas.height / 2) - (this.tileSize*(this.boardSize/2))}
    }


}

board.updateBoardPos()


