## black-eyes

High performance server for image processing using mirada-ojos (opencv) and magica (ImageMagick). 

 * Node.s server app able to runs both as http or unix socket
 * supports generic filesystem API to reference files
 * a common common API for both [ojos]() (opencv) and [magica]() (ImageMagick) w(ebassembly ports)
 * operation composition script-like language
 * template support.
 * API signatures, validation and documentation automatically generated from types
 * uses msgpack for data-serialization
 * timings, cpu and memory usage monitoring.

## Motivation

These two wasm ports are acceptably fast and low oevrheaded with the exception of initial startup time. Since in CLI apps this needs to happen each time it has huge impact. The idea is for me to take the oportunity to learn / implement background like server which that handle commands from other thin clients (other CLIs or web pages) . Since th the libraries don't need to reload on each command will give me the opportuninty to run commands faster, and better measure performance.

## install

npm install -g black-eyes


## Usage

YBD

 
## TODO

- [ ] serialization async using streams
- [ ] solution to overcome msgpack size limitation 2^32 = 1024 bytes for images
- [ ] server connection clean up
- [ ] server cluster
- [ ] other FS impl - like google driver for fb 
- [ ] a known global medium for identifying where the server is listening on this machine
- [ ] generate manual from oos metadata
- [ ] generate JSON schema form ojos metadata
- [ ] sample web page client and sample CLI client


[] -- idea - deskktop app node-gui - webview . navegate internate with warp perspective and others! - implement try bar https://github.com/yue/wey/blob/master/lib/view/notification-center.js