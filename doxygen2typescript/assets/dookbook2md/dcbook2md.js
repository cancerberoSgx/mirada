
var cmd = require('shelljs').ls('-R', 'build_js/doc/doxygen/docbook/**/*xml').map(f=>`pandoc  -f docbook -t markdown -s ${f} -o ${f.substring(0, f.length-4)}.md`).join('\n')
require('fs').writeFileSync('docbook2md.sh', cmd)

