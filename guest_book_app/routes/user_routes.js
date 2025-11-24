const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../db/connection');


const registrationController = require('../controllers/registrationController');
const loginController = require('../controllers/loginController');

router.get('/registration', (req, res)=> {
    res.sendFile(path.join(__dirname, '../templates/registration.html'));
});

router.post('/registration', registrationController.registrateUser);

router.get('/login', (req, res )=>{
    res.sendFile(path.join(__dirname, '../templates/login.html'))
});

router.post('/login', loginController.loginUser);

router.get('/logout', loginController.logoutUser);

module.exports = router;