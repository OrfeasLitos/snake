const SPEED = 0.001

async function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function play() {
  draw(world)
  world.step()

  await delay(1/SPEED)
  requestAnimationFrame(play)
}

const world = new World()
play()
