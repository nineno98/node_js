const {pool} = require("../db/connection");
const crypto = require('crypto');
const nodemailer = require('nodemailer');


exports.resetPassword = async (req, res) => {

    const email = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = (email) => emailRegex.test(email);
    
    if(isValidEmail(email)){
        try{
            const [rows] = await pool.query("SELECT email FROM users WHERE email = ?", [email]);
            if(rows.length === 0) return res.json({
                "status":"error",
                "message":"There is no such email address in the database."
            })

        }
        catch (e){
            throw e;
        }
    }
    else{
        return res.json(
                {
                    "status":"error",
                    "message":"The email address is incorrect"
                }
                )
    }
    
}