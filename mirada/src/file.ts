import { ok } from 'assert'
import fetch from 'cross-fetch'
import { asArray, basename, getFileExtension, getFileNameFromUrl, getMimeTypeForExtension, inBrowser, notUndefined, serial, unique } from 'misc-utils-of-mine-generic'
import { asHtmlImageData } from './browser/imageCreation'
import { decodeOrThrow, encodeOrThrow, getDefaultCodec } from './format'
import { ImageData as CVImageData, Mat } from './types/opencv'
import { arrayBufferToBase64, urlToBase64 } from './util/base64'
import { isFile, readFile, removeFile, writeFile } from './util/fileUtil'
import { toImageData, toRgba } from './util/imageUtil'
import fileType = require('file-type')

/**
 * A thin layer on top of cv.Mat with lots of utilities to load, write, encode, etc.
 */
export class File {
  constructor(public readonly name: string, protected _mat: Mat) {

  }

  size() {
    return {
      width: this._mat.cols,
      height: this._mat.rows
    }
  }

  getMimeType() {
    return getMimeTypeForExtension(this.getExtension())
  }

  getExtension() {
    return getFileExtension(this.name).toLowerCase()
  }

  asMat(): Mat {
    return this._mat
  }

  asImageData(): CVImageData {
    return toImageData(this._mat)
  }

  asHTMLImageData(): ImageData {
    return asHtmlImageData(this._mat)
  }

  asDataUrl() {
    return 'data:' + this.getMimeType() + ';' + this.name + ';base64,' + this.asBase64()
  }

  get width() {
    return this._mat.cols
  }

  get height() {
    return this._mat.rows
  }

  get mat() {
    return this._mat
  }

  /** 
   * It removes the the file from file system and also delete() this file's Mat 
   */
  remove(deleteMat = true) {
    deleteMat && this.delete()
    this.name && isFile(this.name) && removeFile(this.name)
    return this
  }
  /**
   * Returns an array buffer containing the image encoded in given format or inferring format from its name.
   */
  async asArrayBuffer(format = this.getExtension()) {
    return await encodeOrThrow(this.asImageData(), format)
  }

  /**
   * Writes this image on given file path, encoded in given format (or inferred form current name).
   */
  async write(path: string = this.name, format = this.getExtension()) {
    const a = await this.asArrayBuffer(format)
    writeFile(path, new Uint8ClampedArray(a))
    return this
  }

  setMat(mat: Mat) {
    this.delete()
    this._mat = mat
    return this
  }

  /**
   * Shows this image in given HTML canvas or image element.
   */
  show(el: HTMLElement) {
    cv.imshow(el, this.asMat())
    return this
  }

  async asBase64(format = this.getExtension()) {
    var encoded = await this.asArrayBuffer(format)
    return arrayBufferToBase64(encoded)
  }

  delete() {
    try {
      this._mat && this._mat.delete()
    } catch (error) {
    }
  }

  /**
   * Converts the Mat of this file to RGBA channel type. It will replace the current mat and delete the original.
   */
  toRgba() {
    const dst = toRgba(this.mat)
    this.mat.delete()
    this._mat = dst
    return this
  }

  clone(name = this.name) {
    return File.fromMat(this.mat.clone(), name)
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
    try {
      name = name || File.getBufferFileName(buffer)
      const format = getFileExtension(name)
      var data = await decodeOrThrow(buffer, format)
      return File.fromData(data, name)
    } catch (error) {
      console.error(error)
      throw error
    }
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
	 * Loads file form existing HTMLElement or HTMLImageElement
	 */
  public static fromCanvas(el: HTMLElement | string): File {
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
    var a = asArray(files || []).filter(notUndefined) as (string | File)[]
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
        ok(ArrayBuffer.isView(f._mat.data.buffer))
        return f
      }
    }))
    return result.filter(notUndefined)
  }

  public static isFile(f: any): f is File {
    return !!f && !!(f as File).name && !!(f as File)._mat && !!(f as File)._mat.data &&
      typeof (f as File).constructor !== 'undefined' && !!(f as File).asImageData && !!(f as File).asMat
  }

  public static asPath(f: string | File) {
    return typeof f === 'string' ? f : f.name
  }

  public static fromData(data: CVImageData, name?: string) {
    return new File(File._buildName(name), cv.matFromImageData(data))
  }

  private static _buildName(name: string | undefined): string {
    return name || unique('file') + '.png'
  }

  public static fromMat(mat: Mat, name?: string) {
    return new File(File._buildName(name), mat)
  }

  toString() {
    return `[File "${this.name}"]`
  }

  public static async fromUrl(url: string, o: RequestInit & { name?: string } = {}) {
    const p = getDefaultCodec()
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    var data = await decodeOrThrow(buffer)
    return File.fromData(data, o.name || getFileNameFromUrl(url))
  }

  public static async fromFile(path: string, name = basename(path)) {
    const data = await decodeOrThrow(readFile(path).buffer)
    return File.fromData(data, name)
  }

}

interface FileOptions { name?: string }
