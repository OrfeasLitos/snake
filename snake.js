const INIT_SNAKE_SIZE = 4
const X_BLOCKS = 100
const SPEED = 0.005

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// TODO: use jQuery if needed 2 more times
const border = Number(
  getComputedStyle(canvas, null)
  .getPropertyValue('border-left-width').slice(0, -2));

const W = canvas.width = window.innerWidth - 2 * border
const H = canvas.height = window.innerHeight - 2 * border

const N = Math.floor(W / X_BLOCKS)
const Y_BLOCKS = Math.floor(H / N)

class World {
  constructor() {
    this.squares = []
    this.direction = new Vector(1, 0)
    this.movesQueue = []
    this.score = 0
    this.gameOver = false
    this.isPaused = false

    this.borders = []
    for (let i = 0; i < X_BLOCKS; i++) {
      this.borders.push(new Vector(i, -1))
      this.borders.push(new Vector(i, Y_BLOCKS))
    }
    for (let i = 0; i < Y_BLOCKS; i++) {
      this.borders.push(new Vector(-1, i))
      this.borders.push(new Vector(X_BLOCKS, i))
    }

    this.head = new Vector(
      Math.floor(X_BLOCKS / 2),
      Math.floor(Y_BLOCKS / 2)
    )

    for (let i = INIT_SNAKE_SIZE - 1; i >= 0; i--) {
      this.squares.push(new Square(
        new Vector(this.head.x - i, this.head.y),
        this.dir.clone()))
    }
    this.food = this.produceFood()
  }

  getRandomSquare() {
    return new Vector(
      Math.floor(Math.random() * X_BLOCKS),
      Math.floor(Math.random() * Y_BLOCKS))
  }

  produceFood() {
    let food = this.getRandomSquare()
    while (this.squares.some(
      square => square.equals(food)
    )) {
      food = this.getRandomSquare()
    }
    return food
  }

  advance() {
    if (this.movesQueue.length > 0) {
      this.direction = this.movesQueue.shift()
    }
    this.head = this.head.add(this.dir)
    this.squares[this.squares.length - 1].front = this.dir.clone()
    this.squares.push(new Square(
      this.head.clone(), this.dir.clone()))
  }

  maybeEat() {
    if (this.head.equals(this.food)) {
     this.score++
     this.food = this.produceFood()
    } else { // no food, remove last square
      this.squares.shift()
    }
  }

  maybeCollide() {
    if (this.squares.slice(0, -1).some(
      square => square.equals(this.head)
    ) || this.borders.some(
      square => square.equals(this.head)
    )) {
      this.gameOver = true
      if (this.squares[0].equals(this.head)) {
        this.easterEgg = true
      }
    }
  }

  step() {
    if (this.isPaused) {
      return
    }

    this.maybeCollide()
    this.advance()
    this.maybeEat()
  }

  set dir(dir) {
    const prev = (this.movesQueue.length === 0) ?
      this.dir : this.movesQueue[0]

    if (!prev.add(dir).isZero()) {
      this.movesQueue.push(dir)
    }
  }

  get dir() {
    return this.direction
  }

  togglePause() {
    this.isPaused = !this.isPaused
  }
}
