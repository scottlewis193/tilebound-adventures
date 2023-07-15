//canvas & context
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//short hand devicePixelRatio
const devicePixelRatio = window.devicePixelRatio || 1

//set canvas res correctly
canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

let gameLoopPaused = false



