class GrassCoveringTile extends BaseTile {
    constructor(gridPos,textureType = null) {
        super(gridPos),
        this.name = 'GrassCoveringTile',
        this.colour = 'forestgreen',
        this.textureGridPos = {x: 56, y: 23}

        switch (textureType) {
            case null :
                this.textureGridPos = {x: 56, y: 23}
                break;
            case 'VL' :
                this.textureGridPos = {x: 0, y: 4}
                break;
            case 'VR' :
                this.textureGridPos = {x: 2, y: 4}
                break;
            case 'HD' :
                this.textureGridPos = {x: 1, y: 5}
                break;
            case 'HU' :
                this.textureGridPos = {x: 1, y: 3}
                break;
            case 'VDR' :
                this.textureGridPos = {x: 0, y: 5}
                break;
        }

        // //vertical straight
        // if ((this.gridPos.y == 0 || board.tiles[this.gridPos.x + ' ' + (this.gridPos.y - 1)]?.name == 'PathTile') && board.tiles[this.gridPos.x + ' ' + (this.gridPos.y + 1)].name == 'PathTile') {
        //     this.textureGridPos = {x: 7,y: 8}
        // }

        // //horizontal straight
        // if ((this.gridPos.x == 0 || board.tiles[(this.gridPos.x - 1) + ' ' + this.gridPos.y]?.name == 'PathTile') && board.tiles[(this.gridPos.x + 1) + ' ' + this.gridPos.y].name == 'PathTile') {
        //     this.textureGridPos = {x: 5,y: 10}
        // }

        // //vertical down left
        // if ((board.tiles[(this.gridPos.x) + ' ' + (this.gridPos.y - 1)]?.name == 'PathTile') && (board.tiles[(this.gridPos.x + 1) + ' ' + this.gridPos.y]?.name == 'PathTile')) {
        //     this.textureGridPos = {x: 6,y: 12}
        // }

        // //horizontal right down
        // if ((board.tiles[(this.gridPos.x - 1) + ' ' + (this.gridPos.y)]?.name == 'PathTile') && (board.tiles[(this.gridPos.x) + ' ' + (this.gridPos.y + 1)]?.name == 'PathTile')) {
        //     this.textureGridPos = {x: 7,y: 11}
        // }


    }
}
