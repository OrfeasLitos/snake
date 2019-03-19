class Square {
  constructor(loc, dir = new Vector(1, 0)) {
    this.loc = loc
    this.dir = dir
    return this
  }

  clone() {
    return new Square(
      this.loc.clone(),
      this.dir.clone())
  }

  equals(vec) {
    return this.loc.equals(vec)
  }

  isTurning() {
    return !this.front.equals(this.back.neg())
  }
}
