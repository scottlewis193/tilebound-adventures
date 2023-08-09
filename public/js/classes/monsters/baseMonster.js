class BaseMonster {

    constructor({level,weapon,boardPos}) {

        //base variables
        this.level = level;
        this.weapon = weapon;
        this.boardPos = boardPos;
        
        //fixed for class type
        this.name = 'BaseMonster';
        this.baseDamage = 0;
        this.levelDamageMod = 1;
        this.ability = null;
        this.carriesWeapon = true;
        this.isBoss = false;
        this.colour = 'black'


    }

    draw() {
            fgC.fillStyle = this.colour
            fgC.beginPath()
            fgC.arc(this.boardXToCanvasX(true),this.boardYToCanvasY(true),(board.tileSize / 2),0,Math.PI * 2,false)
            fgC.fill()
            fgC.closePath()
        }
        

        boardXToCanvasX(centered = false) {
            if (centered) {return board.boardPos.x + (board.tileSize / 2) + ((this.boardPos.x) * board.tileSize)}
            else {return board.boardPos.x + ((this.boardPos.x) * board.tileSize)}
        }
        
        boardYToCanvasY(centered = false) {
           if(centered) {return board.boardPos.y + (board.tileSize / 2) + ((this.boardPos.y) * board.tileSize)}
           else {return board.boardPos.y + ((this.boardPos.y) * board.tileSize)}
        }

    //ability functions

    activateMeleeImmunity() {
        console.log('Melee Immunity ability test')
    }

    activateHydraHeadGrow() {
        console.log('Hydra head grow ability test')
    }

}
