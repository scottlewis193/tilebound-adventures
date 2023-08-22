const items = require('./classes/items/items')

var shop = {

    inventory: {},

    updateInventory() {
        this.inventory = {};
        //for (const item in items) {
            shop.inventory = items
        //}
 
  
        console.log('updateInventory')

    }
}

module.exports = shop