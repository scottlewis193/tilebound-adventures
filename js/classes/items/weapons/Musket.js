const {BaseWeapon} = require('./BaseWeapon')

class Musket extends BaseWeapon {
    constructor(owner) {
        super(owner)
        this.name = "Musket"
        this.damage = 9
        this.damageResistance = 0
        this.ability = null
        this.twoHanded = true
        this.price = 25
        this.weaponType = 'ranged'
    }
}

module.exports = {Musket}