import { dedup, serial } from 'misc-utils-of-mine-generic';
import { File } from '../file';
import { AbstractCommandHandler } from './abstractCommand';
import { handlerImplementations } from "./implementations";
import { Command, CommandName, Options, Options1, Result, Result1 } from './types';
/**
 * Declarative opencv operations. the idea is to be able to represent opencv operations as commands (json
 * serializable objects) so we can execute them as scripts. This provides with a declarative language which
 * can be used to build a command line interface for example.
 *
 *  * Files are referenced as strings using File.name.
 *  * initially execute() will accept a list of files that will be available to commands - Options.files
 *  * commands in general always accept an input file - Command.in
 *  * If a file referenced Command.in is not included in Options.files, then by default it will tried to be
 *    loaded using File.fromUrl or File.fromFile
 */
export async function execute(options: Options | Command<CommandName>[]) {
  const result: Result = {
    commands: [],
    out: []
  }
  const o: Options = typeof (options as Options).commands === 'undefined' ? { files: [], commands: options as Command<CommandName>[] } as Options : options as Options
  let files = [...o.files || []]
  let out: File[] = []
  await serial(o.commands.map((command, i) => async () => {
    const result1 = await execute1({ ...o, command, files })
    result.commands.push(result1)
    files = dedup([...files, ...result1.out], (a, b) => a.name == b.name)
    out = dedup([...out, ...result1.out], (a, b) => a.name == b.name)
    if (result1.error && !result.error) {
      result.error = `In command ${i + 1}: ${result1.error}`
    }
  }))
  return { ...result, out }
}

export async function execute1<T extends CommandName>(options: Options1<T> | Command<T>): Promise<Result1> {
  const o: Options1<T> = typeof (options as Options1<T>).command === 'undefined' ? { files: [], command: options as Command<T> } : options as any
  const impl: AbstractCommandHandler<T> = handlerImplementations[o.command.name] as AbstractCommandHandler<T>
  const error = !impl ? `Command ${o.command.name} not recognized. Ignoring it.` : await impl.validate(o.command)
  if (error) {
    return { error, out: [] }
  }
  return impl.run(o)
}

export function deleteResult(r: Result) {
  r.out.forEach(f => f.delete())
}
