const requireDir = require('require-dir');
const _items = requireDir('../items',{ recurse: true })
const utils = require('../utils')
var items = {}

//move all item classes to the same level to make it easier to search
organiseItems()


function organiseItems() {
    iterateItemObjProps(_items)
}

function iterateItemObjProps(obj) {
    for (let [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            iterateItemObjProps(value)
        }
        if (utils.isClass(value)) {
            items[key] = value
        }

    }
}



module.exports = items

