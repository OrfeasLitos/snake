
function main() {
  function modTime(time) {
    return (time % (1 / SPEED)) * SPEED * BLOCK_SIDE
  }

  function run() {
    if (!world.isPaused) {
      let now = modTime((new Date() | 0) - world.timePaused)
      if (now < prev) {
        world.step()
      }
      draw(world, BLOCK_SIDE - now)
      prev = now
    }
    if (!world.gameOver) {
      requestAnimationFrame(run)
    } else {
      gameOver(world.score, world.easterEgg)
    }
  }

  let prev = modTime(new Date() | 0)
  run()
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

main()
