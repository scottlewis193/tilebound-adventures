class Goblin extends BaseMonster {
    constructor({level,weapon,boardPos}) {
        super({level,weapon,boardPos})

        //fixed for class type
        this.name = 'Goblin';
        this.baseDamage = 2;
        this.levelDamageMod = 2;
        this.ability = null;
        this.carriesWeapon = true;

    }
}