import { App1 } from './app'
import { getInitialState } from './state'

async function main(){

const state = getInitialState()
new App1(state).render()
}
main()