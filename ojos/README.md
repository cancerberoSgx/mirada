Command line tool to invoke high level opencv operations and effects 

 * uses ojazos opencv.js API
 * uses magica (ImageMagick wasm port) to handle input and output formats

## install

npm install -g ojos

## usage

If --output is given and there is only one output file it will write it in a file named --output:
ojos --command grab-cut --x 10 --y 20 --width 123 --height 100 --format gif --output ../img_nobg.gif --input ../img.png

If --output is given and there are multiple output files it will write output files in folder --output creating it if neccesary:
ojos --command grab-cut --x 10 --y 20 --width 123 --height 100 --format gif --output outfolder --input "imgs/*raw.webp"

If --replace is given then it will replace input files :
ojos --command grab-cut --x 10 --y 20 --width 123 --height 100 --replace "imgs/*raw.webp"

If no --output given it will create new files with same name and a suffix at the same input file location:
ojos --command grab-cut --x 10 --y 20 --width 123 --height 100 --format png  "imgs/*raw.webp"

## TODO
- [ ] ojos my-config.json
- [ ] ojos my-config.js  module.exports = {x:10,y:20,width:120,height:100,format:'jpg'}
- [ ] ojos "command:'grab-cut',x:10,y:20,width:120,height:100,format:'jpg',output:'outFolder',input:'imgs/*raw.webp'"
- [ ] interactive:
   * calling without arguments will inquire the user for everything, starting with mandatory args like command and input, then command mandatory args, and last optional arguments like output, format, etc. When all mandatory args are filled,the user is able to skip the optional args inquiry and execute the operation with default values for them.
   * If calling with some arguments but some mandatory args are not provided it will ask for those, and then ask for optionals. When all mandatory args are filled,the user is able to skip the optional args inquiry and execute the operation with default values for them.
