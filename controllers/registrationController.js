const {pool} = require('../db/connection');
const bcrypt = require('bcrypt');


exports.registrateUser = async (req, res) => {
    try{
        const {username, firstname, lastname, password, email} = req.body;
        if(!username || !password || !firstname || !lastname || !email) 
            return res.status(500).json({
                "status": "error",
                "message": "Nem lehet üres mező!"
            });
        const [username_rows] = await pool.query("SELECT username, email FROM users WHERE username = ? or email = ?", 
            [username, email]);
        if(username_rows.length > 0){
            if(username_rows[0] === username)
                return res.json({
                "status": "error",
                "message": "The username is used!"
                });
            
        }
        const hashed_password = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (username, firstname, lastname, password_hash, email) VALUES (?, ?, ?, ?, ?)", 
            [username, firstname, lastname, hashed_password, email])
        console.log("success")
        return res.json({
                    "status": "success",
                    "message": "Successfull registration!"
                });
    }
    catch (e){
        return res.json({
            "status": "error",
            "message": e
        })
    }
}