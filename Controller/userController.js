const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken')

async function register(req, res) {
  //   res.send("register");

  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "please provide all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username,userid FROM users WHERE username = ? or email = ?",
      [username, email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "user already registerd" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "password must be at lest 8 charachter" });
    }

    //encrypt the password
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users(username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashPassword]
    );

    return res.status(StatusCodes.CREATED).json({ message: "user registered" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, please try again later" });
  }
}

async function login(req, res) {
  // res.end("user login");

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "please provide all required fields" });
  }

  try {

    const [user] = await dbConnection.query('SELECT username,userid,password FROM users WHERE email = ?',[email])

    if (user.length == 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({message:"invalid credential"})
    }
   // compare password
    const isMatch = await bcrypt.compare(password,user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "invalid credential" });
    }

    const username = user[0].username
    const userid = user[0].userid

    const token = jwt.sign({username,userid},"secret",{expiresIn:"2h"})

    return res.status(StatusCodes.OK).json({message:'user login sucessfuly',token,user:{
      id:userid,
      username: username,
    }})

  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, please try again later" });
  }
}

async function checkuser(req, res) {
  const username = req.user.username
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({message:"valid user",username,userid})
}

module.exports = { register, login, checkuser };
