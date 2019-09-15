import { Scalar } from 'mirada'
import { int } from 'misc-utils-of-mine-generic'
import tinyColor from 'tinycolor2'

export function color(color?: tinyColor.ColorInput, opts?: tinyColor.ConstructorOptions): TColor {
  const c = new tinyColor(color, opts) as TColor
  c.toScalar = function(this: TColor) {
    const v = this.toRgb()
    return [v.r, v.g, v.b, Math.trunc(255 * v.a)]
  }
  return c
}

export function scalarColor(c: tinyColor.ColorInput, opts?: tinyColor.ConstructorOptions): Scalar {
  return color(c, opts).toScalar()
}

export function scalarColorString(c: tinyColor.ColorInput, opts?: tinyColor.ConstructorOptions) {
  return `[ ${scalarColor(c, opts)} ]`
}

export interface TColor extends tinyColor.Instance {
  toScalar(): Scalar;
}

export function randomScalarColor() {
  return scalarColors[int(0, scalarColors.length - 1)]
}

export const scalarColors = [
  [255, 102, 51, 255], [255, 179, 153, 255],
  [255, 51, 255, 255], [255, 255, 153, 255],
  [0, 179, 230, 255], [230, 179, 51, 255],
  [51, 102, 230, 255], [153, 153, 102, 255],
  [153, 255, 153, 255], [179, 77, 77, 255],
  [128, 179, 0, 255], [128, 153, 0, 255],
  [230, 179, 179, 255], [102, 128, 179, 255],
  [102, 153, 26, 255], [255, 153, 230, 255],
  [204, 255, 26, 255], [255, 26, 102, 255],
  [230, 51, 26, 255], [51, 255, 204, 255],
  [102, 153, 77, 255], [179, 102, 204, 255],
  [77, 128, 0, 255], [179, 51, 0, 255],
  [204, 128, 204, 255], [102, 102, 77, 255],
  [153, 26, 255, 255], [230, 102, 255, 255],
  [77, 179, 255, 255], [26, 179, 153, 255],
  [230, 102, 179, 255], [51, 153, 26, 255],
  [204, 153, 153, 255], [179, 179, 26, 255],
  [0, 230, 128, 255], [77, 128, 102, 255],
  [128, 153, 128, 255], [230, 255, 128, 255],
  [26, 255, 51, 255], [153, 153, 51, 255],
  [255, 51, 128, 255], [204, 204, 0, 255],
  [102, 230, 77, 255], [77, 128, 204, 255],
  [153, 0, 179, 255], [230, 77, 102, 255],
  [77, 179, 128, 255], [255, 77, 77, 255],
  [153, 230, 230, 255], [102, 102, 255, 255]
]
