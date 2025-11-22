const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const registrationController = require('../controllers/registrationController');

router.get('/registration', (req, res)=> {
    res.sendFile(path.join(__dirname, '../templates/registration.html'));
});

router.post('/registration', registrationController.registrateUser);

router.get('/login', (req, res )=>{
    res.sendFile(path.join(__dirname, '../templates/login.html'))
});

router.post('/login', (req, res)=>{

});

module.exports = router;