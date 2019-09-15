import {Project, TypeGuards, InterfaceDeclaration, TypeElementTypes, Identifier, ClassDeclaration} from 'ts-morph'
import {extractMemberSignatures, Member} from 'typescript-member-signatures'
import { writeFileSync, write } from 'fs';
import {AdaptiveThreshold, BilateralFilter, Bitwise, BoxFilter, Canny, Circle, ConvertTo, Edge, Ellipse, FloodFill, AbstractOperation, GaussianBlur, HistEqualization, InRange, Line, Math, MedianBlur, MorphologyEx, Rectangle, ReplaceColor, Threshold, WarpAffine, WarpPerspective} from '../src'
import { resolve } from 'path';
import { notUndefined, notSameNotFalsy, unquote } from 'misc-utils-of-mine-generic';
import {getExtendsRecursively} from 'ts-simple-ast-extra'

  const allOps = [AdaptiveThreshold, BilateralFilter, Bitwise, BoxFilter, Canny, Circle, ConvertTo, Edge, Ellipse, FloodFill, GaussianBlur, HistEqualization, InRange, Line, Math, MedianBlur, MorphologyEx, Rectangle, ReplaceColor, Threshold, WarpAffine, WarpPerspective]

function generateMetadata(){
  const p = new Project({tsConfigFilePath:'tsconfig.json', addFilesFromTsConfig: true})
  const ops = allOps.map(o=>{
    const i = new (o as any)() as AbstractOperation<any>
    const f = p.getSourceFileOrThrow(resolve(`src/op/${i.name}.ts`))
    const optionsInterface = f.getInterfaceOrThrow(`${i.name}Options`)
    const properties = extractMemberSignatures({declarations: [optionsInterface], target: '', generateMarkdownDocs: true})[0]!.properties!
    // .map(p=>{
    //   // console.log(optionsInterface.getName(), p.name, getExtendsRecursively(optionsInterface).map(i=>(i.getExpression() as Identifier).getDefinitionNodes()[0].getKindName()), optionsInterface.getMembers().map(p=>p.getText()));
    //   // const allProps = getAllMembers(optionsInterface).filter(TypeGuards.isPropertySignature)
    //   // console.log(optionsInterface.getName(), p.name, getAllMembers(optionsInterface).map(p=>p.getText()));
    //   const pp =  getAllMembers(optionsInterface).filter(TypeGuards.isPropertySignature)      .find(m=>m.getName()===p.name!)   
    //   return {...p, typeText:  pp?pp.getType().getText():'any'}
    // })
    return {
      Class: o, 
      name: i.name,
      description: i.description,
      noInPlace: i.noInPlace,
      validChannels: i.validChannels,
      sameSizeAndType: i.sameSizeAndType,
      optionsInterface,
      properties
    }
  })
  // .filter(notUndefined)

  const s = `
interface Base {
  name: string
  description: string
}

export interface OperationMetadata extends Base {
  noInPlace: boolean
  sameSizeAndType: boolean
  validChannels: number[]
  options: Option[]
}

export interface Option extends Base {
  type: string
  signature: string
  typeUnion: string[]
  optional: boolean
}

let metadata: OperationMetadata[] = null as any

export function getOperationMetadata() {
  if(!metadata) {
    metadata = [${ops.map(o=>`
      {
        name: ${JSON.stringify(o.name)},
        description: ${JSON.stringify(o.description)},
        noInPlace: ${o.noInPlace},
        sameSizeAndType: ${o.sameSizeAndType},
        validChannels: ${JSON.stringify(o.validChannels||[])},
        options: [
          ${o.properties.map(s=>`{
            name: ${JSON.stringify(s.name)},
            signature: ${JSON.stringify(s.signature)},
            type: ${JSON.stringify(getType(s.signature))},
            typeUnion: ${JSON.stringify(getTypeUnion(getType(s.signature), p))},
            description: ${JSON.stringify(s.jsDocsText)},
            optional: ${s.signature.includes('?')?'true':'false'}
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

function getTypeUnion(t:string, p:Project){
  if(t.includes('|')){
    return t.split('|').map(t=>t.trim()).map(t=>t.startsWith('"')||t.startsWith('\'') ? unquote(t):t)
  }
  const f = p.getSourceFileOrThrow(resolve('src/types.ts'))
  const e = f.getEnums().find(e=>e.getName()===`${t}Enum`)
  return e ? e.getMembers().map(m=>m.getName()) : []
}

function getType(s:string){
  if(!s||!s.includes(':')){
    return 'any'
  }
  const d = s.split(':')[1].trim()
  return d.endsWith(',') ||d.endsWith(';') ?d.substring(0 , d.length-1):d
}

generateMetadata()

// function getExtendsRecursivelyDeclarations<T extends InterfaceDeclaration | ClassDeclaration>(decl: T):T[] {
//   return getExtendsRecursively(decl).map(i=>(i.getExpression() as Identifier).getDefinitionNodes()[0] as T) 
// }

// function getAllMembers(i: InterfaceDeclaration): TypeElementTypes[] {
//   return [...i.getMembers(), ...getExtendsRecursivelyDeclarations(i).filter(TypeGuards.isInterfaceDeclaration).map(i=>getAllMembers(i as any as InterfaceDeclaration)).flat()].filter(notSameNotFalsy)
// } 









// function generateCommands(){
//   const p = new Project({tsConfigFilePath:'tsconfig.json', addFilesFromTsConfig: true})
//   const types = p.getSourceFiles().find(f=>f.getFilePath().endsWith('op/metadata.ts'))!
//   const commandsByName = types.getInterfaceOrThrow('options')!
//   const d = commandsByName.getProperties()
//   .map(p=>({name: p.getName(), type: p.getType()!.getSymbol()!.getDeclarations()
//   .filter(TypeGuards.isInterfaceDeclaration)}))
//   .filter(d=>d.type.length)
//   .map(d=>({...d, type: d.type[0]!}))
//   .map(d=>({...d, signature:extractMemberSignatures({declarations: [d.type], target: '', generateMarkdownDocs: true})[0]}))
//   const h = d.map(d=>`
//   {
//     name: '${d.name}',
//     signature: ${JSON.stringify(d.signature.signature)},
//     doc: ${JSON.stringify(d.type.getJsDocs().map(n=>n.getInnerText()).join('\n\n'))},
//     properties: [
//     ${(d.signature.properties||[]).map(p=>`
//       { 
//         name: '${p.name}', 
//         type: '${getPType(p)}', 
//         doc: ${JSON.stringify(p.jsDocsText)},
//         optional: ${p.signature.includes('?')?'true':'false'}
//       }`.trim()).join(',\n      ')}
//     ]
//   }`)

// const s = `
// // this file was  auto generated by scripts/generateCommands.ts

// export interface Prop {
//   name: string
//   type: string
//   doc: string
//   optional: boolean
// }

// export interface Command {
//   name: ${d.map(d=>`'${d.name}'`).join(' | ')}
//   doc: string
//   signature: string
//   properties: Prop[]
// }

// export const commands: Command[] = [
//   ${h.join(',\n    ')}
// ]
// `
// writeFileSync('tmp.ts', s)
// }


// function getPType(p:Member) {
//   let t= p.signature.split(':')[1].trim().replace(/[^a-z0-9_]/ig, '').trim()
//   return t==='T' ? `string` :  t
// }

