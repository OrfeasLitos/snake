const INIT_SIZE = 4
const X_BLOCKS = 100

const N = Math.floor(W / X_BLOCKS)
const Y_BLOCKS = Math.floor(H / N)

class World {
  constructor() {
    this.squares = []
    this.dir = new Square(0, 1)
    this.head = new Square(
      Math.floor(X_BLOCKS/2),
      Math.floor(Y_BLOCKS/2)
    )

    for (let i = INIT_SIZE - 1; i >= 0; i--) {
      this.squares.push(new Square(
        this.head.x - i, this.head.y
      ))
    }
  }

  step() {
    this.head = this.head.move(this.dir)
    this.squares.push(this.head.clone())
    this.squares.shift()
  }
}

class Square {
  constructor(x, y) {
    this.x = x
    this.y = y

    return this
  }

  clone() {
    return new Square(this.x, this.y)
  }

  move(dir) {
    return new Square(this.x + dir.x, this.y + dir.y)
  }
}
