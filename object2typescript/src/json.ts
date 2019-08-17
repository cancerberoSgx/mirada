export type JSONPrimitive = string | number | boolean | null
/** makes sure an object is JSON compatible so we can safely serialize with JSON.stringify */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
export type JSONObject = { [member: string]: JSONValue }
export interface JSONArray extends Array<JSONValue> { }
export function isJSONObject(o: any): o is JSONObject {
  return typeof o === 'object' && !Array.isArray(o)
}
