
export const denseOpticalFlow_ts: string = "import * as cv from 'mirada'\nimport * as Mirada from 'mirada';\n\n(async () => {\n  let video = document.getElementById('videoInput')! as HTMLVideoElement\n  const canvas = document.getElementById('outputCanvas')! as HTMLCanvasElement\n  let cap = new cv.VideoCapture(video)\n  // take first frame of the video\n  let frame1 = new cv.Mat(video.height, video.width, cv.CV_8UC4)\n  cap.read(frame1)\n\n  let prvs = new cv.Mat()\n  cv.cvtColor(frame1, prvs, cv.COLOR_RGBA2GRAY)\n  frame1.delete()\n  let hsv = new cv.Mat()\n  let hsv0 = new cv.Mat(video.height, video.width, cv.CV_8UC1)\n  let hsv1 = new cv.Mat(video.height, video.width, cv.CV_8UC1, new cv.Scalar(255))\n  let hsv2 = new cv.Mat(video.height, video.width, cv.CV_8UC1)\n  let hsvVec = new cv.MatVector()\n  hsvVec.push_back(hsv0); hsvVec.push_back(hsv1); hsvVec.push_back(hsv2)\n\n  let frame2 = new cv.Mat(video.height, video.width, cv.CV_8UC4)\n  let next = new cv.Mat(video.height, video.width, cv.CV_8UC1)\n  let flow = new cv.Mat(video.height, video.width, cv.CV_32FC2)\n  let flowVec = new cv.MatVector()\n  let mag = new cv.Mat(video.height, video.width, cv.CV_32FC1)\n  let ang = new cv.Mat(video.height, video.width, cv.CV_32FC1)\n  let rgb = new cv.Mat(video.height, video.width, cv.CV_8UC3)\n\n  const FPS = 30\n  const videoHelper = new Mirada.CameraHelper(video, canvas, processVideo)\n  function processVideo() {\n    try {\n      if (!videoHelper.streaming) {\n        // clean and stop.\n        prvs.delete(); hsv.delete(); hsv0.delete(); hsv1.delete(); hsv2.delete()\n        hsvVec.delete(); frame2.delete(); flow.delete(); flowVec.delete(); next.delete()\n        mag.delete(); ang.delete(); rgb.delete()\n        return\n      }\n      let begin = Date.now()\n      // start processing.\n      cap.read(frame2)\n      cv.cvtColor(frame2, next, cv.COLOR_RGBA2GRAY)\n      cv.calcOpticalFlowFarneback(prvs, next, flow, 0.5, 3, 15, 3, 5, 1.2, 0)\n      cv.split(flow, flowVec)\n      let u = flowVec.get(0)\n      let v = flowVec.get(1)\n      cv.cartToPolar(u, v, mag, ang)\n      u.delete(); v.delete()\n      ang.convertTo(hsv0, cv.CV_8UC1, 180 / Math.PI / 2)\n      cv.normalize(mag, hsv2, 0, 255, cv.NORM_MINMAX, cv.CV_8UC1)\n      cv.merge(hsvVec, hsv)\n      cv.cvtColor(hsv, rgb, cv.COLOR_HSV2RGB)\n      cv.imshow('outputCanvas', rgb)\n      next.copyTo(prvs)\n      // schedule the next one.\n      let delay = 1000 / FPS - (Date.now() - begin)\n      setTimeout(processVideo, delay)\n    } catch (err) {\n      console.error(err)\n    }\n  }\n  setTimeout(() => videoHelper.start(), 0)\n  setTimeout(() => videoHelper.stop(), 10000)\n})()\n";