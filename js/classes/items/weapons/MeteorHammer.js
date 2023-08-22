const {BaseWeapon} = require('./BaseWeapon')

class MeteorHammer extends BaseWeapon {
    constructor(owner) {
        super(owner)
        this.name = "MeteorHammer"
        this.damage = 3
        this.damageResistance = 3
        this.ability = null
        this.twoHanded = true
        this.price = 17
        this.weaponType = 'melee'
    }
}

module.exports = {MeteorHammer}