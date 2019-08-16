> **[mirada](../README.md)**

[Globals](../README.md) / ["browserImageUtil"](_browserimageutil_.md) /

# External module: "browserImageUtil"

## Index

### Functions

* [createFileFromUrl](_browserimageutil_.md#createfilefromurl)
* [getImageData](_browserimageutil_.md#getimagedata)
* [htmlImageData](_browserimageutil_.md#htmlimagedata)
* [renderInCanvas](_browserimageutil_.md#renderincanvas)

## Functions

###  createFileFromUrl

▸ **createFileFromUrl**(`path`: string, `url`: string, `callback?`: undefined | function): *`Promise<unknown>`*

*Defined in [browserImageUtil.ts:45](https://github.com/cancerberoSgx/mirada/blob/b359ba5/mirada/src/browserImageUtil.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`url` | string |
`callback?` | undefined \| function |

**Returns:** *`Promise<unknown>`*

___

###  getImageData

▸ **getImageData**(`url`: string): *`Promise<ImageData>`*

*Defined in [browserImageUtil.ts:4](https://github.com/cancerberoSgx/mirada/blob/b359ba5/mirada/src/browserImageUtil.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *`Promise<ImageData>`*

___

###  htmlImageData

▸ **htmlImageData**(`img`: [Mat](../classes/_types_opencv_.mat.md)): *`ImageData`*

*Defined in [browserImageUtil.ts:39](https://github.com/cancerberoSgx/mirada/blob/b359ba5/mirada/src/browserImageUtil.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`img` | [Mat](../classes/_types_opencv_.mat.md) |

**Returns:** *`ImageData`*

___

###  renderInCanvas

▸ **renderInCanvas**(`mat`: [Mat](../classes/_types_opencv_.mat.md), `canvas?`: `HTMLCanvasElement`, `appendToBody`: boolean): *`HTMLCanvasElement`*

*Defined in [browserImageUtil.ts:21](https://github.com/cancerberoSgx/mirada/blob/b359ba5/mirada/src/browserImageUtil.ts#L21)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`mat` | [Mat](../classes/_types_opencv_.mat.md) | - |
`canvas?` | `HTMLCanvasElement` | - |
`appendToBody` | boolean | true |

**Returns:** *`HTMLCanvasElement`*