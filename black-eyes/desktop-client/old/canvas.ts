// import * as gui from 'gui'
// import { join } from 'path'
// import { readFileSync } from 'fs'

// const imgSize = {
//   width: 400, height: 400
// }
// let canvas = gui.Canvas.create(imgSize, 1)
// let image = gui.Image.createFromBuffer(readFileSync('test/assets/lenna.jpg'), 1)
// canvas.getPainter().drawImage(image, { x: 0, y: 0, ...imgSize })
// const win = gui.Window.create()
// win.setContentSize({ width: 600, height: 600 })
// const content = gui.Container.create()
// content.setBackgroundColor('#FFF')
// content.setStyle({ flexgrow: 1 })
// win.setContentView(content)
// content.onDraw = (self, painter, dirty) => {
//   painter.drawCanvasFromRect(canvas, dirty, dirty)
// }

// win.onClose = function () { gui.MessageLoop.quit() }
// win.center()
// win.activate()

// if (!process.versions  .yode) {
//   gui.MessageLoop.run()
//   process.exit(0)
// }
