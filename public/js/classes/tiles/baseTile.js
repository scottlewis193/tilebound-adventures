class BaseTile {
    constructor(gridPos) {
        this.name = 'BaseTile',
        this.colour = 'white',
        this.gridPos = gridPos
    }

    draw() {
        c.strokeStyle = '#000000';     // Set line colour.
        c.fillStyle   = this.colour;        // Set fill colour.
        c.lineWidth   = 2;
        c.fillRect(board.boardPos.x + (board.tileSize*this.gridPos.x),board.boardPos.y + (board.tileSize*this.gridPos.y),board.tileSize,board.tileSize)
    }

    hasSameTileTypeNeighbour(tileTypeName) {

       if (typeof board.tiles[(this.gridPos.x - 1) + ' ' + this.gridPos.y] !== 'undefined') { if (board.tiles[(this.gridPos.x - 1) + ' ' + this.gridPos.y].name == tileTypeName) {return true; }}
       if (typeof board.tiles[this.gridPos.x + ' ' + (this.gridPos.y - 1)] !== 'undefined') { if (board.tiles[this.gridPos.x + ' ' + (this.gridPos.y - 1)].name == tileTypeName) {return true; }}
       if (typeof board.tiles[(this.gridPos.x + 1) + ' ' + this.gridPos.y] !== 'undefined') { if (board.tiles[(this.gridPos.x + 1) + ' ' + this.gridPos.y].name == tileTypeName) {return true; }}
       if (typeof board.tiles[this.gridPos.x + ' ' + (this.gridPos.y + 1)] !== 'undefined') { if (board.tiles[this.gridPos.x + ' ' + (this.gridPos.y + 1)].name == tileTypeName) {return true; }}
       
        return false
    }
}