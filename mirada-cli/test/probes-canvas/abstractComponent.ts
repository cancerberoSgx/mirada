import * as gui from 'gui'
import { State, getState } from './state';
import { objectKeys } from 'misc-utils-of-mine-generic';


export abstract class VeryAbstractComponent<AP = {}, AS = {}> {
  state: AS;
  props: AP;

  constructor(p?: AP) {
    this.props = p||{} as AP;
    this.state = { ...p as any };
    this.view = null as any;
  }

  abstract render(): gui.View

  /** to be override by subclasses to update UI. Must call super !*/
  setState(s: Partial<AS>) {
    Object.assign(this.state, s || {});
  }
  
  view: gui.Container;
}

export abstract class AbstractComponent<AP = {}, AS extends AP = AP> extends VeryAbstractComponent<AP, AS> {
}


export abstract class StateComponent<AP = {}, AS extends State = State> extends VeryAbstractComponent<AP, AS>{

  relevantProperties: (keyof State)[] = []

  constructor(p?:AP){
    super(p)
    this.state = getState() as any
  }

  setState(s: Partial<AS>) {
    objectKeys(s).forEach(name => this.statePropertyChanged(name, s[name]!, this.state[name]))
    super.setState(s)
  }

  statePropertyChanged<T extends keyof AS>(name: Extract<T, string>, newValue: AS[T], oldValue: AS[T]): void{

  }
}