const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const PORT = process.env.PORT 
const PORT = 5001

// cors middleware
app.use(cors());

// db connection
const dbconnection = require("./db/dbConfig");

// user routes midddleware file
const userRoutes = require("./routes/userRoutes");

// questions routes midddleware file
const questionsRoutes = require("./routes/questionRoutes");

// answer routes
const answerRoutes = require("./routes/answerRoutes")

// authentication middleware file
const authMiddleware = require("./middleWare/authMiddleware");

// json middleware extract json data
app.use(express.json());

// user route middleware
app.use("/api/user", userRoutes);

// questions route middleware
app.use("/api/questions",questionsRoutes);

// answer route midleware
app.use('/api/answers', answerRoutes)

async function start() {
  try {
    const result = await dbconnection.execute("select 'test' ");
    app.listen(PORT);
    console.log("database connection established");
    console.log(`listening on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
}

start();
