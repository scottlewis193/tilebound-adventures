class Dragon extends BaseMonster {
    constructor({level,weapon,boardPos}) {
        super({level,weapon,boardPos}) 

        //fixed for class type
        this.name = 'Dragon';
        this.baseDamage = 9;
        this.levelDamageMod = 3;
        this.ability = {name:'Melee Immunity',
                        activationType: 'battleStart',
                        activate: function() {activateMeleeImmunity()}
                        };
        this.carriesWeapon = false;

        
    }
}