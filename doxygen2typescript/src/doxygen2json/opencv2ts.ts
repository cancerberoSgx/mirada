import { GetBindingsCppCompoundRefsOptions, getBindingsCppMemberdefs } from './opencvUtil';
import { rm, mkdir } from 'shelljs';
import { doxygen2ts, Doxygen2tsOptions } from './doxygen2ts';
import { RemoveProperties } from 'misc-utils-of-mine-generic';
import { buildDts } from './buildTs';
import { parseDoxygen } from './parseDoxygen';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

// export interface Opencv2tsOptions extends  GetBindingsCppCompoundRefsOptions, RemoveProperties<Doxygen2tsOptions, 'doxygenXmlFolder'> {
//   // outputFolder: string
// }

export function opencv2ts(o:Doxygen2tsOptions){
  rm('-rf', o.tsOutputFolder)
  mkdir('-p', o.tsOutputFolder)
  const defs = getBindingsCppMemberdefs(o)
  

  defs.classes.forEach(c=>{
    var r = parseDoxygen({ xml: readFileSync(join(o.opencvBuildFolder, 'doc/doxygen/xml', c.memberdef.getAttribute('refid') + '.xml')).toString() })
    var files = buildDts({
      defs: r, 
      isOpenCv: true, 
      debug: true, 
      renderLocation: true,
      tsCodeFormatSettings: { indentSize: 2, convertTabsToSpaces: true },
      locationFilePrefix: 'https://github.com/opencv/opencv/tree/ccecd3405a22cd4ed4446574f8465fc7024f7708/modules/core/include/'
    }).results
    files.forEach(d => {
      const cName = d.def.compoundname.split('::').pop()
      const fileName = join(o.tsOutputFolder, cName) + '.ts'
      mkdir('-p', dirname(fileName))
      writeFileSync(fileName, d.content)
    })    
    // buildDts({...o, defs: defs.classes.map(c=>c.memberdef)})

  })
}