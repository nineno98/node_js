//const db = require('../db/connection');
const {pool} = require('../db/connection');

exports.sendText = async (req, res) => {
    const text = req.body.usertext;
    if(req.session.userId && req.body.usertext != ""){
        const userID = req.session.userId
        const query = "INSERT INTO texts (content, created_by) VALUES (?, ?)";
        try{
            await pool.query(query, [text, userID]);
            return res.json({
                "status":"success",
                "message":"Post added to guest book!"
            })
        }
        catch (e){
            return res.json({
                "status":"success",
                "message":"Post added to guest book!"
            })
        }
    }
    else{
        return res.json(
                {
                    "status":"error",
                    "message":"Hiba történt a mentés során."
                }
            )
    }
}
exports.getTexts = async (req, res) => {
    try{
        console.log("Lekérdezés indul: ", req.url);
        const query = 
        `SELECT content, username 
        FROM texts INNER JOIN users ON texts.created_by = users.id;`
        const [rows] = await pool.query(query);
        
        if(rows.length > 0){
            return res.json({
                "status":"sucess",
                "message":"Select all texts",
                "data": rows
            })
        }
        else{
            return res.json({
                "status":"warning",
                "message":"Selected rows are empty.",
                "data":""
            })
        }
        
    }
    catch (e){
        console.log("Error: "+e);
        return res.json({
            "status":"error",
            "message":"Error in select.",
            "data":"e"
        })
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