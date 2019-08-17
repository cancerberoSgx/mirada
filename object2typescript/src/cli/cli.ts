
import fetch from 'cross-fetch'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { tryTo } from 'misc-utils-of-mine-generic'
import { dirname } from 'path'
import { FormatOptions } from 'ts-simple-ast-extra'
import { json2typescript } from '../json2typescript'
import { CliOptions, ParseOptions } from '../types'
import { arrayBufferToString, readStdin } from '../util'


export async function resolveInput(options: CliOptions) {
  let node: any
  if (options.input) {
    if (existsSync(options.input)) {
      tryTo(() => { node = JSON.parse(readFileSync(options.input).toString()) })
    }
    if (!node) {
      try {
        const response = await fetch(options.input)
        const buffer = await response.arrayBuffer()
        node = JSON.parse(arrayBufferToString(buffer))
      } catch (error) {
        options.debug && console.log('Couldn\'t load JSON from url options.input, cause: ', error, error.stack)
      }
    }
  } else {
    node = await readStdin()
  }
  return node
}

export async function cli(options: CliOptions) {
  preconditions(options as any)
  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)

  const node = await resolveInput(options)
  if (!node) {
    fail('Could not find any JSON to parse from given options')
  }
  let codeFormatOptions: FormatOptions | undefined
  try {
    if (options.codeFormatOptions) {
      codeFormatOptions = tryTo(() => JSON.parse(readFileSync(options.codeFormatOptions).toString()))
    }
  } catch (error) {
    console.warn('An error occurred reading code format options from given input ' + options.codeFormatOptions + ' using defaults')
  }
  var json2tsOptions: ParseOptions = {
    ...options,
    node,
    codeFormatOptions
  }
  const result = await json2typescript(json2tsOptions)
  if (options.output) {
    tryTo(() => mkdirSync(dirname(options.output), { recursive: true }))
    writeFileSync(options.output, result)
  } else {
    process.stdout.write(result)
  }
}

function preconditions(options: CliOptions & { _: any }) {
  if (options.help) {
    printHelp()
    process.exit(0)
  }
}

function fail(msg: string, help = false) {
  console.error(msg)
  help && printHelp()
  process.exit(1)
}

function printHelp() {
  console.log(`
Usage: 

object2typescript --input coolService.json --output src/types/cool.ts --nodeName Cool

Options:

  * codeFormatOptions?: string: path to a valid formatCodeSettings.json that defines some FormatOptions properties

  * input?: string: if given it will try to read input JSON from that path. If no file exists then it tries to load as a URL. 
  If not given it will read JSON string form stdin

  * help?: boolean:

  * debug?: boolean:

  * output?: string: if given output typescript code will be written in that path, if not it will be on stdout
  
  * nodeName?: string: Name for the root type.

  * arrayPolicy?: 'each' | 'first' | 'merge': first: only the first element will be examined and the output type will be T[] where T describe the first element
  merge: similar to first, but all elements of the array are examined and their types will be merged according to these rules:
    1) if incompatible types are found [1, {a:2}] then union types are generated (number|{a:number})
    2) for object elements, their properties will be merged recursively: [{a:{b:'s'}}, {x:1,a:{c:new Date()}}] will generate {a:{b:string,c:Date},x:number}[]
  each: will generate a the exact tuple: [1, {a:2}] generates [number, {a:number}]
  
  * objectRenderPolicy?: 'interface' | 'declareClass' | 'literalObject': 
    - interface: will generate an interface for each object using the property name for the interface name
    - declareClass is similar to interface but will generate declare class Foo { bar: Bar }
  
  * export?: boolean: Export all generated types
  
  * optionalProperties?: boolean: if true all properties will be marked as optional no matter if they are found on all instances of an array for example.
  
  * quotePropertyNames?: boolean: Force all member names to be quoted. i.e : interface I { 'foo': Foo } no matter if they don't need to.

`)
}
