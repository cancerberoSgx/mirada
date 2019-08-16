import { cli } from './cli'
// console.log(process.argv.slice(2));

const options = require('minimist')(process.argv.slice(2))
cli(options)
