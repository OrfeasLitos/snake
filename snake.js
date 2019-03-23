// TODO: separate snake in new object
const INIT_SNAKE_SIZE = 4
const X_BLOCKS = 100
const SPEED = 0.005

if (INIT_SNAKE_SIZE < 2) {
  throw new RangeError("Initial snake size should be at least 2")
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// TODO: use jQuery if needed 2 more times
const border = Number(
  getComputedStyle(canvas, null)
  .getPropertyValue('border-left-width').slice(0, -'px'.length));

const W = canvas.width = window.innerWidth - 2 * border

const BLOCK_SIDE = W / X_BLOCKS

const MAX_HEIGHT = window.innerHeight - 2 * border
const Y_BLOCKS = Math.floor(MAX_HEIGHT * X_BLOCKS / W)
const H = canvas.height = Y_BLOCKS * BLOCK_SIDE
canvas.style.borderWidth = `${border + (MAX_HEIGHT - H) / 2}px
                            ${border}px
                            ${border + (MAX_HEIGHT - H) / 2}px
                            ${border}px`

class Snake {
  constructor(initSize, x, y) {
    this.direction = new Vector(1, 0)

    this.squares = []
    for (let i = initSize - 1; i >= 0; i--) {
      this.squares.push(new Square(
        new Vector(Math.floor(x / 2) - i, Math.floor(y / 2)),
        this.direction.clone()))
    }
  }

  get head() {
    return this.squares[this.squares.length - 1]
  }

  set head(square) {
    this.squares[this.squares.length - 1] = square
  }

  get tail() {
    return this.squares[0]
  }

  collides(borders) {
    return this.squares.slice(0, -1).some(
      square => square.equals(this.head.loc))
      || borders.some(
      square => square.equals(this.head.loc))
  }
}

class World {
  constructor() {
    this.snake = new Snake(INIT_SNAKE_SIZE, X_BLOCKS, Y_BLOCKS)
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

    this.food = this.produceFood()
  }

  get head() {
    return this.snake.head
  }

  set head(square) {
    this.snake.head = square
  }

  get tail() {
    return this.snake.tail
  }

  getRandomSquare() {
    return new Square(new Vector(
      Math.floor(Math.random() * X_BLOCKS),
      Math.floor(Math.random() * Y_BLOCKS)))
  }

  produceFood() {
    let food
    do {
      food = this.getRandomSquare()
    } while (this.snake.squares.some(
      square => square.equals(food.loc)
    ))
    return food
  }

  advance() {
    if (this.movesQueue.length > 0) {
      this.snake.direction = this.movesQueue.shift()
    }
    this.snake.squares.push(new Square(
      this.head.loc.add(this.dir), this.dir))
  }

  maybeEat() {
    if (this.head.loc.equals(this.food.loc)) {
     this.score++
     this.food = this.produceFood()
    } else { // no food, remove last square
      this.snake.squares.shift()
    }
  }

  maybeCollide() {
    if (this.snake.collides(this.borders)) {
      this.gameOver = true
      if (this.tail.equals(this.head.loc)) {
        this.easterEgg = true
      }
    }
  }

  step() {
    this.maybeCollide()
    this.advance()
    this.maybeEat()
  }

  set dir(newDir) {
    const backwards = (newDir) => {
      const prevDir = (this.movesQueue.length === 0) ?
        this.snake.direction : this.movesQueue[0]

      return prevDir.add(newDir).isZero()
    }

    if (backwards(newDir)) {
      return
    }

    // Only remember 2 inputs
    if (this.movesQueue.length >= 2) {
      return
    }

    this.movesQueue.push(newDir)
  }

  get dir() {
    return this.snake.direction
  }

  togglePause(maxTime) {
    this.isPaused = !this.isPaused
  }
}
