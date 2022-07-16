

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require('./routes/user')
const messageRouter = require('./routes/message')
const iomessageRouter = require('./routes/socket_messages')
const calendrierRoutes = require('./routes/calendrier')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());




const server = http.createServer(app);
const io = new Server(server);


app.use("/user", userRoutes.router);
app.use('/message',messageRouter)
app.use("/planing", calendrierRoutes.router)

io.on("connection", iomessageRouter)




const PORT = process.env.PORT || 5000;
const CONNECTION_URL  = "mongodb+srv://monfrere:lelenabavy@cluster0.nww7v.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => console.log(`serveur runing on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));






