import * as React from 'react'
import { AbstractComponent } from '../util/component'
import { getEditorText } from '../monaco/monaco'
import { File } from 'mirada'
import { memoryReport } from '../util/misc'
import { printMs } from 'misc-utils-of-mine-generic'

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
    document.onkeydown = function(e) {
      if (e.keyCode == 27) {
        var mods = document.querySelectorAll('.modal > [type=checkbox]')
        ;[].forEach.call(mods, function(mod: any) {
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
          {/* <Link className="button" to={'/state/' + stateToString(state)}>
            Create Url
          </Link> */}
        </nav>

        <div className="modal">
          <input id="whats_this_modal" type="checkbox" />
          <label htmlFor="whats_this_modal" className="overlay" />
          <article>
            <header>
              <h3>ts-morph playground</h3>
              <label htmlFor="whats_this_modal" className="close">
                &times;
              </label>
            </header>
            <section className="content">
              <p>
                {' '}
                Welcome to <a href="https://github.com/cancerberosgx/mirada">mirada</a> TypeScript playground, where you
                can edit and run opencv.js with TypeScript, execute and experience online editing autocompletion, and
                inline documentation of the Openvc.js typings I'm implementing.
              </p>
              <p>
                {' '}
                <a href="https://github.com/cancerberosgx/mirada">mirada</a> is an attempt to author TypeScript type
                definitions for Opencv.js. CUrgently they are generated automatically and I since I still have some
                doubts I wanted more experienced opencv users to be able to test them easily online and give me
                feedback.
              </p>
              <p>
                <strong>IMPORTANT</strong>: In the examples the global variables <code>cv</code> and <code>Mirada</code>{' '}
                must be used. Imported object won't work. This is currently a limitation of this playground and not
                opencv.js or Mirada, since the code is tranpiled from TypeScript and evaluated dynamically so there's no
                easy way to support local scope references.
              </p>
              <p>
                It uses monaco-editor which is the same technology used by vscode desktop editor so the experience
                should be similar. Please let me know if you have any feedback, ideas or comments. The ultimate
                objective is to contribute with these type definitions to opencv project.
              </p>
              <p>I hope you find this page useful, enjoy</p>
            </section>

            <footer>
              <label htmlFor="whats_this_modal" className="button warning">
                OK
              </label>
            </footer>
          </article>
        </div>
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
