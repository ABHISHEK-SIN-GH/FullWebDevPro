#!/usr/bin/env node

import chalk from "chalk";
import utility from "./utility.js";
import fs, { existsSync } from "fs";
import path, { dirname } from "path";

// console.log(utility.types);

let inputArr = process.argv.slice(2);
// console.log(inputArr);

// --help
// node fileSysOrganizer.js tree "directoryPath"
// node fileSysOrganizer.js organize "directoryPath"
// node fileSysOrganizer.js help

switch(inputArr[0]){
    case "tree":
        // console.log("tree structure");
        treeFn(inputArr[1]);
        break;
    case "organize":
        // console.log("folder organizing");
        organizeFn(inputArr[1]);
        break;
    case "help":
        // console.log("--help");
        helpFn();
        break;
    default:
        console.log(chalk.red("something went wrong! passed args null or might be wrong for more info '-- node fileSysOrganizer.js help --'"));
        break;            
}

function treeFn(dirPath){
    if(dirPath==undefined){
        console.log("Kindly enter the path");
    }else{
        if(fs.existsSync(dirPath)){
            treeHelper(dirPath,"");
        }else{
            console.log("Kindly enter the correct path");
            return;
        }
    }
}

function treeHelper(dirPath,indent){
    if(fs.lstatSync(dirPath).isFile()){
        let fileName = path.basename(dirPath);
        console.log(chalk.green(indent+"├──"+fileName));
    }else{
        let dirname = path.basename(dirPath);
        console.log(chalk.green(indent+"└──"+dirname));
        let childNames = fs.readdirSync(dirPath);
        childNames.forEach((child)=>{
            let childPath = path.join(dirPath,child);
            treeHelper(childPath,indent+'\t');
        });
    }
}

function organizeFn(dirPath){
    if(dirPath==undefined){
        console.log("Kindly enter the path");
    }else{
        if(fs.existsSync(dirPath)){
            let destPath = path.join(dirPath,"Organized_files");
            if(fs.existsSync(destPath)){
                // console.log("Already exist organized folder..");
                organizeHelper(dirPath,destPath);
            }else{
                fs.mkdirSync(destPath);
                organizeHelper(dirPath,destPath);
            }
        }else{
            console.log("Kindly enter the correct path");
            return;
        }
    }
}

function organizeHelper(src,dest){
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    childNames.forEach((childName)=>{
        let childAddress = path.join(src,childName);
        if(fs.lstatSync(childAddress).isFile()){
            let fileAddress = childAddress;
            let fileExtension = getFileExt(fileAddress);
            let fileCategory = getFileType(fileExtension);
            // console.log(fileAddress+" ===> Extension: "+fileExtension+" ===> Category: "+fileCategory);
            sendFiles(fileAddress,dest,fileCategory);
        }else{
            if(childAddress!=dest){    
                // console.log(childAddress);
                organizeHelper(childAddress,dest);
            }
        }
    });
}

function getFileExt(name){
    let ext = path.extname(name).toString().slice(1);
    return ext;
}

function getFileType(ext){
    if(utility.types.archive.includes(ext)){
        return "Zip Files";
    }else if(utility.types.audio.includes(ext)){
        return "Audio Files";
    }else if(utility.types.book.includes(ext)){
        return "Books";
    }else if(utility.types.code.includes(ext)){
        return "Code Files";
    }else if(utility.types.exec.includes(ext)){
        return "Executable Files";
    }else if(utility.types.font.includes(ext)){
        return "Fonts Files";
    }else if(utility.types.image.includes(ext)){
        return "Images";
    }else if(utility.types.sheet.includes(ext)){
        return "Excel Sheets";
    }else if(utility.types.text.includes(ext)){
        return "Documents";
    }else if(utility.types.video.includes(ext)){
        return "Videos";
    }else if(utility.types.web.includes(ext)){
        return "Website Files";
    }else{
        return "Others";
    }
}

function sendFiles(srcFile,destFile,catFile){
    let catPath = path.join(destFile,catFile);
    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath);
    }
    let fileName = path.basename(srcFile);
    let destFilePath = path.join(catPath,fileName);
    fs.copyFileSync(srcFile,destFilePath);
    console.log(chalk.red(fileName," Copied to => ",catFile));
}

function helpFn(){
    console.log(chalk.bold('# List of all commands ..'));
    console.log(chalk.green(`node fileSysOrganizer.js tree "directoryPath"
node fileSysOrganizer.js organize "directoryPath"
node fileSysOrganizer.js help
`));
}