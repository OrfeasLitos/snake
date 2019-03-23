const TEXTSIZE = 30

ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'left'
ctx.lineWidth = 1 / BLOCK_SIDE

function straight(a, b) {
  return a.equals(b)
}

function head(curDir, { nextDir, offset }) {
  ctx.save()
  if (straight(curDir, nextDir)) {
    ctx.translate(-offset, 0)
  } else {
    ctx.translate(-1/2, -1/2)
    ctx.rotate(offset * Math.PI / 2)
    ctx.translate(1/2, 1/2)
  }

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
  if (straight(prevDir, curDir)) {
    ctx.translate(-offset, 0)
  } else {
    const sum = thisDir.add(prevDir).x + thisDir.add(prevDir).y
    const sign = sum ? -1 : 1
    ctx.translate(1/2, -sign/2)

    ctx.rotate(sign * (offset - 1) * Math.PI /2)
    ctx.translate(-1/2, sign/2)
  }

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

function back(curDir, nextDir, offset) {
  ctx.save()

  if (straight(curDir, nextDir)) {
    ctx.beginPath()
    ctx.moveTo(-1/2 - offset, -1/2)
    ctx.lineTo(-1/2, -1/2)
    ctx.moveTo(-1/2 - offset, 1/2)
    ctx.lineTo(-1/2, 1/2)
    ctx.stroke()
    //stripe()
  } else {
    ctx.beginPath()
    ctx.moveTo(1/2, -1/2)
    ctx.arc(1/2, 1/2, 1, -Math.PI / 2,
            -Math.PI * (1 + offset) / 2, true)
    ctx.stroke()
  }

  ctx.restore()
}

function front(curDir, prevDir, offset) {
  ctx.save()

  if (straight(curDir, prevDir)) {
    ctx.beginPath()
    ctx.moveTo(-1/2, -1/2)
    ctx.lineTo(1/2 - offset, -1/2)
    ctx.moveTo(-1/2, 1/2)
    ctx.lineTo(1/2 - offset, 1/2)
    ctx.stroke()
    //stripe()
  } else {
    ctx.beginPath()
    ctx.moveTo(1/2, 1/2)
    ctx.arc(1/2, -1/2, 1, Math.PI / 2,
            Math.PI * offset / 2, true)
    ctx.stroke()
  }

  ctx.restore()
}

function body(curDir, { prevDir, nextDir, offset }) {
  back(curDir, nextDir, offset)
  front(curDir, prevDir, offset)
}

function body() {
  box()
  stripe()
  upperCorner()
  lowerCorner()
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

// TODO: don't jump when getting longer
function draw(world, offset) {
  const squares = world.snake.squares

  ctx.clearRect(0, 0, W, H)
  renderShape(head, world.head,
              { nextDir: squares[squares.length - 2].dir,
                offset: offset })
  for (let i = 1; i < squares.length - 1; i++) {
    renderShape(body, squares[i],
                { prevDir: squares[i+1].dir,
                  nextDir: squares[i-1].dir,
                  offset: offset })
  }
  renderShape(tail, world.tail,
              { prevDir: squares[1].dir, offset: offset })
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
