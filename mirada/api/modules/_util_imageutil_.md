**[mirada](../README.md)**

[Globals](../README.md) › ["util/imageUtil"](_util_imageutil_.md)

# External module: "util/imageUtil"

## Index

### Functions

* [fromArrayBuffer](_util_imageutil_.md#fromarraybuffer)
* [fromFile](_util_imageutil_.md#fromfile)
* [fromUrl](_util_imageutil_.md#fromurl)
* [imageData](_util_imageutil_.md#imagedata)
* [toRgba](_util_imageutil_.md#torgba)

## Functions

###  fromArrayBuffer

▸ **fromArrayBuffer**(`a`: ArrayBuffer): *Promise‹Mat›*

*Defined in [util/imageUtil.ts:45](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/imageUtil.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | ArrayBuffer |

**Returns:** *Promise‹Mat›*

___

###  fromFile

▸ **fromFile**(`f`: string): *Promise‹Mat›*

*Defined in [util/imageUtil.ts:40](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/imageUtil.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *Promise‹Mat›*

___

###  fromUrl

▸ **fromUrl**(`f`: string): *Promise‹Mat›*

*Defined in [util/imageUtil.ts:50](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/imageUtil.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *Promise‹Mat›*

___

###  imageData

▸ **imageData**(`img`: Mat): *object*

*Defined in [util/imageUtil.ts:7](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/imageUtil.ts#L7)*

Creates an CV ImageData object from given image.

**Parameters:**

Name | Type |
------ | ------ |
`img` | Mat |

**Returns:** *object*

___

###  toRgba

▸ **toRgba**(`mat`: Mat): *Mat*

*Defined in [util/imageUtil.ts:19](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/imageUtil.ts#L19)*

Returns a new image that is identical to given (1, 3 or 4 channels)
but has 4 RGBA channels.

**Parameters:**

Name | Type |
------ | ------ |
`mat` | Mat |

**Returns:** *Mat*