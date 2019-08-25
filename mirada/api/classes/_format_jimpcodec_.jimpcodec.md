**[mirada](../README.md)**

[Globals](../README.md) › ["format/jimpCodec"](../modules/_format_jimpcodec_.md) › [JimpCodec](_format_jimpcodec_.jimpcodec.md)

# Class: JimpCodec

Example of declaring a Jimp proxy as a class

```ts
import * as Jimp from 'jimp'
class JimpProxy implements FormatProxyClass {
async create() {
return new JimpFormatCodec(Jimp)
}
}
```

## Hierarchy

* **JimpCodec**

## Implements

* [FormatCodec](../interfaces/_types_mirada_.formatcodec.md)

## Index

### Constructors

* [constructor](_format_jimpcodec_.jimpcodec.md#constructor)

### Properties

* [jimp](_format_jimpcodec_.jimpcodec.md#protected-jimp)

### Methods

* [decode](_format_jimpcodec_.jimpcodec.md#decode)
* [encode](_format_jimpcodec_.jimpcodec.md#encode)

## Constructors

###  constructor

\+ **new JimpCodec**(`jimp`: Jimp): *[JimpCodec](_format_jimpcodec_.jimpcodec.md)*

*Defined in [format/jimpCodec.ts:21](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/format/jimpCodec.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`jimp` | Jimp |

**Returns:** *[JimpCodec](_format_jimpcodec_.jimpcodec.md)*

## Properties

### `Protected` jimp

• **jimp**: *Jimp*

*Defined in [format/jimpCodec.ts:22](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/format/jimpCodec.ts#L22)*

## Methods

###  decode

▸ **decode**(`buffer`: ArrayBuffer): *Promise‹ImageData›*

*Defined in [format/jimpCodec.ts:24](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/format/jimpCodec.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |

**Returns:** *Promise‹ImageData›*

___

###  encode

▸ **encode**(`data`: ImageData, `format`: string): *Promise‹ArrayBuffer›*

*Implementation of [FormatCodec](../interfaces/_types_mirada_.formatcodec.md)*

*Defined in [format/jimpCodec.ts:28](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/format/jimpCodec.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | ImageData |
`format` | string |

**Returns:** *Promise‹ArrayBuffer›*