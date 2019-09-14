import { sleep } from 'misc-utils-of-mine-generic'

function startRecording(stream: MediaStream, lengthInMS: number) {

  let recorder = new MediaRecorder(stream)
  let data: Blob[] = []

  recorder.ondataavailable = event => data.push(event.data)
  recorder.start()
  console.log(recorder.state + " for " + (lengthInMS / 1000) + " seconds...")

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve
    recorder.onerror = event => reject((event as any).name)
  })

  let recorded = sleep(lengthInMS).then(
    () => recorder.state == "recording" && recorder.stop()
  )

  return Promise.all([
    stopped,
    recorded
  ])
    .then(() => data)
}

