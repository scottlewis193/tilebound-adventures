const items = require('./classes/items/items')

var shop = {

    inventory: {},

    updateInventory() {
        this.inventory = {};
        for (const item in items) {
            shop.inventory[item] = items[item]
        }
 
  
        console.log('updateInventory')

    }
}

module.exports = shop