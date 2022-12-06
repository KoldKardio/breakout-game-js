export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener('keydown', (event) => {
            // console.log(event.keyCode)
            // 37: left and 39:right
            switch (event.keyCode) {
                case 37:
                    // console.log("move left")
                    paddle.moveLeft()
                    break
                case 39:
                    paddle.moveRight()
                    break
                case 27: // esc key
                    game.togglePause()
                    break
                case 32: // spacebar key
                    game.start()
                    break
            }
        })

        //
        document.addEventListener('keyup', (event) => {
            // console.log(event.keyCode)
            // 37: left and 39:right
            switch (event.keyCode) {
                case 37:
                    if(paddle.speed < 0) paddle.stop()
                    break
                case 39:
                    if(paddle.speed > 0) paddle.stop()
                    break
            }
        })
    }

} //end