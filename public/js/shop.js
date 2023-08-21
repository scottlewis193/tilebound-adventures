var shop = {

    inventory: {},

    toggleShop() {
        toggleModalVisibility(['game-shop','canvas']);
        this.updateInventoryLayout();
    },

    updateInventoryLayout() {
        const SHOP_INVENTORY_GRID_ELEMENT = document.getElementById('shop-inventory-grid')

        for (const item in inventory) {
            SHOP_INVENTORY_GRID_ELEMENT.children[item.name].innerHTML = `<div class='slot-item'><h1>${item.name}</h1></div>`
        }

        
        console.log('gen inv')
    }
}