class ForestTile extends BaseTile {
    constructor(gridPos) {
        super(gridPos),
        this.name = 'ForestTile',
        this.colour = 'forestgreen',
        this.textureGridPos = {x: 35, y: 1}

        // if(this.gridPos.x == 1 || this.gridPos.y == 1 || this.gridPos.x == board.boardSize - 2 || this.gridPos.y == board.boardSize - 2) {
    
        //     this.textureGridPos = {x: 1,y: 6}
 
        //     if(this.gridPos.x == 1) {this.textureGridPos.x -= 1}
        //     if(this.gridPos.y == 1) {this.textureGridPos.y -= 1}
        //     if(this.gridPos.x == (board.boardSize - 2)) {this.textureGridPos.x += 1}
        //     if(this.gridPos.y == (board.boardSize - 2)) {this.textureGridPos.y += 1}


        // }


    }
}


