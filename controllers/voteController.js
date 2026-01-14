
const {pool} = require('../db/connection');

exports.addVote = async (req, res) => {
    try{
        const {vote, post_id} = req.body;
        if(!vote || !post_id){
            return res.json({
                "status":"error",
                "message":"no vote or post_id in request."
            });
        }
        const userId = req.session.userId;
        const votequery = `
            SELECT user_id, post_id FROM votes 
            WHERE user_id = ? AND post_id = ?;
        `
        const [exists_vote] = await pool.query(votequery, [userId, post_id])
        if(exists_vote.length > 0){
            return res.json({
                "status":"info",
                "message":"You have already voted for this post."
            });
        }
        
        const newvote = `
            INSERT INTO votes (value, user_id, post_id)
            VALUES (?, ?, ?);
        `
        await pool.query(newvote, [vote, userId, post_id]);

        const getVotesQuery = `
            SELECT Sum(value) AS sum FROM votes WHERE post_id = ?;
        `
        const currentvote = await pool.query(getVotesQuery, [post_id]);
        if(!currentvote){
            return res.json({
                "status":"error",
                "message":"Error while polling votes."
            });
        }
        else{
            return res.json({
                "status":"success",
                "message": currentvote[0][0]['sum']
            });
        }
        

    } catch (e){
        return res.json({
                "status":"error",
                "message":JSON.stringify(e)
            });
    }
    
}

exports.deleteVote = async (req, res) => {
    try{
        const {vote, post_id} = req.body;
        if(!vote || !post_id){
            return res.json({
                "status":"error",
                "message":"no vote or post_id in request."
            });
        }
        const userId = req.session.userId;

        const deletequery = `
            DELETE FROM votes 
            WHERE user_id = ? AND post_id = ?;
        `
        await pool.query(deletequery, [userId, post_id]);

        const getVotesQuery = `
            SELECT Sum(value) AS sum FROM votes WHERE post_id = ?;
        `
        const currentvote = await pool.query(getVotesQuery, [post_id]);
        if(!currentvote){
            return res.json({
                "status":"error",
                "message":"Error while polling votes."
            });
        }
        else{
            return res.json({
                "status":"success",
                "message": currentvote[0][0]['sum']
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.json({
                "status":"error",
                "message":JSON.stringify(e)
            });
    }
}