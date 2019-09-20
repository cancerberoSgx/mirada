import { dirname } from 'path'
import { basename } from 'misc-utils-of-mine-generic'
import { AbstractComponent, StateComponent } from "./abstractComponent";
import * as gui from 'gui'

interface CP {
  win: gui.Window
}

// interface CS extends CP {
// }
export class SideBar extends StateComponent<CP> {
  view: gui.Container = null as any;
  open: gui.Button = null as any;
  save: gui.Button = null as any;
  filename = '';
  folder = '';
  
render(){
if (process.platform == 'darwin') {
      const v = gui.Vibrant.create();
      // this.view = gui.Vibrant.create()
      v.setBlendingMode('behind-window');
      v.setMaterial('dark');
      this.view = v;
    }
    else {
      this.view = gui.Container.create();
    }
    this.view.setStyle({
      width: '100%', 
      height: '100%',
      //  flex: 1, 
      // flexgrow: 1, 
       paddingleft: 4, paddingright: 30, flexdirection: 'column'
    })
    this.getopen();
    this.getSave();
    // this.bodyPanel.addChildView(this.view)
    return this.view
}

  private getSave() {
    this.save = gui.Button.create('Save');
    this.save.setStyle({ maxwidth: 80 });
    // save.setImage(gui.Image.createFromPath(__dirname + '/esave@2x.png'))
    this.save.onClick = () => {
      if (!this.folder)
        return;
      const dialog = gui.FileSaveDialog.create();
      dialog.setFolder(this.folder);
      dialog.setFilename(this.filename);
      if (dialog.runForWindow(this.props.win)) {
        //  writeFileSync(String(dialog.getResult()), edit.getText())
      }
    };
    this.view.addChildView(this.save);
    this.view.setStyle({ width: this.view.getPreferredSize().width });
  }

  private getopen() {
    this.open = gui.Button.create('Open');
    this.open.setStyle({ margin: {bottom: 5}, maxwidth: 80 });
    this.open.onClick = () => {
      const dialog = gui.FileOpenDialog.create();
      dialog.setOptions(gui.FileDialog.optionShowHidden);
      dialog.setFilters([
        { description: 'All Files', extensions: ['*'] },
        { description: 'JavaScript Files', extensions: ['js'] },
      ]);
      if (dialog.runForWindow(this.props.win)) {
        const p = dialog.getResult();
        this.folder = dirname(p);
        this.filename = basename(p);
        // edit.setText(String(fs.readFileSync(p)))
        // edit.focus()
        this.props.win.setTitle(this.filename);
      }
    };
    this.view.addChildView(this.open);
  }
}

// interface SideBat extends AbstractComponent<CP, CS>, gui.Container {
// }
// export type AnyFunction<A = any> = (...input: any[]) => A
// export type AnyConstructor<A = object> = new (...input: any[]) => A
// // export type BetterConstructor<A = object, Args=any[]> = new (...input: Args[]) => A
// export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>