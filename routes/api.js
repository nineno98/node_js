const express = require('express');
const router = express.Router();

const textController = require("../controllers/textController");
const voteController = require("../controllers/voteController");

router.post("/text_input_post", textController.sendText);

router.get("/get_all_text", textController.getTexts);

router.post("/add_vote", voteController.addVote)

router.get("/status", (req, res) => {
    res.json({"isLogged": !! req.session.userId })
})

module.exports = router;