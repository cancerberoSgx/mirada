
import FileSaver from 'file-saver'
import { main } from 'magica'
import { File } from 'mirada'
import { withoutExtension } from 'misc-utils-of-mine-generic'
import { loadMiradaFileFromInputElement, readFromCanvas } from '../magica'
import { getImageWidget } from './start'
import { getStore } from './store'

async function miradaImplementation(e: HTMLInputElement) {
  const files = await File.fromHtmlFileInputElement(e)
  return files[0]
}

async function magicaImplementation(e: HTMLInputElement) {
  const image = await getImageWidget()
  return await loadMiradaFileFromInputElement(e, image!.canvas)
}

export async function loadFileFromInputElement(e: HTMLInputElement, magica = true) {
  getStore().setState({
    working: true,
  })
  const f = magica ? await magicaImplementation(e) : await miradaImplementation(e)
  const image = await getImageWidget()
  image!.load(f)
  getStore().setState({
    working: false,
    imageSize: image!.imageSize
  })
}

export async function handleFileSave(format: string) {
  var i = await getImageWidget()
  const f = await readFromCanvas(i.canvas)
  const command = `convert ${await f.sizeDepthArgs()} ${f.name} ${withoutExtension(f.name)}.${format}`
  const r = await main({
    command,
    inputFiles: [f]
  })
  if (r.outputFiles.length) {
    var blob = new Blob([r.outputFiles[0].content])
    FileSaver.saveAs(blob, r.outputFiles[0].name)
  }
  else {
    throw r.error || new Error('Error TODO')
  }
}
