Command line tool to invoke high level opencv operations and effects 

 * uses mirada opencv.js API
 * uses magica (ImageMagick wasm port) to handle input and output formats

## install

npm install -g mirada-cli


## Usage

YBD


## We want:




Initial ideas:

```sh 
# execute two commands given as JS literal object (notice the file named tmp.mat)
ojos "name:'grabCut', in:'../imgs/foo.png', rect:'{x:100,y:90,w:79,h:80}', out:'tmp.mat'" \\
     "name:'toRgba', in:'tmp.mat', out:'out/foo.gif'"

# execute commands defined in file removeBg17.json.ejs evaluated as a template with context given in --variables
ojos --commands removeBg17.json.ejs \\
     --variables "bg:'#ffeeee', replaceWith:'rgba(222,122,211,128)'"

# Same as before but variables read from stdin and commands file fetched from url
cat vars.json | ojos --commands https://app.com/imgproc/features/people22

# daemon mode
mkpipe ./tmp/pipe1
ojos --listen ./tmp/pipe1 

# in another terminal, listen for output - after a sequence of commands ends it writes info about the output:
cat someCommands.json > ./tmp/pipe1

# in another terminal / user commands can be written as json:
cat someCommands.json > ./tmp/pipe1

```

## TODO

- [ ] mirada my-config.json
- [ ] mirada my-config.js  module.exports = {x:10,y:20,width:120,height:100,format:'jpg'}
- [ ] mirada "command:'grab-cut',x:10,y:20,width:120,height:100,format:'jpg',output:'outFolder',input:'imgs/*raw.webp'"
- [ ] interactive:
   * calling without arguments will inquire the user for everything, starting with mandatory args like command and input, then command mandatory args, and last optional arguments like output, format, etc. When all mandatory args are filled,the user is able to skip the optional args inquiry and execute the operation with default values for them.
   * If calling with some arguments but some mandatory args are not provided it will ask for those, and then ask for optionals. When all mandatory args are filled,the user is able to skip the optional args inquiry and execute the operation with default values for them.



## Old ideas - obsolete

### usage

If --output is given and there is only one output file it will write it in a file named --output:
mirada --command grab-cut --x 10 --y 20 --width 123 --height 100 --format gif --output ../img_nobg.gif --input ../img.png

If --output is given and there are multiple output files it will write output files in folder --output creating it if necessary:
mirada --command grab-cut --x 10 --y 20 --width 123 --height 100 --format gif --output outfolder --input "imgs/*raw.webp"

If --replace is given then it will replace input files :
mirada --command grab-cut --x 10 --y 20 --width 123 --height 100 --replace "imgs/*raw.webp"

If no --output given it will create new files with same name and a suffix at the same input file location:
mirada --command grab-cut --x 10 --y 20 --width 123 --height 100 --format png  "imgs/*raw.webp"
