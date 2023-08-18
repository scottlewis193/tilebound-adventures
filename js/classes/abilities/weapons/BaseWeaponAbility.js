const items = require('../items/items')

class BaseWeaponAbility {
    constructor() {
        this.trigger = 'BattleStart' //Current Possible Values: BattleStart,WheelSpinStop
        this.type = 'PlayerDamageModifier' //Current Possible Values: PlayerDamageModifier,PlayerLuckModifier,WheelRespin
        this.weapon = new items['BaseWeapon']
        this.description = ''
    }

    executeAbility({params}) {

    }

}

exports.module = {BaseWeaponAbility}