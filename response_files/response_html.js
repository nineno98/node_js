const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.use('/media', express.static(__dirname + '/public/static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/response.html'));
})

app.listen(port, () => {
    console.log("Server running...");
})