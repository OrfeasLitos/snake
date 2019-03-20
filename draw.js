const TEXTSIZE = 30

ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'left'
ctx.lineWidth = 1 / BLOCK_SIDE

function straight(a, b) {
  return a.equals(b)
}

function head(thisDir, prevDir, nextDir, offset) {
  ctx.save()
  if (straight(thisDir, nextDir)) {
    ctx.translate(1 - offset, 0)
  } else {
    const sum = thisDir.add(nextDir).x + thisDir.add(nextDir).y
    const sign = sum ? -1 : 1
    ctx.translate(1/2, sign/2)

    ctx.rotate(-sign * offset * Math.PI /2)
    ctx.translate(1/2, -sign/2)
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

function tail(thisDir, prevDir, nextDir, offset) {
  ctx.save()
  if (straight(thisDir, prevDir)) {
    ctx.translate(1 - offset, 0)
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

function box() {
  ctx.beginPath()
  ctx.moveTo(-1/2, -1/2)
  ctx.lineTo(1/2, -1/2)
  ctx.moveTo(-1/2, 1/2)
  ctx.lineTo(1/2, 1/2)
  ctx.stroke()
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

// TODO: fixup
// TODO: decide whether to rotate or not
function turn(square, offset) {
  ctx.beginPath()
  ctx.moveTo(-1/2, -1/2)
  ctx.lineTo(1/2, -1/2)
  ctx.moveTo(-1/2, 1/2)
  ctx.lineTo(1/2, 1/2)
  ctx.stroke()
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
  ctx.textAlign = 'center'
  ctx.fillText('Paused', W / 2, H / 2)
  ctx.textAlign = 'left'
}

function draw(world, offset) {
  ctx.clearRect(0, 0, W, H)
  renderShape(head, world.head, null,
              world.squares[world.squares.length - 2].dir,
              offset)
  for (let i = 1; i < world.squares.length - 1; i++) {
    renderShape(body, world.squares[i],
                world.squares[i+1].dir,
                world.squares[i-1].dir, offset)
  }
  renderShape(tail, world.tail, world.squares[1].dir, null, offset)
  renderShape(food, world.food, null, null, 0)
  printScore(world.score)
}

function renderShape(shape, square, prevDir, nextDir, offset) {
  const x = (square.loc.x / X_BLOCKS) * W
  const y = (square.loc.y / Y_BLOCKS) * H

  ctx.save()
  ctx.translate(x + BLOCK_SIDE * (1/2 - square.dir.x),
                y + BLOCK_SIDE * (1/2 - square.dir.y))
  ctx.transform(square.dir.x, square.dir.y,
                square.dir.y, square.dir.x, 0, 0)
  ctx.scale(BLOCK_SIDE, BLOCK_SIDE)
  shape(square.dir, prevDir, nextDir, offset)
  ctx.restore()
}

function gameOver(score, easterEgg) {
  ctx.textAlign = 'center'
  ctx.fillStyle = 'red'

  ctx.fillText(`score: ${score}`, W / 2, H / 2)
  const msg = easterEgg ? 'Ouroboros!' : 'Game Over!'
  ctx.fillText(msg, W / 2, (H - 2 * TEXTSIZE) / 2)
  ctx.fillText('Press N to restart', W / 2, (H + 2 * TEXTSIZE) / 2)

  ctx.fillStyle = 'black'
  ctx.textAlign = 'left'
}
