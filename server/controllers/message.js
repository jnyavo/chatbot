const Message = require("../models/message.js");
const conn = require('../models/bp_connection')


conn.bp.connect()
    .then(resp=>console.log(`connected to botpress with ${conn.bp.login_data.email}`))
    .catch(err=>console.log(err))

// var log = console.log;
// console.log = function() {
//     log.apply(console, arguments);
//     // Print the stack trace
//     console.trace();
// };
    


const saveMessage = (body) =>
{
    const { message,datetime,to,by } = body;
    return Message.create({message,datetime,to,by})
}

const getAIResponse = async (req) =>
{
    var botpress_conn = conn.bp
    const { message,to,by } = req.body;
    
    saveMessage({
        ...req.body,
        datetime:Date.now().toString()
    })
        .then(result=>{
            console.log({saved:result})
        }).catch(err=>{
            console.log(err)
        })

    var re;
    await botpress_conn.getResponse(message,to,by)
        .then(resp=>{
            re = resp
            re.map(resp=>{
                saveMessage({
                    message : resp.text,
                    to: by,
                    by: to,
                    datetime: Date.now().toString()
        
                })
                    .then(result=>{
                        console.log({saved:result})
                    }).catch(err=>{
                        console.log(err)
                        
                    })
            })
        })
        .catch(async err=>{
            console.log(err)
           
            await botpress_conn.connect()
                .then(async ()=>{
                await botpress_conn.getResponse(message,to,by)
                                            .then((resp)=>{
                                                re = resp
                                            })
                                            .catch(err=>
                                            {
                                                console.log(err)
                                                re = err
                                            })
                })
                .catch(err=>
                {
                    console.log(err)
                    re = err
                })
                
            
                
        })

    return re

}

exports.getAIResponse = getAIResponse

exports.processMessage = async (req,res) =>
{
    var re = await getAIResponse(req).catch(err=>console.log(err))
    res.send(re)
}





