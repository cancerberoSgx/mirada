
import { File } from 'mirada'
import { checkThrow } from 'misc-utils-of-mine-generic'
import { loadMiradaFileFromInputElement } from '../magica'
import { Example } from "./examples"
import { getStore } from './store'
import { getImageWidget } from './start';

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
  async function miradaImplementation() { 
    const files = await File.fromHtmlFileInputElement(e)
    return files[0]
  }
  async function magicaImplementation() {
    return await loadMiradaFileFromInputElement(e, image!.canvas)
  }
  // const f = await miradaImplementation() 
  const f = magica ? await magicaImplementation() : await miradaImplementation()
  const image = await getImageWidget()
    // checkThrow(image, 'expected ImageWidget to be installed')
  image!.load(f)
  getStore().setState({
    working: false,
    imageSize: image!.imageSize
  })
}



