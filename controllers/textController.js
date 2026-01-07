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
        
        const query = 
        `SELECT texts.id, content, username, SUM(votes.value) AS vote 
            FROM users 
            INNER JOIN texts 
                ON users.id = texts.created_by 
            LEFT JOIN votes 
                ON texts.id = votes.post_id
            GROUP BY texts.id; `
        const [rows] = await pool.query(query);
        console.log(rows)
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
