class BaseTile {
    constructor(gridPos) {
        let _texture = new Image()
        _texture.src = '/textures/Overworld.png'
        _texture.style = 'image-rendering:pixelated'
        this.name = 'BaseTile',
        this.colour = 'white',
        this.texture = _texture,
        this.textureGridPos = {x: 56, y: 23}, //blank,
        this.textureSize = {w: 16, h: 16},
        this.gridPos = gridPos
    }

    draw() {
        bgC.strokeStyle = '#000000';     // Set line colour.
        bgC.fillStyle   = this.colour;        // Set fill colour.
        bgC.lineWidth   = 2;
        bgC.imageSmoothingEnabled = false;
        bgC.drawImage(this.texture,
            (this.textureGridPos.x*this.textureSize.w), //+0.5 fixes rendering bug
            (this.textureGridPos.y*this.textureSize.h),
            this.textureSize.w,this.textureSize.h,board.boardPos.x + (board.tileSize*this.gridPos.x),
            board.boardPos.y + (board.tileSize*this.gridPos.y),
            board.tileSize,
            board.tileSize)
        //c.drawImage(this.texture,0,0)
        // c.fillRect(board.boardPos.x + (board.tileSize*this.gridPos.x),board.boardPos.y + (board.tileSize*this.gridPos.y),board.tileSize,board.tileSize)
    }


}


