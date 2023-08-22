class BaseWeapon  {
    constructor(owner) {
        this.name = 'BaseWeapon';
        this.damage = 0;
        this.damageResistance = 0;
        this.hits = 1;
        this.hitMin = 1;
        this.hitChance = 1;
        this.ability = null;
        this.twoHanded = false;
        this.price = 0;
        this.slotType = 'hand';
        this.weaponType = 'melee'
        this.availableInShop = true
        this.owner = owner //should be Player Obj
    }



}

module.exports = {BaseWeapon}