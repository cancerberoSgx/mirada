import * as React from 'react'
import { State, Example } from '../store/types'
import { connect } from 'react-redux'
import { dispatch } from '..'
import { EXAMPLES_ACTIONS } from '../store/examples'

interface P {
  examples: Example[]
}

class Examples_ extends React.Component<P, {}> {
  render() {
    return (
      <article className="examples">
        <h3>ts-morph examples</h3>
        <ul>
          {this.props.examples.map(example => (
            <li className={`example ${example.selected ? 'selected' : ''}`} key={example.name}>
              <a onClick={e => dispatch({ type: EXAMPLES_ACTIONS.SELECT, example })}>{example.name}</a> (
              {example.description})
            </li>
          ))}
        </ul>
      </article>
    )
  }
}

const mapStateToProps = (state: State) => ({
  examples: state.examples
})

export const Examples = connect(mapStateToProps)(Examples_)
