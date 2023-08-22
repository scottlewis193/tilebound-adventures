const {BaseWeapon} = require('./BaseWeapon')

class Hatchet extends BaseWeapon {
    constructor(owner) {
        super(owner)
        this.name = "Hatchet"
        this.damage = 3
        this.ability = null
        this.twoHanded = false
        this.price = 8
        this.weaponType = 'melee'
    }
}

module.exports = {Hatchet}