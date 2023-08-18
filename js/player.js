var player =  {

addInventoryItem(playerID,slot,item) {
    backEndPlayers[playerID].inventory[slot] = eval(new item)()
}

}

module.exports = player