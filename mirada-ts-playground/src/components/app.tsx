import * as React from 'react'
import { Examples } from './examples'
import { ForkRibbon } from './forkRibbon'
import { Header } from './header'
import './styles.css'
export const App = () => (
  <article>
    <ForkRibbon />
    <Header />
    <div>
      <div>
        <Examples />
      </div>
      <div>{/* <Files /> */}</div>
      <div>
        {/* {state.selectedFile && <button onClick={ev => executeSelectedExample(state)}>Execute</button>}
            {/* <Editor /> */}
        <div id="editorContainer" />
        <div />
      </div>
      <canvas id="outputCanvas" width="400" height="400"></canvas>
      {/* {state.output && state.output.text && ( */}
      {/* <div className={classes.output}> */}
      {/* <Output /> */}
      {/* </div> */}
      )}
    </div>
  </article>
)
// )
// }
// }

// const mapStateToProps = (state: State) => ({
//   state: state
// })

// const styles = (theme: Theme) => ({
//   ...commonStyles(theme),
//   root: {
//     backgroundColor: theme.backgroundColor,
//     color: theme.foregroundColor,
//     margin: 0,
//     padding: '0.3em 1em'
//   },
//   wrapper: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gridGap: '10px',
//     gridAutoRows: 'minmax(100px, auto)',
//     paddingTop: '3em'
//   },
//   examples: {
//     gridColumn: '1/3',
//     gridRow: 1
//   },
//   files: {
//     gridColumn: '3/5',
//     gridRow: 1
//   },
//   examplesEditor: {
//     gridColumn: '1/3',
//     gridRow: 2
//   },
//   output: {
//     gridColumn: '3/5',
//     gridRow: 2
//   }
// })

// export const App = withStyles(styles)(connect(mapStateToProps)(App_))
