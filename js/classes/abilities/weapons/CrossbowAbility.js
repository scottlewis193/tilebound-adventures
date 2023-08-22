const {BaseWeaponAbility} = require('./BaseWeaponAbility')



class CrossbowAbility extends BaseWeaponAbility {
    constructor() {
        super()
        const items = require('../../items/items')
        this.trigger = 'BattleStart'
        this.type = 'WheelRespin'
        this.weapon = items.CrossBow
        this.description = 'Hit up to 3 times (Minimum 1) for each successful wheel spin'
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

module.exports = {CrossbowAbility}