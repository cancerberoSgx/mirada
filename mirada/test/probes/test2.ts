import puppeteer from 'puppeteer'
import { sleep } from 'misc-utils-of-mine-generic'
import { staticServer } from '../../test-browser/staticServer'
import { File } from '../../src'
import { loadMirada, write } from '../testUtil'

async function test() {
  const server = await staticServer(__dirname, 8080)
  await sleep(1111)
  const browser = await puppeteer.launch({ headless: true, args: ['--disable-web-security', '--allow-file-access', '--use-fake-ui-for-media-stream'] })
  const page = await browser.newPage()
  page.on('console', e => {
    if (e.type() === 'error') {
      console.error('error: ' + JSON.stringify(e.location()) + '\n' + e.text().split('\n').join('\n'))
    }
    console.log('log: ' + JSON.stringify(e.location()) + '\n' + e.text())
  })

  await page.goto('http://127.0.0.1:8080/test2.html')
  await sleep(1000)

  await page.exposeFunction('postFrame', async (width, height, data: number[]) => {
    const imageData = {
      data: new Uint8ClampedArray(data),
      width,
      height
    }
    //  console.log('node', process.version, typeof data, ArrayBuffer.isView(data), Array.isArray(data), Buffer.isBuffer(data), width, height);
    await loadMirada()
    console.log(cv.getBuildInformation());    
    // await (window as any).fromData(imageD ata).write('tmp.png')
    // const m = new cv.Mat(height, width, cv.CV_8UC4)
    // m.data.data = new Uint8ClampedArray(data)
    // write(m, 'tmp3.jpg')
    await File.fromData(imageData, 'tmp.png').toRgba().write('tmp.png')
    // const f2 = await File.fromFile('test/assets/floodfill.png')
    // await f2.write('tmp2.png')
  })
  await sleep(1000)
  await page.evaluate(() => {
    return new Promise(resolve => {
      const video = document.querySelector('video')!
      const canvas = document.querySelector('canvas')!
      canvas.width = 480;
      canvas.height = 360;
      const constraints = {
        audio: false,
        video: true
      };
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => { console.log('READDD'); video.srcObject = stream; resolve() })
        .catch(error => console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name))
    })
  })

  await sleep(2000)
  // await page.screenshot({ path:'tmp-screenshot2.png' })
  await page.evaluate(async () => {
    //  debugger
    const video = document.querySelector('video')!
    const canvas = document.querySelector('canvas')!
    canvas!.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height)
    const data = canvas!.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height)
    //  console.log('browser',data);
    //  debugger
    await (window as any).postFrame(data.width, data.height, Array.from(data.data.values()))

  })
  // await sleep(40000)
  await server.close()
  await browser.close()
}

test()