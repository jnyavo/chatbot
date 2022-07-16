const BotPress = require('./botpress.js')
const dotenv = require('dotenv')
dotenv.config()

const LOGIN_DATA = {
    "email": process.env.BOTPRESS_EMAIL,
    "password": process.env.BOTPRESS_PASS
}


exports.bp = new BotPress(process.env.BOTPRESS_URL || "http://localhost:3000/",LOGIN_DATA)

