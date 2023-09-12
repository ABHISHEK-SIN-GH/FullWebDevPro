let addressBarVal = document.querySelector('#address-bar');
let cells = document.querySelectorAll('.col-cell>input');

let boldSelector = document.querySelector(".boldSelector");
let italicSelector = document.querySelector(".italicSelector");
let underlineSelector = document.querySelector(".underlineSelector");
let alignSelector = document.querySelectorAll(".alignmentSelector");
let fontSizeSelector = document.querySelector(".fontSizeSelector");
let fontFamilySelector = document.querySelector(".fontFamilySelector");
let fontColorSelector = document.querySelector(".fontColorSelector").nextElementSibling;
let bgColorSelector = document.querySelector(".bgColorSelector").nextElementSibling;
let leftAlign = alignSelector[0];
let justifyAlign = alignSelector[1];
let rightAlign = alignSelector[2];

let rowId = 0;
let colId = 0;
let cellCont = "";
let storageDB = [];

let storageDBLocalDB = localStorage.getItem("storageDB");
if(!storageDBLocalDB){
    storageDB = []; 
    for (let i = 0; i < numRows; i++) {
        let rowDB = [];
        for(let j = 0; j < numCols; j++){
            let cellProp = {
                text:"",
                bold:false,
                italic:false,
                underline:false,
                alignment:"left",
                fontFamily:"font-1",
                fontSize:12,
                fontColor:"black",
                bgColor:"transparent"
            }
            rowDB.push(cellProp);
        }
        storageDB.push(rowDB);
        localStorage.setItem("storageDB",JSON.stringify(storageDB));
    }
}else{
    storageDB = JSON.parse(storageDBLocalDB);
}

cells.forEach((cell)=>{
    cell.addEventListener('input',(e)=>{      
        let address = addressBarVal.value;
        rowId = Number(address.slice(1))-1;
        colId = Number(address.charCodeAt(0))-65;
        cellCont = cell; 
        textEditor(e);
        activeCellOperation(cell,rowId,colId);
    });
    cell.addEventListener('focus',(e)=>{
        let address = addressBarVal.value;
        rowId = Number(address.slice(1))-1;
        colId = Number(address.charCodeAt(0))-65;
        cellCont = cell; 
        textEditor(e);
        // console.log(rowId,colId);
    });
    let rid = cell.getAttribute("rowId");
    let cid = cell.getAttribute("colId");
    activeCellOperation(cell,rid,cid);
});

function textEditor(e){
    let textVal = e.target.value;
    let currVal = storageDB[rowId][colId];
    currVal.text = textVal;
    refreshPage();
}

function activeCellOperation(cell,rowId,colId){
    let currentValues = storageDB[rowId][colId];
    cell.value = (currentValues.text);
    cell.style.fontWeight = (currentValues.bold) ? "bold" : "normal";
    cell.style.fontStyle = (currentValues.italic) ? "italic" : "none";
    cell.style.textDecoration = (currentValues.underline) ? "underline" : "none";
    cell.style.fontSize = (currentValues.fontSize)+"px";
    cell.style.color = (currentValues.fontColor);
    cell.style.backgroundColor = (currentValues.bgColor);
    switch (currentValues.alignment) {
        case "left":
            cell.style.textAlign = "left";
            break;
        case "justify":
            cell.style.textAlign = "justify";
            break;
        case "right":
            cell.style.textAlign = "right";
            break;
        default:
            break;
    }
    switch (currentValues.fontFamily) {
        case "font-1":
            cell.style.fontFamily = "'Courier New', Courier, monospace";
            break;
        case "font-2":
            cell.style.fontFamily = "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif";
            break;
        case "font-3":
            cell.style.fontFamily = "'Times New Roman', Times, serif";
            break;
        case "font-4":
            cell.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            break;
        default:
            break;
    }
}

function refreshPage(){
    localStorage.setItem("storageDB",JSON.stringify(storageDB));
    let freshData = localStorage.getItem("storageDB");
    storageDB = JSON.parse(freshData);
}

boldSelector.addEventListener('click',(e)=>{
    boldValue = storageDB[rowId][colId];
    boldValue.bold = !boldValue.bold;
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

italicSelector.addEventListener('click',(e)=>{
    italicValue = storageDB[rowId][colId];
    italicValue.italic = !italicValue.italic;
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

underlineSelector.addEventListener('click',(e)=>{
    ulValue = storageDB[rowId][colId];
    ulValue.underline = !ulValue.underline;
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

leftAlign.addEventListener('click',(e)=>{
    alignValue = storageDB[rowId][colId];
    alignValue.alignment = "left";
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

justifyAlign.addEventListener('click',(e)=>{
    alignValue = storageDB[rowId][colId];
    alignValue.alignment = "justify";
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

rightAlign.addEventListener('click',(e)=>{
    alignValue = storageDB[rowId][colId];
    alignValue.alignment = "right";
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

fontColorSelector.addEventListener('input',(e)=>{
    fontColorValue = storageDB[rowId][colId];
    fontColorValue.fontColor = e.target.value;
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

bgColorSelector.addEventListener('input',(e)=>{
    bgColorValue = storageDB[rowId][colId];
    bgColorValue.bgColor = e.target.value;
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

fontSizeSelector.addEventListener('input',(e)=>{
    fontSizeValue = storageDB[rowId][colId];
    fontSizeValue.fontSize = e.target.value;
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});

fontFamilySelector.addEventListener('input',(e)=>{
    fontFamilyValue = storageDB[rowId][colId];
    fontFamilyValue.fontFamily = e.target.value;
    activeCellOperation(cellCont,rowId,colId);
    refreshPage();
});