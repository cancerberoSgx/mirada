// npm run build && rm -rf docs && mkdir -p docs && cp static/* docs &&  npx parcel -d docs test/probes/probe.html
import 'babel-polyfill'
import { OpenCvBrowserUtils } from '../../src/opencvBrowserUtil'
import { CV } from '../../src/opencvTypes';
import { ok } from 'assert'
import { getImageData, showMat } from '../../src/browserImageUtil';
export declare var cv: CV

async function test() {
  let utils = new OpenCvBrowserUtils();
  await utils.loadOpenCv()

  await utils.createFileFromUrl('shape.jpg', '/shape.jpg')
  const content = cv.FS.readFile('/shape.jpg')
  ok(content && content.byteLength > 0)

  var data = await getImageData('shape.jpg')
  var src = cv.matFromImageData(data);
  let dst = new cv!.Mat();

  src.data.set(data.data);

  cv!.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
  showMat(src)
  showMat(dst)
  src.delete();
  dst.delete();
}
test()

