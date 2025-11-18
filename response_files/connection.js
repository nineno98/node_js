const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",

})

connection.connect(function(err) {
    if(err)throw err;
    console.log("Connected to the database!");
    connection.query("CREATE DATABASE IF NOT EXISTS mydb", function(err){
        if(err) throw err;
        console.log("Database created");
    })

})