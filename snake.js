const INIT_SIZE = 4
const X_BLOCKS = 100

const N = Math.floor(W / X_BLOCKS)
const Y_BLOCKS = Math.floor(H / N)

class World {
  constructor() {
    this.squares = []
    this.direction = new Vector(0, 1)
    this.head = new Vector(
      Math.floor(X_BLOCKS/2),
      Math.floor(Y_BLOCKS/2)
    )

    for (let i = INIT_SIZE - 1; i >= 0; i--) {
      this.squares.push(new Vector(
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

  }


  }
}
