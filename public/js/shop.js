var shop = {

    inventory: {},

    toggleShop() {
        const SHOP_INVENTORY_GRID_ELEMENT = document.getElementById('shop-inventory-grid')
        if(SHOP_INVENTORY_GRID_ELEMENT.style.display == 'block') this.updateInventoryLayout();
        toggleModalVisibility(['game-shop','canvas']);
    },

    updateInventoryLayout() {
        const SHOP_INVENTORY_GRID_ELEMENT = document.getElementById('shop-inventory-grid')
        let newEleStr = ''
        console.log(this.inventory)
        for (const [key,value] of Object.entries(this.inventory)) {
            newEleStr += `<div class='slot-item' style='display:block'><h1>${value.name}</h1></div>`
            console.log(value.name)
        }

        SHOP_INVENTORY_GRID_ELEMENT.innerHTML = newEleStr


    }
}