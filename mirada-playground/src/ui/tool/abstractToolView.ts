import { AbstractComponent } from '../common/component'
import { Tool } from './tool'

export abstract class AbstractToolView extends AbstractComponent {

  abstract toolName: string

  _tool: Tool | undefined

  protected getTool() {
    if (!this._tool) {
      this._tool = this.state.tools.find(d => d.name === this.toolName)
    }
    return this._tool
  }

}


