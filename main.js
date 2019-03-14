
// TODO add dt here to gameTime, clear world.timePaused
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

const KEY_N = 78
const KEY_P = 80

const KEY_LEFT  = 37
const KEY_UP    = 38
const KEY_RIGHT = 39
const KEY_DOWN  = 40
const KEY_ARROWS = [KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN]

const keyDirections = {
  [KEY_UP]:    new Vector(0, -1),
  [KEY_DOWN]:  new Vector(0,  1),
  [KEY_LEFT]:  new Vector(-1, 0),
  [KEY_RIGHT]: new Vector(1,  0)
}

document.onkeydown = (e) => {
  e = e || window.event
  const key = e.keyCode

  if (key === KEY_P) {
    if(world.gameOver) { // Pause only running game
      return
    }

    world.togglePause(1 / SPEED)
    if (world.isPaused) {
      printPaused()
    }
  } else if (key === KEY_N) {
    if(!world.gameOver) {
      return
    }

    // New game
    world = new World()
    run(modTime(new Date() | 0))
  } else if (KEY_ARROWS.includes(key)) {
    if(world.isPaused) {
      return
    }
    world.dir = keyDirections[key]
  }
}

main()
