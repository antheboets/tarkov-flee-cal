import logic from '../lib/logic.mjs'
import Fuse from 'fuse.js'
import Chart from 'chart.js/auto'

let skill = 0
let intel = 0
let currentItem = {name:"",shortName:"",data:[],bestPrice:0,bestPriceFee:0,bestPriceProfite:0}
let itCount = 1000000

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild)
    }
}

const updateItem = (item) =>{
    console.log("updating selected items")
    currentItem.data.length = 0
    currentItem.name = item.name
    currentItem.shortName = item.shortName
    currentItem.bestPrice = 0
    currentItem.bestPriceFee = 0
    currentItem.bestPriceProfite = 0
    let fee = 0
    for(let i = 1; i <= itCount;i++){
        fee = logic(intel,skill,item.value,i)
        currentItem.data.push({price:i,fee:fee})
        if(currentItem.bestPriceProfite <= i - fee){
            currentItem.bestPrice = i
            currentItem.bestPriceFee = fee
            currentItem.bestPriceProfite = i - fee
        }
    }
    console.log(currentItem)
    //rest chart
}

const clickLi = (e,item) =>{
    e.preventDefault()
    if(currentItem.name !== item.name && currentItem.shortName !== item.shortName){
        updateItem(item)
    }
}

const createItem = (item) => {
    const li = document.createElement("LI")
    //console.log(item)
    li.appendChild(document.createTextNode(item.item.name))
    li.addEventListener("click",(e)=>{clickLi(e,item.item)})
    document.getElementById("itemUl").appendChild(li)
}

window.addEventListener("load",async ()=>{
    const data = await (await fetch("./data.json")).json()
    const fuse = new Fuse(data,{includeScore:true,keys:["name","shortName"]})
    document.getElementById("itemInput").addEventListener("input",(e)=>{
        e.preventDefault()
        removeChilds(document.getElementById("itemUl"))
        const result = fuse.search(document.getElementById("itemInput").value).filter((item)=>{return item.score < 0.01})
        result.sort((a,b)=>{return b-a})
        result.forEach((item)=>{
            createItem(item)
        })
    })
    document.getElementById("skillLevelInput").value = skill
    document.getElementById("skillLevelInput").addEventListener("input",(e)=>{
        e.preventDefault()
        skill = document.getElementById("skillLevelInput").value
    })
    document.getElementById("IntelInput").value = intel
    document.getElementById("IntelInput").addEventListener("input",(e)=>{
        e.preventDefault()
        intel = document.getElementById("IntelInput").value
    })
    /*
    let test = document.createTextNode((await(await fetch("./build.json")).json()).buildNr)
    document.getElementById("buildNr").appendChild(test)
    */
    document.getElementById("buildNr").appendChild(document.createTextNode((await(await fetch("./build.json")).json()).buildNr))
})