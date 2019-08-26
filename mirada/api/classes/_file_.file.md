**[mirada](../README.md)**

[Globals](../README.md) › ["file"](../modules/_file_.md) › [File](_file_.file.md)

# Class: File

A thin layer on top of cv.Mat with lots of utilities to load, write, encode, etc.

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
* [delete](_file_.file.md#delete)
* [getExtension](_file_.file.md#getextension)
* [getMimeType](_file_.file.md#getmimetype)
* [show](_file_.file.md#show)
* [size](_file_.file.md#size)
* [write](_file_.file.md#write)
* [asPath](_file_.file.md#static-aspath)
* [fromArrayBuffer](_file_.file.md#static-fromarraybuffer)
* [fromArrayBufferView](_file_.file.md#static-fromarraybufferview)
* [fromBase64](_file_.file.md#static-frombase64)
* [fromCanvas](_file_.file.md#static-fromcanvas)
* [fromData](_file_.file.md#static-fromdata)
* [fromDataUrl](_file_.file.md#static-fromdataurl)
* [fromFile](_file_.file.md#static-fromfile)
* [fromHtmlFileInputElement](_file_.file.md#static-fromhtmlfileinputelement)
* [fromMat](_file_.file.md#static-frommat)
* [fromUrl](_file_.file.md#static-fromurl)
* [getBufferFileName](_file_.file.md#static-getbufferfilename)
* [getBufferFileType](_file_.file.md#static-getbufferfiletype)
* [isFile](_file_.file.md#static-isfile)
* [resolve](_file_.file.md#static-resolve)
* [resolveOne](_file_.file.md#static-resolveone)

## Constructors

###  constructor

\+ **new File**(`name`: string, `mat`: Mat): *[File](_file_.file.md)*

*Defined in [file.ts:14](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`mat` | Mat |

**Returns:** *[File](_file_.file.md)*

## Properties

### `Protected` mat

• **mat**: *Mat*

*Defined in [file.ts:15](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L15)*

___

###  name

• **name**: *string*

*Defined in [file.ts:15](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L15)*

## Methods

###  asArrayBuffer

▸ **asArrayBuffer**(`format`: string): *Promise‹ArrayBuffer›*

*Defined in [file.ts:49](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L49)*

Returns an array buffer containing the image encoded in given format or inferring format from its name.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`format` | string |  this.getExtension() |

**Returns:** *Promise‹ArrayBuffer›*

___

###  asBase64

▸ **asBase64**(`format`: string): *Promise‹string›*

*Defined in [file.ts:71](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L71)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`format` | string |  this.getExtension() |

**Returns:** *Promise‹string›*

___

###  asDataUrl

▸ **asDataUrl**(): *string*

*Defined in [file.ts:42](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L42)*

**Returns:** *string*

___

###  asImageData

▸ **asImageData**(): *ImageData*

*Defined in [file.ts:38](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L38)*

**Returns:** *ImageData*

___

###  asMat

▸ **asMat**(): *Mat*

*Defined in [file.ts:34](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L34)*

**Returns:** *Mat*

___

###  delete

▸ **delete**(): *any*

*Defined in [file.ts:76](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L76)*

**Returns:** *any*

___

###  getExtension

▸ **getExtension**(): *string*

*Defined in [file.ts:30](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L30)*

**Returns:** *string*

___

###  getMimeType

▸ **getMimeType**(): *undefined | string*

*Defined in [file.ts:26](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L26)*

**Returns:** *undefined | string*

___

###  show

▸ **show**(`el`: HTMLCanvasElement | HTMLImageElement): *void*

*Defined in [file.ts:64](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L64)*

Shows this image in given HTML canvas or image element.

**Parameters:**

Name | Type |
------ | ------ |
`el` | HTMLCanvasElement \| HTMLImageElement |

**Returns:** *void*

___

###  size

▸ **size**(): *object*

*Defined in [file.ts:19](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L19)*

**Returns:** *object*

___

###  write

▸ **write**(`path`: string, `format`: string): *Promise‹void›*

*Defined in [file.ts:56](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L56)*

Writes this image on given file path, encoded in given format (or inferred form current name).

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`path` | string |  this.name |
`format` | string |  this.getExtension() |

**Returns:** *Promise‹void›*

___

### `Static` asPath

▸ **asPath**(`f`: string | [File](_file_.file.md)): *string*

*Defined in [file.ts:182](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [File](_file_.file.md) |

**Returns:** *string*

___

### `Static` fromArrayBuffer

▸ **fromArrayBuffer**(`buffer`: ArrayBuffer, `name?`: undefined | string): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:91](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L91)*

Loads file from given array buffer containing an encoded image.

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |
`name?` | undefined \| string |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromArrayBufferView

▸ **fromArrayBufferView**(`a`: ArrayBufferView, `name?`: undefined | string): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:99](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L99)*

Loads file from given array buffer view containing an encoded image.

**Parameters:**

Name | Type |
------ | ------ |
`a` | ArrayBufferView |
`name?` | undefined \| string |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromBase64

▸ **fromBase64**(`base64`: string, `name?`: undefined | string): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:83](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L83)*

Loads file from given base64 string containing an encoded image.

**Parameters:**

Name | Type |
------ | ------ |
`base64` | string |
`name?` | undefined \| string |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromCanvas

▸ **fromCanvas**(`el`: HTMLCanvasElement | HTMLImageElement | string): *[File](_file_.file.md)*

*Defined in [file.ts:140](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L140)*

Loads file form existing HTMLCanvasElement or HTMLImageElement

**Parameters:**

Name | Type |
------ | ------ |
`el` | HTMLCanvasElement \| HTMLImageElement \| string |

**Returns:** *[File](_file_.file.md)*

___

### `Static` fromData

▸ **fromData**(`data`: ImageData, `name`: string): *[File](_file_.file.md)*

*Defined in [file.ts:186](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ImageData |
`name` | string |

**Returns:** *[File](_file_.file.md)*

___

### `Static` fromDataUrl

▸ **fromDataUrl**(`dataUrl`: string, `name?`: undefined | string): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:119](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L119)*

Loads file from given data url string containing an encoded image.

**Parameters:**

Name | Type |
------ | ------ |
`dataUrl` | string |
`name?` | undefined \| string |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromFile

▸ **fromFile**(`path`: string, `o`: FileOptions): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:202](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L202)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`path` | string | - |
`o` | FileOptions |  {} |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` fromHtmlFileInputElement

▸ **fromHtmlFileInputElement**(`el`: HTMLInputElement): *Promise‹[File](_file_.file.md)[]›*

*Defined in [file.ts:126](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L126)*

Loads files from files in html input element of type "file".

**Parameters:**

Name | Type |
------ | ------ |
`el` | HTMLInputElement |

**Returns:** *Promise‹[File](_file_.file.md)[]›*

___

### `Static` fromMat

▸ **fromMat**(`mat`: Mat, `name?`: undefined | string): *[File](_file_.file.md)*

*Defined in [file.ts:190](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`mat` | Mat |
`name?` | undefined \| string |

**Returns:** *[File](_file_.file.md)*

___

### `Static` fromUrl

▸ **fromUrl**(`url`: string, `o`: RequestInit & FileOptions): *Promise‹[File](_file_.file.md)›*

*Defined in [file.ts:194](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L194)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`o` | RequestInit & FileOptions |  {} |

**Returns:** *Promise‹[File](_file_.file.md)›*

___

### `Static` getBufferFileName

▸ **getBufferFileName**(`a`: ArrayBuffer): *string*

*Defined in [file.ts:111](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | ArrayBuffer |

**Returns:** *string*

___

### `Static` getBufferFileType

▸ **getBufferFileType**(`a`: ArrayBuffer): *FileTypeResult*

*Defined in [file.ts:103](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | ArrayBuffer |

**Returns:** *FileTypeResult*

___

### `Static` isFile

▸ **isFile**(`f`: any): *boolean*

*Defined in [file.ts:177](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | any |

**Returns:** *boolean*

___

### `Static` resolve

▸ **resolve**(`files`: string | [File](_file_.file.md) | undefined | undefined | string | [File](_file_.file.md)[]): *Promise‹[File](_file_.file.md)[]›*

*Defined in [file.ts:158](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L158)*

Given paths, urls or files it will try to load them all and return a list of File for those succeed.

**Parameters:**

Name | Type |
------ | ------ |
`files` | string \| [File](_file_.file.md) \| undefined \| undefined \| string \| [File](_file_.file.md)[] |

**Returns:** *Promise‹[File](_file_.file.md)[]›*

___

### `Static` resolveOne

▸ **resolveOne**(`files`: string | [File](_file_.file.md) | undefined | undefined | string | [File](_file_.file.md)[]): *Promise‹undefined | [File](_file_.file.md)›*

*Defined in [file.ts:150](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/file.ts#L150)*

Shortcut for [resolve] that returns the first result.

**Parameters:**

Name | Type |
------ | ------ |
`files` | string \| [File](_file_.file.md) \| undefined \| undefined \| string \| [File](_file_.file.md)[] |

**Returns:** *Promise‹undefined | [File](_file_.file.md)›*