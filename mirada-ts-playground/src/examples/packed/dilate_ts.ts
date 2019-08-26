
export const dilate_ts: string = "(async () => {\n  const canvas = document.getElementById('outputCanvas')!\n  var img = await cv.imread(canvas)\n  let dst = new cv.Mat()\n  let M = cv.Mat.ones(5, 5, cv.CV_8U)\n  let anchor = new cv.Point(-1, -1)\n  cv.dilate(img, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())\n  cv.imshow(canvas, dst)\n})()\n";
