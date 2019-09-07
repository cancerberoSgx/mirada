export function between(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max))
}

export function intBetween(n: number, min: number, max: number) {
  return Math.trunc(Math.max(min, Math.min(n, max)))
}
