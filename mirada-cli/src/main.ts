import { Options, Result } from "./types";
import { serial } from 'misc-utils-of-mine-generic';
import { File } from 'magica';

export async function main(options: Options): Promise<Result>{
  // console.log(options.input);
  const inputFiles = await File.resolve(options.input)
  console.log(inputFiles.map(f=>f.name));
  
  // await serial(options.input.map(f=>async ()=>{
  //   return File.resolve(options.input)
  // }))
  return {
    outputFiles: []
  }
}
