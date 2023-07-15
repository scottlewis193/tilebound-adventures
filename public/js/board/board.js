var board = {
    boardSeed: Math.floor(Math.random() * 100000000000),
    boardSize: 10,
    tileSize: 50 * devicePixelRatio,
    boardPos: {},
    tiles: {},
    tileTypes: new Map([
        [0,CaveTile],
        [1,ForestTile],
        [2,PathTile],
        [3,SandTile],
        [4,VillageTile],
        [5,StartTile]
    ]),

    generateBoard() {

        //set seed sequence
        Math.seedrandom(this.boardSeed);

        let newX = 0
        let newY = 0


        //path tile pass
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                this.tiles[gridX + ' ' + gridY] = new PathTile({x: gridX,y:gridY})
            }
        }

        //forest tile pass
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                if (Math.floor(Math.random() * 4) == 1) {
                    this.tiles[gridX + ' ' + gridY] = new ForestTile({x: gridX,y:gridY})
                }
            }
        }

        //village tile pass
        newX = Math.floor(Math.random() * this.boardSize)
        newY = Math.floor(Math.random() * this.boardSize)
        this.tiles[newX + ' ' + newY] = new VillageTile({x: newX, y: newY})

        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                if (this.tiles[gridX + ' ' + gridY].hasSameTileTypeNeighbour('VillageTile')) {
                    if (Math.floor(Math.random() * 3) == 1) {
                        this.tiles[gridX + ' ' + gridY] = new VillageTile({x: gridX, y: gridY})
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
            } while(this.tiles[newX + ' ' + newY].name == 'VillageTile')

            this.tiles[newX + ' ' + newY] = new CaveTile({x: newX,y: newY})

        }

        //sand tile pass
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            if (Math.floor(Math.random() * 3) == 1) {
            if (this.tiles[0 + ' ' + gridY].name !== 'VillageTile' &&
                this.tiles[0 + ' ' + gridY].name !== 'CaveTile') {
                    this.tiles[0 + ' ' + gridY] = new SandTile({x: 0,y: gridY})
                }
            }
        }
        for (let gridX = 0; gridX < this.boardSize; gridX++) {
            if (Math.floor(Math.random() * 3) == 1) {
            if (this.tiles[gridX + ' ' + 0].name !== 'VillageTile' &&
                this.tiles[gridX + ' ' + 0].name !== 'CaveTile') {
                    this.tiles[gridX + ' ' + 0] = new SandTile({x: gridX,y: 0})
                }
            }
        }
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            if (Math.floor(Math.random() * 3) == 1) {
            if (this.tiles[(this.boardSize-1) + ' ' + gridY].name !== 'VillageTile' &&
                this.tiles[(this.boardSize-1) + ' ' + gridY].name !== 'CaveTile') {
                    this.tiles[(this.boardSize-1) + ' ' + gridY] = new SandTile({x: (this.boardSize-1),y: gridY})
                }
            }
        }
        for (let gridX = 0; gridX < this.boardSize; gridX++) {
            if (Math.floor(Math.random() * 3) == 1) {
            if (this.tiles[gridX + ' ' + (this.boardSize-1)].name !== 'VillageTile' &&
                this.tiles[gridX + ' ' + (this.boardSize-1)].name !== 'CaveTile') {
                    this.tiles[gridX + ' ' + (this.boardSize-1)] = new SandTile({x: gridX,y: (this.boardSize-1)})
                }
            }
        }


        //start tile pass

            do {
                newX = Math.floor(Math.random() * this.boardSize)
                newY = Math.floor(Math.random() * this.boardSize)
            } while(this.tiles[newX + ' ' + newY].name == 'VillageTile' || 
                    this.tiles[newX + ' ' + newY].name == 'CaveTile')
            
            this.tiles[newX + ' ' + newY] = new StartTile({x: newX,y: newY})        


        

    },

    drawBoard() {

        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                this.tiles[gridX + ' ' + gridY].draw()             
            }

        }

    },

    updateBoardPos() {
        this.boardPos = {x: (canvas.width / 2) - (this.tileSize*(this.boardSize/2)), 
                         y: (canvas.height / 2) - (this.tileSize*(this.boardSize/2))}
    }


}

board.updateBoardPos()

