const {BaseWeapon} = require('./BaseWeapon')
const {DaggerAbility} = require('../../abilities/weapons/DaggerAbility')

class Dagger extends BaseWeapon {
    constructor({owner}) {
        super(owner)
        this.name = "Dagger"
        this.damage = 4
        this.ability = new DaggerAbility
        this.twoHanded = false
        this.price = 13
        this.weaponType = 'melee'
    }
}

module.exports = {Dagger}