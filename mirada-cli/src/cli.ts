
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { sync as glob } from 'glob'
import { asArray, basename, getFileExtension, isString, withoutExtension } from 'misc-utils-of-mine-generic'
import { main } from './main'
import { Options } from './types';
import { printHelp } from './help';

export async function cli(options: Options) {
  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)
if (options.help) {
    printHelp(options.help)
    process.exit(0)
  }
  if(options.listen){
    
  }
}

export function fail(msg: string, help = false) {
  console.error(msg)
  help && printHelp()
  process.exit(1)
}


