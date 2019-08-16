> **[mirada](../README.md)**

[Globals](../README.md) / ["opencvReady"](_opencvready_.md) /

# External module: "opencvReady"

## Index

### Variables

* [opencvReady](_opencvready_.md#const-opencvready)

### Functions

* [loadOpencv](_opencvready_.md#loadopencv)

## Variables

### `Const` opencvReady

• **opencvReady**: *`Deferred<void, any>`* =  new Deferred<void>()

*Defined in [opencvReady.ts:9](https://github.com/cancerberoSgx/mirada/blob/b359ba5/mirada/src/opencvReady.ts#L9)*

An exposed promise that is resolved when the library is ready to be used.
At that time the global variable 'cv' should be available and ready.

## Functions

###  loadOpencv

▸ **loadOpencv**(`o`: `LoadOptions`): *`Promise<unknown>`*

*Defined in [opencvReady.ts:32](https://github.com/cancerberoSgx/mirada/blob/b359ba5/mirada/src/opencvReady.ts#L32)*

Loads opencv.js file. It will do it only once no matter if called multiple times.
In the browser a new script element is created to load the file while in Node.js
the file is loaded using a require() call.

Returns a promise resolved when the library is ready or rejected if there's a problem.

Notice that among the options users can define the location of opencv.js file, which
in the case of the browser it could be in an external server.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | `LoadOptions` |  {} |

**Returns:** *`Promise<unknown>`*