**[mirada](../README.md)**

[Globals](../README.md) › ["types/mirada"](../modules/_types_mirada_.md) › [FormatCodec](_types_mirada_.formatcodec.md)

# Interface: FormatCodec

Codec instances are created by format proxies and are responsible of encode and decode certain set of image formats. See
IMPORTANT: formats are lowercase and in general the common extension of files

## Hierarchy

* **FormatCodec**

## Implemented by

* [JimpFormatCodec](../classes/_format_jimpformatcodec_.jimpformatcodec.md)

## Index

### Methods

* [decode](_types_mirada_.formatcodec.md#decode)
* [encode](_types_mirada_.formatcodec.md#encode)
* [getSupportedDecodeFormats](_types_mirada_.formatcodec.md#optional-getsupporteddecodeformats)
* [getSupportedEncodeFormats](_types_mirada_.formatcodec.md#optional-getsupportedencodeformats)

## Methods

###  decode

▸ **decode**(`buffer`: ArrayBuffer, `format?`: undefined | string): *Promise‹[ImageData](_types_opencv_.imagedata.md)›*

*Defined in [types/mirada.ts:34](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/mirada.ts#L34)*

Given an array buffer that contains the content of an encoded image it will return a
decoded ImageData object. The format parameter could be needed by some poor decoders
that don't support file type sniffing. For example, magica or jimp libraries don't need this.

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |
`format?` | undefined \| string |

**Returns:** *Promise‹[ImageData](_types_opencv_.imagedata.md)›*

___

###  encode

▸ **encode**(`data`: [ImageData](_types_opencv_.imagedata.md), `format`: string): *Promise‹ArrayBuffer›*

*Defined in [types/mirada.ts:38](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/mirada.ts#L38)*

given an image data representing an unencoded raw image it will return an array buffer containing the enconcoded image content in given format.

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ImageData](_types_opencv_.imagedata.md) |
`format` | string |

**Returns:** *Promise‹ArrayBuffer›*

___

### `Optional` getSupportedDecodeFormats

▸ **getSupportedDecodeFormats**(): *string[]*

*Defined in [types/mirada.ts:42](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/mirada.ts#L42)*

if provided an error will be thrown in case users request to decode to a format not included in this list.

**Returns:** *string[]*

___

### `Optional` getSupportedEncodeFormats

▸ **getSupportedEncodeFormats**(): *string[]*

*Defined in [types/mirada.ts:46](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/mirada.ts#L46)*

if provided an error will be thrown in case users request to encode to a format not included in this list.

**Returns:** *string[]*