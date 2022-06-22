const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const config = require('./config')



io.on("connection", socket => {
  var address = socket.handshake.address
  console.log('New connection from ' + address);
  socket.on("initial-message",(arg,callback)=>{
    callback(config)
    })
})


server.listen(2300, () => {
  console.log('listening on *:2300');
});



