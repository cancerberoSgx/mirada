import { FormatCodec } from 'mirada'
import { withoutExtension } from 'misc-utils-of-mine-generic'

// a minimal facade to Magica so we don't need to depend on it. See test/magicaTest.ts
interface MagicaFile {
  asRGBAImageData(): Promise<ImageData | undefined>
  sizeDepthArgs(): Promise<string>
  content: ArrayBufferView
  name: string
}

interface Magica {
  run(o: { script: string, inputFiles: MagicaFile[] }): Promise<{ outputFiles: MagicaFile[], error?: Error }>
  fromArrayBuffer(buffer: ArrayBuffer): Promise<MagicaFile | undefined>
  fromRGBAImageData(data: ImageData): Promise<MagicaFile | undefined>
}

export class MagicaCodec implements FormatCodec {
  constructor(protected magica: Magica) {
  }

  async decode(buffer: ArrayBuffer): Promise<ImageData | undefined> {
    const f = await this.magica.fromArrayBuffer(buffer)
    if (!f) {
      throw new Error('Could not create Magica File from given buffer ')
    }
    // console.log(  await f.asRGBAImageData());
    
    return await f.asRGBAImageData()
  }

  async encode(data: ImageData, format: string, quality?: number): Promise<ArrayBuffer | undefined> {
    const f = await this.magica.fromRGBAImageData(data)
    if (!f) {
      throw new Error('Could not create Magica File from given data')
    }
    const script = `convert ${await f.sizeDepthArgs()} ${f.name} ${await f.sizeDepthArgs()} ${withoutExtension(f.name)}.${format}`
    const results = await this.magica.run({
      script,
      inputFiles: [f]
    })
    if (!results || !results.outputFiles.length || results.error) {
      throw new Error('Could not encode given data to format ' + format + ' - error: ' + results.error)
    }
    return results.outputFiles[0].content.buffer
  }
}
