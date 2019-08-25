**[mirada](../README.md)**

[Globals](../README.md) › ["format/format"](_format_format_.md)

# External module: "format/format"

## Index

### Functions

* [getDefaultCodec](_format_format_.md#getdefaultcodec)
* [installFormatProxy](_format_format_.md#installformatproxy)
* [loadFormatProxies](_format_format_.md#loadformatproxies)

## Functions

###  getDefaultCodec

▸ **getDefaultCodec**(): *[FormatCodec](../interfaces/_types_mirada_.formatcodec.md)*

*Defined in [format/format.ts:38](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/format/format.ts#L38)*

**Returns:** *[FormatCodec](../interfaces/_types_mirada_.formatcodec.md)*

___

###  installFormatProxy

▸ **installFormatProxy**(`proxy`: [FormatProxy](_types_mirada_.md#formatproxy)): *Promise‹void›*

*Defined in [format/format.ts:10](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/format/format.ts#L10)*

Nor or opencv.js or this library implement any image format so users are
responsible of providing a FormatProxy using some library.

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [FormatProxy](_types_mirada_.md#formatproxy) |

**Returns:** *Promise‹void›*

___

###  loadFormatProxies

▸ **loadFormatProxies**(): *Promise‹void›*

*Defined in [format/format.ts:27](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/format/format.ts#L27)*

**`internal`** 

**Returns:** *Promise‹void›*