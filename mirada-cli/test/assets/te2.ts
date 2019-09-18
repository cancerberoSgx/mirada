import * as gui from 'gui'
import { dirname, basename } from 'misc-utils-of-mine-generic'
import { readFileSync, writeFileSync } from 'fs'

// const gui = require('gui')x


const menu = gui.MenuBar.create([
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        onClick: () => gui.MessageLoop.quit()
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'copy' },
      { role: 'cut' },
      { role: 'paste' },
      { role: 'select-all' },
      { type: 'separator' },
      { role: 'undo' },
      { role: 'redo' },
    ],
  },
])
const win = gui.Window.create({showTrafficLights: true, transparent: false, frame: true})
win.setContentSize({width: 400, height: 400})
win.onClose = () => gui.MessageLoop.quit()

const contentView = gui.Container.create()
contentView.setStyle({flexDirection: 'row'})
win.setContentView(contentView)
 
let sidebar
  sidebar = gui.Container.create()

 if (process.platform == 'darwin') {
  sidebar = gui.Vibrant.create()
  sidebar.setBlendingMode('behind-window')
  sidebar.setMaterial('dark')
} else {
  sidebar = gui.Container.create()
}
sidebar.setStyle({padding: 15})
contentView.addChildView(sidebar)

// const image = gui.Image.createFromPath('/d.png')
const player = gui.GifPlayer.create();
player.setImage(gui.Image.createFromPath(__dirname + '/d.png'))
player.setStyle({flex: 1})
contentView.addChildView(player)

const edit = gui.TextEdit.create()
edit.setStyle({flex: 1})
contentView.addChildView(edit)
edit.setText('seba')
// const image = gui.Image.createFromPath('/d.png')
//image.setStyle({flex: 1})
// contentView.addChildView(image)

// const label = gui.Label.create('Hello')
 
let filename:string
let folder:string

const open = gui.Button.create('Open')
// open.setImage(gui.Image.createFromPath(__dirname + '/d.png'))
open.setStyle({marginBottom: 5})
open.onClick = () => {
  const dialog = gui.FileOpenDialog.create()
  dialog.setOptions(gui.FileDialog.optionShowHidden)
  dialog.setFilters([
    { description: 'All Files', extensions: ['*'] },
    { description: 'JavaScript Files', extensions: ['js'] },
  ])
  if (dialog.runForWindow(win)) {
    const p = dialog.getResult()
    folder = dirname(p)
    filename = basename(p)
    edit.setText(String(readFileSync(p)))
    edit.focus()
    win.setTitle(filename)
  }
}
sidebar.addChildView(open)

const save = gui.Button.create('Save')
save.setImage(gui.Image.createFromPath(__dirname + '/esave@2x.png'))
save.onClick = () => {
  if (!folder)
    return
  const dialog = gui.FileSaveDialog.create()
  dialog.setFolder(folder)
  dialog.setFilename(filename)
  if (dialog.runForWindow(win)) {
    writeFileSync(String(dialog.getResult()), edit.getText())
  }
}
sidebar.addChildView(save)

sidebar.setStyle({width: sidebar.getPreferredSize().width})

if (process.platform == 'darwin')
  gui.app.setApplicationMenu(menu)
else
  win.setMenuBar(menu)
  debugger
  
win.center()
win.activate()

if (!(process.versions as any).yode) {
  gui.MessageLoop.run()
  process.exit(0)
}

// class I extends gui.Container {
//   a(){
//     this.
//   }
// }