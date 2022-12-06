import Game from "./game.js"

// ----------- timestamp 1.06.16 ------------ //

// init canvas and context
let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext("2d")

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

// game object
let game = new Game(GAME_WIDTH, GAME_HEIGHT)
// game.start()
// Clear screen
// ctx.clearRect(0, 0, 800, 600)

// polygon - square and rect
// ctx.fillStyle = '#f00' // color rect default "var"
// ctx.fillRect(20, 20, 100, 100) // (x, y, width, height)
// ctx.fillStyle = '#00f' // color is updated
// ctx.fillRect(200, 200, 50, 50)

// // Paddle 
// let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT)
// // paddle.draw(ctx)
// // Ball
// let ball = new Ball(GAME_WIDTH, GAME_HEIGHT)

// // InputHandler
// new InputHandler(paddle)

// game loop
let lastTime = 0

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime
    lastTime = timestamp
    //
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    
    game.update(deltaTime)
    game.draw(ctx)
    
    // old before refractor - time 35:25
    // paddle.update(deltaTime)
    // paddle.draw(ctx)
    // //
    // ball.update(deltaTime)
    // ball.draw(ctx)
    // loop request...
    requestAnimationFrame(gameLoop)
}

// console.log(canvas)
// gameLoop()
requestAnimationFrame(gameLoop) // using to avoid pass deltime