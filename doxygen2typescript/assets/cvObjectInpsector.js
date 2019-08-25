function isClassConstructorFunction(a ) {
  return a && a.prototype && a.prototype.constructor && (a.prototype.constructor.toString().startsWith('class'))
}

//@ts-ignore
// Object.keys(cv).