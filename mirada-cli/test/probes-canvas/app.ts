// inheritance from natives - but i need to use mixing 
import * as gui from 'gui'
import { SideBar } from './sideBar'
import { AbstractComponent, StateComponent } from './abstractComponent'

interface P {
  image: string
  working?: string
}

export class App1 extends StateComponent {
  protected win: gui.Window = null as any
  protected content: gui.Container = null as any
  protected canvas: gui.Canvas = null as any
  protected image: gui.Image = null as any
  // protected menu: gui.MenuBar = null as any
  protected menuPanel: gui.Container = null as any
  protected bodyPanel: gui.Container = null as any
  protected canvasPanel: gui.Container = null as any
  protected sideBar: gui.Container = null as any
  menu: gui.Container= null as any

  render() {
    this.createWindow() 
    this.menu = new Menu().render()
    this.menuPanel.addChildView(this.menu)
     this.sideBar = new SideBar({ win: this.win }).render()
    this.bodyPanel.addChildView(this.sideBar)
    this.createCanvas() 

    this.start()
    return this.content
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
    this.image = gui.Image.createFromPath(this.state.image)
    this.canvas.getPainter().drawImage(this.image, { x: 0, y: 0, ...imgSize })
    this.bodyPanel.onDraw = (self, painter, dirty) => {
      painter.drawCanvasFromRect(this.canvas, dirty, this.canvasPanel.getBounds())
    }
  }

  protected createSidebar() {
   
  }
}


interface CP {
  win: gui.Window;
}

export class Menu extends StateComponent<CP> {
  view: gui.Container = null as any;
  relevantState=['warning']
  warning: gui.Label = null as any
  render(){
    this.view = gui.Container.create()
    this.view.setStyle({width: '100%', minheight: 44, flex: 1})
    this.view.setBackgroundColor('#ed2266')
    console.log(this.state.working);
    
    this.warning = gui.Label.create(this.state.working||'')
    // var b = gui.Button
    this.view.addChildView(this.warning)
    return this.view
  }
}