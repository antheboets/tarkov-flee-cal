import logic from '../lib/logic.mjs'
import Fuse from 'fuse.js'
import Chart from 'chart.js/auto'

let skill = 0
let intel = 0
let currentItem = {name:"",shortName:"",data:[],bestPrice:0}
let itCount = 1000000

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild)
    }
}

const updateItem = (item) =>{
    currentItem.data.length = 0
    currentItem.name = item.name
    currentItem.shortName = item.shortName
    for(let i = 0; i < itCount;i++){
        currentItem.data.push({price:i,fee:logic(intel,skill,{BaseValue:item.value},i)})
    }
    //cal best price
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
    li.appendChild(document.createTextNode(item.name))
    li.addEventListener("click",(e)=>{clickLi(e,item)})
    document.getElementById("itemUl").appendChild(li)
}

window.addEventListener("load",async ()=>{
    const data = await (await fetch("./data.json")).json()
    const fuse = new Fuse(data,{includeScore:true,keys:[]})
    document.getElementById("itemInput").addEventListener("input",(e)=>{
        e.preventDefault()
        removeChilds(document.getElementById("itemUl"))
        const result = fuse.search(document.getElementById("itemInput").value)
        console.log(result)
        result.forEach((item)=>{
            createItem(item)
        })
    })
    document.getElementById("skillLevelInput").addEventListener("input",(e)=>{
        e.preventDefault()
        skill = document.getElementById("skillLevelInput").value
    })
    document.getElementById("IntelInput").addEventListener("input",(e)=>{
        e.preventDefault()
        intel = document.getElementById("IntelInput").value
    })
})