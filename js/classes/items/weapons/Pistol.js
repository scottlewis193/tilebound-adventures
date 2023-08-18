const {BaseWeapon} = require('./BaseWeapon')
const {PistolAbility} = require('../../abilities/weapons/PistolAbility')

class Pistol extends BaseWeapon {
    constructor({owner}) {
        super(owner)
        this.name = "Pistol"
        this.damage = 8
        this.hitChance = 0.5;
        this.ability = new PistolAbility
        this.twoHanded = false
        this.price = 13
        this.weaponType = 'melee'
    }
}

module.exports = {Pistol}