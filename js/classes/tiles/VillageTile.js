class VillageTile extends BaseTile {
    constructor(gridPos) {
        super(gridPos),
        this.name = 'VillageTile',
        this.colour = 'red',
        this.textureGridPos = {x: 35, y: 8}
    }
}

module.exports = VillageTile

