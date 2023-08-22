const {BaseWeaponAbility} = require('./BaseWeaponAbility')

class NumchucksAbility extends BaseWeaponAbility {
    
    constructor() {
        super()
        const items = require('../../items/items')
        this.trigger = 'BattleStart'
        this.type = 'WheelRespin'
        this.weapon = items.Numchucks 
        this.description = 'If holding one in each hand, battle wheel can be respan'
    }

    executeAbility({player}) {

        //determine if player is holding one dagger in each hand slot
        if(player.inventory.handSlot1 === this.abilityWeapon && 
            player.inventory.handSlot2 === this.abilityWeapon) {
                   //do extra wheel spin
            }

    }
    
}

module.exports = {NumchucksAbility}