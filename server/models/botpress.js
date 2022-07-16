const axios = require('axios')
const url = require('url')


class BotPress
{
    /**
     * 
     * @param {String} url 
     */
    constructor(url,login_data)
    {
        this.url = url
        this.token = {jwt:'',exp:''}
        this.header = {Authorization:'','Content-type':'application/json'}
        this.last_reply = {}
        this.axios = axios.default
        this.login_data = login_data
        
    }
    
    async connect()
    {
        
        const params = new url.URLSearchParams(this.login_data);

        var res = await this.axios.post(this.url + '/api/v1/auth/login/basic/default',params)
        this._updateToken(res)
        return res
    }

    _updateToken(res)
    {
        this.token = res.data.payload
        this.header.Authorization = `Bearer ${this.token.jwt}`
    }

    /**
     * 
     * @param {string} text 
     * @param {string} botID 
     * @param {string} userID 
     * @returns reponse de botpress
     */
    getResponse(text,botID,userID)
    {
        // var res;
        // await this.axios.post(this.url + `/api/v1/bots/${botID}/converse/${userID}/secured?include=nlu,state,suggestions,decision`,{
        // type:"text",
        // text
        // },{headers:this.header,timeout:10000})
        //     .then(re=>{ 
        //         res = re
        //     })
        //     .catch(err=>console.log(err))
        
        // this.last_reply = res
        // //return res.data.responses

        return new Promise((resolve,reject)=>{
            this.axios.post(this.url + `/api/v1/bots/${botID}/converse/${userID}/secured?include=nlu,state,suggestions,decision`,{
                type:"text",
                text
                },{headers:this.header,timeout:10000})
                    .then(re=>{ 
                        resolve(re.data.responses)
                    })
                    .catch(err=>reject(err))
        })

    
    }

    /**
     * 
     * @returns liste des bots 
     */
    getBotList()
    {
        return this.axios.get(this.url + '/api/v1/admin/bots',{header:this.header})
    }





}


module.exports = BotPress