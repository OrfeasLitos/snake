class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y

    return this
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  add(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y)
  }

  neg() {
    return new Vector(-this.x, -this.y)
  }

  equals(vec) {
    return this.x === vec.x && this.y === vec.y
  }

  isZero() {
    return this.x === 0 && this.y == 0
  }

  inspect() {
    return `(${this.x}, ${this.y})`
  }
}
