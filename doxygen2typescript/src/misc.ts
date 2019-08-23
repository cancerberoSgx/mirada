
import { isArray, JSONValue, objectKeys } from 'misc-utils-of-mine-generic'

export function objectToArray<O extends { [k in keyof O]: O[keyof O] } = any>(o: O): { key: keyof O, value: O[keyof O] }[] {
  return objectKeys(o).map(key => ({ key, value: o[key] }))
}

export function visitJson(o: JSONValue, v: (o: JSONValue, nameOrIndex?: string | number) => boolean, _name?: string | number): boolean {
  if (isArray(o) && o) {
    return v(o, _name) || o.some((va, i) => visitJson(va, v, i))
  }
  else if (typeof o === 'object' && o) {
    return v(o, _name) || objectToArray(o).some(o => visitJson(o.value as JSONValue, v, o.key))
  }
  else {
    return v(o, _name)
  }
}

export function findJson(o: JSONValue, p: (o: JSONValue, nameOrIndex?: string | number) => boolean, _name?: string | number): { value: JSONValue, key: string | number } | undefined {
  let r: { value: JSONValue, key: string | number } | undefined = undefined
  visitJson(o, (value, key) => {
    if (p(value, key)) {
      r = { value, key }
      return true
    }
    return false
  })
  return r
}
