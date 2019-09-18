// inheritance from natives - but i need to use mixing 
import * as gui from 'gui'
import { SideBar } from './sideBar'
import { AbstractComponent } from './abstractComponent'

interface P {
  image: string
  working?: string
}

interface S extends P {
}

class App1 extends AbstractComponent<P, S>{
  protected win: gui.Window = null as any
  protected content: gui.Container = null as any
  protected canvas: gui.Canvas = null as any
  protected image: gui.Image = null as any
  protected menu: gui.MenuBar = null as any
  protected menuPanel: gui.Container = null as any
  protected bodyPanel: gui.Container = null as any
  protected canvasPanel: gui.Container = null as any
  protected sideBar: SideBar = null as any

  render() {
    this.createWindow()
    this.createSidebar()
    this.createCanvas()
    this.createMenu()
    this.start()
  }
  
  createMenu() {
    // throw new Error('Method not implemented.');
  }

  start() {
    this.win.center()
    this.win.activate()
    if (!(process.versions as any).yode) {
      gui.MessageLoop.run()
      process.exit(0)
    }
  }

  protected createWindow() {
    this.content = gui.Container.create()
    this.content.setBackgroundColor('#FFF')
    this.content.setStyle({ flexgrow: 1, flex: 1, flexdirection: 'column' })
    this.menuPanel = gui.Container.create()
    this.menuPanel.setStyle({ width: '100%', flex: 0, height: 40, flexdirection: 'row' })
    this.menuPanel.setBackgroundColor('gray')
    this.bodyPanel = gui.Container.create()
    this.bodyPanel.setStyle({ width: '100%', flex: 1, height: '100%', flexgrow: 1, flexdirection: 'row' })
    this.content.addChildView(this.menuPanel)
    this.content.addChildView(this.bodyPanel)

    this.win = gui.Window.create({})
    this.win.setContentView(this.content)
    this.win.onClose = function () { gui.MessageLoop.quit() }
    this.win.setContentSize({ width: 600, height: 600 })
  }

  protected createCanvas() {
    this.canvasPanel = gui.Container.create()
    this.canvasPanel.setStyle({ flex: 1, flexgrow: 1, width: '100%', height: '100%', flexdirection: 'column' })
    this.bodyPanel.addChildView(this.canvasPanel)
    const imgSize = { width: 400, height: 400 }
    this.canvas = gui.Canvas.create(imgSize, 1)
    this.image = gui.Image.createFromPath(this.props.image)
    this.canvas.getPainter().drawImage(this.image, { x: 0, y: 0, ...imgSize })
    this.bodyPanel.onDraw = (self, painter, dirty) => {
      painter.drawCanvasFromRect(this.canvas, dirty, this.canvasPanel.getBounds())
    }
  }

  protected createSidebar() {
    this.sideBar = new SideBar({ win: this.win })
    this.bodyPanel.addChildView(this.sideBar.view)
  }
}

new App1({ image: 'test/assets/lenna.jpg', working: 'Loading libraries' }).render()

interface CP {
  win: gui.Window;
}

export class Menu extends AbstractComponent<CP> {
  view: gui.Container = null as any;
  open: gui.Button = null as any;
  save: gui.Button = null as any;
  filename = '';
  folder = '';
  constructor(p: CP) {
    super(p)
    this.view = gui.Container.create()
    this.view.setStyle({width: '100%'})
    // this.working = gui.Label.create(this.state.)
  }
}