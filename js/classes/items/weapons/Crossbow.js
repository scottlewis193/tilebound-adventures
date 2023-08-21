const {BaseWeapon} = require('./BaseWeapon')
const {CrossbowAbility} = require('../../abilities/weapons/CrossbowAbility');

class Crossbow extends BaseWeapon {
    constructor({owner}) {
        super(owner)
        this.name = "Crossbow"
        this.damage = 3
        this.hits = 3;
        this.ability = new CrossbowAbility
        this.twoHanded = true
        this.price = 15
        this.weaponType = 'ranged'
    }
}

module.exports = {Crossbow}