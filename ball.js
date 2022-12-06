import { detectCollision } from "./collision.js"

//
export default class Ball {
    constructor(game) {
        this.image = document.getElementById("img_ball")
        //
        this.gameW = game.gameWidth
        this.gameH = game.gameHeight
        //
        this.game = game
        //
        this.size = 16
        //
        this.reset()
    }
    
    reset() {
        this.position = {x: 10, y: 400}
        this.speed = {x: 4, y: -2}
    }

    draw(ctx){
        ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.size, this.size) // src,x,y,width,height
    }//

    update(deltaTime) {
        //
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        
        // wall on top || bottom
        if (this.position.x + this.size > this.gameW || this.position.x < 0) {
            this.speed.x = -this.speed.x
        }
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y
        }

        // bottom of game
        if (this.position.y + this.size > this.gameH) {
            this.game.lives--
            this.reset()
        }

        // check collision with paddle
        // let btmOfBall = this.position.y + this.size
        // let topOfPaddle = this.game.paddle.position.y
        // let leftSideOfPaddle = this.game.paddle.position.x
        // let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width
        //
        // if (btmOfBall >= topOfPaddle 
        //     && this.position.x >= leftSideOfPaddle
        //     && this.position.x + this.size <= rightSideOfPaddle ) {
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y
            this.position.y = this.game.paddle.position.y - this.size
        }
        //
    }
} //-