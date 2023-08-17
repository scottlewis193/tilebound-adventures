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


    //ability functions

    activateMeleeImmunity() {
        console.log('Melee Immunity ability test')
    }

    activateHydraHeadGrow() {
        console.log('Hydra head grow ability test')
    }

}
