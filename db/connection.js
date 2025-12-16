const mysql = require('mysql2/promise');


async function initDB() {
    try{
        const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
        });
        console.log("Connected to the mysql server!");
        await connection.query("CREATE DATABASE IF NOT EXISTS guest_book");
        console.log("Database created");

        await connection.query("USE guest_book");
        console.log("Database in use: guest_book");

                const createTextsTable = `
                CREATE TABLE IF NOT EXISTS texts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_by INT NOT NULL,
                    FOREIGN KEY (created_by) REFERENCES users(id)
                );
                `;
        await connection.query(createTextsTable);
        console.log("Table created: texts");

        const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
                );
                `
        await connection.query(createUsersTable);
        console.log("Table created: users");
    }
    catch (e) {
        console.log("Error: "+e);
    }
}

module.exports = initDB;

/*
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",

})

connection.connect(function(err) {
    if(err)throw err;
    console.log("Connected to the database!");
    connection.query("CREATE DATABASE IF NOT EXISTS guest_book", function(err){
        if(err) throw err;
        else{
            console.log("Database created");
            connection.query("USE guest_book", function(err){
            if(err) throw err;
            else{
                console.log("Database in use: guest_book");
                const createTextsTable = `
                CREATE TABLE IF NOT EXISTS texts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_by INT NOT NULL,
                    FOREIGN KEY (created_by) REFERENCES users(id)
                );
                `;
                const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
                );
                `

                connection.query(createUsersTable, (err) => {
                    if (err) {
                        console.error("Table creation error:", err);
                    } else {
                        console.log("Texts table crated.");
                    }
                });

                connection.query(createTextsTable, (err) => {
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

module.exports = connection;*/