import * as React from 'react'
import { getStore } from '../store/store'
import { State } from '../store/state'

export interface AbstractProps {
}

export class AbstractComponent<P extends AbstractProps = AbstractProps, S extends State = State> extends React.Component<P, S>{
  protected isRoot = true

  constructor(p: P, s: State) {
    super(p, s)
    this.state = getStore().getState() as S
    this.isRoot && getStore().add(() => {
      super.setState({ ...getStore().getState() })
    })
  }

  setState: React.Component<AbstractProps, State>['setState'] = state => {
    getStore().setState(state as Partial<S>)
  }
}
