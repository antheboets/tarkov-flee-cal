const path = require('path')
const fs = require('fs').promises
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

async function readJsonAsync(path){
    return JSON.parse(await fs.readFile(`./${path}.json`, 'utf8'))
}

async function writeJsonAsync(filename,data){
    await fs.writeFile(`${filename}.json`,JSON.stringify(data,null,3), function () {})
}

const preBundel = async ()=>{
    let buildSettings = await readJsonAsync("./dist/build")
    buildSettings.buildNr++
    await writeJsonAsync("./dist/build",buildSettings)
}

preBundel()

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