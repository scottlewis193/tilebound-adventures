var shop = {

    inventory: {},
    inventoryElements: null,


    toggleShop() {
        toggleModalVisibility(['game-shop','canvas']);
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