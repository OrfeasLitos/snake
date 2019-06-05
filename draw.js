const TEXTSIZE = 30

ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'left'
ctx.lineWidth = 1 / BLOCK_SIDE

class SnakeView {
  constructor(snake, mode) {
    this.snake = snake
    this.mode = mode // TODO: use for galaxy/epilepsy
  }

  straight(a, b) {
    return a.equals(b)
  }

  clockwise(cur, next) {
    return next.x - cur.y + next.y + cur.x == 0
  }

  slideOrRotate(dir1, dir2, offset, isTail) {
    if (this.straight(dir1, dir2)) {
      ctx.translate(-offset, 0)
    } else {
      const sign = (this.clockwise(dir1, dir2)) ? -1 : 1
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

  head(curDir, { nextDir, offset }) {
    ctx.save()
    this.slideOrRotate(curDir, nextDir, offset, false)

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

  tail(curDir, { prevDir, offset }) {
    ctx.save()
    this.slideOrRotate(prevDir, curDir, offset, true)

    ctx.beginPath()
    ctx.arc(-1/3, -3/10, 1/5,
            Math.PI / 2, Math.PI * 3 / 2)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(-1/3, 1/2)
    ctx.arc(-1/3, 3/10, 1/5,
            Math.PI / 2, Math.PI * 3 / 2)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(1/2, -1/2)
    ctx.lineTo(-1/3, -1/2)
    ctx.moveTo(-1/3, -1/10)
    ctx.lineTo(-1/3, 1/10)
    ctx.moveTo(-1/3, 1/2)
    ctx.lineTo(1/2, 1/2)
    ctx.stroke()

    this.upperCorner()
    ctx.save()
    ctx.rotate(-Math.PI / 2)
    this.lowerCorner()
    ctx.restore()

    ctx.restore()
  }

  stripe() {
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

  upperCorner() {
    ctx.beginPath()
    ctx.moveTo(1/4, -1/2)
    ctx.lineTo(1/2, -1/2)
    ctx.lineTo(1/2, -1/4)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }

  lowerCorner() {
    ctx.beginPath()
    ctx.moveTo(-1/2, 1/4)
    ctx.lineTo(-1/2, 1/2)
    ctx.lineTo(-1/4, 1/2)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }

  backStraight(offset) {
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

  backTurn(curDir, nextDir, offset) {
    const sign = (this.clockwise(curDir, nextDir)) ? -1 : 1
    ctx.translate(-1, 0)
    ctx.beginPath()
    ctx.moveTo(1/2, sign / 2)
    ctx.arc(1/2, -sign / 2, 1, sign * Math.PI / 2,
            sign * Math.PI * (offset + 1) / 2,
            this.clockwise(curDir, nextDir))
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(1/2, -sign / 2)
    ctx.arc(1/2, -sign / 2, 1 + 1 / BLOCK_SIDE,
            sign * Math.PI / 2,
            sign * Math.PI * (offset + 1) / 2,
            this.clockwise(curDir, nextDir))
    ctx.closePath()
    ctx.clip()
  }

  back(curDir, nextDir, offset) {
    ctx.save()

    if (this.straight(curDir, nextDir)) {
      this.backStraight(offset)
      ctx.translate(-offset, 0)
      this.stripe()
      this.upperCorner()
      this.lowerCorner()
    } else {
      this.backTurn(curDir, nextDir, offset)
      this.stripe()
      this.upperCorner()
      this.lowerCorner()
    }

    ctx.restore()
  }

  frontStraight(offset) {
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

  frontTurn(curDir, prevDir, offset) {
    const sign = (this.clockwise(prevDir, curDir)) ? -1 : 1
    ctx.beginPath()
    ctx.moveTo(-1/2, sign / 2)
    ctx.arc(-1/2, -sign / 2, 1,
            sign * Math.PI / 2, sign * Math.PI * offset / 2,
            !this.clockwise(prevDir, curDir))
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(-1/2, -sign / 2)
    ctx.arc(-1/2, -sign / 2, 1 + 1 / BLOCK_SIDE,
            sign * Math.PI / 2,
            sign * Math.PI * (offset - 1 / BLOCK_SIDE) / 2,
            !this.clockwise(prevDir, curDir))
    ctx.closePath()
    ctx.clip()
  }

  front(curDir, prevDir, offset) {
    ctx.save()

    if (this.straight(curDir, prevDir)) {
      this.frontStraight(offset)
      ctx.translate(-offset, 0)
      this.stripe()
      this.upperCorner()
      this.lowerCorner()
    } else {
      this.frontTurn(curDir, prevDir, offset)
      this.slideOrRotate(prevDir, curDir, offset, true)
      this.stripe()
      this.upperCorner()
      this.lowerCorner()
    }

    ctx.restore()
  }

  appear(curDir, { prevDir, offset }) {
    if (this.straight(curDir, prevDir)) {
      this.frontStraight(offset)
      ctx.translate(-offset, 0)
      this.stripe()
      this.upperCorner()
      this.lowerCorner()
    } else {
      this.frontTurn(curDir, prevDir, offset)
      this.stripe()
    }
  }

  body(curDir, { prevDir, nextDir, offset }) {
    this.front(curDir, prevDir, offset)
    this.back(curDir, nextDir, offset)
  }
}

class WorldView {
  constructor(world, snakeView) {
    this.world = world
    this.snakeView = snakeView
  }

  food() {
    ctx.beginPath()
    ctx.moveTo(0, -1/2)
    ctx.lineTo(1/2, 0)
    ctx.lineTo(0, 1/2)
    ctx.lineTo(-1/2, 0)
    ctx.closePath()
    ctx.stroke()
  }

  printInfo() {
    const score = this.world.score
    ctx.fillText(`Score: ${score}`, W - TEXTSIZE * 6, TEXTSIZE)
    ctx.fillText(`Press P to Pause`, TEXTSIZE, TEXTSIZE)
  }

  printPaused() {
    const oldTextAlign = ctx.textAlign

    ctx.textAlign = 'center'
    ctx.fillText('Paused', W / 2, H / 2)
    ctx.textAlign = oldTextAlign
  }

  gameOver() {
    const oldFillStyle = ctx.fillStyle
    const oldTextAlign = ctx.textAlign

    ctx.textAlign = 'center'
    ctx.fillStyle = 'red'

    ctx.fillText(`score: ${this.world.score}`, W / 2, H / 2)
    const msg = this.world.easterEgg ? 'Ouroboros!' : 'Game Over!'
    ctx.fillText(msg, W / 2, (H - 2 * TEXTSIZE) / 2)
    ctx.fillText('Press N to restart', W / 2, (H + 2 * TEXTSIZE) / 2)

    ctx.fillStyle = oldFillStyle
    ctx.textAlign = oldTextAlign
  }
}

function draw(worldView, offset) {
  const snakeView = worldView.snakeView
  const squares = snakeView.snake.squares

  ctx.clearRect(0, 0, W, H)
  renderShape(snakeView.head.bind(snakeView), snakeView.snake.head,
              { nextDir: squares[squares.length - 2].dir,
                offset: offset })
  if (snakeView.snake.justAte) {
    const second = squares.length - 2
    renderShape(snakeView.appear.bind(snakeView), squares[second],
                { prevDir: squares[second + 1].dir,
                  nextDir: squares[second - 1].dir,
                  offset: offset })
    for (let i = 1; i < squares.length - 2; i++) {
      renderShape(snakeView.body.bind(snakeView), squares[i],
                  { prevDir: squares[i+1].dir,
                    nextDir: squares[i-1].dir,
                    offset: 1 / BLOCK_SIDE })
    }
    renderShape(snakeView.tail.bind(snakeView), snakeView.snake.tail,
                { prevDir: squares[1].dir, offset: 1 / BLOCK_SIDE })
  } else {
    for (let i = 1; i < squares.length - 1; i++) {
      renderShape(snakeView.body.bind(snakeView), squares[i],
                  { prevDir: squares[i+1].dir,
                    nextDir: squares[i-1].dir,
                    offset: offset })
    }
    renderShape(snakeView.tail.bind(snakeView), snakeView.snake.tail,
                { prevDir: squares[1].dir, offset: offset })
  }

  renderShape(worldView.food, worldView.world.food)
  worldView.printInfo()
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

