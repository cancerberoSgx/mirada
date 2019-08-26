export function initMonacoWorkers() {
  if (typeof (self as any).MonacoEnvironment === 'undefined') {
    ;(self as any).MonacoEnvironment = {
      getWorkerUrl(moduleId: any, label: any) {
        if (label === 'typescript' || label === 'javascript') {
          return './ts.worker.js'
        }
        return './editor.worker.js'
      }
    }
  }
}
