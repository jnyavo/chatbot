

class MessageParser {
  actionProvider = {}
  state ={}

    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
      
    }
  
    parse(message) {
      if (this.actionProvider)
        this.state.socket.emit('get-response',{message,to:'hygea',by:'test-user2'},(data)=>this.actionProvider.parseBotMessage(data))
      else 
        console.log("no action provider")
    }

    
  }

  export default MessageParser;