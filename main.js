function modTime(time) {
  return (time % (1 / SPEED)) * SPEED * BLOCK_SIDE
}

async function run(prev) {
  let now = null
  if (!world.isPaused) {
    now = modTime((new Date() | 0) - world.timePaused)
    if (now < prev) {
      world.step()
    }
    draw(world, now)
  }
  if (!world.gameOver) {
    requestAnimationFrame(run.bind(this, now || prev))
  } else {
    gameOver(world.score, world.easterEgg)
  }
}

let world = new World()

document.onkeydown = (e) => {
  e = e || window.event
  const key = e.keyCode

  if (key === 80 && // P
      !world.gameOver) { // Pause only running game
    world.togglePause(1 / SPEED)
    if (world.isPaused) {
      printPaused()
    }
  } else if (key === 78 && // N
             world.gameOver) { // New game
    world = new World()
    run(modTime(new Date() | 0))
  } else if ([37, 38, 39, 40].includes(key) &&
             !world.isPaused) {
    const dir = key - 37
    world.dir = new Vector(
      (dir - 1) % 2, // -1,  0, 1, 0
      (dir - 2) % 2) //  0, -1, 0, 1
  }
}

run(modTime(new Date() | 0))
