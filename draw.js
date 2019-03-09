const TEXTSIZE = 30

ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'left'

function head(square) {
  const x_dir = (square.front.x == 1) ? 0 : square.front.x
  const y_dir = square.front.y

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
}

function tail(square) {
  const x = (square.loc.x / X_BLOCKS) * W
  const y = (square.loc.y / Y_BLOCKS) * H
  const x_dir = (square.front.x == 1) ? 0 : square.front.x
  const y_dir = square.front.y

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

  if (square.front.equals(new Vector(1, 0)) || // up
      square.front.equals(new Vector(0, -1))) { // right
    upperCorner(square)
  } else { // left or down
    lowerCorner(square)
  }
}

function box(front, back) {
  for (let i of [
    new Vector(0, 1),  // top
    new Vector(-1, 0), // left
    new Vector(0, -1), // bottom
    new Vector(1, 0)   // right
  ]) {
    if(!front.equals(i) && !back.equals(i)) {
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
}

function stripe() {
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
}

function upperCorner() {
  ctx.beginPath()
  ctx.moveTo(BLOCK_SIDE / 4, -BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 2, -BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 2, -BLOCK_SIDE / 4)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

function lowerCorner() {
  ctx.beginPath()
  ctx.moveTo(-BLOCK_SIDE / 2, BLOCK_SIDE / 4)
  ctx.lineTo(-BLOCK_SIDE / 2, BLOCK_SIDE / 2)
  ctx.lineTo(-BLOCK_SIDE / 4, BLOCK_SIDE / 2)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

function body(square) {
  box(square.front, square.back)
  stripe()
  upperCorner()
  lowerCorner()
}

function food(food) {
  ctx.beginPath()
  ctx.moveTo(0, -BLOCK_SIDE / 2)
  ctx.lineTo(BLOCK_SIDE / 2, 0)
  ctx.lineTo(0, BLOCK_SIDE / 2)
  ctx.lineTo(-BLOCK_SIDE / 2, 0)
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
  renderShape(head, world.head, offset)
  for (let i = 1; i < world.squares.length - 1; i++) {
    renderShape(body, world.squares[i], offset)
  }
  renderShape(tail, world.tail, offset)
  renderShape(food, world.food, 0)
  printScore(world.score)
}

// TODO
// offset negative
// also zoom (no BLOCK_SIDE in shapes)
// also rotate (all is dumb in shapes)
// fix corners
function renderShape(shape, square, offset) {
  const x = (square.loc.x / X_BLOCKS) * W
  const y = (square.loc.y / Y_BLOCKS) * H
  ctx.translate(x + BLOCK_SIDE / 2 - square.front.x * offset,
                y + BLOCK_SIDE / 2 - square.front.y * offset)
  shape(square)
  ctx.translate(-x - BLOCK_SIDE / 2 + square.front.x * offset,
                -y - BLOCK_SIDE / 2 + square.front.y * offset)
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
