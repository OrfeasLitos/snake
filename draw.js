const TEXTSIZE = 30

ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'left'

const BLOCK_DIST = W / X_BLOCKS

function renderTail(square) {
  const x = (square.loc.x / X_BLOCKS) * W
  const y = (square.loc.y / Y_BLOCKS) * H

  ctx.beginPath()
  ctx.moveTo(x, y)
  if (square.dir.x === 0) {
    ctx.lineTo(x, y + BLOCK_DIST)
  } else {
    ctx.lineTo(x + BLOCK_DIST, y)
  }
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(x + BLOCK_DIST, y + BLOCK_DIST)
  if (square.dir.x === 0) {
    ctx.lineTo(x + BLOCK_DIST, y)
  } else {
    ctx.lineTo(x, y + BLOCK_DIST)
  }
  ctx.closePath()
  ctx.stroke()

  ctx.beginPath()
  if (square.dir.x === 0) {
    ctx.moveTo(x, y + BLOCK_DIST / 2)
    ctx.lineTo(x, y + BLOCK_DIST)
    ctx.lineTo(x + BLOCK_DIST, y + BLOCK_DIST / 2)
    ctx.lineTo(x + BLOCK_DIST, y)
  } else {
    ctx.moveTo(x + BLOCK_DIST / 2, y)
    ctx.lineTo(x + BLOCK_DIST, y)
    ctx.lineTo(x + BLOCK_DIST / 2, y + BLOCK_DIST)
    ctx.lineTo(x, y + BLOCK_DIST)
  }
  ctx.closePath()
  ctx.fill()
}

function renderFood(food) {
  const x = (food.x / X_BLOCKS) * W
  const y = (food.y / Y_BLOCKS) * H

  ctx.beginPath()
  ctx.moveTo(x + BLOCK_DIST / 2, y)
  ctx.lineTo(x + BLOCK_DIST, y + BLOCK_DIST / 2)
  ctx.lineTo(x + BLOCK_DIST / 2, y + BLOCK_DIST)
  ctx.lineTo(x, y + BLOCK_DIST / 2)
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

function draw(world) {
  // TODO: optimize by drawing entire
  // snake in one go and filling once
  ctx.clearRect(0, 0, W, H)
  for (square of world.squares) {
    renderTail(square)
  }
  printScore(world.score)
  renderFood(world.food)
  if (world.isPaused) {
    printPaused()
  }
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
