const express = require('express');
const router = express.Router();

const textController = require("../controllers/textController");

router.post("/text_input_post", textController.sendText);

router.get("/get_all_text", textController.getTexts);

module.exports = router;