## mirada

OpenCv JavaScript/TypeScript API for Node.js and Browser on top of OpenCv.js, adding support for npm, TypeScript and utilities related to asynchronicity, DOM, etc.

See [sub project](mirada) for details, docs, demos, etc.





<!-- 
> Could you please add some usage example (tutorial code) how to use this patch?

In the browser unlikely due to the fact that cv.imread() method is overrided to read from DOM canvas and not FS. 

The example I have now is on node.js where I need FS to:

1 ) 
 helpers.js pollutes the open.js build overriding cv.imread() method


 I'm working on what for me would be an ideal opencv.js npm package here https://github.com/cancerberoSgx/mirada/. The idea is to use the official opencv.js wasm build files, support node.js and the browser with the same API which should be small, ideally only a thin layer with almost no implementation at all that directly represent vc.* methods. Probably some separate modules to easy image format handling and JS / asynchronous syntax sugar. The hard work and most important would be to provide TypeScript typings matching this API hopefully directly / mechanically ported from doxygen apidocs (working on that) . Also some tests . But keep the implementation minimal and agnostic on any library/technology -->