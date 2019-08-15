a proposal to opencv.js team to add the npm experience:
 * npm install opencv.js
 * the same user files should work both in browser and node.js
 * TypeScript typings

Later: 
 * CLI
 * scripts to generate wasm build  with different configs. 
 * custom wasm build - more optimized - .wasm instead of .s

# Short term obj
 * implmement style transfer as https://github.com/opencv/opencv/pull/15240/files
 
 Notes

 git clone https://github.com/opencv/opencv.git
cd opencv
docker run --rm --workdir /code -v "$PWD":/code "trzeci/emscripten:latest" python ./platforms/js/build_js.py