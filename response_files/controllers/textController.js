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

exports.getTexts = (req, res) => {
    db.query("SELECT content FROM texts", (err, result) => {
        if(err){
            throw err;
        }
        const json = JSON.parse(JSON.stringify(result));
        res.json(json);
    })
}