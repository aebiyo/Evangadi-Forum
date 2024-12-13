const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const randomstring = require("randomstring");

const askQuestions = async (req,res) => {
const { title, description,userid} = req.body;

if (!title || !description) {
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "please provide all required fields" });
}
if(title.length > 200) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        message: "Title length can not be greater than 200 characters!",
      });
}

try {
    // generate random string
    const questionid = randomstring.generate();

    await dbConnection.query(
      "INSERT INTO questions(userid,questionid,title,description) VALUES(?,?,?,?)",
      [userid,questionid, title, description]
    );

      return res.status(StatusCodes.CREATED).json({message:"question inserted"})

} catch (error) {
    console.log(error.message);
       return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({ message: "something went wrong, please try again later" });
}
};

const allQuestions = async(req,res) => {
    try {
        const [allQuestion] = await dbConnection.query(
          "SELECT q.id,q.questionid,q.userid,q.title,u.username,q.description FROM questions q JOIN users u ON q.userid = u.userid ORDER BY id DESC"
          
        );
        
        return res.status(StatusCodes.OK).json({ allQuestion});
    } catch (error) {
            console.log(error.message);
       return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({ message: "something went wrong, please try again later" });
    }
}

const getQuestions = async (req, res) => {
   
    const questionid = req.params.questionid;
    
    if (!req.params.questionid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "single question id not provided" });
    }

    try {
      
      const [oneQuestion] = await dbConnection.query(
        `SELECT * FROM questions WHERE questionid = ?`,[questionid]
      )

      if (!oneQuestion.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Question Not Found With The Provide Id'})
      }

        return res.status(StatusCodes.OK).json({oneQuestion})
      

    } catch (error) {
       console.log(error.message);
       return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({ message: "something went wrong, please try again later" });
    }

}

module.exports = { askQuestions, getQuestions, allQuestions };
