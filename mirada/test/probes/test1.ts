// https://webrtc.github.io/samples/src/content/getusermedia/canvas/
import puppeteer from 'puppeteer'
import { sleep } from 'misc-utils-of-mine-generic'
// hrome.exe --use-fake-ui-for-media-stream --disable-web-security --use-fake-device-for-media-stream --use-file-for-fake-video-capture="C:\Users\user\Desktop\test\fileName.y4m" --allow-file-acces
async function test(){
// const server = await staticServer(o.buildFolder, o.port)
  const browser = await puppeteer.launch({ headless: true, args: [ '--disable-web-security', '--allow-file-access',  '--use-fake-ui-for-media-stream']})
  const page = await browser.newPage()
  page.on('console', e => {
    if (e.type() === 'error') {
      console.error('error: ' + JSON.stringify(e.location()) + '\n' + e.text().split('\n').join('\n'))
    }
    console.log('log: ' + JSON.stringify(e.location()) + '\n' + e.text())
  })

  // await page.set
  await page.goto('https://webrtc.github.io/samples/src/content/getusermedia/canvas/')
 await page.screenshot({ path:'tmp-screenshot1.png' })

    await sleep(2000)
 await page.screenshot({ path:'tmp-screenshot2.png' })
  await browser.close()
}
 
 test()