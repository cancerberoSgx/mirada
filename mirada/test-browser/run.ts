import puppeteer from 'puppeteer'
import { staticServer } from './staticServer';
import { existsSync } from 'fs';
const colors = require("ansi-colors")

interface Options {
  buildFolder?:string
    port?: number
    debug?: boolean
    noHeadless?: boolean
    serverPrefix?: string
    path?:string
    noExit?: boolean,
    screenshot?: boolean,
    help?: boolean,
    maxBlockDuration?: number
}

async function main(o_:Options = {}) {
  const o: Required<Options> = Object.assign({}, {
    buildFolder: 'test-browser-outdir',
    port: 8080,
    debug: false,
    noHeadless: false,
    serverPrefix: `http://localhost`,
    path: 'index.html',
    noExit: false,
    screenshot: false,
    help: false,
    maxBlockDuration: 30000
  }, o_)
  if (o.noExit) {
    o.maxBlockDuration = 999999999
  }
  o.debug && debug('Current Options:\n'+JSON.stringify(o));
  if (o.help) {
    printHelpAndExit();
  }
  const serverAddress = `${o.serverPrefix}:${o.port}`
  const url = `${serverAddress}/${o.path}`;
  if (!existsSync(o.buildFolder)) {
     error(`Expected folder "${o.buildFolder} to exists. Aborting`);
  }
  o.debug && debug('Server Listening at ' + url);
  const server = await staticServer(o.buildFolder, o.port );
  o.debug && debug(`Browser launching ${!o.noHeadless ? 'headless' : 'not headless'}`);
  const browser = await puppeteer.launch({ headless: !o.noHeadless });
  const page = await browser.newPage();
  page.on('console', e => {
    if (e.type() === 'error') {
      console.error('error: '+JSON.stringify(e.location())+ '\n' +  e.text().split('\n').map(l => l.replace(serverAddress, o.buildFolder)).join('\n'))
    }
    console.log('log: ' + JSON.stringify(e.location()) + '\n' + e.text())
  });
  o.debug && debug(`Opening page address ${url}`);
  await page.goto(url);

  await page.waitForFunction(()=>(window as any).miradaTestEnd)
  
  await server && server.close();
  await browser.close();

}


  async function debug(s:string) {
    process.stdout.write(colors.blackBright(s + '\n'));
  }
  async function error(s:string) {
    process.stdout.write(colors.redBright(s + '\n'));
  }
function printHelpAndExit() {
  debug(`
Usage: 

npx ts-node test-browser/run.ts [options]

# Options

 * port?: number. Default 8080
 * buildFolder?: string. Default __dirname (this folder)
 * debug?: boolean. Default false
 * noHeadless?: boolean. Default false
 * serverPrefix?: string . Default http://localhost
 * help?: boolean
 * screenshot?: boolean
 * noExit?: boolean default false. If true it will keep running the server - together with noHeadless you can debug in the browser.
 * noTryCatch?: boolean will disable Qunit tryCatch - so exceptions are dump to stdout rather than in the browser.
 * maxBlockDuration: QUnit timeout . if noExist then is infinity.
  `);
  process.exit(0);
}

 main(require('minimist')(process.argv.slice(2)));
