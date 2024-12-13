const dbConnection = require("../db/dbConfig");
const { StatusCodes} = require("http-status-codes");


const postAnswer = async (req, res) => {
    const questionid = req.params.questionid
    const {userid,answer} = req.body

    if (!answer) {
         return res
           .status(StatusCodes.BAD_REQUEST)
           .json({ message: "please provide required fields" });
    }

    try {
        await dbConnection.query(
            `INSERT INTO answers (userid,questionid,answer) VALUES (?,?,?)`,[userid,questionid,answer]
        )

        return res
          .status(StatusCodes.CREATED)
          .json({ message: "answer posted" });
    } catch (error) {
          console.log(error.message);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "something went wrong, please try again later" });
    }
}

const answerWithQuestion = async (req,res) => {
    const questionid = req.params.questionid

    try {
        const [questionAnswer] = await dbConnection.query(
          `SELECT answer,title,description,username FROM answers  JOIN questions ON answers.questionid = questions.questionid JOIN users ON users.userid = answers.userid WHERE answers.questionid = '${questionid}' ORDER BY answers.answerid DESC`
        );

        return res.status(StatusCodes.OK).json({questionAnswer})
    } catch (error) {
          console.log(error.message);
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "something went wrong, please try again later" });
    }
}



module.exports = {postAnswer, answerWithQuestion}