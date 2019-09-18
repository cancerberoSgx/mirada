
import { createReadStream, createWriteStream, existsSync } from 'fs'
import Jimp from 'jimp'
import { installFormatProxy, JimpCodec, loadFormatProxies, loadOpencv } from 'mirada'
import { evaluate, tryTo } from 'misc-utils-of-mine-generic'
import oboe from 'oboe'
import { Readable } from 'stream'
import { printHelp, renderHelpCommand, renderHelpGeneral } from './help'
import { Options } from './types'

let loaded = false
export async function loadMirada() {
  if (!loaded) {
    loaded = true
    await installFormatProxy(() => {
      return new JimpCodec(Jimp)    
})
    await loadFormatProxies()
    await loadOpencv()
  }
}

export async function cli(options: Options) {
  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)

  if (options.help) {
    printHelp(options.help)
    process.exit(0)
  }
  else if (options.input) {
    readJson(options)
  }
  else {
    const cmds = (options as any)._.map((s: string) => {
      const o = tryTo(() => evaluate(s), undefined)
      if (o === undefined) {
        fail(`Error evaluating command "${s}"`)
      }
      if (!commands.find(c => c.name === o.name)) {
        fail(`Command not found "${o.name}"`)
      }
      return o
    })

    // console.log(cmds);

    await loadMirada()
    // await sleep(2000)
    const r = await execute({
      commands: cmds
    })
    // console.log(r.commands.map(f=>f.out.map(o=>o.name)));
    // output
    r.out.forEach(r => {
      r.write()
    })
  }
}

function readJson(options: Options) {
  let s: Readable
  let json: oboe.Oboe
  let output = options.output ? createWriteStream(options.output) : process.stdout
  if (typeof options.input === 'string' && existsSync(options.input)) {
    s = createReadStream(options.input)
  }
  else {
    s = process.stdin
  }
  s.resume()
  s.setEncoding('utf8')
  json = oboe(s)
  json.node({
    ['*']: (value, path, partials) => {
      options.debug && console.log('json node', path, value)
      if (value.name === 'help') {

        // options.debug && console.log('asdasdasdasd', path, value);
        // output.write(JSON.stringify(!value.name ? {result: renderHelpGeneral()} : (value.name && !commands.find(c=>c.name===value.name) ) ? {result:  renderHelpCommand(value.name)} : {error: 'Command not found: '+value.name } ))
        output.write(JSON.stringify(!value.command ? { result: renderHelpGeneral() } : (value.command && commands.find(c => c.name === value.command)) ? { result: renderHelpCommand(value.command) } : { error: 'Command not found: ' + value.command }))
      }
    }
  })
  json.done(value => {
    options.debug && console.log('done reading json', value)
  })
  json.fail(err => {
    output.write(JSON.stringify({ error: err.thrown + '' }))
    console.error(err.thrown)
  })
}

export function fail(msg: string, help = false) {
  console.error(msg)
  help && printHelp()
  process.exit(1)
}


