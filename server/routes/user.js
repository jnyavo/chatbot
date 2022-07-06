const express = require('express');
const userController = require('../controllers/user.js');
const router = express.Router();

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/getUserList', userController.getUserList);
router.post('/deleteUser', userController.deleteUser);

exports.router= router;
