const path = require('path')

//getting the args
const argv = process.argv.slice(2)
const args = {}

//putting args in a key value pair
let foundEnv  = false
for(let i = 0; i < argv.length; i++){
    if(foundEnv){
        let keyValuePair = argv[i].split('=')
        args[keyValuePair[0]] = keyValuePair[1]
    }
    if(argv[i] === "--env" && !foundEnv){
        foundEnv = true
    }
}

//mode of code optimization development/production/none
let mode = ""
switch(args.optimazation){
    case "dev":
        mode = "development"
    break
    case "prod":
        mode = "production"
    break
    case "none":
        mode = "none"
    break
    default:
        mode = "production"
    break
}
//printing optimazation mode
console.log(`The optimazation mode: ${mode}`)
//exporting module
module.exports = {
    entry: "./src/main.mjs",
    name: "index",
    mode: mode,
    output:{
        filename: "index.js",
        path: path.resolve(__dirname,"dist/.")
    }
}