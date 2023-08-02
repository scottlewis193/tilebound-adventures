class OrcWarrior extends BaseMonster {
    constructor({level,weapon,boardPos}) {
        super({level,weapon,boardPos})

        //fixed for class type
        this.name = 'OrcWarrior';
        this.baseDamage = 3;
        this.levelDamageMod = 3;
        this.ability = null;
        this.carriesWeapon = true;

    }
}