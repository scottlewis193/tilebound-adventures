
var board = {
    
    //updated by backend
    boardSeed: null,
    boardSize: null,
    tileSize: null,
    startPos: {},
    _tiles: {},
    tiles: {},
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
                    this.tiles[gridX + ' ' + gridY + ' ' + gridZ] = new Tile({backEndTile: this.tiles[gridX + ' ' + gridY + ' ' + gridZ]})
                }
       
                //new DynamicClass(this.tiles[gridX + ' ' + gridY].name,this.tiles[gridX + ' ' + gridY].gridPos)
                }
            }
        }
    },

    
 
    drawBoard() {
        if (this.boardChanged) {
            bgCanvas.width = bgCanvas.width //fix weird clearing bug
            bgC.clearRect(0, 0, bgCanvas.width, bgCanvas.height)

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
        const CANVAS_WIDTH = parseInt(bgCanvas.width)//.replace('px',''))
        const HEIGHT_MOD = oddOrEven(parseInt(bgCanvas.height)) == 'odd' ? 1 : 0
        const CANVAS_HEIGHT = parseInt(bgCanvas.height) + HEIGHT_MOD - (this.tileSize*2)
        this.tileSize = Math.floor(CANVAS_HEIGHT / (this.boardSize))

        this.boardPos = {x: (CANVAS_WIDTH / 2) - (this.tileSize*(this.boardSize/2)), 
                         y: (CANVAS_HEIGHT / 2) - (this.tileSize*(this.boardSize/2) - this.tileSize)}
                         this.boardChanged = true
        console.log('Tile Size: ' + this.tileSize)
    }


}


