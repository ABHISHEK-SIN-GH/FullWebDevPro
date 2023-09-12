let rowBar = document.querySelector('.row-bar');
let colAddress = document.querySelector('.col-address');
let colBar = document.querySelector('.col-bar');
let addressBar = document.querySelector('#address-bar');
let textColor = document.querySelector('.text-font-color');
let bgColor = document.querySelector('.bg-font-color');

let numRows = 99;
let numCols = 26;

textColor.addEventListener('input',(e)=>{
    textColor.parentNode.style.color = e.target.value;
});

bgColor.addEventListener('input',(e)=>{
    bgColor.parentNode.style.color = e.target.value;
});

for(let i=0;i<numRows;i++){
    let rowCell = document.createElement('div');
    rowCell.setAttribute("class","row-cell");
    rowCell.innerHTML = i+1;
    rowBar.appendChild(rowCell);
}

for(let i=0;i<numCols;i++){
    let colCell = document.createElement('div');
    colCell.setAttribute("class","col-cell");
    colCell.innerHTML = String.fromCharCode(65+i);
    colAddress.appendChild(colCell);
}

for(let i=0;i<numRows;i++){
    let rowCell = document.createElement('div');
    rowCell.setAttribute("class","col-cells");
    for(let j=0;j<numCols;j++){
        let colCell = document.createElement('div');
        colCell.setAttribute("class","col-cell");
        colCell.innerHTML = `<input type="text" spellcheck="false" rowId='${i}' colId='${j}'>`;
        rowCell.appendChild(colCell);
        addressSelector(colCell,i,j);
    }
    colBar.appendChild(rowCell);
}

function addressSelector(cell,i,j){
    let inputs = cell.children;
    let input = inputs[0];
    input.addEventListener('click',(e)=>{
        addressBar.value = (String.fromCharCode(65+j).toUpperCase() + (i+1));
    });
}

let firstCell = document.querySelector('.col-cell>input');
firstCell.click();