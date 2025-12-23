//const db = require('../db/connection');
const {pool} = require('../db/connection');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.json({
                "status":"error",
                "message":"No username or password"
            });
        }
        const query = "SELECT username, password_hash, id FROM users WHERE username = ?";
        const [rows] = await pool.query(query, [username])
        
        if(rows.length ===0){
            return res.status(401).json({
                "status":"error",
                "message":"The user name or password is incorrect."
            })
        }
        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password_hash);

        if(isValid){
            req.session.userId = user.id;
                return res.json({
                    "status":"success",
                    "message":"Sikeres bejelentkezés!"
                });
        }
        else{
            return res.json({
                "status":"error",
                "message":"Password incorrect!"
            });
        }
    }catch (e){
            console.log("err2"+e)
                return res.json({
                        "status":"error",
                        "message":e
                    });
            }
}
exports.logoutUser = async (req, res, next) => {
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
/*
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
}*/