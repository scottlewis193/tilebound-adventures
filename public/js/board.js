
var board = {
    
    //updated by backend
    boardSeed: null,
    boardSize: null,
    tileSize: null,
    startPos: {},
    _tiles: {},
    tiles: {},
    visualTilesGenerated: false,
    textureSize : {w: 16, h: 16},
    // get tiles() {
    //     return _tiles
    // },
    // set tiles(value) {
    //     _tiles = value
    //     this.boardChanged = true
    // },
    boardChanged: true,

    //updated by frontend when user resizes window
    boardPos: {},
    
    convertBoard() {
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                for (let gridZ = 0; gridZ < this.boardSize; gridZ++) {
                
                if (this.tiles[gridX + ' ' + gridY + ' ' + gridZ]) {
                    this.tiles[gridX + ' ' + gridY + ' ' + gridZ] = new (eval(this.tiles[gridX + ' ' + gridY + ' ' + gridZ].name))(this.tiles[gridX + ' ' + gridY + ' ' + gridZ].gridPos)
                }
       
                //new DynamicClass(this.tiles[gridX + ' ' + gridY].name,this.tiles[gridX + ' ' + gridY].gridPos)
                }
            }
        }
    },

    generateVisualTiles() {
        if (this.visualTilesGenerated == false) {
       
            //BOTTOM LAYER - ALL GRASS
        for (let gridY = 0; gridY < this.boardSize; gridY++) {
            for (let gridX = 0; gridX < this.boardSize; gridX++) {
                this.tiles[gridX + ' ' + gridY + ' ' + 0] = new GrassTile({x: gridX,y: gridY})
            }
        }

        //PATH GRASS COVERING
            for (let gridY = 0; gridY < this.boardSize - 1; gridY++) {
                for (let gridX = 0; gridX < this.boardSize - 1; gridX++) {

                    const CENTER_TILE_NAME = board.tiles[gridX + ' ' + gridY + ' ' + 1]?.name
                    const LEFT_TILE_NAME = board.tiles[(gridX - 1) + ' ' + gridY + ' ' + 1]?.name
                    const RIGHT_TILE_NAME = board.tiles[(gridX + 1) + ' ' + gridY + ' ' + 1]?.name
                    const UP_TILE_NAME = board.tiles[gridX + ' ' + (gridY - 1) + ' ' + 1]?.name
                    const DOWN_TILE_NAME = board.tiles[gridX + ' ' + (gridY + 1) + ' ' + 1]?.name
                    const UPLEFT_TILE_NAME = board.tiles[(gridX - 1) + ' ' + (gridY - 1) + ' ' + 1]?.name
                    const UPRIGHT_TILE_NAME = board.tiles[(gridX + 1) + ' ' + (gridY - 1) + ' ' + 1]?.name
                    const DOWNLEFT_TILE_NAME = board.tiles[(gridX - 1) + ' ' + (gridY + 1) + ' ' + 1]?.name
                    const DOWNRIGHT_TILE_NAME = board.tiles[(gridX + 1) + ' ' + (gridY + 1) + ' ' + 1]?.name

                    if (CENTER_TILE_NAME == 'PathTile') {

                    // vertical
                    if ((gridY == 0 || UP_TILE_NAME == 'PathTile' || DOWN_TILE_NAME == 'PathTile' )) {
                       if(RIGHT_TILE_NAME !== 'PathTile') {this.tiles[(gridX+1) + ' ' + gridY + ' ' + 2] = new GrassCoveringTile({x: (gridX+1),y: gridY},'VR')}
                       if(LEFT_TILE_NAME !== 'PathTile') {this.tiles[(gridX-1) + ' ' + gridY + ' ' + 2] = new GrassCoveringTile({x: (gridX-1),y: gridY},'VL')}
                    }

                    // horizontal
                    if ((gridX == 0 ||  LEFT_TILE_NAME == 'PathTile' || RIGHT_TILE_NAME == 'PathTile')) {
                    
                        if(DOWN_TILE_NAME !== 'PathTile') {this.tiles[gridX + ' ' + (gridY+1) + ' ' + 2] = new GrassCoveringTile({x: gridX,y: (gridY+1)},'HD')}
                        if(UP_TILE_NAME !== 'PathTile') {this.tiles[gridX + ' ' + (gridY-1) + ' ' + 2] = new GrassCoveringTile({x: gridX,y: (gridY-1)},'HU')}
        
                    }


                    //vertical down right
                    if ((DOWN_TILE_NAME == 'PathTile') && (LEFT_TILE_NAME == 'PathTile')   ) {
                        this.tiles[(gridX-1) + ' ' + (gridY+1) + ' ' + 3] = new GrassCoveringTile({x: (gridX-1),y: (gridY+1)},'VDR')
                    }

                    //outer
                    if ((UP_TILE_NAME == 'PathTile') && (RIGHT_TILE_NAME == 'PathTile')) {
                        this.tiles[(gridX-1) + ' ' + (gridY+1) + ' ' + 3] = new GrassCoveringTile({x: (gridX-1),y: (gridY+1)},'VDRO')
                    }
                    //-----------------------------------


                    //

                    //vertical up Left
                    if ((UP_TILE_NAME == 'PathTile') && (RIGHT_TILE_NAME == 'PathTile')  ) {
                        this.tiles[(gridX+1) + ' ' + (gridY-1) + ' ' + 3] = new GrassCoveringTile({x: (gridX+1),y: (gridY-1)},'VUL')
                    }

                    if ((DOWN_TILE_NAME == 'PathTile') && (LEFT_TILE_NAME == 'PathTile')  ) {
                        this.tiles[(gridX+1) + ' ' + (gridY-1) + ' ' + 3] = new GrassCoveringTile({x: (gridX+1),y: (gridY-1)},'VULO')
                    }

                    
                }
            }
        }
    }
},
 
    drawBoard() {
        if (this.boardChanged) {
            bgCanvas.width = bgCanvas.width //fix weird clearing bug
            bgC.clearRect(0, 0, bgCanvas.width, bgCanvas.height)




    

            // //GRASS
            // for (let gridY = 2; gridY < this.boardSize - 2; gridY++) {
            //     for (let gridX = 2; gridX < this.boardSize -2; gridX++) {
            //         let tile = new GrassTile({x: gridX,y: gridY})
            //         tile.draw()
            //     }
            // }


            for (let gridY = 0; gridY < this.boardSize; gridY++) {
                for (let gridX = 0; gridX < this.boardSize; gridX++) {
                    for (let gridZ = 0; gridZ < this.boardSize; gridZ++) {
                        this.tiles[gridX + ' ' + gridY + ' ' + gridZ]?.draw() 
                    }        
                }
            }

    
            

            this.boardChanged = false
        }
    },


    updateBoardPos() {

        // bgCanvas.style.width = bgRect.width + 'px'
        // bgCanvas.style.height = bgRect.height + 'px'
        // fgCanvas.style.width = fgRect.width + 'px'
        // fgCanvas.style.height = fgRect.height + 'px'
        const CANVAS_WIDTH = parseInt(bgCanvas.width) - 100//.replace('px',''))
        const HEIGHT_MOD = oddOrEven(parseInt(bgCanvas.height)) == 'odd' ? 1 : 0
        const CANVAS_HEIGHT = parseInt(bgCanvas.height) + HEIGHT_MOD - 100
        this.tileSize = Math.floor(CANVAS_HEIGHT / (this.boardSize))

        this.boardPos = {x: (CANVAS_WIDTH / 2) - (this.tileSize*(this.boardSize/2) - 50), 
                         y: (CANVAS_HEIGHT / 2) - (this.tileSize*(this.boardSize/2) - 50)}
                         this.boardChanged = true
        console.log('Tile Size: ' + this.tileSize)
    }


}


