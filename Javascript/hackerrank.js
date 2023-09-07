import puppeteer from "puppeteer";
import {scrollPageToBottom} from "puppeteer-autoscroll-down";
const userName = "singh.abhishek151019@gmail.com";
const password = "Abhishek@15";
const loginLink = "https://www.hackerrank.com/auth/login";
(async () => {
    console.log('Program Started...');
    console.log('Browser Launching...');
    const browser = await puppeteer.launch({headless:false,defaultViewport:null,args:['--start-maximized']});
    console.log('Browser Launched...');
    const pages = await browser.pages();
    console.log('New Tab Opening...');
    const page = pages[0];
    console.log('New Tab Opened...');
    console.log('Link Opening...');
    // await page.goto('https://www.hackerrank.com/domains/python');
    await page.goto(loginLink);
    console.log('Link Opened Successfully...');
    const userNameSelector = 'input[name="username"]';
    const passwordSelector = 'input[name="password"]';
    await page.waitForSelector(userNameSelector);
    console.log('Username Filling...');
    await page.type(userNameSelector,userName,{delay:50});
    console.log('Password Filling...');
    await page.type(passwordSelector,password,{delay:50});
    const loginButton = 'button.auth-button';
    await page.waitForSelector(loginButton);
    console.log('Button Clicked');
    await page.click(loginButton);
    console.log('Waiting...');
    const topicLinkButton = '.topic-card a[data-attr1="python"]';
    console.log('Waiting For Topic...');
    await page.waitForSelector(topicLinkButton);
    await page.click(topicLinkButton,{delay:50});
    console.log('Topic Clicked');
    const easyCheckBox = 'input[value=easy]';
    await page.waitForSelector(easyCheckBox);
    console.log("Checkbox Selected");
    await page.click(easyCheckBox,{delay:2000});
    await scrollPageToBottom(page,{size:250,delay:100});
    let allQue = await page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:10000});
    console.log(allQue.length);
})();
