import fetch from 'cross-fetch';
import { FS_ROOT } from '../opencvReady';

/**
 * if given a file it ignores its contents and alwasys read again from FS
 */
export function readFile(f: string, FS = cv.FS): ArrayBufferView {
  return FS.readFile(getFilePath(f))
}

/**
 * Returns file name / path of given file relative to emscripten FS root  (in the context of emscripten FS)
 */
export function getFileName(path: string) {
  return path.startsWith(`${FS_ROOT}/`) ? path.substring(`${FS_ROOT}/`.length, path.length) : `${path}`
}

/**
 * Returns absolute path of given file (in the context of emscripten FS)
 */
export function getFilePath(path: string) {
  return path.startsWith(`${FS_ROOT}/`) ? path : `${FS_ROOT}/${path}`
}

export function writeFile(name: string, f: ArrayBufferView, FS = cv.FS) {
  FS.writeFile(getFilePath(name), f)
}

export function removeFile(f: string, FS = cv.FS) {
  FS.unlink(getFilePath(getFilePath(f)))
}

export function isDir(f: string, FS = cv.FS) {
  try {
    return FS.isDir(FS.stat(getFilePath(f)).mode)
  } catch (error) {
    return false
  }
}

export function isFile(f: string, FS = cv.FS) {
  try {
    return FS.isFile(FS.stat(getFilePath(f)).mode)
  } catch (error) {
    return false
  }
}

export const fileUtil = {
  isDir, isFile, removeFile, writeFile, getFilePath, readFile, getFileName
}

export async function loadDataFile(url: string, name?: string) {
  name = name || url.substring(url.lastIndexOf('/') + 1, url.length)
  // Heads up! we need to verify that the files don't already exists if not it throws!
  if (!cv.FS.readdir('/').includes(name)) {
    const r = await fetch(url)
    await cv.FS.createDataFile('/', name, new Uint8ClampedArray(await r.arrayBuffer()), true, false, false)
  }
  return name
}
