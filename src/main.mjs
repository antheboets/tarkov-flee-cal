import logic from './../logic.mjs'
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



//const data =[{name:"abc"},{name:"aaa"},{name:"cde"},{name:"abb"}];

//const ul = document.getElementById("itemUl");
/*
const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

/*
const fuzzySearch = (text)=>{
    let foundData = [];
    for(let i = 0; i < data.length;i++){
        if(data[i].name.toLowerCase().includes(text.toLowerCase())){
            foundData.push(data[i]);
        }
    }
    return foundData;
}

const search = (e,text) =>{
    const resultData = fuzzySearch(text);
    removeChilds(document.getElementById("itemUl"));
    for(let i = 0; i < resultData.length;i++){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(resultData[i].name));
        li.onclick = (e) => {itemSelect(e,resultData[i])};
        ul.appendChild(li);
    }
};
*/
/*
const itemSelect = (e,item) =>{
    console.log(item);
}
*/


//document.getElementById("itemInput").addEventListener("input",(e)=>{search(e,document.getElementById("itemInput").value)});