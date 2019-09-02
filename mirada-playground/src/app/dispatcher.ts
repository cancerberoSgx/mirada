
import { File } from 'mirada'
import { loadMiradaFileFromInputElement } from '../magica'
import { Example } from "./examples"
import { getImageWidget } from './start'
import { getStore } from './store'

export async function setExample(example?: Example) {
  alert('Not implemented yet')
  var state = getStore().getState()
  getStore().setState({
    working: true,
  })
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

async function miradaImplementation(e: HTMLInputElement) {
  const files = await File.fromHtmlFileInputElement(e)
  return files[0]
}
async function magicaImplementation(e: HTMLInputElement) {
  const image = await getImageWidget()
  return await loadMiradaFileFromInputElement(e, image!.canvas)
}
