

 var board = { 

    boardSeed: Math.floor(Math.random() * 100000000000), //generated by the backend to ensure all clients are using the same seed
    boardSize: 20,
    tileSize: 50,
    startPos: {},
    tiles: {},

    generateBoard() {

        //set seed sequence
        seedrandom(this.boardSeed);
    
        let newX = 0
        let newY = 0

        const gridZ = 1
    
        //base tile pass
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                this.tiles[gridX + ' ' + gridY + ' ' + gridZ] = {name: 'BaseTile', gridPos: {x: gridX,y: gridY}}
            }
        }

    
        //path tile pass

        //randomise path tile edge start position
        let pathStartInt = Math.floor(Math.random() * 2)
        let pathX = 1
        let pathY = 1

        if (pathStartInt == 0) {pathY == Math.floor(Math.random() * board.boardSize)}
        if (pathStartInt == 1) {pathX == Math.floor(Math.random() * board.boardSize)}

        //initial path tile
        this.tiles[pathX + ' ' + pathY + ' ' + gridZ] = {name: 'PathTile', gridPos: {x: pathX,y: pathY}};

        if (pathStartInt == 0) {pathX += 1}
        if (pathStartInt == 1) {pathY += 1}
      
        //second path tile
        this.tiles[pathX + ' ' + pathY + ' ' + gridZ] = {name: 'PathTile', gridPos: {x: pathX,y: pathY}};

        //create path by randomly incrementing x and y and placing tile until we reach board edge
        do {
            let pathInt = Math.floor(Math.random() * 2);

            if (pathInt == 0) {pathX += 1} else {pathY += 1}
            this.tiles[pathX + ' ' + pathY + ' ' + gridZ] = {name: 'PathTile', gridPos: {x: pathX,y: pathY}};

        } while (pathX !== 1 && pathY !== 1 && pathX !== board.boardSize - 2 && pathY !== board.boardSize - 2);

        this.tiles[pathX + ' ' + pathY + ' ' + gridZ] = {name: 'PathTile', gridPos: {x: pathX, y: pathY}};

        // for (let gridY = 0; gridY < this.boardSize; gridY++) {
        //     for (let gridX = 0; gridX < this.boardSize; gridX++) {
        //         this.tiles[gridX + ' ' + gridY] = {name: 'PathTile', gridPos: {x: gridX,y: gridY}}
        //     }
        // }
    
    
    
        //forest tile pass
        for (let gridY = 2; gridY < this.boardSize - 2; gridY++) {
            for (let gridX = 2; gridX < this.boardSize - 2; gridX++) {
                if (Math.floor(Math.random() * 4) == 1) {
                    if (this.tiles[gridX + ' ' + gridY + ' ' + gridZ].name !== 'PathTile') {
                        this.tiles[gridX + ' ' + gridY + ' ' + gridZ] = {name: 'ForestTile', gridPos: {x: gridX,y:gridY}}
                    }
                }
            }
        }
    
        //village tile pass
        newX = Math.floor(Math.random() * this.boardSize)
        newY = Math.floor(Math.random() * this.boardSize)
        this.tiles[newX + ' ' + newY + ' ' + gridZ] = {name:'VillageTile', gridPos: {x: newX, y: newY}}
    
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                if (board.hasSameTileTypeNeighbour(this.tiles[gridX + ' ' + gridY + ' ' + gridZ],'VillageTile')) {
                    if (Math.floor(Math.random() * 3) == 1) {
                        this.tiles[gridX + ' ' + gridY + ' ' + gridZ] = {name: 'VillageTile', gridPos: {x: gridX, y: gridY}}
                    }
                }
            }
        }

    
        //cave tile pass
        let caveTileMax = 2
        for(let i = 0; i < caveTileMax; i++) {
 
            do {
                newX = Math.floor(Math.random() * this.boardSize)
                newY = Math.floor(Math.random() * this.boardSize)
            } while(this.tiles[newX + ' ' + newY + ' ' + gridZ].name == 'VillageTile')
    
            this.tiles[newX + ' ' + newY + ' ' + gridZ] = {name: 'CaveTile', gridPos: {x: newX, y: newY}}
    
        }
    
        
    
    
        // //sand tile pass
        // for (let gridY = 0; gridY < this.boardSize; gridY++) {
        //     if (Math.floor(Math.random() * 3) == 1) {
        //     if (this.tiles[0 + ' ' + gridY].name !== 'VillageTile' &&
        //         this.tiles[0 + ' ' + gridY].name !== 'CaveTile') {
        //             this.tiles[0 + ' ' + gridY] = {name: 'SandTile', gridPos: { x: 0, y: gridY}}
        //         }
        //     }
        // }
        // for (let gridX = 0; gridX < this.boardSize; gridX++) {
        //     if (Math.floor(Math.random() * 3) == 1) {
        //     if (this.tiles[gridX + ' ' + 0].name !== 'VillageTile' &&
        //         this.tiles[gridX + ' ' + 0].name !== 'CaveTile') {
        //             this.tiles[gridX + ' ' + 0] = {name: 'SandTile', gridPos: { x: gridX, y: 0}}
        //         }
        //     }
        // }
        // for (let gridY = 0; gridY < this.boardSize; gridY++) {
        //     if (Math.floor(Math.random() * 3) == 1) {
        //     if (this.tiles[(this.boardSize-1) + ' ' + gridY].name !== 'VillageTile' &&
        //         this.tiles[(this.boardSize-1) + ' ' + gridY].name !== 'CaveTile') {
        //             this.tiles[(this.boardSize-1) + ' ' + gridY] = {name: 'SandTile', gridPos: {x: (this.boardSize-1),y: gridY}}
        //         }
        //     }
        // }
        // for (let gridX = 0; gridX < this.boardSize; gridX++) {
        //     if (Math.floor(Math.random() * 3) == 1) {
        //     if (this.tiles[gridX + ' ' + (this.boardSize-1)].name !== 'VillageTile' &&
        //         this.tiles[gridX + ' ' + (this.boardSize-1)].name !== 'CaveTile') {
        //             this.tiles[gridX + ' ' + (this.boardSize-1)] = {name: 'SandTile', gridPos: { x: gridX,y: (this.boardSize-1)}}
        //         }
        //     }
        // }
    
    
        //start tile pass
    
            do {
                newX = Math.floor(Math.random() * this.boardSize)
                newY = Math.floor(Math.random() * this.boardSize)
            } while(this.tiles[newX + ' ' + newY + ' ' + gridZ].name !== 'PathTile')
            
            this.tiles[newX + ' ' + newY + ' ' + gridZ] = {name: 'StartTile', gridPos: {x: newX,y: newY}}        
            this.startPos = {x: newX, y: newY}
    
    


    },

    hasSameTileTypeNeighbour(tileObj, tileTypeName) {

        if (typeof board.tiles[(tileObj.gridPos.x - 1) + ' ' + tileObj.gridPos.y + ' ' + 2] !== 'undefined') { if (board.tiles[(tileObj.gridPos.x - 1) + ' ' + tileObj.gridPos.y + ' ' + 2].name == tileTypeName) {return true; }}
        if (typeof board.tiles[tileObj.gridPos.x + ' ' + (tileObj.gridPos.y - 1) + ' ' + 2] !== 'undefined') { if (board.tiles[tileObj.gridPos.x + ' ' + (tileObj.gridPos.y - 1) + ' ' + 2].name == tileTypeName) {return true; }}
        if (typeof board.tiles[(tileObj.gridPos.x + 1) + ' ' + tileObj.gridPos.y + ' ' + 2] !== 'undefined') { if (board.tiles[(tileObj.gridPos.x + 1) + ' ' + tileObj.gridPos.y + ' ' + 2].name == tileTypeName) {return true; }}
        if (typeof board.tiles[tileObj.gridPos.x + ' ' + (tileObj.gridPos.y + 1) + ' ' + 2] !== 'undefined') { if (board.tiles[tileObj.gridPos.x + ' ' + (tileObj.gridPos.y + 1) + ' ' + 2].name == tileTypeName) {return true; }}
        
         return false
     }
 }

module.exports = board

