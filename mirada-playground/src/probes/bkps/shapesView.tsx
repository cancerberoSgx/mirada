// import * as React from 'react'
// import { ComponentWithFields } from '../common/componentWithFields'
// // import { SelectRectTool } from './selectRectTool'
// import { TToolView } from './toolView'


// // function Tool<TBase extends Constructor>(Base: TBase) {
// //   return ComponentWithFields
// // }

// // export abstract class ToolViewWithFields extends ToolView {

// // }

// export class ShapesView extends TToolView(ComponentWithFields) {
//   // this.fields: = [
//   //   {}
//   // ]
//   render() {
//     const t = this.state.tools.find(d => d.name === SelectRectTool.NAME)!
//     return <>
//       <label><input type="checkbox" onChange={e => {
//         t.setActive(e.currentTarget.checked)
//       }} checked={this.state.activeTools.includes(t)} /> {t.name} : {t.description}</label>
//     </>
//   }
// }
