import { File as MagicaFile } from 'magica'
import { Command } from './commands';

export interface Options {
  debug?: boolean;
  // input: string[];
  // output?: string;
  help?: undefined|true|string

  listen?: true|string
  
  // command: 'grab-cut'
  // format?: string
  //TODO: config : from json file
}
export interface Result {
  error?: Error
  outputFiles: File[]
}
interface File extends MagicaFile {
  name: string
  content: Buffer
}

// export interface Command<O extends CommandOption[]> extends Base<O> {
//   options: O
// }

export interface Base<T> {
  name: string
  description?: string
  value?: T
  defaultValue?: T
  validate?(): string | undefined
}

// export interface CommandOption<Name extends string = any, Value = any> extends Base<Value> {
//   optional?: boolean
//   name: Name
// }
