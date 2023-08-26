var shop = {

    inventory: {},
    inventoryElements: null,


    toggleShop() {
        inventory.updateInventoryLayout()
        toggleModalVisibility(['game-player-inventory','game-shop','canvas']);
        const PLAYER_INVENTORY_ELEMENT = document.getElementById('game-player-inventory')
        const GAME_SHOP_ELEMENT = document.getElementById('game-shop')
        if(PLAYER_INVENTORY_ELEMENT.style.display == 'block' &&  GAME_SHOP_ELEMENT.style.display == 'block') {
    } else {

    }
    },

    generateInventoryElements() {
        this.inventoryElements = {}
        const SHOP_INVENTORY_GRID_ELEMENT = document.getElementById('shop-inventory-grid')
        for (const [key,value] of Object.entries(this.inventory)) {
            let index = 0
            
            const shopSlot = new InventorySlot({
                id: key, 
                text: value.name,
                parentGrid: SHOP_INVENTORY_GRID_ELEMENT, 
                bgColour: 'burlywood',
                slotNo: index})

                index++

            this.inventoryElements[shopSlot.id] = shopSlot
        }

        this.addLayoutToDOM()
    },

    addLayoutToDOM() {
        for (const [key,element] of Object.entries(this.inventoryElements)) {
            element.addToDOM()
        }
    }
}