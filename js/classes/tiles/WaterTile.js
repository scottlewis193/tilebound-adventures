class WaterTile extends BaseTile {
    constructor(gridPos) {
        super(gridPos),
        this.name = 'WaterTile',
        this.colour = 'aqua',
        this.textureGridPos = {x: 19, y: 4}
    }

}

module.exports = WaterTile
