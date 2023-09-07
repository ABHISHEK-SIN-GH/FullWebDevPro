import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"]});
//   const page = await browser.newPage();
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto('https://www.google.com/');
  await page.waitForSelector("textarea",{visible:true});
  await page.type("textarea","Find My IP");
  await page.keyboard.press("Enter");
  await page.waitForSelector(" d",{visible:true});
  await page.click("")
//   await browser.close();
})();