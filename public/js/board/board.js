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
        [5,WaterTile],
        [6,StartTile]
    ]),

    generateBoard() {

        //set seed sequence
        Math.seedrandom(this.boardSeed);


        //cave tile spawn cap
        let caveTileMax = 2
        let caveTileCount = 0

        //track starttile placement
        let startTilePlaced = false

        for (let gridY = 0; gridY < this.boardSize; gridY++) {
    
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                
                //select random tile
                let typeIndex = Math.floor(Math.random() * this.tileTypes.size)

                //check if all cave tile have spawned, if so use path tile
                if (caveTileCount == caveTileMax && typeIndex == 0) {typeIndex = 2}
                if (typeIndex == 0 && caveTileCount !== caveTileMax) {caveTileCount +=1}

                //check if start tile has spawn, if so use path tile
                if (startTilePlaced && typeIndex == 6) {typeIndex = 2}
                if(typeIndex == 6 && startTilePlaced == false) {startTilePlaced = true}

                //check if it's sand tile and if so, if it's not at the edge of the board, then replace with path tile
                if(typeIndex == 3 && (gridX !== this.boardSize && gridY !== this.boardSize && gridX !== 0 & gridY !== 0)) {typeIndex = 2}

                //create new tile instance
                this.tiles[gridX + ' ' + gridY] = new(this.tileTypes.get(typeIndex))({x: gridX,y: gridY})
            }

        }

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

