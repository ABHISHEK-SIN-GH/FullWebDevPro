let formulaBar = document.querySelector('#formula-bar');
let cells = document.querySelectorAll('.col-cell>input');
let copySelector = document.querySelector(".copySelector");
let cutSelector = document.querySelector(".cutSelector");
let pasteSelector = document.querySelector(".pasteSelector");
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

let activeBgColor = "green";
let inActiveBgColor = "transparent";

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
                bgColor:"transparent",
                formula:"",
                children:[]
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
        let address = addressBar.value;
        rowId = Number(address.slice(1))-1;
        colId = Number(address.charCodeAt(0))-65;
        cellCont = cell; 
        updateChildren(address);
        textEditor(e.target.value);
        activeCellOperation(cell,rowId,colId);
    });
    cell.addEventListener('focus',(e)=>{
        let address = addressBar.value;
        rowId = Number(address.slice(1))-1;
        colId = Number(address.charCodeAt(0))-65;
        cellCont = cell; 
        changeActivityBtn(rowId,colId);
        textEditor(e.target.value);
    });
    let rid = cell.getAttribute("rowId");
    let cid = cell.getAttribute("colId");
    activeCellOperation(cell,rid,cid);
});

function textEditor(text){
    let textVal = text;
    let currVal = storageDB[rowId][colId];
    currVal.text = textVal;
    refreshPage();
}

function activeCellOperation(cell,rowId,colId){
    let currentValues = storageDB[rowId][colId];
    cell.value = (currentValues.text);
    cell.style.fontWeight = (currentValues.bold) ? "bold" : "normal";
    cell.style.fontStyle = (currentValues.italic) ? "italic" : "normal";
    cell.style.textDecoration = (currentValues.underline) ? "underline" : "none";
    cell.style.fontSize = (currentValues.fontSize)+"px";
    cell.style.color = (currentValues.fontColor);
    cell.style.backgroundColor = (currentValues.bgColor);
    switch (currentValues.alignment) {
        case "left":
            cell.style.textAlign = "left";
            break;
        case "center":
            cell.style.textAlign = "center";
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
    // console.log("loading..");
}

function refreshPage(){
    localStorage.setItem("storageDB",JSON.stringify(storageDB));
    let freshData = localStorage.getItem("storageDB");
    storageDB = JSON.parse(freshData);
}

function changeActivityBtn(rid,cid){
    let currVal = storageDB[rid][cid];
    boldSelector.style.backgroundColor = (currVal.bold) ? activeBgColor : inActiveBgColor;
    italicSelector.style.backgroundColor = (currVal.italic) ? activeBgColor : inActiveBgColor;
    underlineSelector.style.backgroundColor = (currVal.underline) ? activeBgColor : inActiveBgColor;
    switch (currVal.fontFamily){
        case "font-1":
            fontFamilySelector.value = "font-1";
            break;
        case "font-2":
            fontFamilySelector.value = "font-2";
            break;
        case "font-3":
            fontFamilySelector.value = "font-3";
            break;
        case "font-4":
            fontFamilySelector.value = "font-4";
            break;
        default:
            break;    
    }
    switch (currVal.fontSize.toString()){
        case "12":
            fontSizeSelector.value = "12";
            break;
        case "14":
            fontSizeSelector.value = "14";
            break;
        case "16":
            fontSizeSelector.value = "16";
            break;
        case "18":
            fontSizeSelector.value = "18";
            break;
        case "20":
            fontSizeSelector.value = "20";
            break;
        default:
            break;    
    }
    switch (currVal.alignment) {
        case "left":
            leftAlign.style.backgroundColor = activeBgColor;
            justifyAlign.style.backgroundColor = inActiveBgColor;
            rightAlign.style.backgroundColor = inActiveBgColor;
            break;
        case "center":
            leftAlign.style.backgroundColor = inActiveBgColor;
            justifyAlign.style.backgroundColor = activeBgColor;
            rightAlign.style.backgroundColor = inActiveBgColor;
            break;
        case "right":
            leftAlign.style.backgroundColor = inActiveBgColor;
            justifyAlign.style.backgroundColor = inActiveBgColor;
            rightAlign.style.backgroundColor = activeBgColor;
            break;
        default:
            break;
    }
    textColor.parentNode.style.color = (currVal.fontColor=="transparent")?"black":currVal.fontColor;
    bgColor.parentNode.style.color = (currVal.bgColor=="transparent")?"black":currVal.bgColor;
    formulaBar.value = (currVal.formula);
}

boldSelector.addEventListener('click',(e)=>{
    boldValue = storageDB[rowId][colId];
    boldValue.bold = !boldValue.bold;
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

italicSelector.addEventListener('click',(e)=>{
    italicValue = storageDB[rowId][colId];
    italicValue.italic = !italicValue.italic;
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

underlineSelector.addEventListener('click',(e)=>{
    ulValue = storageDB[rowId][colId];
    ulValue.underline = !ulValue.underline;
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

leftAlign.addEventListener('click',(e)=>{
    alignValue = storageDB[rowId][colId];
    alignValue.alignment = "left";
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

justifyAlign.addEventListener('click',(e)=>{
    alignValue = storageDB[rowId][colId];
    alignValue.alignment = "center";
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

rightAlign.addEventListener('click',(e)=>{
    alignValue = storageDB[rowId][colId];
    alignValue.alignment = "right";
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

fontColorSelector.addEventListener('input',(e)=>{
    fontColorValue = storageDB[rowId][colId];
    fontColorValue.fontColor = e.target.value;
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

bgColorSelector.addEventListener('input',(e)=>{
    bgColorValue = storageDB[rowId][colId];
    bgColorValue.bgColor = e.target.value;
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

fontSizeSelector.addEventListener('input',(e)=>{
    fontSizeValue = storageDB[rowId][colId];
    fontSizeValue.fontSize = e.target.value;
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

fontFamilySelector.addEventListener('input',(e)=>{
    fontFamilyValue = storageDB[rowId][colId];
    fontFamilyValue.fontFamily = e.target.value;
    activeCellOperation(cellCont,rowId,colId);
    changeActivityBtn(rowId,colId);
    refreshPage();
});

copySelector.addEventListener('click',()=>{
    let copyText = cellCont.value;
    navigator.clipboard.writeText(copyText);
    console.log("Text is Copied!");
});

cutSelector.addEventListener('click',()=>{
    let cutText = cellCont.value;
    cellCont.value = "";
    navigator.clipboard.writeText(cutText);
    console.log("Text is Cut!");
    textEditor("");
});

pasteSelector.addEventListener('click',async()=>{
    let text = await navigator.clipboard.readText();
    let fullText = cellCont.value + " " + text;
    cellCont.value = fullText.trim();
    console.log("Text is pasted!");
    textEditor(cellCont.value.toString());
});

function getActiveCellAndProps(address){
    let rowId = Number(address.slice(1))-1;
    let colId = Number(address.charCodeAt(0))-65;
    let cell = document.querySelector(`input[rowId="${rowId}"][colId="${colId}"]`)
    let cellProps = storageDB[rowId][colId];
    return [cell,cellProps];
}

let firstCell = document.querySelector('.col-cell>input');
firstCell.focus();