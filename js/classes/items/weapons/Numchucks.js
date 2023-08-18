const {BaseWeapon} = require('./BaseWeapon')

class Numchucks extends BaseWeapon {
    constructor({owner}) {
        super(owner)
        this.name = "Numchucks"
        this.damage = 5
        this.ability = null
        this.twoHanded = false
        this.price = 19
        this.weaponType = 'melee'
    }
}

module.exports = {Numchucks}