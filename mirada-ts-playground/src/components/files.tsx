import * as React from 'react'
import { File, State } from '../store/types'
import { connect } from 'react-redux'
import { dispatch } from '..'
import { FILES_ACTIONS } from '../store/files'

interface P {
  files: File[]
}

class Files_ extends React.Component<P, {}> {
  render() {
    return (
      <article className="files">
        <h3>Sample input files</h3>
        <button onClick={e => this.add()}>Add</button>
        <ul>
          {this.props.files.map(f => (
            <li className={`file ${f.selected ? 'selected' : ''}`} key={f.filePath}>
              <a onClick={e => dispatch({ type: FILES_ACTIONS.SELECT, file: f })}>{f.filePath}</a>
            </li>
          ))}
        </ul>
      </article>
    )
  }
  add(): void {
    dispatch({
      type: FILES_ACTIONS.ADD,
      file: {
        filePath: `/src/sample/${this.props.files.length}_test.ts`,
        content: 'export const c = 1'
      }
    })
  }
}

const mapStateToProps = (state: State) => ({
  files: state.files
})

export const Files = connect(mapStateToProps)(Files_)
