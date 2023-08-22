const {BaseWeapon} = require('./BaseWeapon')

class Longbow extends BaseWeapon {
    constructor(owner) {
        super(owner)
        this.name = "Longbow"
        this.damage = 6
        this.ability = null
        this.twoHanded = true
        this.price = 15
        this.weaponType = 'ranged'
    }
}

module.exports = {Longbow}