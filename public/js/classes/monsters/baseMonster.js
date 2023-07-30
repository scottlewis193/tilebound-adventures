class BaseMonster {

    constructor({level,weapon}) {

        //base variables
        this.level = level;
        this.weapon = weapon;
        
        //fixed for class type
        this.name = 'BaseMonster';
        this.baseDamage = 0;
        this.levelDamageMod = 1;
        this.ability = null;
        this.carriesWeapon = true;
        this.isBoss = false;


    }


    //ability functions

    activateMeleeImmunity() {
        console.log('Melee Immunity ability test')
    }

    activateHydraHeadGrow() {
        console.log('Hydra head grow ability test')
    }

}
