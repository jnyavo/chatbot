import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { createChatBotMessage } from 'react-chatbot-kit';
import { useAsync } from 'react-async';
import { Async } from 'react-async';
import socket from './chatbot/socket';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import ActionProvider from './chatbot/ActionProvider';
import MessageParser from './chatbot/MessageParser';

import "./App.css";

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

const App =  () =>
{
   

    const alert = useAlert();
    
    

    useEffect(()=>{
        
        socket.on("connect",()=>{
            
            alert.show('Connected to Igea',{
                type:'success'
            })
           
            
        })
        
    
        socket.on("connect_error",(error)=>{
            
            alert.show(`Connection Error: ${error}`,{type:'error'})
        })
    
        socket.on('disconnect',()=>{
            alert.info('Disconnected')
        })
        
        socket.connect()
        
        
        

        
    })

    return(
        <ChatContainer />
    );
    
    
}

export default App;