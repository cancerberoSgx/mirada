;(async () => {
  const canvas = document.getElementById('outputCanvas')!
  var img = await cv.imread(canvas)
  let dst = new cv.Mat()
  let M = cv.Mat.ones(5, 5, cv.CV_8U)
  let anchor = new cv.Point(-1, -1)
  cv.dilate(img, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())
  cv.imshow(canvas, dst)
})()
