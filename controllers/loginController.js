const db = require('../db/connection');
const bcrypt = require('bcrypt');


exports.loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        db.query("SELECT username, password_hash, id FROM users WHERE username = ?", [username], async (err, result) => {
            if(err) throw err;
            try{
                
                if(result.length == 0){
                    return res.json({
                        "status":"warning",
                        "message":"Nincs ilyen felhasználó!"
                    });
                }
                else{
                    const json = JSON.parse(JSON.stringify(result));
                    if( await bcrypt.compare(password, json[0].password_hash)){
                        req.session.userId = json[0].id;
                        return res.json({
                            "status":"success",
                            "message":"Sikeres bejelentkezés!"
                        });
                    }
                    else{
                        return res.json({
                            "status":"warning",
                            "message":"Hibás jelszó!"
                        });
                    }
                }               
            }
            catch (e){
                return res.json({
                        "status":"error",
                        "message":"Sikertelen bejelentkezés! Hiba!"
                    });
            }
        });
    }
    catch (e){
        console.log(e);
        return res.json({
                        "status":"success",
                        "message":"Sikertelen bejelentkezés! Hiba!"
                    });
    }
}

exports.logoutUser = (req, res, next) => {
    try{
        if(req.session){
            req.session.destroy(function (err){
                if(err){
                    return next(err);
                } else {
                    const isLoggedIn = !!req.session?.userId;
                    return res.render("pages/index", {isLoggedIn});
                }
            });
        }
    }
    catch (e) {
        throw e;
    }
}