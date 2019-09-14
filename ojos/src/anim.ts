import { animate as anim, easing, RemoveProperties, checkThrow, Fn, objectKeys } from 'misc-utils-of-mine-generic'

const easingExclude = {
  'quad': 1,
  'easeInQuart': 1,
  'easeInQuint': 1,
  'easeInOutQuart': 1
}

export type Easing = keyof RemoveProperties<typeof easing, keyof typeof easingExclude>

export const easingNames = objectKeys(easing).filter(f => !objectKeys(easingExclude).includes(f as any)) as Easing[]

export interface AnimateOptions {
  easing: Easing
  duration: number;
  draw: (n: number) => void;
  lapse?: number;
  end?: Fn
}

export async function animate(o: AnimateOptions) {
  const e = easing[o.easing]
  checkThrow(e, 'Expected easing ' + o.easing + ' to be defined')
  await anim({
    duration: o.duration, draw: o.draw, timing: e(), end: o.end, lapse: o.lapse
  })
}