
global.board = require('./js/board')
global.seedrandom = require('seedrandom')

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
    board: board
}

gameProperties.board.generateBoard()

//socket io connection event listener
io.on('connection', (socket) => {


    socket.on('initClient', ({username, inventory}) => {

        console.log(`user ${username} (${socket.id}) connected`);

        //on connect add player to players object
        backEndPlayers[socket.id] = {
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
        } 

        console.log(backEndPlayers[socket.id])

        //if no players were previously connected, set turn as newly connected player
        if (gameProperties.gameState.playersTurnID == null) {gameProperties.gameState.playersTurnID = socket.id; gameProperties.gameState.playersTurnUsername = backEndPlayers[socket.id].username}

        //update player count
        gameProperties.gameState.playersConnected += 1

        //send updated players object to all clients
        updatePlayers()

        //send updated board object to all clients
        updateBoard()

        //send updated game state object to all clients
        updateGameState()

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
            gameProperties.gameState.playersTurnID = 'Overworld'
            gameProperties.gameState.playersTurnUsername = 'Overworld'
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

    socket.on('createWheel', ({wheelType, args}) => {

        let wheelOptions =             {'animation' :
        {
            // Must be specified...
            'type'     : 'spinToStop',
            'duration' : 10,
 
            // These are the defaults, all optional...
            'spins'        : 5,
            'easing'       : 'Power4.easeOut',
            'stopAngle'    : 55,
            'direction'    : 'clockwise',
            'repeat'       : 0,
            'yoyo'         : false,
            'callbackAfter' : function() {wheel.drawWheelPointer()}
        }
    }

        switch (wheelType) {

            case 'Battle' :

            wheelOptions = Object.assign({
                    'numSegments': 2,
                    'segments': [
                        {'size' : getBattleWheelAngle(socket.id,args.monsterID), 'text' : 'Win', 'fillStyle' : '#89f26e'},
                        {'size' : 360-getBattleWheelAngle(socket.id,args.monsterID), 'text' : 'Lose', 'fillStyle' : '#e7706f'}
                    ]
                })
  
            break;

            case 'Loot' :
            
            break;

            case 'Random' :

            break;

            case 'YesNo' :

            wheelOptions = Object.assign({
                'numSegments': 2,
                'segments': [
                    {'size' : 180, 'text' : 'Yes', 'fillStyle' : '#89f26e'},
                    {'size' : 180, 'text' : 'No', 'fillStyle' : '#e7706f'}
                ]
            })

            break;

            case 'MonsterType' :

            wheelOptions = Object.assign({
                'numSegments': 4,
                'segments': [
                    {'size' : 90, 'text' : 'Dragon', 'fillStyle' : '#89f26e'},
                    {'size' : 90, 'text' : 'Goblin', 'fillStyle' : '#e7706f'},
                    {'size' : 90, 'text' : 'Hydra', 'fillStyle' : '#89f26e'},
                    {'size' : 90, 'text' : 'OrcWarrior', 'fillStyle' : '#e7706f'}
                ]
            })

            break;

            case 'MonsterLevel' :

            wheelOptions = Object.assign({
                'numSegments': 10,
                'segments': [
                    {'size' : 36, 'text' : '1', 'fillStyle' : '#89f26e'},
                    {'size' : 36, 'text' : '2', 'fillStyle' : '#e7706f'},
                    {'size' : 36, 'text' : '3', 'fillStyle' : '#89f26e'},
                    {'size' : 36, 'text' : '4', 'fillStyle' : '#e7706f'},
                    {'size' : 36, 'text' : '5', 'fillStyle' : '#89f26e'},
                    {'size' : 36, 'text' : '6', 'fillStyle' : '#e7706f'},
                    {'size' : 36, 'text' : '7', 'fillStyle' : '#89f26e'},
                    {'size' : 36, 'text' : '8', 'fillStyle' : '#e7706f'},
                    {'size' : 36, 'text' : '9', 'fillStyle' : '#89f26e'},
                    {'size' : 36, 'text' : '10', 'fillStyle' : '#e7706f'}
                ]
            })

            break;

            case 'MonsterWeapon' :

            
            wheelOptions = Object.assign({
                'numSegments': 2,
                'segments': [
                    {'size' : 180, 'text' : 'Longbow', 'fillStyle' : '#89f26e'},
                    {'size' : 180, 'text' : 'Longsword', 'fillStyle' : '#e7706f'}
                ]
            })

            break;




        }

    
        
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

function getPlayerFromIndex(index) {
    let i = 0 
    for (const id in backEndPlayers) {
        if(i == index) {return backEndPlayers[id]}
        i++
    }
    return null
}


//calculates win/lose angles for each segment on a battlewheel
function getBattleWheelAngle(playerID,monsterID) {

    //work out player total dmg
    const PLAYER_BASE_DMG = backEndPlayers[playerID].baseDamage
    const PLAYER_LEVEL_DMG_MOD = backEndPlayers[playerID].levelDamageMod
    const PLAYER_WEAPON_DMG = (!backEndPlayers[playerID].inventory.handSlot1) ? 0 : backEndPlayers[playerID].inventory.handSlot1.damage + 
                                (!backEndPlayers[playerID].inventory.handSlot2) ? 0 : backEndPlayers[playerID].inventory.handSlot2.damage
    const PLAYER_TOTAL_RESISTANCE = (!backEndPlayers[playerID].inventory.handSlot1) ? 0 : backEndPlayers[playerID].inventory.handSlot1.damageResistance + 
                                (!backEndPlayers[playerID].inventory.handSlot2) ? 0 : backEndPlayers[playerID].inventory.handSlot2.damageResistance +
                                (!backEndPlayers[playerID].inventory.headSlot) ? 0 : backEndPlayers[playerID].inventory.headSlot.damageResistance + 
                                (!backEndPlayers[playerID].inventory.chestSlot) ? 0 : backEndPlayers[playerID].inventory.chestSlot.damageResistance + 
                                (!backEndPlayers[playerID].inventory.legsSlot) ? 0 : backEndPlayers[playerID].inventory.legsSlot.damageResistance + 
                                (!backEndPlayers[playerID].inventory.feetSlot) ? 0 : backEndPlayers[playerID].inventory.feetSlot.damageResistance

    const PLAYER_TOTAL_DMG = (PLAYER_BASE_DMG * (PLAYER_LEVEL_DMG_MOD - 1)) + PLAYER_WEAPON_DMG

    //work out monster total dmg
    const MONSTER_BASE_DMG  = backEndMonsters[monsterID].baseDamage
    const MONSTER_LEVEL_DMG_MOD = backEndMonsters[monsterID].levelDamageMod
    const MONSTER_WEAPON_DMG = (!backEndMonsters[monsterID].weapon) ? 0 : backEndMonsters[monsterID].weapon.damage

    const MONSTER_TOTAL_DMG = ((MONSTER_BASE_DMG * (MONSTER_LEVEL_DMG_MOD - 1)) + MONSTER_WEAPON_DMG) - PLAYER_TOTAL_RESISTANCE


    //work out angle
    return (PLAYER_TOTAL_DMG/MONSTER_BASE_DMG) * 180

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
