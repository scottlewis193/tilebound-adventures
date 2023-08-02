var monsters = { 
    frontEndMonsters: {},

    drawAllMonsters() {

        for (const id in this.frontEndMonsters) {
            const monster = this.frontEndMonsters[id]
            monster.draw()
        }
    },

    getLastSpawned() {
       return monsters.frontEndMonsters[getPropByIndex(monsters.frontEndMonsters,getObjPropCount(monsters.frontEndMonsters) - 1)]
    }

}