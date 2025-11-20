const express = require('express');
const path = require('path');
const { json } = require('stream/consumers');
const app = express();
const port = 8080;
const connection = require('./db/connection');

const routes = require('./routes');

// Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/media', express.static(path.join(__dirname, '/public/static')));



// Routes
app.use('/', routes);
app.use('/', require('./routes/api'));

//Server
app.listen(port, () =>{
    console.log("Server is running...");
})

