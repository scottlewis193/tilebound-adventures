class BasePlayer {
    
    constructor({x,y,colour}) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.visible = true;
    }

    draw() {
        if (this.visible) {
        c.fillStyle = this.colour
        c.arc(this.x,this.y,25*devicePixelRatio,0,Math.PI * 2,false)
        c.fill()
    }
    }
}