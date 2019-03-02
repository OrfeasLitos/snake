async function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function play() {
  draw(world)
  await delay(1 / SPEED)
  world.step()
  if (!world.gameOver) {
    requestAnimationFrame(play)
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
    world.togglePause()
  } else if (key === 78 && // N
             world.gameOver) { // New game
    world = new World()
    play()
  } else if ([37, 38, 39, 40].includes(key) &&
             !world.isPaused) {
    const dir = key - 37
    world.dir = new Vector(
      (dir - 1) % 2, // -1,  0, 1, 0
      (dir - 2) % 2) //  0, -1, 0, 1
  }
}

play()
