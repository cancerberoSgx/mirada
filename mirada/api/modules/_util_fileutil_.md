**[mirada](../README.md)**

[Globals](../README.md) › ["util/fileUtil"](_util_fileutil_.md)

# External module: "util/fileUtil"

## Index

### Functions

* [getFileName](_util_fileutil_.md#getfilename)
* [getFilePath](_util_fileutil_.md#getfilepath)
* [isDir](_util_fileutil_.md#isdir)
* [isFile](_util_fileutil_.md#isfile)
* [readFile](_util_fileutil_.md#readfile)
* [removeFile](_util_fileutil_.md#removefile)
* [writeFile](_util_fileutil_.md#writefile)

## Functions

###  getFileName

▸ **getFileName**(`path`: string): *string*

*Defined in [util/fileUtil.ts:13](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/fileUtil.ts#L13)*

Returns file name / path of given file relative to emscripten FS root  (in the context of emscripten FS)

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string*

___

###  getFilePath

▸ **getFilePath**(`path`: string): *string*

*Defined in [util/fileUtil.ts:20](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/fileUtil.ts#L20)*

Returns absolute path of given file (in the context of emscripten FS)

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string*

___

###  isDir

▸ **isDir**(`f`: string, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *boolean*

*Defined in [util/fileUtil.ts:32](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/fileUtil.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *boolean*

___

###  isFile

▸ **isFile**(`f`: string, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *boolean*

*Defined in [util/fileUtil.ts:40](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/fileUtil.ts#L40)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *boolean*

___

###  readFile

▸ **readFile**(`f`: string, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *ArrayBufferView*

*Defined in [util/fileUtil.ts:6](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/fileUtil.ts#L6)*

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

*Defined in [util/fileUtil.ts:28](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/fileUtil.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *void*

___

###  writeFile

▸ **writeFile**(`name`: string, `f`: ArrayBufferView, `FS`: [FS](../interfaces/_types_emscripten_.fs.md)): *void*

*Defined in [util/fileUtil.ts:24](https://github.com/cancerberoSgx/mirada/blob/ef78036/mirada/src/util/fileUtil.ts#L24)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`f` | ArrayBufferView | - |
`FS` | [FS](../interfaces/_types_emscripten_.fs.md) |  cv.FS |

**Returns:** *void*