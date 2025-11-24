const express = require('express');
const path = require('path');
const router = express.Router();
const {requireAuth}  = require("../middlewares/auth");
console.log(requireAuth);

router.get('/index', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/index.html'))
});

router.get('/send', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/send_page.html'))
});

module.exports = router;