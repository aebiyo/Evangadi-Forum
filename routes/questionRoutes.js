const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleWare/authMiddleware");

// question controller
const {askQuestions,getQuestions, allQuestions} = require('../Controller/questionController')


// askQuestion route

router.post("/askquestions", authMiddleware, askQuestions);

// getAllQuestions route

router.get("/allquestions", authMiddleware, allQuestions);

router.get("/getQuestions/:questionid", getQuestions);

module.exports = router
