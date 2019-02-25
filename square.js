class Square {
  constructor(loc, dir) {
    this.loc = loc
    this.dir = dir

    return this
  }

  clone() {
    return new Square(
      this.loc.clone(), this.dir.clone())
  }

  equals(vec) {
    return this.loc.equals(vec)
  }
}
