import * as Mirada_ from 'mirada'
declare var Mirada: typeof Mirada_
;(async () => {
  // This example uses Mirada high level tool for grabCut
  const canvas = document.getElementById('outputCanvas')!
  var image = await Mirada.File.fromCanvas(canvas)
  const result = await Mirada.tool.grabCut({
    image,
    x: 50,
    y: 50,
    width: 260,
    height: 280
  })
  const f = Mirada.File.fromData(result.image)
  f.show(canvas)
  image.delete()
  f.delete()
})()
