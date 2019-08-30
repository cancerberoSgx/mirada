import * as React from 'react'
import { ForkRibbon } from '../util/forkRibbon'
import { Header } from './header'
import './styles.css'

// this is not a component on purpose so react doesn't touch the DOM around our canvas
export const App = () => (
  <article>
    <ForkRibbon />
    <Header />
    <div className="gridWrapper">
      <div className="editor">
        <div id="editorContainer" />
      </div>
      <div id="outputContainer" className="output">
        <div className="wrapper">
          <canvas id="outputCanvas" width="400" height="400" />
          <video id="videoInput" width="320" height="240" muted />
        </div>
      </div>
    </div>
  </article>
)
