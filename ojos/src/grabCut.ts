import { Command, CommandOption } from './types';

type Options = [CommandOption<'x', number>,CommandOption<'y', number>,CommandOption<'width', number>,CommandOption<'height', number>]

export class GrabCut implements Command<Options> {
  options:Options=[
    new AbstractCommandOption('x'),
    new AbstractCommandOption('y', 0),
    new AbstractCommandOption('width', 0),
    new AbstractCommandOption('height', 0),
  ]
  name='grab-cut'
  description='TODO'
  validate( ){
    return this.validateOptions()
  }
  validateOptions(): string|undefined {
    var r:string|undefined = undefined
    const invalid =this.options.find(o=>{
      if(o.validate){
        r = o.validate()
      }
      return !!r
    })
    return invalid ? `Command ${this.name}'s ${invalid}` : undefined
  }
} 


export class AbstractCommandOption<Name extends string=any, Value=any> implements CommandOption<Name, Value> {
  constructor(public name:Name, public defaultValue?:Value, public description:string='TODO', public optional:boolean=false){
  }
  value?:Value
  validate(){
    if(!this.optional && typeof this.value === 'undefined'){
      return 'option '+this.name+' is mandatory'
    }
  }
}