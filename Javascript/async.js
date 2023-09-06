// import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';
// const data = fs.readFileSync('Text.txt');
// console.log(data.toString());
request('https://www.droppers.in', function (error, response, body) {
    if(error){
        // console.error('error:', error); // Print the error if one occurred
    }else{
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        handleHtml(body);
    }
});
const handleHtml = (htmlBody) => {
    let selTool = cheerio.load(htmlBody);
    let h1s = selTool("h1");
    console.log(h1s);
}