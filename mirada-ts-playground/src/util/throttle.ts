export function throttle<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let context: any, args: any, result: any
  let timeout: any = null
  let previous = 0
  options || (options = {})

  let later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    context = args = null
  }

  return function(this: any) {
    let now = Date.now()
    if (!previous && options.leading === false) previous = now

    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
