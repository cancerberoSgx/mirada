import { readFileSync, writeFileSync } from 'fs'
import { unique, withoutExtension } from 'misc-utils-of-mine-generic'
import { dirname, join } from 'path'
import { mkdir, rm, test } from 'shelljs'
import { buildDts } from './buildTs'
import { Doxygen2tsOptions } from './doxygen2ts'
import { getBindingsCppMemberdefs } from './opencvUtil'
import { parseDoxygen } from './parseDoxygen'

// export interface Opencv2tsOptions extends  GetBindingsCppCompoundRefsOptions, RemoveProperties<Doxygen2tsOptions, 'doxygenXmlFolder'> {
//   // outputFolder: string
// }

export function opencv2ts(o: Doxygen2tsOptions) {
  rm('-rf', o.tsOutputFolder)
  mkdir('-p', o.tsOutputFolder)
  const defs = getBindingsCppMemberdefs(o)
    ;
  [...defs.classes, ...defs.functions, ...defs.constants].forEach(c => {
    // getMember(c.memberdef)
    const id = c.indexCompound.getAttribute('refid')
    //TODO: don't parse the file again, but query compound using memverdef and buildDts
    if (!id) {
      console.warn('WARNING id or refid null for ' + c.name)
      return
    }
    var r = parseDoxygen({ xml: readFileSync(join(o.opencvBuildFolder, 'doc/doxygen/xml', id + '.xml')).toString() })
    // .filter(f=>f.kind==='class' ? defs.classes.map(f=>f.memberdef.id).includes(f.id) : true)

    // publicTypes: f.functions.filter(f=>defs.functions.map(f=>f.memberdef.id).includes(id)),

    // .map(f=>(f.kind==='group' ? {...f,     functions: f.functions.filter(f=>defs.functions.map(f=>f.memberdef.id).includes(id)),   } : f))
    // .filter(f=>f.kind==='group'? f.functions.length : true)

    // const rf = r.filter(d=>d.kind==='group').map(m=>({functions: m.functions.filter(f=>defs.functions.map(f=>f.memberdef.id).includes(id))}))
    buildDts({
      defs: r,
      isOpenCv: true,
      // debug: true, 
      // renderLocation: true,
      renderLocation: false,
      locationFilePrefix: '#',
      // locationFilePrefix: 'https://github.com/opencv/opencv/tree/ccecd3405a22cd4ed4446574f8465fc7024f7708/modules/core/include/',
      ...o,
      tsCodeFormatSettings: { indentSize: 2, convertTabsToSpaces: true, ...o.tsCodeFormatSettings },
    })
      .results
      .forEach(d => {
        const cName = d.def.compoundname.split('::').pop()
        let fileName = join(o.tsOutputFolder, cName) + '.ts'
        if (test('-f', fileName) && readFileSync(fileName).toString().length !== d.content.length) {
          fileName = withoutExtension((fileName)) + unique('_') + '.ts'
        }
        mkdir('-p', dirname(fileName))
        writeFileSync(fileName, d.content)
        writeFileSync(withoutExtension(fileName) + '.json', JSON.stringify(r, null, 2))
      })
    // buildDts({...o, defs: defs.classes.map(c=>c.memberdef)})
  })
}
