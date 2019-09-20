import * as gui from 'gui'
import { State, getState, setState } from './state';
import { objectKeys, arrayToObject } from 'misc-utils-of-mine-generic';


export abstract class VeryAbstractComponent<AP = {}, AS = {} > {
  protected state: AS;
  protected props: AP;
  protected view: gui.View;

  constructor(p?: AP) {
    this.props = p || {} as AP;
    this.state = { ...p as any };
    this.view = null as any;
  }

  protected abstract setState(s: Partial<AS>): void
  abstract render(): gui.View
}

export abstract class AbstractComponent<AP = {}, AS extends AP = AP> extends VeryAbstractComponent<AP, AS> {
}


export abstract class StateComponent<AP = {}, AS extends State = State, RS extends keyof Partial<AS> =keyof Partial<AS> > extends VeryAbstractComponent<AP, AS>{

 protected relevantProperties: RS[] = []

  constructor(p?: AP) {
    super(p)
    this.state = getState() as any
    StateComponent.stateListeners.push(this as any)
  }

 protected setState(s: Partial<AS>) {
    StateComponent.setState(s)
  }

 protected stateChanged(names: RS[], s: Pick<AS, RS>): void {

  }

  protected static stateListeners: StateComponent[] = []
  protected static setState(s: Partial<State>) {
    StateComponent.stateListeners.forEach(l => {
      const names = objectKeys(s).filter(n=>l.relevantProperties.includes(n))
      const filtered = arrayToObject(names , a=>(s as any)[a])
      l.stateChanged(names, filtered as any)
    })
    setState(s)
  }
}