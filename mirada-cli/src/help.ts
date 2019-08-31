import { wordWrap, objectKeys } from 'misc-utils-of-mine-generic';
import { getCommand, getCommands } from './commandManager';
import { fail } from './cli';
let help;
export function printHelp(command?: true | string) {
  if (typeof command === 'string') {
    const c = getCommand(command);
    if (!c) {
      return fail(`Unrecognized command ${command}\n\n${currentSupportedCommands()}`);
    }
    process.stdout.write(`
*** ${c.name} ***
${c.doc ? '\n' + wrap(c.doc) + '\n' : '    '}
Options:

* ${c.properties.map(o => wrap(`${o.name}: ${o.type} - (${o.optional ? 'optional' : 'required'}) ${o.doc}`, '    ')).join('\n* ')}
`);
    return process.exit(0);
  }
  process.stdout.write(`
Usage: 

# execute two commands given as JS literal object (notice the file named tmp.mat)
ojos "name:'grabCut', in:'../imgs/foo.png', rect:'{x:100,y:90,w:79,h:80}', out:'tmp.mat'" \\
     "name:'toRgba', in:'tmp.mat', out:'out/foo.gif'"

# execute commands defined in file removeBg17.json.ejs evaluated as a template with context given in --variables
ojos --commands removeBg17.json.ejs \\
     --variables "bg:'#ffeeee', replaceWith:'rgba(222,122,211,128)'"

# Same as before but variables read from stdin and commands file fetched from url
cat vars.json | ojos --commands https://app.com/imgproc/features/people22

# daemon mode
mkpipe ./tmp/pipe1
ojos --listen ./tmp/pipe1

Options:

* ${objectKeys(globalOptions).map(k => wrap(`${k}: ${globalOptions[k]}`, '    ')).join('\n* ')}

For help on a particular command use for example:  

ojos --help grabCut

${currentSupportedCommands()}
` + '\n\n');
}
function currentSupportedCommands() {
  return `Current supported commands:

* ${getCommands().map(c => wrap(`${c.name}: ${c.doc}`, '    ')).join('\n* ')}\n`;
}
const globalOptions = {
  'config': 'string (Optional) Path to a configuration file. it could be .json with valid JSON content or .js in which case it must be a valid Node.js commons module (use module.exports=[]). In both cases the data must be an array of commands. ',
  'variables': 'string (Optional) object like string with key-values which will be used to evaluate the --config file as a template (ejs.co).',
  'help': 'string (Optional) If no value is given it prints general usage information. If a command names is given will print command\'s properties help.',
  'debug': 'boolean: If given debug information will be dumped to stdout.'
};
function wrap(d: string, prefix = '') {
  const w = (process.stdout.columns || 120) - 8;
  d = wordWrap(d, w);
  d = d.split('\n').map((l, i) => i === 0 ? l : `${prefix}${l}`).join('\n'); //i===0 ? l : `${prefix}${l}`).join('\n') || ''
  return d;
}
