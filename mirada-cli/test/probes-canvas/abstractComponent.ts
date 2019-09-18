import * as gui from 'gui'

export class AbstractComponent<AP = {}, AS extends AP = AP> {
  state: AS;
  props: AP;
  constructor(p: AP) {
    this.props = p;
    this.state = { ...p as any };
    this.view = null as any;
  }
  /** to be overriden by subclasses to update UI */
  setState(s: Partial<AS>) {
    Object.assign(this.state, s || {});
  }
  view: gui.Container;
}


 // class 
// type BaseConstructor<T = Base > = new (...args: any[]) => T;
// export function MixFeature<BaseType extends BaseConstructor>(TheBase: BaseType) {
//     abstract class Mixed extends TheBase implements Feature {
//         featureMethod() {
//             // re-usable code that uses method() call
//             this.method();
//         }
//     }
//     return Mixed;
// }
// class Implementation extends MixFeature(Base) {
//     method() {
//     }
// }
// type Constructor<T = {}> = new (...args: any[]) => T
// function AbstractComponent3<TBase extends Constructor>(Base: TBase) {
//   return class AbstractComponffnt3<AP = {}, AS extends AP = AP> extends Base {
//     state: AS = null as any
//     props: AP = null as any
//     constructor(...a: any[]) {
//       super(...args)
//     //   this.props = args[0]
//     //   this.state = args[0]
//     }
//     setState(s: Partial<AS>) { }
//   }
// }
// type Constructor<T = {}> = new (...args: any[]) => T;
// function Timestamped<TBase extends Constructor>(Base: TBase) {
//   return class extends Base {
//     timestamp = Date.now();
//   };
// }
// interface Component<AP = {}, AS extends AP = AP>{
//   state: AS
//   props: AP
//   // constructor(p: AP) {
//   //   this.props = p
//   //   this.state = { ...p as any }
//   // }
//   setState(s: Partial<AS>) { }
// }