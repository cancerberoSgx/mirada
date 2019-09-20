import * as gui from 'gui'
import { File, mainSync, knownSupportedReadWriteImageFormats } from 'magica'
import { int, sleep } from 'misc-utils-of-mine-generic'
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
  protected options: gui.Browser = null as any;

  render() {
    this.view = gui.Container.create()
    this.view.setStyle({
      width: 160, height: '100%', flexDirection: 'column', alignContent: "baseline"
    })
    this.getOptions()
    this.view.setStyle({
      width: this.view.getPreferredSize().width
    })
    return this.view
  }

  handleOpen(): void {
    const dialog = gui.FileOpenDialog.create()
    dialog.setOptions(gui.FileDialog.optionShowHidden)
    dialog.setFilters([
      { description: 'Images', extensions: knownSupportedReadWriteImageFormats },
    ])
    if (dialog.runForWindow(this.props.win)) {
      this.setState(buildBuffers(dialog.getResult()))
    }
  }

  protected getOptions() {
    this.options = gui.Browser.create({})
    this.options.setStyle({ width: '100%', height: '100%', flex: 1 })
    this.options.setBindingName('app1')
    this.options.addBinding('handleRotate', value => this.handleRotate(value))
    this.options.addBinding('handleOpen', value => this.handleOpen())
    this.options.addBinding('handleResize', (width, height) => this.handleResize(width, height))
    this.view.addChildView(this.options)
    this.renderOptions()
  }

  protected renderOptions() {
    const html =  `
    <button onClick="app1.handleOpen()">Open</button><br/>
    <button onClick="app1.handleSave()">Save</button><br/>
    Rotate:<br/>
    <input type="range" value="22" onChange="app1.handleRotate(this.value)" min="0" max="360"/>
    Width:<br/>
    <input step="20" type="number" value="${this.state.imageSize.width}" onChange="app1.handleResize(this.value, undefined)" />
    Height:<br/>
    <input step="10" type="number" value="${this.state.imageSize.height}" onChange="app1.handleResize(undefined, this.value)" />
    `
    this.options.loadHTML(html, 'http://localhost')
  }

  protected handleRotate(value = int(0, 360)) {
    try {
      const result = mainSync({
        command: ['convert', 'output.miff', '-rotate', value + '', `output.png`],
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      });
      this.setState({
        currentBuffer: result.outputFiles[0].content,
        working: undefined,
        time: result.times ? result.times.total : 0
      });
    }
    catch (error) {
      console.error(error);
      this.setState({ working: undefined });
    }
  }
  protected handleResize(width: number, height: number) {
    try {
      const result = mainSync({
        command: ['convert', 'output.miff', '-scale', `!${width||this.state.imageSize.width}x${height||this.state.imageSize.height}`, `output.png`],
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      });
      this.setState({
        currentBuffer: result.outputFiles[0].content,
        working: undefined,
        time: result.times ? result.times.total : 0
      });
    }
    catch (error) {
      console.error(error);
      this.setState({ working: undefined });
    }
  }
}
