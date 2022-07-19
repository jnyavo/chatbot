const express = require('express');
const userController = require('../controllers/user.js');
const middleware = require('../middleware/auth');
const router = express.Router();

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/getUserList', middleware.auth, userController.getUserList);
router.post('/deleteUser', middleware.auth, userController.deleteUser);
router.post('/forget', userController.forgetPassword);
router.post('/reset', userController.resetPassword);
router.patch('/edit', userController.updated);
router.post('/socialNetwork', userController.socialNetwork);


exports.router= router;
