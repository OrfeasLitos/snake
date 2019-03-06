const TEXTSIZE = 30

ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'left'

function renderBox(square, x, y) {
  ctx.translate(x + BLOCK_SIDE / 2, y + BLOCK_SIDE / 2)
  for (let i of [
    new Vector(0, 1),  // top
    new Vector(-1, 0), // left
    new Vector(0, -1), // bottom
    new Vector(1, 0)   // right
  ]) {
    if(!square.front.equals(i) && !square.back.equals(i)) {
      ctx.beginPath()
      ctx.moveTo(
        (Math.trunc(i.x - i.y + 1/2) - 1/2) * BLOCK_SIDE,
        (Math.trunc(i.x + i.y + 1/2) - 1/2) * BLOCK_SIDE)
      ctx.lineTo(
        (Math.trunc(i.x + i.y + 1/2) - 1/2) * BLOCK_SIDE,
        (Math.trunc(-i.x + i.y + 1/2) - 1/2) * BLOCK_SIDE)
      ctx.stroke()
    }
  }
  ctx.translate(-x - BLOCK_SIDE / 2, -y - BLOCK_SIDE / 2)
}

function renderStripe(x, y) {
  ctx.translate(x + BLOCK_SIDE / 2, y + BLOCK_SIDE / 2)
  ctx.beginPath()
  ctx.moveTo(-BLOCK_SIDE / 2, -BLOCK_SIDE / 2)
  ctx.lineTo(-BLOCK_SIDE / 2, -BLOCK_SIDE / 4)
  ctx.lineTo(BLOCK_SIDE / 4, BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 2, BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 2, BLOCK_SIDE / 4)
  ctx.lineTo(-BLOCK_SIDE / 4, -BLOCK_SIDE / 2)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
  ctx.translate(-x - BLOCK_SIDE / 2, -y - BLOCK_SIDE / 2)
}

function renderUpperCorner(x, y) {
  ctx.translate(x + BLOCK_SIDE / 2, y + BLOCK_SIDE / 2)
  ctx.beginPath()
  ctx.moveTo(BLOCK_SIDE / 4, -BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 2, -BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 2, -BLOCK_SIDE / 4)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
  ctx.translate(-x - BLOCK_SIDE / 2, -y - BLOCK_SIDE / 2)
}

function renderLowerCorner(x, y) {
  ctx.translate(x + BLOCK_SIDE / 2, y + BLOCK_SIDE / 2)
  ctx.beginPath()
  ctx.moveTo(-BLOCK_SIDE / 2, BLOCK_SIDE / 4)
  ctx.lineTo(-BLOCK_SIDE / 2, BLOCK_SIDE / 2)
  ctx.lineTo(-BLOCK_SIDE / 4, BLOCK_SIDE / 2)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
  ctx.translate(-x - BLOCK_SIDE / 2, -y - BLOCK_SIDE / 2)
}

function renderHead(square) {
  const x = (square.loc.x / X_BLOCKS) * W
  const y = (square.loc.y / Y_BLOCKS) * H
  const x_dir = (square.front.x == 1) ? 0 : square.front.x
  const y_dir = square.front.y

  ctx.translate(x + BLOCK_SIDE / 2, y + BLOCK_SIDE / 2)
  ctx.rotate(Math.PI * (x_dir + y_dir / 2))

  ctx.beginPath()
  ctx.moveTo(-BLOCK_SIDE / 2, -BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 4, BLOCK_SIDE * (1/3 - 1/2))
  ctx.lineTo(BLOCK_SIDE / 2, BLOCK_SIDE * (1/3 - 1/2))
  ctx.lineTo(BLOCK_SIDE / 2, BLOCK_SIDE * (2/3 - 1/2))
  ctx.lineTo(BLOCK_SIDE / 4, BLOCK_SIDE * (2/3 - 1/2))
  ctx.lineTo(-BLOCK_SIDE / 2, BLOCK_SIDE / 2)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(BLOCK_SIDE / 4, BLOCK_SIDE * (2/3 - 1/2))
  ctx.lineTo(BLOCK_SIDE / 4, BLOCK_SIDE * (1/3 - 1/2))
  ctx.lineTo(BLOCK_SIDE / 2, BLOCK_SIDE * (1/3 - 1/2))
  ctx.lineTo(BLOCK_SIDE / 2, BLOCK_SIDE * (2/3 - 1/2))
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(-BLOCK_SIDE / 2, BLOCK_SIDE / 4)
  ctx.lineTo(-BLOCK_SIDE / 2, BLOCK_SIDE / 2)
  ctx.lineTo(-BLOCK_SIDE * 5 / 28, BLOCK_SIDE * 5 / 14)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.rotate(-Math.PI * (x_dir + y_dir / 2))
  ctx.translate(-x - BLOCK_SIDE / 2, -y - BLOCK_SIDE / 2)
}

function renderTail(square) {
  const x = (square.loc.x / X_BLOCKS) * W
  const y = (square.loc.y / Y_BLOCKS) * H
  const x_dir = (square.front.x == 1) ? 0 : square.front.x
  const y_dir = square.front.y

  ctx.translate(x + BLOCK_SIDE / 2, y + BLOCK_SIDE / 2)
  ctx.rotate(Math.PI * (x_dir + y_dir / 2))

  ctx.beginPath()
  ctx.arc(-BLOCK_SIDE / 3, -BLOCK_SIDE * 3 / 10,
          BLOCK_SIDE / 5, Math.PI / 2, Math.PI * 3 / 2)
  ctx.moveTo(-BLOCK_SIDE / 3, BLOCK_SIDE / 2)
  ctx.arc(-BLOCK_SIDE / 3, BLOCK_SIDE * 3 / 10,
          BLOCK_SIDE / 5, Math.PI / 2, Math.PI * 3 / 2)
  ctx.moveTo(BLOCK_SIDE / 2, -BLOCK_SIDE / 2)
  ctx.lineTo(-BLOCK_SIDE / 3, -BLOCK_SIDE / 2)
  ctx.moveTo(-BLOCK_SIDE / 3, -BLOCK_SIDE / 10)
  ctx.lineTo(-BLOCK_SIDE / 3, BLOCK_SIDE / 10)
  ctx.moveTo(-BLOCK_SIDE / 3, BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 2, BLOCK_SIDE / 2)
  ctx.stroke()

  ctx.rotate(-Math.PI * (x_dir + y_dir / 2))
  ctx.translate(-x - BLOCK_SIDE / 2, -y - BLOCK_SIDE / 2)

  if (square.front.equals(new Vector(1, 0)) || // up
      square.front.equals(new Vector(0, -1))) { // right
    renderUpperCorner(x, y)
  } else { // left or down
    renderLowerCorner(x, y)
  }
}

function renderBody(square) {
  const x = (square.loc.x / X_BLOCKS) * W
  const y = (square.loc.y / Y_BLOCKS) * H

  renderBox(square, x, y)
  renderStripe(x, y)
  renderUpperCorner(x, y)
  renderLowerCorner(x, y)
}

function renderFood(food) {
  const x = (food.x / X_BLOCKS) * W
  const y = (food.y / Y_BLOCKS) * H

  ctx.beginPath()
  ctx.moveTo(x + BLOCK_SIDE / 2, y)
  ctx.lineTo(x + BLOCK_SIDE, y + BLOCK_SIDE / 2)
  ctx.lineTo(x + BLOCK_SIDE / 2, y + BLOCK_SIDE)
  ctx.lineTo(x, y + BLOCK_SIDE / 2)
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
  ctx.clearRect(0, 0, W, H)
  renderHead(world.head)
  for (let i = 1; i < world.squares.length - 1; i++) {
    renderBody(world.squares[i])
  }
  renderTail(world.tail)
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
