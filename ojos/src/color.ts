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

// var colorArray = ['#FF6633', '#FFB399','#FF33FF', '#FFFF99', '#00B3E6', 
// 		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
// 		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
// 		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
// 		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
// 		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
// 		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
// 		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
// 		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
// 		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
