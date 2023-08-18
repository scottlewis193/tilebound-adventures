class CaveTile extends BaseTile {
    constructor(gridPos) {
        super(gridPos),
        this.name = 'CaveTile',
        this.colour = 'slategray',
        this.textureGridPos = {x: 7, y: 12}
    }
}

module.exports = CaveTile