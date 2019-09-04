import { File } from '..'
import { isFile } from '../util/fileUtil'
import { Command, CommandHandler, CommandName, CommandsByName, Options1, Result1 } from './types'


export abstract class AbstractCommandHandler<N extends CommandName> implements CommandHandler<N> {
  abstract run(c: Options1<N>): Promise<Result1>
  abstract validate(c: Partial<CommandsByName[N]>): Promise<undefined | string>
  
}

export function checkCommandInOut(c: Partial<Command<CommandName>>) {
  if (!c.in) {
    return 'in (input file) file is mandatory'
  }
  if (!c.out) {
    return 'out (output file name) is mandatory'
  }
}

export async function resolveFile(name: string, o: Options1<CommandName>): Promise<undefined | File> {
  if (!name) {
    return
  }
  const f = (o.files || []).find(f => f.name === name)
  if (f) {
    return f
  } else if (isFile(name)) {
    return await File.fromFile(name)
  }
  else {
    try {
      return await File.fromUrl(name)
    } catch (error) {

    }
  }
}

