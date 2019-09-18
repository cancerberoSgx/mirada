import { File as MagicaFile, magickLoaded, run } from 'magica'
import { loadOpencv } from 'mirada'
import { MagicaCodec } from 'ojos'

export async function loadLibraries() {
  await magickLoaded
  const Magica = {
    fromArrayBuffer: MagicaFile.fromArrayBuffer,
    fromRGBAImageData: async (data: ImageData) => MagicaFile.fromRGBAImageData(data as any),
    run
  }
  await loadOpencv({ formatProxies: [() => new MagicaCodec(Magica)] })
}
