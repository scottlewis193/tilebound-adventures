class BaseTile {
    constructor(gridPos) {
        this.name = 'BaseTile',
        this.colour = 'white',
        this.textureGridPos = {x: 56, y: 23}, //blank,
        this.textureSize = {w: 16, h: 16},
        this.gridPos = gridPos
    }

}

module.exports = BaseTile

