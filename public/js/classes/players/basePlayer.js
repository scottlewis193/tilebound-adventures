class basePlayer {
    constructor(x,y,colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
    }

    draw() {
        c.fillStyle = this.colour
        c.fillRect(this.x,this.y,50*window.devicePixelRatio,50*window.devicePixelRatio)
    }
}