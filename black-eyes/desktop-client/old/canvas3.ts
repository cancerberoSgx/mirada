// import * as gui from 'gui'
// import { join, dirname } from 'path'
// import { basename } from 'misc-utils-of-mine-generic'

// class AbstractComponent<AP={}, AS extends AP = AP>{
//   state:AS
//   props: AP
// constructor(p:AP){
//   this.props =p
//   this.state={...p as any}
// }
// setState(s:Partial<AS>) {}
// }


// interface P{
//   image: string
//   working? : string
// }
// interface S extends P{
// }

// class App1 extends AbstractComponent<P,S>{
//   protected win: gui.Window = null as any
//   protected content: gui.Container = null as any
//   protected sidebar: gui.Container = null as any
//   protected open: gui.Button = null as any
//   protected save: gui.Button = null as any
//   protected filename = ''
//   protected folder = ''
//   protected canvas: gui.Canvas = null as any
//   protected image: gui.Image = null as any
// protected  menu: gui.MenuBar = null as any
// protected  menuPanel: gui.Container = null as any
//  protected bodyPanel: gui.Container = null as any
//  protected canvasPanel: gui.Container= null as any

//   render() {
//     this.createWindow()
//     this.createSidebar()
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
//     this.content.setStyle({ flexgrow: 1 , flex: 1, flexDirection: 'column'})
//     this.menuPanel=gui.Container.create()
//     this.menuPanel.setStyle({width: '100%', flex: 0,height: 40, flexDirection: 'row'})
//     this.menuPanel.setBackgroundColor('gray')
//     this.bodyPanel=gui.Container.create()
//     this.bodyPanel.setStyle({width: '100%', flex: 1, height: '100%',flexgrow: 1, flexDirection: 'row'})
// this.content.addChildView(this.menuPanel)
// this.content.addChildView(this.bodyPanel)

//     this.win = gui.Window.create({})
//     this.win.setContentView(this.content)
//     this.win.onClose = function () { gui.MessageLoop.quit() }
//     this.win.setContentSize({ width: 600, height: 600 })
//     // gui.app.getApplicationMenu().
//   }

//   protected createCanvas() {
// this.canvasPanel = gui.Container.create()
//   this.canvasPanel.setStyle({flex: 1, flexgrow: 1, width: '100%', height:'100%', flexDirection: 'column'})
//   this.bodyPanel.addChildView(this.canvasPanel)
//   // this.canvasPanel.setStyle({})
//     const imgSize = { width: 400, height: 400 }
//     this.canvas = gui.Canvas.create(imgSize, 1)
//     this.image = gui.Image.createFromPath(this.props.image)
//     this.canvas.getPainter().drawImage(this.image, {x: 0, y: 0, ...imgSize })
//     this.bodyPanel.onDraw = (self, painter, dirty) => {
//       console.log(this.canvasPanel.getBounds());

//       painter.drawCanvasFromRect(this.canvas, dirty, this.canvasPanel.getBounds())
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
//     this.sidebar.setStyle({ paddingRight: 25, paddingLeft: 10 })
//     this.sidebar.setStyle({ height: '100%', flexshrink: 1,  flexDirection: 'column', width: 90})


//     this.open = gui.Button.create('Open')
//     this.open.setStyle({ marginBottom: 5 , maxWidth: 80})
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
//     this.save.setStyle({ maxWidth: 80})
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

//     this.sidebar.setStyle({ width: this.sidebar.getPreferredSize().width })
//     this.bodyPanel.addChildView(this.sidebar)
//   }
// }

// new App1({image: 'test/assets/lenna.jpg', working: 'Loading libraries'}).render()

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
