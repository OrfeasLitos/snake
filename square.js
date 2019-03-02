class Square {
  constructor(loc, front, back) {
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
}
