
var board = {
    
    //updated by backend
    boardSeed: null,
    boardSize: null,
    tileSize: null,
    startPos: {},
    _tiles: {},
    tiles: {},
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
                this.tiles[gridX + ' ' + gridY] = new (eval(this.tiles[gridX + ' ' + gridY].name))(this.tiles[gridX + ' ' + gridY].gridPos)
                //new DynamicClass(this.tiles[gridX + ' ' + gridY].name,this.tiles[gridX + ' ' + gridY].gridPos)
            }
        }
    },
 
    drawBoard() {
        if (this.boardChanged) {
            bgCanvas.width = bgCanvas.width //fix weird clearing bug
            bgC.clearRect(0, 0, bgCanvas.width, bgCanvas.height)

            //BOTTOM LAYER - ALL GRASS
            for (let gridY = 0; gridY < this.boardSize; gridY++) {
                for (let gridX = 0; gridX < this.boardSize; gridX++) {
                    let tile = new GrassTile({x: gridX,y: gridY})
                    tile.draw()
                }
            }

            // //GRASS
            // for (let gridY = 2; gridY < this.boardSize - 2; gridY++) {
            //     for (let gridX = 2; gridX < this.boardSize -2; gridX++) {
            //         let tile = new GrassTile({x: gridX,y: gridY})
            //         tile.draw()
            //     }
            // }


            for (let gridY = 0; gridY < this.boardSize; gridY++) {
                for (let gridX = 0; gridX < this.boardSize; gridX++) {
                    this.tiles[gridX + ' ' + gridY].draw()             
                }
            }

            // //PATH GRASS COVERING
            // for (let gridY = 1; gridY < this.boardSize - 1; gridY++) {
            //     for (let gridX = 1; gridX < this.boardSize -1; gridX++) {
            //         if (board.tiles[gridX + ' ' + gridY].name == 'PathTile') {
            //         let tile = new GrassCoveringTile({x: gridX,y: gridY})
            //         tile.draw()
            //     }
            //     }
            // }
            

            this.boardChanged = false
        }
    },


    updateBoardPos() {

        // bgCanvas.style.width = bgRect.width + 'px'
        // bgCanvas.style.height = bgRect.height + 'px'
        // fgCanvas.style.width = fgRect.width + 'px'
        // fgCanvas.style.height = fgRect.height + 'px'
        const CANVAS_WIDTH = parseInt(bgCanvas.width)//.replace('px',''))
        const HEIGHT_MOD = oddOrEven(parseInt(bgCanvas.height)) == 'odd' ? 1 : 0
        const CANVAS_HEIGHT = parseInt(bgCanvas.height) + HEIGHT_MOD
        this.tileSize = Math.floor(CANVAS_HEIGHT / (this.boardSize))

        this.boardPos = {x: (CANVAS_WIDTH / 2) - (this.tileSize*(this.boardSize/2)), 
                         y: (CANVAS_HEIGHT / 2) - (this.tileSize*(this.boardSize/2))}
                         this.boardChanged = true
        console.log('Tile Size: ' + this.tileSize)
    }


}


