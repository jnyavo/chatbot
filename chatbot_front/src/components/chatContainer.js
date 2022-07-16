import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import { Async } from 'react-async';
import socket from '../chatbot/socket';
import Chatbot from 'react-chatbot-kit';

import ActionProvider from '../chatbot/ActionProvider';
import MessageParser from '../chatbot/MessageParser';
import {useStateContext} from '../contexts/ContextProvider';



const getInitialMessage = async(user) =>{ 
    
    return new Promise(resolve => socket.emit('initial-message',{user}, data => resolve(data)))
 }

const ChatContainer = ()=>{
    const {currentColor,user,socket} = useStateContext();
   
    return (
        <Async promiseFn={()=>getInitialMessage(user)}>

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
                        <div className="">
                            <div style={{maxWidth:"300px"}}>
                            <Chatbot config={{
                                botName, 
                                initialMessages:initialMessages.map(item=>createChatBotMessage(item)),
                                customStyles: {
                                    botMessageBox: {
                                        backgroundColor: currentColor
                                    },
                                    chatButton:{
                                        backgroundColor: currentColor
                                    }
                                },

                                state: {
                                    socket,
                                    user
                                  },
                                }} 
                                actionProvider={ActionProvider} 
                                
                                messageParser={MessageParser} 
                                
                            /> 
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