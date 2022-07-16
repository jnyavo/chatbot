class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
    
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
     console.log(this.createChatBotMessage)
   }


   parseBotMessage = (responses) =>
    {
      
      if (Array.isArray(responses))
          responses.map(res=>
          {
            console.log(res)
            const message = this.createChatBotMessage(res.text)
            this.setState(prev=>(
              {
                ...prev,
                messages:[...prev.messages,message]
              }))
          })
      else
        console.log(responses)
    }
    
 }
 
 export default ActionProvider;