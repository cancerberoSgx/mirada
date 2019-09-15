import { getOperationMetadata } from '../src'

function generateMetadata() {
  const noDescription: string[] = []
  getOperationMetadata().forEach(m => {
    if (!m.description.trim()) {
      noDescription.push(m.name)
    }
    m.options.forEach(o => {
      if (!o.description.trim()) {
        noDescription.push(m.name + '.' + o.name)
      }
    })
  })
   const noOptionsOrder:string[]=[]
   getOperationMetadata().forEach(m => {
    if (!m.optionsOrder||!m.optionsOrder.length) {
      noOptionsOrder.push(m.name)
    }
  })
  return {
    noDescription, noOptionsOrder
  }
  // TODO: missing options - filter all classes that extends AbstractOperation and check they are present in metadata
  // TODO: any types: there shouldn't be types "any"
}

console.log(JSON.stringify(generateMetadata(), null, 2))
