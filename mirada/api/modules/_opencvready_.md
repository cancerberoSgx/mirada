**[mirada](../README.md)**

[Globals](../README.md) › ["opencvReady"](_opencvready_.md)

# External module: "opencvReady"

## Index

### Variables

* [FS_ROOT](_opencvready_.md#const-fs_root)
* [opencvReady](_opencvready_.md#const-opencvready)

### Functions

* [getFS](_opencvready_.md#getfs)
* [loadOpencv](_opencvready_.md#loadopencv)

## Variables

### `Const` FS_ROOT

• **FS_ROOT**: *"/work"* = "/work"

*Defined in [opencvReady.ts:7](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/opencvReady.ts#L7)*

___

### `Const` opencvReady

• **opencvReady**: *Deferred‹void, any›* =  new Deferred<void>()

*Defined in [opencvReady.ts:12](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/opencvReady.ts#L12)*

An exposed promise that is resolved when the library is ready to be used.
At that time the global variable 'cv' should be available and ready.

## Functions

###  getFS

▸ **getFS**(): *[FS](../interfaces/_types_emscripten_.fs.md)*

*Defined in [opencvReady.ts:18](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/opencvReady.ts#L18)*

gets the emscripten FS API

**Returns:** *[FS](../interfaces/_types_emscripten_.fs.md)*

___

###  loadOpencv

▸ **loadOpencv**(`o`: LoadOptions): *Promise‹void› | Promise‹[FS](../interfaces/_types_emscripten_.fs.md)›*

*Defined in [opencvReady.ts:41](https://github.com/cancerberoSgx/mirada/blob/0e72f4f/mirada/src/opencvReady.ts#L41)*

Loads opencv.js file. It will do it only once no matter if called multiple times.
In the browser a new script element is created to load the file while in Node.js
the file is loaded using a require() call.

Returns a promise resolved when the library is ready or rejected if there's a problem.

Notice that among the options users can define the location of opencv.js file, which
in the case of the browser it could be in an external server.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | LoadOptions |  {} |

**Returns:** *Promise‹void› | Promise‹[FS](../interfaces/_types_emscripten_.fs.md)›*