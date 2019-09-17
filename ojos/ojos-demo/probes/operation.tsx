import 'babel-polyfill'
import * as React from 'react'
import * as rd from 'react-dom'
import { OperationNames, getOperationMetadata, Option, OperationMetadata } from 'ojos'
import { arrayToObject } from 'misc-utils-of-mine-generic'

interface P extends Partial<S> {
  onChange: (c: OperationValue) => void;
  operation: OperationMetadata
}

interface S {
  value: OperationValue
}

interface OperationValue {
  options: { [k : string]: any }
}

export class Operation extends React.Component<P, S> {
  // op:  OperationMetadata
  constructor(p: P, s: S) {
    super(p, s)
    // this.op = getOperationMetadata().find(m => m.name === this.props.name)
    this.state = {value: p.value||{options: arrayToObject(Object.keys(this.props.operation.options), o=>getDefaultOptionValue(this.props.operation.options[o]))}}
  }

  render() {
    if (!this.props.operation) {
      return <div>Invalid Operation Name: {this.props.operation.name}</div>
    }
    return (
      <div className="operation">
        <h2>{this.props.operation.name}</h2>
        <div>{this.props.operation.description}</div>
        <ul>{this.props.operation.options.map(o => <li>
          <OperationOption option={o} onChange={value => {

          }} />
        </li>)}</ul>
      </div>
    )
  }
}

interface OOP {
  onChange: (c: any) => void;
  option: Option
  value?: any
}

interface OOS {
  value: any
}

function  getDefaultOptionValue(o:Option)  {
  if (o.type === 'number') {
    return 0
  } else if (o.type === 'string') {
    return ''
  } else {
    return undefined
  }
}
export class OperationOption extends React.Component<OOP, OOS> {
 
  constructor(p: OOP, s: OOS) {
    super(p, s)
    this.state = { ...p, value: p.value || getDefaultOptionValue(this.props.option) }
  }
  render() {
    return (
      <div className="operationOption">
        <h3>{this.props.option.name}</h3>
        <div>({this.props.option.type})</div>
        <div className="description">{this.props.option.description}</div>
        <div>{this.props.option.optional ? 'Optional' : 'Required'}</div>
        <br/>
        <input value={this.state.value} onChange={e => {
          this.setState({ value: e.currentTarget.value })
        }} />
      </div>
    )
  }
}

async function test(){
  rd.render(<App/>, document.getElementById('main'))
}

const App = ()=><div>
  <h1>Operations</h1>
  {getOperationMetadata().map(o=><li>
    <Operation onChange={v=>{}} operation={o} />
  </li>)}
</div>
test()