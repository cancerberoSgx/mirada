> **[mirada](../README.md)**

[Globals](../README.md) / ["imageUtil"](_imageutil_.md) /

# External module: "imageUtil"

## Index

### Functions

* [imageData](_imageutil_.md#imagedata)
* [toRgba](_imageutil_.md#torgba)

## Functions

###  imageData

▸ **imageData**(`img`: [Mat](../classes/_types_opencv_.mat.md)): *object*

*Defined in [imageUtil.ts:6](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/imageUtil.ts#L6)*

Creates an CV ImageData object from given image.

**Parameters:**

Name | Type |
------ | ------ |
`img` | [Mat](../classes/_types_opencv_.mat.md) |

**Returns:** *object*

___

###  toRgba

▸ **toRgba**(`mat`: [Mat](../classes/_types_opencv_.mat.md)): *[Mat](../classes/_types_opencv_.mat.md)*

*Defined in [imageUtil.ts:18](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/imageUtil.ts#L18)*

Returns a new image that is identical to given (1, 3 or 4 channels)
but has 4 RGBA channels.

**Parameters:**

Name | Type |
------ | ------ |
`mat` | [Mat](../classes/_types_opencv_.mat.md) |

**Returns:** *[Mat](../classes/_types_opencv_.mat.md)*