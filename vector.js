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

  move(dir) {
    return this.add(dir)
  }

  equals(vec) {
    if (this.x === vec.x && this.y === vec.y) {
      return true
    }
    return false
  }

  isZero() {
    if (this.x === 0 && this.y == 0) {
      return true
    } else {
    return false
    }
  }
}