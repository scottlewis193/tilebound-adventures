const {BaseWeapon} = require('./BaseWeapon')
const {NumchucksAbility} = require('../../abilities/weapons/NumchucksAbility')

class Numchucks extends BaseWeapon {
    constructor({owner}) {
        super(owner)
        this.name = "Numchucks"
        this.damage = 5
        this.ability = new NumchucksAbility
        this.twoHanded = false
        this.price = 19
        this.weaponType = 'melee'
    }
}

module.exports = {Numchucks}