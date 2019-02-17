const SPEED = 0.001

async function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function play() {
  draw(world)
  await delay(1/SPEED)
  world.step()
  requestAnimationFrame(play)
}

const world = new World()

document.onkeydown = (e) => {
  e = e || window.event
  const key = e.keyCode - 37

  if ([0, 1, 2, 3].includes(key)) {
    const dir = new Vector(
      (key - 1) % 2, // -1,  0, 1, 0
      (key - 2) % 2  //  0, -1, 0, 1
    )
    world.dir = dir
  }
}

play()
