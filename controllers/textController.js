//const db = require('../db/connection');
const {pool} = require('../db/connection');

exports.sendText = async (req, res) => {
    const text = req.body.usertext;
    if(req.session.userId && req.body.usertext != ""){
        const userID = req.session.userId
        const query = "INSERT INTO texts (content, created_by) VALUES (?, ?)";
        try{
            pool.query(query, [text, userID], (err, results, fields) => {
                if (err) console.log(err);
                console.log("Text inserted");
                res.json(
                    {
                        "status":"success",
                        "message":"Bejegyzés sikeresen hozzáadva."
                    }
                )
            })
        }
        catch (e){
            console.log(e);
        }
    }
    else{
        res.json(
                {
                    "status":"error",
                    "message":"Hiba történt a mentés során."
                }
            )
    }
}


/*exports.sendText = (req, res) => {
    const text = req.body.usertext;
    if(req.session.userId && req.body.usertext != ""){
        const userID = req.session.userId
        db.query("INSERT INTO texts (content, created_by) VALUES (?, ?)", 
            [text, userID], (err, result) => {
            if(err){
                throw err;
            }
            console.log("Text inserted");
            res.json(
                {
                    "status":"success",
                    "message":"Bejegyzés sikeresen hozzáadva."
                }
            )
        });
    }
    else{
        res.json(
                {
                    "status":"error",
                    "message":"Hiba történt a mentés során."

                }
            ) 
    } 
}
exports.getTexts = async (req, res) => {
    try{
        const query = 
        `SELECT content, username 
        FROM texts INNER JOIN users ON texts.created_by = users.id;`
        db.query(query, async (err, result) => {
            if(err) throw err;
        const json = JSON.parse(JSON.stringify(result));
        return res.json(json);
        })
    }
    catch (e){
        console.log(e);
        
    }
}*/