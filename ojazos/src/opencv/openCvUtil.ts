import  {CV} from '../opencv-types'

declare var cv:CV

export class Util {
  
  protected errorOutput:HTMLElement|undefined
  protected OPENCV_URL:string

  public constructor(o:Options) {
    this.errorOutput = o.errorOutputId ? document.getElementById(o.errorOutputId)||undefined : undefined
    this.OPENCV_URL = o.OPENCV_URL||'opencv.js'
  }

  public loadOpenCv(onloadCallback:(...args:any[])=>void) {
    let script = document.createElement('script')!
    script.setAttribute('async', '');
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', () => {
        if (typeof cv.getBuildInformation!=='undefined')
        {
            console.log(cv.getBuildInformation());
            onloadCallback();
        }
        else
        {
            // WASM
            cv.onRuntimeInitialized=()=>{
                console.log(cv.getBuildInformation());
                onloadCallback();
            }
        }
    });
    script.addEventListener('error', () => {
        this.printError('Failed to load ' + this.OPENCV_URL);
    });
    script.src = this.OPENCV_URL;
    let node = document.getElementsByTagName('script')[0];
    node.parentNode!.insertBefore(script, node);
}

public    clearError() {
if(this.errorOutput){
  this.errorOutput.innerHTML = '';
}
  };

public printError(err?:string|number|Error) {
        if (typeof err === 'undefined') {
            err = '';
        } else if (typeof err === 'number') {
            if (!isNaN(err)) {
                if (typeof cv !== 'undefined') {
                    err = 'Exception: ' + cv.exceptionFromPtr(err).msg;
                }
            }
        } else if (typeof err === 'string') {
            let ptr = Number(err.split(' ')[0]);
            if (!isNaN(ptr)) {
                if (typeof cv !== 'undefined') {
                    err = 'Exception: ' + cv.exceptionFromPtr(ptr).msg;
                }
            }
        } else if (err instanceof Error) {
            err = (err.stack||'').replace(/\n/g, '<br>');
        }
        if(this.errorOutput){
          this.errorOutput.innerHTML = err+'';
        }
        else {
          console.error(err);
          
        }
    };


}

interface Options {
  errorOutputId?:string
  OPENCV_URL?:string
}