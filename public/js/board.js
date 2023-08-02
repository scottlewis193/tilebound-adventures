
var board = {
    
    //updated by backend
    boardSeed: null,
    boardSize: null,
    tileSize: null,
    startPos: {},
    tiles: {},
    boardChanged: true,

    //updated by frontend when user resizes window
    boardPos: {},
    
    convertBoard() {
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                this.tiles[gridX + ' ' + gridY] = new (eval(this.tiles[gridX + ' ' + gridY].name))(this.tiles[gridX + ' ' + gridY].gridPos)
                //new DynamicClass(this.tiles[gridX + ' ' + gridY].name,this.tiles[gridX + ' ' + gridY].gridPos)
            }
        }
    },
 
    drawBoard() {
        if (this.boardChanged) {
            for (let gridY = 0; gridY < this.boardSize; gridY++) {
                for (let gridX = 0; gridX < this.boardSize; gridX++) {
                    this.tiles[gridX + ' ' + gridY].draw()             
                }
            }

            this.boardChanged = false
        }
    },

    updateBoardPos() {
        this.tileSize = (canvas.height / (this.boardSize+2))
        this.boardPos = {x: (canvas.width / 2) - (this.tileSize*(this.boardSize/2)), 
                         y: (canvas.height / 2) - (this.tileSize*(this.boardSize/2))}
        this.boardChanged = true
    }


}

board.updateBoardPos()


