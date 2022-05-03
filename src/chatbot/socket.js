import io from "socket.io-client";


const socket = io("http://localhost:2300", {autoConnect:false,reconnectionDelay:20000, transports:['websocket']});



export default socket;