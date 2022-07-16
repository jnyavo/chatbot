
const { getAIResponse } = require('../controllers/message')
const config = require('../config')

module.exports = socket => {
    var address = socket.handshake.address
    console.log('New connection from ' + address);
    
  
    socket.on("initial-message",(arg,callback)=>{
      callback(config)
      console.log(arg)
      })
    
    socket.on("get-response",async (arg,callback)=>
    {
      console.log({arg})
      callback(await getAIResponse({body:arg}))
    })
    


}