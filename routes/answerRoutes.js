const express = require("express");
const router = express.Router();


const authMiddleware = require("../middleWare/authMiddleware");
const {
  postAnswer,
  answerWithQuestion,
} = require("../Controller/answerController");

// post answer
router.post("/:questionid/answer", postAnswer);

// get questions and answers
router.get("/:questionid/answer", answerWithQuestion);

module.exports = router;