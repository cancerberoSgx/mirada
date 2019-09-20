// import * as gui from 'gui'
// import { join, dirname } from 'path'
// import { basename } from 'misc-utils-of-mine-generic'

// class App1 {
//   protected win: gui.Window = null as any
//   protected content: gui.Container = null as any
//   protected sidebar: gui.Container = null as any
//   protected open: gui.Button = null as any
//   protected save: gui.Button = null as any
//   protected filename = ''
//   protected folder = ''
//   protected canvas: gui.Canvas = null as any
//   protected image: gui.Image = null as any
//   menu: gui.MenuBar = null as any

//   render() {
//     this.createWindow()
//     this.createSidebar()
//     // this.createMenu()
//     this.createCanvas()
//     this.start()
//   }
//   start() {

//     this.win.center()
//     this.win.activate()
//     if (!(process.versions as any).yode) {
//       gui.MessageLoop.run()
//       process.exit(0)
//     }
//   }

//   protected createWindow() {
//     this.content = gui.Container.create()
//     this.content.setBackgroundColor('#FFF')
//     this.content.setStyle({ flexgrow: 1 })

//     this.win = gui.Window.create({})
//     this.win.setContentView(this.content)
//     this.win.onClose = function () { gui.MessageLoop.quit() }
//     this.win.setContentSize({ width: 600, height: 600 })
//     // gui.app.getApplicationMenu
//   }

//   protected createCanvas() {
//     const imgSize = { width: 400, height: 400 }
//     this.canvas = gui.Canvas.create(imgSize, 1)
//     this.image = gui.Image.createFromPath('test/assets/lenna.jpg')
//     this.canvas.getPainter().drawImage(this.image, { x: 15, y: 0, ...imgSize })
//     this.content.onDraw = (self, painter, dirty) => {
//       painter.drawCanvasFromRect(this.canvas, dirty, dirty)
//     }
//   }

//   protected createSidebar() {
//     if (process.platform == 'darwin') {
//       const v = gui.Vibrant.create()
//       // this.sidebar = gui.Vibrant.create()
//       v.setBlendingMode('behind-window')
//       v.setMaterial('dark')
//       this.sidebar = v
//     } else {
//       this.sidebar = gui.Container.create()
//     }

//     this.sidebar = gui.Container.create()
//     this.sidebar.setStyle({ width: this.sidebar.getPreferredSize().width })
//     this.sidebar.setStyle({ padding: 45 })
//     this.content.addChildView(this.sidebar)

//     this.open = gui.Button.create('Open')
//     this.open.setStyle({ marginBottom: 5 })
//     this.open.onClick = () => {
//       const dialog = gui.FileOpenDialog.create()
//       dialog.setOptions(gui.FileDialog.optionShowHidden)
//       dialog.setFilters([
//         { description: 'All Files', extensions: ['*'] },
//         { description: 'JavaScript Files', extensions: ['js'] },
//       ])
//       if (dialog.runForWindow(this.win)) {
//         const p = dialog.getResult()
//         this.folder = dirname(p)
//         this.filename = basename(p)
//         // edit.setText(String(fs.readFileSync(p)))
//         // edit.focus()
//         this.win.setTitle(this.filename)
//       }
//     }
//     this.sidebar.addChildView(this.open)

//     this.save = gui.Button.create('Save')
//     // save.setImage(gui.Image.createFromPath(__dirname + '/esave@2x.png'))
//     this.save.onClick = () => {
//       if (!this.folder)
//         return
//       const dialog = gui.FileSaveDialog.create()
//       dialog.setFolder(this.folder)
//       dialog.setFilename(this.filename)
//       if (dialog.runForWindow(this.win)) {
//         //  writeFileSync(String(dialog.getResult()), edit.getText())
//       }
//     }
//     this.sidebar.addChildView(this.save)
//   }
// }


// new App1().render()

//   // createMenu() {

//   //   this.menu = gui.MenuBar.create([
//   //     {
//   //       label: 'Fileasd',
//   //       enabled: true,
//   //        onClick: () => gui.MessageLoop.quit(),
//   //       submenu: [
//   //         {
//   //           label: 'Quit',
//   //           accelerator: 'CmdOrCtrl+Q',
//   //           onClick: () => gui.MessageLoop.quit()
//   //         },
//   //       ],
//   //     },
//   //     {
//   //       label: 'Editasd',
//   //       enabled: true, type: 'label',
//   //       visible: true,
//   //        onClick: () => gui.MessageLoop.quit(),
//   //       submenu: [
//   //         { role: 'copy', label: 'asd', onClick: () => gui.MessageLoop.quit() },
//   //         { role: 'cut' , label: 'aasssd', onClick: () => gui.MessageLoop.quit() },
//   //         { role: 'paste' },
//   //         { role: 'select-all',
//   //       enabled: true, type: 'label',
//   //       visible: true, },
//   //         { type: 'separator' },
//   //         { role: 'undo' },
//   //         { role: 'redo' },
//   //       ],
//   //     },
//   //     {
//   //       label: 'Edit2',
//   //       enabled: true,
//   //        onClick: () => gui.MessageLoop.quit(),
//   //       submenu: [
//   //         { role: 'copy', label: 'asd', onClick: () => gui.MessageLoop.quit() },
//   //         { role: 'cut' , label: 'aasssd', onClick: () => gui.MessageLoop.quit() },
//   //         { role: 'paste',  label: 'asd', },
//   //         { role: 'select-all' },
//   //         { type: 'separator' },
//   //         {  },
//   //         { role: 'redo' },
//   //       ],
//   //     },
//   //     {
//   //       label: 'Edit2222',
//   //       enabled: true,
//   //        onClick: () => gui.MessageLoop.quit(),
//   //       submenu: [
//   //         { label: 'asd', onClick: () => gui.MessageLoop.quit() },
//   //         {  label: 'aasssd', onClick: () => gui.MessageLoop.quit() },
//   //         { type: 'separator' },
//   //         {  label: 'asd', },
//   //       ],
//   //     },
//   //   ])

//     //  if (process.platform == 'darwin'){
//     //   gui.app.setApplicationMenu(this.menu)
//     //   }
//     // else{
//     //   this.win.setMenuBar(this.menu)
//     //   }
//   // }
