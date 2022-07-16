const express = require("express")
const messageController = require('../controllers/message.js');
const router = express.Router();





router.post('/chat', messageController.processMessage);

module.exports = router;
