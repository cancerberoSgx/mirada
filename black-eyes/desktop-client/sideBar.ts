import { AbstractComponent, StateComponent } from "./abstractComponent";
import * as gui from 'gui'
import { dirname, basename, resolve } from 'path';
import { magickLoaded, mainSync, File } from 'magica';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { handlers, app } from './main';

interface CP {
  win: gui.Window
}

export class SideBar extends StateComponent<CP> {
protected  view: gui.Container = null as any;
 protected open: gui.Button = null as any;
 protected save: gui.Button = null as any;
 protected test: gui.Button= null as any;

  render() {
    if (process.platform == 'darwin') {
      const v = gui.Vibrant.create();
      v.setBlendingMode('behind-window');
      v.setMaterial('dark');
      this.view = v;
    }
    else {
      this.view = gui.Container.create();
    }
    this.view.setStyle({
      width: '100%', height: '100%', paddingleft: 4, paddingright: 30, flexdirection: 'column'
    })
    this.getOpen();
    this.getSave();
    this.getTest()
    this.view.setStyle({
      width: this.view.getPreferredSize().width
    });
    return this.view
  }

  protected getSave() {
    this.save = gui.Button.create('Save');
    this.save.setStyle({ maxwidth: 80 });
    this.save.onClick = () => {
      const dialog = gui.FileSaveDialog.create();
      dialog.setFolder(dirname(this.state.image));
      dialog.setFilename(basename(this.state.image));
      if (dialog.runForWindow(this.props.win)) {
      }
    };
    this.view.addChildView(this.save);
  }

  protected getOpen() {
    this.open = gui.Button.create('Open');
    this.open.setStyle({ margin: { bottom: 5 }, maxwidth: 80 });
    this.open.onClick = () => {
      const dialog = gui.FileOpenDialog.create();
      dialog.setOptions(gui.FileDialog.optionShowHidden);
      dialog.setFilename(this.state.image)
      dialog.setFilters([
        { description: 'Images', extensions: ['jpg', 'png', 'gif', 'webp'] },
      ]);
      if (dialog.runForWindow(this.props.win)) {
        this.setState({ image: dialog.getResult() })
      }
    }
    this.view.addChildView(this.open);
  }

  protected getTest() {
    this.test = gui.Button.create('Test');
    this.test.setStyle({ maxwidth: 80 });
    this.test.onClick = () => {      
      this.setState({working: 'Processing'})
      try {
        const name = `${basename(this.state.image)}`
        const result = mainSync({
          command : `convert ${name} -rotate 33 output_${basename(this.state.image)}`,
          inputFiles: [new File(name, this.state.imageBuffer)],
        })
        this.setState({imageBuffer: result.outputFiles[0].content})
      } catch (error) {
        console.error(error);        
      this.setState({working:undefined})
      } 
      this.setState({working:undefined})

    // gui.MessageLoop.postTask(()=>{
    //     console.log(', cv', typeof cv);
    //   gui.MessageLoop.postDelayedTask(12000, ()=>{
    //            console.log(', cv', typeof cv);
    //     gui.MessageLoop.postDelayedTask(12000, ()=>{   
    //                   console.log(', cv', typeof cv);
    //     })
    //   })
    //   handlers.loadLibraries()
    // })


//       gui.MessageLoop.postTask(async ()=>{
//  // this.setState({working: 'test'})
//       console.log('before');
      
//       try {
//       // await magickLoaded
//       const inputFiles = [await File.fromFile(this.state.image)]
//       console.log(inputFiles);
//       } catch (error) {
//         console.error(error);
//       }
//       console.log('after');
//       })
     
      
      // const r = await run({
      //   script: `convert ${basename(this.state.image)} -rotate 33 out.png`,
      //   inputFiles
      // })
      // if(!r.error&& r.outputFiles.length){
      //   console.log(r);
      //   mkdirSync('tmp', {recursive: true})
      //   const image =`tmp/${basename(r.outputFiles[0].name)}`
      //   writeFileSync(image, r.outputFiles[0].content)
      //   console.log(resolve(image));
      //   // this.setState({image})
      // }
      // else {
      //   console.error('Error', r.error, r.outputFiles.length);        
      // }
    }
    this.view.addChildView(this.test);
  }

}
