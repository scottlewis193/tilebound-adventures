const items = require('../items/items')


class BasePlayer {

    

    constructor({id,boardPos,colour, username, inventory}) {
        this.id = id;
        this.boardPos = boardPos;
        this.colour = colour;
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

    addInventoryItem(slot,item) {
        this.inventory[slot] = new items[item]({owner: this})
    }


}

module.exports = BasePlayer