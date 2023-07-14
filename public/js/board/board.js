var board = {

    boardSize: 10,
    tileSize: 50 * devicePixelRatio,

    drawBoard: function() {
        c.strokeStyle = '#000000';     // Set line colour.
        c.fillStyle   = 'red';        // Set fill colour.
        c.lineWidth   = 2;
        var initPos = {x: (canvas.width / 2) - (this.tileSize*(this.boardSize/2)) , y: (canvas.height / 2) - (this.tileSize*(this.boardSize/2)) }
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
    
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                c.fillRect(initPos.x + (this.tileSize*gridX),initPos.y + (this.tileSize*gridY),this.tileSize,this.tileSize)
            }

        }

    }
}