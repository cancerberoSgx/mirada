import { File, loadHtmlCanvasElement, run } from 'magica'
import { File as MiradaFile } from 'mirada'
import { checkThrow } from 'misc-utils-of-mine-generic'

export async function scale(f: File, scale: string) {
  const result = await run({
    inputFiles: [f],
    script: `convert ${f.name} -scale ${scale} out.png` //TODO: performance use other format
  })
  checkThrow(!result.error && result.outputFiles.length, 'Expected no errors in magicas run()')
  return result.outputFiles[0] as File
}

export async function loadMiradaFileFromInputElement(e: HTMLInputElement, canvas: HTMLCanvasElement) {
  const f = await File.fromHtmlFileInputElement(e)
  checkThrow(f.length, 'Expected to load files')
  await writeToCanvas(f[0], canvas)
  return await MiradaFile.fromCanvas(canvas)
}

export async function scaleCanvas(c: HTMLCanvasElement, s: string) {
  const f = await readFromCanvas(c)
  const f2 = await scale(f, s)
  await writeToCanvas(f2, c)
}

export async function writeToCanvas(f: File, canvas: HTMLCanvasElement) {
  const size = await f.size()
  canvas.width = size.width
  canvas.height = size.height
  await loadHtmlCanvasElement(f, canvas.getContext('2d')!)
}

export async function readFromCanvas(canvas: HTMLCanvasElement) {
  const imageData = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height)
  return await File.fromHTMLImageData(imageData)
}
