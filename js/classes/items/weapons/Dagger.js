const {BaseWeapon} = require('./BaseWeapon')


class Dagger extends BaseWeapon {
    constructor(owner) {
        super(owner)
        this.name = "Dagger"
        this.damage = 4
        this.ability = global.abilities.Dagger
        this.twoHanded = false
        this.price = 13
        this.weaponType = 'melee'
    }
}

module.exports = {Dagger}