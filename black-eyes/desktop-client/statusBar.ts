import * as gui from 'gui'
import { StateComponent } from './abstractComponent'
import { CommonProps } from './app'
import { State } from './state'

type RP = 'working'
export class StatusBar extends StateComponent<CommonProps> {
  protected view: gui.Container = null as any;
  protected relevantProperties: RP[] = ['working']
  protected warning: gui.Label = null as any;

  render() {
    this.view = gui.Container.create()
    this.view.setStyle({ width: '100%', minheight: 44, flex: 1 })
    this.view.setBackgroundColor('#ed2266')
    this.warning = gui.Label.create(this.state.working || '')
    this.view.addChildView(this.warning)
    return this.view
  }

  protected stateChanged(names: RP[], s: Partial<State>) {
    this.warning.setText(s['working'] || 'Idle')
  }
}
