class Goblin extends BaseMonster {
    constructor({level,weapon}) {
        super({level,weapon})

        //fixed for class type
        this.name = 'Goblin';
        this.baseDamage = 2;
        this.levelDamageMod = 2;
        this.ability = null;
        this.carriesWeapon = true;

    }
}