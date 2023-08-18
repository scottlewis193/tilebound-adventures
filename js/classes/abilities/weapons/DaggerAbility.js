const items = require('../items/items')

class DaggerAbility extends BaseWeaponAbility {
    
    constructor() {
        this.trigger = 'BattleStart'
        this.type = 'PlayerDamageModifier'
        this.weapon = new items['Dagger'] 
        this.description = 'If holding one in each hand, Attack is now 10'
    }

    executeAbility({player}) {

        //determine if player is holding one dagger in each hand slot
        if(player.inventory.handSlot1 === this.abilityWeapon && 
            player.inventory.handSlot2 === this.abilityWeapon) {
                player.inventory.handSlot1.damage = 5
                player.inventory.handSlot2.damage = 5
            }

    }
    
}

exports.module = {DaggerAbility}