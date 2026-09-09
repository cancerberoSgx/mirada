#!/usr/bin/env node
import { Doxygen2tsOptions } from './doxygen2json/doxygen2ts'
import { opencv2ts } from './doxygen2json/opencv2ts'

/**
 * Minimal `--key value` / `--flag` argv parser - no external dependencies.
 * `--flag` (no value, or followed by another `--key`) is parsed as boolean `true`.
 */
function parseArgs(argv: string[]): Record<string, string | boolean> {
  const args: Record<string, string | boolean> = {}
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (!arg.startsWith('--')) {
      continue
    }
    const key = arg.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) {
      args[key] = true
    } else {
      args[key] = next
      i++
    }
  }
  return args
}

function printHelp() {
  console.log(`Usage: doxygen2typescript [options]

Generates TypeScript type declarations from doxygen xml output (particularly to generate opencv.js types).

Options:
  --opencvBuildFolder <path>      Path to opencv build folder (required)
  --opencvDocBuildFolder <path>   Path to opencv build folder containing doc/doxygen/xml (defaults to opencvBuildFolder)
  --tsOutputFolder <path>         Output folder where .ts files will be written (required)
  --jsonTypes                     Also write .json files with parsed doxygen data next to each .ts file
  --xmlTypes                      Also copy the source .xml file next to each .ts file
  --singleDeclaration             Emit a single declaration per file
  --onlyFix                       Only (re)generate the index.ts file, skipping generation
  --debug                         Enable debug output
  --refType <typedoc|mdRefLink>   How to render cross references in jsdoc comments
  --locationFilePrefix <url>      URL prefix used when rendering source location links
  -h, --help                      Show this help message
`)
}

export function run(argv: string[] = process.argv.slice(2)) {
  const args = parseArgs(argv)

  if (args.help || args.h) {
    printHelp()
    return
  }

  const opencvBuildFolder = args.opencvBuildFolder
  const tsOutputFolder = args.tsOutputFolder

  if (typeof opencvBuildFolder !== 'string' || typeof tsOutputFolder !== 'string') {
    console.error('Error: --opencvBuildFolder and --tsOutputFolder are required.\n')
    printHelp()
    process.exitCode = 1
    return
  }

  const options: Doxygen2tsOptions = {
    opencvBuildFolder,
    tsOutputFolder,
    opencvDocBuildFolder: typeof args.opencvDocBuildFolder === 'string' ? args.opencvDocBuildFolder : undefined,
    jsonTypes: !!args.jsonTypes,
    xmlTypes: !!args.xmlTypes,
    singleDeclaration: !!args.singleDeclaration,
    onlyFix: !!args.onlyFix,
    debug: !!args.debug,
    refType: args.refType as Doxygen2tsOptions['refType'],
    locationFilePrefix: typeof args.locationFilePrefix === 'string' ? args.locationFilePrefix : undefined,
  }

  opencv2ts(options)
}

if (require.main === module) {
  run()
}
