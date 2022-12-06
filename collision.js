export function detectCollision(ball, gameObject) {
    // check collision
    let topOfBall = ball.position.y
    let btmOfBall = ball.position.y + ball.size
    //
    let topOfObject = gameObject.position.y
    let btmOfObject = gameObject.position.y + gameObject.height
    let leftSideOfObject = gameObject.position.x
    let rightSideOfObject = gameObject.position.x + gameObject.width
    //
    if (btmOfBall >= topOfObject && 
        topOfBall <= btmOfObject && 
        ball.position.x >= leftSideOfObject && 
        ball.position.x + ball.size <= rightSideOfObject 
    ) {
        return true
    } else {
        return false
    }
    //
}