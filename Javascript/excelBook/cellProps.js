let formulaBar = document.querySelector('#formula-bar');

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

let sheetsCont = document.querySelector('.sheets');
let addSheet = document.querySelector('#addSheet');
let sheet1 = document.querySelector('#sheet-1');

let currentActiveSheet = 0;
let storageDB = [];
let currentSheetDB = [];

let storageDBLocalDB = localStorage.getItem("storageDatabase");

if(!storageDBLocalDB){
    storageDB = addNewSheetDB();
    currentSheetDB = storageDB[0];
}else{
    storageDB = JSON.parse(storageDBLocalDB);
    if(storageDB.length>1){
        getAllSheetsLoad();
    }
}
            
clickFirstCell();
implementFeaturesToCells();

function getAllSheetsLoad(){
    sheetsCont.removeChild(sheet1);
    for (let index = 1; index <= storageDB.length; index++) {
        let sheetLink = document.createElement('span');
        sheetLink.setAttribute("class","sheet");
        sheetLink.setAttribute("id",`sheet-${index}`);
        sheetLink.setAttribute("sheet-number",`${index}`);
        sheetLink.innerText = `Sheet-${index}`;
        sheetLink.addEventListener('click',()=>{activeSheet(sheetLink)});
        sheetLink.addEventListener('contextmenu',(e)=>{ 
            e.preventDefault();
            if(confirm('Are really want to delete this sheet!')){
                removeSheet(sheetLink);
            }
        });
        sheetsCont.appendChild(sheetLink);
        if(index==1){
            activeSheet(sheetLink);
        }
    }
}


function updateDatabase(){
    localStorage.setItem("storageDatabase",JSON.stringify(storageDB));
    storageDB = JSON.parse(localStorage.getItem("storageDatabase"));
    return storageDB;
}

function createSheetDB(){
    let sheetDB = []
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
        sheetDB.push(rowDB);
    }
    return sheetDB;
}

function addNewSheetDB(){
    let newSheet = createSheetDB();
    storageDB.push(newSheet);
    return updateDatabase();
}

function clickFirstCell(){
    let firstCell = document.querySelector('.col-cell>input');
    firstCell.focus();
}

function getActiveCellAndProps(address){
    let rowId = Number(address.slice(1))-1;
    let colId = Number(address.charCodeAt(0))-65;
    let cell = document.querySelector(`input[rowId="${rowId}"][colId="${colId}"]`)
    let cellProps = currentSheetDB[rowId][colId];
    return [cell,cellProps];
}

function activeCellOperation(address){
    let [cell,cellProps] = getActiveCellAndProps(address);
    cell.value = (cellProps.text);
    cell.style.fontWeight = (cellProps.bold) ? "bold" : "normal";
    cell.style.fontStyle = (cellProps.italic) ? "italic" : "normal";
    cell.style.textDecoration = (cellProps.underline) ? "underline" : "none";
    cell.style.fontSize = (cellProps.fontSize)+"px";
    cell.style.color = (cellProps.fontColor);
    cell.style.backgroundColor = (cellProps.bgColor);
    switch (cellProps.alignment) {
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
    switch (cellProps.fontFamily) {
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

function textEditor(text,address){
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.text = text;
}

function changeActivityBtn(address){
    let [cell,cellProps] = getActiveCellAndProps(address);
    boldSelector.style.backgroundColor = (cellProps.bold) ? activeBgColor : inActiveBgColor;
    italicSelector.style.backgroundColor = (cellProps.italic) ? activeBgColor : inActiveBgColor;
    underlineSelector.style.backgroundColor = (cellProps.underline) ? activeBgColor : inActiveBgColor;
    switch (cellProps.fontFamily){
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
    switch (cellProps.fontSize.toString()){
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
    switch (cellProps.alignment) {
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
    textColor.parentNode.style.color = (cellProps.fontColor=="transparent")?"black":cellProps.fontColor;
    bgColor.parentNode.style.color = (cellProps.bgColor=="transparent")?"black":cellProps.bgColor;
    formulaBar.value = (cellProps.formula);
}

function implementFeaturesToCells(){
    let cells = document.querySelectorAll('.col-cell>input');
    cells.forEach((cell)=>{
        cell.addEventListener('input',(e)=>{      
            let address = addressBar.value;
            let text = e.target.value;
            textEditor(text,address);
            updateChildren(address);
            activeCellOperation(address);
        });
        cell.addEventListener('focus',(e)=>{
            let address = addressBar.value;
            changeActivityBtn(address);
        });
    });
}

function createSheetUI(promptText){
    let sheets = document.querySelectorAll('.sheets>span');
    let newSheet = document.createElement('span');
    newSheet.setAttribute("id",`sheet-${Number(sheets[sheets.length-1].getAttribute("sheet-number"))+1}`);
    newSheet.setAttribute("sheet-number",`${Number(sheets[sheets.length-1].getAttribute("sheet-number"))+1}`);
    newSheet.setAttribute("class","sheet");
    newSheet.innerText = promptText.replaceAll(" ","");
    newSheet.addEventListener('click',()=>{activeSheet(newSheet)});
    newSheet.addEventListener('contextmenu',(e)=>{ 
        e.preventDefault();
        if(confirm('Are really want to delete this sheet!')){
            removeSheet(newSheet)
        }
    });
    sheetsCont.appendChild(newSheet);
    activeSheet(newSheet);
}

function activeSheet(sheet){
    currentActiveSheet = Number(sheet.getAttribute("sheet-number"))-1;
    currentSheetDB = storageDB[currentActiveSheet];
    removeActiveSheet();
    sheet.classList.add("sheet-active");
    reloadSheet();
}

function removeActiveSheet(){
    let sheets = document.querySelectorAll('.sheets>span');
    sheets.forEach((sheet)=>{
        if(sheet.classList.contains("sheet-active")){
            sheet.classList.remove("sheet-active")
        }
    }); 
}

function removeSheet(sheet){
    if(sheet.classList.contains('sheet-active')){
        if(sheet.nextElementSibling){
            activeSheet(sheet.nextElementSibling);
            sheetsCont.removeChild(sheet);  
        }else{
            if(sheet.previousElementSibling){
                activeSheet(sheet.previousElementSibling);
                sheetsCont.removeChild(sheet);
            }else{
                alert("Atleast One Sheet Required!");
            }
        }
    }else{
        sheetsCont.removeChild(sheet);
    }
}

function reloadSheet(){
    let cells = document.querySelectorAll('.col-cell>input');
    cells.forEach((cell)=>{
        let rowId = Number(cell.getAttribute("rowId"));
        let colId = Number(cell.getAttribute("colId"));
        let address = String.fromCharCode(Number(65 + colId)).toUpperCase() + (rowId + 1);
        activeCellOperation(address);
    });
}

boldSelector.addEventListener('click',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.bold = !cellProps.bold;
    activeCellOperation(address);
    changeActivityBtn(address);
});

italicSelector.addEventListener('click',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.italic = !cellProps.italic
    activeCellOperation(address);
    changeActivityBtn(address);
});

underlineSelector.addEventListener('click',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.underline = !cellProps.underline
    activeCellOperation(address);
    changeActivityBtn(address);
});

leftAlign.addEventListener('click',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.alignment = "left";
    activeCellOperation(address);
    changeActivityBtn(address);
});

justifyAlign.addEventListener('click',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.alignment = "center";
    activeCellOperation(address);
    changeActivityBtn(address);
});

rightAlign.addEventListener('click',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.alignment = "right";
    activeCellOperation(address);
    changeActivityBtn(address);
});

fontColorSelector.addEventListener('input',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.fontColor = e.target.value;
    activeCellOperation(address);
    changeActivityBtn(address);
});

bgColorSelector.addEventListener('input',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.bgColor = e.target.value;
    activeCellOperation(address);
    changeActivityBtn(address);
});

fontSizeSelector.addEventListener('input',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.fontSize = e.target.value;
    activeCellOperation(address);
    changeActivityBtn(address);
});

fontFamilySelector.addEventListener('input',(e)=>{
    let address = addressBar.value;
    let [cell,cellProps] = getActiveCellAndProps(address);
    cellProps.fontFamily = e.target.value;
    activeCellOperation(address);
    changeActivityBtn(address);
});

addSheet.addEventListener('click',()=>{
    let promptText = prompt("Enter Sheet Name..");
    if(promptText){
        let sheets = document.querySelectorAll('.sheets>span');
        let lastSheet = sheets[sheets.length-1];
        let currentSheet = Number(lastSheet.getAttribute("sheet-number"));
        currentSheetDB = addNewSheetDB()[currentSheet];
        createSheetUI(promptText);
        clickFirstCell();
    }
});

sheet1.addEventListener('click',()=>{activeSheet(sheet1)});
sheet1.addEventListener('contextmenu',(e)=>{ 
    e.preventDefault();
    if(confirm('Are really want to delete this sheet!')){
        removeSheet(sheet1);
    }
});

let cells = document.querySelectorAll('.col-cell>input');
cells.forEach((cell)=>{
    cell.addEventListener('blur',()=>{
        storageDB[currentActiveSheet] = currentSheetDB;
        storageDB = updateDatabase();
        // console.log(storageDB);
        // console.log(currentActiveSheet);
    });
})