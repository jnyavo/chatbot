import io from "socket.io-client";


const socket = io("http://192.168.1.159:2300", {autoConnect:false,reconnectionDelay:20000, transports:['websocket']});



export default socket;