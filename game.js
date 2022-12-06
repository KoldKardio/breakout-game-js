import Paddle from "./paddle.js"
import InputHandler from "./input.js"
import Ball from "./ball.js"
import Brick from "./brick.js"

import { buildLevel, level1, level2 } from "./level.js"

//
const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        //
        this.gamestate = GAMESTATE.MENU
        //
        this.ball = new Ball(this)
        this.paddle = new Paddle(this)
        //
        this.gameObjects = []
        // this.brick just instancing... does nothing
        this.brick = new Brick
        //
        this.bricks = []
        // lives- gameOver screen
        this.lives = 3
        // levels
        this.levels = [level1, level2]
        this.currentLevel = 0

        // InputHandler
        new InputHandler(this.paddle, this)
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL ) return
        // brick
        // let brick = new Brick(this, {x: 20, y: 20}) //- single
        // let bricks = []
        // this.bricks = buildLevel(this, level1)
        this.bricks = buildLevel(this, this.levels[this.currentLevel])
        // for (let i=0; i<10; i++) {
            //     bricks.push(new Brick(this, {x: i* 52, y: 30}))
            // }    
        // ball reset
        this.ball.reset()
        //obj - use "..." spread operator for arrays
        // this.gameObjects = [this.ball, this.paddle, ...bricks]
        this.gameObjects = [this.ball, this.paddle] // change made in 1.10.50
        //
        this.gamestate = GAMESTATE.RUNNING
    }

    update(deltaTime) {
        //
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER
        //
        if (this.gamestate === GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ) return
        // this.paddle.update(deltaTime)
        // this.ball.update(deltaTime)
        
        //Level manager
        if (this.bricks.length === 0) {
            // console.log("Load new level")
            this.currentLevel++
            this.gamestate = GAMESTATE.NEWLEVEL
            this.start()
        }
        
        //this.gameObjects
        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime))
        //
        this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion)
        //
    }
    
    draw(ctx) {
        // this.paddle.draw(ctx)
        // this.ball.draw(ctx)
        //
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx))    
        // Pause screen
        if ( this.gamestate == GAMESTATE.PAUSED ){
            ctx.rect(0,0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fill()

            // text screen
            ctx.font = "30px Arial"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2)
        }
        // Menu screen
        if ( this.gamestate == GAMESTATE.MENU ){
            ctx.rect(0,0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,1)"
            ctx.fill()

            // text screen
            ctx.font = "30px Arial"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("Press Spacebar To Start", 
            this.gameWidth / 2, this.gameHeight / 2 )
        }
        // gameOver screen
        if ( this.gamestate == GAMESTATE.GAMEOVER ){
            ctx.rect(0,0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,1)"
            ctx.fill()

            // text screen
            ctx.font = "30px Arial"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("GAME OVER", 
            this.gameWidth / 2, this.gameHeight / 2 )
        }
    }

    togglePause() {
        //Pause Screen
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING
        } else {
            this.gamestate = GAMESTATE.PAUSED
            // console.log("Game is Paused!")
        }
    }
    //
}//-