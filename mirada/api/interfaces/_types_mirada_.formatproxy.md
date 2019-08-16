> **[mirada](../README.md)**

[Globals](../README.md) / ["types/mirada"](../modules/_types_mirada_.md) / [FormatProxy](_types_mirada_.formatproxy.md) /

# Interface: FormatProxy

## Hierarchy

* **FormatProxy**

## Index

### Methods

* [decode](_types_mirada_.formatproxy.md#decode)
* [encode](_types_mirada_.formatproxy.md#encode)

## Methods

###  decode

▸ **decode**(`buffer`: `ArrayBuffer`, `format?`: undefined | string): *`Promise<ImageData>`*

Defined in types/mirada.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | `ArrayBuffer` |
`format?` | undefined \| string |

**Returns:** *`Promise<ImageData>`*

___

###  encode

▸ **encode**(`data`: [ImageData](_types_opencv_.imagedata.md), `format`: string): *`Promise<ArrayBuffer>`*

Defined in types/mirada.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ImageData](_types_opencv_.imagedata.md) |
`format` | string |

**Returns:** *`Promise<ArrayBuffer>`*