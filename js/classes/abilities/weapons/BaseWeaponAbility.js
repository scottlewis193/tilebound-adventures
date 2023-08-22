
class BaseWeaponAbility {
    constructor() {
        this.trigger = 'BattleStart' //Current Possible Values: BattleStart,WheelSpinStop
        this.type = 'PlayerDamageModifier' //Current Possible Values: PlayerDamageModifier,PlayerLuckModifier,WheelRespin
        this.weapon = null
        this.description = ''
    }

    executeAbility({params}) {

    }

}

module.exports = {BaseWeaponAbility}