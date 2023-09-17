import express from "express";
import {Server} from "socket.io";
import http from "http";

const app = express();
app.use(express.static("public"));
const PORT = 5000;
const server = http.createServer(app);
let io = new Server(server);
io.on("connection",(socket)=>{
    // console.log("connection made");
    socket.on("beginPath",(data)=>{
        // console.log(data);
        io.sockets.emit("beginPath",data);
    });
    socket.on("drawPath",(data)=>{
        // console.log(data);
        io.sockets.emit("drawPath",data);
    });
    socket.on("undoRedo",(data)=>{
        // console.log(data);
        io.sockets.emit("undoRedo",data);
    });
});
server.listen(PORT,()=>{
    console.log(`running on port: http://localhost:${PORT}`);
});

