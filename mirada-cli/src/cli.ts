
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { sync as glob } from 'glob'
import { asArray, basename, isString, pathJoin, withoutExtension, getFileExtension } from 'misc-utils-of-mine-generic'
import { main } from './main'
import { Options, CommandOption } from './types';
import { getCommand, getCommands, installCommands } from './commandManager'

export async function cli(options: Options) {
  installCommands()
  preconditions(options as any)
  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)
  const input = asArray(options.input).filter(isString)
    .map(f => glob(f)).flat().filter(existsSync)
  if(!input.length) {
    return fail('No input files match given value'+options.input)
  }
  const result = await main({ ...options, input })
  if (result.error) {
    return fail(result.error.toString()+'\n'+(result.error.stack || '').split('\n').join('\n'))
  }
  if (result.outputFiles.length > 1) {
    if (options.output) {
      if (!existsSync(options.output)) {
        mkdirSync(options.output, { recursive: true })
      }
      result.outputFiles.forEach(f => {
        f.name = options.output + '/' + basename(f.name)
      })
    } else {
      throw new Error('TODO')
    }
  }
  else {
    if (options.output) {
      result.outputFiles.forEach(f => {
        f.name = options.output!
      })
    }
    else {
      result.outputFiles.forEach(f => {
        f.name = withoutExtension(f.name)+'_out.'+options.format||getFileExtension(f.name)
      })
    }
  }
  result.outputFiles.forEach(f => {
    options.debug && console.log('Writing output file', f.name)
    writeFileSync(f.name, f.content, { encoding: 'binary' })
  })
}

function preconditions(options: Options & { _: any }) {
  if (options.help) {
    printHelp(options.command)
    process.exit(0)
  }
  if (!options.command || !options.input) {
    fail('--command and --input are both mandatory. Aborting.')
  }
}

function fail(msg: string, help = false) {
  console.error(msg)
  help && printHelp()
  process.exit(1)
}

function printHelp(command?: string) {
  if (command) {
    const c = getCommand(command)
    if (!c) {
      return fail(`Unrecognized command ${command}
${currentSupportedCommands()}`)
    }
    console.log(`
Command "${command}" options: 
 * ${c.options.map((o: CommandOption) => `${o.name}: (${o.optional ? 'optional ' : 'required '})${o.description}`).join('\n * ')}
    `)
    return process.exit(0)
  }
  console.log(`Usage: 
ojos --command grab-cut --x 10 --y 20 --width 123 --height 100 \
  --format gif --output ../img_nobg.gif --input ../img.png

Options:
  --input: string[]: Input file paths. It can also be glob patterns. For passing more than one use --input multiple times. It's important that the base name of these paths match the file names given in the command.
  --command: string | string[]: a valid ojazos command like 'grab-cut'
  --help?: boolean: (command line only)
  --debug?: boolean:

Use ojos --command grab-cut --help will list command grab-cut options descriptions.
${currentSupportedCommands()}
`)
}

function currentSupportedCommands() {
  return `
Current supported commands: 
 * ${getCommands().map(c => `${c.name}: ${c.description || ''}`).join('\n * ')}`.trim()
}
