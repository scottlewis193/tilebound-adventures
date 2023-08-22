const requireDir = require('require-dir');
const _abilities = requireDir('../abilities',{ recurse: true })
const utils = require('../utils')



var abilities = {}

//move all item classes to the same level to make it easier to search
organiseAbilities()


function organiseAbilities() {
    iterateAbilityObjProps(_abilities)
}

function iterateAbilityObjProps(obj) {
    for (let [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            iterateAbilityObjProps(value)
        }
        if (utils.isClass(value)) {
            abilities[key] = value
        }

    }
}



module.exports = abilities