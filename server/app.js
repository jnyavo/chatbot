
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const app2 = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const config = require('./config');
const userRoutes = require('./routes/user.js');
require('dotenv').config()
app2.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app2.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app2.use(cors());


app2.use("/user", userRoutes.router);

const PORT = process.env.PORT || 5000;


mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app2.listen(PORT, () => console.log(`serveur runing on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));



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
