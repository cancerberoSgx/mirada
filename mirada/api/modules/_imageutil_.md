**[mirada](../README.md)**

[Globals](../README.md) › ["imageUtil"](_imageutil_.md)

# External module: "imageUtil"

## Index

### Functions

* [fromArrayBuffer](_imageutil_.md#fromarraybuffer)
* [fromFile](_imageutil_.md#fromfile)
* [fromUrl](_imageutil_.md#fromurl)
* [imageData](_imageutil_.md#imagedata)
* [toRgba](_imageutil_.md#torgba)

## Functions

###  fromArrayBuffer

▸ **fromArrayBuffer**(`a`: ArrayBuffer): *Promise‹Mat›*

*Defined in [imageUtil.ts:45](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/imageUtil.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | ArrayBuffer |

**Returns:** *Promise‹Mat›*

___

###  fromFile

▸ **fromFile**(`f`: string): *Promise‹Mat›*

*Defined in [imageUtil.ts:40](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/imageUtil.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *Promise‹Mat›*

___

###  fromUrl

▸ **fromUrl**(`f`: string): *Promise‹Mat›*

*Defined in [imageUtil.ts:50](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/imageUtil.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *Promise‹Mat›*

___

###  imageData

▸ **imageData**(`img`: Mat): *object*

*Defined in [imageUtil.ts:7](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/imageUtil.ts#L7)*

Creates an CV ImageData object from given image.

**Parameters:**

Name | Type |
------ | ------ |
`img` | Mat |

**Returns:** *object*

___

###  toRgba

▸ **toRgba**(`mat`: Mat): *Mat*

*Defined in [imageUtil.ts:19](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/imageUtil.ts#L19)*

Returns a new image that is identical to given (1, 3 or 4 channels)
but has 4 RGBA channels.

**Parameters:**

Name | Type |
------ | ------ |
`mat` | Mat |

**Returns:** *Mat*