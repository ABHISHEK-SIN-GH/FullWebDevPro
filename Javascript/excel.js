import fs from "fs";
import xlsx from "xlsx";

// const buffer = fs.readFileSync("./data.json");
// let jsonData = JSON.parse(buffer);

// // jsonData.push({
// //     "name":"Rapu",
// //     "age":28,
// //     "sex":"male"
// // });

// // const stringData = JSON.stringify(jsonData);
// // fs.writeFileSync('data.json',stringData);
// let newWB = xlsx.utils.book_new();
// let newWS = xlsx.utils.json_to_sheet(jsonData);
// xlsx.utils.book_append_sheet(newWB,newWS,'sheet-1');
// xlsx.writeFile(newWB,"JSN.xlsx");

// let wb = xlsx.readFile("JSN.xlsx");
// let excelData = wb.Sheets["sheet-1"];
let wb = xlsx.readFile("FD.xlsx");
let excelData = wb.Sheets["order_items"];
let jsonData = xlsx.utils.sheet_to_json(excelData);
console.log(jsonData);
fs.writeFileSync('flipzonData.json',JSON.stringify(jsonData));