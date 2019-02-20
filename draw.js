const TEXTSIZE = 30

ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'left'

const BLOCK_DIST = W / X_BLOCKS

function renderTail(square) {
  const x = (square.x / X_BLOCKS) * W
  const y = (square.y / Y_BLOCKS) * H

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x, y + BLOCK_DIST)
  ctx.lineTo(x + BLOCK_DIST, y + BLOCK_DIST)
  ctx.lineTo(x + BLOCK_DIST, y)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

function renderFood(food) {
  const x = (food.x / X_BLOCKS) * W
  const y = (food.y / Y_BLOCKS) * H

  ctx.beginPath()
  ctx.moveTo(x + BLOCK_DIST/2, y)
  ctx.lineTo(x + BLOCK_DIST, y + BLOCK_DIST/2)
  ctx.lineTo(x + BLOCK_DIST/2, y + BLOCK_DIST)
  ctx.lineTo(x, y + BLOCK_DIST/2)
  ctx.closePath()
  ctx.stroke()
}

function printScore(score) {
  ctx.fillText(`Score: ${score}`, W - TEXTSIZE * 6, TEXTSIZE)
}

function draw(world) {
  // TODO: optimize by drawing entire
  // snake in one go and filling once
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (square of world.squares) {
    renderTail(square)
  }
  printScore(world.score)
  renderFood(world.food)
}
