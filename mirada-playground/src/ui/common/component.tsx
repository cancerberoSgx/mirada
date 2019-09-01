import * as React from 'react'
import { State } from "../../app/state"
import { getState, getStore } from '../../app/store'

export interface AbstractProps {
}

export class AbstractComponent<P extends AbstractProps = AbstractProps, S extends State = State> extends React.Component<P, S>{
  constructor(p: P, s: State) {
    super(p, s)
    this.state = getState() as S
    getStore().add(() => {
      super.setState({ ...getState() })
    })
  }

  setState: React.Component<AbstractProps, State>['setState'] = state => {
    getStore().setState(state as Partial<S>)
  }
}
