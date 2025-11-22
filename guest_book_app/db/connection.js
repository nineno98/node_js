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
        else{
            console.log("Database created");
            connection.query("USE mydb", function(err){
            if(err) throw err;
            else{
                console.log("Database in use: mydb");
                const createTableQuery = `
                CREATE TABLE IF NOT EXISTS texts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                `;
                const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL
                );
                `

                connection.query(createTableQuery, (err) => {
                    if (err) {
                        console.error("Table creation error:", err);
                    } else {
                        console.log("Texts table crated.");
                    }
                });

                connection.query(createUsersTable, (err) => {
                    if (err) {
                        console.error("Table creation error:", err);
                    } else {
                        console.log("Users table created.");
                    }
                });
            }
            
            });
        }

        
    });
    


});

module.exports = connection;