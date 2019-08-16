> **[mirada](../README.md)**

[Globals](../README.md) / ["types/opencv"](../modules/_types_opencv_.md) / [Mat](_types_opencv_.mat.md) /

# Class: Mat

## Hierarchy

* **Mat**

## Index

### Constructors

* [constructor](_types_opencv_.mat.md#constructor)

### Properties

* [cols](_types_opencv_.mat.md#cols)
* [data](_types_opencv_.mat.md#data)
* [rows](_types_opencv_.mat.md#rows)

### Methods

* [convertTo](_types_opencv_.mat.md#convertto)
* [delete](_types_opencv_.mat.md#delete)
* [type](_types_opencv_.mat.md#type)
* [ucharPtr](_types_opencv_.mat.md#ucharptr)
* [ones](_types_opencv_.mat.md#static-ones)

## Constructors

###  constructor

\+ **new Mat**(`rows?`: undefined | number, `cols?`: undefined | number, `type?`: undefined | number): *[Mat](_types_opencv_.mat.md)*

*Defined in [types/opencv.ts:48](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`rows?` | undefined \| number |
`cols?` | undefined \| number |
`type?` | undefined \| number |

**Returns:** *[Mat](_types_opencv_.mat.md)*

## Properties

###  cols

• **cols**: *number*

*Defined in [types/opencv.ts:50](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L50)*

___

###  data

• **data**: *`Uint8ClampedArray`*

*Defined in [types/opencv.ts:52](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L52)*

___

###  rows

• **rows**: *number*

*Defined in [types/opencv.ts:51](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L51)*

## Methods

###  convertTo

▸ **convertTo**(`img`: [Mat](_types_opencv_.mat.md), `CV_8U`: number, `scale`: number, `shift`: number): *void*

*Defined in [types/opencv.ts:55](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`img` | [Mat](_types_opencv_.mat.md) |
`CV_8U` | number |
`scale` | number |
`shift` | number |

**Returns:** *void*

___

###  delete

▸ **delete**(): *void*

*Defined in [types/opencv.ts:57](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L57)*

**Returns:** *void*

___

###  type

▸ **type**(): *number*

*Defined in [types/opencv.ts:56](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L56)*

**Returns:** *number*

___

###  ucharPtr

▸ **ucharPtr**(`i`: number, `j`: number): *`TODO`*

*Defined in [types/opencv.ts:53](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`i` | number |
`j` | number |

**Returns:** *`TODO`*

___

### `Static` ones

▸ **ones**(`arg0`: number, `arg1`: number, `CV_8U`: number): *[Mat](_types_opencv_.mat.md)*

*Defined in [types/opencv.ts:54](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/opencv.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | number |
`arg1` | number |
`CV_8U` | number |

**Returns:** *[Mat](_types_opencv_.mat.md)*