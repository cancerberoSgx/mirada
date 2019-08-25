**[mirada](../README.md)**

[Globals](../README.md) › ["format/canvasCodec"](../modules/_format_canvascodec_.md) › [CanvasCodec](_format_canvascodec_.canvascodec.md)

# Class: CanvasCodec

Example of declaring a format codec that uses DOM canvas instance which must be provided by the user.

```ts
import * as Jimp from 'jimp'
class JimpProxy implements FormatProxyClass {
async create() {
return new JimpFormatCodec(Jimp)
}
}
```

## Hierarchy

* **CanvasCodec**

## Implements

* [FormatCodec](../interfaces/_types_mirada_.formatcodec.md)

## Index

### Constructors

* [constructor](_format_canvascodec_.canvascodec.md#constructor)

### Methods

* [decode](_format_canvascodec_.canvascodec.md#decode)
* [encode](_format_canvascodec_.canvascodec.md#encode)

## Constructors

###  constructor

\+ **new CanvasCodec**(): *[CanvasCodec](_format_canvascodec_.canvascodec.md)*

*Defined in [format/canvasCodec.ts:22](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/format/canvasCodec.ts#L22)*

**Returns:** *[CanvasCodec](_format_canvascodec_.canvascodec.md)*

## Methods

###  decode

▸ **decode**(`buffer`: ArrayBuffer): *Promise‹ImageData›*

*Defined in [format/canvasCodec.ts:25](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/format/canvasCodec.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |

**Returns:** *Promise‹ImageData›*

___

###  encode

▸ **encode**(`data`: ImageData, `format`: string): *Promise‹ArrayBuffer›*

*Implementation of [FormatCodec](../interfaces/_types_mirada_.formatcodec.md)*

*Defined in [format/canvasCodec.ts:54](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/format/canvasCodec.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ImageData |
`format` | string |

**Returns:** *Promise‹ArrayBuffer›*