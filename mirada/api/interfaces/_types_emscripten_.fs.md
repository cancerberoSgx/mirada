**[mirada](../README.md)**

[Globals](../README.md) › ["types/emscripten"](../modules/_types_emscripten_.md) › [FS](_types_emscripten_.fs.md)

# Interface: FS

## Hierarchy

* **FS**

## Index

### Methods

* [allocate](_types_emscripten_.fs.md#allocate)
* [analyzePath](_types_emscripten_.fs.md#analyzepath)
* [chdir](_types_emscripten_.fs.md#chdir)
* [chmod](_types_emscripten_.fs.md#chmod)
* [chown](_types_emscripten_.fs.md#chown)
* [close](_types_emscripten_.fs.md#close)
* [createDataFile](_types_emscripten_.fs.md#createdatafile)
* [createLazyFile](_types_emscripten_.fs.md#createlazyfile)
* [createPreloadedFile](_types_emscripten_.fs.md#createpreloadedfile)
* [cwd](_types_emscripten_.fs.md#cwd)
* [fchmod](_types_emscripten_.fs.md#fchmod)
* [fchown](_types_emscripten_.fs.md#fchown)
* [ftruncate](_types_emscripten_.fs.md#ftruncate)
* [getPath](_types_emscripten_.fs.md#getpath)
* [init](_types_emscripten_.fs.md#init)
* [ioctl](_types_emscripten_.fs.md#ioctl)
* [isBlkdev](_types_emscripten_.fs.md#isblkdev)
* [isChrdev](_types_emscripten_.fs.md#ischrdev)
* [isDir](_types_emscripten_.fs.md#isdir)
* [isFIFO](_types_emscripten_.fs.md#isfifo)
* [isFile](_types_emscripten_.fs.md#isfile)
* [isLink](_types_emscripten_.fs.md#islink)
* [isSocket](_types_emscripten_.fs.md#issocket)
* [lchmod](_types_emscripten_.fs.md#lchmod)
* [lchown](_types_emscripten_.fs.md#lchown)
* [llseek](_types_emscripten_.fs.md#llseek)
* [lookupPath](_types_emscripten_.fs.md#lookuppath)
* [lstat](_types_emscripten_.fs.md#lstat)
* [major](_types_emscripten_.fs.md#major)
* [makedev](_types_emscripten_.fs.md#makedev)
* [minor](_types_emscripten_.fs.md#minor)
* [mkdev](_types_emscripten_.fs.md#mkdev)
* [mkdir](_types_emscripten_.fs.md#mkdir)
* [mmap](_types_emscripten_.fs.md#mmap)
* [mount](_types_emscripten_.fs.md#mount)
* [open](_types_emscripten_.fs.md#open)
* [read](_types_emscripten_.fs.md#read)
* [readFile](_types_emscripten_.fs.md#readfile)
* [readdir](_types_emscripten_.fs.md#readdir)
* [readlink](_types_emscripten_.fs.md#readlink)
* [registerDevice](_types_emscripten_.fs.md#registerdevice)
* [rename](_types_emscripten_.fs.md#rename)
* [rmdir](_types_emscripten_.fs.md#rmdir)
* [stat](_types_emscripten_.fs.md#stat)
* [symlink](_types_emscripten_.fs.md#symlink)
* [syncfs](_types_emscripten_.fs.md#syncfs)
* [truncate](_types_emscripten_.fs.md#truncate)
* [unlink](_types_emscripten_.fs.md#unlink)
* [unmount](_types_emscripten_.fs.md#unmount)
* [utime](_types_emscripten_.fs.md#utime)
* [write](_types_emscripten_.fs.md#write)
* [writeFile](_types_emscripten_.fs.md#writefile)

## Methods

###  allocate

▸ **allocate**(`stream`: FSStream, `offset`: number, `length`: number): *void*

*Defined in [types/emscripten.ts:55](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | FSStream |
`offset` | number |
`length` | number |

**Returns:** *void*

___

###  analyzePath

▸ **analyzePath**(`p`: string): *any*

*Defined in [types/emscripten.ts:61](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | string |

**Returns:** *any*

___

###  chdir

▸ **chdir**(`path`: string): *void*

*Defined in [types/emscripten.ts:63](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *void*

___

###  chmod

▸ **chmod**(`path`: string, `mode`: number, `dontFollow?`: undefined | false | true): *void*

*Defined in [types/emscripten.ts:41](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`mode` | number |
`dontFollow?` | undefined \| false \| true |

**Returns:** *void*

___

###  chown

▸ **chown**(`path`: string, `uid`: number, `gid`: number, `dontFollow?`: undefined | false | true): *void*

*Defined in [types/emscripten.ts:44](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`uid` | number |
`gid` | number |
`dontFollow?` | undefined \| false \| true |

**Returns:** *void*

___

###  close

▸ **close**(`stream`: FSStream): *void*

*Defined in [types/emscripten.ts:51](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | FSStream |

**Returns:** *void*

___

###  createDataFile

▸ **createDataFile**(`parent`: string, `name`: string, `data`: ArrayBufferView, `canRead`: boolean, `canWrite`: boolean, `canOwn`: boolean): *void*

*Defined in [types/emscripten.ts:72](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | string |
`name` | string |
`data` | ArrayBufferView |
`canRead` | boolean |
`canWrite` | boolean |
`canOwn` | boolean |

**Returns:** *void*

___

###  createLazyFile

▸ **createLazyFile**(`parent`: string, `name`: string, `url`: string, `canRead`: boolean, `canWrite`: boolean): *FSNode*

*Defined in [types/emscripten.ts:66](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | string |
`name` | string |
`url` | string |
`canRead` | boolean |
`canWrite` | boolean |

**Returns:** *FSNode*

▸ **createLazyFile**(`parent`: FSNode, `name`: string, `url`: string, `canRead`: boolean, `canWrite`: boolean): *FSNode*

*Defined in [types/emscripten.ts:67](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | FSNode |
`name` | string |
`url` | string |
`canRead` | boolean |
`canWrite` | boolean |

**Returns:** *FSNode*

___

###  createPreloadedFile

▸ **createPreloadedFile**(`parent`: string, `name`: string, `url`: string, `canRead`: boolean, `canWrite`: boolean, `onload?`: undefined | function, `onerror?`: undefined | function, `dontCreateFile?`: undefined | false | true, `canOwn?`: undefined | false | true): *void*

*Defined in [types/emscripten.ts:69](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | string |
`name` | string |
`url` | string |
`canRead` | boolean |
`canWrite` | boolean |
`onload?` | undefined \| function |
`onerror?` | undefined \| function |
`dontCreateFile?` | undefined \| false \| true |
`canOwn?` | undefined \| false \| true |

**Returns:** *void*

▸ **createPreloadedFile**(`parent`: FSNode, `name`: string, `url`: string, `canRead`: boolean, `canWrite`: boolean, `onload?`: undefined | function, `onerror?`: undefined | function, `dontCreateFile?`: undefined | false | true, `canOwn?`: undefined | false | true): *void*

*Defined in [types/emscripten.ts:70](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | FSNode |
`name` | string |
`url` | string |
`canRead` | boolean |
`canWrite` | boolean |
`onload?` | undefined \| function |
`onerror?` | undefined \| function |
`dontCreateFile?` | undefined \| false \| true |
`canOwn?` | undefined \| false \| true |

**Returns:** *void*

___

###  cwd

▸ **cwd**(): *string*

*Defined in [types/emscripten.ts:62](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L62)*

**Returns:** *string*

___

###  fchmod

▸ **fchmod**(`fd`: number, `mode`: number): *void*

*Defined in [types/emscripten.ts:43](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`fd` | number |
`mode` | number |

**Returns:** *void*

___

###  fchown

▸ **fchown**(`fd`: number, `uid`: number, `gid`: number): *void*

*Defined in [types/emscripten.ts:46](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`fd` | number |
`uid` | number |
`gid` | number |

**Returns:** *void*

___

###  ftruncate

▸ **ftruncate**(`fd`: number, `len`: number): *void*

*Defined in [types/emscripten.ts:48](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`fd` | number |
`len` | number |

**Returns:** *void*

___

###  getPath

▸ **getPath**(`node`: FSNode): *string*

*Defined in [types/emscripten.ts:11](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | FSNode |

**Returns:** *string*

___

###  init

▸ **init**(`input`: function, `output`: function, `error`: function): *void*

*Defined in [types/emscripten.ts:64](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L64)*

**Parameters:**

▪ **input**: *function*

▸ (): *number*

▪ **output**: *function*

▸ (`c`: number): *any*

**Parameters:**

Name | Type |
------ | ------ |
`c` | number |

▪ **error**: *function*

▸ (`c`: number): *any*

**Parameters:**

Name | Type |
------ | ------ |
`c` | number |

**Returns:** *void*

___

###  ioctl

▸ **ioctl**(`stream`: FSStream, `cmd`: any, `arg`: any): *any*

*Defined in [types/emscripten.ts:57](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | FSStream |
`cmd` | any |
`arg` | any |

**Returns:** *any*

___

###  isBlkdev

▸ **isBlkdev**(`mode`: number): *boolean*

*Defined in [types/emscripten.ts:17](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isChrdev

▸ **isChrdev**(`mode`: number): *boolean*

*Defined in [types/emscripten.ts:16](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isDir

▸ **isDir**(`mode`: number): *boolean*

*Defined in [types/emscripten.ts:14](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isFIFO

▸ **isFIFO**(`mode`: number): *boolean*

*Defined in [types/emscripten.ts:18](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isFile

▸ **isFile**(`mode`: number): *boolean*

*Defined in [types/emscripten.ts:13](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isLink

▸ **isLink**(`mode`: number): *boolean*

*Defined in [types/emscripten.ts:15](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isSocket

▸ **isSocket**(`mode`: number): *boolean*

*Defined in [types/emscripten.ts:19](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  lchmod

▸ **lchmod**(`path`: string, `mode`: number): *void*

*Defined in [types/emscripten.ts:42](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`mode` | number |

**Returns:** *void*

___

###  lchown

▸ **lchown**(`path`: string, `uid`: number, `gid`: number): *void*

*Defined in [types/emscripten.ts:45](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`uid` | number |
`gid` | number |

**Returns:** *void*

___

###  llseek

▸ **llseek**(`stream`: FSStream, `offset`: number, `whence`: number): *any*

*Defined in [types/emscripten.ts:52](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | FSStream |
`offset` | number |
`whence` | number |

**Returns:** *any*

___

###  lookupPath

▸ **lookupPath**(`path`: string, `opts`: any): *Lookup*

*Defined in [types/emscripten.ts:10](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`opts` | any |

**Returns:** *Lookup*

___

###  lstat

▸ **lstat**(`path`: string): *any*

*Defined in [types/emscripten.ts:40](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *any*

___

###  major

▸ **major**(`dev`: number): *number*

*Defined in [types/emscripten.ts:21](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`dev` | number |

**Returns:** *number*

___

###  makedev

▸ **makedev**(`ma`: number, `mi`: number): *number*

*Defined in [types/emscripten.ts:23](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`ma` | number |
`mi` | number |

**Returns:** *number*

___

###  minor

▸ **minor**(`dev`: number): *number*

*Defined in [types/emscripten.ts:22](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`dev` | number |

**Returns:** *number*

___

###  mkdev

▸ **mkdev**(`path`: string, `mode?`: undefined | number, `dev?`: undefined | number): *any*

*Defined in [types/emscripten.ts:32](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`mode?` | undefined \| number |
`dev?` | undefined \| number |

**Returns:** *any*

___

###  mkdir

▸ **mkdir**(`path`: string, `mode?`: undefined | number): *any*

*Defined in [types/emscripten.ts:31](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`mode?` | undefined \| number |

**Returns:** *any*

___

###  mmap

▸ **mmap**(`stream`: FSStream, `buffer`: ArrayBufferView, `offset`: number, `length`: number, `position`: number, `prot`: number, `flags`: number): *any*

*Defined in [types/emscripten.ts:56](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | FSStream |
`buffer` | ArrayBufferView |
`offset` | number |
`length` | number |
`position` | number |
`prot` | number |
`flags` | number |

**Returns:** *any*

___

###  mount

▸ **mount**(`type`: any, `opts`: any, `mountpoint`: string): *any*

*Defined in [types/emscripten.ts:28](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | any |
`opts` | any |
`mountpoint` | string |

**Returns:** *any*

___

###  open

▸ **open**(`path`: string, `flags`: string, `mode?`: undefined | number, `fd_start?`: undefined | number, `fd_end?`: undefined | number): *FSStream*

*Defined in [types/emscripten.ts:50](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`flags` | string |
`mode?` | undefined \| number |
`fd_start?` | undefined \| number |
`fd_end?` | undefined \| number |

**Returns:** *FSStream*

___

###  read

▸ **read**(`stream`: FSStream, `buffer`: ArrayBufferView, `offset`: number, `length`: number, `position?`: undefined | number): *number*

*Defined in [types/emscripten.ts:53](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | FSStream |
`buffer` | ArrayBufferView |
`offset` | number |
`length` | number |
`position?` | undefined \| number |

**Returns:** *number*

___

###  readFile

▸ **readFile**(`path`: string, `opts?`: undefined | object): *ArrayBufferView*

*Defined in [types/emscripten.ts:58](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`opts?` | undefined \| object |

**Returns:** *ArrayBufferView*

___

###  readdir

▸ **readdir**(`path`: string): *string[]*

*Defined in [types/emscripten.ts:36](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string[]*

___

###  readlink

▸ **readlink**(`path`: string): *string*

*Defined in [types/emscripten.ts:38](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string*

___

###  registerDevice

▸ **registerDevice**(`dev`: number, `ops`: any): *void*

*Defined in [types/emscripten.ts:24](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`dev` | number |
`ops` | any |

**Returns:** *void*

___

###  rename

▸ **rename**(`old_path`: string, `new_path`: string): *void*

*Defined in [types/emscripten.ts:34](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`old_path` | string |
`new_path` | string |

**Returns:** *void*

___

###  rmdir

▸ **rmdir**(`path`: string): *void*

*Defined in [types/emscripten.ts:35](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *void*

___

###  stat

▸ **stat**(`path`: string, `dontFollow?`: undefined | false | true): *any*

*Defined in [types/emscripten.ts:39](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`dontFollow?` | undefined \| false \| true |

**Returns:** *any*

___

###  symlink

▸ **symlink**(`oldpath`: string, `newpath`: string): *any*

*Defined in [types/emscripten.ts:33](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`oldpath` | string |
`newpath` | string |

**Returns:** *any*

___

###  syncfs

▸ **syncfs**(`populate`: boolean, `callback`: function): *void*

*Defined in [types/emscripten.ts:26](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L26)*

**Parameters:**

▪ **populate**: *boolean*

▪ **callback**: *function*

▸ (`e`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*

▸ **syncfs**(`callback`: function, `populate?`: undefined | false | true): *void*

*Defined in [types/emscripten.ts:27](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L27)*

**Parameters:**

▪ **callback**: *function*

▸ (`e`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

▪`Optional`  **populate**: *undefined | false | true*

**Returns:** *void*

___

###  truncate

▸ **truncate**(`path`: string, `len`: number): *void*

*Defined in [types/emscripten.ts:47](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`len` | number |

**Returns:** *void*

___

###  unlink

▸ **unlink**(`path`: string): *void*

*Defined in [types/emscripten.ts:37](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *void*

___

###  unmount

▸ **unmount**(`mountpoint`: string): *void*

*Defined in [types/emscripten.ts:29](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`mountpoint` | string |

**Returns:** *void*

___

###  utime

▸ **utime**(`path`: string, `atime`: number, `mtime`: number): *void*

*Defined in [types/emscripten.ts:49](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`atime` | number |
`mtime` | number |

**Returns:** *void*

___

###  write

▸ **write**(`stream`: FSStream, `buffer`: ArrayBufferView, `offset`: number, `length`: number, `position?`: undefined | number, `canOwn?`: undefined | false | true): *number*

*Defined in [types/emscripten.ts:54](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | FSStream |
`buffer` | ArrayBufferView |
`offset` | number |
`length` | number |
`position?` | undefined \| number |
`canOwn?` | undefined \| false \| true |

**Returns:** *number*

___

###  writeFile

▸ **writeFile**(`path`: string, `data`: ArrayBufferView, `opts?`: undefined | object): *void*

*Defined in [types/emscripten.ts:59](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`data` | ArrayBufferView |
`opts?` | undefined \| object |

**Returns:** *void*

▸ **writeFile**(`path`: string, `data`: string, `opts?`: undefined | object): *void*

*Defined in [types/emscripten.ts:60](https://github.com/cancerberoSgx/mirada/blob/19d9b36/mirada/src/types/emscripten.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`data` | string |
`opts?` | undefined \| object |

**Returns:** *void*