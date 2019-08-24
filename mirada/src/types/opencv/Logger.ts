
import { int } from './_types'

/**
 * 
 * Source: [opencv2/flann/logger.h](https://github.com/opencv/opencv/tree/master/modules/core/include/opencv2/flann/logger.h#L130).
 * 
 */
export declare class Logger {

  /**
   *   
   *   @param fmt 
   *   @param arg121 
   */
  public static error(fmt: any, arg121: any): int

  /**
   *   
   *   @param fmt 
   *   @param arg122 
   */
  public static fatal(fmt: any, arg122: any): int

  /**
   *   
   *   @param fmt 
   *   @param arg123 
   */
  public static info(fmt: any, arg123: any): int

  /**
   *   Print log message
   *   
   *   @param level Log level
   *   @param fmt Message format
   *   @param arg124 
   */
  public static log(level: int, fmt: any, arg124: any): int

  /**
   *   Sets the logging destination
   *   
   *   @param name Filename or NULL for console
   */
  public static setDestination(name: any): void

  /**
   *   Sets the logging level. All messages with lower priority will be ignored.
   *   
   *   @param level Logging level
   */
  public static setLevel(level: int): void

  /**
   *   
   *   @param fmt 
   *   @param arg125 
   */
  public static warn(fmt: any, arg125: any): int
}

