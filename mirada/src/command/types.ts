import { File } from '../file'
import { Command_asRgba, Command_asRgbaImpl } from "./impl/asRgba"
import { Command_floodFill, Command_floodFillImpl } from "./impl/floodfill"
import { Command_grabCut, Command_grabCutImpl } from "./impl/grabCut"
import { Command_roi, Command_roiImpl } from "./impl/roi"

export enum CommandName {
  asRgba = 'asRgba',
  roi = 'roi',
  grabCut = 'grabCut',
  floodFill = 'floodFill'
}

export interface Command<T extends CommandName> {
  name: T;
  /**
   * Input file name.
   */
  in: string;
  /**
   * Output file names. If not given the input file will be replaced.
   */
  out?: string;
}

interface BaseOptions {
  /**
   * initial files
   */
  files?: File[];
  debug?: boolean;
}

export interface Options extends BaseOptions {
  /**
   * a list of commands that will be executed in serially. The output files of the one command will be
   * available to the following ones, and could replace existing files.
   */
  commands: (CommandsByName[CommandName])[];
  /** 
   * If true then commands always read and write files from FS, unless the file extension is '.mat' in which
   * case they reference a Mat object which are handled in memory.,(using these in intermediate commands is
   * faster since there' sno encoding/decoding and fs read/write in the middle) */
  fs?: boolean
}

export interface Options1<N extends CommandName> extends BaseOptions {
  command: CommandsByName[N];
}

export interface Result1 {
  out: File[];
  error?: string;
}

export interface Result extends Result1 {
  /**
   * Per command results.
   */
  commands: Result1[];
}

export interface CommandHandler<N extends CommandName> {
  validate(c: Partial<CommandsByName[N]>): Promise<undefined | string>
  run(c: Options1<N>): Promise<Result1>;
}

export interface CommandsByName {
  [CommandName.asRgba]: Command_asRgba
  [CommandName.roi]: Command_roi
  [CommandName.grabCut]: Command_grabCut
  [CommandName.floodFill]: Command_floodFill
}

export interface HandlersByName {
  [CommandName.asRgba]: Command_asRgbaImpl
  [CommandName.roi]: Command_roiImpl
  [CommandName.grabCut]: Command_grabCutImpl
  [CommandName.floodFill]: Command_floodFillImpl
}
