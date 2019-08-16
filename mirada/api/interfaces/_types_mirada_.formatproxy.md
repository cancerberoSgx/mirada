> **[mirada](../README.md)**

[Globals](../README.md) / ["types/mirada"](../modules/_types_mirada_.md) / [FormatProxy](_types_mirada_.formatproxy.md) /

# Interface: FormatProxy

User provided image formats encode/decode implementation.

IMPORTANT: formats are lowercase and in general the common extension of files

## Hierarchy

* **FormatProxy**

## Index

### Methods

* [decode](_types_mirada_.formatproxy.md#decode)
* [encode](_types_mirada_.formatproxy.md#encode)
* [getSupportedDecodeFormats](_types_mirada_.formatproxy.md#optional-getsupporteddecodeformats)
* [getSupportedEncodeFormats](_types_mirada_.formatproxy.md#optional-getsupportedencodeformats)

## Methods

###  decode

▸ **decode**(`buffer`: `ArrayBuffer`, `format?`: undefined | string): *`Promise<ImageData>`*

*Defined in [types/mirada.ts:14](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/mirada.ts#L14)*

Given an array buffer that contains the content of an encoded image it will return a
decoded ImageData object. The format parameter could be needed by some poor decoders
that don't support file type sniffing. For example, magica or jimp libraries don't need this.

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | `ArrayBuffer` |
`format?` | undefined \| string |

**Returns:** *`Promise<ImageData>`*

___

###  encode

▸ **encode**(`data`: [ImageData](_types_opencv_.imagedata.md), `format`: string): *`Promise<ArrayBuffer>`*

*Defined in [types/mirada.ts:18](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/mirada.ts#L18)*

given an image data representing an unencoded raw image it will return an array buffer containing the enconcoded image content in given format.

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ImageData](_types_opencv_.imagedata.md) |
`format` | string |

**Returns:** *`Promise<ArrayBuffer>`*

___

### `Optional` getSupportedDecodeFormats

▸ **getSupportedDecodeFormats**(): *string[]*

*Defined in [types/mirada.ts:22](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/mirada.ts#L22)*

if provided an error will be thrown in case users request to decode to a format not included in this list.

**Returns:** *string[]*

___

### `Optional` getSupportedEncodeFormats

▸ **getSupportedEncodeFormats**(): *string[]*

*Defined in [types/mirada.ts:26](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/mirada.ts#L26)*

if provided an error will be thrown in case users request to encode to a format not included in this list.

**Returns:** *string[]*