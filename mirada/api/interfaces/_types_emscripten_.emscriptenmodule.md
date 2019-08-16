> **[mirada](../README.md)**

[Globals](../README.md) / ["types/emscripten"](../modules/_types_emscripten_.md) / [EmscriptenModule](_types_emscripten_.emscriptenmodule.md) /

# Interface: EmscriptenModule

## Hierarchy

* **EmscriptenModule**

## Index

### Properties

* [ALLOC_DYNAMIC](_types_emscripten_.emscriptenmodule.md#alloc_dynamic)
* [ALLOC_NONE](_types_emscripten_.emscriptenmodule.md#alloc_none)
* [ALLOC_NORMAL](_types_emscripten_.emscriptenmodule.md#alloc_normal)
* [ALLOC_STACK](_types_emscripten_.emscriptenmodule.md#alloc_stack)
* [ALLOC_STATIC](_types_emscripten_.emscriptenmodule.md#alloc_static)
* [FAST_MEMORY](_types_emscripten_.emscriptenmodule.md#fast_memory)
* [FHEAP](_types_emscripten_.emscriptenmodule.md#fheap)
* [HEAP](_types_emscripten_.emscriptenmodule.md#heap)
* [HEAP16](_types_emscripten_.emscriptenmodule.md#heap16)
* [HEAP32](_types_emscripten_.emscriptenmodule.md#heap32)
* [HEAP8](_types_emscripten_.emscriptenmodule.md#heap8)
* [HEAPF32](_types_emscripten_.emscriptenmodule.md#heapf32)
* [HEAPF64](_types_emscripten_.emscriptenmodule.md#heapf64)
* [HEAPU16](_types_emscripten_.emscriptenmodule.md#heapu16)
* [HEAPU32](_types_emscripten_.emscriptenmodule.md#heapu32)
* [HEAPU8](_types_emscripten_.emscriptenmodule.md#heapu8)
* [IHEAP](_types_emscripten_.emscriptenmodule.md#iheap)
* [Runtime](_types_emscripten_.emscriptenmodule.md#runtime)
* [TOTAL_MEMORY](_types_emscripten_.emscriptenmodule.md#total_memory)
* [TOTAL_STACK](_types_emscripten_.emscriptenmodule.md#total_stack)
* [arguments](_types_emscripten_.emscriptenmodule.md#arguments)
* [environment](_types_emscripten_.emscriptenmodule.md#environment)
* [filePackagePrefixURL](_types_emscripten_.emscriptenmodule.md#filepackageprefixurl)
* [logReadFiles](_types_emscripten_.emscriptenmodule.md#logreadfiles)
* [noExitRuntime](_types_emscripten_.emscriptenmodule.md#noexitruntime)
* [noInitialRun](_types_emscripten_.emscriptenmodule.md#noinitialrun)
* [onAbort](_types_emscripten_.emscriptenmodule.md#onabort)
* [onRuntimeInitialized](_types_emscripten_.emscriptenmodule.md#onruntimeinitialized)
* [postRun](_types_emscripten_.emscriptenmodule.md#postrun)
* [preInit](_types_emscripten_.emscriptenmodule.md#preinit)
* [preRun](_types_emscripten_.emscriptenmodule.md#prerun)
* [preinitializedWebGLContext](_types_emscripten_.emscriptenmodule.md#preinitializedwebglcontext)
* [preloadedAudios](_types_emscripten_.emscriptenmodule.md#preloadedaudios)
* [preloadedImages](_types_emscripten_.emscriptenmodule.md#preloadedimages)
* [wasmBinary](_types_emscripten_.emscriptenmodule.md#wasmbinary)

### Methods

* [_free](_types_emscripten_.emscriptenmodule.md#_free)
* [_malloc](_types_emscripten_.emscriptenmodule.md#_malloc)
* [addOnExit](_types_emscripten_.emscriptenmodule.md#addonexit)
* [addOnInit](_types_emscripten_.emscriptenmodule.md#addoninit)
* [addOnPostRun](_types_emscripten_.emscriptenmodule.md#addonpostrun)
* [addOnPreMain](_types_emscripten_.emscriptenmodule.md#addonpremain)
* [addOnPreRun](_types_emscripten_.emscriptenmodule.md#addonprerun)
* [addRunDependency](_types_emscripten_.emscriptenmodule.md#addrundependency)
* [allocate](_types_emscripten_.emscriptenmodule.md#allocate)
* [ccall](_types_emscripten_.emscriptenmodule.md#ccall)
* [cwrap](_types_emscripten_.emscriptenmodule.md#cwrap)
* [destroy](_types_emscripten_.emscriptenmodule.md#destroy)
* [getPreloadedPackage](_types_emscripten_.emscriptenmodule.md#getpreloadedpackage)
* [getValue](_types_emscripten_.emscriptenmodule.md#getvalue)
* [instantiateWasm](_types_emscripten_.emscriptenmodule.md#instantiatewasm)
* [intArrayFromString](_types_emscripten_.emscriptenmodule.md#intarrayfromstring)
* [intArrayToString](_types_emscripten_.emscriptenmodule.md#intarraytostring)
* [locateFile](_types_emscripten_.emscriptenmodule.md#locatefile)
* [onCustomMessage](_types_emscripten_.emscriptenmodule.md#oncustommessage)
* [print](_types_emscripten_.emscriptenmodule.md#print)
* [printErr](_types_emscripten_.emscriptenmodule.md#printerr)
* [removeRunDependency](_types_emscripten_.emscriptenmodule.md#removerundependency)
* [setValue](_types_emscripten_.emscriptenmodule.md#setvalue)
* [writeArrayToMemory](_types_emscripten_.emscriptenmodule.md#writearraytomemory)
* [writeAsciiToMemory](_types_emscripten_.emscriptenmodule.md#writeasciitomemory)
* [writeStringToMemory](_types_emscripten_.emscriptenmodule.md#writestringtomemory)

## Properties

###  ALLOC_DYNAMIC

• **ALLOC_DYNAMIC**: *number*

*Defined in [types/emscripten.ts:111](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L111)*

___

###  ALLOC_NONE

• **ALLOC_NONE**: *number*

*Defined in [types/emscripten.ts:112](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L112)*

___

###  ALLOC_NORMAL

• **ALLOC_NORMAL**: *number*

*Defined in [types/emscripten.ts:108](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L108)*

___

###  ALLOC_STACK

• **ALLOC_STACK**: *number*

*Defined in [types/emscripten.ts:109](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L109)*

___

###  ALLOC_STATIC

• **ALLOC_STATIC**: *number*

*Defined in [types/emscripten.ts:110](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L110)*

___

###  FAST_MEMORY

• **FAST_MEMORY**: *number*

*Defined in [types/emscripten.ts:133](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L133)*

___

###  FHEAP

• **FHEAP**: *`Float64Array`*

*Defined in [types/emscripten.ts:119](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L119)*

___

###  HEAP

• **HEAP**: *`Int32Array`*

*Defined in [types/emscripten.ts:117](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L117)*

___

###  HEAP16

• **HEAP16**: *`Int16Array`*

*Defined in [types/emscripten.ts:123](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L123)*

___

###  HEAP32

• **HEAP32**: *`Int32Array`*

*Defined in [types/emscripten.ts:124](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L124)*

___

###  HEAP8

• **HEAP8**: *`Int8Array`*

*Defined in [types/emscripten.ts:122](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L122)*

___

###  HEAPF32

• **HEAPF32**: *`Float32Array`*

*Defined in [types/emscripten.ts:128](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L128)*

___

###  HEAPF64

• **HEAPF64**: *`Float64Array`*

*Defined in [types/emscripten.ts:129](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L129)*

___

###  HEAPU16

• **HEAPU16**: *`Uint16Array`*

*Defined in [types/emscripten.ts:126](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L126)*

___

###  HEAPU32

• **HEAPU32**: *`Uint32Array`*

*Defined in [types/emscripten.ts:127](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L127)*

___

###  HEAPU8

• **HEAPU8**: *`Uint8Array`*

*Defined in [types/emscripten.ts:125](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L125)*

___

###  IHEAP

• **IHEAP**: *`Int32Array`*

*Defined in [types/emscripten.ts:118](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L118)*

___

###  Runtime

• **Runtime**: *any*

*Defined in [types/emscripten.ts:100](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L100)*

___

###  TOTAL_MEMORY

• **TOTAL_MEMORY**: *number*

*Defined in [types/emscripten.ts:132](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L132)*

___

###  TOTAL_STACK

• **TOTAL_STACK**: *number*

*Defined in [types/emscripten.ts:131](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L131)*

___

###  arguments

• **arguments**: *string[]*

*Defined in [types/emscripten.ts:77](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L77)*

___

###  environment

• **environment**: *`EnvironmentType`*

*Defined in [types/emscripten.ts:78](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L78)*

___

###  filePackagePrefixURL

• **filePackagePrefixURL**: *string*

*Defined in [types/emscripten.ts:88](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L88)*

___

###  logReadFiles

• **logReadFiles**: *boolean*

*Defined in [types/emscripten.ts:87](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L87)*

___

###  noExitRuntime

• **noExitRuntime**: *boolean*

*Defined in [types/emscripten.ts:86](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L86)*

___

###  noInitialRun

• **noInitialRun**: *boolean*

*Defined in [types/emscripten.ts:85](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L85)*

___

###  onAbort

• **onAbort**: *function*

*Defined in [types/emscripten.ts:82](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L82)*

#### Type declaration:

▸ (`what`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`what` | any |

___

###  onRuntimeInitialized

• **onRuntimeInitialized**: *function*

*Defined in [types/emscripten.ts:83](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L83)*

#### Type declaration:

▸ (): *void*

___

###  postRun

• **postRun**: *`Array<function>`*

*Defined in [types/emscripten.ts:81](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L81)*

___

###  preInit

• **preInit**: *`Array<function>`*

*Defined in [types/emscripten.ts:79](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L79)*

___

###  preRun

• **preRun**: *`Array<function>`*

*Defined in [types/emscripten.ts:80](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L80)*

___

###  preinitializedWebGLContext

• **preinitializedWebGLContext**: *`WebGLRenderingContext`*

*Defined in [types/emscripten.ts:84](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L84)*

___

###  preloadedAudios

• **preloadedAudios**: *any*

*Defined in [types/emscripten.ts:152](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L152)*

___

###  preloadedImages

• **preloadedImages**: *any*

*Defined in [types/emscripten.ts:151](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L151)*

___

###  wasmBinary

• **wasmBinary**: *`ArrayBuffer`*

*Defined in [types/emscripten.ts:89](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L89)*

## Methods

###  _free

▸ **_free**(`ptr`: number): *void*

*Defined in [types/emscripten.ts:155](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`ptr` | number |

**Returns:** *void*

___

###  _malloc

▸ **_malloc**(`size`: number): *number*

*Defined in [types/emscripten.ts:154](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`size` | number |

**Returns:** *number*

___

###  addOnExit

▸ **addOnExit**(`cb`: function): *void*

*Defined in [types/emscripten.ts:138](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L138)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addOnInit

▸ **addOnInit**(`cb`: function): *void*

*Defined in [types/emscripten.ts:136](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L136)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addOnPostRun

▸ **addOnPostRun**(`cb`: function): *void*

*Defined in [types/emscripten.ts:139](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L139)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addOnPreMain

▸ **addOnPreMain**(`cb`: function): *void*

*Defined in [types/emscripten.ts:137](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L137)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addOnPreRun

▸ **addOnPreRun**(`cb`: function): *void*

*Defined in [types/emscripten.ts:135](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L135)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addRunDependency

▸ **addRunDependency**(`id`: any): *void*

*Defined in [types/emscripten.ts:148](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | any |

**Returns:** *void*

___

###  allocate

▸ **allocate**(`slab`: any, `types`: string | string[], `allocator`: number, `ptr`: number): *number*

*Defined in [types/emscripten.ts:114](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`slab` | any |
`types` | string \| string[] |
`allocator` | number |
`ptr` | number |

**Returns:** *number*

___

###  ccall

▸ **ccall**(`ident`: string, `returnType`: `ValueType` | null, `argTypes`: `ValueType`[], `args`: `TypeCompatibleWithC`[], `opts?`: `CCallOpts`): *any*

*Defined in [types/emscripten.ts:102](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`ident` | string |
`returnType` | `ValueType` \| null |
`argTypes` | `ValueType`[] |
`args` | `TypeCompatibleWithC`[] |
`opts?` | `CCallOpts` |

**Returns:** *any*

___

###  cwrap

▸ **cwrap**(`ident`: string, `returnType`: `ValueType` | null, `argTypes`: `ValueType`[], `opts?`: `CCallOpts`): *function*

*Defined in [types/emscripten.ts:103](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`ident` | string |
`returnType` | `ValueType` \| null |
`argTypes` | `ValueType`[] |
`opts?` | `CCallOpts` |

**Returns:** *function*

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  destroy

▸ **destroy**(`object`: object): *void*

*Defined in [types/emscripten.ts:91](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`object` | object |

**Returns:** *void*

___

###  getPreloadedPackage

▸ **getPreloadedPackage**(`remotePackageName`: string, `remotePackageSize`: number): *`ArrayBuffer`*

*Defined in [types/emscripten.ts:92](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`remotePackageName` | string |
`remotePackageSize` | number |

**Returns:** *`ArrayBuffer`*

___

###  getValue

▸ **getValue**(`ptr`: number, `type`: string, `noSafe?`: undefined | false | true): *number*

*Defined in [types/emscripten.ts:106](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`ptr` | number |
`type` | string |
`noSafe?` | undefined \| false \| true |

**Returns:** *number*

___

###  instantiateWasm

▸ **instantiateWasm**(`imports`: `WebAssemblyImports`, `successCallback`: function): *`WebAssemblyExports`*

*Defined in [types/emscripten.ts:93](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L93)*

**Parameters:**

▪ **imports**: *`WebAssemblyImports`*

▪ **successCallback**: *function*

▸ (`module`: `WebAssemblyModule`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`module` | `WebAssemblyModule` |

**Returns:** *`WebAssemblyExports`*

___

###  intArrayFromString

▸ **intArrayFromString**(`stringy`: string, `dontAddNull?`: undefined | false | true, `length?`: undefined | number): *number[]*

*Defined in [types/emscripten.ts:142](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`stringy` | string |
`dontAddNull?` | undefined \| false \| true |
`length?` | undefined \| number |

**Returns:** *number[]*

___

###  intArrayToString

▸ **intArrayToString**(`array`: number[]): *string*

*Defined in [types/emscripten.ts:143](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`array` | number[] |

**Returns:** *string*

___

###  locateFile

▸ **locateFile**(`url`: string): *string*

*Defined in [types/emscripten.ts:97](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  onCustomMessage

▸ **onCustomMessage**(`event`: `MessageEvent`): *void*

*Defined in [types/emscripten.ts:98](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | `MessageEvent` |

**Returns:** *void*

___

###  print

▸ **print**(`str`: string): *void*

*Defined in [types/emscripten.ts:75](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *void*

___

###  printErr

▸ **printErr**(`str`: string): *void*

*Defined in [types/emscripten.ts:76](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *void*

___

###  removeRunDependency

▸ **removeRunDependency**(`id`: any): *void*

*Defined in [types/emscripten.ts:149](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | any |

**Returns:** *void*

___

###  setValue

▸ **setValue**(`ptr`: number, `value`: any, `type`: string, `noSafe?`: undefined | false | true): *void*

*Defined in [types/emscripten.ts:105](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`ptr` | number |
`value` | any |
`type` | string |
`noSafe?` | undefined \| false \| true |

**Returns:** *void*

___

###  writeArrayToMemory

▸ **writeArrayToMemory**(`array`: number[], `buffer`: number): *void*

*Defined in [types/emscripten.ts:145](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`array` | number[] |
`buffer` | number |

**Returns:** *void*

___

###  writeAsciiToMemory

▸ **writeAsciiToMemory**(`str`: string, `buffer`: number, `dontAddNull`: boolean): *void*

*Defined in [types/emscripten.ts:146](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |
`buffer` | number |
`dontAddNull` | boolean |

**Returns:** *void*

___

###  writeStringToMemory

▸ **writeStringToMemory**(`str`: string, `buffer`: number, `dontAddNull`: boolean): *void*

*Defined in [types/emscripten.ts:144](https://github.com/cancerberoSgx/mirada/blob/22ee850/mirada/src/types/emscripten.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |
`buffer` | number |
`dontAddNull` | boolean |

**Returns:** *void*