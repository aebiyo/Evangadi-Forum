const express = require("express");
const router = express.Router();


const authMiddleware = require('../middleWare/authMiddleware')

//userController

const { register, login, checkuser } = require("../Controller/userController");

// register route

router.post("/register", register);

// login user route

router.post("/login", login);

// check user

router.get("/check",authMiddleware, checkuser);

module.exports = router;
