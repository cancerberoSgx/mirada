import { writeFileSync } from 'fs'
import { unquote } from 'misc-utils-of-mine-generic'
import { resolve } from 'path'
import { Project } from 'ts-morph'
import { extractMemberSignatures } from 'typescript-member-signatures'
import { AbstractOperation, AdaptiveThreshold, BilateralFilter, Bitwise, BoxFilter, Canny, Circle, ConvertTo, Edge, Ellipse, FloodFill, GaussianBlur, HistEqualization, InRange, Line, Math, MedianBlur, MorphologyEx, Rectangle, ReplaceColor, Threshold, WarpAffine, WarpPerspective, CvtColor } from '../src'

const allOps = [AdaptiveThreshold, BilateralFilter, Bitwise, BoxFilter, Canny, Circle, ConvertTo, Edge, Ellipse, FloodFill, GaussianBlur, HistEqualization, InRange, Line, Math, MedianBlur, MorphologyEx, Rectangle, ReplaceColor, Threshold, WarpAffine, WarpPerspective, CvtColor]

function generateMetadata() {
  const p = new Project({ tsConfigFilePath: 'tsconfig.json', addFilesFromTsConfig: true })
  const ops = allOps.map(o => {
    const i = new (o as any)() as AbstractOperation<any>
    const f = p.getSourceFileOrThrow(resolve(`src/op/${i.name}.ts`))
    const optionsInterface = f.getInterfaceOrThrow(`${i.name}Options`)
    const properties = extractMemberSignatures({ declarations: [optionsInterface], target: '', generateMarkdownDocs: true })[0]!.properties!
    return {
      Class: o,
      name: i.name,
      description: i.description,
      noInPlace: i.noInPlace,
      validChannels: i.validChannels,
      optionsOrder: i.optionsOrder,
      sameSizeAndType: i.sameSizeAndType,
      optionsInterface,
      properties
    }
  })

  const s = `
import { ${ops.map(o => `${o.name}, ${o.name}Options`).join(', ')} } from '.' 

interface Base {
  name: string
  description: string
}

export interface OperationMetadata extends Base {
  noInPlace: boolean
  sameSizeAndType: boolean
  validChannels?: number[]
  optionsOrder?: string[]
  options: Option[]
}

export interface Option extends Base {
  type: string
  signature: string
  typeUnion: string[]
  optional: boolean
}

export const operationClasses = {
  ${ops.map(o => `${o.name}: ${o.name}`).join(',\n  ')}
}

export interface OperationOptions {
  ${ops.map(o => `${o.name}: ${o.name}Options`).join(',\n  ')}
}

export enum OperationNames {
  ${ops.map(o => `${o.name} = '${o.name}'`).join(',\n  ')}
}

let metadata: OperationMetadata[] = null as any

export function getOperationMetadata() {
  if(!metadata) {
    metadata = [${ops.map(o => `
      {
        name: ${JSON.stringify(o.name)},
        description: ${JSON.stringify(o.description)},
        noInPlace: ${o.noInPlace},
        sameSizeAndType: ${o.sameSizeAndType},
        validChannels: ${JSON.stringify(o.validChannels)},
        optionsOrder: ${JSON.stringify(o.optionsOrder)},        
        options: [
          ${o.properties.map(s => `{
            name: ${JSON.stringify(s.name)},
            signature: ${JSON.stringify(s.signature)},
            type: ${JSON.stringify(getType(s.signature))},
            typeUnion: ${JSON.stringify(getTypeUnion(getType(s.signature), p))},
            description: ${JSON.stringify(s.jsDocsText)},
            optional: ${s.signature.includes('?') ? 'true' : 'false'}
          }`).join(', \n          ')}
        ]
      }`).join(',\n      ')}
    ]
  }
  return metadata
}
`
  writeFileSync('src/op/metadata.ts', s)
}

function getTypeUnion(t: string, p: Project) {
  if (t.includes('|')) {
    return t.split('|').map(t => t.trim()).map(t => t.startsWith('"') || t.startsWith('\'') ? unquote(t) : t)
  }
  const f = p.getSourceFileOrThrow(resolve('src/types.ts'))
  const e = f.getEnums().find(e => e.getName() === `${t}Enum`)
  return e ? e.getMembers().map(m => m.getName()) : []
}

function getType(s: string) {
  if (!s || !s.includes(':')) {
    return 'any'
  }
  const d = s.split(':')[1].trim()
  return d.endsWith(',') || d.endsWith(';') ? d.substring(0, d.length - 1) : d
}

generateMetadata()
