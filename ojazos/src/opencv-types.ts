export interface CV extends CV_WASM {
  
  getBuildInformation(): any;
  
}
interface CV_WASM {
  
  // WASM
  exceptionFromPtr(err: number): any;
  onRuntimeInitialized: () => void;
}