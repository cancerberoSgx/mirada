import * as gui from 'gui'

export class Menu {
  menu: gui.MenuBar

  constructor() {
    const menus: gui.MenuItemOptions[] = []
    menus.push({
      label: 'productName',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+Shift+R',
          onClick() {
          },
        },
        { type: 'separator' },
        {
          label: 'Disconnect',
          onClick() {
          }
        },
        {
          label: 'Collect Garbage',
          accelerator: 'CmdOrCtrl+Shift+G',
          onClick() {
          },
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          onClick() { 
            gui.MessageLoop.quit()
          },
        },
      ],
    })

    // macOS specific app menus.
    if (process.platform === 'darwin') {
      menus[0].submenu!.splice(menus[0].submenu!.length - 2, 0, { type: 'separator' }, { role: 'hide' }, { role: 'hide-others' }, { type: 'separator' })
    }

    // Edit menu.
    menus.push({
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'select-all' },
      ],
    })

    // this.accountsMenu = gui.Menu.create([      {        type: 'separator'       }    ])
    // for (let i = 0; i < 3; ++i)
    //   this.addAccount( i, 'asd')
    // for (const service of [{name:'12'},{ name: '2'}]) {
    //   this.accountsMenu.append(gui.MenuItem.create({
    //     label: 'Login to ' + service.name,
    //     onClick: ()=>{},
    //   }))
    // }
    // menus.push({label: 'Accounts', submenu: this.accountsMenu})
    menus.push({
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'New Window',
          accelerator: 'CmdOrCtrl+Shift+N',
          onClick(){}
        },
        {
          label: 'Close Window',
          accelerator: 'CmdOrCtrl+W',
          onClick: () => {
            gui.MessageLoop.quit()
          }
        },
      ],
    })

    // Create the native menu.
    this.menu = gui.MenuBar.create(menus)
  }
 
}
