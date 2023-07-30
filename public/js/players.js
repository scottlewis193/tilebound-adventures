var players = {

//To store player data on the front end
frontEndPlayers: {},


drawAllPlayers() {

    for (const id in this.frontEndPlayers) {
        const player = this.frontEndPlayers[id]
        player.draw()
    }


}

}