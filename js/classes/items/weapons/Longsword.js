const {BaseWeapon} = require('./BaseWeapon')

class Longsword extends BaseWeapon {
    constructor(owner) {
        super(owner)
        this.name = "Longsword"
        this.damage = 8
        this.ability = null
        this.twoHanded = true
        this.price = 22
        this.weaponType = 'melee'
    }




}

module.exports = {Longsword}