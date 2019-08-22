**[mirada](../README.md)**

[Globals](../README.md) › ["file"](../modules/_file_.md) › [File](_file_.file.md)

# Class: File

## Hierarchy

* **File**

## Index

### Constructors

* [constructor](_file_.file.md#constructor)

### Properties

* [mat](_file_.file.md#protected-mat)
* [name](_file_.file.md#name)

### Methods

* [asArrayBuffer](_file_.file.md#asarraybuffer)
* [asBase64](_file_.file.md#asbase64)
* [asDataUrl](_file_.file.md#asdataurl)
* [asImageData](_file_.file.md#asimagedata)
* [asMat](_file_.file.md#asmat)
* [getExtension](_file_.file.md#getextension)
* [getMimeType](_file_.file.md#getmimetype)
* [size](_file_.file.md#size)
* [asPath](_file_.file.md#static-aspath)
* [fromArrayBuffer](_file_.file.md#static-fromarraybuffer)
* [fromBase64](_file_.file.md#static-frombase64)
* [fromData](_file_.file.md#static-fromdata)
* [fromDataUrl](_file_.file.md#static-fromdataurl)
* [fromFile](_file_.file.md#static-fromfile)
* [fromHtmlFileInputElement](_file_.file.md#static-fromhtmlfileinputelement)
* [fromMat](_file_.file.md#static-frommat)
* [fromUrl](_file_.file.md#static-fromurl)
* [isFile](_file_.file.md#static-isfile)
* [resolve](_file_.file.md#static-resolve)
* [resolveOne](_file_.file.md#static-resolveone)

## Constructors

###  constructor

\+ **new File**(`name`: string, `mat`: [Mat](_types_opencv_.mat.md)): *[File](_file_.file.md)*

*Defined in [file.ts:10](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`mat` | [Mat](_types_opencv_.mat.md) |

**Returns:** *[File](_file_.file.md)*

## Properties

### `Protected` mat

• **mat**: *[Mat](_types_opencv_.mat.md)*

*Defined in [file.ts:12](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L12)*

___

###  name

• **name**: *string*

*Defined in [file.ts:12](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L12)*

## Methods

###  asArrayBuffer

▸ **asArrayBuffer**(`format`: string): *Promise‹ArrayBuffer›*

*Defined in [file.ts:46](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L46)*

returns an array buffer containing the image encoded in given format or inferring format from its name.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`format` | string |  this.getExtension() |

**Returns:** *Promise‹ArrayBuffer›*

___

###  asBase64

▸ **asBase64**(`format`: string): *Promise‹string›*

*Defined in [file.ts:50](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L50)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`format` | string |  this.getExtension() |

**Returns:** *Promise‹string›*

___

###  asDataUrl

▸ **asDataUrl**(): *string*

*Defined in [file.ts:39](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L39)*

**Returns:** *string*

___

###  asImageData

▸ **asImageData**(): *[ImageData](../interfaces/_types_opencv_.imagedata.md)*

*Defined in [file.ts:35](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L35)*

**Returns:** *[ImageData](../interfaces/_types_opencv_.imagedata.md)*

___

###  asMat

▸ **asMat**(): *[Mat](_types_opencv_.mat.md)*

*Defined in [file.ts:31](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L31)*

**Returns:** *[Mat](_types_opencv_.mat.md)*

___

###  getExtension

▸ **getExtension**(): *string*

*Defined in [file.ts:27](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L27)*

**Returns:** *string*

___

###  getMimeType

▸ **getMimeType**(): *undefined | string*

*Defined in [file.ts:23](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L23)*

**Returns:** *undefined | string*

___

###  size

▸ **size**(): *object*

*Defined in [file.ts:16](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L16)*

**Returns:** *object*

___

### `Static` asPath

▸ **asPath**(`f`: string | [File](_file_.file.md)): *string*

*Defined in [file.ts:130](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [File](_file_.file.md) |

**Returns:** *string*

___

### `Static` fromArrayBuffer

▸ **fromArrayBuffer**(`buffer`: ArrayBuffer, `name`: string): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:66](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L66)*

Loads file from given array buffer containing an encoded image.

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |
`name` | string |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromBase64

▸ **fromBase64**(`base64`: string, `name`: string): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:58](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L58)*

Loads file from given base64 string containing an encoded image.

**Parameters:**

Name | Type |
------ | ------ |
`base64` | string |
`name` | string |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromData

▸ **fromData**(`data`: [ImageData](../interfaces/_types_opencv_.imagedata.md), `name`: string): *[File](_file_.file.md)*

*Defined in [file.ts:134](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ImageData](../interfaces/_types_opencv_.imagedata.md) |
`name` | string |

**Returns:** *[File](_file_.file.md)*

___

### `Static` fromDataUrl

▸ **fromDataUrl**(`dataUrl`: string, `name`: string): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:74](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L74)*

Loads file from given data url string containing an encoded image.

**Parameters:**

Name | Type |
------ | ------ |
`dataUrl` | string |
`name` | string |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromFile

▸ **fromFile**(`path`: string, `o`: FileOptions): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:150](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L150)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`path` | string | - |
`o` | FileOptions |  {} |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromHtmlFileInputElement

▸ **fromHtmlFileInputElement**(`el`: HTMLInputElement): *Promise‹Array‹[File](_file_.file.md)››*

*Defined in [file.ts:81](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L81)*

Loads files from files in html input element of type "file".

**Parameters:**

Name | Type |
------ | ------ |
`el` | HTMLInputElement |

**Returns:** *Promise‹Array‹[File](_file_.file.md)››*

___

### `Static` fromMat

▸ **fromMat**(`mat`: [Mat](_types_opencv_.mat.md), `name`: string): *[File](_file_.file.md)*

*Defined in [file.ts:138](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`mat` | [Mat](_types_opencv_.mat.md) |
`name` | string |

**Returns:** *[File](_file_.file.md)*

___

### `Static` fromUrl

▸ **fromUrl**(`url`: string, `o`: RequestInit & FileOptions): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:142](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L142)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`o` | RequestInit & FileOptions |  {} |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` isFile

▸ **isFile**(`f`: any): *boolean*

*Defined in [file.ts:122](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | any |

**Returns:** *boolean*

___

### `Static` resolve

▸ **resolve**(`files`: string | [File](_file_.file.md) | undefined | undefined | string | [File](_file_.file.md)[]): *Promise‹[File](_file_.file.md)[]›*

*Defined in [file.ts:103](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L103)*

Given paths, urls or files it will try to load them all and return a list of File for those succeed.

**Parameters:**

Name | Type |
------ | ------ |
`files` | string \| [File](_file_.file.md) \| undefined \| undefined \| string \| [File](_file_.file.md)[] |

**Returns:** *Promise‹[File](_file_.file.md)[]›*

___

### `Static` resolveOne

▸ **resolveOne**(`files`: string | [File](_file_.file.md) | undefined | undefined | string | [File](_file_.file.md)[]): *Promise‹undefined | [File](_file_.file.md)›*

*Defined in [file.ts:95](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/file.ts#L95)*

Shortcut for [resolve] that returns the first result.

**Parameters:**

Name | Type |
------ | ------ |
`files` | string \| [File](_file_.file.md) \| undefined \| undefined \| string \| [File](_file_.file.md)[] |

**Returns:** *Promise‹undefined | [File](_file_.file.md)›*