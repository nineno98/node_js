const db = require('../db/connection');
const bcrypt = require('bcrypt');

exports.registrateUser = async (req, res) => {
    try{
        const {username, firstname, lastname, password} = req.body;
        
        if(!username || !password || !firstname || !lastname) 
            return res.status(500).json({
                "status": "error",
                "message": "Nem lehet üres mező!"
            });

        db.query("SELECT username FROM users WHERE username = ?", [username], async (err, result) => {
            if(err) throw err;
            if(result.length != 0) 
                return res.status(500).json({
                    "status":"error",
                    "message": "Már létezik a megadott néven felhasználó!"
                });
            try{
                const hashed_password = await bcrypt.hash(password, 10);
                db.query("INSERT INTO users (username, firstname, lastname, password_hash) VALUES (?, ?, ?, ?)", [username, firstname, lastname, hashed_password], (err, result) => {
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