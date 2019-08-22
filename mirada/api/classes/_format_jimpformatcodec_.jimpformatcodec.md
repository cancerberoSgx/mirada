**[mirada](../README.md)**

[Globals](../README.md) › ["format/jimpFormatCodec"](../modules/_format_jimpformatcodec_.md) › [JimpFormatCodec](_format_jimpformatcodec_.jimpformatcodec.md)

# Class: JimpFormatCodec

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

* **JimpFormatCodec**

## Implements

* [FormatCodec](../interfaces/_types_mirada_.formatcodec.md)

## Index

### Constructors

* [constructor](_format_jimpformatcodec_.jimpformatcodec.md#constructor)

### Properties

* [jimp](_format_jimpformatcodec_.jimpformatcodec.md#protected-jimp)

### Methods

* [decode](_format_jimpformatcodec_.jimpformatcodec.md#decode)
* [encode](_format_jimpformatcodec_.jimpformatcodec.md#encode)

## Constructors

###  constructor

\+ **new JimpFormatCodec**(`jimp`: Jimp): *[JimpFormatCodec](_format_jimpformatcodec_.jimpformatcodec.md)*

Defined in format/jimpFormatCodec.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`jimp` | Jimp |

**Returns:** *[JimpFormatCodec](_format_jimpformatcodec_.jimpformatcodec.md)*

## Properties

### `Protected` jimp

• **jimp**: *Jimp*

Defined in format/jimpFormatCodec.ts:22

## Methods

###  decode

▸ **decode**(`buffer`: ArrayBuffer): *Promise‹ImageData›*

Defined in format/jimpFormatCodec.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |

**Returns:** *Promise‹ImageData›*

___

###  encode

▸ **encode**(`data`: ImageData, `format`: string): *Promise‹ArrayBuffer›*

Defined in format/jimpFormatCodec.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`data` | ImageData |
`format` | string |

**Returns:** *Promise‹ArrayBuffer›*