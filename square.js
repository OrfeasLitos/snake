class Square {
  constructor(loc, front = new Vector(1, 0), back) {
    this.loc = loc
    this.front = front
    if (back === undefined) {
      this.back = front.neg()
    } else {
      this.back = back
    }

    return this
  }

  clone() {
    return new Square(
      this.loc.clone(),
      this.front.clone(),
      this.back.clone())
  }

  equals(vec) {
    return this.loc.equals(vec)
  }

  isTurning() {
    return !this.front.equals(this.back.neg())
  }
}
