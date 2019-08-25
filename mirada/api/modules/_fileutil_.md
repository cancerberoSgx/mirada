**[mirada](../README.md)**

[Globals](../README.md) › ["fileUtil"](_fileutil_.md)

# External module: "fileUtil"

## Index

### Functions

* [getFileName](_fileutil_.md#getfilename)
* [getFilePath](_fileutil_.md#getfilepath)
* [isDir](_fileutil_.md#isdir)
* [isFile](_fileutil_.md#isfile)
* [readFile](_fileutil_.md#readfile)
* [removeFile](_fileutil_.md#removefile)
* [writeFile](_fileutil_.md#writefile)

## Functions

###  getFileName

▸ **getFileName**(`path`: string): *string*

*Defined in [fileUtil.ts:13](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/fileUtil.ts#L13)*

Returns file name / path of given file relative to emscripten FS root  (in the context of emscripten FS)

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string*

___

###  getFilePath

▸ **getFilePath**(`path`: string): *string*

*Defined in [fileUtil.ts:20](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/fileUtil.ts#L20)*

Returns absolute path of given file (in the context of emscripten FS)

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string*

___

###  isDir

▸ **isDir**(`f`: string, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *boolean*

*Defined in [fileUtil.ts:32](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/fileUtil.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *boolean*

___

###  isFile

▸ **isFile**(`f`: string, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *boolean*

*Defined in [fileUtil.ts:40](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/fileUtil.ts#L40)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *boolean*

___

###  readFile

▸ **readFile**(`f`: string, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *ArrayBufferView*

*Defined in [fileUtil.ts:6](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/fileUtil.ts#L6)*

if given a file it ignores its contents and alwasys read again from FS

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *ArrayBufferView*

___

###  removeFile

▸ **removeFile**(`f`: string, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *void*

*Defined in [fileUtil.ts:28](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/fileUtil.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *void*

___

###  writeFile

▸ **writeFile**(`name`: string, `f`: ArrayBufferView, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *void*

*Defined in [fileUtil.ts:24](https://github.com/cancerberoSgx/mirada/blob/0ec64a4/mirada/src/fileUtil.ts#L24)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`f` | ArrayBufferView | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *void*