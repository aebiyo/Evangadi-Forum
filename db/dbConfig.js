const mysql2 = require("mysql2");
require("dotenv").config();

// const dbConnection = mysql2.createPool({
//   user: "evangadi_forum",
//   password: "evangadi_forum",
//   database: "evangadiforum_db",
//   host: "localhost",
//   connectionLimit: 10,
// });

const dbConnection = mysql2.createPool({
  user: "evangadi_forum_m",
  password: "@kergat#0093",
  database: "evangadi_forum_m",
  host: "85.10.205.173",
  port: 3306,
  connectionLimit: 10,
});

// dbConnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports = dbConnection.promise()
