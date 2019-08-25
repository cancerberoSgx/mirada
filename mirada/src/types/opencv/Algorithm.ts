
import { bool } from './_types'

/**
 * especially for classes of algorithms, for which there can be multiple implementations. The examples
 * are stereo correspondence (for which there are algorithms like block matching, semi-global block
 * matching, graph-cut etc.), background subtraction (which can be done using mixture-of-gaussians
 * models, codebook-based algorithm etc.), optical flow (block matching, Lucas-Kanade, Horn-Schunck
 * etc.).
 * 
 * Here is example of [SimpleBlobDetector](#d0/d7a/classcv_1_1SimpleBlobDetector}) use in your
 * application via [Algorithm](#d3/d46/classcv_1_1Algorithm}) interface: 
 * 
 * ```cpp
 *     Ptr<Feature2D> sbd = SimpleBlobDetector::create();
 *     FileStorage fs_read("SimpleBlobDetector_params.xml", FileStorage::READ);
 * 
 *     if (fs_read.isOpened()) // if we have file with parameters, read them
 *     {
 *         sbd->read(fs_read.root());
 *         fs_read.release();
 *     }
 *     else // else modify the parameters and store them; user can later edit the file to use
 * different parameters
 *     {
 *         fs_read.release();
 *         FileStorage fs_write("SimpleBlobDetector_params.xml", FileStorage::WRITE);
 *         sbd->write(fs_write);
 *         fs_write.release();
 *     }
 * 
 *     Mat result, image = imread("../data/detect_blob.png", IMREAD_COLOR);
 *     vector<KeyPoint> keypoints;
 *     sbd->detect(image, keypoints, Mat());
 * 
 *     drawKeypoints(image, keypoints, result);
 *     for (vector<KeyPoint>::iterator k = keypoints.begin(); k != keypoints.end(); ++k)
 *         circle(result, k->pt, (int)k->size, Scalar(0, 0, 255), 2);
 * 
 *     imshow("result", result);
 *     waitKey(0);
 * ```
 * 
 * Source:
 * [opencv2/core.hpp](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/core.hp
 * p#L3077).
 * 
 */
export declare class Algorithm {

  /**
   *   
   */
  public constructor()

  /**
   *   
   */
  public clear(): void

  /**
   *   
   */
  public empty(): bool

  /**
   *   Returns the algorithm string identifier. This string is used as top level xml/yml node tag when
   * the object is saved to a file or string.
   *   
   */
  public getDefaultName(): any

  /**
   *   
   *   @param fn 
   */
  public read(fn: any): any

  /**
   *   Saves the algorithm to a file. In order to make this method work, the derived class must
   * implement Algorithm::write(FileStorage& fs).
   *   
   *   @param filename 
   */
  public save(filename: any): any

  /**
   *   
   *   @param fs 
   */
  public write(fs: any): any

  /**
   *   
   *   @param fs 
   *   @param name 
   */
  public write(fs: any, name?: any): any

  /**
   *   This is static template method of [Algorithm](#d3/d46/classcv_1_1Algorithm}). It's usage is
   * following (in the case of SVM): 
   *   
   *   ```cpp
   *   Ptr<SVM> svm = Algorithm::load<SVM>("my_svm_model.xml");
   *   ```
   *   
   *    In order to make this method work, the derived class must overwrite
   * [Algorithm::read](#d3/d46/classcv_1_1Algorithm_1aef2ad3f4145bd6e8c3664eb1c4b5e1e6})(const
   * [FileNode](#de/dd9/classcv_1_1FileNode})& fn).
   *   
   *   @param arg0 
   *   @param filename Name of the file to read.
   *   @param objname The optional name of the node to read (if empty, the first top-level node will be
   * used)
   */
  public static load(arg0: any, filename: any, objname?: any): any

  /**
   *   This is static template method of [Algorithm](#d3/d46/classcv_1_1Algorithm}). It's usage is
   * following (in the case of SVM): 
   *   
   *   ```cpp
   *   Ptr<SVM> svm = Algorithm::loadFromString<SVM>(myStringModel);
   *   ```
   *   
   *   @param arg1 
   *   @param strModel The string variable containing the model you want to load.
   *   @param objname The optional name of the node to read (if empty, the first top-level node will be
   * used)
   */
  public static loadFromString(arg1: any, strModel: any, objname?: any): any

  /**
   *   This is static template method of [Algorithm](#d3/d46/classcv_1_1Algorithm}). It's usage is
   * following (in the case of SVM): 
   *   
   *   ```cpp
   *   cv::FileStorage fsRead("example.xml", FileStorage::READ);
   *   Ptr<SVM> svm = Algorithm::read<SVM>(fsRead.root());
   *   ```
   *   
   *    In order to make this method work, the derived class must overwrite
   * [Algorithm::read](#d3/d46/classcv_1_1Algorithm_1aef2ad3f4145bd6e8c3664eb1c4b5e1e6})(const
   * [FileNode](#de/dd9/classcv_1_1FileNode})& fn) and also have static create() method without
   * parameters (or with all the optional parameters)
   *   
   *   @param arg2 
   *   @param fn 
   */
  public static read(arg2: any, fn: any): any
}

