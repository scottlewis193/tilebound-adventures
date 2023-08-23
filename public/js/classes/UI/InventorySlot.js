class InventorySlot {
    constructor({id,text,parentGrid,bgImg,bgColour,slotNo}) {
        this.id = id;
        this.text = text;
        this.parentGrid = parentGrid;
        this.bgImg = bgImg;
        this.bgColour = bgColour;
        this.slotNo = slotNo;
    }

    addToDOM() {

        //create element
        const div = document.createElement('div')
        const slotDiv = document.createElement('div')
        slotDiv.innerHTML= `<h1>${this.text}</h1>`
        div.className = 'inventory-slot'
        slotDiv.className = 'slot-item'
        div.appendChild(slotDiv)

        //add element to parent
        this.parentGrid.appendChild(div)

        //make element draggable
        this.dragSlotItem(slotDiv)
    }


    dragSlotItem(elmnt) {

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const INVENTORY_GRID_ELEMENT = this.parentGrid
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

                    console.log('valid move pos')

                    //move item object
                    //players.frontEndPlayers[client.socket.id].moveItem({oldSlotId: elmnt.parentElement.id, newSlotId: slot.id})


                    //move element to slot visually
                    elmnt.style.top = slotPos.y + "px";
                    elmnt.style.left = slotPos.x + "px";

                    validSlot = true

                    break;
                }
  
            }

            // if (validSlot == false) {
            //     inventory.updateInventoryLayout()
            // }

          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
        }
    }



}