const items = require('../items/items')

class PistolAbility extends BaseWeaponAbility {
    
    constructor() {
        this.trigger = 'BattleStart'
        this.type = 'PlayerDamageModifier'
        this.weapon = new items['Pistol']
        this.description = 'Has 50% chance to miss. Wheel is spun twice when two are equipped'
    }

    executeAbility({player}) {

        //If holding one in each hand slot, Atk is now 10

        //determine if player is holding one dagger in each hand slot
        if(player.inventory.handSlot1 === this.abilityWeapon && 
            player.inventory.handSlot2 === this.abilityWeapon) {
                //do extra wheel spin
            }

    }
    
}

exports.module = {PistolAbility}