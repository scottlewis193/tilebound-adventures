class Hydra extends BaseMonster {
    constructor({level,weapon,boardPos}) {
        super({level,weapon,boardPos})

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