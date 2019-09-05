import { FS } from './emscripten'
import { CV } from './opencv'
declare global {
  var cv: CV & { FS: FS }
}

// Some enums - this is actual implementation of mine!

/** Heads up this is actual implementation of mirada */
export enum SolveMethodEnum  {
  SOLVEPNP_ITERATIVE='SOLVEPNP_ITERATIVE',
  SOLVEPNP_EPNP='SOLVEPNP_EPNP',
  SOLVEPNP_P3P='SOLVEPNP_P3P',
  SOLVEPNP_DLS='SOLVEPNP_DLS',
  SOLVEPNP_UPNP='SOLVEPNP_UPNP',
  SOLVEPNP_AP3P='SOLVEPNP_AP3P',
  SOLVEPNP_IPPE='SOLVEPNP_IPPE',
  SOLVEPNP_IPPE_SQUARE='SOLVEPNP_IPPE_SQUARE'
}