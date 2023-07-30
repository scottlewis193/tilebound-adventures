class Hydra extends BaseMonster {
    constructor({level,weapon}) {
        super({level,weapon})

        //fixed for class type
        this.name = 'Hydra';
        this.baseDamage = 4;
        this.levelDamageMod = 4;
        this.ability = {name:'Hydra Head Grow',
                        activationType: 'monsterDeath',
                        activate: function() {activateHydraHeadGrow()}
                        };;
        this.carriesWeapon = false;

    }
}