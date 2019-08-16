> **[mirada](../README.md)**

[Globals](../README.md) / ["format"](_format_.md) /

# External module: "format"

## Index

### Variables

* [formatProxy](_format_.md#let-formatproxy)

### Functions

* [installFormatProxy](_format_.md#installformatproxy)

## Variables

### `Let` formatProxy

• **formatProxy**: *[FormatProxy](../interfaces/_types_mirada_.formatproxy.md) | undefined*

*Defined in [format.ts:12](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/format.ts#L12)*

## Functions

###  installFormatProxy

▸ **installFormatProxy**(`proxy`: [FormatProxy](../interfaces/_types_mirada_.formatproxy.md)): *void*

*Defined in [format.ts:8](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/format.ts#L8)*

Nor or opencv.js or this library implement any image format so users are
responsible of providing a FormatProxy using some library.

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [FormatProxy](../interfaces/_types_mirada_.formatproxy.md) |

**Returns:** *void*