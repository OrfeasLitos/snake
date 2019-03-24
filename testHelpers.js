function putx(x, y, color = 'black') {
  const oldStrokeStyle = ctx.strokeStyle
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(x - 1/6, y - 1/6)
  ctx.lineTo(x + 1/6, y + 1/6)
  ctx.moveTo(x - 1/6, y + 1/6)
  ctx.lineTo(x + 1/6, y - 1/6)
  ctx.stroke()
  ctx.strokeStyle = oldStrokeStyle
}

// Usage:
// renderShape(test, new Square(new Vector(1, 1),
//             new Vector(0, -1)), { offset: 0.7 })
function test(curDir, { offset }) {
  putx(-1/2, -1/2)
  ctx.save()
  ctx.translate(-offset, 0)
  putx(-1/2, -1/2, 'red')
  putx(-1/2, 1/2, 'green')
  box()
  ctx.restore()
}
