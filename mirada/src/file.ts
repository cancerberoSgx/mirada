import { ok } from 'assert'
import fetch from 'cross-fetch'
import { asArray, basename, getFileExtension, getFileNameFromUrl, getMimeTypeForExtension, inBrowser, notUndefined, serial, unique } from 'misc-utils-of-mine-generic'
import { getDefaultCodec } from './format'
import { ImageData, Mat } from './types/opencv'
import { arrayBufferToBase64, urlToBase64 } from './util/base64'
import { isFile, readFile, writeFile } from './util/fileUtil'
import { imageData } from './util/imageUtil'
import fileType = require('file-type')

/**
 * A thin layer on top of cv.Mat with lots of utilities to load, write, encode, etc.
 */
export class File {
  constructor(public readonly name: string, protected mat: Mat) {

  }

  size() {
    return {
      width: this.mat.cols,
      height: this.mat.rows
    }
  }

  getMimeType() {
    return getMimeTypeForExtension(this.getExtension())
  }

  getExtension() {
    return getFileExtension(this.name).toLowerCase()
  }

  asMat(): Mat {
    return this.mat
  }

  asImageData(): ImageData {
    return imageData(this.mat)
  }

  asDataUrl() {
    return 'data:' + this.getMimeType() + ';' + this.name + ';base64,' + this.asBase64()
  }

  /**
   * Returns an array buffer containing the image encoded in given format or inferring format from its name.
   */
  async asArrayBuffer(format = this.getExtension()) {
    return await getDefaultCodec().encode(this.asImageData(), format)
  }

  /**
   * Writes this image on given file path, encoded in given format (or inferred form current name).
   */
  async write(path: string = this.name, format = this.getExtension()) {
    const a = await this.asArrayBuffer(format)
    writeFile(path, new Uint8ClampedArray(a))
  }

  /**
   * Shows this image in given HTML canvas or image element.
   */
  show(el: HTMLCanvasElement | HTMLImageElement) {
    if (!inBrowser()) {
      throw new Error('This method is only supported in the browser')
    }
    cv.imshow(el, this.asMat())
  }

  async asBase64(format = this.getExtension()) {
    var encoded = await this.asArrayBuffer(format)
    return arrayBufferToBase64(encoded)
  }

  delete(): any {
    this.mat && this.mat.delete()
  }

  /** 
   * Loads file from given base64 string containing an encoded image.  
  */
  public static fromBase64(base64: string, name?: string) {
    var buffer = Buffer.from(Base64.decode(base64), 'base64')
    return File.fromArrayBuffer(buffer, name || File.getBufferFileName(buffer))
  }

  /** 
   * Loads file from given array buffer containing an encoded image.
   */
  public static async fromArrayBuffer(buffer: ArrayBuffer, name?: string) {
    var data = await getDefaultCodec().decode(buffer)
    return File.fromData(data, name || File.getBufferFileName(buffer))
  }

  /** 
   * Loads file from given array buffer view containing an encoded image.
   */
  public static async fromArrayBufferView(a: ArrayBufferView, name?: string) {
    return File.fromArrayBuffer(a.buffer, name)
  }

  public static getBufferFileType(a: ArrayBuffer) {
    var t = fileType(a)
    if (!t) {
      throw new Error('Could not get file type for buffer')
    }
    return t
  }

  public static getBufferFileName(a: ArrayBuffer) {
    var t = File.getBufferFileType(a)
    return unique('file') + t.ext
  }

  /** 
   * Loads file from given data url string containing an encoded image.
  */
  public static async fromDataUrl(dataUrl: string, name?: string) {
    return await File.fromBase64(urlToBase64(dataUrl), name)
  }

	/**
	 * Loads files from files in html input element of type "file".
	 */
  public static fromHtmlFileInputElement(el: HTMLInputElement): Promise<File[]> {
    if (!inBrowser()) {
      throw new Error('This method is only supported in the browser')
    }
    return Promise.all(Array.from(el.files!).map(file => new Promise<File>((resolve, reject) => {
      var reader = new FileReader()
      reader.addEventListener('loadend', async e => resolve(await File.fromArrayBuffer(reader.result as ArrayBuffer, file.name)))
      reader.readAsArrayBuffer(file)
    })))
  }

	/**
	 * Loads file form existing HTMLCanvasElement or HTMLImageElement
	 */
  public static fromCanvas(el: HTMLCanvasElement | HTMLImageElement | string): File {
    if (!inBrowser()) {
      throw new Error('This method is only supported in the browser')
    }
    return File.fromMat(cv.imread(el))
  }

  /**
   * Shortcut for [resolve] that returns the first result.
   */
  public static async resolveOne(files: string | File | undefined | (string | File | undefined)[]) {
    var a = await File.resolve(files)
    return a.length > 0 ? a[0] : undefined
  }

  /**
   * Given paths, urls or files it will try to load them all and return a list of File for those succeed.
   */
  public static async resolve(files: string | File | undefined | (string | File | undefined)[]) {
    var a = (asArray<undefined | string | File>(files || [])).filter(notUndefined)
    var result = await serial(a.map(f => async () => {
      if (typeof f === 'string') {
        if (isFile(f)) {
          return await File.fromFile(f)
        }
        else {
          return await File.fromUrl(f)
        }
      }
      else {
        ok(ArrayBuffer.isView(f.mat.data.buffer))
        return f
      }
    }))
    return result.filter(notUndefined)
  }

  public static isFile(f: any): f is File {
    return !!f && !!(f as File).name && !!(f as File).mat && !!(f as File).mat.data &&
      typeof (f as File).constructor !== 'undefined' && !!(f as File).asImageData && !!(f as File).asMat
  }

  public static asPath(f: string | File) {
    return typeof f === 'string' ? f : f.name
  }

  public static fromData(data: ImageData, name: string) {
    return new File(name, cv.matFromImageData(data))
  }

  public static fromMat(mat: Mat, name?: string) {
    return new File(name || unique('file') + '.png', mat)
  }

  public static async fromUrl(url: string, o: RequestInit & FileOptions = {}) {
    const p = getDefaultCodec()
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    var data = await p.decode(buffer)
    return File.fromData(data, o.name || getFileNameFromUrl(url))
  }

  public static async fromFile(path: string, o: FileOptions = {}) {
    const data = await getDefaultCodec().decode(readFile(path).buffer)
    return File.fromData(data, o.name || basename(path))
  }

}

interface FileOptions { name?: string }
