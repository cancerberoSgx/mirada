import { format, FormatOptions, tsMorph } from 'ts-simple-ast-extra'

export function formatCode(code: string, formatOptions: Partial<FormatOptions>) {
  const project = new tsMorph.Project()
  const file = project.createSourceFile('f1.ts', code)
  const output = format({ file, project, ...formatOptions })
  return { output, project, file }
}

export function arrayBufferToString(buffer: ArrayBuffer) {
  var s = ''
  var bytes = [].slice.call(new Uint8Array(buffer))
  bytes.forEach((b) => s += String.fromCharCode(b))
  return s
}

export function readStdin() {
  return new Promise((resolve, reject) => {

    var stdin = process.stdin,
      stdout = process.stdout,
      inputChunks = []

    stdin.resume()
    stdin.setEncoding('utf8')

    stdin.on('data', function(chunk) {
      inputChunks.push(chunk)
    })

    stdin.on('end', function() {
      try {
        var inputJSON = inputChunks.join(),
          parsedData = JSON.parse(inputJSON)
        resolve(parsedData)
        // outputJSON = JSON.stringify(parsedData, null, '    ');
        // stdout.write(outputJSON);
        // stdout.write('\n');
      } catch (error) {
        console.error('An error occurred readying JSON from stdin: ', error, error)
        reject(error)
      }
    })
  })
}
