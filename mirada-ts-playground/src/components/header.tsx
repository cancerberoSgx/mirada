import { File } from 'mirada'
import { printMs } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { getEditorText } from '../monaco/monaco'
import { AbstractComponent } from '../util/component'
import { memoryReport } from '../util/misc'
import { About } from './about'

export class Header extends AbstractComponent {
  timer: NodeJS.Timeout | undefined
  memEl: HTMLElement | null = null

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  updateMem(): void {
    if (this.memEl) {
      this.memEl.innerHTML = memoryReport().usedMb + ' ' + memoryReport().percent
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => this.updateMem(), 1000)
    document.onkeydown = function (e) {
      if (e.keyCode == 27) {
        var mods = document.querySelectorAll('.modal > [type=checkbox]')
          ;[].forEach.call(mods, function (mod: any) {
            mod.checked = false
          })
      }
    }
  }

  render() {
    return (
      <div className="header">
        <nav>
          <label>
            Examples:{' '}
            <select
              className="button"
              onChange={e =>
                this.setState({ example: this.state.examples.find(t => t.name === e.currentTarget.value)! })
              }>
              {this.state.examples.map(t => (
                <option key={t.name} value={t.name} selected={this.state.example.name === t.name}>
                  {' '}
                  {t.name}{' '}
                </option>
              ))}
            </select>
          </label>

          <button onClick={e => this.setState({ executeRequest: true, working: true, code: getEditorText() })}>
            Execute!
          </button>

          <input
            type="file"
            onChange={async e => handleInputFiles(await File.fromHtmlFileInputElement(e.currentTarget))}
          />

          <span className={this.state.working ? 'working' : ''}>
            {this.state.working ? <span>WORKING</span> : 'IDLE'}
          </span>
          <span>
            {' '}
            <span>{(this.state.result && this.state.result.time && printMs(this.state.result.time)) || ''}</span>
            <span ref={c => (this.memEl = c)} />{' '}
          </span>

          <label htmlFor="whats_this_modal" className="button whats_this_modal">
            What's this?
          </label>
        </nav>

        <About />

      </div>
    )
  }
}

async function handleInputFiles(files: File[]) {
  const file = files.find(f => ['image/jpeg', 'image/png'].includes(f.getMimeType() + ''))
  if (file) {
    file.show(document.getElementById('outputCanvas')! as any)
  }
}
