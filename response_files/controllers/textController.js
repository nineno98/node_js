const db = require('../db/connection');

exports.sendText = (req, res) => {
    const text = req.body.usertext;
    db.query("INSERT INTO texts (content) VALUES (?)", [text], (err, result) => {
        if(err){
            throw err;
        }
        console.log("Text inserted:", text);
        res.json({"message":"success!"})
    });
}