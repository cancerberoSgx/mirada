import { isArray } from 'util'

interface Options {
  node: any
  prefix?: string
  buffer: string[]
}
interface _Options extends Options {
  lastClass?: any
  lastPropertyTypeName?: string
  propName: string
  parentClass?: string
}
export function visit(o: Options) {

  const config = o as _Options
  config.prefix = config.prefix || '_prefix'
  var node = config.node
    , prefix = config.prefix

  if (isArray(node)) {
    if (node.length) {
      let childVisitConfig: _Options = {
        buffer: []
        , propName: 'unammedprop'
        , node: node[0]
        , prefix: prefix
      }
      visit(childVisitConfig)
      var childTypeName = 'Any'

      if (childVisitConfig.buffer[0].indexOf('@class') !== -1) {
        childTypeName = childVisitConfig.lastClass || 'UnnamedClass'
      }
      if (childVisitConfig.buffer[0].indexOf('@property') !== -1) {
        childTypeName = config.lastPropertyTypeName || 'UnnamedProperty'
      }
      var typeName = childTypeName ? ('Array<' + childTypeName + '>') : 'Array'
      config.lastPropertyTypeName = typeName
      config.buffer.push('@property {' + typeName + '} ' + config.propName)
    }
    else {
      config.buffer.push('@property {Array} ' + config.propName)
      config.lastPropertyTypeName = 'Array'
    }
  }

  else if (typeof node === 'object') {
    var originalClass = prefix + ''

    config.lastClass = originalClass

    if (config.propName) {
      config.buffer.push('@property {' + prefix + '} ' + config.propName)
    }
    config.buffer.push('@class ' + prefix)

    // @class ToolVisitConfig 
    // @property {Array<String>} buffer
    let childVisitConfig = { buffer: [], parentClass: prefix }
    Object.keys(node).forEach(propName => {
      var propValue = node[propName]
      // _(node).each(function(propValue, propName)
      Object.assign(childVisitConfig, {
        prefix: prefix + '_' + propName	//@property {String} prefix		
        , node: propValue //@property {Any} node
        , propName: propName //@property {Any} node
      })
      visit(childVisitConfig as any)
    })


    //we visited the properties using a second buffer and now we dump it to the real buffer.
    childVisitConfig.buffer.forEach(function(s) {
      config.buffer.push(s)
    })

    //and then return talking about the original class
    if (config.parentClass) {
      config.buffer.push('@class ' + originalClass)
    }
  }

  else {
    var type = 'undefined'
    if (typeof node === 'string') {
      type = 'String'
    }
    else if (typeof node === 'number') {
      type = 'Number'
    }
    else if (typeof node === 'boolean') {
      type = 'Boolean'
    }
    config.lastPropertyTypeName = type
    config.buffer.push('@property {' + type + '} ' + config.propName)
    //TODO: check config.propName undefined
  }
}



function test() {
  var o = {
    a: 1, b: [1, 2], d: { a: 9, b: [false] }
  }

  var buffer = []
  visit({
    node: o,
    buffer
  })

  console.log(buffer.join('\n'))

}
