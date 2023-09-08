import puppeteer from "puppeteer";
import fs from "fs";
import xlsx from "xlsx";

(async()=>{
    const browser = await puppeteer.launch({headless:'new',defaultViewport:null,args:['--start-maximized']});
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto('https://www.youtube.com/playlist?list=PLRBp0Fe2GpgmsW46rJyudVFlY6IYjFBIK');
    page.waitForSelector("#text");
    const title = await page.evaluate((data)=>{return document.querySelector(data).innerHTML},"#text");
    // console.log(title);
    page.waitForSelector(".byline-item.style-scope.ytd-playlist-byline-renderer");
    const data  = await page.evaluate(getData,".byline-item.style-scope.ytd-playlist-byline-renderer");
    // console.log(data.allVideos,data.allViews,data.lastUpdate);
    const totalVideos = Number.parseInt(data.allVideos.split(" ")[0]);
    // console.log(totalVideos);
    let currentVL = await getCVL(page); 
    // console.log(currentVL);
    while(totalVideos-currentVL>0){
        await scrollToBottom(page);
        currentVL = await getCVL(page);
    }
    // currentVL = await getCVL(page);
    // console.log(currentVL);
    const stats = await page.evaluate(nameAndDuration,"#video-title","#time-status");
    // console.log(stats[0]);
    console.log(makeXLfile(stats,"youtubeSc"));
    browser.close();
})();

const makeXLfile = (jsonD,name) => {
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(jsonD);
    xlsx.utils.book_append_sheet(newWB,newWS,'sheet-1');
    xlsx.writeFile(newWB,`${name}.xlsx`);
    return "EXL FileName Created Successfully!";
}

const nameAndDuration = async (titleSelector,durationSelector,) => {
    let titles = document.querySelectorAll(titleSelector);
    let durations = document.querySelectorAll(durationSelector);
    let nameAndDurationList = [];
    titles.forEach((title,index)=>{
        nameAndDurationList.push({title:title.innerText,duration:durations[index].innerText.trim()});
    });
    return nameAndDurationList;
}

const scrollToBottom = async (page) => {
    await page.evaluate(goToBottom);
    function goToBottom(){
        window.scrollBy(0,window.innerHeight);
    }
}

const getCVL = async (page) => {
    let length = await page.evaluate(getL,"#content");
    return length;
}

const getL = async (durationSelect) => {
    let durationElement = document.querySelectorAll(durationSelect);
    return durationElement.length;
}

const getData = (selector) => {
    let allEle = document.querySelectorAll(selector);
    allVideos = allEle[0].innerText;
    allViews = allEle[1].innerText;
    lastUpdate = allEle[2].innerText;
    return {
        allVideos,
        allViews,
        lastUpdate
    }
}