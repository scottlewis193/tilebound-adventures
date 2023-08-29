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
        slotDiv.innerHTML= `<h3>${this.text}</h3>`
        div.className = 'inventory-slot'
        slotDiv.className = 'slot-item'
        div.id = this.id
        if (this.text !== null) {div.appendChild(slotDiv)}

        //add element to parent
        this.parentGrid.appendChild(div)

        //make element draggable
        this.dragSlotItem(slotDiv)
    }


    dragSlotItem(elmnt) {

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const INVENTORY_GRID_ELEMENT = this.parentGrid
        const PLAYER_INVENTORY = players.frontEndPlayers[client.socket.id].inventory
        const PLAYER = players.frontEndPlayers[client.socket.id]
        const currentItemSlot = elmnt.parentElement

        elmnt.onmousedown = dragMouseDown;

        
      
        //slot item is being dragged
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.position = 'absolute'
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

      
            elmnt.style.position = 'relative'
            // work out slot that slot-item has been dragged to

            let validSlot = false

            for (let i = 0; i < INVENTORY_GRID_ELEMENT.children.length; i++) {
                let slot = INVENTORY_GRID_ELEMENT.children[i]
                let slotPos = getElementPosition(slot)

                if (pos3 > slotPos.x && pos3 < (slotPos.x + slot.offsetWidth) && pos4 > slotPos.y && pos4 < (slotPos.y + slot.offsetHeight)) {

                    //move element to slot visually
                    elmnt.style.top = slotPos.y + "px";
                    elmnt.style.left = slotPos.x + "px";

                    validSlot = true
                    PLAYER.moveItem({oldSlotId: currentItemSlot.id, newSlotId: slot.id})

                    break;
                }
  
            }



            if (validSlot == false) {
                //reset position
                elmnt.style.removeProperty('top')
                elmnt.style.removeProperty('left')
            }

          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;

    
        }
    }



}