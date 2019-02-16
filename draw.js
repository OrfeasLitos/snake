const BLOCK_DIST = W / X_BLOCKS

function render(square) {
  const x = (square.x / X_BLOCKS) * W
  const y = (square.y / Y_BLOCKS) * H

  ctx.moveTo(x, y)
  ctx.lineTo(x, y + BLOCK_DIST)
  ctx.lineTo(x + BLOCK_DIST, y + BLOCK_DIST)
  ctx.lineTo(x + BLOCK_DIST, y)
  ctx.closePath()
}

function draw(world) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (square of world.squares) {
    render(square)
  }
  ctx.fill()
}
