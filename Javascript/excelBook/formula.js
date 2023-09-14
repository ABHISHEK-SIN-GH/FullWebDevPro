formulaBar.addEventListener('keydown',(e)=>{
    let inputFormula = e.target.value;
    if(e.key=="Enter" && inputFormula){
        let address = addressBar.value;
        let [cell,cellProps] = getActiveCellAndProps(address);
        if(inputFormula==cellProps.formula) return;
        removeChildFromParent(cellProps.formula);
        addChildrenToParent(inputFormula);
        let evaluatedValue = evaluateFormula(inputFormula);
        cell.value = evaluatedValue;
        cellProps.text = evaluatedValue;
        cellProps.formula = inputFormula;
        activeCellOperation(address);
    }
});

function evaluateFormula(formula){
    let encodedFormula = formula;
    let decodedFormula = decodeFormula(encodedFormula);
    return eval(decodedFormula);
}

function decodeFormula(formula){
    let formulaElements = formula.split(" ");
    let decodedFormulaElements = [];
    formulaElements.forEach((element)=>{
        if(element.charCodeAt(0) >= 65 && element.charCodeAt(0)<= 90) {
            let [cell,cellProps] = getActiveCellAndProps(element);
            element = cell.value;
        }
        decodedFormulaElements.push(element);
    });
    let decodeFormulaNew = decodedFormulaElements.join(" ");
    return decodeFormulaNew;
}

function addChildrenToParent(formula){
    let formulaElements = formula.split(" ");
    formulaElements.forEach((element)=>{
        if(element.charCodeAt(0) >= 65 && element.charCodeAt(0)<= 90) {
            let [parentCell,parentCellProps] = getActiveCellAndProps(element);
            parentCellProps.children.push(addressBar.value);
        }
    });
}

function removeChildFromParent(formula){
    let formulaElements = formula.split(" ");
    formulaElements.forEach((element)=>{
        if(element.charCodeAt(0) >= 65 && element.charCodeAt(0)<= 90) {
            let [parentCell,parentCellProps] = getActiveCellAndProps(element);
            parentCellProps.children.splice(parentCellProps.children.indexOf(addressBar.value),1);
        }
    });
}

function updateChildren(address){
    let [parentCell,parentCellProps] = getActiveCellAndProps(address);
    parentCellProps.children.forEach((children)=>{
        let [childCell,childCellProps] = getActiveCellAndProps(children);
        childCell.value = evaluateFormula(childCellProps.formula);
        childCellProps.text = childCell.value;
        updateChildren(children); 
    })
}