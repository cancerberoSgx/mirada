import {Command} from './types'
import { GrabCut } from './grabCut';

export function registerCommand(c:Command<any>){
  commands.push(c)
}

export function getCommands(){
  return commands
}

export function getCommand(n:string){
  return commands.find(c=>c.name===n)
}
const commands:Command<any>[] = []


export function installCommands(){
  registerCommand(new GrabCut())
}