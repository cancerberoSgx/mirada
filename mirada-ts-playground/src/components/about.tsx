import * as React from 'react'
import { AbstractComponent } from '../util/component'

export class About extends AbstractComponent {
  render() {
    return (
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
              Welcome to <a href="https://github.com/cancerberosgx/mirada">mirada</a> TypeScript playground, where you
              can edit and run opencv.js with TypeScript, execute and experience online editing autocompletion, and
              inline documentation of the Openvc.js typings I'm implementing.
              </p>
            <p>
              <a href="https://github.com/cancerberosgx/mirada">mirada</a> is an attempt to author TypeScript type
              definitions for Opencv.js. CUrgently they are generated automatically and I since I still have some
              doubts I wanted more experienced opencv users to be able to test them easily online and give me
              feedback.
              </p>
            <p>
              <strong>IMPORTANT</strong>: In the examples the global variables <code>cv</code> and <code>Mirada</code>
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
    )
  }
}

