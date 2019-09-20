import { fromNow } from 'hrtime-now'
import { loadLibraries } from './loadLibraries'
import { BackEyesServer } from './server'

export interface Options {
  help?: boolean
  debug?: boolean
  port?: string
  path?: string
}

export async function cli(options: Options) {
  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)
  if (options.help) {
    printHelp(options.help)
    process.exit(0)
  }
  if (!options.path && !options.port) {
    fail('One of path or port must be given')
  }
  options.debug && console.log('Loading...')
  options.debug && await fromNow(loadLibraries, t => console.log(`Libraries loaded in ${t}`))
  const server = new BackEyesServer({ listen: { path: options.path, port: parseInt(options.port!) }, debug: options.debug || false })
  server.start()
}

export function fail(msg: string, help = false) {
  console.error(msg)
  help && printHelp()
  process.exit(1)
}

export function printHelp(command?: true | string) {
  return `
TODO
`
}

