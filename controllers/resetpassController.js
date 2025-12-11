const db = require("../db/connection")


exports.resetPassword = (req, res) => {

    const email = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = (email) => emailRegex.test(email);
    
    if(isValidEmail(email)){
        console.log('valid');
    }
    res.json(
                {
                    "status":"success",
                    "message":"."
                }
            )
}