const TEXTSIZE = 30

ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'left'
ctx.lineWidth = 1 / BLOCK_SIDE

function straight(a, b) {
  return a.equals(b)
}

function clockwise(cur, next) {
  return next.x - cur.y + next.y + cur.x == 0
}

function slideOrRotate(dir1, dir2, offset, isTail) {
  if (straight(dir1, dir2)) {
    ctx.translate(-offset, 0)
  } else {
    const sign = (clockwise(dir1, dir2)) ? -1 : 1
    ctx.translate(-1/2, -sign / 2)
    ctx.rotate(sign * offset * Math.PI / 2)
    ctx.translate(1/2, sign / 2)
    if (isTail) {
      // because tail does not change
      // direction until the end of the step
      ctx.rotate(-sign * Math.PI / 2)
    }
  }
}

function head(curDir, { nextDir, offset }) {
  ctx.save()
  slideOrRotate(curDir, nextDir, offset, false)

  ctx.beginPath()
  ctx.moveTo(-1/2, -1/2)
  ctx.lineTo(1/4, -1/6)
  ctx.lineTo(1/2, -1/6)
  ctx.lineTo(1/2, 1/6)
  ctx.lineTo(1/4, 1/6)
  ctx.lineTo(-1/2, 1/2)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(1/4, 1/6)
  ctx.lineTo(1/4, -1/6)
  ctx.lineTo(1/2, -1/6)
  ctx.lineTo(1/2, 1/6)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(-1/2, 1/4)
  ctx.lineTo(-1/2, 1/2)
  ctx.lineTo(-5/28, 5/14)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(-1/2, -1/4)
  ctx.lineTo(-1/2, -1/2)
  ctx.lineTo(-5/28, -5/14)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.restore()
}

function tail(curDir, { prevDir, offset }) {
  ctx.save()
  slideOrRotate(prevDir, curDir, offset, true)

  ctx.beginPath()
  ctx.arc(-1/3, -3/10, 1/5,
          Math.PI / 2, Math.PI * 3 / 2)
  ctx.moveTo(-1/3, 1/2)
  ctx.arc(-1/3, 3/10, 1/5,
          Math.PI / 2, Math.PI * 3 / 2)
  ctx.moveTo(1/2, -1/2)
  ctx.lineTo(-1/3, -1/2)
  ctx.moveTo(-1/3, -1/10)
  ctx.lineTo(-1/3, 1/10)
  ctx.moveTo(-1/3, 1/2)
  ctx.lineTo(1/2, 1/2)
  ctx.stroke()

  upperCorner()
  ctx.save()
  ctx.rotate(-Math.PI / 2)
  lowerCorner()
  ctx.restore()

  ctx.restore()
}

function stripe() {
  ctx.beginPath()
  ctx.moveTo(-1/2, -1/2)
  ctx.lineTo(-1/2, -1/4)
  ctx.lineTo(1/4, 1/2)
  ctx.lineTo(1/2, 1/2)
  ctx.lineTo(1/2, 1/4)
  ctx.lineTo(-1/4, -1/2)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

function upperCorner() {
  ctx.beginPath()
  ctx.moveTo(1/4, -1/2)
  ctx.lineTo(1/2, -1/2)
  ctx.lineTo(1/2, -1/4)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

function lowerCorner() {
  ctx.beginPath()
  ctx.moveTo(-1/2, 1/4)
  ctx.lineTo(-1/2, 1/2)
  ctx.lineTo(-1/4, 1/2)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

function backStraight(offset) {
  ctx.beginPath()
  ctx.moveTo(-1/2 - offset, -1/2)
  ctx.lineTo(-1/2, -1/2)
  ctx.moveTo(-1/2 - offset, 1/2)
  ctx.lineTo(-1/2, 1/2)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(-1/2 - offset - 1 / BLOCK_SIDE, -1/2)
  ctx.lineTo(-1/2 - offset - 1 / BLOCK_SIDE, 1/2)
  ctx.lineTo(-1/2 + 1 / BLOCK_SIDE, 1/2)
  ctx.lineTo(-1/2 + 1 / BLOCK_SIDE, -1/2)
  ctx.closePath()
  ctx.clip()
}

function backTurn(curDir, nextDir, offset) {
  const sign = (clockwise(curDir, nextDir)) ? -1 : 1
  ctx.translate(-1, 0)
  ctx.beginPath()
  ctx.moveTo(1/2, sign / 2)
  ctx.arc(1/2, -sign / 2, 1, sign * Math.PI / 2,
          sign * Math.PI * (offset + 1) / 2,
          clockwise(curDir, nextDir))
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(1/2, -sign / 2)
  ctx.arc(1/2, -sign / 2, 1 + 1 / BLOCK_SIDE,
          sign * Math.PI / 2,
          sign * Math.PI * (offset + 1) / 2,
          clockwise(curDir, nextDir))
  ctx.closePath()
  ctx.clip()
}

function back(curDir, nextDir, offset) {
  ctx.save()

  if (straight(curDir, nextDir)) {
    backStraight(offset)
    ctx.translate(-offset, 0)
    stripe()
    upperCorner()
    lowerCorner()
  } else {
    backTurn(curDir, nextDir, offset)
    stripe()
    upperCorner()
    lowerCorner()
  }

  ctx.restore()
}

function frontStraight(offset) {
  ctx.beginPath()
  ctx.moveTo(-1/2, -1/2)
  ctx.lineTo(1/2 - offset, -1/2)
  ctx.moveTo(-1/2, 1/2)
  ctx.lineTo(1/2 - offset, 1/2)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(-1/2 - 1 / BLOCK_SIDE, -1/2)
  ctx.lineTo(1/2 - offset + 1 / BLOCK_SIDE, -1/2)
  ctx.lineTo(1/2 - offset + 1 / BLOCK_SIDE, 1/2)
  ctx.lineTo(-1/2 - 1 / BLOCK_SIDE, 1/2)
  ctx.closePath()
  ctx.clip()
}

function frontTurn(curDir, prevDir, offset) {
  const sign = (clockwise(prevDir, curDir)) ? -1 : 1
  ctx.beginPath()
  ctx.moveTo(-1/2, sign / 2)
  ctx.arc(-1/2, -sign / 2, 1,
          sign * Math.PI / 2, sign * Math.PI * offset / 2,
          !clockwise(prevDir, curDir))
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(-1/2, -sign / 2)
  ctx.arc(-1/2, -sign / 2, 1 + 1 / BLOCK_SIDE,
          sign * Math.PI / 2,
          sign * Math.PI * (offset - 1 / BLOCK_SIDE) / 2,
          !clockwise(prevDir, curDir))
  ctx.closePath()
  ctx.clip()
}

function front(curDir, prevDir, offset) {
  ctx.save()

  if (straight(curDir, prevDir)) {
    frontStraight(offset)
    ctx.translate(-offset, 0)
    stripe()
    upperCorner()
    lowerCorner()
  } else {
    frontTurn(curDir, prevDir, offset)
    slideOrRotate(prevDir, curDir, offset, true)
    stripe()
    upperCorner()
    lowerCorner()
  }

  ctx.restore()
}

function appear(curDir, { prevDir, offset }) {
  if (straight(curDir, prevDir)) {
    frontStraight(offset)
    ctx.translate(-offset, 0)
    stripe()
    upperCorner()
    lowerCorner()
  } else {
    frontTurn(curDir, prevDir, offset)
    stripe()
  }
}

function body(curDir, { prevDir, nextDir, offset }) {
  front(curDir, prevDir, offset)
  back(curDir, nextDir, offset)
}

function food() {
  ctx.beginPath()
  ctx.moveTo(0, -1/2)
  ctx.lineTo(1/2, 0)
  ctx.lineTo(0, 1/2)
  ctx.lineTo(-1/2, 0)
  ctx.closePath()
  ctx.stroke()
}

function printScore(score) {
  ctx.fillText(`Score: ${score}`, W - TEXTSIZE * 6, TEXTSIZE)
}

function printPaused() {
  const oldTextAlign = ctx.textAlign

  ctx.textAlign = 'center'
  ctx.fillText('Paused', W / 2, H / 2)
  ctx.textAlign = oldTextAlign
}

function draw(world, offset) {
  const squares = world.snake.squares

  ctx.clearRect(0, 0, W, H)
  renderShape(head, world.snake.head,
              { nextDir: squares[squares.length - 2].dir,
                offset: offset })
  if (world.snake.justAte) {
    const second = squares.length - 2
    renderShape(appear, squares[second],
                { prevDir: squares[second + 1].dir,
                  nextDir: squares[second - 1].dir,
                  offset: offset })
    for (let i = 1; i < squares.length - 2; i++) {
      renderShape(body, squares[i],
                  { prevDir: squares[i+1].dir,
                    nextDir: squares[i-1].dir,
                    offset: 1 / BLOCK_SIDE })
    }
    renderShape(tail, world.snake.tail,
                { prevDir: squares[1].dir, offset: 1 / BLOCK_SIDE })
  } else {
    for (let i = 1; i < squares.length - 1; i++) {
      renderShape(body, squares[i],
                  { prevDir: squares[i+1].dir,
                    nextDir: squares[i-1].dir,
                    offset: offset })
    }
    renderShape(tail, world.snake.tail,
                { prevDir: squares[1].dir, offset: offset })
  }

  renderShape(food, world.food)
  printScore(world.score)
}

function rotate(dir) {
  if (dir.equals(new Vector(1, 0))) {
    // do not rotate
  } else if (dir.equals(new Vector(0, 1))) {
    ctx.rotate(Math.PI / 2)
  } else if (dir.equals(new Vector(-1, 0))) {
    ctx.rotate(Math.PI)
  } else if (dir.equals(new Vector(0, -1))) {
    ctx.rotate(Math.PI * 3 / 2)
  }
}

function renderShape(shape, square, {
             prevDir = null,
             nextDir = null,
             offset = 0 } = {offset : 0}) {
  const x = (square.loc.x / X_BLOCKS) * W
  const y = (square.loc.y / Y_BLOCKS) * H

  ctx.save()
  ctx.translate(x + BLOCK_SIDE / 2, y + BLOCK_SIDE / 2)
  rotate(square.dir)
  ctx.scale(BLOCK_SIDE, BLOCK_SIDE)
  shape(square.dir, { prevDir, nextDir, offset })
  ctx.restore()
}

function gameOver(score, easterEgg) {
  const oldFillStyle = ctx.fillStyle
  const oldTextAlign = ctx.textAlign

  ctx.textAlign = 'center'
  ctx.fillStyle = 'red'

  ctx.fillText(`score: ${score}`, W / 2, H / 2)
  const msg = easterEgg ? 'Ouroboros!' : 'Game Over!'
  ctx.fillText(msg, W / 2, (H - 2 * TEXTSIZE) / 2)
  ctx.fillText('Press N to restart', W / 2, (H + 2 * TEXTSIZE) / 2)

  ctx.fillStyle = oldFillStyle
  ctx.textAlign = oldTextAlign
}
