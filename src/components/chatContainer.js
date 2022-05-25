import React, { useEffect, useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import { Async } from 'react-async';
import socket from '../chatbot/socket';
import Chatbot from 'react-chatbot-kit';

import ActionProvider from '../chatbot/ActionProvider';
import MessageParser from '../chatbot/MessageParser';



const getInitialMessage = async() =>{ 
        
    return new Promise(resolve => socket.emit('initial-message','test', data => resolve(data)))
 }

const ChatContainer = ()=>{

   
    return (
        <Async promiseFn={getInitialMessage}>

            {
                ({data,error,isPending})=>
                {

                    var botName;
                    var initialMessages;
                    if(isPending) return 'Loading...'
                    if(error) return `Something went wrong: ${error.message}`
                    if(data)
                    {
                        
                        botName = data.config.botName 
                        initialMessages = data.config.initialMessages

                        return (
                        <div className="App">
                            <div style={{maxWidth:"300px"}}>
                            <Chatbot config={{botName, initialMessages:initialMessages.map(item=>createChatBotMessage(item))}} actionProvider={ActionProvider} messageParser={MessageParser} /> 
                            </div>
                        </div>
                        );
                    }
                }
            }
        </Async>

    
   
    
  
    
       

    )
}

export default ChatContainer