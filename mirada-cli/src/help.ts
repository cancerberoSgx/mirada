import { objectKeys, wordWrap } from 'misc-utils-of-mine-generic'
import { fail } from './cli'
import { getCommand, getCommands } from './commandManager'
import { Command } from './commands'


export function printHelp(command?: true | string) {
  if (typeof command === 'string') {
    const c = getCommand(command)
    if (!c) {
      return fail(`Unrecognized command ${command}\n\n${currentSupportedCommands()}`)
    }
    process.stdout.write(renderHelpCommand(c))
    return process.exit(0)
  }
  process.stdout.write(renderHelpGeneral() + '\n\n')
}

export function renderHelpGeneral() {
  return `
Usage: 

TODO

Options:

* ${objectKeys(globalOptions).map(k => wrap(`${k}: ${globalOptions[k]}`, '    ')).join('\n* ')}

For help on a particular command use for example:  

ojos --help grabCut

${currentSupportedCommands()}
`
}

export function renderHelpCommand(c: Command): string | Uint8Array {
  return `
*** ${c.name} ***
${c.doc ? '\n' + wrap(c.doc) + '\n' : '    '}
Options:

* ${c.properties.map(o => wrap(`${o.name}: ${o.type} - (${o.optional ? 'optional' : 'required'}) ${o.doc}`, '    ')).join('\n* ')}
`
}


export function currentSupportedCommands() {
  return `Current supported commands:

* ${getCommands().map(c => wrap(`${c.name}: ${c.doc}`, '    ')).join('\n* ')}\n`
}

const globalOptions = {
  'config': 'string (Optional) Path to a configuration file. it could be .json with valid JSON content or .js in which case it must be a valid Node.js commons module (use module.exports=[]). In both cases the data must be an array of commands. ',
  'variables': 'string (Optional) object like string with key-values which will be used to evaluate the --config file as a template (ejs.co).',
  'help': 'string (Optional) If no value is given it prints general usage information. If a command names is given will print command\'s properties help.',
  'debug': 'boolean: If given debug information will be dumped to stdout.'
}

function wrap(d: string, prefix = '') {
  const w = (process.stdout.columns || 120) - 8
  d = wordWrap(d, w)
  d = d.split('\n').map((l, i) => i === 0 ? l : `${prefix}${l}`).join('\n') //i===0 ? l : `${prefix}${l}`).join('\n') || ''
  return d
}
