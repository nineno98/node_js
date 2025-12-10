const db = require("../db/connection")


exports.resetPassword = (req, res) => {
    const email = req.body.email;
    
    console.log(email);
    res.json(
                {
                    "status":"success",
                    "message":"."
                }
            )
}