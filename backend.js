
//global imports
global.board = require('./js/board')
global.wheel = require('./js/wheel')
global.shop = require('./js/shop')
global.seedrandom = require('seedrandom')
global.BasePlayer = require('./js/classes/players/BasePlayer')

//express setup
const express = require('express')
const app = express()
const port = 3000

//socket io setup
const http = require('http');
const { get } = require('https')
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {pingInterval: 2000,pingTimeout: 10000})

//set static folder
app.use(express.static('public'))

//serve index page to client
app.get('/', (req,res) => {
    res.sendFile(__dirname= '/index.html')
})


//for creating unique ids
const uid = () =>
  String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '')


//declare backend players object
const backEndPlayers = {}

//declare backend monsters object
const backEndMonsters = {}



//declare game state properties object
const gameProperties = {
    gameState: {status: 'StartGame',
                playersTurnID: null,
                playersTurnUsername: null,
                playerTurnIndex: 0,
                turnPhase: 1,
                playersConnected: 0},
    board: board,
    shop: shop
}

gameProperties.board.generateBoard()
gameProperties.shop.updateInventory()


//socket io connection event listener
io.on('connection', (socket) => {


    socket.on('initClient', ({username, inventory}) => {

        console.log(`user ${username} (${socket.id}) connected`);

        //on connect add player to players object
        backEndPlayers[socket.id] = new BasePlayer({
                id: socket.id,
                boardPos: (typeof board !== 'undefined') ? {x: board.startPos.x, y:board.startPos.y} : {x: 0, y: 0}, 
                colour: 'royalblue',
                visible: true,
                username: username,
                gold: 5,
                level: 1,
                baseDamage: 3,
                levelDamageMod: 2,
                inventory: inventory  
        })
        
    

        backEndPlayers[socket.id].addInventoryItem('freeSlot1','Longsword')



        //if no players were previously connected, set turn as newly connected player
        if (gameProperties.gameState.playersTurnID == null) {gameProperties.gameState.playersTurnID = socket.id; gameProperties.gameState.playersTurnUsername = backEndPlayers[socket.id].username}

        //update player count
        gameProperties.gameState.playersConnected += 1

        //send updated players object to all clients
        updatePlayers()

        //send updated monsters object to all clients
        updateMonsters()

        //send updated board object to all clients
        updateBoard()

        //send updated game state object to all clients
        updateGameState()

        //send updated shop inventory to all clients
        updateShopInventory()



    })

    // socket io client disconnect event listener
    socket.on('disconnect', (reason) => {
        console.log(`user ${socket.id} disconnected: ${reason}`)

        //upon disconnection remove player from players object
        delete backEndPlayers[socket.id]

        //send updated players object to all clients
        io.emit('updatePlayers', backEndPlayers)


        //update player count
         gameProperties.gameState.playersConnected -= (gameProperties.gameState.playersConnected == 0) ? 0 : 1

       //if it was the players turn who disconnected, turn should change to next player
        if (gameProperties.gameState.playersConnected !== 0) {
            try {
                gameProperties.gameState.playersTurnID = getPlayerFromIndex(gameProperties.gameState.playerTurnIndex).id
                gameProperties.gameState.playersTurnUsername = getPlayerFromIndex(gameProperties.gameState.playerTurnIndex).username
                gameProperties.gameState.playerTurnIndex = 0
                gameProperties.gameState.turnPhase = 1
            } catch (error) {
                gameProperties.gameState.playersTurnID = null
                gameProperties.gameState.playersTurnUsername = null
                gameProperties.gameState.playerTurnIndex = 0
                gameProperties.gameState.turnPhase = 1
            }
        } else {
            gameProperties.gameState.playersTurnID = null
            gameProperties.gameState.playersTurnUsername = null
            gameProperties.gameState.playerTurnIndex = 0
            gameProperties.gameState.turnPhase = 1
        }

        updateGameState()

    })

    socket.on('updateGameState', (gameState) => {

        const OLD_TURN_PHASE = gameProperties.gameState.turnPhase

        gameProperties.gameState = gameState

        const PLAYERS_TURN_ID = gameProperties.gameState.playersTurnID
        const PLAYERS_TURN_INDEX = gameProperties.gameState.playerTurnIndex
        const GAME_STATUS = gameProperties.gameState.status
        const TURN_PHASE = gameProperties.gameState.turnPhase

       //if previous player has completed all phases
        if (OLD_TURN_PHASE !== TURN_PHASE && TURN_PHASE == 1) 
        {
        
        
        if (PLAYERS_TURN_ID !== 'Overworld') {gameProperties.gameState.playerTurnIndex += 1} else {gameProperties.gameState.playerTurnIndex = 0}


        //if on last player, move to overworlds turn
        if (!Object.values(backEndPlayers)[gameProperties.gameState.playerTurnIndex]) {
            
            //set overworld turn
            gameProperties.gameState.playersTurnID = 'Overworld'
            gameProperties.gameState.playersTurnUsername = 'Overworld'

            //start overworld turn phases
            startOverWorldTurn()



        } else {
            gameProperties.gameState.playersTurnID = Object.values(backEndPlayers)[gameProperties.gameState.playerTurnIndex].id
            gameProperties.gameState.playersTurnUsername = Object.values(backEndPlayers)[gameProperties.gameState.playerTurnIndex].username
        }
       
        }

        console.log('received UpdatedGameState')
        //if game has just started, set first players turn
        if (GAME_STATUS == 'InProgress' && gameProperties.gameState.playersTurnID == null) {
            gameProperties.gameState.playersTurnID = Object.values(backEndPlayers)[0].id
            gameProperties.gameState.playersTurnUsername = Object.values(backEndPlayers)[0].username
        }

        updateGameState()
      
        //updateDebug()
    })

    socket.on('playerMove', (newPos) => {
        
        backEndPlayers[socket.id].boardPos = newPos
        updatePlayers()
        gameProperties.gameState.turnPhase = 4
        updateGameState()
 
    })

    socket.on('playerMoveInventory', ({oldSlotId,newSlotId}) => {

        //validate if slot is valid

        const PLAYER_INVENTORY = backEndPlayers[socket.id].inventory

      

        //check if item can go in specific slot
        if  ( !(newSlotId.includes(PLAYER_INVENTORY[oldSlotId].slotType)) && !(newSlotId.includes('freeSlot'))) {
            updatePlayers() //this is reset the client's inventory pos if it's invalid
            return
        }  


        let oldNewSlot = JSON.stringify(backEndPlayers[socket.id].inventory[newSlotId])
        backEndPlayers[socket.id].inventory[newSlotId] = JSON.parse(JSON.stringify(backEndPlayers[socket.id].inventory[oldSlotId]))
        backEndPlayers[socket.id].inventory[oldSlotId] = JSON.parse(oldNewSlot)

        console.log(backEndPlayers[socket.id].inventory)

        updatePlayers()
    })


  });

 
// setInterval(() => {
//     updatePlayers()
// }, 15)

//server listen event listener
server.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

console.log('Server loaded')

function updatePlayers() {
    console.log('updatePlayers')
    io.emit('updatePlayers', backEndPlayers)

    //updateDebug()

}

function updateMonsters() {
    console.log('updateMonsters')
    io.emit('updateMonsters',backEndMonsters)
}

function updateBoard() {
    console.log('updateBoard')
    io.emit('updateBoard', gameProperties.board)

    //updateDebug()
}

function updateGameState() {
    console.log('updateGameState')
    io.emit('updateGameState', gameProperties.gameState)
    console.log(gameProperties.gameState)
   //updateDebug()
}

function updateShopInventory() {
    console.log('updateShopInventoryTEst')
    io.emit('updateShopInventory', shop.inventory)
    console.log(shop.inventory)
}

function getPlayerFromIndex(index) {
    let i = 0 
    for (const id in backEndPlayers) {
        if(i == index) {return backEndPlayers[id]}
        i++
    }
    return null
}



function startOverWorldTurn() {


    //move any monsters on the board
    for (const i in backEndMonsters) {
        const backEndMonster = backEndMonsters[i]

        
        let validMovement = false

        //randomise movement direction
        let direction = Math.floor(Math.random() * 4)

        do {
            switch (direction) {
                case 0 : //Up
                    if(backEndMonster.boardPos.y !== 0) {validMovement = true; backEndMonster.boardPos.y -= 1}
                    break;
                case 1 : //right
                    if(backEndMonster.boardPos.x < (board.boardSize -1)) {validMovement = true; backEndMonster.boardPos.x += 1}
                    break;
                case 2 : //down
                    if(backEndMonster.boardPos.y < (board.boardSize -1)) {validMovement = true; backEndMonster.boardPos.y += 1}
                    break;
                case 3: //left
                    if(backEndMonster.boardPos.x !== 0) {validMovement = true; backEndMonster.boardPos.x -= 1}
                    break;

            }
        } while(validMovement == false)


    }

    updateMonsters()


    //wait until monsters on fields have finished moving then do monster wheels for spawning
    setTimeout(() => {doMonsterSpawning()},5000)




}

function doMonsterSpawning() {

    //spin wheels for cave spawning

    let wheelOptionsArray = [wheel.createWheelOptions('MonsterSpawn'),wheel.createWheelOptions('MonsterType'),wheel.createWheelOptions('MonsterLevel'),wheel.createWheelOptions('MonsterWeapon')]
    
    //send options to clients to be drawn
    io.emit('spinOverWorldWheels',wheelOptionsArray)

    //work out what monster to spawn if any

    const MONSTER_SPAWN = (wheelOptionsArray[0].getSegmentAtStopAngle().text == 'No') ? false : true;
    const MONSTER_TYPE = wheelOptionsArray[1].getSegmentAtStopAngle().text;
    const MONSTER_LEVEL = wheelOptionsArray[2].getSegmentAtStopAngle().text;
    const MONSTER_WEAPON = wheelOptionsArray[3].getSegmentAtStopAngle().text;
    let MONSTER_SPAWN_POS = {x:0,y:0}

    if (MONSTER_SPAWN == true) {

    //work out spawn position for monster
    Object.keys(board.tiles).forEach(function(key,index) {
       if (board.tiles[key].name == 'CaveTile') {
            MONSTER_SPAWN_POS = {x: board.tiles[key].gridPos.x, y: board.tiles[key].gridPos.y}
            
       }
    });

    //create monster obj
    backEndMonsters[uid()] = {
        name: MONSTER_TYPE,
        level: MONSTER_LEVEL,
        weapon: MONSTER_WEAPON,
        boardPos: MONSTER_SPAWN_POS
    }

    //update clients with new monster to draw
    updateMonsters()

    }


    //set turn back to first player

    gameProperties.gameState.playerTurnIndex = 0
    gameProperties.gameState.playersTurnID = Object.values(backEndPlayers)[gameProperties.gameState.playerTurnIndex].id
    gameProperties.gameState.playersTurnUsername = Object.values(backEndPlayers)[gameProperties.gameState.playerTurnIndex].username

    updateGameState()

}

function updateDebug() {

    let playerListAry = []
    let playerListStr

    for (const i in backEndPlayers) {
       playerListAry.push(backEndPlayers[i].id)
    } 

    playerListStr = playerListAry.join(',')

    console.clear()
    console.log(`+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+-+`)
    console.log(`|T|I|L|E|B|O|U|N|D| |A|D|V|E|N|T|U|R|E|S|`)
    console.log(`+-+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+-+`)
    console.log(``)
    console.log(`INDEV`)
    console.log(``)
    console.log(`=========================================`)
    console.log(`GameState: ${gameProperties.gameState.status}`)
    console.log(`Players: ${gameProperties.gameState.playersConnected} (${playerListStr})`)
    console.log(`TurnID: ${gameProperties.gameState.playersTurnID}`)
    console.log(`TurnIndex: ${gameProperties.gameState.playerTurnIndex}`)
    console.log(`TurnPhase: ${gameProperties.gameState.turnPhase}`)
    console.log(`=========================================`)
}
