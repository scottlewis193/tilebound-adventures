class BaseArmor  {
    constructor({owner}) {
        this.name = 'BaseArmor';
        this.damage = 0;
        this.damageResistance = 6;
        this.ability = null;
        this.twoHanded = false;
        this.price = 0;
        this.slotType = 'hand';
        this.weaponType = 'melee'
        this.availableinShop = true
        this.owner = owner //should be Player Obj
    }



}

module.exports = {BaseArmor}