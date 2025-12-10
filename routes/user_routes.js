const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../db/connection');


const registrationController = require('../controllers/registrationController');
const loginController = require('../controllers/loginController');
const resetpassController = require('../controllers/resetpassController');


const {requireAuth}  = require("../middlewares/auth");


router.get('/index', (req, res) => {
    const isLoggedIn = !!req.session?.userId;
    res.render("pages/index", {isLoggedIn});
});

router.get('/send', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/send_page.html'))
});

router.get('/registration', (req, res)=> {
    //res.sendFile(path.join(__dirname, '../templates/registration.html'));
    const isLoggedIn = !!req.session?.userId;
    res.render("pages/registration", {isLoggedIn})
});

router.post('/registration', registrationController.registrateUser);

router.get('/login', (req, res )=>{
    //res.sendFile(path.join(__dirname, '../templates/login.html'))
    res.render("pages/login");
    
});

router.post('/login', loginController.loginUser);

router.get('/logout', loginController.logoutUser);

router.get("/forgott-password", (req, res) => {
    res.render("pages/forgottpass");
});

router.post("/forgott-password", resetpassController.resetPassword);


module.exports = router;