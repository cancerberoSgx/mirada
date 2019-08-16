# object2typeScript

Creates TypeScript type declarations from JSON and JavaScript objects

## install

npm install object2typescript

## usage

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