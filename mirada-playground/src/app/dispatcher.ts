
import { Example } from "./examples"
import { getStore } from './store'



export async function setExample(example?: Example) {
  var state = getStore().getState()
  getStore().setState({
    working: true,
  })
  const script = example ? example.code : state.code
}



// import { File } from 'magica'
// import { Example } from 'magica-examples'
// import { arrayToObject, notUndefined, serial, sleep } from 'misc-utils-of-mine-generic'
// import { getStore } from './store'
// import { callRun } from './workerAccess'

// export async function loadImageFromUrl(u: string) {
//   var state = getStore().getState()
//   getStore().setState({
//     working: true
//   })
//   const f = await File.fromUrl(u)
//   if (f && f.content && f.name) {
//     getStore().setState({
//       working: false,
//       inputFiles: [f, ...state.inputFiles].filter((f, i, a) => a.findIndex(g => g.name === f.name) === i)
//     })
//   }
// }
