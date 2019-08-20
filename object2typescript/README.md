# object2typeScript

Creates TypeScript type declarations from JSON and JavaScript objects

## Contents

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
- [Command line interface](#command-line-interface)
- [Options](#options)

<!-- tocstop -->

## Install

```sh
npm install object2typescript
```

## Usage

Right now it only supports JSON objects (but keep tunned for JavaScript objects in the future):

```ts
import {json2typescript} from 'object2typescript'

// the object from which we want to get types:
const node = {
  a: [1], b: [{ foo: [{ bar: [[1, 1, 2, 2]] }] }]
}
const code = json2typescript({
  node,
  nodeName: 'Foo',
  codeFormatOptions: {
    indentSize: 2
  }
})
```

Generates a string like the following, that's valid TypeScript code we can add to a .ts file:

```ts
export interface Foo {
  a: number[]
  b: {
    foo: {
      bar: number[][]
    } []
  } []
}
```

By default (and currently only implemented) objects are rendered as a single literal object. Stay tunned for more render modes like multiple named interfaces or declared classes.

See Options section below for complete list of supported options.

## Command line interface

Example usage:

```
object2typescript --input coolService.json --output src/types/cool.ts --nodeName Cool

object2typescript --input http://127.0.0.1:8080/class33.json --nodeName Class33 \
  --propertyNames --codeFormatOptions ./formatCodeSettings.json > src/probes/Class33.ts

```

## Options

The options have the same names for the JavaScript API and for the Command line with few exceptions:

  * codeFormatOptions?: string: path to a valid formatCodeSettings.json that defines some FormatOptions properties

  * input?: string: if given it will try to read input JSON from that path. If no file exists then it tries to load as a URL.
  If not given it will read JSON string form stdin

  * help?: boolean:

  * debug?: boolean:

  * output?: string: if given output typescript code will be written in that path, if not it will be on stdout

  * nodeName?: string: Name for the root type.

  * arrayType?: 'each' | 'first' | 'merge': first: only the first element will be examined and the output type willbe T[] where T describe the first element
  merge: similar to first, but all elements of the array are examined and their types will be merged according to these rules:
    1) if incompatible types are found [1, {a:2}] then union types are generated (number|{a:number})
    2) for object elements, their properties will be merged recursively: [{a:{b:'s'}}, {x:1,a:{c:new Date()}}] will generate {a:{b:string,c:Date},x:number}[]
  each: will generate a the exact tuple: [1, {a:2}] generates [number, {a:number}]

  * objectTypePolicy?: 'interface' | 'declareClass' | 'literalObject':
    - interface: will generate an interface for each object using the property name for the interface name
    - declareClass is similar to interface but will generate declare class Foo { bar: Bar }

  * export?: boolean: Export all generated types

  * optionalProperties?: boolean: if true all properties will be marked as optional no matter if they are found on all instances of an array for example.

  * propertyNames?: boolean: Force all member names to be quoted. i.e : interface I { 'foo': Foo } no matter if they don't need to.

## TODO

[TODO.md](TODO.md)