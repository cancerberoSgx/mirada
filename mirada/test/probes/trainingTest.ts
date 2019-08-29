// import test from 'ava'
// import { array, randomFloatBetween } from 'misc-utils-of-mine-generic'
// import { loadMirada } from './testUtil'

// test.before(loadMirada)

// function doubles(l: number, min: number, max: number) {
//   return array(l).map(n => randomFloatBetween(min, max))
// }
// test.skip('library loads manually without proxy', async t => {
//   t.true(true)
//   // await loadOpencv()

//   //  const NTRAINING_SAMPLES = 100;
//   //   const  FRAC_LINEAR_SEP = 0.9

//   //       // Data for visual representation
//   //   const width = 512, height = 512;
//   //   const I = cv.Mat.zeros(height, width, cv.CV_8UC3);
//   //       // --------------------- 1. Set up training data randomly---------------------------------------
//   //       const trainData = new cv.Mat(2 * NTRAINING_SAMPLES, 2, cv.CV_32F);
//   //       const labels = new cv.Mat(2 * NTRAINING_SAMPLES, 1, cv.CV_32S);
//   //       // Random rng = new cv.Random(100); // Random value generation class
//   //       // Set up the linearly separable part of the training data
//   //       const nLinearSamples =Math.round (FRAC_LINEAR_SEP * NTRAINING_SAMPLES);
//   //       // Generate random points for the class 1
//   //       let trainClass = trainData.rowRange(0, nLinearSamples);
//   //       // The x coordinate of the points is in [0, 0.4)
//   //       let c = trainClass.colRange(0, 1);
//   //       let cData = array(Math.round (c.total() * c.channels()))
//   //     let  cDataDbl = doubles(cData.length, 0, 0.4 * width)
//   //       for (let i = 0; i < cData.length; i++) {
//   //           cData[i] = cDataDbl[i];
//   //       }
//   //       c.put(0, 0, cData);
//   //       // The y coordinate of the points is in [0, 1)
//   //       c = trainClass.colRange(1, 2);
//   //       cData = array(c.total() * c.channels())
//   //       cDataDbl = doubles(cData.length, 0, height) 
//   //       for (let i = 0; i < cData.length; i++) {
//   //           cData[i] = cDataDbl[i];
//   //       }
//   //       c.put(0, 0, cData);
//   //       // Generate random points for the class 2
//   //       trainClass = trainData.rowRange(2 * NTRAINING_SAMPLES - nLinearSamples, 2 * NTRAINING_SAMPLES);
//   //       // The x coordinate of the points is in [0.6, 1]
//   //       c = trainClass.colRange(0, 1);
//   //       cData = array(  (c.total() * c.channels()))
//   //       cDataDbl =  doubles(cData.length, 0.6 * width, width) 
//   //       for (let i = 0; i < cData.length; i++) {
//   //           cData[i] = cDataDbl[i];
//   //       }
//   //       c.put(0, 0, cData);
//   //       // The y coordinate of the points is in [0, 1)
//   //       c = trainClass.colRange(1, 2);
//   //       cData = array(c.total() * c.channels())
//   //       cDataDbl =  doubles(cData.length, 0, height) 
//   //       for (let i = 0; i < cData.length; i++) {
//   //           cData[i] = cDataDbl[i];
//   //       }
//   //       c.put(0, 0, cData);
//   //       // ------------------ Set up the non-linearly separable part of the training data ---------------
//   //       // Generate random points for the classes 1 and 2
//   //       trainClass = trainData.rowRange(nLinearSamples, 2 * NTRAINING_SAMPLES - nLinearSamples);
//   //       // The x coordinate of the points is in [0.4, 0.6)
//   //       c = trainClass.colRange(0, 1);
//   //       cData =array((c.total() * c.channels()))
//   //       cDataDbl = doubles(cData.length, 0.4 * width, 0.6 * width) 
//   //       for (let i = 0; i < cData.length; i++) {
//   //           cData[i] =cDataDbl[i];
//   //       }
//   //       c.put(0, 0, cData);
//   //       // The y coordinate of the points is in [0, 1)
//   //       c = trainClass.colRange(1, 2);
//   //       cData = array((c.total() * c.channels()))
//   //       cDataDbl =  doubles(cData.length, 0, height)
//   //       for (let i = 0; i < cData.length; i++) {
//   //           cData[i] = cDataDbl[i];
//   //       }
//   //       c.put(0, 0, cData);
//   //       // ------------------------- Set up the labels for the classes---------------------------------
//   //       labels.rowRange(0, NTRAINING_SAMPLES).setTo(new cv.Scalar(1) as any); // Class 1
//   //       labels.rowRange(NTRAINING_SAMPLES, 2 * NTRAINING_SAMPLES).setTo(new cv.Scalar(2) as any); // Class 2
//   //       // ------------------------ 2. Set up the support vector machines parameters--------------------
//   //       // console.log("Starting training process");
//   //       const svm = cv.SVM.create();

//   //   //      svm->setType(SVM::C_SVC);
//   //   // svm->setKernel(SVM::LINEAR);
//   //   // svm->setTermCriteria(TermCriteria(TermCriteria::MAX_ITER, 100, 1e-6));
//   //   // svm->train(train

//   //       svm.setType(cv.SVM.C_SVC);
//   //       svm.setC(0.1);
//   //       svm.setKernel(cv.SVM.LINEAR);
//   //       svm.setTermCriteria(new cv.TermCriteria(cv.INTER_MAX,  1e7, 1e-6));
//   //       // ------------------------ 3. Train the svm----------------------------------------------------
//   //       svm.train(trainData, Ml.ROW_SAMPLE, labels);
//   //       console.log("Finished training process");
//   //       // ------------------------ 4. Show the decision regions----------------------------------------
//   //      let IData = array  (I.total() * I.channels())
//   //       let sampleMat = new cv.Mat(1, 2, cv.CV_32F);
//   //       let sampleMatData = array(sampleMat.total() * sampleMat.channels())
//   //       for (let i = 0; i < I.rows(); i++) {
//   //           for (let j = 0; j < I.cols(); j++) {
//   //               sampleMatData[0] = j;
//   //               sampleMatData[1] = i;
//   //               sampleMat.put(0, 0, sampleMatData);
//   //               let response = svm.predict(sampleMat);
//   //               if (response == 1) {
//   //                   IData[(i * I.cols() + j) * I.channels()] = 0;
//   //                   IData[(i * I.cols() + j) * I.channels() + 1] = 100;
//   //                   IData[(i * I.cols() + j) * I.channels() + 2] = 0;
//   //               } else if (response == 2) {
//   //                   IData[(i * I.cols() + j) * I.channels()] = 100;
//   //                   IData[(i * I.cols() + j) * I.channels() + 1] = 0;
//   //                   IData[(i * I.cols() + j) * I.channels() + 2] = 0;
//   //               }
//   //           }
//   //       }
//   //       I.put(0, 0, IData);
//   //       // ----------------------- 5. Show the training data--------------------------------------------
//   //       let thick = -1;
//   //       let lineType = cv.LINE_8//Imgproc.LINE_8;
//   //       let px, py;
//   //       // Class 1
//   //       let trainDataData = array (trainData.total() * trainData.channels())
//   //       trainData.get(0, 0, trainDataData);
//   //       for (let i = 0; i < NTRAINING_SAMPLES; i++) {
//   //           px = trainDataData[i * trainData.cols()];
//   //           py = trainDataData[i * trainData.cols() + 1];
//   //           cv.circle(I, new cv.Point(px, py), 3, new cv.Scalar(0, 255, 0), thick, lineType, 0);
//   //       }
//   //       // Class 2
//   //       for (let i = NTRAINING_SAMPLES; i < 2 * NTRAINING_SAMPLES; ++i) {
//   //           px = trainDataData[i * trainData.cols()];
//   //           py = trainDataData[i * trainData.cols() + 1];
//   //           cv.circle(I, new cv.Point(px, py), 3, new cv.Scalar(255, 0, 0), thick, lineType, 0);
//   //       }
//   //       // ------------------------- 6. Show support vectors--------------------------------------------
//   //       thick = 2;
//   //       let sv = svm.getUncompressedSupportVectors();
//   //      let  svData = array(sv.total() * sv.channels())
//   //       sv.get(0, 0, svData);
//   //       for (let i = 0; i < sv.rows(); i++) {
//   //           cv.circle(I, new cv.Point(svData[i * sv.cols()], svData[i * sv.cols() + 1]), 6, new cv.Scalar(128, 128, 128),
//   //                   thick, lineType, 0);
//   //       }
//   //       // cv.imwrite("result.png", I); // save the Image
//   //       // HighGui.imshow("SVM for Non-Linear Training Data", I); // show it to the user
//   //       // HighGui.waitKey();
//   //       // System.exit(0);
//   //   }

// })
