const connection = require('./connection');

function initDatabase(){
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS texts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error("Table creation error:", err);
        } else {
            console.log("Database initialized (tables checked).");
        }
    });

    
};
module.exports = initDatabase;