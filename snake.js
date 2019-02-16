const INIT_SIZE = 4
const X_BLOCKS = 100

const N = W / X_BLOCKS
const Y_BLOCKS = H * N

class World {
  constructor() {
    this.squares = []

    for (let i = 0; i < INIT_SIZE; i++) {
      this.squares.push(new Square(X_BLOCKS/2 - i, Y_BLOCKS/2))
    }
  }

  step(dir) {
  }
}

class Square {
  constructor(x, y) {
    this.x = x
    this.y = y

    return this
  }
}
