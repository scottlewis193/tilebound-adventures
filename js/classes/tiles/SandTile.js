class SandTile extends BaseTile {
    constructor(gridPos) {
        super(gridPos),
        this.name = 'SandTile',
        this.colour = 'lightyellow'
        this.textureGridPos = {x: 5, y: 2}
  

        
    if(this.gridPos.x == 0 || this.gridPos.y == 0 || this.gridPos.x == board.boardSize - 1 || this.gridPos.y == board.boardSize - 1) {
        
        this.textureGridPos = {x: 17,y: 6}
 
        if(this.gridPos.x == 0) {this.textureGridPos.x -= 1}
        if(this.gridPos.y == 0) {this.textureGridPos.y -= 1}
        if(this.gridPos.x == (board.boardSize - 1)) {this.textureGridPos.x += 1}
        if(this.gridPos.y == (board.boardSize - 1)) {this.textureGridPos.y += 1}
    } 

    

            
    if(this.gridPos.x == 1 || this.gridPos.y == 1 || this.gridPos.x == board.boardSize - 2 || this.gridPos.y == board.boardSize - 2) {
        
        this.textureGridPos = {x: 17,y: 2}
 
        if(this.gridPos.x == 1) {this.textureGridPos.x -= 1}
        if(this.gridPos.y == 1) {this.textureGridPos.y -= 1}
        if(this.gridPos.x == (board.boardSize - 2)) {this.textureGridPos.x += 1}
        if(this.gridPos.y == (board.boardSize - 2)) {this.textureGridPos.y += 1}
    } 

    }



}


