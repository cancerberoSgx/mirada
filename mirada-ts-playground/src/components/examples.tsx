import * as React from 'react'
import { State } from '../store/state'
import { connect } from 'react-redux'
import { Example } from '../store/examples';
import { AbstractComponent } from '../util/component';
// import { dispatch } from '..'
// import { EXAMPLES_ACTIONS } from '../store/examples'

// interface P {
//   examples: Example[]
// }

export class Examples extends AbstractComponent {
  render() {
    return (
      <article className="examples">
        <h3>ts-morph examples</h3>
        <ul>
          {this.state.examples.map(example => (
            <li className={`example ${example.name===this.state.example.name ? 'selected' : ''}`} key={example.name}>
              <a onClick={e => this.setState( {example })}>{example.name}</a> (
              {example.description})
            </li>
          ))}
        </ul>
      </article>
    )
  }
}

// const mapStateToProps = (state: State) => ({
//   examples: state.examples
// })

// export const Examples = connect(mapStateToProps)(Examples_)
