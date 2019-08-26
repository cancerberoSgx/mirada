import * as React from 'react'
import { connect } from 'react-redux'
import { Output as OutputState, State } from '../store/types'
import { Theme } from '../theme/theme'
import withStyles, { WithSheet } from 'react-jss'

interface P extends WithSheet<typeof styles, Theme> {
  output?: OutputState
}

class Output_ extends React.Component<P, {}> {
  render() {
    const { classes } = this.props
    return (
      this.props.output && (
        <article>
          <h3>Execution output</h3>
          <textarea className={classes.textarea} value={this.props.output.text} onChange={e => {}} />
        </article>
      )
    )
  }
}

const mapStateToProps = (state: State) => ({
  output: state.output
})

const styles = (theme: Theme) => ({
  textarea: {
    width: '100%',
    height: '400px'
  }
})

export const Output = withStyles(styles)(connect(mapStateToProps)(Output_))
