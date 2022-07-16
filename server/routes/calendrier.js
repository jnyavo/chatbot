const express = require('express');
const middleware = require('../middleware/auth');
const calendrierController = require('../controllers/calendrier.js');
const router = express.Router();


router.get('/:id', middleware.auth,calendrierController.getSpecificPlaning);
router.post('/create', calendrierController.createPlaning);
router.patch('/', middleware.auth , calendrierController.updatePlaning);
router.patch('/addplan' ,calendrierController.botPlaning);

exports.router= router;
