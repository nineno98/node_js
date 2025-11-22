const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/index.html'))
});

router.get('/send', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/send_page.html'))
});



module.exports = router;