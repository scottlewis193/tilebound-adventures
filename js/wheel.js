
var wheel = {

//calculates win/lose angles for each segment on a battlewheel
getBattleWheelAngle(playerID,monsterID) {

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

},

createWheelOptions(wheelType) {

    let wheelOptions = {}           


    switch (wheelType) {

        case 'Battle' :

        wheelOptions = {
                id: wheelType,
                'canvasId': 'fg-canvas',
                'numSegments': 2,
                'segments': [
                    {'size' : getBattleWheelAngle(socket.id,args.monsterID), 'text' : 'Win', 'fillStyle' : '#89f26e'},
                    {'size' : 360-getBattleWheelAngle(socket.id,args.monsterID), 'text' : 'Lose', 'fillStyle' : '#e7706f'}
                ]
            }

        break;

        case 'Loot' :
        
        break;

        case 'Random' :

        break;

        case 'MonsterSpawn' :

        wheelOptions = {
            id: wheelType,
            'canvasId': 'fg-canvas',
            'numSegments': 2,
            'segments': [
                {'size' : 180, 'text' : 'Yes', 'fillStyle' : '#89f26e'},
                {'size' : 180, 'text' : 'No', 'fillStyle' : '#e7706f'}
            ]
        }

        break;

        case 'MonsterType' :

        wheelOptions = {
            id: wheelType,
            'canvasId': 'fg-canvas',
            'numSegments': 4,
            'segments': [
                {'size' : 90, 'text' : 'Dragon', 'fillStyle' : '#89f26e'},
                {'size' : 90, 'text' : 'Goblin', 'fillStyle' : '#e7706f'},
                {'size' : 90, 'text' : 'Hydra', 'fillStyle' : '#89f26e'},
                {'size' : 90, 'text' : 'OrcWarrior', 'fillStyle' : '#e7706f'}
            ]
        }

        break;

        case 'MonsterLevel' :

        wheelOptions = {
            id: wheelType,
            'canvasId': 'fg-canvas',
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
        }

        break;

        case 'MonsterWeapon' :

        
        wheelOptions = {
            id: wheelType,
            'canvasId': 'fg-canvas',
            'numSegments': 2,
            'segments': [
                {'size' : 180, 'text' : 'Longbow', 'fillStyle' : '#89f26e'},
                {'size' : 180, 'text' : 'Longsword', 'fillStyle' : '#e7706f'}
            ]
        }

        break;

    }


    wheelOptions['animation'] = {
        // Must be specified...
        'type'     : 'spinToStop',
        'duration' : 10,

        // These are the defaults, all optional...
        'spins'        : 5,
        'easing'       : 'Power4.easeOut',
        'stopAngle'    : Math.floor(Math.random() * 360),
        'direction'    : 'clockwise',
        'repeat'       : 0,
        'yoyo'         : false,
        'callbackFinished' : null,
        'callbackAfter' : null
    }

    //work out start and end angles for each segment
    let currentDegree = 0
    for (let x = 0; x < (wheelOptions.segments.length); x ++) {
        wheelOptions.segments[x]['startAngle'] = currentDegree
        wheelOptions.segments[x]['endAngle'] = currentDegree + wheelOptions.segments[x]['size']
        currentDegree = currentDegree + wheelOptions.segments[x]['size']
    }


    wheelOptions.getSegmentAtStopAngle = function() {
        let indicatedPrize = 0;
    
        // Now we have the angle of the wheel, but we need to take in to account where the pointer is because
        // will not always be at the 12 o'clock 0 degrees location.
        let relativeAngle = Math.floor(this.animation.stopAngle);

        // Now we can work out the prize won by seeing what prize segment startAngle and endAngle the relativeAngle is between.
        for (let x = 0; x < (this.segments.length); x ++) {

            if ((relativeAngle >= this.segments[x]['startAngle']) && (relativeAngle <= this.segments[x]['endAngle'])) {
                indicatedPrize = x;
                break;
            }
        }

        return this.segments[indicatedPrize]

    }

    return wheelOptions
}
}

module.exports = wheel