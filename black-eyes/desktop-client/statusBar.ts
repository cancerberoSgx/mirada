import * as gui from 'gui'
import { StateComponent } from './abstractComponent'
import { CommonProps } from './app'
import { printMs } from 'misc-utils-of-mine-generic'
import { State } from './state'

type RP = 'working'|'time'

export class StatusBar extends StateComponent<CommonProps> {
  protected view: gui.Container = null as any;
  protected relevantProperties: RP[] = ['working', 'time']
  protected working: gui.Label = null as any;
  protected time: gui.Label = null as any;

  render() {
    this.view = gui.Container.create()
    this.view.setStyle({ width: '100%', minHeight: 44, flex: 1 })
    this.working = gui.Label.create(this.state.working || '')
    this.view.addChildView(this.working)
    this.time = gui.Label.create(printMs(this.state.time) || '')
    this.view.addChildView(this.time)
    return this.view
  }

  protected stateChanged(names: RP[], s: Partial<State>) {
    s.working && this.working.setBackgroundColor('#ed2266')
    !s.working && this.working.setBackgroundColor('#ededed')    
    this.working.setText(s.working || 'Idle')
    this.working.setText( printMs(this.state.time) || '')
   
  }
}
