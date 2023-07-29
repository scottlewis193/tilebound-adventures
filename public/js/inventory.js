var inventory = {

    toggleInventory() {
        toggleModalVisibility(['game-player-inventory','canvas']);
        this.updateInventoryLayout();
    },

   updateInventoryLayout() {
        const PLAYER_INVENTORY = players.frontEndPlayers[client.socket.id].inventory
         const INVENTORY_ELEMENTS = document.getElementsByClassName('inventory-slot')
     
     for (let i = 0; i < INVENTORY_ELEMENTS.length; i++) {
         let element = INVENTORY_ELEMENTS[i]
         //clear previous inventory slot 
         element.innerHTML = ''
     
         //if player inventory contains item add to html element
         if (PLAYER_INVENTORY[element.id] !== null) {
            this.setItemSlotItemElement(element) //add element to inventory slot div
             //element.innerHTML = `<div class='slot-item'><h1>${PLAYER_INVENTORY[element.id].constructor.name}</h1></div>` //set slot item
             this.dragSlotItem(element.children[0]) //make slot item draggable
         }
     }
     
    },

    dragSlotItem(elmnt) {

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const INVENTORY_GRID_ELEMENT = document.getElementById('inventory-grid')
        const PLAYER_INVENTORY = players.frontEndPlayers[client.socket.id].inventory

        elmnt.onmousedown = dragMouseDown;
        let currentItemSlot = PLAYER_INVENTORY[elmnt.parentElement]
        
      
        //slot item is being dragged
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragSlotItem;
          // call a function whenever the cursor moves:
          document.onmousemove = slotItemDrag;
        }
      
        //validate new position
        function slotItemDrag(e) {
          e = e || window.event;
          e.preventDefault();

          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;

        
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
      
        //slot item finished dragging
        function closeDragSlotItem() {


            // work out slot that slot-item has been dragged to

            let validSlot = false

            for (let i = 0; i < INVENTORY_GRID_ELEMENT.children.length; i++) {
                let slot = INVENTORY_GRID_ELEMENT.children[i]
                let slotPos = getElementPosition(slot)

                if (pos3 > slotPos.x && pos3 < (slotPos.x + slot.offsetWidth) && pos4 > slotPos.y && pos4 < (slotPos.y + slot.offsetHeight)) {

                    //move item object
                    players.frontEndPlayers[client.socket.id].moveItem({oldSlotId: elmnt.parentElement.id, newSlotId: slot.id})


                    //move element to slot visually
                    elmnt.style.top = slotPos.y + "px";
                    elmnt.style.left = slotPos.x + "px";

                    validSlot = true

                    break;
                }
  
            }

            if (validSlot == false) {
                inventory.updateInventoryLayout()
            }

          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
        }
    },



    getItemSlotItemElement(slotId) {
        const INVENTORY_GRID_ELEMENT = document.getElementById('inventory-grid')
        return INVENTORY_GRID_ELEMENT.children[slotId]
    },

    setItemSlotItemElement(slotElement) {
        const INVENTORY_GRID_ELEMENT = document.getElementById('inventory-grid')
        const PLAYER_INVENTORY = players.frontEndPlayers[client.socket.id].inventory

        INVENTORY_GRID_ELEMENT.children[slotElement.id].innerHTML = `<div class='slot-item'><h1>${PLAYER_INVENTORY[slotElement.id].name}</h1></div>`
        let slotPos = getElementPosition(INVENTORY_GRID_ELEMENT.children[slotElement.id])
        INVENTORY_GRID_ELEMENT.children[slotElement.id].children[0].style.top = slotPos.y
        INVENTORY_GRID_ELEMENT.children[slotElement.id].children[0].style.left = slotPos.x
    }

}