const db = require('../db/connection');
const bcrypt = require('bcrypt');

exports.registrateUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        
        if(!username || !password) return res.json({"error": "Nem lehet üres mező!"});

        db.query("SELECT username FROM users WHERE username = ?", [username], async (err, result) => {
            if(err) throw err;
            if(result.length != 0) return res.json({"error": "Már létezik a megadott néven felhasználó!"});
            try{
                const hashed_password = await bcrypt.hash(password, 10);
                db.query("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hashed_password], (err, result) => {
                    if(err) throw err;
                    return res.json({"success":"Sikeres regisztráció"});
        })
            }
            catch (hashErr){
                 return res.status(500).json({ error: "Hiba a feldolgozás közben." });
            }
        }); 
    }
    catch (e){
        return res.status(500).json({ error: "Hiba a felhasználó mentése során." })
    }
    
}