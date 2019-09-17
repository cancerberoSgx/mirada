import test from 'ava'
import { Project, getProperties, tsMorph as tsm } from 'ts-simple-ast-extra'
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { exec } from 'shelljs';

test('getProperties of cv global', async t => {
  const p = new Project({ tsConfigFilePath: 'tmp/tsconfig.json', addFilesFromTsConfig: true, manipulationSettings: {}, })
  const props = getProperties(p.getSourceFile(resolve('tmp/src/testError.ts'))!.getVariableDeclarationOrThrow('testCv').getType())

  const classes = props.filter(p => p.declaration.getType().isClass())
  const functions = props.filter(p => p.declaration.getType().getCallSignatures().length)
  const constants = props.filter(p => p.declaration.getType().getCallSignatures().length == 0 && !p.declaration.getType().isClass())
  const interfaces = props.filter(p => p.declaration.getType().isInterface())
  const typeAlias = props.filter(p => p.declaration.getType().getText().match(/type [^\s]+ \= /))
  console.log({ classes: classes.length, functions: functions.length, constants: constants.length, interfaces: interfaces.length, typeAlias: typeAlias.length });
  const s = `
# OpenCV.js Types


## Contents

<!-- toc -->

<!-- tocstop -->



## Classes 

 ${classes.map(c => {
    return `
### ${c.name} class

${(c.declaration as tsm.ClassDeclaration).getJsDocs().map(getInnerText).join('\n')}


${(c.declaration as tsm.ClassDeclaration).getConstructors().length == 0 ? `` : `

#### Constructors

${(c.declaration as tsm.ClassDeclaration).getConstructors().map((p, i) => `
##### ${c.name} > \`(${p.getParameters().map(m => m.getType().getText()).join(', ')})\` (#${i})
Type: \`${p.getType().getText()}\`
${p.getJsDocs().map(d => d.getText()).join('\n')}
`)}
`}
${(c.declaration as tsm.ClassDeclaration).getStaticProperties().length == 0 ? `` : `

#### Static Properties

${(c.declaration as tsm.ClassDeclaration).getStaticProperties().sort((a, b) => a.getName().localeCompare(b.getName())).map(p => `
##### ${c.name} > \`${p.getName()}: ${p.getType().getText()}\`
Type: \`${p.getType().getText()}\`
${jsdoc(p)}
`)}
`}

${(c.declaration as tsm.ClassDeclaration).getStaticMethods().length == 0 ? `` : `

#### Static Methods

${(c.declaration as tsm.ClassDeclaration).getStaticMethods().sort((a, b) => a.getName().localeCompare(b.getName())).map(p => `
##### ${c.name} > \`${p.getName()} (${p.getParameters().map(m => m.getType().getText()).join(', ')}): ${p.getReturnType().getText()}\`
${jsdoc(p)}
`)}
`}

${(c.declaration as tsm.ClassDeclaration).getInstanceProperties().length == 0 ? `` : `

#### Instance Properties

${(c.declaration as tsm.ClassDeclaration).getInstanceProperties().sort((a, b) => a.getName().localeCompare(b.getName())).map(p => `
##### ${c.name} > \`${p.getName()}: ${p.getType().getText()}\`
Type: \`${p.getType().getText()}\`
${jsdoc(p as any)}
`)}
`}

${(c.declaration as tsm.ClassDeclaration).getInstanceMethods().length == 0 ? `` : `

#### Instance Methods

${(c.declaration as tsm.ClassDeclaration).getInstanceMethods().sort((a, b) => a.getName().localeCompare(b.getName())).map(p => `
##### ${c.name} > \`${p.getName()} (${p.getParameters().map(m => m.getType().getText()).join(', ')}): ${p.getReturnType().getText()}\`
${jsdoc(p)}
`)}
`}

    `
  }).join('\n\n--------------------------------\n\n')}


## Functions 

 ${functions.map(c => {
    return `
### ${c.name}

${c.callSignatures.map(s => `
 *  \`${c.name} (${s.parameters.map(o => `${o.name}: ${o.type.getText()}`).join(', ')}): ${s.returnType.getText()}\`
`).join(`\n`)}

${jsdoc(c.declaration as any)}

`
  }).join('\n\n')}


## Constants 

 ${constants.map(c => {
    return `
### ${c.name}
Type: \`${c.type.getTargetType() ? c.type.getTargetType().getText() : c.type.getText()}\`

${c.jsdoc || ''}
`
  }).join('\n\n')}


## Types

TODO



`

  writeFileSync('tmp.md', s.replace(/import\(\"[^"]+"\)./g, ''))

  t.true(exec('npx markdown-toc tmp.md -i').code === 0)

  t.true(classes.length > 0 && functions.length > 0 && constants.length > 0)

  exec(`rm -rf ../../demos/docs/mirada-generated-api-ts-morph.md && cp -r tmp.md mirada-generated-api-ts-morph.md`)
})


function jsdoc(p: tsm.JSDocableNode) {
  return p.getJsDocs().map(getInnerText).join('\n');
}

/**
 * https://github.com/dsherret/ts-morph/pull/691
 */
function getInnerText(n: tsm.JSDoc) {
  const innerTextWithStars = n.getText().replace(/^\/\*\*[^\S\n]*\n?/, "").replace(/(\r?\n)?[^\S\n]*\*\/$/, "")
  return innerTextWithStars.split(/\n/).map(line => {
    const starPos = line.indexOf("*")
    if (starPos === -1 || line.substring(0, starPos).trim() !== "")
      return line
    const substringStart = line[starPos + 1] === " " ? starPos + 2 : starPos + 1
    return line.substring(substringStart)
  }).join("\n")
}
