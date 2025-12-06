const express = require('express');
const path = require('path');
const router = express.Router();
const {requireAuth}  = require("../middlewares/auth");


router.get('/index', (req, res) => {
    //res.sendFile(path.join(__dirname, '../templates/index.html'))
    const isLoggedIn = !!req.session?.userId;
    res.render("pages/index", {isLoggedIn});
});

router.get('/send', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/send_page.html'))
});

module.exports = router;