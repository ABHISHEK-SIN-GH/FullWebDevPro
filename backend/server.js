import http from 'http';
import fs from 'fs';

const server = http.createServer((req,res)=>{
    console.log('server is running...');
    
    // console.log(req);
    // console.log(req.url);
    // console.log(req.method);

    // res.setHeader('Content-Type','text/plain');
    // res.write('<h1>Hello World ! : )</h1>'); // write text
    // res.setHeader('Content-Type','text/html'); 
    // res.write('<h1>Hello World ! : )</h1>'); // write html
    // res.setHeader('Content-Type','json'); 
    // res.write('{name:"abhishek"}'); // write json

    // fs.readFile('./index.html',(err,fileData)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(fileData);
    //         res.setHeader('Content-Type','text/html');
    //         res.write(fileData);
    //         res.end();
    //     }
    // });

    res.setHeader('Content-Type','text/html');
    let path = './views';
    let url = req.url;
    switch(url){
        case '/':
            path+='/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+='/about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        case '/contact':
            path+='/contact.html';
            res.statusCode = 200;
            break;
        default :
            path+='/404.html'    
            res.statusCode = 404;  
            break;      
    }
    fs.readFile(path,(err,fileData)=>{
        if(err){
            console.log(err);
        }
        else{
            fs.readFile('./views/navbar.html',(err,navFileData)=>{
                if(err){
                    console.log(err);
                }else{
                    res.write(navFileData);
                    res.write(fileData);
                    res.end();
                }
            })
        }
    });

});

server.listen(3000,'localhost',()=>{
    console.log('server is listening on port http://localhost:3000');
});