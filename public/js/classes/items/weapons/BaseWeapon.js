class BaseWeapon  {
    constructor() {
        this.name = 'BaseWeapon'
        this.damage = 0
        this.damageResistance = 0
        this.ability = null
        this.twoHanded = false
        this.price = 0
    }

    moveToInventorySlot(oldSlot = null, newSlot) {
        
        const PLAYER_INVENTORY = players.frontEndPlayers[client.socket.id].inventory

        if (oldSlot == null) {
            PLAYER_INVENTORY[newSlot] = this
        } else {
            PLAYER_INVENTORY[newSlot] = PLAYER_INVENTORY[oldSlot] 
            PLAYER_INVENTORY[oldSlot] = null
        }
    
    }


}