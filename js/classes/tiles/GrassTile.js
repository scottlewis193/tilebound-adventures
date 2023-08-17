class GrassTile extends BaseTile {
    constructor(gridPos) {
        super(gridPos),
        this.name = 'GrassTile',
        this.colour = 'forestgreen',

        this.textureGridPos = {x: 5, y: 9}
        let texRandInt = Math.floor(Math.random() * 4)

        switch (texRandInt) {
            case 0 :
                this.textureGridPos = {x: 7, y: 9}
                break;
            case 1 :
                this.textureGridPos = {x: 8, y: 9}
                break;
            case 2 :
                this.textureGridPos = {x: 7, y: 10}
                break;
            case 3 :
                this.textureGridPos = {x: 8, y: 10}
                break;
        }

        if(this.gridPos.x == 0 || this.gridPos.y == 0 || this.gridPos.x == board.boardSize - 1 || this.gridPos.y == board.boardSize - 1) {
    
            this.textureGridPos = {x: 3,y: 7}
 
            //straight edges
            if(this.gridPos.x == 0 && this.gridPos.y !== 0 && this.gridPos.y !== (board.boardSize - 1)) {this.textureGridPos.x += 1}
            if(this.gridPos.y == 0 && this.gridPos.x !== 0 && this.gridPos.x !== (board.boardSize - 1)) {this.textureGridPos.y += 1}
            if(this.gridPos.x == (board.boardSize - 1) && (this.gridPos.y !== (board.boardSize - 1) && this.gridPos.y !== 0)) {this.textureGridPos.x -= 1}
            if(this.gridPos.y == (board.boardSize - 1) && (this.gridPos.x !== (board.boardSize - 1) && this.gridPos.x !== 0)) {this.textureGridPos.y -= 1}


            //corner edges
            if(this.gridPos.x == 0 && this.gridPos.y == 0) {this.textureGridPos = {x: 2,y: 9}}
            if(this.gridPos.x == 0 && this.gridPos.y == (board.boardSize - 1)) {this.textureGridPos = {x: 2,y: 10}}
            if(this.gridPos.x == (board.boardSize - 1) && this.gridPos.y == 0) {this.textureGridPos = {x: 3,y: 9}}
            if(this.gridPos.x == (board.boardSize - 1) && this.gridPos.y == (board.boardSize - 1)) {this.textureGridPos = {x: 3,y: 10}}
        }


    }
}
