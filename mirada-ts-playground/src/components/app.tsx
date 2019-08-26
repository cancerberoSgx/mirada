import * as React from 'react'
import withStyles, { WithSheet } from 'react-jss'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { executeSelectedExample } from '../store/dispatch/executeSelectedExample'
import { State } from '../store/types'
import { commonStyles } from '../theme/style'
import { Theme } from '../theme/theme'
import { Editor } from './editor'
import { Examples } from './examples'
import { Files } from './files'
import { ForkRibbon } from './forkRibbon'
import { Header } from './header'
import { Output } from './output'

interface P extends WithSheet<typeof styles>, RouteComponentProps<any> {
  state: State
}

class App_ extends React.Component<P, {}> {
  render() {
    const { classes, state } = this.props
    return (
      <article className={classes.root}>
        <ForkRibbon />
        <Header {...(this.props as any)} />
        <div className={classes.wrapper}>
          <div className={classes.examples}>
            <Examples />
          </div>
          <div className={classes.files}>
            <Files />
          </div>
          <div className={classes.examplesEditor}>
            {state.selectedFile && <button onClick={ev => executeSelectedExample(state)}>Execute</button>}
            <Editor />
          </div>
          {state.output && state.output.text && (
            <div className={classes.output}>
              <Output />
            </div>
          )}
        </div>
      </article>
    )
  }
}

const mapStateToProps = (state: State) => ({
  state: state
})

const styles = (theme: Theme) => ({
  ...commonStyles(theme),
  root: {
    backgroundColor: theme.backgroundColor,
    color: theme.foregroundColor,
    margin: 0,
    padding: '0.3em 1em'
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '10px',
    gridAutoRows: 'minmax(100px, auto)',
    paddingTop: '3em'
  },
  examples: {
    gridColumn: '1/3',
    gridRow: 1
  },
  files: {
    gridColumn: '3/4',
    gridRow: 1
  },
  examplesEditor: {
    gridColumn: '1/3',
    gridRow: 2
  },
  output: {
    gridColumn: '3/4',
    gridRow: 2
  }
})

export const App = withStyles(styles)(connect(mapStateToProps)(App_))
