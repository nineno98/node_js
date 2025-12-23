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
        console.log("body")
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
/*
exports.registrateUser = async (req, res) => {
    try{
        const {username, firstname, lastname, password, email} = req.body;
        
        if(!username || !password || !firstname || !lastname || !email) 
            return res.status(500).json({
                "status": "error",
                "message": "Nem lehet üres mező!"
            });

        db.query("SELECT username, email FROM users WHERE username = ? or email = ?", [username, email], async (err, result) => {
            if(err) throw err;
            if(result.length != 0) 
                return res.status(500).json({
                    "status":"error",
                    "message": "Már létezik a megadott néven felhasználó!"
                });
            try{
                const hashed_password = await bcrypt.hash(password, 10);
                db.query("INSERT INTO users (username, firstname, lastname, password_hash, email) VALUES (?, ?, ?, ?, ?)", [username, firstname, lastname, hashed_password, email], (err, result) => {
                    if(err) throw err;
                    return res.status(200).json({
                        "status":"success",
                        "message":"Sikeres regisztráció"
                    });
        })
            }
            catch (hashErr){
                 return res.status(500).json({ 
                    "status":"error",
                    "message": "Hiba a feldolgozás közben." 
                });
            }
        }); 
    }
    catch (e){
        return res.status(500).json({
            "status":"error",
            "message": "Hiba a felhasználó mentése során."
        })
    }
    
}
*/