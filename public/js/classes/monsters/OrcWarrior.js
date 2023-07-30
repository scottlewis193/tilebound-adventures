class OrcWarrior extends BaseMonster {
    constructor({level,weapon}) {
        super({level,weapon})

        //fixed for class type
        this.name = 'OrcWarrior';
        this.baseDamage = 3;
        this.levelDamageMod = 3;
        this.ability = null;
        this.carriesWeapon = true;

    }
}