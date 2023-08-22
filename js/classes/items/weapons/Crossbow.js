const {BaseWeapon} = require('./BaseWeapon')

class Crossbow extends BaseWeapon {
    constructor(owner) {
        super(owner)

        this.name = "Crossbow"
        this.damage = 3
        this.hits = 3;
        this.ability = global.abilities.Crossbow
        this.twoHanded = true
        this.price = 15
        this.weaponType = 'ranged'
    }
}

module.exports = {Crossbow}