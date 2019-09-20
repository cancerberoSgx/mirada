import * as gui from 'gui'
import { File, mainSync } from 'magica'
import { int, sleep} from 'misc-utils-of-mine-generic'
import { basename, dirname } from 'path'
import { StateComponent } from "./abstractComponent"
import { buildBuffers, log } from './state'

interface CP {
  win: gui.Window
}

export class SideBar extends StateComponent<CP> {
  protected view: gui.Container = null as any;
  protected open: gui.Button = null as any;
  protected save: gui.Button = null as any;
  protected test: gui.Button = null as any;

  render() {
    // if (process.platform == 'darwin') {
    //   const v = gui.Vibrant.create()
    //   v.setBlendingMode('behind-window')
    //   v.setMaterial('dark')
    //   this.view = v
    // }
    // else {
      this.view = gui.Container.create()
    // }
    this.view.setStyle({
      width: 160, height: '100%', flexDirection: 'column', alignContent: "baseline"
    })

    this.getOpen()
    this.getSave()
    this.getTest()
    this.view.setStyle({
      width: this.view.getPreferredSize().width
    })
    return this.view
  }

  protected getSave() {
    this.save = gui.Button.create('Save')
    this.save.setStyle({ maxWidth: 80 })
    this.save.onClick= () => {
      const dialog = gui.FileSaveDialog.create()
      dialog.setFolder(dirname(this.state.image))
      dialog.setFilename(basename(this.state.image))
      if (dialog.runForWindow(this.props.win)) {
      }
    }
    this.view.addChildView(this.save)
  }

  protected getOpen() {
    this.open = gui.Button.create('Open')
    this.open.setStyle({ maxWidth: 80 })
    this.open.onClick = () => {
      const dialog = gui.FileOpenDialog.create()
      dialog.setOptions(gui.FileDialog.optionShowHidden)
      dialog.setFilters([
        { description: 'Images', extensions: ['jpg', 'png', 'gif', 'webp'] },
      ])
      if (dialog.runForWindow(this.props.win)) {
        this.setState(buildBuffers(dialog.getResult()))
      }
    }
    this.view.addChildView(this.open)
  }

  protected getTest() {
    var rotateSlider = gui.Slider.create()
    rotateSlider.setRange(0, 360)
    rotateSlider.setStep(1)
    rotateSlider.setStyle({
       width: '100%'
    })
    rotateSlider.onValueChange=()=>{
      this.rotate(rotateSlider.getValue())
    }
    this.view.addChildView(rotateSlider)
    var test = gui.Button.create('Test')
    test.setStyle({width: '100%'})
    // test.onMouseUp=()=>this.test3()
   test.onClick = ()=>this.test3()
    this.view.addChildView(test)

   const b = gui.Browser.create({})
  b.setStyle({width: '100%',height: '100%', flex: 1})
  // b.loadURL('https://libyue.com/docs/latest/js/api/browser.html')
  b.loadHTML(this.getHtml(), 'http://localhost')
  b.addBinding('onChange1', value=>this.rotate(value))
    this.view.addChildView(b)
//  var test2 = gui.Button.create('Test2')
    // test2.setStyle({width: '100%'})
    // this.view.addChildView(test2)
    // test.onClick=()=>this.test3()
//     test.onClick =   () => {

// // console.log(!!gui.app);

// // gui.MessageLoop.postTask(()=>{
// //   //  this.setState()
// //         this.rotate()
// // }) 
// new Promise(resolve=>setTimeout(resolve, 1000)).then(()=>{
//     this.test2()
// })
//       sleep(500).then(()=>{
//     this.test2() 
// })
//       // })

//       // await sleep(1000)
//   //     setTimeout(() => {
//   // console.log(!!gui.app);
//   //   console.log('ses');
//   //   this.test2()
    
//   //     }, 1222);

//         setTimeout(() => {
//     this.test2()
//       }, 1222);

//     }
  }

  private getHtml() {
    return `
Rotate:<br/>
<input type="range" value="22"/>
<script>
document.querySelector('input').addEventListener('change', e=>onChange1(e.currentTarget.value))
</script>
  `;
  }

async test3(){
  // this.test2()
            log('1');  
  await sleep(500)
  this.test2()
            // log('2'); 

}
private test2(){
//         sleep(500).then(()=>{
//            console.log('s2222');  
// })
        const w = gui.Window.create({frame: true, showTrafficLights: true})
      w.setAlwaysOnTop(true)
      w.setContentSize({width: 200, height: 200})
      w.setTitle('jejjeeje')
      // this.props.win.addChildWindow(w)
      const p = gui.Container.create()
      p.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' })
      const l = gui.Label.create('hello')
      
      p.setStyle({flex: 1})
      p.addChildView(l)
      w.setContentView(p)
      // w.setVisible(true)
      w.center()
      w.activate() 
}
  private rotate(value=int(0,  360)) {
    // gui.MessageLoop
    // this.setState({ working: 'Processing' });
    try {
      const result = mainSync({
        command: ['convert', 'output.miff', '-rotate', value+'', `output_${basename(this.state.image)}`],
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
        // debug: true
      });
      this.setState({ 
        currentBuffer: result.outputFiles[0].content, 
      working: undefined, 
      time: result.times?result.times.total :0
      });
    }
    catch (error) {
      console.error(error);
      this.setState({ working: undefined });
    }
  }
}
