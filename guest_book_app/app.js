const express = require('express');
const path = require('path');
const { json } = require('stream/consumers');
const app = express();
const port = 8080;
const connection = require('./db/connection');
const session = require('express-session');
const routes = require('./routes');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/media', express.static(path.join(__dirname, '/public/static')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "titok23",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true
    }
}))




// Routes
app.use('/', routes);
app.use('/', require('./routes/api'));
app.use('/', require('./routes/user_routes'));

//Server
app.listen(port, () =>{
    console.log("Server is running...");
})

