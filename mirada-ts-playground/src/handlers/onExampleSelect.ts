import { sleep } from 'misc-utils-of-mine-generic'
import { setEditorFile } from '../monaco/monaco'
import { State } from '../store/state'
import { getStore } from '../store/store'

/** handle example changes and responsible of update state.code - nothing else */
export function onExampleSelectedInstall() {
  getStore().add(event => {
    handle(event)
  })
}
async function handle(event: { oldState: State; partial: Partial<State>; newState: State }) {
  if (event.oldState.example !== event.newState.example) {
    setEditorFile(event.newState.example.name, event.newState.example.code)
    await sleep(10)
    getStore().setState({ code: event.newState.example.code, executeRequest: true, working: true })
  }
}
