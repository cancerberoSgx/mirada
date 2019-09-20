import * as gui from 'gui'
import { SideBar } from './sideBar'
import { AbstractComponent, StateComponent } from './abstractComponent'
import { StatusBar } from './statusBar'
import { Menu } from './menu'
import { State } from './state'
import { Canvas } from './canvas'
import { handlers } from './main'
type RP ='image'

export class App1 extends StateComponent {

  protected win: gui.Window = null as any
  protected content: gui.Container = null as any
  canvas: Canvas= null as any
  protected menuPanel: gui.Container = null as any
  protected bodyPanel: gui.Container = null as any
  protected sideBar: gui.Container = null as any
  protected  relevantProperties:RP[] = ['image' ]  
  protected menu: gui.Container = null as any

  render() {
    this.createWindow()
    this.menu = new StatusBar().render()
    this.menuPanel.addChildView(this.menu)
    this.sideBar = new SideBar({ win: this.win }).render()
    this.bodyPanel.addChildView(this.sideBar)
    this.canvas = new Canvas({ win: this.win })    
    this.bodyPanel.addChildView(this.canvas.render())
    const menubar = new Menu()
    if (process.platform !== 'darwin') {
      this.win.setMenuBar(menubar.menu)
    }
    else {
      gui.app.setApplicationMenu(menubar.menu)
    }
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
    this.win.setTitleVisible(true)
    this.win.setTitle('Hello there!')
    this.win.setContentView(this.content)
    this.win.onClose = function () { gui.MessageLoop.quit() }
    this.win.setContentSize({ width: 600, height: 600 })
  }

protected stateChanged(names: RP[], s:Partial<State>) {
  if(names.includes('image')&&s['image']){
  this.win.setTitle(s['image']);
  } 
  } 
}

export interface CommonProps {
  win: gui.Window;
}

// export class Loop {
//   timer: NodeJS.Timeout=null as any
//   start() {
//     this.timer = setInterval(()=>{
//       gui.MessageLoop.postTask(()=>this.handler()) 
//     }, 1000)
//   }
//   stop(){
//     clearInterval(this.timer)
//   }
//   handler(): void {
//     // 
//     // throw new Error('Method not implemented.');
//   }
// }

// class MyPanel extends gui.Container {
//   //@ts-ign ore
// constructor(){
//   super()
// //instantiate children, pass data, declare layout rules, here,
// }
// someEventHandlers(){
//   console.log(this.getBounds());
  
// // this.perhapsAccessingChildrenOrParent()
// }
// }