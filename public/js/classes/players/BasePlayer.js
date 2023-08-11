class BasePlayer {
    
    constructor({id,boardPos,colour, username, inventory}) {
        let _texture = new Image()
        _texture.src = '/textures/character.png'
        _texture.style = 'image-rendering:pixelated'

        this.id = id;
        this.boardPos = boardPos;
        this.colour = colour;
        this.texture = _texture;
        this.textureGridPos = {x: 2, y: 0};
        this.textureSize = {w: 16, h: 32};
        this.username = username;
        this.visible = true;
        this.gameMaster = false;
        this.moveSquaresVisible = false;
        this.baseDamage = 3;
        this.levelDamageMod = 2;
        this.gold = 5;
        this.level = 1;
        this.inventory = inventory;
    }

    draw() {
    if (this.visible) {

        if (this.moveSquaresVisible) {
            fgC.fillStyle = 'yellow'
            if (this.boardPos.x !== board.boardSize-1) { fgC.fillRect(this.boardXToCanvasX() + board.tileSize,this.boardYToCanvasY({offset: false}),board.tileSize,board.tileSize)}
            if (this.boardPos.x !== 0) { fgC.fillRect(this.boardXToCanvasX() - board.tileSize,this.boardYToCanvasY({offset: false}),board.tileSize,board.tileSize)}
            if (this.boardPos.y !== board.boardSize-1) {fgC.fillRect(this.boardXToCanvasX() ,this.boardYToCanvasY({offset: false}) + board.tileSize,board.tileSize,board.tileSize)}
            if (this.boardPos.y !== 0) {fgC.fillRect(this.boardXToCanvasX() ,this.boardYToCanvasY({offset: false}) - board.tileSize,board.tileSize,board.tileSize)}
            
        }
       
        const SRC_PIXEL_POS_X = (this.textureGridPos.x*this.textureSize.w)
        const SRC_PIXEL_POS_Y = ((this.textureGridPos.y)*this.textureSize.h)

        const SRC_TEXTURE_SIZE_W = this.textureSize.w
        const SRC_TEXTURE_SIZE_H = this.textureSize.h

        const DES_PIXEL_POS_X = this.boardXToCanvasX()
        const DES_PIXEL_POS_Y = this.boardYToCanvasY({offset: true})

        const DES_TEXTURE_SIZE_W = board.tileSize
        const DES_TEXTURE_SIZE_H = board.tileSize * (this.textureSize.h / board.textureSize.h)

        fgC.fillStyle = this.colour
        fgC.imageSmoothingEnabled = false;

        
        fgC.drawImage(this.texture,
            //SOURCE
            SRC_PIXEL_POS_X,
            SRC_PIXEL_POS_Y,
            SRC_TEXTURE_SIZE_W,
            SRC_TEXTURE_SIZE_H,

            //DESTINATION
            DES_PIXEL_POS_X ,
            DES_PIXEL_POS_Y,
            DES_TEXTURE_SIZE_W,
            DES_TEXTURE_SIZE_H
            )




        }
    }

   boardXToCanvasX()  {
            return board.boardPos.x + 
            ((this.boardPos.x) * board.tileSize)
    }
    
    
    boardYToCanvasY({offset}) {

        const OFFSET_BOARDPOS_Y = (this.textureSize.h / board.textureSize.h) - 1

        return (board.boardPos.y) + 
        ((this.boardPos.y - ((offset) ? OFFSET_BOARDPOS_Y : 0)) * board.tileSize)
     
    }

    //if player has been clicked
    onClick() {
        console.log('Clients Player Clicked')
    if (this.isPlayersTurn() && gameState.turnPhase < 4 && gameState.status == 'InProgress') {this.toggleMoveSquares()}
    }
    
    toggleMoveSquares() {
        this.moveSquaresVisible = !this.moveSquaresVisible
    }

    move(newBoardPos) {
        TweenMax.to(this,3,this.boardPos = newBoardPos)
    }

    isPlayersTurn() {
        return (this.id == gameState.playersTurnID)
    }

    moveItem({oldSlotId,newSlotId}) {
        client.socket.emit('playerMoveInventory',{oldSlotId,newSlotId})
    }
}
