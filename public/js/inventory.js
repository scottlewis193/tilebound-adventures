var inventory = {

    inventoryElements: {},

    toggleInventory() {
        toggleModalVisibility(['game-player-inventory','canvas']);
        this.updateInventoryLayout();
    },

   updateInventoryLayout() {

        const PLAYER_INVENTORY = players.frontEndPlayers[client.socket.id].inventory
         const INVENTORY_ELEMENTS = document.querySelectorAll('#game-player-inventory #inventory-grid .inventory-slot')
     
     for (let i = 0; i < Object.entries(PLAYER_INVENTORY).length; i++) {
        const slotObj = Object.values(PLAYER_INVENTORY)[i]
        const slotId = Object.keys(PLAYER_INVENTORY)[i]
         //if player inventory contains item add to html element
         //if (slotObj !== null) {
            // this.setItemSlotItemElement(element) 
            
            const INVENTORY_GRID_ELEMENT = document.getElementById('inventory-grid')
            INVENTORY_GRID_ELEMENT.innerHTML = ''
    
            const slotItem = new InventorySlot({
                id: slotId, 
                text: (!slotObj) ? null : slotObj.name, 
                parentGrid: INVENTORY_GRID_ELEMENT,
                bgColour: 'burlywood',
                slotNo: 0})


            this.inventoryElements[slotId] = slotItem

            //add element to inventory slot div
             //element.innerHTML = `<div class='slot-item'><h1>${PLAYER_INVENTORY[element.id].constructor.name}</h1></div>` //set slot item
             //this.dragSlotItem(element.children[0]) //make slot item draggable
         //}
     }

    this.addLayoutToDOM()

     
    },

    getItemSlotItemElement(slotId) {
        const INVENTORY_GRID_ELEMENT = document.getElementById('inventory-grid')
        return INVENTORY_GRID_ELEMENT.children[slotId]
    },

    setItemSlotItemElement(slotElement) {




        INVENTORY_GRID_ELEMENT.children[slotElement.id].innerHTML = `<div class='slot-item'><h1>${PLAYER_INVENTORY[slotElement.id].name}</h1></div>`
        let slotPos = getElementPosition(INVENTORY_GRID_ELEMENT.children[slotElement.id])
        INVENTORY_GRID_ELEMENT.children[slotElement.id].children[0].style.top = slotPos.y
        INVENTORY_GRID_ELEMENT.children[slotElement.id].children[0].style.left = slotPos.x
    },

    addLayoutToDOM() {
        for (const [key,element] of Object.entries(this.inventoryElements)) {
            element.addToDOM()
        }
    }

}