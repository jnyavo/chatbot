const server = require('socket.io');
const config = require('./config');

const io = new server.Server(2300,{
    origin:'*'
    }
)

io.on("connection", socket => {
  var address = socket.handshake.address
  console.log('New connection from ' + address);
  socket.on("initial-message",(arg,callback)=>{
    callback(config)
    })
})



