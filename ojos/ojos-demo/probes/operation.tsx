import 'babel-polyfill'
import * as React from 'react'
import * as rd from 'react-dom'
import { OperationNames, getOperationMetadata, Option, OperationMetadata } from 'ojos'
import { arrayToObject } from 'misc-utils-of-mine-generic'
import { loadOpencv } from 'mirada'

interface P extends Partial<S> {
  onChange: (c: OperationValue) => void;
  operation: OperationMetadata
}

interface S {
  value: OperationValue
}

interface OperationValue {
  options: { [k: string]: any }
}

export class Operation extends React.Component<P, S> {
  constructor(p: P, s: S) {
    super(p, s)
    this.state = {
      value: p.value || {
        options: arrayToObject(this.props.operation.options.map(o=>o.name), o => getDefaultOptionValue(this.props.operation.options.find(n=>n.name===o)))
      }
    }
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
          <OperationOption option={o} onChange={v => {
            const value = {options: {...this.state.value.options, [o.name]: v}}
            this.setState({value})
            this.props.onChange( value)
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

function getDefaultOptionValue(o: Option) {
   if(o.typeUnion && o.typeUnion.length){
    return typeof cv[o.typeUnion[0]]!=='undefined' ? cv[o.typeUnion[0]] : o.typeUnion[0]
  }  else if (o.type === 'number') {
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
        <br />
        {this.props.option.typeUnion && this.props.option.typeUnion.length?
          <select onChange={e => {
          const value = this.props.option.name==='type' ? e.currentTarget.value : cv[e.currentTarget.value]
          this.setState({value })
          this.props.onChange(value)
        }}>{this.props.option.typeUnion.map(o=><option value={o}>{o}</option>)}</select>:
          ['number','string','any','boolean'].includes(this.props.option.type) ? <input type={this.props.option.type==='number'?'number':this.props.option.type==='boolean'?'checkbox':'text'} value={this.state.value} onChange={e => {
          const value = this.props.option.type==='number' ? e.currentTarget.valueAsNumber:this.props.option.type==='boolean'?e.currentTarget.checked : e.currentTarget.value
          this.setState({value })
          this.props.onChange(value)
        }} />:
        this.props.option.type==='Scalar' ? <input type="color"/>: 
        this.props.option.type==='Size' ? <><label>width: <input type="number"/></label>, <label>height: <input type="number"/></label></>: 
        this.props.option.type==='Point' ? <><label>x: <input type="number"/></label>, <label>y: <input type="number"/></label></>: 
        this.props.option.type==='Mat' ? <input type="file"/> : 
        <p>Option type not recognized : {this.props.option.type}</p>}
      </div>
    )
  }
}

async function test() {
  await loadOpencv()
  rd.render(<App />, document.getElementById('main'))
}

const App = () => <div>
  <h1>Operations</h1>
  {getOperationMetadata().map(o => <li>
    <Operation onChange={v => {
      console.log('Operation changed', o.name, v);
    }} operation={o} />
  </li>)}
</div>
test()