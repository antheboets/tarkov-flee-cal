const fs = require('fs').promises

async function readJsonAsync(path){
    return JSON.parse(await fs.readFile(`./${path}.json`, 'utf8'))
}

async function writeJsonAsync(filename,data){
    await fs.writeFile(`${filename}.json`,JSON.stringify(data,null,3), function () {})
}

async function main (){
    const data = await readJsonAsync("data")
    const newData = []
    data.map((item)=>{
        newData.push({name:item.name,shortName:item.shortName,value:item.basePrice})
    })
    await writeJsonAsync("newData",newData)
}

main()