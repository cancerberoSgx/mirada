// Ported from opencv tutorials, it loads a coupld of training models , and run each against the image (loaded from current canvas content)
import * as cv from 'mirada'
import * as Mirada from 'mirada'
(async () => {
  const canvas = document.getElementById('outputCanvas')!
  const f = await Mirada.File.fromUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/640px-Gull_portrait_ca_usa.jpg')
  var src = f.asMat()
  var dst = src.clone()
  const mask = cv.Scalar.all(0)
  // cv.threshold(src,m, 20, 155, cv.THRESH_BINARY_INV)
  // const mm = m.clone();
  // const mask = new cv.Mat()
  //  mask.create(src.rows+2, src.cols+2, cv.CV_8UC1);
  //  cv.floodFill(m, mm, new cv.Point(0,0), new cv.Scalar(255,0,0));
     const ccomp = new cv.Rect()
      const flags = 4 + (255 << 8) 
     const  area = cv.floodFill(dst, new cv.Point(0,0), new cv.Scalar(255,0,0), ccomp,new  Scalar(0,0,0),
                  new Scalar(0,0,0), flags);
  cv.imshow(canvas, m)

//const mask = cv.Mat.zeros(src.rows+2,src.cols+2,cv.CV_8U)

//let floodflags = 4
//floodflags |= cv.FLOODFILL_MASK_ONLY
//floodflags |= (255 << 8)
//const fillValue = 128;
//cv.floodFill(src, mask, new cv.Point(12, 12), new cv.Scalar(255,0,0))


  //cv.imshow(canvas, src)
})()
