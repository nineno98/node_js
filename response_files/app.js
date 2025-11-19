const express = require('express');
const path = require('path');
const { json } = require('stream/consumers');
const app = express();
const port = 8080;


const routes = require('./routes');

// Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/media', express.static(path.join(__dirname, '/public/static')));



// Routes
app.use('/', routes);

//Server
app.listen(port, () =>{
    console.log("Server is running...");
})

